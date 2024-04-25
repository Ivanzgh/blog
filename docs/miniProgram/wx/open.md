# 开放功能

## 获取微信头像

1. 将 button 组件的 open-type 属性设置为 `chooseAvatar`，点击按钮时，会弹出授权窗口，用户可以选择使用微信头像。
2. 通过 `bindchooseavatar` 事件获取头像信息的临时路径。

::: code-group [index.wxml]

```html [index.wxml]
<button class="btn" open-type="chooseAvatar" bindchooseavatar="handleChooseavatar">
  <image class="avatar" src="{{avatarUrl}}" mode="" />
</button>
```

```js [index.js]
Page({
  data: {
    avatarUrl: '../../images/avatar.png'
  },

  handleChooseavatar(e) {
    const { avatarUrl } = e.detail;
    this.setData({ avatarUrl });
  }
});
```

```css [index.wxss]
.btn {
  background: transparent;
}
.btn::after {
  border: none;
}
.avatar {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
}
```

:::

::: warning

临时路径是有失效时间的。在实际开发中，需要将临时路径上传到公司的服务器。

:::

## 获取微信昵称

1. 通过 form 组件包裹 input、以及 `form-type` 为 `submit` 的 button 组件。
2. 将 input 的 type 属性设置为 `nickname`
3. 给 form 绑定 submit 事件，获取用户昵称

::: code-group

```html [index.wxml]
<form bindsubmit="handleSubmit">
  <input type="nickname" name="nickname" class="nickname" placeholder="请输入昵称" />
  <button type="primary" plain form-type="submit">提交</button>
</form>
```

```js [index.js]
Page({
  handleSubmit(e) {
    const { nickname } = e.detail.value;
    console.log(nickname);
  }
});
```

```css [index.wxss]
.nickname {
  height: 60rpx;
  margin: 20rpx;
  padding-left: 20rpx;
  border: 1px solid #179c16;
  border-radius: 20rpx;
}
```

:::

点击输入框后，会弹出键盘，在键盘上面会显示获取昵称。

点击提交按钮后，通过 from 就能获取到用户昵称，然后提交给服务器存储。

## 转发给好友

在页面的 js 文件中声明`onShareAppMessage`事件监听函数。如果未声明，点击页面右上角三个点的菜单图标，会发现无法分享「发送给朋友」。

```js
Page({
  onShareAppMessage() {}
});
```

### 自定义转发内容

在`onShareAppMessage`事件监听函数中返回一个对象，对象中可以设置标题、描述、路径等。

```js
Page({
  onShareAppMessage() {
    return {
      title: '分享的页面',
      path: 'pages/index/index',
      imageUrl: '../../images/home.png'
    };
  }
});
```

### 分享按钮

除了在菜单栏分享，还可以给 button 组件设置`open-type="share"`属性，实现分享按钮。

```html
<button open-type="share">分享给朋友</button>
```

onShareAppMessage 函数也有一个参数，可以打印查看：

- 如果从 button 触发，打印结果是 `{from: "button", target: {…}}`
- 如果从右上角菜单触发，打印结果是 `{from: "menu", target: undefined}`

## 分享到朋友圈

小程序默认不能分享到朋友圈，需要主动设置。

1. 页面必须设置允许「发送给朋友」，即声明 `onShareAppMessage` 函数。
2. 在页面的 js 文件中声明 `onShareTimeline` 函数。

```js
Page({
  onShareAppMessage() {
    return {
      title: '分享的页面',
      path: 'pages/index/index',
      imageUrl: '../../images/home.png'
    };
  },

  onShareTimeline() {
    return {
      title: '分享的标题',
      query: 'id=1',
      imageUrl: '../../images/home.png'
    };
  }
});
```

- query：要携带的参数
- imageUrl：分享的图片，可以是本地或者网络图片

## 手机号验证组件

手机号验证组件，用于帮助开发者向用户发起获取手机号的申请，必须用户同意后，才能获得由平台验证过的手机号。

手机号验证组件分为两种：

- 手机号快速验证组件：平台对手机号进行验证
- 手机号实时验证组件：在每次请求时，平台均会对用户选择的手机号进行实时验证

::: warning 注意：

1. 目前该接口针对非个人开发者，且完成了认证的小程序开发（不包含海外主体）
2. 两种验证方式需要付费使用，每个小程序账号将有 1000 次体验额度

:::

::: code-group [index.wxml]

```html
<button open-type="getPhoneNumber" bindgetphonenumber="getPhongNumer">快速验证手机号</button>

<button open-type="getRealtimePhoneNumber" bindgetrealtimephonenumber="getRealtimePhoneNumber">实时验证手机号</button>
```

```js [index.js]
Page({
  getPhongNumer(e) {
    console.log(e);
    console.log(e.detail.code);
  },

  getRealtimePhoneNumber(e) {
    console.log(e);
  }
});
```

:::

需要使用真机查看结果。

code 是动态令牌，需要将 code 发送给服务端，服务端在接收到 code 后，需要向微信平台发送请求换取用户的手机号，然后返回给客户端。

## 客服功能

可以为客服人员提供客服功能，便于及时处理消息。

1. 将 button 组件的 open-type 属性设置为 `contact`，当用户点击后就进入客服会话
2. 在微信公众后台，绑定后的客服账号，可以登录「网页端客服」、「移动端小程序客服」，接收、发送客服消息

```html
<button open-type="contact">联系客服</button>
```

在微信公众后台，「功能」->「客服」->「添加客服」，添加客服账号，并绑定微信号。
