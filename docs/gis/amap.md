# 高德地图

## JS API 2.0

- [地图 JS API 2.0 概述](https://lbs.amap.com/api/javascript-api-v2/summary)
- [API 参考手册](https://lbs.amap.com/api/javascript-api-v2/documentation)
- [JS API 示例](https://lbs.amap.com/demo/list/js-api)
- [结合 React 使用](https://lbs.amap.com/api/javascript-api-v2/guide/abc/amap-react)
- [结合 Vue 使用](https://lbs.amap.com/api/javascript-api-v2/guide/abc/amap-vue)

## 地图生命周期

```js
// 地图初始化
const map = new AMap.Map('container', {
  zoom: 11,
  center: [116.397428, 39.90923]
});

// 地图加载完成
map.on('complete', function () {});

// 地图销毁
map.destroy();
```

## 属性设置

```js
// 获取当前地图中心位置
map.getCenter();
// 设置地图中心点
map.setCenter([lng, lat]);
//同时设置地图层级与中心点
map.setZoomAndCneter(zoom, [lng, lat]);

// 获取当前地图缩放级别，可以传递参数，表示级别的小数位精度，缺省为2。取整：map.getZoom(0)
map.getZoom();
// 设置地图缩放级别
map.setZoom(zoom);
// 地图放大一级显示
map.zoomIn();
// 地图缩小一级显示
map.zoomOut();

// 获取地图当前行政区
map.getCity((info) => {});
// 设置地图当前行政区，可通过中文城市名、adcode、citycode等设置地图的中心点
map.setCity('');

// 设置中英文地图，en、zh_ne、zh_cn
map.setLang('zh_cn');

// 根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别，参数均可缺省
map.setFitView(overlays, immediately, avoid, maxZoom);
```

## 绑定事件

```js
// 单击事件
map.on('click', function () {});
// 双击事件
map.on('dblclick', function () {});

// 地图移动事件，移动开始触发
map.on('movestart', function () {});
// 移动事件，移动结束触发
map.on('moveend', function () {});
// 移动事件，移动中触发
map.on('movemove', function () {});

// 地图缩放事件，缩放开始触发
map.on('zoomstart', function () {});
// 缩放结束触发
map.on('zoomend', function () {});
// 缩放中触发
map.on('zoomchange', function () {});

// 地图拖拽事件，拖拽结束触发
map.on('dragend', function () {});
// 正在拖拽时触发
map.on('dragging', function () {});
// 拖拽开始触发
map.on('dragstart', function () {});

// 解绑对应事件，map.off()
map.off('click', function () {});
```

## Marker 点标记

```js
// 构造点标记
const marker = new AMap.Marker({
  icon: 'XXX.png',
  position: [lng, lat]
});

map.add(marker); // 添加一个点
map.add([marker, marker]); // 添加多个点
map.remove(marker); // 移除一个点
map.remove([marker, marker]); // 移除多个点
map.clearMap(); // 清除地图上所有添加的覆盖物

// 移除一个点
const clearMarker = () => {
  if (marker) {
    marker.setMap(null);
    marker = null;
  }
};
//从多个点标记中删除指定点
markers[0].setMap(null);

// 获取某类覆盖物，如 marker、polyline、polygon
map.getAllOverlays('marker');

// 利用 extData 属性给覆盖物添加额外的数据
const marker = new AMap.Marker({
  icon: 'XXX.png',
  position: [lng, lat],
  extData: { id: 1 }
});
const id = marker.getExtData().id;
```

存储点标记

```js
// 1. 通过 OverlayGroup
let markerList = new AMap.OverlayGroup();

list.forEach((item) => {
  const marker = new AMap.Marker({});
  marker.on('click', () => {});
  markerList.addOverlay(marker);
});
map.add(markerList);

// 显示或者隐藏
markerList.eachOverlay((item) => {
  item.show();
  item.hide();
});

// 2. 通过数组存储
const markerList = [];

list.forEach((item) => {
  const marker = new AMap.Marker({});
  marker.on('click', () => {});
  markerList.push(marker);
});
map.add(markerList);

// 显示或者隐藏
markerlist.forEach((item) => {
  item.show();
  item.hide();
});
```

示例：

```js
const addBDMarker = () => {
  const markers = [];
  const positions = [
    [116.405267, 39.907761],
    [116.415967, 39.927761],
    [116.415467, 39.902761],
    [116.423467, 39.907761],
    [116.385427, 39.904761]
  ];

  for (let i = 0; i < positions.length; i++) {
    const marker = new AMap.Marker({
      map: map,
      position: positions[i],
      offset: new AMap.Pixel(-13, -30),
      icon: new AMap.Icon({
        size: new AMap.Size(30, 50),
        image: 'xxx.png',
        imageSize: new AMap.Size(30, 50),
        imageOffset: new AMap.Pixel(0, 0)
      }),
      extData: { id: '12345' }
    });
    marker.on('click', () => {
      const params = marker.getExtData();
      onClickMarker(params);
    });
    markers.push(marker);
  }
  return markers;
};
```

## 覆盖物事件

```js
const lineArr = [
  [116.368904, 39.913423],
  [116.382122, 39.901176],
  [116.387271, 39.912501],
  [116.398258, 39.9046]
];
const circle = new AMap.Circle({
  map: map,
  center: lineArr[0], // 设置线覆盖物路径
  radius: 1500,
  strokeColor: '#3366FF', // 边框线颜色
  strokeOpacity: 0.3, // 边框线透明度
  strokeWeight: 3, // 边框线宽
  fillColor: '#FFA500', // 填充色
  fillOpacity: 0.35 // 填充透明度
});
const polygonArr = [
  [116.403322, 39.920255],
  [116.410703, 39.897555],
  [116.402292, 39.892353],
  [116.389846, 39.891365]
];
const polygon = new AMap.Polygon({
  map: map,
  path: polygonArr, // 设置多边形边界路径
  strokeColor: '#FF33FF', // 线颜色
  strokeOpacity: 0.2, // 线透明度
  strokeWeight: 3, // 线宽
  fillColor: '#1791fc', // 填充色
  fillOpacity: 0.35, // 填充透明度
  draggable: true // 允许覆盖物被拖拽
});

marker.on('mouseover', function () {}); // 鼠标移入覆盖物
marker.on('mouseout', function () {}); // 鼠标移出覆盖物
marker.on('click', function () {}); // 点击覆盖物

// 在指定位置打开信息窗体
function openInfo() {
  // 构建信息窗体中显示的内容
  let info = [];
  info.push('<div><div><img style="float:left;" src=" https://webapi.amap.com/images/autonavi.png "/></div> ');
  info.push('<div style="padding:0px 0px 0px 4px;"><b>高德软件</b>');
  info.push('电话 : 010-84107000   邮编 : 100102');
  info.push('地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>');
  infoWindow = new AMap.InfoWindow({
    content: info.join('<br/>') // 使用默认信息窗体框样式，显示信息内容
  });
  infoWindow.on('open', showInfoOpen);
  infoWindow.on('close', showInfoClose);
  infoWindow.open(map, map.getCenter());
}

map.emit('count', (count += 1)); // 触发自定义事件count
map.on('count', (count) => {
  console.log(count);
});
```

## 图层

官方图层：

```js
new AMap.TileLayer(); // 切片图层类
new AMap.TileLayer.Traffic(); // 实时交通图层
new AMap.TileLayer.Satellite(); // 卫星图层
new AMap.TileLayer.RoadNet(); // 路网图层，展示道路信息
new AMap.Buildings(); // 建筑楼块 3D 图层
new AMap.DistrictLayer(); // 行政区图层
new AMap.IndoorMap(); // 室内图层
```

```js
// 卫星图层
const satellite = new AMap.TileLayer.Satellite({
  map: map,
  zIndex: 18, // 图层叠加的顺序值
  opacity: 0.8 // 图层透明度
});

// 路网图层
const roadnet = new AMap.TileLayer.RoadNet({
  map: map
});

satellite.setMap(map); // 添加图层
satellite.setMap(null); // 移除图层
satellite.show(); // 显示图层
satellite.hide(); // 隐藏图层
satellite.setzIndex(zIndex); // 设置图层层级
satellite.setOpacity(opacity); // 设置图层透明度，范围 [0 ~ 1]

map.add(roadnet); // 添加图层
map.remove(roadnet); //移除图层
map.add([satellite, roadnet]); // 批量添加图层

// 直接在map的options属性中添加图层
const map = new AMap.Map('container', {
  layers: [new AMap.TileLayer(), new AMap.TileLayer.Satellite()]
});
```

## 测距、测面

```js
import AMapLoader from '@amap/amap-jsapi-loader';

const AMap = await AMapLoader.load({ key: mapKey, version: '2.0', plugins: ['AMap.MouseTool'] });
const map = new AMap.Map('container', {
  zoom: 11,
  center: [116.397428, 39.90923]
});
const mouseTool = new AMap.MouseTool(map);

// 测距：rule
// 测面：measureArea
function draw(type: string) {
  if (!mouseTool) {
    console.log('mouseTool is undefined');
    return;
  }
  switch (type) {
    case 'rule': {
      mouseTool.rule({
        startMarkerOptions: {
          icon: new AMap.Icon({
            size: new AMap.Size(19, 31),
            imageSize: new AMap.Size(19, 31),
            image: 'http://webapi.amap.com/theme/v1.3/markers/b/start.png'
          }),
          offset: new AMap.Pixel(-9, -31)
        },
        endMarkerOptions: {
          icon: new AMap.Icon({
            size: new AMap.Size(19, 31),
            imageSize: new AMap.Size(19, 31),
            image: 'http://webapi.amap.com/theme/v1.3/markers/b/end.png'
          }),
          offset: new AMap.Pixel(-9, -31)
        },
        midMarkerOptions: {
          icon: new AMap.Icon({
            size: new AMap.Size(19, 31),
            imageSize: new AMap.Size(19, 31),
            image: 'http://webapi.amap.com/theme/v1.3/markers/b/mid.png'
          }),
          offset: new AMap.Pixel(-9, -31)
        },
        lineOptions: {
          strokeStyle: 'solid',
          strokeColor: '#FF33FF',
          strokeOpacity: 1,
          strokeWeight: 2
        }
      });
      break;
    }
    case 'measureArea': {
      mouseTool.measureArea({
        strokeColor: '#80d8ff',
        fillColor: '#80d8ff',
        fillOpacity: 0.3
      });
      break;
    }
  }
}

const onClearAll = () => {
  mouseTool.close(true); // 关闭，并清除覆盖物
};


```
