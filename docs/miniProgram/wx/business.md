# 业务

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

## 放大缩小页面

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

如果有两个页签，每个页签下面都有一个图，且图的类型一样，比如都是折线图，那么可以只设置一个图表容器，在初始时渲染，在切换时更新数据重新渲染。

### 图和内容重叠

如果确认配置图表没有问题，但是页面上的图表显示位置有问题。可以排查图表前面的元素，如果前面有别的元素且数据是从后台获取的，那么可以先给前面的元素设置一个占位。可能是数据还没返回，图表就已经渲染显示了，等到数据返回后，撑起了内容的高度，就会把上面的内容挤下去了，导致和图表重叠了
