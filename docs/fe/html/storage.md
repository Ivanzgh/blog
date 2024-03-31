# 本地存储

## cookie

cookie 是网站为了标示用户身份而储存在用户本地终端上的数据

- cookie 数据始终在同源的 htttp 请求中携带，即会在浏览器和服务器间来回传递
- cookie 数据大小不能超过**4KB**
- cookie 容易被窃取，存在安全风险

关于 cookie 的常用属性：

- Expires 用于设置 cookie 的过期时间
- Max-Age 用于设置在 cookie 失效之前需要经过的秒数，优先级比 Expires 高
- Domain 用于设置 cookie 可以被访问的域名
- Path 用于设置 cookie 可以被访问的路径
- Secure 用于设置是否只能通过安全的 `https` 连接来传输

如何让 cookie 浏览器关闭就失效？

不对`cookie`设置任何正、负或 0 时间的即可

## localStorage

- 持久化的本地存储，除非主动删除数据，否则数据不会丢失
- 在同一域中共享存储的信息
- 存储大小约 5M

```js
// 设置
localStorage.setItem('name', 'zgh');

// 获取
localStorage.getItem('name');

// 删除
localStorage.removeItem('name');

// 清除所有数据
localStorage.clear();

// 获取第一个键名
localStorage.key(0);
```

缺点：

1. 无法设置过期时间
2. 只能存入字符串，无法直接存入对象

为了让 localStorage 跟 cookie 一样能设置过期时间，可以在每次存储的时候同时存入一个时效时间戳，在获取数据前，先与当前时间比较，如果小于当前时间则过期了，直接返回空的数据

可以将对象通过 `JSON.stringify()`转为字符串再存入，使用的时候再通过 `JSON.parse()`转为对象

## sessionStorage

`sessionStorage`和 `localStorage` 的特性和使用方法基本一致，但是数据在当前浏览器窗口关闭后会自动删除

sessionStorage 在浏览器多窗口之间 (同域)数据是否互通共享?

不会，都是独立的，`localStorage`会共享

## cookies，sessionStorage、localStorage 的区别

- 存储大小
  - `cookie`数据大小不能超过**4k**
  - `sessionStorage`和`localStorage`可以达到**5M**
- 时效
  - `localStorage`存储持久数据，浏览器关闭后数据不丢失，除非用户主动删除数据
  - `sessionStorage`数据在当前浏览器窗口关闭后自动删除
  - `cookie`设置的过期时间之前一直有效，即使窗口或浏览器关闭
- 数据与服务器之间的交互方式
  - `cookie`数据会自动传递到服务器，服务器也可以写 cookie 到客户端
  - `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存

## IndexedDB

用于在客户端存储更多的数据

## Worker
