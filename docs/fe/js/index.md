# JS

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

::: tip
关于存储位置是栈内存还是堆内存这里存在争议
:::

## 类型判断

### `typeof`

```js
typeof 'js'; // 'string'
typeof 666; // 'number'
typeof true; // 'boolean'
typeof null; // 'object'
typeof undefined; // 'undefined'
typeof Symbol(); // 'symbol'
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

除了 undefined、null、' '、NaN、0、false 转换出来是 false，其他都是 true

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

## 提升

提升有变量提升和函数提升

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

在 JavaScript 中函数的创建方式有三种：函数声明（静态的）、函数表达式（函数字面量）、构造函数（动态的，匿名的）。

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

## 原型链

在 js 中，每个函数都有一个`prototype`属性，这个属性指向函数的原型对象；

每个对象（null 除外）都有一个`__proto__`属性，这个属性指向该对象的原型；

每个原型都有一个`constructor`属性，指向关联的构造函数；

原型也是一个对象，所以也有原型。当我们访问一个对象的属性或方法时，会先在对象自身中寻找，如果找不到则在原型中寻找，如果还找不到，则继续在原型的原型中寻找，
以此类推，直到找到为止，若找不到则返回`undefined`，这就是原型链。

函数也有`__proto__`属性

```js
let fn = function () {};
fn.__proto__ === Function.prototype; // true
```

```js
let obj = {};
console.log(obj);
console.log(obj.constructor.prototype === obj.__proto__); // true

let arr = [];
console.log(arr);

function Person(name) {
  this.name = name;
}
console.log(Person.prototype); // {constructor: ƒ}
Person.prototype.age = 23;

let person1 = new Person('zgh');
console.log(person1); // Person {name: "zgh"}
console.log(person1.age); // 23

console.log(person1.__proto__ === Person.prototype); // true

console.log(Person === Person.prototype.constructor); // true
```

函数 Person 的 prototype 属性指向了一个对象，这个对象正是调用构造函数时创建的实例 person1 的原型

::: tip
要获取原型推荐使用`Object.getPrototypeOf()`，不要使用`__proto__`

`Object.getPrototypeOf(obj) === obj.__proto__`为 true
:::

## 作用域

作用域指变量的有效范围。分为全局作用域、局部作用域、块级作用域。

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

当在函数作用域操作一个变量时，它会先在自身作用域中寻找，如果有就直接使用（就近原则）。如果没有则向上一级作用域中寻找，直到找到全局作用域；
如果全局作用域中依然没有找到，则会报错 `ReferenceError`。

在函数中要访问全局变量可以使用`window`对象。

### 执行上下文

执行上下文是执行 JavaScript 代码的环境

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
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

上面代码会输出 5 次 6，延迟函数的回调会在循环结束时才执行。

```js
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(function timer() {
      console.log(j);
    }, j * 1000);
  })(i);
}
```

在迭代内使用`IIFE`会为每个迭代都生成一个新的作用域，使得延迟函数的回调函数可以将新的作用域封闭在每个迭代的内部，
每个迭代中都会有一个正确的变量值供我们访问。

还有一种更方便的方式，就是使用块作用域，将`var`换成`let`

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i);
  }, i * 1000);
}
```

## this 指向

### 全局执行

```js
console.log(this); //  window
```

### 函数中执行

#### 1、标准模式

```js
function f() {
  console.log(this); // window
}
f();
```

#### 2、严格模式

```js
'use strict';
function f() {
  console.log(this); // undefined
}
f();
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
let dd = 'js'; // 若 var dd = 'js',则 this.dd结果为 js
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
function f(name) {
  this.name = name;
  console.log(this); // f {name: "zgh"}
}
let res = new f('zgh');
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

### 立即执行函数表达式

IIFE（Immediately-invoked function expression）

目的是为了隔离作用域，防止污染全局作用域

#### 方式一

```js
(function f(x) {
  console.log(x); // 1
})('1');
```

#### 方式二

```js
(function g(x) {
  console.log(x); // 2
})('2');
```

示例

```js
(function f() {
  var iife = 'zgh';
})();
console.log(iife); // Uncaught ReferenceError: iife is not defined
```

```js
var res = (function () {
  var fe = 'hehe';
  return fe;
})();
console.log(res); // hehe
```

## 深拷贝、浅拷贝

浅拷贝：

```js
const obj = { name: 'zgh' };
function shallowClone(obj) {
  const newObj = {};
  for (let i in obj) {
    newObj[i] = obj[i];
  }
  return newObj;
}
shallowClone(obj); // {name: "zgh"}
```

深拷贝：

```js
function deepClone(obj) {
  if (typeof obj === 'object') {
    let res = obj.constructor === Array ? [] : {};
    for (let i in obj) {
      res[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i];
    }
  } else {
    let res = obj;
  }
  return obj;
}
```

`JSON.parse(JSON.stringify())`就是有一些局限性的深拷贝

```js
let arr = [1, 2, { name: 'zgh' }];
let newArr = JSON.parse(JSON.stringify(arr));
newArr[2].name = 'lrx';
console.log(newArr); // [1, 2, { name: 'lrx' }]
console.log(arr); // [1, 2, { name: 'zgh' }]]
```

<https://juejin.im/post/59ac1c4ef265da248e75892b>

<https://www.cnblogs.com/echolun/p/7889848.html>

如何区分深拷贝与浅拷贝？

简单来说，就是假设 B 复制了 A，当修改 A 时，看 B 是否会发生变化，如果 B 也跟着变了，说明这是浅拷贝，如果 B 没变，那就是深拷贝

区别：浅拷贝只复制对象的第一层属性、深拷贝可以对对象的属性进行递归复制

浅拷贝是将原始对象中的数据型字段拷贝到新对象中去，将引用型字段的“引用”复制到新对象中去，不把“引用的对象”复制进去，
所以原始对象和新对象引用同一对象，新对象中的引用型字段发生变化会导致原始对象中的对应字段也发生变化。

深拷贝是在引用方面不同，深拷贝就是创建一个新的和原始字段的内容相同的字段，是两个一样大的数据段，所以两者的引用是不同的，
之后的新对象中的引用型字段发生改变，不会引起原始对象中的字段发生改变。

## 节流和防抖

### 防抖

**事件在被触发 n 秒后执行回调函数，如果在这 n 秒内事件又被触发，则重新计时。** 即在规定时间内未触发第二次，则执行回调函数

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

需求是在输入框中输入结束再去执行请求，但是示例中在没有输入结束就发出多次请求，浪费资源。

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

时间戳版

```js
function throttle(func, delay) {
  let last = 0;
  return function () {
    let now = Date.now();
    if (now - last >= delay) {
      func.apply(this, arguments);
      last = now;
    } else {
      console.log('距离上次调用的时间差不满足要求');
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

定时器版

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
//1,1,2,3,5,8,13,21......
function f(n) {
  if (n === 1 || n === 2) {
    return 1;
  } else {
    return f(n - 1) + f(n - 2);
  }
}
console.log(f(3));
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

示例：实现 `add(1)(2)(3) => 6`

```js
function add(a) {
  function sum(b) {
    // 使用闭包
    a = a + b; // 累加
    return sum;
  }
  sum.toString = function () {
    // 重写toSting() 方法
    return a;
  };
  return sum; // 返回一个函数
}
add(1)(2)(3);
```

## Math.floor、Math.round、Math.ceil

- `Math.round` 四舍五入取整
- `Math.ceil` 向上取整
- `Math.floor` 向下取整
- `Math.random` 取`[0,1)`的随机小数
- `Math.abs(x)` 取 x 的绝对值

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

### 遍历数组

- `for` 循环，数组下标的类型是`number`
- `forEach`，没有返回值
- `map`
- `for of`，推荐

```js
let arr = ['zgh', 22, 180, 125];
for (let i = 0, len = arr.length; i < len; i++) {
  console.log(typeof i); // number
}

for (let m of arr) {
}

for (let k in arr) {
  console.log(k); // 0 1 2 3，返回的是数组下标
  console.log(typeof k); // string
}
```

### 遍历对象

`for in` 循环遍历键名，遍历数组下标的类型是`string`，不要使用这种方式遍历数组！仅适用于遍历普通对象的 key

`for`循环 无法用于循环对象，获取不到`obj.length`

`for in`循环遍历对象的属性时，原型链上的所有属性都将被访问，可以使用`hasOwnProperty`方法过滤或`Object.keys`会返回自身可枚举属性组成的数组

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

### 自增

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
