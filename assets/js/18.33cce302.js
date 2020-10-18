(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{370:function(t,s,a){"use strict";a.r(s);var n=a(19),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"浏览器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#浏览器"}},[t._v("#")]),t._v(" 浏览器")]),t._v(" "),a("h2",{attrs:{id:"浏览器的工作原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的工作原理"}},[t._v("#")]),t._v(" 浏览器的工作原理")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"同源策略"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#同源策略"}},[t._v("#")]),t._v(" 同源策略")]),t._v(" "),a("p",[t._v("同源策略是浏览器的一个安全功能，不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源。")]),t._v(" "),a("p",[a("strong",[t._v("同源即是同协议、同域名、同端口")])]),t._v(" "),a("p",[t._v("不受同源策略限制的：")]),t._v(" "),a("p",[t._v("1、页面中的链接，重定向以及表单提交是不会受到同源策略限制的。")]),t._v(" "),a("p",[t._v("2、跨域资源的引入是可以的。但是js不能读写加载的内容。如嵌入到页面中的"),a("script",{attrs:{src:"..."}}),t._v("，"),a("img"),t._v("，"),a("link"),t._v("，"),a("iframe",[t._v("等。")])]),t._v(" "),a("h2",{attrs:{id:"跨域方案"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#跨域方案"}},[t._v("#")]),t._v(" 跨域方案")]),t._v(" "),a("p",[t._v("跨域，指的是浏览器不能执行其他网站的脚本。它是由浏览器的同源策略造成的，是浏览器施加的安全限制。")]),t._v(" "),a("p",[t._v("跨域名访问又分为二级域名跨域、多级域名跨域、以及协议跨域、端口号跨域。")]),t._v(" "),a("h3",{attrs:{id:"jsonp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jsonp"}},[t._v("#")]),t._v(" jsonp")]),t._v(" "),a("p",[t._v("动态的创建script标签，通过script标签的src属性调用js脚本")]),t._v(" "),a("p",[t._v("首先定义一个处理函数，处理接收回来的数据")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getData")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("res")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    conlose"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("res"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("然后创建一个script标签去请求数据")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" jsonp "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createElement")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"script"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\njsonp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("src "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"http://localhost:3000/jsonp?callback=getData"')]),t._v("\n")])])]),a("p",[t._v("最后将这个script标签添加到页面当中去")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("document"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("body"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("appendChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("jsonp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),a("p",[t._v("jsonp的优势：")]),t._v(" "),a("ul",[a("li",[t._v("使用简单")]),t._v(" "),a("li",[t._v("兼容性极好。因为几乎所有的浏览器都支持script标签\njsonp的劣势：")]),t._v(" "),a("li",[a("strong",[t._v("只支持get请求")])]),t._v(" "),a("li",[t._v("存在安全性问题。需要网站双方商议基础token的身份验证")]),t._v(" "),a("li",[t._v("可能被注入恶意代码，篡改页面内容，可以采用字符串过滤来规避此问题")])]),t._v(" "),a("h3",{attrs:{id:"cors-cross-origin-resource-sharing"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cors-cross-origin-resource-sharing"}},[t._v("#")]),t._v(" CORS（Cross-Origin Resource Sharing）")]),t._v(" "),a("p",[t._v("CORS（跨域资源共享）需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，IE浏览器不能低于IE10。")]),t._v(" "),a("p",[t._v("CORS将请求分成两种，简单请求和非简单请求")]),t._v(" "),a("h4",{attrs:{id:"简单请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#简单请求"}},[t._v("#")]),t._v(" 简单请求")]),t._v(" "),a("p",[t._v("同时满足以下两个条件，既是简单请求\n（1) 请求方法是以下三种方法之一：HEAD、GET、POST\n（2）HTTP的头信息不超出以下几种字段：")]),t._v(" "),a("ul",[a("li",[t._v("Accept")]),t._v(" "),a("li",[t._v("Accept-Language")]),t._v(" "),a("li",[t._v("Content-Language")]),t._v(" "),a("li",[t._v("Last-Event-ID")]),t._v(" "),a("li",[t._v("Content-Type：只限于三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain")])]),t._v(" "),a("p",[t._v("axios的content-type在post下是： application/json")]),t._v(" "),a("p",[a("strong",[t._v("简单请求的流程")])]),t._v(" "),a("p",[t._v("第一步：浏览器直接发出CORS请求。发送cors中，会自动带上一个请求头："),a("code",[t._v("Origin：客户端域名")])]),t._v(" "),a("p",[t._v("第二步：服务器根据请求返回内容。")]),t._v(" "),a("p",[t._v("第三步：浏览器对返回的响应头进行分析。")]),t._v(" "),a("p",[t._v("如果存在响应头为"),a("code",[t._v('Access-Control-Allow-Oringin："客户端的域名"')]),t._v("，那么，浏览器就会将请求到的数据返回给ajax对象。\n否则，浏览器将会触发ajax对象的"),a("code",[t._v("onerror")]),t._v("函数抛出一个错误。这种错误无法通过http状态码捕获，因为服务端是正确响应了的，\n即正常的200")]),t._v(" "),a("h4",{attrs:{id:"非简单请求"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#非简单请求"}},[t._v("#")]),t._v(" 非简单请求")]),t._v(" "),a("p",[a("strong",[t._v("请求过程")])]),t._v(" "),a("p",[t._v("第一步：先发出一个options的请求，该请求会带上一些头信息")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Origin： 客户端域名\nAccess-Control-Request-Headers: content-type  (表明客户端发送的请求头数据)\nAccess-Control-Request-Method: POST （表明客户端发送的请求类型）\n")])])]),a("p",[t._v("第二步：服务器返回options请求")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('Access-Control-Allow-Origin：允许跨域的域名（可以是指定域名，也可以是全域名“*”）\nAccess-Control-Allow-Headers: "与客户端对应"\nAccess-Control-Allow-Method： 与客户端的对应或者大于客户端\n')])])]),a("p",[t._v("第三步：客户端检查options请求的响应头。如果响应头对应上了，那么浏览器正式发起一个请求。")]),t._v(" "),a("p",[t._v("第四步：服务器对请求做出回应。同时，带上之前发送的请求头，完成跨域过程。")]),t._v(" "),a("p",[t._v("做客户端登录的时候。明明登陆了。但是用另一个接口请求，却丢失了session状态。为什么？")]),t._v(" "),a("p",[t._v("默认情况下"),a("code",[t._v("Access-Control-Allow-Credentials: false")]),t._v("，即不允许客户端携带验证信息到服务端，比如cookies\n那么，可能存在session将无法根据cookie获取到用户的登录信息")]),t._v(" "),a("p",[t._v("解决方案：")]),t._v(" "),a("ol",[a("li",[t._v("在响应头里边，指定唯一的允许跨域的域名")]),t._v(" "),a("li",[t._v("服务端在响应头里边。指定"),a("code",[t._v("Access-Control-Allow-Credentials：true")])]),t._v(" "),a("li",[t._v("客户端的ajax对象，必须指定"),a("code",[t._v("withCredentials: true")])])]),t._v(" "),a("h3",{attrs:{id:"代理跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代理跨域"}},[t._v("#")]),t._v(" 代理跨域")]),t._v(" "),a("p",[t._v("只有浏览器存在跨域问题，使用服务器将跨域的接口转发过来即可")]),t._v(" "),a("p",[t._v("假如有A网站向B网站发起请求，使用代理跨域，只需要在A网站的服务器发送一个请求到B网站，取得相应的数据。\n然后再用浏览器发送请求到A，取得数据。")]),t._v(" "),a("h4",{attrs:{id:"vue-config-js配置跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue-config-js配置跨域"}},[t._v("#")]),t._v(" vue.config.js配置跨域")]),t._v(" "),a("p",[t._v("使用vue-cli3脚手架后，webpack的配置被隐藏，当需要覆盖原有的配置时，则需要在项目的根目录下，新建vue.config.js文件")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  devServer"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    proxy"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/api'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        target"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://localhost:3000/api'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        ws"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        changeOrigin"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        pathRewrite"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'^/api'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("  \n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"http-proxy-middleware"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-proxy-middleware"}},[t._v("#")]),t._v(" http-proxy-middleware")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.npmjs.com/package/http-proxy-middleware",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.npmjs.com/package/http-proxy-middleware"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("安装")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("npm install --save-dev http-proxy-middleware\n")])])]),a("p",[t._v("示例")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" express "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'express'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" createProxyMiddleware "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http-proxy-middleware'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("express")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" options "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  target"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'http://www.example.org'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  changeOrigin"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("express"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("static")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'dist'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("use")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("createProxyMiddleware")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("options"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("listen")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);