# 微信小程序

## 更改数据

通过`this.setData`更改

```js
Page({
  data: {
    detailData: { a: 1 }
  }
})

updateData(){
 const newData = { a: 2 }
 // 整体替换
 this.setData({ detailData: newData })

 // 如果只想更改对象里面的属性
  this.setData({ ['detailData.a']: 2 })
}
```

## 事件

- [事件介绍](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)
- [wxs 事件]

不支持 addEventListener

## 使用 wx:if 和 indexOf() 条件判断失效

在 wxml 中不支持的语法：

- Object.keys()
- toString()
- indexOf()

创建一个 wxs 后缀的文件，如 utils.wxs 文件

```js
function indexOf(arr, val) {
  return arr.indexOf(val) >= 0;
}
module.exports.indexOf = indexOf;
```

在 wxml 文件顶部引入 utils.wxs 文件

```html
<wxs src="./utils.wxs" module="tools" />

<!-- 使用 -->
<view wx:if="{{tools.indexOf(['a', 'b', 'c'], 'a')}}"></view>
```

补充：

```js
function indexOf(arr, val) {
  return arr.indexOf(val) >= 0;
}

function includes(arr, val) {
  return arr.indexOf(val) !== -1;
}
function isArray(val) {
  // 不支持：
  // 1. Array.isArray(val);
  // 2. Object.prototype.toString.call(val) === '[object Array]';
  if (val.constructor && val.constructor == 'Array') {
    return true;
  }
  return false;
}

module.exports = {
  indexOf: indexOf,
  includes: includes,
  isArray: isArray
};
```

## 路由

### wx.navigateTo

在 wxml 中使用：`<navigator url="/pages/list/detail?id=1">点击跳转去详情页</navigator>`

在 js 中使用：`wx.navigateTo({ url: '/pages/list/detail' })`

接收参数：在生命周期函数 onLoad 中监听页面加载

路由传参不能直接传递对象，需要转为 json 字符串，`JSON.stringfy()`、`JSON.parse()`

```js
onLoad(options) {
  this.setData({ routerParams: options.id })
},
```

### wx.switchTab

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

## 获取 Dom 元素

```js
wx.createSelectorQuery().select('#screenBody');
```

## 封装组件

可以在 components 目录下新建一个组件目录，里面创建 4 个文件：`index.wxml`、`index.wxss`、`index.js`、`index.json`

index.js

```js
Component({
  properties: {
    proId: { type: Number, value: 0 }
  },
  data: {},

  // 监听 properties 里的值的变化
  observers: {
    proId: function (newVal, oldVal) {
      console.log(newVal);
    }
  },

  // 开始加载时
  attached() {},

  methods: {
    init() {}
  }
});
```

在需要使用的地方，先在 index.json 里注册，例如有一个封装的组件目录是 pro，对象的键值就是组件的名称

```json
{
  "usingComponents": {
    "pro": "../../components/pro"
  }
}
```

```html
<pro proId="{{proId}}"></pro>
```

## 如何放大缩小页面？

可以利用 css 的 transform 属性，设置 scale

```html
<button bindtap="zoomIn">放大</button>
<button bindtap="zoomOut">缩小</button>

<view class="screen" style="width: 100%; height: 100%; transform-origin: 0 0; transform: scale({{scale}});">
  <view>content</view>
</view>
```

```js
Page({
  data: {
    scale: 1
  },

  // 点击放大按钮
  zoomIn() {
    let scale = this.data.scale + 0.1;
    this.setData({
      scale: scale > 2 ? 2 : scale // 设置最大缩放比例
    });
  },

  // 点击缩小按钮
  zoomOut() {
    let scale = this.data.scale - 0.1;
    this.setData({
      scale: scale < 0.1 ? 0.1 : scale // 设置最小缩放比例
    });
  }
});
```

## 图片上传

### 使用原生方法上传

使用`wx.chooseMedia()`选取图片，默认支持从相册选择和拍照上传，下方是单独区分的。再使用`wx.uploadFile()`上传到服务器，
但是该方法不支持多图片上传，可以封装成 promise 并行上传图片

upload.wxml

```html
<view>
  <view>
    <van-button type="primary" bindtap="photoAlbum">相册上传</van-button>
    <van-button type="info" bindtap="photograph">拍照上传</van-button>
  </view>
  <view>
    <view class="num">
      <text>图片上传</text>
      <text>{{imageList.length}}/9</text>
    </view>
    <view>imageList: {{imageList}}</view>
    <block wx:for="{{imageList}}" wx:key="*this">
      <view class="q-image-wrap">
        <image
          class="q-image"
          style="width: 300rpx; height: 300rpx"
          src="{{item}}"
          mode="aspectFill"
          data-idx="{{index}}"
          bindtap="handleImagePreview"
        ></image>
        <view data-idx="{{index}}" bindtap="removeImage">删除</view>
      </view>
    </block>
  </view>
  <van-button type="primary" block color="#409eff" bindtap="submitForm">保存</van-button>
</view>
```

upload.js

```js
Page({
  data: {
    imageList: []
  },

  // 相册上传
  photoAlbum() {
    let that = this;
    const imgNum = this.data.imageList.length;
    if (imgNum >= 9) {
      wx.showToast({ title: '最多上传9张图片', icon: 'loading', duration: 2000 });
      return false;
    } else {
      imgNum = 9 - imgNum;
    }
    wx.chooseMedia({
      count: imgNum,
      mediaType: ['image'],
      sourceType: ['album'],
      success(res) {
        const arr = [];
        res.tempFiles.forEach((e) => {
          arr.push(e.tempFilePath);
        });
        that.setData({ imageList: that.data.imageList.concat(arr) });
      },
      fail(res) {
        console.log('接口调用失败的回调函数', res);
      }
    });
  },
  // 拍照上传
  photograph() {
    let that = this;
    const imgNum = this.data.imageList.length;
    if (imgNum >= 9) {
      wx.showToast({ title: '最多上传9张图片', icon: 'loading', duration: 2000 });
      return false;
    } else {
      imgNum = 9 - imgNum;
    }
    wx.chooseMedia({
      count: imgNum,
      mediaType: ['image'],
      sourceType: ['camera'],
      success(res) {
        const arr = [];
        res.tempFiles.forEach((e) => {
          arr.push(e.tempFilePath);
        });
        that.setData({
          imageList: that.data.imageList.concat(arr)
        });
      },
      fail(res) {
        console.log('接口调用失败的回调函数', res);
      }
    });
  },
  // 图片预览
  handleImagePreview(e) {
    const index = e.currentTarget.dataset.idx;
    const images = this.data.imageList;
    wx.previewImage({
      current: images[index], //当前预览的图片
      urls: images //所有要预览的图片
    });
  },

  // 删除图片
  removeImage(e) {
    const that = this;
    const imgList = this.data.imageList;
    const index = e.currentTarget.dataset.idx;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success(res) {
        if (res.confirm) {
          imgList.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        that.setData({ imageList: imgList });
      }
    });
  },

  // wx.uploadFile() 不支持多图片上传。可以封装成 promise
  wxUploadFile(filePath) {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: `${config.url.fileServer}/upload`,
        filePath,
        name: 'file',
        formData: { user: 'test' }, // 要传递的参数
        method: 'POST',
        header: { 'Content-Type': 'multipart/form-data' },
        success: resolve,
        fail: reject
      });
    });
  },

  // 保存提交
  submitForm(e) {
    const arr = [];
    //将选择的图片组成一个Promise数组，准备进行并行上传
    for (let path of this.data.imageList) {
      arr.push(this.wxUploadFile(path));
    }

    wx.showLoading({ title: '正在上传...', mask: true });

    // 开始并行上传图片
    Promise.all(arr)
      .then((res) => {
        // 上传成功，获取这些图片在服务器上的地址，组成一个数组
        return res.map((item) => JSON.parse(item.data).url);
      })
      .catch((err) => {
        console.log('upload images error:', err);
      })
      .then((urls) => {
        // 调用保存图片的后端接口
        // return saveImages({
        //   projectID: 1,
        //   images: urls
        // })
      })
      .then((res) => {
        // 保存图片成功，返回上一页
        const pages = getCurrentPages();
        const currPage = pages[pages.length - 1];
        const prevPage = pages[pages.length - 2];
        wx.navigateBack();
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        wx.hideLoading();
      });
  }
});
```

### 使用 vant 小程序组件库

[vant 地址](https://vant-contrib.gitee.io/vant-weapp/#/home)

```html
<van-uploader
  file-list="{{ fileList }}"
  use-before-read
  bind:before-read="beforeRead"
  bind:after-read="afterRead"
  deletable="{{ true }}"
/>
```

```js
  beforeRead(event) {
    const { file, callback } = event.detail
    callback(file.type === 'image')
  },

  afterRead(event) {
    const that = this
    const { file } = event.detail
    wx.uploadFile({
      url: `${config.url.apiServer}/manage/file/upload`,
      filePath: file.url,
      name: 'file',
      formData: { businessId: that.data.guid },
      header: { 'Content-Type': 'multipart/form-data' },
      success(res) {
        const data = JSON.parse(res.data)
        const kfc = result.data.data
        const { fileList = [] } = that.data
        let url = kfc.serverUrl
        let files = kfc.fileList
        files.forEach(f => {
          fileList.push({ ...file, url: url + f.fileUrl })
        })
        that.setData({ fileList })
      },
      fail(res) {
        console.log('error', res)
      }
    })
  }
```

## 文件下载

```html
<view style="color: #1990FF" wx:for="{{fileList}}" wx:key="fileUUid" data-url="{{item.fileUrl}}" bindtap="downloadFile">
  {{item.name}}
</view>
```

```js
 downloadFile(e) {
    const url = this.data.fileServer + e.currentTarget.dataset.url
    wx.downloadFile({
      url: url,
      success(res) {
        if (res.statusCode === 200) {
          wx.openDocument({
            filePath: res.tempFilePath,
            showMenu: true,
            success(res) {
              console.log('打开文档成功')
            }
          })
        }
      }
    })
  }
```

## 生成随机数

[文档地址](https://developers.weixin.qq.com/miniprogram/dev/api/device/crypto/wx.getRandomValues.html)

```js
wx.getRandomValues({
  length: 30, // 生成 30 个字节长度的随机数
  success(res) {
    that.setData({ inspectFileUuid: wx.arrayBufferToBase64(res.randomValues) });
  }
});
```

## Echarts

使用 [echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin)

```html
<view id="container">
  <ec-canvas id="mychart-dom" canvas-id="mychart-pie" ec="{{ ecOption }}"></ec-canvas>
</view>
```

在 index.json 中引入组件

```json
{
  "usingComponents": {
    "ec-canvas": "../../components/ec-canvas/ec-canvas"
  }
}
```

index.js

```js
import * as echarts from '../../components/ec-canvas/echarts';

Page({
  data: {
    ecOption: {
      lazyLoad: true // 延迟加载图表,可以在获取数据后再初始化数据
    }
  },

  onLoad(option) {
    this.getBarData();
  },

  getBarData() {
    getStatistic().then((res) => {
      this.initChart(res.data);
    });
  },

  initChart(data) {
    const that = this;
    const chartDom = this.selectComponent('#container');
    chartDom.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, { width, height, devicePixelRatio: dpr });
      canvas.setChart(chart);
      const option = {
        // ....
      };
      chart.setOption(option);

      // 如果需要更新图
      that.gtChart = chart;

      return chart;
    });
  },

  // 更新图
  toggle(e) {
    this.gtChart &&
      this.gtChart.setOption({
        series: [
          {
            name: 'a',
            type: 'line',
            data: this.data.data1
          },
          {
            name: 'b',
            type: 'line',
            data: this.data.data2
          }
        ]
      });
  }
});
```

如果需要更新图，可以在初始化时赋值给 this，如`that.gtChart = chart`，这里的 gtChart 不需要在 data 对象里定义

### 在 tab 页签切换时，图表不显示

## 登录流程

<https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html>

## 踩坑记录

### 请求失败

1. 检查是否在微信公众平台配置了服务器域名，和本地请求的域名是否一致
2. 开发者工具右上角点击详情，打开本地配置，勾选上“不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书”

### 真机调试拿不到数据

在开发者工具和浏览器都能正常获取数据，但是在真机调试时拿不到数据，请求失败，这时可以考虑证书是否过期

### 真机调试连接状态一直在正常和未连接之间跳转

可以尝试以下方式：

- 重新打开项目
- 重启开发者工具
- 升级版本
- 版本降级

### 用 code 换取 openID 报错

通过`wx.login()`可以获取用户的登录凭证（code），这个临时登录凭证一般只有 5 分钟有效期，可以将该凭证发送到自己的服务器，用于获取用户信息、进行用户认证等操作。

报错信息：`errcode: 40029 errmsg: "invalid code, rid: 64180ee9-5771befc-2c5bd655"`

出现上面的报错，考虑 code 是否被多次调用，还有自己的服务端是否部署正确

### 绑定数据大小写问题

如果想在点击事件里传递参数，可以使用`data-`，但是要全部小写，如果使用驼峰写法会被小程序全部转为小写

这里如果绑定`data-isOpen="0"`，获取值`e.target.dataset.isOpen`会报错，需要小写：`e.target.dataset.isopen`

```html
<van-button round type="info" data-isopen="0" bind:tap="handleSubmit">保存</van-button>
```

### 路由传递布尔值类型错误

通过路由传递给其他页面的布尔值会被转换为字符串格式：'true'、'false'。可以自己转换一下：`const a = b === 'true' ? true : false`

## 列表通用模板

小程序列表通用模板代码：首部搜索框，下方数据列表，无数据就显示暂无数据

- 如果数据全部返回，在前端搜索过滤
- 如果数据分页返回，上拉加载、下拉刷新，搜索、清空
- 顶部项目选择

### 1、数据全部返回，搜索过滤由前端处理

小程序 UI 组件库：[Vant Weapp](https://vant-contrib.gitee.io/vant-weapp/#/home)

index.wxml

```html
<van-search
  value="{{ searchValue }}"
  placeholder="请输入项目名称"
  shape="round"
  bind:search="onSearch"
  bind:change="onSearch"
  bind:clear="onClear"
/>
<view wx:if="{{projectList.length>0}}">
  <van-cell-group>
    <navigator wx:for="{{projectList}}" wx:key="id" url="/pages/project/detail?proId={{item.id}}">
      <van-cell title="{{item.proName}}" label="{{item.proNo}}" />
    </navigator>
  </van-cell-group>
</view>
<van-empty wx:else description="暂无数据" />
```

index.json

```json
{
  "navigationBarTitleText": "项目管理",
  "usingComponents": {
    "van-search": "@vant/weapp/search/index",
    "van-cell": "@vant/weapp/cell/index",
    "van-cell-group": "@vant/weapp/cell-group/index",
    "van-empty": "@vant/weapp/empty/index"
  }
}
```

index.js

```js
import { getProjectList } from '../../utils/api.js';

Page({
  data: {
    searchValue: '',
    projectList: [],
    originProList: [],
    loading: false
  },
  onLoad() {
    this.searchProjectList();
  },
  searchProjectList() {
    this.setData({ loading: true });
    getProjectList().then((res) => {
      this.setData({ loading: false, projectList: res.data.data, originProList: res.data.data });
    });
  },
  onSearch(e) {
    this.setData({ searchValue: e.detail });
    if (!e.detail) {
      this.setData({ projectList: this.data.originProList });
    } else {
      const arr = this.data.projectList.filter((ele) => ele.proName.indexOf(e.detail) !== -1);
      this.setData({ projectList: arr });
    }
  },
  onClear() {
    this.setData({ projectList: this.data.originProList });
  }
});
```

### 2、分页返回数据

index.wxml 去掉了`bind:change="onSearch"`，其余同上。index.json 如果要开启下拉刷新，需要添加：`"enablePullDownRefresh": true`

index.js

```js
import { getProjectList } from '../../utils/api.js';

Page({
  data: {
    searchValue: '',
    listData: [],
    pageNum: 1,
    total: 0,
    loading: false
  },

  onLoad() {
    this.getList(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (!this.data.loading && this.data.pageNum < Math.ceil(this.data.total / 10)) {
      this.getList(this.data.pageNum + 1);
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    //启用标题栏显示加载状态
    wx.showNavigationBarLoading();
    //调用相关方法
    this.setData({ listData: [], searchValue: '', pageNum: 1, total: 0 });
    this.getList(1);

    setTimeout(() => {
      wx.hideNavigationBarLoading(); //隐藏标题栏显示加载状态
      wx.stopPullDownRefresh(); //结束刷新
    }, 2000); //设置执行时间
  },

  getList(pageNum) {
    this.setData({ loading: true });
    getProjectList({ pageNum, pageSize: 10, proName: this.data.searchValue }).then((res) => {
      this.setData({
        loading: false,
        listData: this.data.listData.concat(res.data.rows),
        pageNum,
        total: res.data.total
      });
    });
  },

  onSearch(e) {
    this.setData({ listData: [], searchValue: e.detail, pageNum: 1, total: 0 });
    this.getList(1);
  },

  onClear() {
    this.setData({ listData: [], searchValue: '', pageNum: 1, total: 0 });
    this.getList(1);
  }
});
```

## web-view 嵌套网页

[官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)

### 创建 web-view

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

### 配置业务域名

在微信开发者工具中，可以正常看到嵌套的网页，但是在真机上无法访问，需要配置业务域名

打开[小程序管理后台](https://mp.weixin.qq.com/)，在「开发管理」->「开发设置」->「业务域名」，

1. 下载一个 txt 文件，将这个文件放到服务器的项目的根目录下
   1. 服务器需要是自己的，才能放文件
   2. 如果要访问的页面是 vue 这类项目创建的，需要将 txt 文件放到 public 文件夹下
2. 添加要嵌套的地址，回到真机看效果

### 小程序如何与网页通信？

webview 想和小程序通信只能通过 `wx.miniProgram.postMessage`。只能从页面向小程序发送消息。 页面需要引入微信 [JS-SDK1.3.2](https://res.wx.qq.com/open/js/jweixin-1.3.2.js)

#### 引入方式

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

#### 小程序接收消息

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

## 动态设置页面标题

```js
wx.setNavigationBarTitle({ title: options.isEdit ? '编辑' : '新增' });
```

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

## 去除背景色

点击 navigator 和 button 后，会有灰色的背景色，设置`hover-class="none"`可以去掉

```html
<navigator hover-class="none" url="/pages/foo/index">foo</navigator>

<button hover-class="btn-hover">click</button>
```
