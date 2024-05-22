# JavaScript

## 学习资源

- [MDN](https://developer.mozilla.org/zh-CN/)
- [javascript.info](https://javascript.info/)、[中文版](https://zh.javascript.info/)
- [ES6](https://es6.ruanyifeng.com/)

## 数据类型

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666417923.png)

基本数据类型：`Number`、`String`、`Boolean`、`Null`、`Undefined`、`Symbol`、`BigInt`

引用类型： `Object`，如`Array`、`Function`、`RegExp`、`Date`、`Math`

引申一点：null 音标是 `/nʌl/`，可读作 ‘闹’，不要读成 ‘怒儿’、‘浪’

基本数据类型将数据名和值存储在**栈**中

引用类型在栈中存入地址，该地址指向**堆**内存，将具体值存储在堆中。访问时先从栈中获取地址，再从堆中获取相应值

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418036.png)

闭包中的变量并不保存在栈中，而是保存在堆中

```js
let a = 1; // 在内存中开辟一块空间存储a的值 1
let b = a; // 开辟一块新的内存空间，将a的值拷贝一份存储到新的内存里
a = 2;
console.log(a); // 2
console.log(b); // 1

let c = { x: 3 };
let d = c;
c.x = 4;
console.log(c); // { x: 4 }
console.log(d); // { x: 4 }
```

## 类型判断

### `typeof`

```js
typeof 'js'; // 'string'
typeof 666; // 'number'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof Symbol(); // 'symbol'
typeof null; // 'object'
typeof {}; // 'object'
typeof []; // 'object'
typeof (() => {}); // 'function'
```

可以看出`typeof null`结果是`object`，对于数组无法精确判断

### `instanceof`

通过`instanceof`操作符可以对引用数据类型进行判定，不能正确判断基本数据类型，其原理就是**测试构造函数的`prototype`是否出现在被检测对象的原型链上**

```js
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log((() => {}) instanceof Function); // true

let str1 = new String('xxx');
console.log(str1 instanceof String); // true
let str2 = 'xxx';
console.log(str2 instanceof String); // false

console.log([] instanceof Object); // true
```

那么为何会出现`[] instanceof Object`为 true 呢？

`[].__proto__ === Array.prototype`、`Array.prototype.__proto__ === Object.prototype`二者的结果都是 true，
因此 `Object` 构造函数在 `[]` 的原型链上

### `Array.isArray()`

可以判断参数是否是数组

### `isNaN()`

可以判断 NaN

### `Object.prototype.toString.call()`

全类型都可判断，推荐使用该方法

```js
Object.prototype.toString.call('js'); // '[object String]'
Object.prototype.toString.call(666); // '[object Number]'
Object.prototype.toString.call(true); // '[object Boolean]'
Object.prototype.toString.call({}); // '[object Object]'
Object.prototype.toString.call([]); // '[object Array]'
Object.prototype.toString.call(null); // '[object Null]'
Object.prototype.toString.call(undefined); // '[object Undefined]'
Object.prototype.toString.call(new Date()); // '[object Date]'
Object.prototype.toString.call(window); // '[object Window]'
Object.prototype.toString.call(document); // '[object HTMLDocument]'
Object.prototype.toString.call(/123/g); // '[object RegExp]'
```

1、返回具体类型

```js
const dataType = (data) => {
  return Object.prototype.toString
    .call(data)
    .replace(/\[object\s(.+)\]/, '$1')
    .toLowerCase();
};
```

2、验证是不是某种类型，返回 true 或 false

```js
const isType = (target, type) => `[object ${type}]` === Object.prototype.toString.call(target);
```

## 类型转换

### 强制类型转换

1、Number()

```js
Number(1); // 1
Number(true); // 1
Number(false); // 0
Number(null); // 0
Number(undefined); // NaN
Number(''); // 0
Number('1'); // 1
Number('01'); // 1
Number('1.23'); // 1.23
Number('1a'); // NaN
Number('0x10'); // 16
```

2、toString()

```js
let a = 123;
let b = a.toString();
```

3、String()

```js
let a = String(123);
```

4、parseInt()和 parseFloat()

```js
parseInt('1.99'); // 1
parseInt('1234blue'); // 1234
parseInt('0xA'); // 10
parseInt('22.5'); // 22
parseInt('blue'); // NaN

parseFloat('1.23'); // 1.23
```

5、Boolean()

除了 `undefined`、`null`、`' '`、`NaN`、`0`、`false` 转换出来是 false，其他都是 true

### 隐式类型转换

```js
'1' + 1 // '11'   string 字符串连接
'1' - 1 //  0    number
+'1' // 1   number
-'1' // -1    number
++'1' // SyntaxError
true + true // 2

'1' == 1 // true
0 == false // true
1 == true // true

0 == []     // true
0 == "0"    // true
"0" == []   // false
0 == ""     // true
[] == ""    // true
[] == []   // false

null == undefined // true
null == 0     // false
null == ''    // false
```

[参考链接](https://blog.csdn.net/qq_33120763/article/details/88296955)

## 原型和原型链

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1697463743.png)

- 每个函数都有一个`prototype`属性，这个属性指向函数的原型对象
- 每个对象（null 除外）都有一个`__proto__`属性，这个属性指向该对象的原型
- 每个原型都有一个`constructor`属性，指向关联的构造函数
- 原型也是一个对象，所以也有原型

当访问一个对象的属性或方法时，会先在对象自身中寻找，如果找不到则在原型中寻找，如果还找不到，则继续在原型的原型中寻找，以此类推，直到找到为止，若找不到则返回`undefined`，这就是原型链

构造器原型`Object.prototype`的原型是`null`，说明原型链后面已经没有节点了，原型链并不是无限长的。

函数也有`__proto__`属性

```js
let fn = function () {};
fn.__proto__ === Function.prototype; // true
```

```js
let obj = {};
console.log(obj.constructor.prototype === obj.__proto__); // true

let arr = [];
console.log(arr);

function Person(name) {
  this.name = name;
}
Person.prototype.age = 23;

let person1 = new Person('zgh');
console.log(person1.age); // 23

console.log(person1.__proto__ === Person.prototype); // true

console.log(Person.prototype.constructor === Person); // true

console.log(person1.constructor === Person); // true
```

要获取原型推荐使用`Object.getPrototypeOf()`，不要使用`__proto__`

`Object.getPrototypeOf(obj) === obj.__proto__`为 true

## 执行上下文

执行上下文可看作是一个包含了当前代码执行状态的环境对象

### 三个重要组成部分

1. 变量对象（Variable Object，简称 VO）
   1. 在创建上下文时，会有一个包含了所有在上下文中定义的变量、函数和形参的对象被创建
   2. 对于全局上下文，变量对象就是全局对象，如 window
   3. 对于函数上下文，变量对象分为两个阶段：
      1. 创建阶段：变量和函数的声明会被存储在变量对象
      2. 执行阶段：变量被赋值，函数被执行
2. 作用域链（Scope Chain）
3. this 值

### 执行上下文的类型

1. 全局执行上下文
   1. 只有一个全局执行上下文
   2. 是最顶层的上下文，在浏览器中指向了全局对象，如 window 对象
2. 函数执行上下文
   1. 每当一个**函数被调用时**，都会创建一个新的执行上下文。如果一个函数被多次调用，就会创建多个执行上下文
   2. 每个函数都有自己的作用域链、变量对象和 this 值
3. eval 函数执行上下文

### 执行上下文栈

执行上下文栈（Execution Context Stack，简称 ECS），栈的特点是**后进先出**（LIFO）

当执行代码时，会首先创建全局上下文并将其推入栈中。在函数调用时会创建一个新的函数上下文，并将其推入栈中。当函数执行完成后，函数上下文从栈中弹出

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1698157359.png)

### 变量对象

每个执行上下文都有一个关联的变量对象，其包括这个执行上下文中定义的所有变量和函数

在执行上下文的**创建阶段**会生成变量对象，生成变量对象主要有三个过程：

- **检索当前执行上下文中的参数**。该过程生成 arguments 对象，并建立以形参变量名为属性名，以形参变量值为属性值的属性。全局执行上下文没有该步骤，因为没有参数传递
- **检索当前执行上下文中的函数声明**。该过程建立以函数名为属性名，以函数所在内存地址引用为属性值的属性
- **检索当前执行上下文中的变量声明**。该过程建立以变量名为属性名，以 undefined 为属性值的属性

```js
VO = {
  arguments: {},
  paramVariable: '形参变量',
  function: <function reference>,
  variable: undefined
}
```

当执行上下文进入执行阶段后，变量对象变为**活动对象**（简称 AO），此时原先声明的变量会被赋值

```js
AO = {
  arguments: {},
  paramVariable: '形参变量',
  function: <function reference>,
  variable: '具体值'
}
```

变量对象和活动对象都是指向同一个对象，只是处于执行上下文的不同阶段

代码说明：

```js
function f(a) {
  var b = 2;
  function g() {}
  var c = function () {};
}
f(1);
```

当 f 函数被调用时，f 执行上下文被创建，变量对象如下：

```js
f_ECS = {
    VO = {
      arguments: {
        '0': 1,
        length: 1
      },
      a: 1,
      b: undefined,
      g: <function g reference>,
      c: undefined
    }
}
```

当 f 函数在执行阶段时，变量对象变为活动对象：

```js
f_ECS = {
    AO = {
      arguments: {
        '0': 1,
        length: 1
      },
      a: 1,
      b: 2,
      g: <function g reference>,
      c: <function express c reference>
    }
}
```

## arguments

arguments 是一个类数组对象，用于获取传递给函数的所有参数

- 可通过索引访问参数，如`arguments[0]`
- 获取 length，`arguments.length`

```js
function fun(a, b, c) {
  console.log(arguments);
}
fun(1, 2, 3);
```

arguments 对象中的值在非严格模式下会与函数中的命名参数保持同步

```js
function fun(a, b) {
  arguments[0] = 2;
  console.log(a); // 2
  // "use strict";
  // console.log(a); // 1
}
fun(1, 2);
```

推荐使用 ES6 的扩展运算符处理参数

## 变量提升、函数提升

结合执行上下文来理解提升的内在机制

### 变量提升

变量提升，就是把变量提升到**函数的顶部**，只是提升变量的声明，不会把变量的值也提升上来

```js
var name = 'haha';
function changeName() {
  console.log(name);
  var name = 'xixi';
}
changeName(); // undefined
console.log(name); // haha
```

提升后如下

```js
var name = 'haha';
function changeName() {
  var name;
  console.log(name);
  name = 'xixi';
}
changeName();
console.log(name);
```

### 函数提升

函数提升就是把函数提升到前面

函数的创建方式有三种：函数声明（静态的）、函数表达式（函数字面量）、构造函数（动态的，匿名的）

函数表达式的形式如下：

```js
var fun1 = function (n1, n2) {};
```

构造函数的形式如下:

```js
var fun2 = new Function('param1', 'param2');
```

只有函数声明形式才能被真正提升，函数表达式形式提升的只是一个没有值的变量

```js
function f() {
  g();
  function g() {
    console.log('我可以被提升');
  }
}
f();

console.log(m); // undefined
m(); // TypeError: m is not a function，因为 m 是 undefined
var m = function () {
  console.log(1);
};
```

## 作用域

作用域指变量的有效范围

### 词法作用域、动态作用域

- 词法作用域，也称为静态作用域，作用域在定义时确定的
- 动态作用域，作用域在调用时确定的

js 是词法作用域

1、案例 1：

```js
const value = 1;
function foo() {
  console.log(value);
}
function bar() {
  const value = 2;
  foo();
}
bar();
```

打印结果是 1

2、案例 2：

```js
// case 1
var scope = 'global scope';
function checkScope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f();
}
checkScope();

// case 2
var scope = 'global scope';
function checkScope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f;
}
checkScope()();
```

打印结果都是 local scope

### 全局作用域

在全局作用域中：

- 创建的变量都会作为`window`对象的属性保存
- 创建的函数都会作为`window`对象的方法保存

### 局部作用域

局部作用域在函数中创建，局部变量只能在函数中被访问

### 块级作用域

变量只在所在的代码块内有效。ES6 增加的`let`、`const`可以声明块级作用域，可在 for 循环和 if 中使用

```js
if (true) {
  var a = 1;
}
console.log(a); // 1

if (true) {
  const b = 1;
}
console.log(b); // ReferenceError: b is not defined

for (let i = 0; i < 3; i++) {
  var c = 1;
}
console.log(c); // 1

for (let i = 0; i < 3; i++) {
  let d = 1;
}
console.log(d); // ReferenceError: d is not defined
```

### 作用域链

作用域链是指当前执行上下文和上层执行上下文的一系列变量对象组成的层级链，它决定了各级执行上下文中的代码在访问变量和函数时的顺序。

当在函数作用域操作一个变量时，它会先在自身作用域中寻找，如果有就直接使用，如果没有则向上一级作用域中寻找，直到找到全局作用域；
如果全局作用域中依然没有找到，则会报错 `ReferenceError`

```js
function f() {
  const a = 1;
  function g() {
    function m() {
      const b = 2;
      console.log(a + b);
    }
  }
}
```

## 闭包

闭包就是能够读取其他函数内部变量的函数

如果一个函数 f()内部定义了一个函数 g()，并且 g()引用了 f()中的变量，那么函数 g()就是一个闭包

```js
function f() {
  let a = 1;
  function g() {
    a += 1;
    console.log(a);
  }
  g();
}
f();
```

优点：延长变量生命周期

缺点：造成内存泄漏

示例一、打印点击了哪个数字

```js
/**
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
</ul>
*/

let lis = document.getElementsByTagName('li');
for (var i = 0; i < lis.length; i++) {
  (function (i) {
    lis[i].onclick = function () {
      console.log(i);
    };
  })(i);
}

//或者
for (var i = 0; i < lis.length; i++) {
  lis[i].onclick = (function (i) {
    return function () {
      console.log(i);
    };
  })(i);
}
```

如果不使用闭包将会一直打印出 5，使用闭包后正常显示，也可直接将`var`改为`let`

示例二、每隔 1 秒输出 1~5

```js
for (var i = 0; i < 3; i++) {
  console.log('i: ' + i);
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

闭包允许函数访问其外部作用域的变量，但是不会捕获变量的当前值，而是捕获变量的引用

上面第一个循环会输出 3 个 3，第二个循环会输出 5 次 6，延迟函数的回调会在循环结束时才执行，

由于 setTimeout 回调在循环结束后才执行，它们都会共享相同的 i 变量引用，而循环在执行时已经完成，i 的值变为 3。因此当这些回调执行时，它们都引用的是相同的 i 变量，其值为 3

在迭代内使用`IIFE`会为每个迭代都生成一个新的作用域，使得延迟函数的回调函数可以将新的作用域封闭在每个迭代的内部，每个迭代中都会有一个正确的变量值供我们访问

```js
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

还有一种更方便的方式，就是使用块作用域，将`var`换成`let`

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

## this 指向

this 的指向，是在执行上下文被创建时确定的

默认绑定、显示绑定、隐式绑定

- 默认绑定：函数调用时无任何调用前缀，this 指向全局对象 window（非严格模式）
- 显示绑定：通过 apply、call、bind 方法改变 this 指向
- 隐式绑定：
  - 如果函数调用时，前面存在调用它的对象，那么 this 就会隐式绑定到这个对象上
  - 如果函数调用前存在多个对象，this 指向距离调用自己最近的对象

### 全局执行

```js
console.log(this); //  window
```

### 函数中执行

1、**标准模式**

即默认绑定，this 指向 window

```js
function f() {
  console.log(this); // window
}
f();
```

2、**严格模式**

在严格模式下，默认绑定的 this 指向 window

```js
'use strict';
function f() {
  console.log(this); // undefined
}
f();
```

如果在严格模式下调用非严格模式下的函数，不影响 this 指向

```js
function fn() {
  console.log(this); // window
}

(function () {
  'use strict';
  fn();
})();
```

隐式绑定 this 丢失问题，常见于传入回调函数时

```js
const obj = {
  foo: function () {
    console.log(this);
  }
};
setTimeout(obj.foo, 100); //  window
setTimeout(function () {
  obj.foo(); // obj
}, 100);

// 显示绑定
setTimeout(obj.foo.bind(obj), 100); // obj
```

### 作为对象的方法调用

this 指向当前对象 obj

```js
let name = 'js';
let obj = {
  name: 'zgh',
  fun: function () {
    console.log(this.name); // zgh
  }
};
obj.fun();
```

如果把对象方法赋值给变量，调用该方法时，this 指向 `window`

```js
// 若此处不是let而是var声明，则 this 指向 window 对象，this.dd结果为 js
let dd = 'js';
let obj = {
  dd: 'zgh',
  fun: function () {
    console.log(this.dd); // undefined
  }
};
let res = obj.fun;
res();
```

### 作为构造函数调用

在调用一个构造函数时加上 `new` 关键字，此时 `this` 指向这个构造函数调用时实例化出来的对象

```js
function Person(name) {
  this.name = name;
  console.log(this); // Person {name: "zgh"}
}
let res = new Person('zgh');
console.log(typeof res); // object
```

### 定时器中使用

js 中的定时器都是定义在 `window` 下的，所以二者都是指向 `window`

```js
setInterval(function f() {
  console.log(this); // window
}, 2000);

setTimeout(function g() {
  console.log(this); // window
}, 0);
```

### 箭头函数中使用

箭头函数中`this`的值取决于该函数外部非箭头函数的`this`的值，即外层（函数或者全局）作用域来决定`this`，
且不能通过 `call`、`apply` 和 `bind` 方法来改变 `this` 的值。

```js
let obj = { val: '1' };
let fun = () => {
  console.log(this); // window
};
fun.call(obj);
```

全局调用指向 `window`

```js
let fun = () => {
  console.log(this); // window
};
fun();
```

作为对象的方法调用，this 指向 `window`

```js
let obj1 = {
  age: 23,
  fun: () => {
    console.log(this); // window
  }
};
obj1.fun();

let obj2 = {
  age: 23,
  fun: function () {
    console.log(this); // {age: 23, fun: ƒ}
  }
};
obj2.fun();

// 推荐使用方法简写
let obj3 = {
  age: 23,
  fun() {
    console.log(this); // {age: 23, fun: ƒ}
  }
};
obj3.fun();
```

箭头函数作为定时器延时执行的函数调用，this 指向定义时所在的对象

```js
let obj = {
  fun: function () {
    setTimeout(() => {
      console.log(this); // obj
    }, 0);
    // setTimeout(function() {
    // console.log(this);  // window
    // },0)
  }
};
obj.fun();
```

#### 小测试

1、输出结果

```js
let user = {
  name: 'zgh',
  go() {
    console.log(this.name);
  }
}(user.go)();
```

结果：ReferenceError

解析：js 不会在括号(user.go)() 的前面添加分号；所以解析成了

```js
let user = { go:... }(user.go)()
```

在语法构成上，把对象 { go: ... } 作为一个方法调用，并且传递的参数为 (user.go)。并且让 let user 在同一行赋值，因此 user 没被定义（之前）就会出现错误。
在 user 对象的后面加上分号`；`就可以了

2、输出结果

```js
function setUser() {
  return { cool: 'zgh', ref: this };
}
let user = setUser();
console.log(user.ref.cool);
```

结果： undefined

解析：

这是因为设置的 this 的规则并没有找到对象字面量。

这里 `setUser()` 中的 this 值是 `undefined`，因为它是被作为函数调用的，而不是方法调用。

对象字面量本身对于 this 没有影响。this 的值是整个函数，代码段和对象字面量对它没有影响。

所以，`ref: this` 实际上取的是该函数当前的 this。打印 `user.ref` 结果是`window`

```js
function setUser() {
  return {
    cool: 'zgh',
    ref() {
      return this;
    }
  };
}
let user = setUser();
console.log(user.ref().cool); // zgh
```

此处 `user.ref()` 是一个方法，this 指向 user 对象

## bind、call、apply

![img](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1699345047.png)

三者都能改变 `this` 的指向

`call` 接收的是一个参数列表，`apply` 接收的是一个参数数组

`bind` 接收的也是一个参数列表，返回一个新的函数，必须调用才会执行

```js
let a = { value: 1 };
function getValue(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value); // 1
}
getValue.call(a, 'zgh', '23'); // this指向a
getValue.apply(a, ['zgh', '23']);
getValue.bind(a, 'zgh', '23')();
```

## IIFE

立即执行函数表达式（Immediately Invoked Function Expression，IIFE）

将一个函数用括号包裹起来，然后在函数定义后的括号会立即调用这个函数

作用：

- 隔离作用域，防止污染全局作用域
- 模块化开发，将代码封装在一个独立的作用域内，避免了变量和函数的污染
- 立即执行，可以用来执行初始化的操作

```js
(function f(x) {
  console.log(x); // 1
})('1');

(function () {
  var iife = 'zgh';
})();
console.log(iife); // Uncaught ReferenceError: iife is not defined

var res = (function () {
  var fe = 'hehe';
  return fe;
})();
console.log(res); // hehe
```

## 深拷贝、浅拷贝

### 浅拷贝

如果对象中的属性是基本类型，拷贝的是基本类型的值。如果属性是引用类型，拷贝的是内存地址。即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址

实现一个浅拷贝的方法：

```js
function shallowClone(obj) {
  const newObj = {};
  for (let i in obj) {
    newObj[i] = obj[i];
  }
  return newObj;
}
```

使用示例：

```js
const obj = {
  foo: 'zgh',
  bar: { a: 1 }
};

const newObj = shallowClone(obj);

newObj.bar.a = 2;
console.log(obj.bar.a); // 2

obj.foo = 'copy';
console.log(newObj.foo); // zgh
```

其他几种方法实现浅拷贝：

1、扩展运算符

```js
const obj = { name: 'zgh' };
const newObj = { ...obj };
```

2、`Object.assign()`

```js
const obj = { name: 'zgh' };
const newObj = Object.assign({}, obj);
```

3、`Object.create()`

```js
const obj = { name: 'zgh' };
const newObj = Object.create(obj);
```

这种方法创建了一个新对象，它的原型链指向了 obj

4、`Array.from()`

```js
const arr = [1, 2, 3];
const newArr = Array.from(arr);
```

5、`slice()`

```js
const arr = [1, 2, 3];
const newArr = arr.slice();
```

6、`concat()`

```js
const arr = [1, 2, 3];
const newArr = arr.concat();
```

### 深拷贝

深拷贝创建了一个新的对象，而且这个新对象和原始对象完全独立，对应两个不同的内存地址

方式一：

```js
const deepClone = (obj) => {
  // 如果是基本类型或 null，则直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  const newObj = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // typeof null === 'object'
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        newObj[key] = deepClone(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};
```

方式一可以适应大部分场景，但是没有考虑处理循环引用的情况，可能会导致栈溢出错误

```js
const obj = {
  a: 1,
  b: { c: 2, d: 3 }
};
obj.self = obj;

// Uncaught RangeError: Maximum call stack size exceeded
const copiedObj = deepClone(obj);
```

方式二、使用 WeakMap 来存储已经处理过的对象

```js
const deepClone = (obj, cache = new WeakMap()) => {
  // 如果是基本类型或 null，则直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  // 处理循环引用
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  const newObj = Array.isArray(obj) ? [] : {};
  cache.set(obj, newObj);

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        newObj[key] = deepClone(obj[key], cache);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
};
```

### JSON.parse(JSON.stringify())

`JSON.parse(JSON.stringify())`是有一些局限性的深拷贝

```js
const arr = [1, 2, { name: 'zgh' }];

const newArr = JSON.parse(JSON.stringify(arr));
newArr[2].name = 'lrx';

console.log(newArr); // [1, 2, { name: 'lrx' }]
console.log(arr); // [1, 2, { name: 'zgh' }]]
```

注意事项：

1、如果对象中存在循环引用，即对象包含一个指向自身的属性，使用这种方式拷贝会报错

```js
const obj = { name: 'zgh' };
obj.self = obj;

// Uncaught TypeError: Converting circular structure to JSON
const newObj = JSON.parse(JSON.stringify(obj));
```

2、无法拷贝函数、undefined、Symbol

```js
const obj = {
  name: 'js',
  a: undefined,
  b: function () {},
  c: Symbol('js')
};
const newObj = JSON.parse(JSON.stringify(obj));
console.log(newObj); // {name: "js"}
```

3、只会拷贝对象自身的属性，不会拷贝原型链上的属性

```js
function Person(name) {
  this.name = name;
}

Person.prototype.foo = function () {
  console.log('foo');
};
Person.prototype.bar = 'js';

const obj = new Person('zgh');
const newObj = JSON.parse(JSON.stringify(obj));

console.log(newObj.bar); // undefined

newObj.foo(); // 报错：newObj.sayHello is not a function
```

### 如何区分深拷贝与浅拷贝？

简单来说，就是假设 B 复制了 A，当修改 A 时，看 B 是否会发生变化，如果 B 也跟着变了，说明这是浅拷贝，如果 B 没变，那就是深拷贝

区别：浅拷贝只复制对象的自身属性、深拷贝可以对对象的属性进行递归复制

## 防抖和节流

### 防抖

**事件在被触发 n 秒后执行回调函数，如果在这 n 秒内事件又被触发，则重新计时。** 即在规定时间内未触发第二次，则执行回调函数

示例：在输入框中输入结束再去执行请求，但是下面代码在没有输入结束就会发出多次请求

```html
<input type="text" id="my-input" />

<script>
  let inp = document.getElementById('my-input');
  function ajaxTest(a) {
    console.log(a);
  }
  inp.addEventListener('keyup', (e) => {
    ajaxTest(e.target.value);
  });
</script>
```

使用防抖

```js
function ajaxTest(a) {
  console.log(a);
}

function debounce(fn, delay) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

let debounceAjax = debounce(ajaxTest, 500);
let inp = document.getElementById('my-input');
inp.addEventListener('keyup', (e) => {
  debounceAjax(e.target.value);
});
```

使用防抖后，当用户在频繁的输入时，并不会发送请求，只有当用户在指定间隔内没有输入时，才会执行函数。如果停止输入但是在指定间隔内又输入，会重新触发计时。

### 节流

**在规定时间内多次触发函数，只有第一次有效。**

方式一、使用时间戳

```js
function throttle(func, delay) {
  let last = 0;
  return function () {
    let now = Date.now();
    if (now - last >= delay) {
      func.apply(this, arguments);
      last = now;
    }
  };
}

function ajaxTest(a) {
  console.log(a);
}

let throttleAjax = throttle(ajaxTest, 1000); // 函数在每 1s 内执行一次
let inputs = document.getElementById('my-input');
inputs.addEventListener('keyup', function (e) {
  throttleAjax(e.target.value);
});
```

方式二、使用定时器

```js
function throttle(fun, delay) {
  let last, deferTimer;
  return function (args) {
    let that = this;
    let _args = arguments;
    let now = +new Date();

    clearTimeout(deferTimer);

    if (last && now < last + delay) {
      deferTimer = setTimeout(function () {
        last = now;
        fun.apply(that, _args);
      }, delay);
    } else {
      last = now;
      fun.apply(that, _args);
    }
  };
}
```

### 应用场景

防抖：

- 搜索

节流：

- 上拉加载
- 下拉刷新
- 鼠标快速多次触发事件

## 递归

在一个函数定义的内部调用自身就是递归

要注意界限值，不要无限递归，存在堆栈溢出的风险。函数调用会使用栈来保存临时变量，每调用一次函数，
都会将临时变量存入栈中，函数执行完成后才出栈，如果调用层次很深，就会有堆栈溢出的风险

- 求 5 的累加

```js
function f(n) {
  if (n === 1) {
    return 1;
  }
  return f(n - 1) + n;
}
console.log(f(5));
```

- 斐波那契数列

```js
// F(1)=1，F(2)=1, F(n)=F(n-1)+F(n-2)（n>=3，n∈N*）
// 1, 1, 2, 3, 5, 8, 13, 21, ......
function f(n) {
  if (n === 1 || n === 2) {
    return 1;
  } else {
    return f(n - 1) + f(n - 2);
  }
}
console.log(f(3));
```

## 高阶函数

通过接收其他函数作为参数，或者返回其他函数的函数

```js
function foo() {
  const a = 1;
  function bar() {
    console.log(a);
  }
  return bar;
}

const res = foo();
res();
```

## 函数柯里化

柯里化（Currying）是把一个多参数的函数，转变为单一参数的函数

```js
function f(x, y) {
  return x + y;
}
f(1, 2);

function g(x) {
  return function (y) {
    return x + y;
  };
}
g(1)(2);
```

示例：实现 `add(1)(2)(3)`的结果是 6

初步实现：

```js
function add(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
add(1)(2)(3);
```

这种方式只能实现有限的层级，并不能无限嵌套。下面使用闭包，并重写函数的 `toString()` 方法来实现任意数累加

```js
function add(a) {
  function sum(b) {
    a = a + b;
    return sum;
  }
  sum.toString = function () {
    return a;
  };
  return sum;
}

const res = add(1)(2)(3).toString();
```

这里的调用链实际上是在执行多次 sum 函数，每次将参数累加到 a 上。最终的返回值是一个函数，该函数的 toString 方法返回累加后的结果

## 函数缓存

函数缓存，就是将函数运行过的结果进行临时缓存，用空间换时间。实现函数缓存主要依靠闭包、高阶函数、柯里化

实现原理：把参数和对应的结果数据存在一个对象中，调用时判断参数对应的结果是否存在，存在则直接返回结果，不存在则计算结果并保存到对象中，再返回结果

```js
function memoize(fn, context) {
  let cache = {};
  context = context || this;
  return (...key) => {
    if (!cache[key]) {
      cache[key] = fn.apply(context, key);
    }
    return cache[key];
  };
}

const add = (a, b) => {
  console.log('add被调用了');
  return a + b;
};
const calc = memoize(add);
const n1 = calc(1, 2);
const n2 = calc(1, 2);
console.log(n1, n2);
```

结果显示 add 函数被调用了 1 次，n2 就是缓存的结果

应用场景：

1. 执行复杂计算的函数
2. 具有重复输入值的递归函数

## Event Loop

### 宏任务

宏任务（Macro Task）是指由 JavaScript 主线程执行的任务，它包括但不限于以下情况：

- script 脚本
- 浏览器事件（如 click、mouseover 等）
- 定时器任务（setTimeout、setInterval、setImmediate(Node.js 环境)）
- 页面渲染（如 回流或重绘）
- 事件回调（如 I/O、点击事件等）
- 网络请求
- requestAnimationFrame

setTimeout 并不是直接把回调函数放进异步队列中去，而是在定时器的时间到了之后才放进去。如果此时这个队列已经有很多任务了，那就排在它们的后面

### 微任务

微任务（Micro Task）

- Promise 的`then/catch/finally`方法
- `process.nextTick` (Node.js 环境)
- MutaionOberver（浏览器环境）

`new Promise()`是同步任务

### 事件循环机制

1. 首先开始执行主线，从上往下执行所有的同步代码
2. 在执行过程中如果遇到宏任务就存放到宏任务队列中，遇到微任务加入微任务队列，然后主线往下执行，直到主线执行完毕
3. 查看微任务队列中是否存在微任务，如果存在，则将所有微任务也按主线方式执行完成，然后清空微任务队列
4. 开始将宏任务队列中的第一个宏任务设置为主线继续执行，执行完一个宏任务，会去查看微任务队列，接着立即执行所有的微任务，然后再进行下一个宏任务，直到所有的宏任务队列执行清空完成

每个宏任务之后，引擎会立即执行微任务队列中的所有任务，然后再执行其他的宏任务

示例 1：

```js
console.log(1);
setTimeout(() => {
  console.log(2);
}, 6000);
console.log(3);

const button = document.querySelector('button');

button.addEventListener('click', () => {
  console.log(4);
});

console.log(5);
```

如果在定时器时间 6s 内点击，则输出顺序是：1、3、5、4、2，否则输出顺序是：1、3、5、2、4

示例 2：

```js
console.log(1);

setTimeout(() => {
  console.log(2);
}, 0);

Promise.resolve().then(() => console.log(3));

Promise.resolve().then(() => setTimeout(() => console.log(4)));

setTimeout(() => Promise.resolve().then(() => console.log(5)));

setTimeout(() => console.log(6));

console.log(7);
```

答案是：1 7 3 2 5 6 4

示例 3：

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('asnyc1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(() => {
  console.log('setTimeOut');
}, 0);
async1();
new Promise(function (reslove) {
  console.log('promise1');
  reslove();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
```

答案：

```
script start
async1 start
async2
promise1
script end
asnyc1 end
promise2
setTimeOut
```

## Math 对象

Math 是 js 的内置对象，提供了用于数学计算的方法和属性

常用方法：

- `Math.round(x)` 四舍五入取整
- `Math.ceil(x)` 向上取整
- `Math.floor(x)` 向下取整
- `Math.random()` 返回`[0,1)`的随机浮点数
- `Math.abs(x)` 返回 x 的绝对值
- `Math.max(x, y, ...)` 返回一组数字中的最大值
- `Math.min(x, y, ...)` 返回一组数字中的最小值
- `Math.pow(x, y)` 返回 x 的 y 次幂
- `Math.sqrt(x)` 返回一个数的平方根
- `Math.sin(x)`、`Math.cos(x)`、`Math.tan(x)` 返回 x 的正弦、余弦、正切值
- `Math.log(x)` 返回一个数的自然对数

常用属性：

- `Math.PI`：表示圆周率 π（π 约等于 3.14159265359）
- `Math.E`：表示自然对数的底数 e（e 约等于 2.71828182846）
- `Math.LN2`：表示 2 的自然对数（约等于 0.69314718056）
- `Math.LN10`：表示 10 的自然对数（约等于 2.30258509299）
- `Math.LOG2E`：表示以 2 为底的 e 的对数（约等于 1.44269504089）
- `Math.LOG10E`：表示以 10 为底的 e 的对数（约等于 0.43429448190）

```js
Math.round(1.23); // 1
Math.round(1.78); // 2
Math.round(-1.23); // -1
Math.round(-1.78); // -2

Math.ceil(1.23); // 2
Math.ceil(1.78); // 2
Math.ceil(-1.23); // -1
Math.ceil(-1.78); // -1

Math.floor(1.23); // 1
Math.floor(1.78); // 1
Math.floor(-1.23); // -2
Math.floor(-1.78); // -2

// 获取[n,m]之间的随机整数
Math.round(Math.random() * (m - n) + n);
```

由于 js 数字精度的问题，当位数太多时会有误差

```js
let c = 2.999999999999999999999999999999;
Math.floor(c); // 3
```

## for 循环

### 返回值

- for 没有返回值，或返回 undefined
- forEach 没有返回值，或返回 undefined
- map 会返回一个新数组

### 中断循环、跳出循环

**中断循环**：停止当前循环并进入下一次循环。由`continue`实现，会跳过当前循环体剩余的部分，然后进入下一次迭代。

```js
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue; // 当前迭代被中断，直接进入下一次迭代
  }
  console.log(i); // 只会打印奇数
}
```

**跳出循环**：完全退出整个循环。由`break`实现，会终止循环并跳出循环体，执行循环体后面的代码。

```js
for (let i = 0; i < 10; i++) {
  if (i === 3) {
    break; // 跳出循环
  }
  console.log(i); // 只会打印 0 1 2
}
```

- for 可以在循环中使用`break`和`continue`
- forEach 和 map，不能被 break 或 continue 中断

如果在 forEach 中使用 `return`，只会停止当前回调函数的执行，继续下一次回调。

```js
const arr = [1, 2, 3];
arr.forEach((e) => {
  if (e === 2) {
    console.log('ok');
    return;
  }
  console.log(e);
});
```

如果在 map 中使用 `return`，会影响新的数组中对应元素的值，会返回 undefined

```js
const arr = [1, 2, 3];
const newArr = arr.map((e) => {
  if (e === 2) {
    return;
  }
  return e * 2;
});

console.log(newArr); // [2, undefined, 6]
```

forEach 和 map 无法跳出循环，除非使用 try/catch 捕获抛出的异常来跳出循环

```js
try {
  arr.forEach((value) => {
    if (value === 2) {
      throw new Error('Break');
    }
    console.log(value);
  });
} catch (e) {
  throw e;
}
```

### 是否改变原始数组

for 循环本身不会改变原始数组，但如果在循环体内修改了数组元素，则原始数组会被改变。

```js
let arr = [1, 2, 3, 4];
for (let i = 0; i < arr.length; i++) {
  arr[i] *= 2;
}
console.log(arr); // [2, 4, 6, 8]
```

对于基础数据类型，forEach 和 map 不会改变原始数组，但是如果在回调函数内修改了原始数组的元素，原始数组会被改变

```js
const arr1 = [1, 2, 3];
const a = arr1.forEach((e, i, array) => {
  e = e + 1;
  // array[i] = e + 1;
});
console.log(a); // undefined
console.log(arr1); // [1, 2, 3]

const arr2 = [1, 2, 3];
const b = arr2.map((e, i, array) => {
  // array[i] *= 2; // 修改了原始数组的元素
  return e * 2;
});
console.log(b); // [2, 4, 6]
console.log(arr2); // [1, 2, 3]
```

对于引用类型，forEach 和 map 都会改变原始数组

```js
const arr = [
  { a: 'foo', b: 1 },
  { a: 'bar', b: 2 }
];
arr.forEach((item) => {
  if (item.a === 'foo') {
    item.b = 3;
  }
});
console.log(arr);
```

### 遍历数组

`for` 循环、`forEach`、`map`、`for of`

```js
let arr = ['zgh', 22, 180, 125];

for (let i = 0, len = arr.length; i < len; i++) {}

for (let m of arr) {
}
```

### 遍历对象

`for in` 循环遍历键名，遍历数组下标的类型是`string`，不要使用这种方式遍历数组！仅适用于遍历普通对象的 key

`for`循环 无法用于循环对象，获取不到`obj.length`

`for in`循环遍历对象的属性时，原型链上的所有属性都将被访问，可以使用`hasOwnProperty`方法过滤或`Object.keys`会返回自身可枚举属性组成的数组

```js
for (let k in arr) {
  console.log(k); // 0 1 2 3，返回的是数组下标
  console.log(typeof k); // string
}
```

### while

只要条件为 true，while 会一直循环执行代码块

```js
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}
```

do/while 循环，会先执行一次 do 里面的代码块，如果条件为真，会继续循环执行

```js
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 10);
```

## not defined 和 undefined

如果定义了一个变量，但未赋值，则是`undefined`; 如果未定义，则是`not defined`

```js
let a;
console.log(a); // undefined
console.log(b); // b is not defined
```

## 锚点链接

实现地址栏变化，页面不刷新

### 页面内的跳转

方法一、

```html
<!--设置一个锚点链接-->
<a href="#zgh">zgh</a>

<!--在页面中需要的位置设置锚点-->
<a name="zgh">haha</a>
```

方法二、

```html
<!--设置一个锚点链接-->
<a href="#zgh">zgh</a>

<!--在页面中需要的位置设置锚点-->
<h3 id="zgh">hahha</h3>
```

### 跨页面跳转

```html
<!--设置锚点链接-->
<a href="demo.html#zgh">zgh</a>

<!--在要跳转的页面设置锚点-->
<a href="#zgh">zgh</a>
```

## 千位分割符

`toLocaleString()`

```js
(386485473.88).toLocaleString('en-US'); // 386,485,473.88
```

小数部分会根据四舍五入只留下三位

## 表达式和运算符

### 递增/递减操作符

前置自增，先执行后运算

```js
let a = 1;
let b = a++;
console.log(a); // 2
console.log(b); // 1
```

后置自增，先运算后执行

```js
let a = 1;
let b = ++a;
console.log(a); // 2
console.log(b); // 2
```

## 禁用网页中的单击右键

```html
<body oncontextmenu="return false;"></body>
```

## 更改网页标题

```js
// 获取标题
document.title;

// 更改标题
document.title = 'hello world';
```

## 全屏事件

```js
function requestFullscreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else {
    console.log('no Fullscreen Support');
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else {
    console.log('no Fullscreen Support');
  }
}
```

监听 ESC 键，退出全屏。vue 中可以写在 mounted 生命周期内

```js
// W3C
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    this.isFullScreen = false;
  }
});
// webkit
document.addEventListener('webkitfullscreenchange', (e) => {
  if (!e.currentTarget.webkitIsFullScreen) {
    this.isFullScreen = false;
  }
});
// IE
document.addEventListener('MSFullscreenChange', () => {
  if (!document.msFullscreenElement) {
    this.isFullScreen = false;
  }
});
// firefox
document.addEventListener('mozfullscreenchange', () => {
  if (!document.mozFullScreenElement) {
    this.isFullScreen = false;
  }
});
```

## 将十进制转为二进制或十六进制

[Number.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)

```js
const num = 10;

num.toString(2); // "1010"
num.toString(16); // "a"
num.toString(8); // "12"
```

## 谷歌浏览器监听三次点击

监听 click 事件，detail 为 3 就是三击

```js
// <button id='btn'>click</button>

const dom = document.querySelector('#btn');
dom.addEventListener('click', (evt) => {
  if (evt.detail === 3) {
    window.open(url.href, '_blank');
  }
});
```
