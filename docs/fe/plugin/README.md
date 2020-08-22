# 常用插件

## Markdown编辑器
[mavon-editor](https://github.com/hinesboy/mavonEditor)

## 富文本编辑器
[vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)

[mavonEditor](https://github.com/hinesboy/mavonEditor)

[tinymce](https://github.com/tinymce/tinymce)

## 代码编辑器
[ace](https://github.com/ajaxorg/ace) 

[vue2-ace-editor](https://github.com/chairuosen/vue2-ace-editor)   基于ace的vue插件

[monaco-editor](https://github.com/microsoft/monaco-editor) 为vscode编辑器提供支持

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

## 留言板
[gitalk](https://github.com/gitalk/gitalk)

## 中国省市区乡镇村地质数据
[Administrative-divisions-of-China](Administrative-divisions-of-China)

[provinces-china](https://github.com/iceyangcc/provinces-china) 2017年的数据，适合vue+element-ui

## websocket通信
[sockjs-client](https://github.com/sockjs/sockjs-client)
## 页面进度条
[nprogress](https://github.com/rstacruz/nprogress)

## base64加密解密
[js-base64](https://github.com/dankogai/js-base64)

## 懒加载
[lazysizes](https://github.com/aFarkas/lazysizes)

## vuex状态持久化
[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate)

## 捕获键盘的输入
[hotkeys](https://github.com/jaywcjlove/hotkeys)

## 范围滑块
[noUiSlider](https://github.com/leongersen/noUiSlider)

## 数据可视化

[3d-force-graph](https://github.com/vasturiano/3d-force-graph) 3D力导图，基于three.js

[https://github.com/Ivanzgh/3d-force-graph](https://github.com/Ivanzgh/3d-force-graph)自己改的星球效果

## 生成随机数据

网址：[https://www.npmjs.com/package/randomjson](https://www.npmjs.com/package/randomjson)

可任意设置随机个数，数据格式自定义
```js
let axios = require('axios')
let randomjson = require('randomjson');

let dd = Math.random() * 10

let modelJson = {
    "data<@{5000}>": [
        {
            "RDJ_GRBH": "<@index>" + dd,
            "BIP_XM": "姓名",
            "BIP_SFZHM": "133024196310251658",
            "FWZJBXXDJB_FWZBH": "7da462c1362200",
            "RZF_XZDXZQH": "110112001027",
            "RZF_XZDXXDZ": "北京市昌平区北控宏创科技园5号楼",
            "DZBM": "1101122301000_0026_00_00_0003_0003_0002_0001",
            "JD": "116.67528",
            "WD": "39.9020300005",
            "TJSJ": "20200115000555",
            "user": "2333"
        }
    ]
}

let myjson = randomjson(modelJson);

axios.post('http://192.168.130.63:5001/lgMulityInsert/ry', myjson).then(res => {
    console.log(res.data);
}).catch(err => {
    console.log(err);
});
```

## 时间轴

[https://github.com/Ivanzgh/timeline](https://github.com/Ivanzgh/timeline)