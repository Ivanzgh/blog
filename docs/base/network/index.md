# 计算机网络

## OSI 的七层协议

OSI（Open System Interconnection）模型是一种用于计算机网络体系结构中的标准化框架。该模型将通信过程分解成七个层次，从上到下依次是：

1. 应用层
2. 表示层
3. 会话层
4. 传输层
5. 网络层
6. 数据链路层
7. 物理层

[参考](https://zhuanlan.zhihu.com/p/152590226)

## TCP/IP 的四层模型

从上到下依次是：

- 应用层（HTTP/FTP）
- 传输层（TCP/UDP）
- 网络层（IP/ARP）
- 数据链路层

## 状态码

状态码由 3 位数字组成，第一个数字定义了响应的类别，且有 5 种可能的取值：

- 1xx：指示信息 – 表示请求已接收，继续处理。
- 2xx：成功 – 表示请求已被成功接收、理解、接受。

```sh
204 No Content 成功，但不返回任何实体的主体部分；

206 Partial Content 成功执行了一个范围（Range）请求
```

- 3xx：重定向 – 要完成请求必须进行更进一步的操作。

```sh
301 Moved Permanently 永久性重定向，响应报文的Location首部应该有该资源的新URL

302 Found 临时性重定向，响应报文的Location首部给出的URL用来临时定位资源

303 See Other 请求的资源存在着另一个URI，客户端应使用GET方法定向获取请求的资源

304 Not Modified 服务器内容没有更新，可以直接读取浏览器缓存

307 Temporary Redirect 临时重定向
```

- 4xx：客户端错误 – 请求有语法错误或请求无法实现。

```sh
400 Bad Request 表示客户端请求有语法错误，不能被服务器所理解

401 Unauthonzed 表示请求未经授权，该状态代码必须与 WWW-Authenticate 报头域一起使用

403 Forbidden 表示服务器收到请求，但是拒绝提供服务，通常会在响应正文中给出不提供服务的原因

404 Not Found 请求的资源不存在，例如，输入了错误的URL
```

- 5xx：服务器端错误 – 服务器未能实现合法的请求。

```sh
500 Internel Server Error 表示服务器发生不可预期的错误，导致无法完成客户端的请求

503 Service Unavailable 表示服务器当前不能够处理客户端的请求，在一段时间之后，服务器可能会恢复正常
```

## GET 和 POST

## TCP 和 UDP

## 三次握手、四次挥手

## DNS

## CDN 的作用和原理

## 正向代理和反向代理

## 强制缓存和协商缓存

浏览器缓存是浏览器对之前请求过的文件进行缓存，以便下一次访问时重复使用，节省带宽，提高访问速度，降低服务器压力

http 缓存机制主要是在 http 响应头中设定，响应头中相关字段为 Expires、Cache-Control、Last-Modified、Etag

### 强制缓存

浏览器不会向服务器发送请求，直接从本地缓存中读取文件，并返回`Status Code: 200 OK`，这里也有两种情况：

- `form memory cache`，从内存读取资源，关闭浏览器后数据就没了
- `form disk cache`，从磁盘读取资源，关闭浏览器后数据仍然存在

优先访问内存里的缓存、然后是磁盘里的缓存，最后是请求网络资源

相关的响应头

- Expires 过期时间
- Cache-Control
  - max-age，假如值为 3600，表示当前时间后的 3600 秒内，不向服务器请求新的数据
  - no-cache
  - no-store，不缓存任何数据

Expires 是 http1.0 规范，是绝对时间，当客户端本地时间和服务器时间不一致时会产生误差，浏览器会向服务器请求新的资源。
Cache-Control 是 http1.1 规范，是相对时间，优先级高于 Expires

### 协商缓存

向服务器发送请求，服务器会根据请求头来判断是否命中协商缓存，如果命中则返回 304 状态码并带上新的响应头，通知浏览器从缓存中读取资源，
否则返回新的数据资源

## 浏览器输入 url 到页面展现的过程

### 1、DNS 解析

域名到 IP 地址的转换过程

![image](https://image-static.segmentfault.com/161/828/1618288278-57f00bf9444dd_articlex)

首先在本地域名服务器中查询 IP 地址，如果没有找到的情况下，本地域名服务器会向根域名服务器发送一个请求，
如果根域名服务器也不存在该域名时，本地域名会向 com 顶级域名服务器发送一个请求，依次类推下去。
直到最后本地域名服务器得到 google 的 IP 地址并把它缓存到本地，供下次查询使用。

DNS 域名：

| 名称类型 | 说明                                                                        | 示例                         |
| -------- | --------------------------------------------------------------------------- | ---------------------------- |
| 根域     | DNS 域名中使用时，规定由尾部句点（.）来指定名称位于根或更高级别的域层次结构 | 单个句点或句点用于末尾的名称 |
| 顶级域   | 用来指示某个国家/地区/组织使用的名称的类型名称                              | .com                         |
| 第二层域 | 个人或组织在 Internet 上使用的注册名称                                      | baidu.com                    |
| 子域     | 已注册的二级域名派生的域名，即网站名                                        | www.baidu.com                |
| 主机名   | 通常情况下，DNS 域名的最左侧的标签标识网络上的特定计算机                    | h1.www.baidu.com             |

### 2、TCP 连接

### 3、HTTP 请求

### 4、服务器处理请求并返回 HTTP 报文

### 5、浏览器解析渲染页面

参考地址：

<https://segmentfault.com/a/1190000006879700>

<https://www.cnblogs.com/kongxy/p/4615226.html>

## localhost 和 127.0.0.1 的区别

localhost 是本机域名，127.0.0.1 是本机 IP 地址，localhost 通过 host 文件会自动解析到 127.0.0.1

查看 host 文件：`cat /etc/hosts`

```sh
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost
```

##
