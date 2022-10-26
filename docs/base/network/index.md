# 计算机网络

## OSI 的七层协议

从上到下依次是：

- 应用层
- 表示层
- 会话层
- 运输层
- 网络层
- 数据链路层
- 物理层

## 状态码

状态码由 3 位数字组成，第一个数字定义了响应的类别，且有 5 种可能的取值：

- 1xx：指示信息–表示请求已接收，继续处理。
- 2xx：成功–表示请求已被成功接收、理解、接受。

```sh
204 No Content 成功，但不返回任何实体的主体部分；

206 Partial Content 成功执行了一个范围（Range）请求
```

- 3xx：重定向–要完成请求必须进行更进一步的操作。

```sh
301 Moved Permanently 永久性重定向，响应报文的Location首部应该有该资源的新URL

302 Found 临时性重定向，响应报文的Location首部给出的URL用来临时定位资源

303 See Other 请求的资源存在着另一个URI，客户端应使用GET方法定向获取请求的资源

304 Not Modified 服务器内容没有更新，可以直接读取浏览器缓存

307 Temporary Redirect 临时重定向。
```

- 4xx：客户端错误–请求有语法错误或请求无法实现。

```sh
400 Bad Request 表示客户端请求有语法错误，不能被服务器所理解

401 Unauthonzed 表示请求未经授权，该状态代码必须与 WWW-Authenticate 报头域一起使用

403 Forbidden 表示服务器收到请求，但是拒绝提供服务，通常会在响应正文中给出不提供服务的原因

404 Not Found 请求的资源不存在，例如，输入了错误的URL
```

- 5xx：服务器端错误–服务器未能实现合法的请求。

```sh
500 Internel Server Error 表示服务器发生不可预期的错误，导致无法完成客户端的请求

503 Service Unavailable 表示服务器当前不能够处理客户端的请求，在一段时间之后，服务器可能会恢复正常
```

## GET 和 POST

## TCP 和 UDP

## 三次握手、四次挥手

## HTTP、HTTPS、HTTP2.0

## DNS

## 强缓存和协商缓存

浏览器缓存是浏览器对之前请求过的文件进行缓存，以便下一次访问时重复使用，节省带宽，提高访问速度，降低服务器压力

http 缓存机制主要是在 http 响应头中设定，响应头中相关字段为 Expires、Cache-Control、Last-Modified、Etag

### 强缓存

浏览器不会向服务器发送请求，直接从本地缓存中读取文件，并返回`Status Code: 200 OK`，这里也有两种情况：

- `form memory cache`，从内存读取资源，关闭浏览器后数据就没了
- `form disk cache`，从磁盘读取资源，关闭浏览器后数据仍然存在

优先访问内存里的缓存、然后是磁盘里的缓存，最后是请求网络资源

相关的响应头

- Expires 过期时间
- Cache-Control
  - max-age，假如值为3600，表示当前时间后的3600秒内，不向服务器请求新的数据
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

## websocket

### 原生 ws

```js
const WSURL = 'ws://192.168.8.210:8083'

let ws, tt
let lockReconnect = false //避免重复连接

let websocket = {
  Init: function (url, messageHandle, notReConn, onerror) {
    if ('WebSocket' in window) {
      ws = new WebSocket(BaseWs + url)
    } else {
      console.log('您的浏览器不支持 WebSocket!')
      return
    }

    ws.onopen = function () {
      // heartCheck.start();
      // ws.send('from client: hello')
    }
    ws.onmessage = function (e) {
      //heartCheck.start()
      if (e.data == 'ok') {
        //心跳消息不做处理
        return
      }
      // console.log('from server: ' + e.data);
      messageHandle(e.data)
    }

    ws.onclose = () => {
      // if (onerror) {
      //   onerror()
      // }
      // if (!notReConn) {
      //   reconnect(url, messageHandle)
      // }
    }

    ws.onerror = () => {
      if (onerror) {
        onerror()
      }
      if (!notReConn) {
        reconnect(url, messageHandle)
      }
    }
    return ws
  },
  toBreakOff: () => {
    lockReconnect = true
  },
  Send: function (data) {
    let msg = JSON.stringify(data)
    console.log('发送消息：' + msg)
    ws.send(msg)
  },
  closeWs: () => {
    if (ws) {
      ws.close()
    }
  },
  getWebSocket() {
    return ws
  },
  getStatus() {
    if (ws.readyState == 0) {
      return '未连接'
    } else if (ws.readyState == 1) {
      return '已连接'
    } else if (ws.readyState == 2) {
      return '连接正在关闭'
    } else if (ws.readyState == 3) {
      return '连接已关闭'
    }
  }
}

export default websocket

//根据消息标识做不同的处理
// function messageHandle(message) {
//   let msg = JSON.parse(message)
//   switch (msg.flag) {
//     case 'command':
//       console.log("指令消息类型")
//       break;
//     case 'inform':
//       console.log("通知")
//       break;
//     default:
//       console.log("未知消息类型")
//   }
// }

function reconnect(url, messageHandle) {
  if (lockReconnect) {
    return
  }
  lockReconnect = true
  //没连接上会一直重连，设置延迟避免请求过多
  tt && clearTimeout(tt)
  tt = setTimeout(function () {
    console.log('执行断线重连...')
    websocket.Init(url, messageHandle)
    lockReconnect = false
  }, 4000)
}

//心跳检测
// let heartCheck = {
//   timeout: 1000 * 60 * 3,
//   timeoutObj: null,
//   serverTimeoutObj: null,
//   start: function(){
//     console.log('开始心跳检测');
//     let self = this;
//     this.timeoutObj && clearTimeout(this.timeoutObj);
//     this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
//     this.timeoutObj = setTimeout(function(){
//       //这里发送一个心跳，后端收到后，返回一个心跳消息，
//       //onmessage拿到返回的心跳就说明连接正常
//       console.log('心跳检测...');
//       ws.send("HeartBeat:"+ clientId );
//       self.serverTimeoutObj = setTimeout(function() {
//         if(ws.readyState!=1){
//            ws.close();
//         }
//         // createWebSocket();
//       }, self.timeout);

//     }, this.timeout)
//   }
// }
```

在 vue 中使用如下：

```js
export default {
  data() {
    return {
      msg: null,
      ws: null,
      isDestroyed: false
    }
  },
  methods: {
    init() {
      this.ws = webSocket.Init(`/ship/detail/${this.mmsi}`, this.messageHandle, true, this.onerror)
    },
    messageHandle(message) {
      this.msg = JSON.parse(message)
    },
    onerror() {
      if (!this.isDestroyed) {
        this.$notification.open({
          message: '提示',
          description: 'webSocket连接出错，请重新加载页面',
          btn: (h) => {
            return h(
              'a-button',
              { props: { type: 'primary', size: 'small' }, on: { click: () => this.$router.go(0) } },
              '重新载入'
            )
          },
          onClose: close
        })
      }
    }
  },
  mounted() {
    this.init()
  },
  destroyed() {
    this.isDestroyed = true
    if (Object.keys(this.ws).length != 0) {
      this.ws.close()
    }
  }
}
```

### SockJS 和 Stomp

[stomp-websocket](http://jmesnil.net/stomp-websocket/doc/)

SockJS 是设计在浏览器中使用的，支持三种方式传输数据：WebSocket，HTTP Streaming，HTTP 长轮询

当 SockJS 发送 GET /info 请求的时候，服务端需要决定使用哪种传输格式，首先会检查 WebSocket，如果不行则使用 HTTP Streaming，
如果还是不行就使用 HTTP 的长轮询

```js
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

let stompClient
const WSURL = 'ws://192.168.8.210:8083'
const token = 'jifodsjaoifjsf12345'
const serialNo = 's12345'
const uuid = 'ffsdfjsdlkaf'

export function connectMonitorWs() {
  let socket = new SockJS(WSURL + '?token=' + token, '', { timeout: 10000 })
  stompClient = Stomp.over(socket)
  stompClient.connect(
    { serialNo: serialNo },
    () => {
      successCallback(serialNo, uuid)
    },
    () => {
      setTimeout(() => {
        connectMonitorWs()
      }, 5000)
    }
  )
}

export function successCallback(serialNo, uuid) {
  // 获取客户端连接编号
  stompClient.send(`/app/monitor/client/code/${serialNo}`, { 'content-type': 'text/plain' }, uuid)
  // 客户端连接编号下发
  stompClient.subscribe(`/topic/monitor/client/code/${serialNo}/${uuid}`, (msg) => {
    let data = JSON.parse(msg.body)
  })

  // 申请主控制
  stompClient.send(`/app/monitor/main/control/${serialNo}`)
  // 主控制信号下发
  stompClient.subscribe(`/topic/monitor/control/${serialNo}`, (msg) => {
    let data = msg.body
    console.log(data)
    // 如果自己的客户端的连接编号和主控制端的连接编号一致，那么自己就是主控制端
  })

  // 实时快照下发
  stompClient.subscribe(`/topic/monitor/live/snapshot/${serialNo}`, (msg) => {
    let data = JSON.parse(msg.body)
    console.log(data)
  })
}

// 更新图片状态
export function updateImage(serialNo, params) {
  stompClient.send(`/app/monitor/image/status/${serialNo}`, {}, JSON.stringify(params))
}

// 取消订阅
export function pauseSubscribe() {
  if (stompClient) {
    stompClient.unsubscribe()
  }
}

// 销毁ws连接
export function disconnect() {
  if (stompClient) {
    stompClient.disconnect()
  }
}
```
