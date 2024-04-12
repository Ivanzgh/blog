# 路由

## wx.navigateTo

在 wxml 中使用：

- `<navigator url="/pages/list/detail?id=1">点击跳转去详情页</navigator>`
- 传递变量参数：`<navigator url="/pages/list/detail?id={{id}}&name={{name}}">点击跳转去详情页</navigator>`

在 js 中使用：`wx.navigateTo({ url: '/pages/list/detail' })`

接收参数：在生命周期函数 onLoad 中监听页面加载

路由传参不能直接传递对象，需要转为 json 字符串，`JSON.stringfy()`、`JSON.parse()`

```js
onLoad(options) {
  this.setData({ routerParams: options.id })
},
```

## wx.switchTab

跳转到 tab 页面：`wx.switchTab({ url: '/pages/index/index' });`

1、如何传递参数？

可以在跳转之前将参数存储到全局对象：

```js
const app = getApp();

Page({
  goToLink() {
    app.globalData.searchValue = 123;
    wx.switchTab({ url: '/pages/index/index' });
  }
});
```

在要使用的页面获取数据：`app.globalData.searchValue`

## 返回上个页面，并刷新上个页面

```js
// 获取小程序页面栈
let pages = getCurrentPages();
// 获取上个页面的实例对象
let beforePage = pages[pages.length - 2];
// 直接修改上个页面的数据，可通过这种方式直接传递参数
beforePage.setData({ proId: this.data.proId });
// 调用上个页面的方法
beforePage.getDetail(this.data.proId);
// 返回上个页面
wx.navigateBack({ delta: 1 });
```
