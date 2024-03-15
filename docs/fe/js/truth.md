# 手写 JS

## instanceof

instanceof 用于检测构造函数的 prototype 是否出现在被检测对象的原型链上

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

[new 解析](./object.md#new-的过程)

```js
function myNew(func, ...args) {
  const obj = {};
  obj.__proto__ = func.prototype;
  let result = func.apply(obj, args);
  // let result = func.call(obj, ...args);
  return result instanceof Object ? result : obj;
}
const p1 = myNew(Person, 'zgh');
console.log(p1); // Person {name: 'zgh'}
```

## bind

1. 修改 this 指向
2. 动态传递参数
3. 兼容 new 关键字
4. 返回一个函数

```js
Function.prototype.myBind = function (context) {
  const fn = this;
  if (typeof fn !== 'function') {
    throw new TypeError('Error');
  }
  const args = [...arguments].slice(1);
  return function Fn() {
    return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments));
  };
};

// 验证
const obj = { name: 'zgh' };
function foo(a) {
  console.log(a + ', ' + this.name);
}
const fn = foo.myBind(obj, 'Hello');
fn(); // Hello, zgh
```
