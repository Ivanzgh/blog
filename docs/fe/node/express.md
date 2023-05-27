---
outline: deep
---

# Express

## 简介

Express 基于 Node.js 平台，快速、开放、极简的 web 开发框架

[官网](https://expressjs.com/)

```sh
npm install express --save
```

创建一个 app.js 文件，创建 Express 应用

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello wrold');
});

app.listen(3000, () => console.log('listen port 3000'));
```

运行服务：`node app.js`，在浏览器打开`127.0.0.1:3000`

## 路由

### 实现路由的方式

- 针对应用级别

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('首页');
});
app.get('/login', (req, res) => {
  res.send('登录页');
});
app.get('/list', (req, res) => {
  // 与原生 HTTP 获取方式一致的方法
  console.log(req.method);
  console.log(req.url);
  console.log(req.httpVersion);
  console.log(req.headers);

  // express特有的获取请求报文的方法
  console.log(req.path);
  console.log(req.query); // 获取查询字符串
  console.log(req.get('host'));
  res.send('列表页');
});
app.get('/list/:id', (req, res) => {
  console.log(req.params); // 如果路径是 /list/1，结果就是 { id: '1' }
  res.send('详情页');
});
app.post('/list', function (req, res) {
  res.send('POST request');
});
app.put('/list', function (req, res) {
  res.send('PUT request');
});
app.delete('/list', function (req, res) {
  res.send('DELETE request');
});
app.all('*', (req, res) => {
  res.send('404');
});

app.listen(3000);
```

- 针对 Router 实例对象

```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
```

### 路由方法

Express 定义了如下和 HTTP 请求对应的路由方法： `get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和 connect`。

### 路由句柄

路由句柄就是一个回调函数。可以设置多个，它必须要有两个参数，req, res.

- req 是指`incommingmessage`，它表示一些请求信息，这个信息，我们只能获取，不能修改。
- res 是指`serverResponse`，它表示响应对象，可以做服务器上的任何事情。

```js
const express = require('express');
const app = express();

app.get(
  '/',
  (req, res, next) => {
    res.send('one');
    next();
  },
  (req, res, next) => {
    res.send('two');
  }
);

app.listen(3000);
```

### req、res 相关方法

- req.query 获取查询参数
- req.params 获取路由参数
- req.path 获取路径
- res.send 发送响应的内容，普通字符串和 html 标签均可
- res.sendFile 发送文件
- res.json 发送一个 json 格式的字符串
- res.render 渲染，需要结合模板引擎去使用
- res.download 提供下载
- res.redirect 重定向

## express 响应设置

```js
// 获取请求的路由规则
app.get('/response', (req, res) => {
  // express 与 HTTP 模块兼容的设置响应的方式
  res.statusCode = 404;
  res.statusMessage = 'xxx';
  res.setHeader('abc', 'xyz');
  res.write('响应体');
  res.end('xxx');

  // express 的响应方法
  res.status(500); // 设置响应状态码
  res.set('xxx', 'yyy'); // 设置响应头
  res.send('中文响应不乱码'); // 设置响应体
  // 链式操作
  res.status(404).set('xxx', 'yyy').send('你好朋友');

  // 其他响应
  res.redirect('http://baibu.com'); // 重定向
  res.download('./package.json'); // 下载响应
  res.json(); // 响应 JSON
  res.sendFile(__dirname + '/home.html'); // 响应文件内容
});
```

## 中间件

Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架；从本质上来说，一个 Express 应用就是在调用各种中间件。

> 官方：中间件（Middleware） 是一个函数，它可以访问请求对象（request object）

响应对象（response object）， 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量

中间件可以做什么？简言之就是使用函数封装公共操作，简化代码

- 执行任何代码
- 修改请求和响应对象
- 终结请求-响应循环
- 调用堆栈中的下一个中间件

在 express 中都有哪些中间件？

- 全局中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

### 全局中间件

每一个请求到达服务端之后，都会执行全局中间件函数

```js
const express = require('express');
const app = express();

// 声明中间件函数
const middleware1 = (req, res, next) => {
  console.log('功能代码');
  // 执行 next 函数 (如果希望执行完中间件函数之后，继续执行路由中的回调函数，必须调用 next )
  next();
};

// 应用中间件
app.use(middleware1);

// 也可以直接将匿名函数传递给 app.use()
app.use((req, res, next) => {
  console.log('功能代码');
  next();
});

// 可以定义多个全局中间件
app.use((req, res, next) => {
  console.log('第二个全局中间件');
  next();
});

function middleware2(req, res, next) {
  console.log('middleware2');
  next();
}
app.get('/list', middleware2, (req, res) => {
  res.send('list');
});

app.listen(3000);
```

### 路由中间件

路由级别的中间件，是指由 `express.Router` 对象来调用的

```js
const express = require('express');
const app = express();
const router = express.Router();
//在app中添加router中间件
app.use(router);

router.get('/', (req, res, next) => {
  res.send('路由级中间件');
});

app.listen(3000);
```

### 错误处理中间件

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN');
});
```

或者

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

### 内置中间件

### 第三方中间件

如 body-parser，cookie-parse，express-session

#### body-parser

> Express 从 4.16.0 版本开始，内置了 body 解析，所以这个中间件可以不需要使用了

最新的使用方法：

```js
const express = require('express');
const app = express();
// 解析 JSON 格式的请求体的中间件
app.use(express.json());
// 解析请求体的中间件
app.use(express.urlencoded({ extended: false }));
```

---

解析 post 请求传递的 body，若 req.body 获取不到数据，则可以使用该中间件

以下是以前的使用方法：

```sh
npm install body-parser
```

使用

```js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }));
```

如果传输的内容不是 string 类型时，需配置`extended: ture`

默认限制 100kb 大小，如果需要可自定义大小

```js
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
```

## 托管静态文件

可以将 js、css、图片等静态文件利用 express 的中间件`express.static()`托管，对外开放

假如 public 文件夹下有 common.js、haha.png 等文件

```js
app.use(express.static('public'));
```

重启服务后就可以通过以下地址访问了

```js
http://localhost:3000/common.js

http://localhost:3000/haha.png
```

如果想托管多个文件夹，可以多次调用中间件

```js
app.use(express.static('public'));
app.use(express.static('files'));
```

若想带前缀访问，加个路径即可

```js
app.use('/static', express.static('public'))

// 访问
http://localhost:3000/static/common.js
```

关于文件路径，`__dirname`表示当前模块的目录名

```js
app.use('/static', express.static(path.join(__dirname, 'public')));
```

## 处理 404 响应

在所有路由中间件最后添加下面的中间件，没有被路由匹配到的请求都将进入这里

```js
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});
```

## 发送文件

```js
app.get('/plugin/three', (req, res) => {
  res.sendFile(__dirname + '/assets/three.js');
});
```

## Router

对路由进行模块化，更好的管理路由

router.js

```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('home');
});
router.get('/list', (req, res) => {
  res.send('list');
});

module.exports = router;
```

index.js

```js
const express = require('express');
const app = express();
// 引入子路由文件
const router = require('./routes/router.js');
// 设置和使用中间件
app.use(router);

app.listen(3000);
```

## 防盗链

防盗链是为了避免图片等资源被别的网站盗用。做法是检测请求头中的 referer 是否是符合要求的域名

本地简易模拟

1. 启动服务，托管一个静态目录 public，目录里面有一张图片和 index.html（使用 img 标签引入图片）
2. 打开 127.0.0.1:3000 和 localhost:3000 两个浏览器页面，发现都能正常显示图片
3. 检测请求头中的 referer 是否为 127.0.0.1，如果是就正常显示图片，否则返回 404

```js
const express = require('express');
const app = express();

app.use((req, res, next) => {
  // 检测请求头中的 referer
  const referer = req.get('referer');
  if (referer) {
    const url = new URL(referer);
    const hostname = url.hostname;
    if (hostname !== '127.0.0.1') {
      res.status(404).send('<h1>404 Not Found</h1>');
      return;
    }
  }
  next();
});

app.use(express.static(__dirname + '/public'));

app.listen(3000);
```

## ejs 模板引擎

官网：<https://ejs.co/>

```sh
npm install ejs --save
```

使用 ejs 作为 express 的模板引擎

```js
const express = require('express');
const path = require('path');
const app = express();

// 设置模板存放的位置
app.set('views', path.resolve(__dirname, './views'));

// 设置模板引擎为ejs
app.set('view engine', 'ejs');
```

```js
const ejs = require('ejs');

const arr = [1, 2, 3];
const result = ejs.render(
  `
  <ul>
    <% arr.forEach(item => { %>
    <li><%= item %></li>
    <% }) %>
  </ul>`,
  { arr: arr }
);
```

还可以把模版抽离出来放到 html 文件中，再读取进来

```js
const html = fs.readFileSync('./index.html').toString();
const result = ejs.render(html, { arr: arr });
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <ul>
      <% arr.forEach(item => { %>
      <li><%= item %></li>
      <% }) %>
    </ul>
  </body>
</html>
```

## 应用生成器

```sh
npm install -g express-generator
```

查看全局安装的位置：

```sh
npm root -g
```

创建应用

```sh
# 创建项目
express myApp

# 进入项目目录
cd myApp

# 安装依赖
npm install

# 启动项目
SET DEBUG=myApp:* 或者 npm start
```

## 常用包

- [formidable](https://github.com/node-formidable/formidable) 上传文件

## FAQ

### 1、报错`TypeError: res.json is not a function`

可能有自定义变量和 res 重名
