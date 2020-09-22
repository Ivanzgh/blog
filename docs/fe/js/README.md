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