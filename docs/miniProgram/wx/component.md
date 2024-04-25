# 自定义组件

- [自定义组件文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)
- [自定义组件 API](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)
- [properties-定义](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html#properties-%E5%AE%9A%E4%B9%89)

- 属性值的改变可用 observer 监听。在新版本基础库中不推荐使用，而是使用 Component 构造器的 observers 字段代替
- 属性的类型可以为 String Number Boolean Object Array 其一，也可以为 null 表示不限制类型
- 使用 `this.data` 可以获取内部数据和属性值。`this.properties`也可以
- 写样式时，不要使用标签名、id、属性选择器，使用 class 选择器

可以在 components 目录下新建一个组件目录，里面创建 4 个文件：`index.wxml`、`index.wxss`、`index.js`、`index.json`

::: code-group

```js [index.js]
Component({
  // 组件的属性列表，可以从父组件传递的数据
  properties: {
    proId: {
      type: Number,
      value: 0
      // 指定多个类型
      // optionalTypes: []
    }
  },

  // 组件的内部数据
  data: {},

  // 监听 properties 里的值的变化
  observers: {
    proId: function (newVal, oldVal) {
      console.log(newVal);
    }
  },

  // 开始加载时
  attached() {},

  // 事件处理
  methods: {
    init() {
      // 获取属性值
      console.log(this.properties.proId);

      // 可以更新 properties 和 data
      this.setData({});
    },

    goBack() {
      // 触发父组件的 back 事件
      this.triggerEvent('back', { id: 1 }, {});
    }
  }
});
```

```json [index.json]
{
  "component": true
}
```

```html [index.wxml]
<view>
  <view bindtap="back">btn</view>
  <!-- 插槽 -->
  <slot></slot>
</view>
```

:::

在需要使用的地方，先在页面的 index.json 里注册，例如有一个封装的组件目录是 pro，对象的键值就是组件的名称。

[全局注册](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#usingComponents)

```json
{
  "usingComponents": {
    "pro": "../../components/pro"
  }
}
```

父组件需要用`bind`加上事件名，例如：

```html
<pro proId="{{proId}}" bindback="handleBack"></pro>
```

## 自定义组件通信

1、父传子：

可以通过 `this.setData({})` 更新 properties 和 data

一般情况下，不建议修改 properties 的值，尽量保持单向数据流，避免数据混乱。

可以通过 observers 来监听 properties 的变化，将 properties 的值同步到 data 中，后续在 data 中修改数据。

2、子传父：

可以通过 `this.triggerEvent('eventName', {})` 触发事件，第二个参数是传递给父组件的数据，父组件需要用`bind`加上事件名接收。

## 获取子组件实例

在父组件里，可以通过`this.selectComponent`方法获取子组件实例，这样就能直接访问子组件的数据和方法。

给自定义组件添加 class 或者 id 属性，如`<pro class="nav"></pro>`

```js
Page({
  handleTap() {
    const res = this.selectComponent('.nav'); // 或者 #nav
    console.log(res);
    // res.data 就是子组件的data数组
  }
});
```

## 插槽

默认情况下是只有一个插槽，参考前面的示例。如果要多个插槽，如下：

1. 启用多 slot 支持
2. 给 slot 添加`name`属性
3. 在使用组件的页面中，使用`slot`属性

```js
Component({
  options: {
    multipleSlots: true
  }
});
```

```html
<view>
  <slot name="slot1"></slot>
  <slot name="slot2"></slot>
</view>
```

```html
<pro proId="{{proId}}" bindback="handleBack">
  <view slot="slot1">123</view>
  <view slot="slot2">666</view>
</pro>
```

## 组件生命周期

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html)

- 生命周期在 lifetimes 字段内进行声明，推荐方式
- 可以直接定义在 Component 构造器的第一级参数中
- 最重要的生命周期是 created、attached、detached，分别对应创建、挂载、销毁
- 不能在 created 中调用 setData，可在 attached 中调用

```js
Component({
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    }
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function () {
    // 在组件实例进入页面节点树时执行
  },
  detached: function () {
    // 在组件实例被从页面节点树移除时执行
  }
});
```

组件所在页面的生命周期：

```js
Component({
  pageLifetimes: {
    show: function () {
      // 组件所在的页面被展示时执行
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    },
    routeDone: function () {
      // 组件所在页面路由动画完成时执行
    }
  }
});
```
