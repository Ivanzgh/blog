# web-view 嵌套网页

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)

## 创建 web-view

新创建一个页面，例如叫 webview，在 index.wxml 中写入如下内容：

```html
<web-view src="{{webSrc}}"></web-view>
```

在 index.js 写入

```js
Page({
  data: {
    webSrc: 'https://www.baidu.com'
  }
});
```

然后找个地方可以点击跳转进入 webview

```html
<navigator url="/pages/webview/index">webView</navigator>
```

## 配置业务域名

在微信开发者工具中，可以正常看到嵌套的网页，但是在真机上无法访问，需要配置业务域名

打开[小程序管理后台](https://mp.weixin.qq.com/)，在「开发管理」->「开发设置」->「业务域名」，

1. 下载一个 txt 文件，将这个文件放到服务器的项目的根目录下
   1. 服务器需要是自己的，才能放文件
   2. 如果要访问的页面是 vue 这类项目创建的，需要将 txt 文件放到 public 文件夹下
2. 添加要嵌套的地址，回到真机看效果

## 小程序如何与网页通信

webview 想和小程序通信只能通过 `wx.miniProgram.postMessage`。只能从页面向小程序发送消息。页面需要引入微信 [JS-SDK1.3.2](https://res.wx.qq.com/open/js/jweixin-1.3.2.js)

### 引入方式

1、原始 html 页面引入

```html
<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
```

2、在 React、Vue 引入

```sh
npm i weixin-js-sdk
```

如在 vue 中使用：

```vue
<template>
  <div>
    <el-button @click="sendMessage">Send Message</el-button>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';

export default {
  data() {
    return {};
  },
  methods: {
    sendMessage() {
      console.log(wx);
      // 跳转到小程序的页面
      wx.miniProgram.navigateTo('pages/index/index');
      // 跳转到 tabbar 页面
      wx.miniProgram.switchTab('pages/index/index');
      // 判断当前是否是小程序页面
      wx.miniProgram.getEnv((res) => {
        console.log(res.miniprogram);
      });
      // 页面向小程序发送消息
      wx.miniProgram.postMessage({ data: { foo: 'bar' } });
    }
  }
};
</script>
```

`wx.miniProgram.postMessage({ data: { name: 'zgh' } })` 大括号里面的数据是 `data: {xxx:xx}`形式， key 必须是 data 字段

### 小程序接收消息

只能在组件销毁、分享、后退才能处理接收到的数据

```html
<web-view src="{{webSrc}}" bindmessage="msgHandler"></web-view>
```

```js
  msgHandler(res) {
    console.log('取到网页传过来的值', res);
    // res.detail.data 是一个数组，存储着每一次 webview 触发 postMessage 的值
    let data = res.detail.data;
    // 如果要获取最新的 postMessage 的值，取数组最后一个即可
    let lastData = data[data.length - 1];
    console.log('最新的postMessage的值', lastData);
  }
```
