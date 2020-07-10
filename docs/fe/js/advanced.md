# 进阶

## 变量提升
提升有变量提升和函数提升
### 变量提升

变量提升，就是把变量提升到函数的顶部，只是提升变量的声明，不会把变量的值也提升上来
```js
var name="haha";
function changeName(){
    console.log(name);
    var name="xixi";
}
changeName();   //undefined
console.log(name);   //haha
```
提升后如下
```js
var name="haha";
function changeName(){
    var name;
    console.log(name);
    name="xixi";
}
changeName();
console.log(name);
```
### 函数提升

函数提升就是把函数提升到前面。

在JavaScript中函数的创建方式有三种：函数声明（静态的）、函数表达式（函数字面量）、函数构造法（动态的，匿名的）。

函数表达式的形式如下：
```js
var func1 = function(n1,n2){
    //function body;
};
```
函数构造法构造函数的形式如下:
```js
var func2 = new Function("para1","para2",...,"function body"); 
```
只有函数声明形式才能被提升
```js
//函数声明
function f(){ 
    g(); 
    function g(){ 
        console.log("我可以被提升"); 
    } 
} 
f();
```

## 原型链
在js中，每个函数都有一个prototype属性，这个属性指向函数的原型对象；

每个对象（null除外）都有一个__proto__属性，这个属性指向该对象的原型；

每个原型都有一个constructor属性，指向关联的构造函数；

原型也是一个对象，所以也有原型。当我们访问一个对象的属性或方法时，会先在对象自身中寻找，如果找不到则在原型中寻找，如果还找不到，则继续在原型的原型中寻找，以此类推，直到找到为止，若找不到则返回undefined，这就是原型链。
```js
let obj = {};
console.log(obj);
console.log(obj.constructor.prototype === obj.__proto__);   // true

let arr = [];
console.log(arr);

function Person(name) {
    this.name = name
}
console.log(Person.prototype);    // {constructor: ƒ}
Person.prototype.age = 23;

let person1 = new Person('zgh');
console.log(person1);   // Person {name: "zgh"}
console.log(person1.age);  // 23

console.log(person1.__proto__ === Person.prototype);  // true

console.log(Person === Person.prototype.constructor);   // true
```
函数Person的prototype属性指向了一个对象，这个对象正是调用构造函数时创建的实例person1的原型

## bind、call、apply
三者都能改变this的指向

call接收的是一个参数列表，apply接收的是一个参数数组

bind接收的也是一个参数列表，返回一个新的函数，必须调用才会执行

```js
let a = {
    value: 1
};
function getValue(name, age) {
    console.log(name);
    console.log(age);
    console.log(this.value);   // 1
}
getValue.call(a, 'zgh', '23'); // this指向a
getValue.apply(a, ['zgh', '23']);
getValue.bind(a,'zgh','23')();
```

## 作用域

作用域指变量的有效范围。分为全局作用域、局部作用域、块级作用域。

### 全局作用域

在全局作用域中：

+ 创建的变量都会作为window对象的属性保存。
+ 创建的函数都会作为window对象的方法保存。

### 局部作用域

局部作用域在函数中创建，局部变量只能在函数中被访问

### 块级作用域

ES6增加的 let、const可以声明块级作用域

### 作用域链

当在函数作用域操作一个变量时，它会先在自身作用域中寻找，如果有就直接使用（就近原则）。如果没有则向上一级作用域中寻找，直到找到全局作用域；如果全局作用域中依然没有找到，则会报错ReferenceError。

在函数中要访问全局变量可以使用window对象。

### 执行上下文

执行上下文是执行 JavaScript 代码的环境

## this指向

### 全局执行

```js
console.log(this)  //  window
```

### 函数中执行

#### 1、标准模式

```js
function f() {
	console.log(this);   // window
}
f()
```

#### 2、严格模式

```js
"use strict";
function f() {
	console.log(this);   // undefined
}
f()
```

### 作为对象的方法调用
this指向当前对象obj
```js
let name = 'js'
let obj = {
	name: 'zgh',
	fun: function() {
		console.log(this.name);   // zgh
	}
}
obj.fun()
```
如果把对象方法赋值给变量，调用该方法时，this指向window
```js
let dd = 'js'   // 若 var dd = 'js',则 this.dd结果为 js
let obj = {
	dd: 'zgh',
	fun: function() {
		console.log(this.dd);   // undefined
	}
}
let res = obj.fun
res()
```

### 作为构造函数调用

在调用一个构造函数时加上new关键字，此时this指向这个构造函数调用时实例化出来的对象
```js
function f(name) {
	this.name = name 
	console.log(this);  // f {name: "zgh"}
}
let res = new f('zgh')
console.log(typeof res);   // object
```

### 定时器中使用
js中的定时器都是定义在window下的，所以二者都是指向window
```js
setInterval(function f() {
	console.log(this);  // window
},2000)

setTimeout(function g() {
	console.log(this);  // window
},0)
```

### 箭头函数中使用

全局调用指向window
```js
let fun = () => {
	console.log(this);  // window
}
fun()
```
作为对象的方法调用，this指向window
```js
let obj = {
	fun: () => {
		console.log(this);  // window
	}
}
obj.fun()
```
箭头函数作为定时器延时执行的函数调用，this指向定义时所在的对象
```js
let obj = {
	fun: function() {
		setTimeout(() => {
			console.log(this);  // obj
		},0)
		// setTimeout(function() {
		// 	console.log(this);  // window
		// },0)
	}
}
obj.fun()
```

箭头函数中this的值取决于该函数外部非箭头函数的this的值，且不能通过 call()、apply() 和 bind() 方法来改变this的值。
```js
let obj ={
	val: '1'
}
let fun = () => {
	console.log(this);  // window
}
fun.call(obj)
```

**小测试**

1、

```js
let user = {
	name: "zgh",
	go() {
		console.log(this.name);
	}
}

(user.go)() 
```

结果：ReferenceError

解析：js不会在括号(user.go)() 的前面添加分号；所以解析成了
```js
let user = { go:... }(user.go)()
```
在语法构成上，把对象 { go: ... } 作为一个方法调用，并且传递的参数为 (user.go)。并且让 let user在同一行赋值，因此 user 没被定义（之前）就会出现错误。在user对象的后面加上分号`；`就可以了

2、

```js
function setUser() {
	return {
		cool: "zgh",
		ref: this
	};
};
let user = setUser();
console.log(user.ref.cool);  
```

结果： undefined

解析：

这是因为设置的 this 的规则并没有找到对象字面量。

这里 makeUser() 中的 this 值是 undefined，因为它是被作为函数调用的，而不是方法调用。

对象字面量本身对于 this 没有影响。this 的值是整个函数，代码段和对象字面量对它没有影响。

所以，ref: this 实际上取的是该函数当前的 this。打印 user.ref 结果是window

```js
function setUser() {
	return {
		cool: "zgh",
		ref() {
			return this;
		}
	};
};
let user = setUser();
console.log(user.ref().cool);  // zgh
```
此处 user.ref() 是一个方法，this指向user对象

## IIFE
### 立即执行函数表达式

IIFE（Immediately-invoked function expression）

目的是为了隔离作用域，防止污染全局作用域

#### 方式一：
```js
(function f(x) {
    console.log(x);  // 1
})('1')
```

#### 方式二、
```js
(function g(x) {
    console.log(x);  // 2
}('2'))
```

#### 实例：
```js
(function f() {
    var iife = 'zgh'
})()
console.log(iife);  // Uncaught ReferenceError: iife is not defined
```

```js
var res = (function () {
    var fe = 'hehe'
    return fe
})()
console.log(res);  // hehe
```

## 深拷贝、浅拷贝

## 闭包

## 节流和防抖

### 防抖

**事件在被触发n秒后执行回调函数，如果在这n秒内事件又被触发，则重新计时。**

```html
<input type="text" id="my-input">

<script>
   let inp = document.getElementById('my-input');
   function ajaxTest (a) {
      console.log(a);
   }
   inp.addEventListener('keyup',(e) => {
       ajaxTest(e.target.value)
   })
</script>
```
需求是在输入框中输入结束再去执行请求，但是示例中在没有输入结束就发出多次请求，浪费资源。

使用防抖

```js
function ajaxTest(a) {
    console.log(a);
}

function debounce(fun, delay) {
    return function (args) {
        let that = this;
        let _args = args;
        clearTimeout(fun.id);
        fun.id = setTimeout(function () {
            fun.call(that, _args)
        }, delay)
    }
}
let debounceAjax = debounce(ajaxTest, 500);
let inp = document.getElementById('my-input');
inp.addEventListener('keyup', (e) => {
    debounceAjax(e.target.value)
})
```
使用防抖后，当用户在频繁的输入时，并不会发送请求，只有当用户在指定间隔内没有输入时，才会执行函数。如果停止输入但是在指定间隔内又输入，会重新触发计时。

### 节流

**在单位时间内，只能触发一次函数，如果触发多次，只有一次有效。**

```js
function ajax(a) {
    console.log(a);
}
function throttle(fun, delay) {
    let last, deferTimer;
    return function (args) {
        let that = this;
        let _args = arguments;
        let now = +new Date();
        if (last && now < last + delay) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fun.apply(that, _args)
            }, delay)
        } else {
            last = now;
            fun.apply(that,_args)
        }
    }
}

let throttleAjax = throttle(ajax, 1000);

let inputs = document.getElementById('throttle');
inputs.addEventListener('keyup', function(e) {
    throttleAjax(e.target.value);
})
```

函数在每1s内执行一次

### 应用场景：

防抖：
+ 搜索

节流：
+ 上拉加载
+ 下拉刷新
+ 鼠标快速多次触发事件