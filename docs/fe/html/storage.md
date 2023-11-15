# 本地存储

## cookie

## localStorage

## sessionStorage

cookies，sessionStorage、localStorage

- `cookie`是网站为了标示用户身份而储存在用户本地终端上的数据，通常经过加密，`cookie`数据始终在同源的`http`请求中携带，即会在浏览器和服务器间来回传递
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存
- 大小
  - `cookie`数据大小不能超过**4k**
  - `sessionStorage`和`localStorage`可以达到**5M**
- 时效
  - `localStorage`存储持久数据，浏览器关闭后数据不丢失，除非用户主动删除数据或清除浏览器缓存
  - `sessionStorage`数据在当前浏览器窗口关闭后自动删除
  - `cookie`设置的过期时间之前一直有效，即使窗口或浏览器关闭

1、**如何让 cookie 浏览器关闭就失效？**

不对`cookie`设置任何正、负或 0 时间的即可

2、**sessionStorage 在浏览器多窗口之间 (同域)数据是否互通共享?**

不会，都是独立的，`localStorage`会共享

3、**能让 localStorage 也跟 cookie 一样设置过期时间？**

可以，每次在存储的时候同时存入一个时效时间戳，在获取数据前，先与当前时间比较，如果小于当前时间则过期了，直接返回空的数据

todo:

- 封装 cookie 和 storage，增删改查

## Worker

## IndexedDB
