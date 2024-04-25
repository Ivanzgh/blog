# 微信小程序

## 准备工作

- [微信公众平台](https://mp.weixin.qq.com)，注册小程序账号，获取小程序 AppID 和 AppSecret
- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [小程序开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

其他：

1、开发者需要先申请开发权限。由小程序账号管理员在微信公众平台添加开发者的微信号。注意：各类权限的项目成员，总共最多添加 15 个账号。

2、开发者必须先在微信公众平台获取 AppID，才能创建小程序项目。

- 在项目初始化时，开发者需要填写 AppID
- 后端服务可以选择「不使用云服务」
- 模板选择可以选择最简单的「JS-基础模版」，由开发者决定

3、微信小程序对请求的接口有 3 个强制要求：

- 必须是有备案的域名。如果工期短，可以先申请域名备案，工信部审核需要时间
- 必须是有 SSL 证书（https）
- 域名不得带端口号

注意：如果是自己做项目，需要买域名 + 工信部备案 + 公安备案 + 小程序备案

## 创建页面的方式

方式一、在`app.json`中配置`pages`，添加路径后按`cmd + s`保存，会自动生成页面文件

```json
{
  "pages": ["pages/index/index", "pages/list/index"]
}
```

方式二、在`pages`目录下新建一个文件夹，例如 list，选中 list 右键打开菜单，选择「新建 Page」，会自动生成页面文件，同时会自动在`app.json`中配置`pages`

## 配置入口页面

在`app.json`中配置`entryPagePath`，表示入口页面路径，可以是首页，也可以是登录页。如果没有配置这个字段，那么`pages`中的第一个路径就是入口页面

```json
{
  "entryPagePath": "pages/index/index",
  "pages": ["pages/index/index", "pages/list/index"]
}
```

## 渲染模式

- Skyline 渲染模式
- WebView 渲染模式

> Skyline 渲染模式在 2.29.2 及以上基础库支持。
> 当前小程序未设置线上最低基础库版本，在低版本的客户端中，将使用 WebView 渲染模式进行渲染。
> 需要保证页面[pages/index/index]同时在两种渲染模式下都能够正常显示;

如果需要使用 WebView 渲染模式，可以在 app.json 中配置，去掉以下 3 个字段的配置：

```json
{
  "renderer": "skyline",
  "rendererOptions": {
    "skyline": {
      "defaultDisplayBlock": true,
      "disableABTest": true,
      "sdkVersionBegin": "3.0.0",
      "sdkVersionEnd": "15.255.255"
    }
  },
  "componentFramework": "glass-easel"
}
```

## window 全局配置

[window 全局配置文档](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window)

在`app.json`中的 windown 字段，用于设置小程序的状态栏、导航条、标题、窗口背景色

- 状态栏：窗口顶部，显示有信号、时间、电量的那一栏
- 导航条：窗口顶部的第二部分，显示有标题、返回、前进、分享等按钮
- 窗口：窗口是默认不展示的，当用户下拉刷新时会显示

## 使用 sass 或 less

在`project.config.json`中配置 `useCompilerPlugins`，这里可以配置 sass、less、typescript

```json
{
  "setting": {
    "useCompilerPlugins": ["sass"]
  }
}
```

然后将`.wxss`后缀的文件改为`.scss`或`.less`。如果没有生效就重启开发者工具

## 样式导入

使用`@import` 语句可以导入外联样式表，`@import` 后跟需要导入的外联样式表的相对路径，用`;`表示语句结束。

```css
/** common.wxss **/
.box {
}

/** app.wxss **/
@import 'common.wxss';
.app {
}
```

## rpx

[rpx（responsive pixel）](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html#%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D): 可以根据屏幕宽度进行自适应。微信小程序规定屏幕宽为 750rpx。

设计师可以用 iPhone6 作为设计稿的标准，在 iPhone6 上，屏幕宽度为 375px，共有 750 个物理像素，则 750rpx = 375px = 750 物理像素，1rpx = 0.5px = 1 物理像素。

- 当屏幕宽度等于 750px 时，1px = 1rpx
- 当屏幕宽度等于 375px 时， 1px = 0.5rpx
- 设计稿宽度如果按照 750px 设计，那么设计稿是多少 px 就写多少 rpx
- 设计稿宽度如果按照 375px 设计，那么设计稿是多少 px 就写 2 倍的 rpx

## 列表渲染

- 数组每一项的变量名默认为 item，下标变量名默认为 index
- 使用 `wx:for-item` 可以指定当前元素的变量名，修改变量名在循环嵌套中常用
- 使用 `wx:for-index` 可以指定当前下标的变量名

```html
<view wx:for="{{list1}}" wx:key="index">{{item}}</view>

<view wx:for="{{list2}}" wx:for-index="idx" wx:for-item="itemName">{{idx}}: {{itemName.message}}</view>
```

`wx:key` 的值有以下两种形式，且不需要使用双大括号语法

1. 字符串，数组元素的某个属性，该属性的值要是唯一的字符串或数字，如 id
2. 关键字 `*this`， 表示数组元素本身，该形式需要元素本身是一个唯一的字符串或者数字

::: warning

如果花括号和引号之间有空格，会被解析成为字符串

```html
<view wx:for="{{[1,2,3]}} ">{{item}}</view>

<!-- 等同于 -->
<view wx:for="{{[1,2,3] + ' '}}">{{item}}</view>
```

:::

- `wx:key`如果渲染的值是数组，item 表示数组元素，index 表示数组元素的下标
- 如果渲染的是对象，item 表示对象属性的值，index 表示对象属性

```html
<!-- obj: { name: 'zgh', age: 18 } -->
<view wx:for="{{obj}}" wx:key="index">{{item}}-{{index}}</view>
```

## 条件渲染

用法：`wx:if`、`wx:elif`、`wx:else`

```html
<view wx:if="{{isShow}}">content</view>

<view hidden>content</view>
```

与`hidden`属性的区别：`hidden`属性是隐藏元素（`display: none`），`wx:if`是移除元素

## 数据操作

> 通过`this.setData`更改

### 对象操作

#### 1. 添加对象数据

```js
Page({
  data: {
    detailData: { a: 1 }
  },
  addData() {
    this.setData({ 'detailData.b': 2 });
  }
});
```

#### 2. 更改对象数据

```js
Page({
  data: {
    detailData: { a: 1, b: 2 }
  },
  updateData() {
    const newData = { a: 2, b: 3 };
    // 简单的整体替换
    this.setData({ detailData: newData });

    // 只更改对象里面的属性
    this.setData({ 'detailData.a': 2, 'detailData.b': 3 });
    // 或者
    //  this.setData({ ['detailData.a']: 2 })
  }
});
```

还有两种方式：

1、可以使用 ES6 的`...`展开运算符，如：

```js
updateData(){
 const newData = { ...this.data.detailData, a: 2, b: 3 }
 this.setData({ detailData: newData })
}
```

2、可以使用`Object.assign`

```js
updateData() {
  const newData = Object.assign(this.data.detailData, { a: 2, b: 3 })
  this.setData({ detailData: newData })
}
```

#### 3. 删除对象数据

删除单个属性：

```js
Page({
  data: {
    detailData: { a: 1, b: 2 }
  },
  deleteData() {
    // delete this.data.detailData.a;
    delete this.data.detailData.b;
    this.setData({ detailData: this.data.detailData });
  }
});
```

删除多个属性：

```js
Page({
  data: {
    detailData: { a: 1, b: 2 }
  },
  deleteData() {
    // 适合属性不多的场景，否则要解构很多属性出来
    const { a, c, ...rest } = this.data.detailData;
    this.setData({ detailData: rest });
  }
});
```

### 数组操作

```html
<view wx:for="{{list}}" wx:key="index">{{item}}</view>
```

#### 1. 添加数组数据

```js
Page({
  data: {
    list: [1, 2, 3]
  },
  handleAddList() {
    // 方式一：
    const newList = [...this.data.list, 4, 5, 6];
    this.setData({ list: newList });

    // 方式二：
    // this.data.list.push(4, 5, 6);
    // this.setData({ list: this.data.list });

    // 方式三：
    // const newList = this.data.list.concat(4, 5, 6);
    // this.setData({ list: newList });

    // 不能这么写：
    // const newList = this.data.list.push(4, 5, 6)
    // this.setData({ list: newList })
  }
});
```

#### 2. 更改数据数组

```js
Page({
  data: {
    list: [1, 2, 3]
  },
  updateAddList() {
    // 将数组下标为1的值改为6
    this.setData({ 'list[1]': 6 }); // [1, 6, 3]
  }
});
```

修改 list 为对象数组

```html
<view wx:for="{{list}}" wx:key="index">{{item.name}}</view>
```

```js
Page({
  data: {
    list: [{ id: 1, name: 'a' }]
  },
  updateAddList() {
    this.setData({ 'list[0].name': 'b' });
  }
});
```

#### 3. 删除数组数组

示例：删除数组的第 2 个元素

```js
Page({
  data: {
    list: [1, 2, 3]
  },
  updateAddList() {
    // 方式一：
    const newList = this.data.list.filter((item) => item !== 2);
    this.setData({ list: newList });

    // 方式二：
    // this.data.list.splice(1, 1);
    // this.setData({ list: this.data.list });
  }
});
```

## 事件机制

- [事件介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)
- wxs 事件
  - [wxs 简介](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/)
  - [wxs 语法参考](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/)

不支持 addEventListener。

绑定事件的方式有两种：

第一种方式：`bind:事件名`，bind 后面跟上冒号，冒号后面跟上事件名

```html
<button bind:tap="handler">按钮</button>
```

第二种方式：`bind事件名`，bind 后面直接跟上事件名

```html
<button bindtap="handler">按钮</button>
```

- `bindtap` 绑定点击事件
- `catchtap` 阻止事件冒泡

### dataset

事件传参，在标签中使用`data-`前缀，如：`<view data-id='123' bindtap="click">click</view>`，这里传入一个自定义的 id 参数

```js
// index.js
Page({
  toggle(e) {
    console.log(e);
    const id = e.target.dataset.id;
  }
});
```

**target 和 currentTarget 的区别：**

- target：当前点击的元素
- currentTarget：事件绑定的元素

示例：点击 inner

```html
<view data-id="middle" bindtap="handleTap1">
  middle
  <view data-id="inner" bindtap="handleTap2">inner</view>
</view>
```

```js
Page({
  handleTap1(e) {
    // 可以看到 e.target.dataset 是 {id: 'inner'} , 而 e.currentTarget.dataset 是 {id: 'middle'}
    console.log(e);
  },
  handleTap2(e) {
    // 可以看到 e.target.dataset 和 e.currentTarget.dataset 是一样的结果
    console.log(e);
  }
});
```

- 如果参数名是多个单词，用中划线连接；在事件对象中，会被转为小驼峰写法，如`parent-id`会被转为`parentId`
- 如果参数名是小驼峰写法，在事件对象中，会被转为全小写写法，如`childId`会被转为`childid`

```html
<view data-parent-id="middle" bindtap="handleTap1">
  middle
  <view data-childId="inner" bindtap="handleTap2">inner</view>
</view>
```

### mark

1. 在基础库版本 2.7.1 以上，可以使用 mark 来识别具体触发事件的 target 节点
2. mark 还可以用于承载一些自定义数据，类似于 dataset
3. 当事件触发时，事件冒泡路径上所有的 mark 会被合并，并返回给事件回调函数

mark 和 dataset 的区别是： mark 会包含从触发事件的节点到根节点上所有的 mark: 属性值；而 dataset 仅包含一个节点的 data- 属性值。

```html
<view mark:parentMark="parent" bindtap="handleTap1">
  <button mark:childMark="child" bindtap="handleTap2">click</button>
</view>
```

```js
Page({
  handleTap1(e) {
    console.log(e.mark); // {childMark: "child", parentMark: "parent"}
  },
  handleTap2(e) {
    console.log(e.mark); // {childMark: "child", parentMark: "parent"}
  }
});
```

## 简易双向绑定

在 wxml 中，普通属性的绑定是单向的。如果希望用户输入数据时同时改变 data 中的数据，可以使用双向绑定，在对应属性前面添加`model:`

```html
<!-- 单向绑定 -->
<input value="{{value}}" />

<!-- 双向绑定 -->
<input model:value="{{value}}" />
```

::: warning 限制条件：

1. 只能是单一字段的绑定，不能拼接字段
2. 不支持数组和对象

错误用法：

```html
<input model:value="值为 {{value}}" />

<input model:value="{{a.b}}" />
```

:::

示例：input 和 checkbox 实现双向绑定。可以在控制台打开`AppData`模块查看数据变化，同时在这里也支持编辑数据

::: code-group

```html [index.wxml]
<input type="text" model:value="{{value}}" />

<checkbox model:checked="{{isChecked}}" />
同意
```

```js [index.js]
Page({
  data: {
    value: 1,
    isChecked: false
  }
});
```

:::

## 获取 Dom 元素

```js
wx.createSelectorQuery().select('#screenBody');
```

## 动态设置页面标题

```js
wx.setNavigationBarTitle({ title: options.isEdit ? '编辑' : '新增' });
```

## 去除点击时的背景色

点击 navigator 和 button 时，会有灰色的背景色，设置`hover-class="none"`可以去掉

```html
<navigator hover-class="none" url="/pages/foo/index">foo</navigator>

<button hover-class="btn-hover">click</button>
```

## 小程序运行机制

![img](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1712758608.png)

### 启动方式

小程序启动方式：冷启动、热启动

- 冷启动：如果用户首次打开，或小程序销毁后被用户再次打开，此时小程序会重新加载启动
- 热启动：如果用户已经打开过小程序，在一定时间内再次打开时，小程序会直接从内存中加载，不会重新加载启动。此时小程序并未被销毁，只是从后台状态进入前台状态。

### 前台和后台

- 前台：小程序启动后，界面被展示给用户，此时小程序处于前台状态
- 后台：当用户「关闭」小程序时，小程序并没有真正被关闭，而是进入后台状态，当用户再次进入微信并打开小程序，小程序又会重新进入前台状态

这里的「关闭」是指：小程序顶部右上角的关闭键、手机底部的 home 键等。

**挂起**：小程序进入「后台」状态一段时间后（5 秒），微信停止小程序 JS 线程执行，小程序进入「挂起」状态，当开发者使用了后台播放音乐、后台地理位置等能力时，小程序可以在后台持续运行，不会进入挂起状态

**销毁**：如果用户很久没有使用小程序，或者系统资源紧张，小程序会被销毁，即完全终止运行

1. 当小程序进入后台并被挂起后，如果很长时间（目前是 30 分钟）都未再次进入前台，小程序会被销毁
2. 当小程序占用系统资源过高，可能会被系统销毁或被微信客户端主动回收

## 小程序更新机制

在访问小程序时，微信会将小程序代码包缓存到本地。

开发者在发布了新的小程序版本以后，微信客户端会检查本地缓存的小程序有没有新版本，并进行小程序代码包的更新。

更新机制有两种：启动时同步更新和异步更新。

- 启动时同步更新：微信运行时，**会定期检查最近使用的小程序是否有更新**。如果有更新，下次小程序启动时会同步进行更新，更新到最新版本后再打开小程序。如果**用户长时间未使用小程序时，会强制同步检查版本更新**。
- 启动时异步更新：在启动前没有发现更新，小程序每次冷启动时都会异步检查是否有更新版本。如果发现有新版本，将会异步下载新版本的代码包，将新版本的小程序在下一次冷启动进行使用，当前访问使用的依然是本地的旧版本代码。

在启动时异步更新的情况下，如果开发者希望立刻进行版本更新，可以使用`wx.getUpdateManager`进行处理。在有新版本时提示用户重启小程序更新版本。

### 更新代码

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/base/update/UpdateManager.html)

在`app.js`中编写：

```js
App({
  onLaunch() {
    // 判断小程序的API，回调，参数，组件等是否在当前版本可用
    if (wx.canIUse('getUpdateManager')) {
      // 获取版本更新管理器
      const updateManager = wx.getUpdateManager();

      // 监听向微信后台请求检查更新结果事件。微信在小程序每次启动（包括热启动）时自动检查更新，不需由开发者主动触发。
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          // 监听小程序有版本更新事件。客户端主动触发下载，下载成功后回调
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 强制小程序重启并使用新版本
                  updateManager.applyUpdate();
                }
              }
            });
          });
          // 监听小程序更新失败事件
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经上线啦，请您删除当前小程序，重新搜索打开'
            });
          });
        }
      });
    } else {
      wx.showModal({ title: '提示', content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。' });
    }
  }
});
```

### 模拟更新

在微信开发者工具中，点击顶部中间的「普通编译」，下拉选择「添加编译模式」，勾选上「下次编译时模拟更新」，可选设置编译模式的名称为「强制更新」。点击确定后，点击编译，即可看到更新提示信息。

## 小程序生命周期

- 应用生命周期：应用程序从创建到消亡的整个过程
- 小程序生命周期：小程序从启动到销毁的整个过程

### 应用生命周期

在 `app.js` 中的`App()`函数中，可以设置一些全局的监听函数，如 onLaunch、onShow、onHide 等。

```js
App({
  // 小程序初始化，全局只触发一次
  onLaunch() {},

  // 小程序启动，或从后台进入前台
  onShow() {},

  // 小程序从前台进入后台
  onHide() {}
});
```

### 页面生命周期

页面生命周期：小程序页面从加载、运行、销毁的整个过程

页面生命周期函数需要在`Page()`方法进行定义。

访问页面 -> onLoad 监听页面加载 -> onShow 监听页面展示 -> onReady 监听页面初次渲染完成 -> onHide 监听页面隐藏 -> onUnload 监听页面卸载

```js
Page({
  // 监听页面加载，一个页面只会调用一次
  onLoad(options) {
    console.log('onLoad');
  },

  // 监听页面显示
  onShow() {
    console.log('onShow');
  },

  // 监听页面初次渲染完成，一个页面只会调用一次
  onReady() {
    console.log('onReady');
  },

  // 监听页面隐藏
  onHide() {
    console.log('onHide');
  },

  // 监听页面卸载
  onUnload() {
    console.log('onUnload');
  }
});
```

这里使用 navigator 跳转页面，查看 onUnload 和 onHide 的调用

```html
<!-- redirect：销毁当前页面，跳转到指定页面，点击后触发 onUnload -->
<navigator url="/pages/list/index" open-type="redirect">redirect</navigator>

<!-- navigate：保留当前页面，跳转到指定页面，点击后触发 onHide -->
<navigator url="/pages/list/index" open-type="navigate">navigate</navigator>
```

::: tip

1. tabBar 页面之间相互切换，页面不会被销毁
2. 点击左上角，返回上一个页面，会销毁当前页面

:::

### 组件生命周期

## 网络请求

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)

`wx.request({})`请求的服务器域名必须在微信公众平台配置

1. 域名必须是已经备案的
2. request 合法域名以 https 开头

在开发过程中，如果域名还在备案等影响开发进展的时候，可以跳过校验合法域名：

在微信开发者工具右上角点击详情，打开本地配置，勾选上「不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书」。这种方式只适用于开发者工具、小程序的开发版和体验版，项目上线前必须要配置合法域名。

## 界面交互

- `wx.showToast()` 消息提示框
- `wx.showModal()` 模态对话框
- `wx.showLoading()` 加载中提示框
- `wx.hideLoading()` 关闭加载中提示框
- `wx.showActionSheet()` 弹出操作菜单
- `wx.showShareMenu()` 显示分享菜单

## 本地存储

1、同步 API：

- 存储：`wx.setStorageSync("key", "value");`
- 获取：`wx.getStorageSync("key", "value");`
- 删除：`wx.removeStorageSync("key");`
- 清空：`wx.clearStorageSync();`

2、异步 API：

- 存储：`wx.setStorage("key", "value");`
- 获取：`wx.getStorage("key", "value");`
- 删除：`wx.removeStorage("key");`
- 清空：`wx.clearStorage();`

::: tip
对象类型的数据，可以直接存储，不用使用`JSON.stringify()`、`JSON.parse()`转换。
:::

可以在控制台的 Storage 中查看存储的数据。

## 上拉加载、下拉刷新

### 上拉加载

1. 在 app.json 或 page.json 中配置距离页面底部的距离：onReachBottomDistance，默认是 50px
2. 在页面的 js 中定义 onReachBottom()方法监听用户上拉加载事件

### 下拉刷新

1. 在页面的 index.json 中开启下拉刷新，需要添加：`"enablePullDownRefresh": true`
2. 在页面的 js 中定义 onPullDownRefresh()方法监听用户下拉刷新事件

### scroll-view 实现上拉加载、下拉刷新

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/scroll-view.html)

可滚动视图区域。使用竖向滚动时，需要给 scroll-view 一个固定高度

```html
<scroll-view
  class="scroll-y"
  scroll-y
  lower-threshold="100"
  bindscrolltolower="getMore"
  enable-back-to-top="true"
  refresher-enabled
  bindrefresherrefresh="handleRefresh"
></scroll-view>
```

```css
.scroll-y {
  height: 100vh;
}
```

```js
Page({
  getMore() {},
  handleRefresh() {}
});
```

## 优化目录结构

创建项目时，可以将小程序源码放到 `miniprogram` 目录下。

目录结构：

```
- mini
  - miniprogram
  - .eslintrc.js
  - .gitignore
  - .prettierrc
  - package-lock.json
  - package.json
  - project.config.json
  - project.private.config.json
```

配置` project.config.json`：

1. 新建`miniprogram` 目录
2. 配置 `miniprogramRoot`，指定小程序源码的目录
3. 配置 `setting.packNpmManually` 为 `true`，开启自定义 node_modules 和 miniprogram_npm 位置的构建 npm 方式
4. 配置 `setting.packNpmRelationList`，指定 `packageJsonPath` 和 `miniprogramNpmDistDir` 的位置
   1. packageJsonPath 表示 node_modules 源对应的 package.json
   2. miniprogramNpmDistDir 表示 node_modules 的构建结果目标位置

```json
{
  "miniprogramRoot": "miniprogram/",
  "setting": {
    "packNpmManually": true,
    "packNpmRelationList": [
      {
        "packageJsonPath": "./package.json",
        "miniprogramNpmDistDir": "./miniprogram"
      }
    ]
  },
  "srcMiniprogramRoot": "miniprogram/"
}
```

## npm 支持

在小程序中使用的 npm 依赖包，必须要执行一遍「构建 npm」流程。

打开「工具」，选择「构建 npm」，构建成功后，会在根目录下生成一个 miniprogram_npm 目录，这里是小程序真正使用的包。

例如，如果是新项目，就执行`npm init -y`初始化，然后安装 vant，安装成功后还是不能使用的，需要执行构建 npm。

注意，不是所有的 npm 依赖都能在小程序中使用，小程序依赖于微信的运行环境。

## 登录流程

![img](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1712648730.png)

- <https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html>
- <https://developers.weixin.qq.com/ebook?action=get_post_info&docid=000cc48f96c5989b0086ddc7e56c0a>

- 临时登录凭证 code 只能使用一次

## getApp()

`getApp()`方法用于获取全局唯一的 App 实例。

在小程序中，App()方法用于注册小程序。在 app.js 中定义 App()方法，添加全局共享的数据和方法。在页面中通过 getApp()方法获取全局唯一的 App 实例，从而实现页面、组件的数据传递。

注意：

1. 不要在`App()`方法中使用`getApp()`方法，可以通过 this 获取实例。
2. 通过 `getApp()`方法获取全局实例之后，不要调用实例的生命周期函数。

示例：

```js
App({
  globalData: {
    token: ''
  },

  setToken(token) {
    this.globalData.token = token;
  }
});
```

假设有一个登录页面 login.wxml

```html
<button type="primary" plain bindtap="handleLogin">登录</button>
```

点击登录按钮，调用 setToken()方法，将 token 存储到全局变量中。

```js
const appInstance = getApp();

Page({
  data: {},

  handleLogin() {
    console.log(appInstance);
    const token = 123456;
    appInstance.setToken(token);
  }
});
```

在其他页面获取全局数据：

```js
const appInstance = getApp();

Page({
  data: {},

  onLoad() {
    console.log(appInstance.globalData.token);
  }
});
```

## 页面通信

如果一个页面通过 `wx.navigateTo` 打开一个新页面，这两个页面间将建立一条数据通道。

1. 在`wx.navigateTo`的 success 回调中通过`eventChannel`对象发射事件
2. 被打开的页面可以通过`this.getOpenerEventChannel`方法获取一个 EventChannel 对象，进行监听、发射事件
3. wx.navigateTo 可以定义 `events` 配置项接收被打开页面发射的事件

::: code-group

```js [home.js]
Page({
  handler() {
    wx.navigateTo({
      url: '/pages/list/index',
      events: {
        currentEvent: (res) => {
          console.log(res); // { age: 18 }
        }
      },
      success(res) {
        res.eventChannel.emit('myEvent', { name: 'zgh' });
      }
    });
  }
});
```

```html [home.wxml]
<button type="primary" bindtap="handler">跳转到列表页面</button>
```

:::

```js [list.js]
Page({
  onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('myEvent', (res) => {
      console.log(res); // { name: 'zgh' }
    });
    eventChannel.emit('currentEvent', { age: 18 });
  }
});
```

- events 对象的 key 表示被打开页面通过 eventChannel 发射的事件，value 是回调函数
- emit 是发射事件，on 是接收事件

## 事件总线

事件总线是一种常用的跨页面通信方式，是对发布-订阅模式的一种实现。常用于非父子组件和兄弟组件之间的通信。

可以使用第三方库[PubSubJS](https://github.com/mroderick/PubSubJS)

```bash
npm install pubsub-js
```

安装完之后要「构建 npm」

示例：实现兄弟组件通信

在 components 中创建两个组件：custom1 和 custom2，并在一个父组件中引入。在 custom1 中调用 sendData 方法发布消息，在 custom2 中监听 myEvent 事件。

::: code-group

```js [custom1.js]
import PubSub from 'pubsub-js';

Component({
  data: {
    name: 'zgh'
  },

  methods: {
    sendData() {
      // 发布自定义事件
      PubSub.publish('myEvent', this.data.name);
    }
  }
});
```

```js [custom2.js]
import PubSub from 'pubsub-js';

Component({
  lifetimes: {
    attached() {
      // 订阅、监听自定义事件
      PubSub.subscribe('myEvent', (msg, data) => {
        console.log(msg, data);
      });
    }
  }
});
```

:::
