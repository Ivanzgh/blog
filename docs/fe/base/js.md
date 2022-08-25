# JS

## 数据类型

![image](https://cdn.jsdelivr.net/gh/Ivanzgh/ossimg@main/blog/1661153891.png)

基本数据类型：`Number`、`String`、`Boolean`、`Null`、`Undefined`、`Symbol`、`BigInt`

引用类型： `Object`、`Array`、`Function`

基本数据类型将数据名和值存储在栈中

引用类型在栈中存入地址，该地址指向堆内存，将具体值存储在堆中。访问时先从栈中获取地址，再从堆中获取相应值

::: tip
在拷贝时，基本数据类型拷贝的是具体值，引用类型拷贝的是指向堆内存的地址
:::

```js
let a = 1 // 在内存中开辟一块空间存储a的值 1
let b = a // 开辟一块新的内存空间，将a的值拷贝一份存储到新的内存里
a = 2
console.log(a) // 2
console.log(b) // 1

let c = { x: 3 }
let d = c
c.x = 4
console.log(c) // { x: 4 }
console.log(d) // { x: 4 }
```

## 类型判断

- typeof

  特殊：`typeof null`结果是`object`

- instanceof

示例：

```js
0 == []     // true

0 == "0"    // true

"0" == []   // false

0 == ""     // true

[] == ""    // true
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
console.log(b)
```

2、parseInt()和 parseFloat()

```js
parseInt('1234blue') // 1234
parseInt('0xA') // 10
parseInt('22.5') // 22
parseInt('blue') // NaN
```

3、在字符串前面加上 `+`

```js
let res1 = parseInt('1')
let res2 = parseFloat('1.23')

console.log(typeof +'1') // "number"
```

### 隐式类型转换

<https://blog.csdn.net/qq_33120763/article/details/88296955>

<https://www.cnblogs.com/superlizhao/p/8945432.html>

```js
console.log('1' + 1) // '11'   string
console.log('1' - 1) //  0    number

console.log([] == []) // false
```

## Math.floor、Math.round、Math.ceil

- `Math.round` 四舍五入取整
- `Math.ceil` 向上取整
- `Math.floor` 向下取整
- `Math.random` 取`[0,1)`的随机小数
- `Math.abs(x)` 取 x 的绝对值

```js
Math.round(1.23) // 1
Math.round(1.78) // 2
Math.round(-1.23) // -1
Math.round(-1.78) // -2

Math.ceil(1.23) // 2
Math.ceil(1.78) // 2
Math.ceil(-1.23) // -1
Math.ceil(-1.78) // -1

Math.floor(1.23) // 1
Math.floor(1.78) // 1
Math.floor(-1.23) // -2
Math.floor(-1.78) // -2

// 获取[n,m]之间的随机整数
Math.round(Math.random() * (m - n) + n)
```

由于 js 数字精度的问题，当位数太多时会有误差

```js
let c = 2.999999999999999999999999999999
Math.floor(c) // 3
```

## for 循环

### 遍历数组

- `for` 循环，数组下标的类型是`number`
- `forEach`，没有返回值
- `map`
- `for of`，推荐

```js
let arr = ['zgh', 22, 180, 125]
for (let i = 0, len = arr.length; i < len; i++) {
  console.log(typeof i) // number
}

for (let m of arr) {
}

for (let k in arr) {
  console.log(k) // 0 1 2 3，返回的是数组下标
  console.log(typeof k) // string
}
```

### 遍历对象

`for in` 循环遍历键名，遍历数组下标的类型是`string`，不要使用这种方式遍历数组！仅适用于遍历普通对象的 key

`for`循环 无法用于循环对象，获取不到`obj.length`;

`for in`循环遍历对象的属性时，原型链上的所有属性都将被访问，

解决方案：使用`hasOwnProperty`方法过滤或`Object.keys`会返回自身可枚举属性组成的数组

## if in

`if ( key in obj)` 意为判断对象`obj`中是否有 `key` 属性 ，有则返回 `true`， 没有则返回 `false`

## innerHTML 和 innerText

都能获取 document 对象文本内容，`innerHTML`能获取 html 标签，而`innerText`不能获取

```html
<!-- innerHTML -->
<p>666</p>

<!-- innerText -->
666
```

## not defined 和 undefined

如果定义了一个变量，但未赋值，则是`undefined`; 如果未定义，则是`not defined`

```js
let a
console.log(a) // undefined
console.log(b) // b is not defined
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
;(386485473.88).toLocaleString('en-US') // 386,485,473.88
```

小数部分会根据四舍五入只留下三位

## 表达式和运算符

### 自增

前置自增，先执行后运算

```js
let a = 1
let b = a++
console.log(a) // 2
console.log(b) // 1
```

后置自增，先运算后执行

```js
let a = 1
let b = ++a
console.log(a) // 2
console.log(b) // 2
```

## 禁用网页中的单击右键

```html
<body oncontextmenu="return false;"></body>
```

## 更改网页标题

```js
// 获取标题
document.title

// 更改标题
document.title = 'hello world'
```

## 全屏事件

```js
function requestFullscreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen()
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen()
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen()
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen()
  } else {
    console.log('no Fullscreen Support')
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else {
    console.log('no Fullscreen Support')
  }
}
```

监听 ESC 键，退出全屏。vue 中可以写在 mounted 生命周期内

```js
// W3C
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    this.isFullScreen = false
  }
})
// webkit
document.addEventListener('webkitfullscreenchange', (e) => {
  if (!e.currentTarget.webkitIsFullScreen) {
    this.isFullScreen = false
  }
})
// IE
document.addEventListener('MSFullscreenChange', () => {
  if (!document.msFullscreenElement) {
    this.isFullScreen = false
  }
})
// firefox
document.addEventListener('mozfullscreenchange', () => {
  if (!document.mozFullScreenElement) {
    this.isFullScreen = false
  }
})
```

## 将十进制转为二进制或十六进制

[Number.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)

```js
const num = 10

num.toString(2) // "1010"
num.toString(16) // "a"
num.toString(8) // "12"
```
