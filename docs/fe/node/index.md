# Node

## 简介

node 官网下载地址: <https://nodejs.org/en/download/>

中文文档: [http://nodejs.cn/api/](http://nodejs.cn/api/)

node 和 node-sass 对应版本: <https://www.npmjs.com/package/node-sass>

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。

简单说，node 就是一个可以运行 js 代码的环境，不是一门编程语言，可以做服务器端开发

> node 运行的 js 是指 ECMAScript，不能运行 BOM 或 DOM 中的代码

## 特点

- 单线程
- 异步式 I/O
- 事件驱动
- 跨平台

这里的单线程是指**主线程是单线程**的，主线程还能有其他子线程。因为是单线程，所以只要有一个任务耗时非常长，后面的任务必须要排队等待，会拖延整个程序执行，从而降低了效率，于是提出了**异步**的思想。

## node 命令

```sh
# 查看node版本
node -v

# 查看npm版本，
npm -v

# 查看node安装目录
which node

# 查看官方所有的node版本
npm view node versions
```

## 管理 node 版本

在维护一些老项目时通常需要降低 node 的版本，如遇到 node-gyp 报错、node-sass 报错等

### 使用 n 模块管理

```sh
# 清除npm缓存
sudo npm cache clean -f

# 全局安装 n 模块
sudo npm install -g n

# 查看是否安装成功
n -V

# 查看已安装的node版本
n ls

# 安装指定版本，如 14.12.0
sudo n 14.12.0

# 更新到最新的稳定版
sudo n stable

# 更新到最新版本
sudo n latest

# 切换版本，输入 n 回车，上下键选择版本，回车安装
sudo n

# 删除指定版本，如 14.12.0，删除后用 n 切换一下版本
sudo n rm 14.12.0

# 卸载 n
sudo npm uninstall n -g
```

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

## fs 文件系统

复制文件夹

```js
let path = require('path')
let fs = require('fs')

function copyFile({ src, dest }) {
  fs.readdir(path.resolve(src), (err, files) => {
    if (err) {
      console.log('获取文件夹失败')
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
  dest: './src/shanghai' // 复制操作的目标文件名
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
      console.log('获取文件夹失败')
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
  from: 'jhyj_dc', // 要更改的源文件名
  to: 'jhyj_sh' // 要更改的目标文件名
}
rename(params)
```

## process 模块

`process.argv` 可以获得命令行调用的信息，以空格分隔。假设执行一个脚本 test.js，运行`node test.js`，
那么`process.argv`的结果是`['node', 'test.js']`
