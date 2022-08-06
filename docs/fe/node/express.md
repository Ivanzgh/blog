# Express

官网：[http://www.expressjs.com.cn/](http://www.expressjs.com.cn/)

## 简介

### 1、概念

&emsp;&emsp;Express 基于 Node.js 平台，快速、开放、极简的 web 开发框架。

### 2、安装

```js
npm install express --save
```

### 3、创建 Express 应用

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('hello wrold')
})

app.listen(3000, () => console.log('listen port 3000'))
```

### 4、使用 Express 处理表单

- post 请求
- get 请求
- 图片上传

## 应用生成器

### 1、安装

```js
npm install -g express-generator
```

查看全局安装的位置：

```js
npm root -g
```

### 2、创建应用

```js
//创建项目
express myApp
//进入项目目录
cd myApp
//安装依赖
npm install
//启动项目
SET DEBUG=myApp:* 或者 npm start
```

## 路由

### 1、express 实现路由的方式

- 针对应用级别

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('这是首页面')
})
app.get('/login', (req, res) => {
  res.send('这是登录页')
})
app.get('/list', (req, res) => {
  res.send('这是列表页')
})
app.post('/list', function(req, res) {
  res.send('POST request')
})
app.put('/list', function(req, res) {
  res.send('PUT request')
})
app.delete('/list', function(req, res) {
  res.send('DELETE request')
})

app.listen(3000)
```

- 针对 Router 实例对象

```js
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

module.exports = router
```

### 2、路由方法

Express 定义了如下和 HTTP 请求对应的路由方法： `get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch, search, 和 connect`。

### 3、resfulAPI 风格

- 获取数据的地址，比如我要获取用户列表（get 请求）

/user 见名知意。直接利用路径名标识
/user/01 直接跟上用户 id 获取单例用户

- 提交一个数据要添加到数据库（post 请求）

/user 直接带在请求体 formData 当中提交

- 修改数据分为两种：

① 部分修改数据(put 请求)

/user/01  
资源路径名接上用户 id

② 完全替换(patch 请求)

/user/01 全部替换掉用户 01 的内容

- 删除数据 （delete 请求）

/user/01 删除用户 01

### 4、路由句柄

路由句柄就是一个回调函数。可以设置多个，它必须要有两个参数，req, res.

- req 是指`incommingmessage`，它表示一些请求信息，这个信息，我们只能获取，不能修改。
- res 是指`serverResponse`，它表示响应对象，可以做服务器上的任何事情。

```js
const express = require('express')
const app = express()

app.get(
  '/',
  (req, res, next) => {
    res.send('one')
    next()
  },
  (req, res, next) => {
    res.send('two')
  }
)

app.listen(3000)
```

### 5、req,res 相关方法

req.query&emsp;将查询字符串变成对象

req.path &emsp;得到路径名

res.send&emsp;直接发送响应的内容，普通字符串和 html 标签均可

res.sendFile &emsp;用来发送文件

res.json&emsp;用来发送一个 json 格式的字符串

res.render&emsp;渲染，需要结合模板引擎去使用

res.download&emsp;提供下载的方法

res.redirect &emsp; 重定向方法

### 6、ejs 模板引擎

下载 ejs 模板

```sh
npm install ejs --save
```

使用 ejs 作为 express 的模板引擎

```js
// 设置模板存放的位置
app.set('views', path.resolve(__dirname, './views'))
// 设置模板引擎为ejs
app.set('view engine', 'ejs')
```

## 中间件

### 概念

Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架；从本质上来说，一个 Express 应用就是在调用各种中间件。

> 官方：中间件（Middleware） 是一个函数，它可以访问请求对象（request object (req)）

响应对象（response object (res)）, 和 web 应用中处于请求-响应循环流程中的中间件，一般被命名为 next 的变量。

中间件可以做什么？

- 执行任何代码。
- 修改请求和响应对象。
- 终结请求-响应循环。
- 调用堆栈中的下一个中间件。

在 express 中都有哪些中间件？

- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件

### 应用级中间件

所谓的应用级别的，就是指通过 app 对象来调用。

如何使用应用级别中间件？

- app.use([path]);
- app.METHOD(); METHOD 是指 get, post 等

对于 app.use()方式的中间件，如果说没有写 path，就说明所有的请求都会使用这个中间件。

对于 app.METHOD,实际上就是路由，从这个方面来说，路由也是中间件的一种。

```js
const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.send('应用级别中间件')
  next()
})

app.get('/', (req, res, next) => {
  res.send('<h1>中间件</h1>')
})

app.listen(3000)
```

### 路由级中间件

路由级别的中间件，是指由 express.Router 对象来调用的。

```js
const express = require('express')
const app = express()
const router = express.Router()
//在app中添加router中间件
app.use(router)

router.get('/', (req, res, next) => {
  res.send('路由级中间件')
})

app.listen(3000)
```

### 错误处理中间件

### 内置中间件

### 第三方中间件

如 body-parser，cookie-parse，express-session。

#### body-parser

解析 post 请求传递的 body，若 req.body 获取不到数据，则可以使用该中间件

安装

```sh
npm install body-parser
```

使用

```js
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended: false }))
```

如果传输的内容不是 string 类型时，需配置`extended: ture`

默认限制 100kb 大小，如果需要可自定义大小

```js
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))
```

## 托管静态文件

可以将 js、css、图片等静态文件利用 express 的中间件`express.static()`托管，对外开放

假如 public 文件夹下有 common.js、haha.png 等文件

```js
app.use(express.static('public'))
```

重启服务后就可以通过以下地址访问了

```js
http://localhost:3000/common.js

http://localhost:3000/haha.png
```

如果想托管多个文件夹，可以多次调用中间件

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

若想带前缀访问，加个路径即可

```js
app.use('/static', express.static('public'))

// 访问
http://localhost:3000/static/common.js
```

关于文件路径，`__dirname`表示当前模块的目录名

```js
app.use('/static', express.static(path.join(__dirname, 'public')))
```

## 处理 404 响应

```js
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})
```

## 设置错误处理器

```js
app.get('/', function(req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

或者

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

## 发送文件

```js
app.get('/plugin/three', (req, res) => {
  res.sendFile(__dirname + '/assets/three.js')
})
```

## 常见问题

### 1、报错`TypeError: res.json is not a function`

可能有自定义变量和 res 重名
