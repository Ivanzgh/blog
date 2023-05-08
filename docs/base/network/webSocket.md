# webSocket

## 局部使用

```js
const WSURL = 'ws://192.168.8.210:8083';

let ws, tt;
let lockReconnect = false; //避免重复连接

let websocket = {
  Init: function (url, messageHandle, notReConn, onerror) {
    if ('WebSocket' in window) {
      ws = new WebSocket(BaseWs + url);
    } else {
      console.log('您的浏览器不支持 WebSocket!');
      return;
    }

    ws.onopen = function () {
      // heartCheck.start();
      // ws.send('from client: hello')
    };
    ws.onmessage = function (e) {
      //heartCheck.start()
      if (e.data == 'ok') {
        //心跳消息不做处理
        return;
      }
      // console.log('from server: ' + e.data);
      messageHandle(e.data);
    };

    ws.onclose = () => {
      // if (onerror) {
      //   onerror()
      // }
      // if (!notReConn) {
      //   reconnect(url, messageHandle)
      // }
    };

    ws.onerror = () => {
      if (onerror) {
        onerror();
      }
      if (!notReConn) {
        reconnect(url, messageHandle);
      }
    };
    return ws;
  },
  toBreakOff: () => {
    lockReconnect = true;
  },
  Send: function (data) {
    let msg = JSON.stringify(data);
    console.log('发送消息：' + msg);
    ws.send(msg);
  },
  closeWs: () => {
    if (ws) {
      ws.close();
    }
  },
  getWebSocket() {
    return ws;
  },
  getStatus() {
    if (ws.readyState == 0) {
      return '未连接';
    } else if (ws.readyState == 1) {
      return '已连接';
    } else if (ws.readyState == 2) {
      return '连接正在关闭';
    } else if (ws.readyState == 3) {
      return '连接已关闭';
    }
  }
};

export default websocket;

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
    return;
  }
  lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  tt && clearTimeout(tt);
  tt = setTimeout(function () {
    console.log('执行断线重连...');
    websocket.Init(url, messageHandle);
    lockReconnect = false;
  }, 4000);
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
    };
  },
  methods: {
    init() {
      this.ws = webSocket.Init(`/ship/detail/${this.mmsi}`, this.messageHandle, true, this.onerror);
    },
    messageHandle(message) {
      this.msg = JSON.parse(message);
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
            );
          },
          onClose: close
        });
      }
    }
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.isDestroyed = true;
    if (Object.keys(this.ws).length != 0) {
      this.ws.close();
    }
  }
};
```

## 全局使用

登录后就需要使用 WS 连接，可在全局接收和发送消息。在 vue 和 vuex 中使用如下：

1、配置 ws，路径：`src/store/modules/ws.js`

```js
export default {
  namespaced: true,
  state: {
    webSocket: null,
    noticeData: {},
    biData: {},
    refresh: '', // 通知消息列表页面去重新请求ajax数据
    heartTime: 30000, // 客户端发起检测的时间间隔
    lockReconnect: false, // 是否真正建立连接
    clientTimer: null, // 心跳倒计时
    serverTimer: null, // 服务端心跳倒计时
    timeoutNum: null // 断开重连倒计时
  },
  mutations: {
    init(state) {
      state.webSocket = new WebSocket(process.env.VUE_APP_WS_URL);
      state.webSocket.onopen = () => {
        console.log('连接成功');
        // 连接成功之后，发送token验证身份
        const tokenData = {
          type: 'cmd', // 消息类型
          title: 'token', // 消息标题
          content: this.state.user.token, // 消息内容
          from: 0, // TODO 发送者Id
          to: [0], // 接收者Id数组
          ts: new Date().valueOf(), // 发送时间
          status: 0 // 消息状态
        };
        state.webSocket.send(JSON.stringify(tokenData));

        // 发送请求获取notice数据
        const noticeData = { type: 'json', title: 'messageNotice' };
        state.webSocket.send(JSON.stringify(noticeData));
        this.commit('ws/start');
      };
      state.webSocket.onmessage = (e) => {
        const data = JSON.parse(e.data);

        // 如果收到服务器信息，心跳重置
        if (data.title === 'heartbeat') {
          console.log('收到服务器心跳', data);
          this.commit('ws/reset');
        } else if (data.title === 'messageNotice') {
          const arr = JSON.parse(data.content);
          console.log(arr);
          state.noticeData = arr;
        } else if (data.title === 'bi') {
          state.biData = data;
        } else if (data.title === 'refresh') {
          state.refresh = new Date().getTime();
        }
      };
      state.webSocket.onclose = () => {
        console.log('ws关闭');
        this.commit('ws/reconnect');
      };
      state.webSocket.onerror = () => {
        console.log('ws错误');
        this.commit('ws/reconnect');
      };
    },
    send: (state, data) => {
      state.webSocket.send(JSON.stringify(data));
    },
    close: (state) => {
      state.webSocket.close();
    },

    // 心跳检测
    start(state) {
      state.clientTimer && clearTimeout(state.clientTimer);
      state.serverTimer && clearTimeout(state.serverTimer);
      state.clientTimer = setTimeout(() => {
        // 如果连接正常
        if (state.webSocket.readyState === 1) {
          console.log('连接正常');
          const data = {
            type: 'cmd', // 消息类型
            title: 'heartbeat', // 消息标题
            content: '666', // 消息内容
            from: 0, // TODO 发送者Id
            to: [0], // 接收者Id数组
            ts: new Date().valueOf(), // 发送时间
            status: 0 // 消息状态
          };
          state.webSocket.send(JSON.stringify(data));
        } else {
          console.log('连接不正常要重连');
          this.commit('ws/reconnect');
        }
        // 超时关闭
        state.serverTimer = setTimeout(() => {
          state.webSocket.close();
        }, 15000);
      }, state.heartTime);
    },

    // 重新连接
    reconnect(state) {
      if (state.lockReconnect) {
        return;
      }
      state.lockReconnect = true;
      state.timeoutNum && clearTimeout(state.timeoutNum);
      state.timeoutNum = setTimeout(() => {
        this.commit('ws/init');
        state.lockReconnect = false;
      }, 5000);
    },
    // 重置心跳
    reset(state) {
      console.log('重置心跳');
      clearTimeout(state.clientTimer);
      clearTimeout(state.serverTimer);
      this.commit('ws/start');
    }
  },
  actions: {
    initWebSocket: ({ commit }) => {
      commit('init');
    },
    send({ commit }, data) {
      commit('send', data);
    }
  }
};
```

客户端发起心跳检测的时间间隔设置的是 30 秒。在有些情况下，如果设置成 60 秒会造成 ws 销毁并重新创建新的连接。有可能是 nginx 配置的问题，也有可能是后端设置 ws 连接默认时间就是 1 分钟就断开连接

nginx 相关配置如下，时间数值自行调试，配置项可以参考[这里](http://nginx.org/en/docs/http/ngx_http_proxy_module.html)

[nginx 配置 WebSocket 代理](http://nginx.org/en/docs/http/websocket.html)

```sh
http {
  server {
    location / {
        # ... 省略其他配置
        proxy_connect_timeout 4s;
        proxy_read_timeout 60s;
        proxy_send_timeout 12s;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
      }
  }
}
```

2、在全局组件（比如 `src/layout/AppMain.vue`）里初始化 ws，当有消息通知时要有声音提醒

```vue
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import mp3 from '@/assets/media/warn.mp3';

export default {
  name: 'AppMain',
  data() {
    return {
      audio: null,
      warningAlarmTimer: null
    };
  },
  computed: {
    ...mapGetters(['noticeData'])
  },
  watch: {
    noticeData(newV) {
      if (newV) {
        this.playAlarmAudio();
      }
    }
  },
  mounted() {
    // 初始化 ws
    this.$store.dispatch('ws/initWebSocket');

    const that = this;
    this.audio = new Audio();
    this.audio.src = mp3;
    this.$nextTick(() => {
      that.audio.addEventListener('ended', () => {
        that.audio.play();
      });
    });
  },
  destroyed() {
    this.$store.dispatch('ws/close');
  },
  methods: {
    playAlarmAudio() {
      this.audio.currentTime = 0;
      this.audio.play();
      if (this.warningAlarmTimer) {
        clearInterval(this.warningAlarmTimer);
      }
      this.warningAlarmTimer = setTimeout(() => {
        this.audio.pause();
      }, 6000);
    }
  }
};
</script>
```

## SockJS 和 Stomp

[stomp-websocket](http://jmesnil.net/stomp-websocket/doc/)

SockJS 是设计在浏览器中使用的，支持三种方式传输数据：WebSocket，HTTP Streaming，HTTP 长轮询

当 SockJS 发送 GET /info 请求的时候，服务端需要决定使用哪种传输格式，首先会检查 WebSocket，如果不行则使用 HTTP Streaming，
如果还是不行就使用 HTTP 的长轮询

```js
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

let stompClient;
const WSURL = 'ws://192.168.8.210:8083';
const token = 'jifodsjaoifjsf12345';
const serialNo = 's12345';
const uuid = 'ffsdfjsdlkaf';

export function connectMonitorWs() {
  let socket = new SockJS(WSURL + '?token=' + token, '', { timeout: 10000 });
  stompClient = Stomp.over(socket);
  stompClient.connect(
    { serialNo: serialNo },
    () => {
      successCallback(serialNo, uuid);
    },
    () => {
      setTimeout(() => {
        connectMonitorWs();
      }, 5000);
    }
  );
}

export function successCallback(serialNo, uuid) {
  // 获取客户端连接编号
  stompClient.send(`/app/monitor/client/code/${serialNo}`, { 'content-type': 'text/plain' }, uuid);
  // 客户端连接编号下发
  stompClient.subscribe(`/topic/monitor/client/code/${serialNo}/${uuid}`, (msg) => {
    let data = JSON.parse(msg.body);
  });

  // 申请主控制
  stompClient.send(`/app/monitor/main/control/${serialNo}`);
  // 主控制信号下发
  stompClient.subscribe(`/topic/monitor/control/${serialNo}`, (msg) => {
    let data = msg.body;
    console.log(data);
    // 如果自己的客户端的连接编号和主控制端的连接编号一致，那么自己就是主控制端
  });

  // 实时快照下发
  stompClient.subscribe(`/topic/monitor/live/snapshot/${serialNo}`, (msg) => {
    let data = JSON.parse(msg.body);
    console.log(data);
  });
}

// 更新图片状态
export function updateImage(serialNo, params) {
  stompClient.send(`/app/monitor/image/status/${serialNo}`, {}, JSON.stringify(params));
}

// 取消订阅
export function pauseSubscribe() {
  if (stompClient) {
    stompClient.unsubscribe();
  }
}

// 销毁ws连接
export function disconnect() {
  if (stompClient) {
    stompClient.disconnect();
  }
}
```
