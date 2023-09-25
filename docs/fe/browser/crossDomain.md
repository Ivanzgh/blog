---
outline: deep
---

# 浏览器跨域问题

## 什么是跨域

跨域，指的是浏览器不能执行其他网站的脚本。它是由浏览器的**同源策略**造成的，是浏览器施加的**安全限制**

跨域名访问又分为二级域名跨域、多级域名跨域、以及协议跨域、端口号跨域

小程序中存在跨域问题吗？由于小程序的宿主环境不是浏览器，而是微信客户端，所以小程序中不存在跨域问题

## 同源策略

同源策略是浏览器的一个安全功能，不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源。
**同源即是同协议、同域名、同端口**

不受同源策略限制的：

- 页面中的链接、重定向以及表单提交
- 跨域资源的引入是可以的，但是 js 不能读写加载的内容。如嵌入到页面中的`<script src="..." />`，`<img>`，`<link>`，`<iframe>`等

## 跨域方案

- JSONP
- CORS
- 代理跨域

## JSONP

原理：动态创建`script`标签，通过`script`标签的`src`属性调用脚本

```js
// 1、定义一个处理函数，处理接收回来的数据
function getData(res) {
  conlose.log(res);
}

// 2、创建一个script标签去请求数据
const jsonp = document.createElement('script');
jsonp.src = 'http://localhost:3000/jsonp?callback=getData';

// 3、将这个script标签添加到页面当中去
document.body.appendChild(jsonp);
```

jsonp 的优势：

- 使用简单
- 兼容性极好，几乎所有的浏览器都支持 script 标签

jsonp 的劣势：

- **只支持 get 请求**
- 存在安全性问题。需要网站双方商议基础 token 的身份验证
- 可能被注入恶意代码，篡改页面内容

## CORS

CORS（Cross-Origin Resource Sharing，跨域资源共享）需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE 浏览器不能低于 IE10。

CORS 将请求分成两种：简单请求、非简单请求

### 简单请求

同时满足以下两个条件就是简单请求

1. 请求方法是以下三种方法之一：HEAD、GET、POST
2. HTTP 的头信息不超出以下几种字段：

- Accept
- Accept-Language
- Content-Language
- Last-Event-ID
- Content-Type：只限于三个值 `application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

axios 的`content-type`在 post 下是： `application/json`

**简单请求的流程**

1. 浏览器直接发出 CORS 请求。发送时会自动带上一个请求头：`Origin：客户端域名`
2. 服务器根据请求返回内容
3. 浏览器对返回的响应头进行分析

如果存在响应头为`Access-Control-Allow-Oringin："客户端的域名"`，那么，浏览器就会将请求到的数据返回给 ajax 对象。
否则，浏览器将会触发 ajax 对象的`onerror`函数抛出一个错误。这种错误无法通过 http 状态码捕获，因为服务端是正确响应了的，
即正常的 200

### 非简单请求

请求过程:

1. 先发出一个 options 的请求，该请求会带上一些头信息

```sh
Origin： 客户端域名
# (表明客户端发送的请求头数据)
Access-Control-Request-Headers: content-type
#（表明客户端发送的请求类型）
Access-Control-Request-Method: POST
```

2. 服务器返回 options 请求

```sh
# 可以是指定域名，也可以是全域名 *
Access-Control-Allow-Origin: '允许跨域的域名'
Access-Control-Allow-Headers: '与客户端对应'
Access-Control-Allow-Method： '与客户端的对应或者大于客户端'
```

3. 客户端检查 options 请求的响应头。如果响应头对应上了，那么浏览器正式发起一个请求。

4. 服务器对请求做出回应。同时带上之前发送的请求头，完成跨域过程。

默认情况下`Access-Control-Allow-Credentials: false`，即不允许客户端携带验证信息到服务端，比如 cookies。
那么，可能存在 session 将无法根据 cookie 获取到用户的登录信息

解决方案：

1. 在响应头里边，指定唯一的允许跨域的域名
2. 服务端在响应头里边。指定`Access-Control-Allow-Credentials：true`
3. 客户端的 ajax 对象，必须指定`withCredentials: true`

## 代理跨域

只有浏览器存在跨域问题，使用服务器将跨域的接口转发过来即可

假如有 A 网站向 B 网站发起请求，使用代理跨域，只需要在 A 网站的服务器发送一个请求到 B 网站，取得相应的数据。
然后再用浏览器发送请求到 A，取得数据。

### vue.config.js 配置跨域

使用 vue-cli3 脚手架后，webpack 的配置被隐藏，当需要覆盖原有的配置时，则需要在项目的根目录下，新建 vue.config.js 文件

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};
```

### http-proxy-middleware

中间件，[npm 地址](https://www.npmjs.com/package/http-proxy-middleware)

安装

```sh
npm install --save-dev http-proxy-middleware
```

示例

```js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

const options = {
  target: 'http://www.example.org',
  changeOrigin: true
};

app.use(express.static('dist'));

app.use('/', createProxyMiddleware(options));
app.listen(3000);
```

### liveServer 插件

在 vscode 里安装 liveServer 插件，在项目根目录新建`.vscode`文件夹，接着在里面创建`setting.json`，写入如下内容：

```json
{
  "liveServer.settings.host": "127.0.0.1",
  "liveServer.settings.port": 8083,
  "liveServer.settings.proxy": {
    "enable": true,
    "baseUri": "/api",
    "proxyUri": "http://192.168.31.77:8081" // 测试
  },
  "liveServer.settings.donotVerifyTags": true,
  "window.zoomLevel": 0
}
```


