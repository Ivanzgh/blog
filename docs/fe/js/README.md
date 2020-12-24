# 介绍

## 数据类型

基本数据类型：`Number`、`String`、`Boolean`、`Null`、`Undefined`、`Symbol`、`BigInt`

引用类型： 函数、数组、对象

基本数据类型将数据名和值存储在栈中；

引用类型在栈中存入地址，该地址指向堆内存，将具体值存储在堆中。访问时先从栈中获取地址，再从堆中获取相应值

::: tip
在拷贝时，基本数据类型拷贝的是具体值，引用类型拷贝的是指向堆内存的地址
:::

```js
let a = 1       // 在内存中开辟一块空间存储a的值 1
let b = a      // 开辟一块新的内存空间，将a的值拷贝一份存储到新的内存里
a = 2
console.log(a)  // 2
console.log(b)  // 1

let c = {x: 3}
let d = c
c.x = 4
console.log(c)      // {x: 4}
console.log(d)      // {x: 4}
```

## for与for in循环的区别

### 遍历数组

+ for循环 数组下标的typeof类型是`number`

+ for in循环 数组下标的typeof类型是`string`

```js
let arr = ['zgh',22,180,125]
for (let i = 0; i < arr.length; i++) {
    console.log(typeof i);  //number
    console.log(arr[i]);
}
for (let k in arr) {
    console.log(typeof k); //string
    console.log(arr[k]);
}
```

### 遍历对象

`for`循环 无法用于循环对象，获取不到`obj.length`;

`for in`循环遍历对象的属性时，原型链上的所有属性都将被访问，

解决方案：使用`hasOwnProperty`方法过滤或`Object.keys`会返回自身可枚举属性组成的数组

```js
Object.prototype.sex = 'man'
let obj = {name : 'zgh', age : 22}
for (let m = 0; m < obj.length; m++) {
    console.log(typeof m); //空
    console.log(obj[m]);  //空
}
for (let n in obj) {
    console.log(typeof n); // string
    console.log(obj[n]);//zgh,22,man
}
console.log(Object.prototype);
```

## innerHTML和innerText的区别

都能获取document对象文本内容，`innerHTML`能获取html标签，而`innerText`不能获取

```html
<!-- innerHTML -->
<p>666</p>

<!-- innerText -->
666
```

## js隐式类型转换

<https://blog.csdn.net/qq_33120763/article/details/88296955>

<https://www.cnblogs.com/superlizhao/p/8945432.html>

```js
console.log('1'+1);   // '11'   string
console.log('1'-1);   //  0    number

console.log([] == []);   // false
```

## not defined和undefined的区别

如果定义了一个变量，但未赋值，则是`undefined`; 如果未定义，则是`not defined`

```js
let a;
console.log(a);   // undefined
console.log(b);   // b is not defined
```

## 类型转换

### 数字转化为字符串

1、toString()

```js
let a = 123
let b = a.toString()
console.log(typeof b)
```

2、String()

```js
let b = String(123)
console.log(typeof b)
```

### 字符串转化为数字

1、Number()

```js
let b = Number('12.3')
console.log(b);
```

2、parseInt()和parseFloat()

```js
parseInt("1234blue"); // 1234
parseInt("0xA"); // 10
parseInt("22.5"); // 22
parseInt("blue"); // NaN
```

3、在字符串前面加上 `+`

```js
let res1 = parseInt('1')
let res2 = parseFloat('1.23')

console.log(typeof +'1')    // "number"
```

## Math.floor、Math.round、Math.ceil

`Math.round`四舍五入取整 `Math.ceil`向上取整 `Math.floor`向下取整

```js
Math.round(1.23)    // 1
Math.round(1.78)    // 2
Math.round(-1.23)   // -1
Math.round(-1.78)   // -2

Math.ceil(1.23)     // 2
Math.ceil(1.78)     // 2
Math.ceil(-1.23)    // -1
Math.ceil(-1.78)    // -1

Math.floor(1.23)    // 1
Math.floor(1.78)    // 1
Math.floor(-1.23)   // -2
Math.floor(-1.78)   // -2
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
(386485473.88).toLocaleString('en-US')   // 386,485,473.88
```

小数部分会根据四舍五入只留下三位

## 回流与重绘

### 回流(reflow)

只要修改了dom或改变了元素的形状或大小等，会改变布局的操作就会触发reflow

### 重绘(repaint)

只是改变了颜色，不影响周围元素或布局，会引起浏览器的重绘

### 减少reflow和repaint

+ 不要一条一条的修改样式，应该固定写一个class，更换className，减少reflow次数
+ 不要把 DOM结点的属性值放在一个循环里当成循环里的变量
+ 为动画的HTML文件使用position:fixed 或 absolute，那么修改他们的CSS是不会 reflow 的
+ 避免使用table布局，一个很小的改动会造成整个table reflow

## 奇怪的知识

```js
0 == []     // true

0 == "0"    // true

"0" == []   // false

0 == ""     // true

[] == ""    // true
```

## 表达式和运算符

### 自增

前置自增，先执行后运算

```js
let a = 1
let b = a++
console.log(a)  // 2
console.log(b)  // 1
```

后置自增，先运算后执行

```js
let a = 1
let b = ++a
console.log(a)  // 2
console.log(b)  // 2
```
