# 手写 JS

## instanceof

instanceof 用于检测构造函数的 prototype 是否出现在被检测对象的原型链上。

1. 基础数据类型都返回 false
2. null 返回 false
3. 校验右侧数据类型，如果是基础数据类型则报错：`Uncaught TypeError: Right-hand side of 'instanceof' is not an object`
4. 右侧如果是`{}`，则报错：`Uncaught TypeError: Right-hand side of 'instanceof' is not callable`
5. 右侧要有 prototype 属性

```js
function myInstanceof(left, right) {
  if ((typeof left !== 'object' && typeof left !== 'function') || left === null) return false;
  let proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}

console.log(myInstanceof(1, Number)); // false
console.log(myInstanceof(new Boolean(), Boolean)); // true
console.log(myInstanceof(() => {}, Function)); // true

console.log({} instanceof {}); // Uncaught TypeError: Right-hand side of 'instanceof' is not callable
console.log({} instanceof 1); // Uncaught TypeError: Right-hand side of 'instanceof' is not an object
```

## new

[new 解析](./class#new-指令)

```js
function myNew(constructor, ...args) {
  if (typeof constructor !== 'function') {
    throw new TypeError('Constructor must be a function');
  }

  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return result !== null && result instanceof Object ? result : obj;
}
```

## call

[bind、call、apply 解析](./#bind、call、apply)

示例：

```js
let foo = { value: 1 };
function bar() {
  console.log(this.value);
}
bar.call(foo);
```

通过 call 将 this 指向了 foo，可以理解成`foo.bar()`，如下：

```js
let foo = {
  value: 1,
  bar: function () {
    console.log(this.value);
  }
};
```

还有其他的情况：接收参数、参数为 null 或 undefined、有返回值

```js
let foo = { value: 1 };

function bar(a, b) {
  console.log(a, b);
  console.log(this.value);
  return { a: 1 };
}

bar.call(foo, 1, 2);

bar.call(null); // this 指向 window

let res = bar.call(foo, 1, 2);
console.log(res); // { a: 1 }
```

综上，总结出以下步骤：

1. 给 foo 增加一个临时的函数 fn，指向 bar：`foo.fn = bar`
2. 执行 fn：`foo.fn()`
3. 删除 fn：`delete foo.fn`
4. 如果传入 call 的参数是 `null` 或者 `undefined`，那么 this 就指向 `window`
5. 如果 bar 有返回值，需要将结果返回

最终结果：

```js
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
```

## apply

apply 方法和 call 方法类似，只是传入的参数不同，apply 方法传入的是一个数组。

```js
Function.prototype.myApply = function (context, args = []) {
  context = context || windown;
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
```

## bind

步骤：

1. 保存当前函数的 this 指向
2. 返回一个新函数
3. 组合参数，将新函数调用时的参数和绑定的参数合并
4. 处理函数调用时的 new 操作符
5. 设置新函数的 prototype 为原函数的 prototype，以便于正确继承

```js
Function.prototype.myBind = function (context, ...args) {
  const fn = this;

  const boundFn = function (...newArgs) {
    return fn.apply(this instanceof boundFn ? this : context, [...args, ...newArgs]);
  };

  boundFn.prototype = Object.create(fn.prototype);

  return boundFn;
};
```

验证：

```js
const foo = { value: 'world' };

function bar(name, age) {
  console.log(name + ', ' + this.value);
  this.name = name;
  this.age = age;
}
bar.prototype.say = function () {
  console.log('say');
};

const fn = bar.myBind(foo, 'hello');
fn();

const ins = new fn(18);
console.log(ins);
console.log(foo);
```

1. 调用 fn() 时：
   - 不是通过 new 调用，即 `fn.apply(context, [...args, ...newArgs])`，实际上执行 `bar.apply(foo, ['hello'])`
   - bar 函数执行，输出 `hello, world`，此时 foo 为：

```js
{ value: 'world', name: 'hello', age: undefined }
```

2. 使用 new fn(18) 创建一个新实例 ins：

   - 这次调用 fn 时，`this instanceof boundFn`为 true，所以 this 指向新的实例对象 ins
   - 调用 `fn.apply(this, [...args, ...newArgs])` 实际上执行 `bar.apply(ins, ['hello', 18])`
   - bar 函数执行，输出 `hello, undefined`（因为 ins 没有 value 属性），并在 ins 上设置 name 和 age 属性：`{ name: 'hello', age: 18 }`
   - ins 继承了`bar.prototype`，所以 ins 也有 say 方法

3. `boundFn.prototype = Object.create(fn.prototype)`，这里如果直接写成`boundFn.prototype = fn.prototype`，则在修改 `boundFn.prototype` 时，也会修改 `fn.prototype`，因为两个对象引用了同一个原型对象。
