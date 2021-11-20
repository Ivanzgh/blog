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

## fs文件系统

复制文件夹

```js
let path = require('path')
let fs = require('fs')

function copyFile({ src, dest }) {
  fs.readdir(path.resolve(src), (err, files) => {
    if (err) {
      console.log('获取文件夹失败');
      throw err
    } else {
      files.forEach((item) => {
        let oldFile = path.resolve(src, item)
        let newFile = path.resolve(dest, item)
        fs.copyFile(oldFile, newFile, (err) => {
          if (err) throw err
          console.log(oldFile + '复制到' + newFile)
        })
      })
    }
  })
}

const params = {
  src: './src/beijing', // 要复制的源文件名
  dest: './src/shanghai', // 复制操作的目标文件名
}
copyFile(params)
```

更改文件名称

```js
let path = require('path')
let fs = require('fs')

function rename({ dest, from, to }) {
  fs.readdir(path.resolve(dest), (err, files) => {
    if (err) {
      console.log('获取文件夹失败');
      throw err
    } else {
      files.forEach((item) => {
        let oldName = path.resolve(dest, item)
        let newName = oldName.replace(from, to)
        fs.rename(oldName, newName, (renameErr) => {
          if (renameErr) throw renameErr
          console.log(oldName + '文件名称改为:' + newName)
        })
      })
    }
  })
}

const params = {
  dest: './src/shanghai', // 要更改的文件夹
  from: 'jhyj_dc',    // 要更改的源文件名
  to: 'jhyj_sh'     // 要更改的目标文件名
}
rename(params)
```
