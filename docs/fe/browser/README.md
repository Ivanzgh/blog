# 浏览器

## 浏览器的工作原理
[https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)

## 同源策略
同源策略是浏览器的一个安全功能，不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源。

**同源即是同协议、同域名、同端口**

不受同源策略限制的：

1、页面中的链接，重定向以及表单提交是不会受到同源策略限制的。

2、跨域资源的引入是可以的。但是js不能读写加载的内容。如嵌入到页面中的`<script src="..."></script>`，`<img>`，`<link>`，`<iframe>`等。

## 跨域方案
跨域，指的是浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器施加的安全限制。

跨域名访问又分为二级域名跨域、多级域名跨域、以及协议跨域、端口号跨域。

### jsonp

动态的创建script标签，通过script标签的src属性调用js脚本

首先定义一个处理函数，处理接收回来的数据
```js
function getData(res) {
    conlose.log(res)
}
```
然后创建一个script标签去请求数据
```js
let jsonp = document.createElement("script")

jsonp.src = "http://localhost:3000/jsonp?callback=getData"
```
最后将这个script标签添加到页面当中去
```js
document.body.appendChild(jsonp)
```

jsonp的优势：
- 使用简单
- 兼容性极好。因为几乎所有的浏览器都支持script标签
jsonp的劣势：
- **只支持get请求**
- 存在安全性问题。需要网站双方商议基础token的身份验证
- 可能被注入恶意代码，篡改页面内容，可以采用字符串过滤来规避此问题

### CORS（Cross-Origin Resource Sharing）

CORS（跨域资源共享）需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。

CORS将请求分成两种，简单请求和非简单请求
 
#### 简单请求
 
同时满足以下两个条件，既是简单请求
（1) 请求方法是以下三种方法之一：HEAD、GET、POST
（2）HTTP的头信息不超出以下几种字段：
+ Accept
+ Accept-Language
+ Content-Language
+ Last-Event-ID
+ Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

axios的content-type在post下是： application/json
 
**简单请求的流程**

第一步：浏览器直接发出CORS请求。发送cors中，会自动带上一个请求头：`Origin：客户端域名`

第二步：服务器根据请求返回内容。

第三步：浏览器对返回的响应头进行分析。

如果存在响应头为`Access-Control-Allow-Oringin："客户端的域名"`，那么，浏览器就会将请求到的数据返回给ajax对象。
否则，浏览器将会触发ajax对象的`onerror`函数抛出一个错误。这种错误无法通过http状态码捕获，因为服务端是正确响应了的，
即正常的200

#### 非简单请求
**请求过程**

第一步：先发出一个options的请求，该请求会带上一些头信息
```
Origin： 客户端域名
Access-Control-Request-Headers: content-type  (表明客户端发送的请求头数据)
Access-Control-Request-Method: POST （表明客户端发送的请求类型）
```
第二步：服务器返回options请求
```
Access-Control-Allow-Origin：允许跨域的域名（可以是指定域名，也可以是全域名“*”）
Access-Control-Allow-Headers: "与客户端对应"
Access-Control-Allow-Method： 与客户端的对应或者大于客户端
```
第三步：客户端检查options请求的响应头。如果响应头对应上了，那么浏览器正式发起一个请求。

第四步：服务器对请求做出回应。同时，带上之前发送的请求头，完成跨域过程。
  
默认情况下`Access-Control-Allow-Credentials: false`，即不允许客户端携带验证信息到服务端，比如cookies。
那么，可能存在session将无法根据cookie获取到用户的登录信息
 
解决方案：
1. 在响应头里边，指定唯一的允许跨域的域名
2. 服务端在响应头里边。指定`Access-Control-Allow-Credentials：true`
3. 客户端的ajax对象，必须指定`withCredentials: true`
 

### 代理跨域
只有浏览器存在跨域问题，使用服务器将跨域的接口转发过来即可

假如有A网站向B网站发起请求，使用代理跨域，只需要在A网站的服务器发送一个请求到B网站，取得相应的数据。
然后再用浏览器发送请求到A，取得数据。
#### vue.config.js配置跨域

使用vue-cli3脚手架后，webpack的配置被隐藏，当需要覆盖原有的配置时，则需要在项目的根目录下，新建vue.config.js文件

```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api': ''
        }
      }  
    }
  }
}
```

#### http-proxy-middleware

[https://www.npmjs.com/package/http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware)

安装
```
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

app.use(express.static('dist'))

app.use('/', createProxyMiddleware(options));
app.listen(3000);
```

