# 微信小程序

## 准备工作

- [微信公众平台](https://mp.weixin.qq.com)，注册小程序账号，获取小程序 AppID 和 AppSecret
- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [小程序开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

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

不支持 addEventListener

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
