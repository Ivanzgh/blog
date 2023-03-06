# 微信小程序

## 路由

`<navigator url="/pages/zghDetail/index?id=1">点击跳转去详情页</navigator>`

接收参数：在生命周期函数 onLoad 中监听页面加载

路由传参不能直接传递对象，需要转为 json 字符串，`JSON.stringfy()`、`JSON.parse()`

```js
onLoad(options) {
  this.setData({ routerParams: options.id })
},
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
    let that = this
    const imgNum = this.data.imageList.length
    if (imgNum >= 9) {
      wx.showToast({ title: '最多上传9张图片', icon: 'loading', duration: 2000 })
      return false
    } else {
      imgNum = 9 - imgNum
    }
    wx.chooseMedia({
      count: imgNum,
      mediaType: ['image'],
      sourceType: ['album'],
      success(res) {
        const arr = []
        res.tempFiles.forEach((e) => {
          arr.push(e.tempFilePath)
        })
        that.setData({ imageList: that.data.imageList.concat(arr) })
      },
      fail(res) {
        console.log('接口调用失败的回调函数', res)
      }
    })
  },
  // 拍照上传
  photograph() {
    let that = this
    const imgNum = this.data.imageList.length
    if (imgNum >= 9) {
      wx.showToast({ title: '最多上传9张图片', icon: 'loading', duration: 2000 })
      return false
    } else {
      imgNum = 9 - imgNum
    }
    wx.chooseMedia({
      count: imgNum,
      mediaType: ['image'],
      sourceType: ['camera'],
      success(res) {
        const arr = []
        res.tempFiles.forEach((e) => {
          arr.push(e.tempFilePath)
        })
        that.setData({
          imageList: that.data.imageList.concat(arr)
        })
      },
      fail(res) {
        console.log('接口调用失败的回调函数', res)
      }
    })
  },
  // 图片预览
  handleImagePreview(e) {
    const index = e.currentTarget.dataset.idx
    const images = this.data.imageList
    wx.previewImage({
      current: images[index], //当前预览的图片
      urls: images //所有要预览的图片
    })
  },

  // 删除图片
  removeImage(e) {
    const that = this
    const imgList = this.data.imageList
    const index = e.currentTarget.dataset.idx
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success(res) {
        if (res.confirm) {
          imgList.splice(index, 1)
        } else if (res.cancel) {
          return false
        }
        that.setData({ imageList: imgList })
      }
    })
  },

  // wx.uploadFile() 不支持多图片上传。可以封装成 promise
  wxUploadFile(filePath) {
    let that = this
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
      })
    })
  },

  // 保存提交
  submitForm(e) {
    const arr = []
    //将选择的图片组成一个Promise数组，准备进行并行上传
    for (let path of this.data.imageList) {
      arr.push(this.wxUploadFile(path))
    }

    wx.showLoading({ title: '正在上传...', mask: true })

    // 开始并行上传图片
    Promise.all(arr)
      .then((res) => {
        // 上传成功，获取这些图片在服务器上的地址，组成一个数组
        return res.map((item) => JSON.parse(item.data).url)
      })
      .catch((err) => {
        console.log('upload images error:', err)
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
        const pages = getCurrentPages()
        const currPage = pages[pages.length - 1]
        const prevPage = pages[pages.length - 2]
        wx.navigateBack()
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        wx.hideLoading()
      })
  }
})
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
