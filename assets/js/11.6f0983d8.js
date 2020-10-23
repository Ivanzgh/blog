(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{365:function(t,a,s){"use strict";s.r(a);var e=s(19),r=Object(e.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"计算机网络"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计算机网络"}},[t._v("#")]),t._v(" 计算机网络")]),t._v(" "),s("h2",{attrs:{id:"osi的七层协议"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#osi的七层协议"}},[t._v("#")]),t._v(" OSI的七层协议")]),t._v(" "),s("p",[t._v("从上到下依次是：")]),t._v(" "),s("ul",[s("li",[t._v("应用层")]),t._v(" "),s("li",[t._v("表示层")]),t._v(" "),s("li",[t._v("会话层")]),t._v(" "),s("li",[t._v("运输层")]),t._v(" "),s("li",[t._v("网络层")]),t._v(" "),s("li",[t._v("数据链路层")]),t._v(" "),s("li",[t._v("物理层")])]),t._v(" "),s("h2",{attrs:{id:"状态码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#状态码"}},[t._v("#")]),t._v(" 状态码")]),t._v(" "),s("p",[t._v("状态码由3位数字组成，第一个数字定义了响应的类别，且有5种可能的取值：")]),t._v(" "),s("ul",[s("li",[t._v("1xx：指示信息–表示请求已接收，继续处理。")]),t._v(" "),s("li",[t._v("2xx：成功–表示请求已被成功接收、理解、接受。")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("204 No Content 成功，但不返回任何实体的主体部分；\n\n206 Partial Content 成功执行了一个范围（Range）请求\n")])])]),s("ul",[s("li",[t._v("3xx：重定向–要完成请求必须进行更进一步的操作。")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("301 Moved Permanently 永久性重定向，响应报文的Location首部应该有该资源的新URL\n\n302 Found 临时性重定向，响应报文的Location首部给出的URL用来临时定位资源\n\n303 See Other 请求的资源存在着另一个URI，客户端应使用GET方法定向获取请求的资源\n\n304 Not Modified 服务器内容没有更新，可以直接读取浏览器缓存\n\n307 Temporary Redirect 临时重定向。\n")])])]),s("ul",[s("li",[t._v("4xx：客户端错误–请求有语法错误或请求无法实现。")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("400 Bad Request 表示客户端请求有语法错误，不能被服务器所理解\n\n401 Unauthonzed 表示请求未经授权，该状态代码必须与 WWW-Authenticate 报头域一起使用\n\n403 Forbidden 表示服务器收到请求，但是拒绝提供服务，通常会在响应正文中给出不提供服务的原因\n\n404 Not Found 请求的资源不存在，例如，输入了错误的URL\n")])])]),s("ul",[s("li",[t._v("5xx：服务器端错误–服务器未能实现合法的请求。")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("500 Internel Server Error 表示服务器发生不可预期的错误，导致无法完成客户端的请求\n\n503 Service Unavailable 表示服务器当前不能够处理客户端的请求，在一段时间之后，服务器可能会恢复正常\n")])])]),s("h2",{attrs:{id:"get和post"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#get和post"}},[t._v("#")]),t._v(" GET和POST")]),t._v(" "),s("h2",{attrs:{id:"tcp和udp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#tcp和udp"}},[t._v("#")]),t._v(" TCP和UDP")]),t._v(" "),s("h2",{attrs:{id:"三次握手、四次挥手"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三次握手、四次挥手"}},[t._v("#")]),t._v(" 三次握手、四次挥手")]),t._v(" "),s("h2",{attrs:{id:"http、https、http2-0"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#http、https、http2-0"}},[t._v("#")]),t._v(" HTTP、HTTPS、HTTP2.0")]),t._v(" "),s("h2",{attrs:{id:"dns"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dns"}},[t._v("#")]),t._v(" DNS")]),t._v(" "),s("h2",{attrs:{id:"浏览器输入url到页面展现的过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#浏览器输入url到页面展现的过程"}},[t._v("#")]),t._v(" 浏览器输入url到页面展现的过程")]),t._v(" "),s("h4",{attrs:{id:"_1、dns解析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1、dns解析"}},[t._v("#")]),t._v(" 1、DNS解析")]),t._v(" "),s("p",[t._v("域名到IP地址的转换过程")]),t._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"image","data-src":"https://segmentfault.com/img/bVDM45?w=1928&h=1248",loading:"lazy"}})]),t._v(" "),s("p",[t._v("首先在本地域名服务器中查询IP地址，如果没有找到的情况下，本地域名服务器会向根域名服务器发送一个请求，\n如果根域名服务器也不存在该域名时，本地域名会向com顶级域名服务器发送一个请求，依次类推下去。\n直到最后本地域名服务器得到google的IP地址并把它缓存到本地，供下次查询使用。")]),t._v(" "),s("p",[t._v("DNS域名：")]),t._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"image","data-src":"https://img-blog.csdn.net/2018041813475242?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI5MzExNDA3/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70",loading:"lazy"}})]),t._v(" "),s("h4",{attrs:{id:"_2、tcp连接"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2、tcp连接"}},[t._v("#")]),t._v(" 2、TCP连接")]),t._v(" "),s("h4",{attrs:{id:"_3、http请求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3、http请求"}},[t._v("#")]),t._v(" 3、HTTP请求")]),t._v(" "),s("h4",{attrs:{id:"_4、服务器处理请求并返回http报文"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4、服务器处理请求并返回http报文"}},[t._v("#")]),t._v(" 4、服务器处理请求并返回HTTP报文")]),t._v(" "),s("h4",{attrs:{id:"_5、浏览器解析渲染页面"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5、浏览器解析渲染页面"}},[t._v("#")]),t._v(" 5、浏览器解析渲染页面")]),t._v(" "),s("p",[t._v("参考地址：")]),t._v(" "),s("p",[t._v("https://segmentfault.com/a/1190000006879700")]),t._v(" "),s("p",[t._v("https://www.cnblogs.com/kongxy/p/4615226.html")])])}),[],!1,null,null,null);a.default=r.exports}}]);