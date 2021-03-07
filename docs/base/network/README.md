# 计算机网络

## OSI的七层协议

从上到下依次是：

+ 应用层
+ 表示层
+ 会话层
+ 运输层
+ 网络层
+ 数据链路层
+ 物理层

## 状态码

状态码由3位数字组成，第一个数字定义了响应的类别，且有5种可能的取值：

+ 1xx：指示信息–表示请求已接收，继续处理。
+ 2xx：成功–表示请求已被成功接收、理解、接受。

```null
204 No Content 成功，但不返回任何实体的主体部分；

206 Partial Content 成功执行了一个范围（Range）请求
```

+ 3xx：重定向–要完成请求必须进行更进一步的操作。

```null
301 Moved Permanently 永久性重定向，响应报文的Location首部应该有该资源的新URL

302 Found 临时性重定向，响应报文的Location首部给出的URL用来临时定位资源

303 See Other 请求的资源存在着另一个URI，客户端应使用GET方法定向获取请求的资源

304 Not Modified 服务器内容没有更新，可以直接读取浏览器缓存

307 Temporary Redirect 临时重定向。
```

+ 4xx：客户端错误–请求有语法错误或请求无法实现。

```null
400 Bad Request 表示客户端请求有语法错误，不能被服务器所理解

401 Unauthonzed 表示请求未经授权，该状态代码必须与 WWW-Authenticate 报头域一起使用

403 Forbidden 表示服务器收到请求，但是拒绝提供服务，通常会在响应正文中给出不提供服务的原因

404 Not Found 请求的资源不存在，例如，输入了错误的URL
```

+ 5xx：服务器端错误–服务器未能实现合法的请求。

```null
500 Internel Server Error 表示服务器发生不可预期的错误，导致无法完成客户端的请求

503 Service Unavailable 表示服务器当前不能够处理客户端的请求，在一段时间之后，服务器可能会恢复正常
```

## GET和POST

## TCP和UDP

## 三次握手、四次挥手

## HTTP、HTTPS、HTTP2.0

## DNS

## 浏览器输入url到页面展现的过程

### 1、DNS解析

域名到IP地址的转换过程

![image](https://image-static.segmentfault.com/161/828/1618288278-57f00bf9444dd_articlex)

首先在本地域名服务器中查询IP地址，如果没有找到的情况下，本地域名服务器会向根域名服务器发送一个请求，
如果根域名服务器也不存在该域名时，本地域名会向com顶级域名服务器发送一个请求，依次类推下去。
直到最后本地域名服务器得到google的IP地址并把它缓存到本地，供下次查询使用。

DNS域名：

![image](https://img-blog.csdn.net/2018041813475242?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI5MzExNDA3/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 2、TCP连接

### 3、HTTP请求

### 4、服务器处理请求并返回HTTP报文

### 5、浏览器解析渲染页面

参考地址：

<https://segmentfault.com/a/1190000006879700>

<https://www.cnblogs.com/kongxy/p/4615226.html>
