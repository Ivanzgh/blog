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
