---
outline: deep
---

# 异步编程

## 异步背景

### 基于回调的异步编程

有一些异步行为的例子，例如加载脚本和模块：

::: code-group

```js [index.js]
function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
loadScript('./foo.js');

console.log(1);
```

```js [foo.js]
console.log(2);

function foo() {
  console.log('foo');
}
```

:::

打印顺序是 1、2。这说明脚本 foo.js 会在 loadScript 函数执行完成后才运行。如果 loadScript 函数后面有其他代码，它们不会等到脚本加载完成后再执行。

如果我想在脚本加载后立即使用脚本里的 `foo` 函数，直接调用会报错：

```js
loadScript('./foo.js');

foo();
```

接下来，添加一个 callback 函数作为 loadScript 的第二个参数，该函数应在脚本加载完成时执行。

```js
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript('./foo.js', (script) => {
  foo();
});
```

将 foo 函数放在回调函数中就能正常工作了。

这就是基于回调的异步编程。异步执行某项功能的函数应该提供一个 callback 参数，并在相应事件完成时调用。

如果需要多个异步操作，可以嵌套回调函数：

```js
loadScript('1.js', function (script) {
  loadScript('2.js', function (script) {
    loadScript('3.js', function (script) {
      // ...加载完所有脚本后继续
    });
  });
});
```

### 处理 Error

考虑脚本加载失败的情况

```js
function loadScript(src, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
  document.head.append(script);
}
loadScript('./foo.js', (error, script) => {
  if (error) {
    // 处理error
  } else {
    // 脚本加载成功
    foo();
  }
});
```

callback 函数里接收两个参数，加载成功时调用`callback(null, script)`，否则调用`callback(error)`

### 回调地狱

如果有多个异步操作，回调函数会嵌套在回调函数里，导致代码难以阅读和理解，这就是「回调地狱」。

```js
loadScript('1.js', function (error, script) {
  if (error) {
    handleError(error);
  } else {
    loadScript('2.js', function (error, script) {
      if (error) {
        handleError(error);
      } else {
        loadScript('3.js', function (error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...加载完所有脚本后继续
          }
        });
      }
    });
  }
});
```

### 改造 loadScript

使用`Promise`改造前面的示例，假设有 3 个脚本需要加载

```js
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    document.head.append(script);
  });
}

loadScript('./1.js')
  .then(() => loadScript('./2.js'))
  .then(() => loadScript('./3.js'))
  .then(() => {
    foo1();
    foo2();
    foo3();
  });
```

注意：下面是没有使用链式调用的写法，会有和使用回调函数一样的问题。

```js
loadScript('./1.js').then(() => {
  loadScript('./2.js').then(() => {
    loadScript('./3.js').then(() => {
      foo1();
      foo2();
      foo3();
    });
  });
});
```

## Promise

`promise`用同步编程的方式来编写异步代码，解决回调嵌套问题。

```js
new Promise((resolve, reject) => {});
```

### 三种状态

- `pending` 进行中
- `fulfilled` 成功
- `rejected` 失败

特性：

- 初始状态是`pending`
- `pending`状态可以转化为`fulfilled`或者`rejected`状态
- 状态不可逆
- 最终状态是`fulfilled`并返回一个值，或者是`rejected`并返回一个原因。

### then 方法

- 分别指定`fulfilled`状态和`rejected`状态的回调函数，第二个参数可选（不推荐使用）。
- 返回的是一个新的`Promise`，支持链式调用

```js
function pro(params) {
  return new Promise((resolve, reject) => {
    if (params) {
      resolve('hahaha');
    } else {
      reject('error');
    }
  });
}
pro(true).then(
  (res) => {
    console.log(res);
  },
  (err) => console.log(err)
);
```

::: warning

`Promise` 本身是同步的，then、catch 和 finally 都是异步的

```js
const p = new Promise((resolve, reject) => {
  console.log(1);
  resolve(3);
});
p.then((res) => console.log(res));
console.log(2);
```

结果是 1、2、3
:::

### catch 方法

```js
function Cat(ready) {
  return new Promise((resolve, reject) => {
    if (ready) {
      resolve('Tom');
    } else {
      reject('Kitty');
    }
  });
}
Cat(false)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```

`catch`方法可以捕获错误，作用和 `then(onFulfilled, onRejected)` 当中的 `onRejected` 函数类似。

```js
Cat(false)
  .then((res) => {
    console.log(tom);
  })
  .catch((err) => console.log(err));
```

示例未定义变量 tom，如果不使用 catch 会直接报错，终止程序。使用后不会报错，但会将错误信息传递到 catch 方法中，方便处理。

### 再次抛出错误

- 如果在 catch 中 throw，那么控制权就会被移交到下一个最近的 catch
- 如果能处理 error ，那么控制权将继续到最近的 then

```js
new Promise((resolve, reject) => {
  throw new Error('Whoops!');
})
  .catch((error) => {
    // 这里抛出错误，会执行下一个最近的catch
    throw error;
  })
  .then(() => console.log('then'))
  .catch((error) => {
    console.log(error);
  });
```

### `catch`和`try/catch`的区别

函数代码周围有个“隐式的 try/catch”。所以，所有同步错误都会得到处理

示例：catch 不会被触发。如果移除 setTimeout，catch 会被触发

```js
new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error('error');
  }, 1000);
}).catch(() => {
  console.log(1);
});
```

示例：以下代码输出什么？

```js
try {
  (async function () {
    a().b().c();
  })();
} catch (e) {
  console.log(`执行出错：${e.message}`);
}
```

答案：`Uncaught (in promise) ReferenceError: a is not defined`

`async`定义了异步任务，而`try catch`无法捕获异步任务，所以无法执行`catch`语句，
改为同步即可`await (async function() { a().b().c() })()`

### catch 和 then 捕获错误的区别

- `promise.then(f1).catch(f2)`， catch 能捕获 promise 和 f1 抛出的异常
- `promise.then(f1, f2)`，只能捕获 promise 抛出的异常，不会捕获 f1 抛出的异常

```js
function Cat(ready) {
  return new Promise((resolve, reject) => {
    if (ready) {
      resolve('Tom');
    } else {
      reject('Kitty');
    }
  });
}

// 示例一：使用 .then(f1).catch(f2)
Cat(true)
  .then((result) => {
    throw new Error('抛出未捕获异常');
  })
  .catch((error) => {
    console.error('catch报错信息：', error.message);
  });

// 示例二：使用 .then(f1, f2)
Cat(true).then(
  (result) => {
    throw new Error('抛出未捕获异常');
  },
  (error) => {
    // 这里不会被触发
    console.error('报错信息：', error.message);
  }
);
```

### finally 方法

finally 是无论 promise 运行成功还是失败，都将执行的函数。

- finally 没有参数
- finally 后面可以继续链式调用

```js
function Cat(ready) {
  return new Promise((resolve, reject) => {
    if (ready) {
      resolve('Tom');
    } else {
      reject('Kitty');
    }
  });
}

Cat(true)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err))
  .finally(() => {
    console.log('finally');
  });
```

- 如果 finally 的前面已经有 then，那么 finally 后面的 then 的参数为 undefined
- 如果前面没有 then，后面的 then 能拿到结果
- 下面的示例中，当返回的是 reject，会触发 catch 方法。无论 finally 前面是否有 then，后面的 then 参数都会是 undefined

```js
Cat(true)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err))
  .finally(() => {
    console.log('finally');
  })
  .then((res) => {
    console.log(res); // undefined
  });

// 如果是下面这种方式，不会触发then
Cat(false)
  .finally(() => {
    console.log('finally');
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```

### Promise.all

`Promise.all()`提供**并行执行**异步操作的能力。

- 接收一个可迭代对象（通常是一个元素为 promise 的数组），并返回一个新的 promise
- 等待所有 promise 都 resolve 时，返回存放结果的数组，**全部变更再返回**
- 如果任意一个 promise 为 reject，那么就会变成 error，其他 promise 将被忽略
- `Promise.all` 方法会按照参数数组里面的顺序将结果返回

```js
let p1 = new Promise(function (resolve) {
  setTimeout(function () {
    resolve('Hello');
  }, 3000);
});

let p2 = new Promise(function (resolve) {
  setTimeout(function () {
    resolve('world');
  }, 1000);
});

Promise.all([p1, p2]).then((res) => {
  // 3秒后打印出 ["Hello", "world"]
  console.log(res);
});
```

### Promise.race

`Promise.race()`等待第一个 settle 的 promise，并将其 result 或 error 作为结果返回，**先变更先返回**

注意：只要该数组中的`Promise`对象的状态发生变化（无论是`resolve`还是`reject`），该方法都会返回结果。

```js
let p1 = new Promise(function (resolve) {
  setTimeout(function () {
    resolve('Hello');
  }, 3000);
});

let p2 = new Promise(function (resolve) {
  setTimeout(function () {
    resolve('world');
  }, 1000);
});

Promise.race([p1, p2]).then((res) => {
  // 1秒后打印出 world
  console.log(res);
});
```

### Promise.any

ES2021 新增方法

- `Promise.any()`方法返回一个`promise`，一旦`any`中的`promise`状态变为`fulfilled`，则返回第一个`fulfilled`的`promise`的值。
- 如果所有`promise`都`rejected`，Promise.any 则会抛出 AggregateError 错误类型的 error 实例。

```js
Promise.any([
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('error')), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).then(alert); // 1
```

### Promise.allSettled

ES2020 新增方法

Promise.allSettled 等待所有的 promise 都被 settle，**无论结果如何**。结果数组具有：

- `{status:"fulfilled", value:result}` 对于成功的响应
- `{status:"rejected", reason:error}` 对于 error

Promise.allSettled 和 Promise.all 的区别：

- 如果任意的 promise 出现 reject，则 Promise.all 整个将会 reject
- Promise.allSettled 会等待所有传入的 Promise **无论成功还是失败** 都完成（settled）。即使某个 Promise 失败（reject）了，也不会提前终止。

```js
let urls = ['https://api.github.com/users/iliakan', 'https://api.github.com/users/remy', 'https://no-such-url'];

Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
  results.forEach((result, num) => {
    console.log(result);

    if (result.status == 'fulfilled') {
      console.log(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == 'rejected') {
      console.log(`${urls[num]}: ${result.reason}`);
    }
  });
});
```

## Promise/A+ 规范

[Promise/A+ 规范](https://promisesaplus.com/)

promise 特性：

- 执行了 `resolve` 函数，promise 状态变为`fulfilled`
- 执行了`reject`函数，状态变为`rejected`
- promise 中有 `throw` 语句，状态变为`rejected`
- promise 有 3 种状态：`pending`、`fulfilled`、`rejected`
- 初始状态是`pending`
- `pending`状态可以转化为`fulfilled`或者`rejected`状态
- 状态不可逆
- `then`接收两个回调函数：`onFulfilled`、`onRejected`
- fulfilled 状态执行 onFulfilled，rejected 状态执行 onRejected
- 如果存在定时器，需要在定时器结束之后执行 then
- then 支持链式调用，下一个 then 接收上一个 then 的返回值，返回值可以是常量、promise、函数
- 优先执行同步任务，后执行 promise.then()
- 其他方法：all、race、any、allSettled

使用示例：

```js
const p1 = new Promise((resolve, reject) => {});

const p2 = new Promise((resolve, reject) => {
  resolve('success');
});

// 抛出异常
const p3 = new Promise((resolve, reject) => {
  throw 'error';
});

// 延迟执行，1s之后才打印结果
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
}).then(
  (res) => console.log(res),
  (err) => console.log(err)
);

// 链式调用
const p5 = new Promise((resolve, reject) => {
  resolve(100);
})
  .then(
    (res) => res * 2,
    (err) => console.log(err)
  )
  .then(
    (res) => console.log(res),
    (err) => console.log(err)
  );

const p6 = new Promise((resolve, reject) => {
  resolve(100);
})
  .then(
    (res) =>
      new Promise((resolve, reject) => {
        resolve(res * 3);
      }),
    (err) => console.log(err)
  )
  .then((res) => console.log(res));

const p7 = new Promise((resolve, reject) => {
  resolve(100);
})
  .then(
    (res) => () => res * 5,
    (err) => console.log(err)
  )
  .then(
    (res) => {
      let d = res();
      console.log(d);
    },
    (err) => console.log(err)
  );

const p8 = Promise.resolve(100).then((res) => console.log(res));
```

## 手写 Promise

```js
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.initValue();
    this.initBind();

    try {
      // executor是一个执行器，立即执行
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  initValue() {
    // 状态
    this.PromiseState = PENDING;
    // 成功或者失败的结果
    this.PromiseResult = null;
    // 存储成功回调函数
    this.onFulfilledCallbacks = [];
    // 存储失败回调函数
    this.onRejectedCallbacks = [];
  }
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  resolve(value) {
    // 状态不可逆，不能直接变换状态，必须先在pending状态
    if (this.PromiseState !== PENDING) return;
    this.PromiseState = FULFILLED;
    this.PromiseResult = value;

    while (this.onFulfilledCallbacks.length) {
      // Array.shift() 删除数组第一个元素并返回该元素，直到清空数组
      this.onFulfilledCallbacks.shift()(value);
    }
  }
  reject(reason) {
    if (this.PromiseState !== PENDING) return;
    this.PromiseState = REJECTED;
    this.PromiseResult = reason;

    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(reason);
    }
  }
  then(onFulfilled, onRejected) {
    // 格式校验，处理then的可选参数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        // 添加setTimeout，为了优先执行同步任务
        setTimeout(() => {
          try {
            const x = cb(this.PromiseResult);
            if (x && x === thenPromise) {
              // 避免循环调用
              throw new Error('不能返回自身');
            }
            if (x instanceof MyPromise) {
              // 返回promise
              x.then(resolve, reject);
            } else {
              // 返回普通值
              resolve(x);
            }
          } catch (error) {
            reject(error);
            throw new Error(error);
          }
        });
      };

      if (this.PromiseState === FULFILLED) {
        resolvePromise(onFulfilled);
      } else if (this.PromiseState === REJECTED) {
        resolvePromise(onRejected);
      } else if (this.PromiseState === PENDING) {
        // 不知道后面的状态变化，先把成功回调和失败回调存储起来
        this.onFulfilledCallbacks.push(onFulfilled.bind(this));
        this.onRejectedCallbacks.push(onRejected.bind(this));
      }
    });
    return thenPromise;
  }

  // resolve 静态方法
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    const result = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      const addData = (index, value) => {
        result[index] = value;
        count++;
        if (count === promises.length) {
          resolve(result);
        }
      };
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData(index, res);
            },
            (err) => {
              reject(err);
            }
          );
        } else {
          addData(index, promise);
        }
      });
    });
  }
  static allSettled(promises) {
    const result = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        const addData = (status, index, value) => {
          result[index] = { status, value };
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        };
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData(FULFILLED, index, res);
            },
            (err) => {
              addData(REJECTED, index, err);
            }
          );
        } else {
          addData(FULFILLED, index, promise);
        }
      });
    });
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        } else {
          resolve(promise);
        }
      });
    });
  }
  static any(promises) {
    const errors = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              resolve(res);
            },
            (err) => {
              errors[index] = err;
              count++;
              if (count === promises.length) {
                reject(new AggregateError(errors, 'All promises were rejected'));
              }
            }
          );
        } else {
          resolve(promise);
        }
      });
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => {
        callback();
        return value;
      },
      (reason) => {
        callback();
        throw reason;
      }
    );
  }
}
```

### 测试

Promise/A+ 规范提供了一个测试库

1. 安装

```bash
npm i -D promises-aplus-tests
```

2. 在测试文件中添加 deferred：

```js
MyPromise {
  // 省略
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });

  return result;
}
module.exports = MyPromise;
```

3. 在 package.json 中配置测试命令，后面的是测试文件路径

```json
{
  "scripts": {
    "test": "promises-aplus-tests src/promise/myPromise"
  }
}
```

4. 运行测试：`npm run test`

## async、await

`async`、`await`用同步的方式来处理异步问题。

`async`放置在函数的前面，返回一个 Promise。

**await 只能在 async 函数里面使用**，可以让 js 进行等待。

```js
async function f() {
  let res = await axios.get(url);
  return res.data; //  等待返回请求结果后才执行
}
f();
```

## generator

Generator 是一种异步编程解决方案，执行 Generator 函数会返回一个遍历器对象。两个特征：星号`*`、`yield`表达式

- 调用函数返回一个遍历器对象，具有 `Symbol.iterator` 属性
- 通过`next()`方法才能遍历到下一个状态，可以传递参数
- `yield`表达式就是暂停标志，只能用在 Generator 函数里面
- `yield`后面还可以是函数、Promise

```js
function* foo() {
  yield 'hello';
  yield 'world';
  return 'haha';
}
const g = foo(); // 函数并不会立即执行
console.log(g); // foo {<suspended>}

console.log(g[Symbol.iterator]() === g); // true

console.log(g.next()); // {value: "hello", done: false}
console.log(g.next()); // {value: "world", done: false}
console.log(g.next()); // {value: "haha", done: true}
console.log(g.next()); // {value: undefined, done: true}
```

`{value: "hello", done: false}`表示 value 是`yield`表达式的值，`done: false`表示遍历未完成

```js
function* foo() {
  yield 'hello';
  yield () => 'world';
  yield 1;
}
const res = foo();

console.log(res.next()); // { value: "hello", done: false }
console.log(res.next().value()); // world
console.log(res.next()); // { value: 1, done: false }
console.log(res.next()); // { value: undefined, done: true }
```

Generator 函数可以不用`yield`表达式，这时就变成了一个单纯的暂缓执行函数。

```js
function* gg() {
  console.log('666');
}
const g1 = gg();

setTimeout(() => {
  g1.next(); // 1s后输出666
}, 1000);
```

## 练习题目

```js
const p1 = new Promise((resolve, reject) => {
  console.log(1);
});
console.log(2);
```
