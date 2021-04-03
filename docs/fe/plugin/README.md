# 常用插件

## Markdown 编辑器

[mavon-editor](https://github.com/hinesboy/mavonEditor)

## 富文本编辑器

[vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)

[mavonEditor](https://github.com/hinesboy/mavonEditor)

[tinymce](https://github.com/tinymce/tinymce)

[wangEditor](https://github.com/wangfupeng1988/wangEditor)

## 代码编辑器

[ace](https://github.com/ajaxorg/ace)

[vue2-ace-editor](https://github.com/chairuosen/vue2-ace-editor) 基于 ace 的 vue 插件

[monaco-editor](https://github.com/microsoft/monaco-editor) 为 vscode 编辑器提供支持

## PDF

[pdf.js](https://github.com/mozilla/pdf.js)

## 拖动

[Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
支持上下左右拖动列表、表格的行和列、折叠面板、复制等丰富的功能

## 图片预览

[viewerjs](https://github.com/fengyuanchen/viewerjs) 支持放大、缩小、旋转

[VueImgsPreview](https://github.com/MaleWeb/vue-imgs-preview)

## 剪贴板

[vue-clipboard2](https://github.com/Inndy/vue-clipboard2)

## 二维码生成器

[QRCode.js](https://github.com/davidshimjs/qrcodejs)

## 留言板

[gitalk](https://github.com/gitalk/gitalk)

## 中国省市区乡镇村地质数据

[Administrative-divisions-of-China](https://github.com/modood/Administrative-divisions-of-China)

[provinces-china](https://github.com/iceyangcc/provinces-china) 2017 年的数据，适合 vue+element-ui

## websocket 通信

[sockjs-client](https://github.com/sockjs/sockjs-client)

## 页面进度条

[nprogress](https://github.com/rstacruz/nprogress)

## base64 加密解密

[js-base64](https://github.com/dankogai/js-base64)

## 懒加载

[lazysizes](https://github.com/aFarkas/lazysizes)

## vuex 状态持久化

[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)

## 捕获键盘的输入

[hotkeys](https://github.com/jaywcjlove/hotkeys)

## 范围滑块

[noUiSlider](https://github.com/leongersen/noUiSlider)

## 数据可视化

[3d-force-graph](https://github.com/vasturiano/3d-force-graph) 3D 力导图，基于 three.js

[https://github.com/Ivanzgh/3d-force-graph](https://github.com/Ivanzgh/3d-force-graph)自己改的星球效果

## 生成随机数据

网址：[https://www.npmjs.com/package/randomjson](https://www.npmjs.com/package/randomjson)

可任意设置随机个数，数据格式自定义

```js
let axios = require('axios')
let randomjson = require('randomjson')

let dd = Math.random() * 10

let modelJson = {
  'data<@{5000}>': [
    {
      RDJ_GRBH: '<@index>' + dd,
      BIP_XM: '姓名',
      BIP_SFZHM: '133024196310251658',
      FWZJBXXDJB_FWZBH: '7da462c1362200',
      RZF_XZDXZQH: '110112001027',
      RZF_XZDXXDZ: '北京市昌平区北控宏创科技园5号楼',
      DZBM: '1101122301000_0026_00_00_0003_0003_0002_0001',
      JD: '116.67528',
      WD: '39.9020300005',
      TJSJ: '20200115000555',
      user: '2333'
    }
  ]
}

let myjson = randomjson(modelJson)

axios
  .post('http://192.168.130.63:5001/lgMulityInsert/ry', myjson)
  .then(res => {
    console.log(res.data)
  })
  .catch(err => {
    console.log(err)
  })
```

## 时间轴

[https://github.com/Ivanzgh/timeline](https://github.com/Ivanzgh/timeline)

## 动画库

### Tween.js

[https://github.com/tweenjs/tween.js](https://github.com/tweenjs/tween.js)

```js
let box = document.createElement('div')
box.style.setProperty('background-color', '#008800')
box.style.setProperty('width', '100px')
box.style.setProperty('height', '100px')
document.body.appendChild(box)

function animate() {
  requestAnimationFrame(animate)
  TWEEN.update()
}
animate()

let coords = { x: 200, y: 0 }
let tween = new TWEEN.Tween(coords)
  .to({ y: 200 }, 3000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onUpdate(() => {
    box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
  })
  .start()

let tweenBcak = new TWEEN.Tween(coords)
  .to({ y: 0 }, 3000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onUpdate(() => {
    box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')
  })

tween.chain(tweenBcak)
tweenBcak.chain(tween)
```

配合 three.js 使用，比如让一个球体沿 z 轴上下运动

```js
let coords = { x: 84771.68253191965, y: 31757.48999119179, z: 8.530729184960364 }
let tween = new TWEEN.Tween(coords)
  .to({ z: coords.z + 1 }, 3000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onUpdate(() => sphereMesh.translateZ(0.01))
  .start()
let tweenBack = new TWEEN.Tween(coords)
  .to({ z: coords.z }, 3000)
  .easing(TWEEN.Easing.Sinusoidal.InOut)
  .onUpdate(() => sphereMesh.translateZ(-0.01))
tween.chain(tweenBack)
tweenBack.chain(tween)

function animation() {
  requestAnimationFrame(animation)
  TWEEN.update()
  threelayer.renderScene()
}
animation()
```
