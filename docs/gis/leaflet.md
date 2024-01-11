# Leaflet

一个开源 JavaScript 库，适用于移动设备的交互式地图

官网: [https://leafletjs.com/](https://leafletjs.com/)

## 安装

npm 安装

```sh
npm install leaflet
```

CDN

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"></script>
```

## 加载地图

### 准备一个地图容器

```html
<div id="map" style="width: 100%;height:800px;"></div>
```

### 声明一个地图

```js
const map = L.map('map', {
  center: [39.90923, 116.397428],
  zoom: 12
});
```

### 添加图层

#### （1）、高德地图标准图层

```js
L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
  subdomains: ['1', '2', '3', '4'] // 子域名，对应 urlTemplate 链接中的参数 {s}
}).addTo(map);
```

#### （2）、高德地图卫星图层

```js
L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
  subdomains: ['1', '2', '3', '4']
}).addTo(map);
```

#### （3）、高德地图标注

```js
L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', {
  subdomains: ['1', '2', '3', '4']
}).addTo(map);
```

#### （4）、谷歌地图

```js
L.tileLayer('http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}').addTo(map);
```

#### （5）、谷歌卫星地图

```js
L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}').addTo(map);
```

#### （6）、百度地图

详见 [baiduLayer.html](https://github.com/Ivanzgh/leaflet/blob/master/src/baiduLayer.html)

### 切换图层

[Control.Layers](https://leafletjs.com/reference-1.0.3.html#control-layers)

```js
L.control.layers( baselayers?, overlays?, <Control.Layers options> options?)
```

使用给定的层创建一个属性控件。基层将使用单选按钮来切换，而覆盖将用复选框来切换。
所有的基层都应该在基层对象中传递，但是在地图实例化过程中，应该只在映射中添加一个。
详见 [layer.html](https://github.com/Ivanzgh/leaflet/blob/master/src/layer.html)

更多示例请详见 [leaflet](https://github.com/Ivanzgh/leaflet)
