# Node

## 简介

node 官网下载地址: <https://nodejs.org/en/download/>

中文文档: [http://nodejs.cn/api/](http://nodejs.cn/api/)

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时

简单说，node 就是一个可以运行 js 代码的环境，不是一门编程语言，可以做服务器端开发

node 和 node-sass 对应版本: <https://www.npmjs.com/package/node-sass>

> 1. node 运行的 js 是指 ECMAScript，不能运行 BOM 和 DOM 的 API（如`window`、`document`等对象），可以使用 console 和定时器等
> 2. node 中的顶级对象是`global`，也可以使用`globalThis`（是 ES2020 支持的）

## 特点

- 单线程
- 异步式 I/O
- 事件驱动
- 跨平台

这里的单线程是指**主线程是单线程**的，主线程还能有其他子线程。因为是单线程，所以只要有一个任务耗时非常长，后面的任务必须要排队等待，会拖延整个程序执行，从而降低了效率，于是提出了**异步**的思想。在执行代码的时候，主线程从上往下依次执行，遇到有需要回调的地方，就将此处加入到**事件队列**中，然后主线程继续往下走，直到运行结束以后，才去执行事件队列中的回调

事件驱动，是指在持续事务管理过程中，进行决策的一种策略，即跟随当前时间点上出现的事件，调动可用资源，执行相关任务，使不断出现的问题得以解决，防止事务堆积

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

## require 载入模块

Node.js 默认是使用`CommonJS`规范

- require 方法 用来载入模块的
- moule.exports 用来导出模块的

载入系统模块和第三方模块不需要写路径，直接写名称即可，但是载入自定义模块需要写路径

```js
const http = require('http');

const myapp = require('../com/my.js');
```

require 加载第三方包的机制：

1. 第三方包安装好后，这个包一般会存放在当前项目的 node_modules 文件夹中。找到这个包的 package.json 文件，并且找到里面的 main 属性对应的入口模块，这个入口模块就是这个包的入口文件
2. 如果第三方包中没有找到 package.json 文件，或者没有 main 属性，则默认加载第三方包中的 index.js 文件
3. 如果在 node_modules 文件夹中没有找到这个包，或者以上所有情况都没有找到，则会向上一级父级目录下查找 node_modules 文件夹，查找规则如上一致
4. 如果一直找到该模块的磁盘根路径都没有找到，则会报错：`can not find module xxx`

## 库

- [csvtojson](https://www.npmjs.com/package/csvtojson) CSV 格式转为 JSON
- [randomjson](https://www.npmjs.com/package/randomjson) 生成随机 JSON 数据
- [http-proxy-agent](https://www.npmjs.com/package/http-proxy-agent) HTTP(s) 代理 HTTP.Agent 实现 HTTP
- [multiparty](https://www.npmjs.com/package/multiparty) 解析具有`multipart/form-data`类型的 HTTP 请求，如解析上传文件

## process 模块

`process.argv` 可以获得命令行调用的信息，以空格分隔。假设执行一个脚本 test.js，运行`node test.js`，
那么`process.argv`的结果是`['node', 'test.js']`

## path 模块

可以操作路径

- `path.resolve` 拼接规范的绝对路径
- `path.sep` 获取操作系统的路径分隔符
- `path.parse` 解析路径并返回对象
- `path.basename` 获取路径的基础名称
- `path.dirname` 获取路径的目录名
- `path.extname` 获取路径的扩展名

```js
const path = require('path');

// 结果：Windows下是反斜杠 \ ，linux下是正斜杠 /
console.log(path.sep);

console.log(path.resolve(__dirname, '1.txt')); // 结果：/Users/zgh/code/blog/1.txt

const pathName = '/Users/zgh/code/blog/1.txt';
console.log(path.parse(pathName));

console.log(path.basename(pathName)); // 1.txt

console.log(path.dirname(pathName)); // 结果：/Users/zgh/code/blog

console.log(path.extname(pathName)); // .txt
```

`path.resolve()`这里第二个参数可以写`'1.txt'`或者`'./1.txt'`，但是不能写`'/index'`，即可以写相对路径

上面`path.parse(pathName)`的打印结果如下：

```js
{
  root: '/',
  dir: '/Users/zgh/code/blog',
  base: '1.txt',
  ext: '.txt',
  name: '1'
}
```
