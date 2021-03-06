# node

## 简介

中文文档： [http://nodejs.cn/api/](http://nodejs.cn/api/)

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。

简单说，node 就是一个可以运行 js 代码的环境，不是一门编程语言，可以做服务器端开发

> node 运行的 js 是指 ECMAScript，不能运行 BOM 或 DOM 中的代码

## 特点

- 单线程
- 异步式 I/O
- 事件驱动
- 跨平台

这里的单线程是指**主线程是单线程**的，主线程还能有其他子线程。因为是单线程，所以只要有一个任务耗时非常长，后面的任务必须要排队等待，会拖延整个程序执行，从而降低了效率，
于是提出了**异步**的思想。

## 载入模块

Node.js 默认是使用`CommonJS`规范

- require 方法 用来载入模块的
- moule.exports 用来导出模块的

载入系统模块和第三方模块不需要写路径，直接写名称即可，但是载入自定义模块需要写路径

```js
const http = require('http')

const myapp = require('../com/my.js')
```

> require 引入和 es6 的 import 引入的区别？
