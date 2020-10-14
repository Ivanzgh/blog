# 介绍

## 数据类型

基本数据类型： Number、String、Boolean、Null、Undefined、Symbol

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

## 回流与重绘
### 回流(reflow)
只要修改了dom或改变了元素的形状或大小等会改变布局的操作就会触发reflow

### 重绘(repaint)
只是改变了颜色，不影响周围元素或布局，会引起浏览器的重绘

### 减少reflow和repaint

+ 不要一条一条的修改样式，应该固定写一个class，更换className，减少reflow次数
+ 不要把 DOM结点的属性值放在一个循环里当成循环里的变量
+ 为动画的HTML元件使用position:fixed 或 absolute，那么修改他们的CSS是不会 reflow 的
+ 避免使用table布局，一个很小的改动会造成整个table reflow！