# 高德地图

## JS API 2.0

- [地图 JS API 2.0 概述](https://lbs.amap.com/api/javascript-api-v2/summary)
- [API 参考手册](https://lbs.amap.com/api/javascript-api-v2/documentation)
- [JS API 示例](https://lbs.amap.com/demo/list/js-api)
- [高德坐标拾取系统](https://lbs.amap.com/tools/picker)
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

## 结合 React 使用

重点就是要使用 `useRef`

```tsx
import { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

const MapContainer = () => {
  const map = useRef<any>();
  const AMap = useRef<any>(null);

  const initMap = async () => {
    AMap.current = await AMapLoader.load({ key: mapKey, version: '2.0', plugins: ['AMap.MouseTool'] });

    map.current = new AMap.current.Map('container', {
      resizeEnable: true,
      zoom: 9,
      center: [116.397428, 40.10993]
    });

    map.current.on('zoomend', async function () {
      const zoom = map.current.getZoom(0);
    });
  };

  useEffect(() => {
    initMap();
    return () => {
      map.current?.destroy();
    };
  }, []);
};
```

## 属性设置

```js
// 获取当前地图中心位置
map.getCenter();
// 设置地图中心点
map.setCenter([lng, lat]);
// 同时设置地图层级与中心点
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
// 点标记
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
// 从多个点标记中删除指定点
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

## 点聚合

[点聚合文档](https://lbs.amap.com/api/javascript-api-v2/documentation#markercluster)

在 api2.0 之前的[例子](https://lbs.amap.com/demo/javascript-api/example/marker/markerclusterer)

在 api2.0 之后，必须增加`lnglat`字段表示点标记的经纬度信息

```ts
// 不同类型的点标记，使用不同的图标和样式
const typeObj = {
  100: { image: mapyz, class: 'yzMarkerInfo' },
  200: { image: mapcdz, class: 'cdzMarkerInfo' },
  300: { image: mapjz, class: 'jzMarkerInfo' }
};

function addCluster() {
  if (cluster) {
    cluster.setMap(null);
  }
  map.current.plugin(['AMap.MarkerCluster'], async function () {
    // 获取数据
    const res: any = await getSpecialCoordinate();
    const markerData = res.data;
    for (const item of markerData) {
      item.lnglat = item.coordinates;
    }

    cluster = new AMap.MarkerCluster(map.current, markerData, {
      gridSize: 80,
      renderMarker: renderMarker
      // styles 指定聚合后的点标记的图标样式
      // renderClusterMarker 实现聚合点的自定义绘制
    });

    // 点击聚合点散开
    cluster.on('click', (e: any) => {
      if (e.clusterData.length <= 1) return;
      let alllng = 0,
        alllat = 0;
      for (const item of e.clusterData) {
        alllng += item.lnglat.lng;
        alllat += item.lnglat.lat;
      }
      const lat = alllat / e.clusterData.length;
      const lng = alllng / e.clusterData.length;
      const zoom = map.current.getZoom();
      map.current.setZoomAndCenter(zoom + 1, [lng, lat]);
    });
  });
}

// 实现非聚合点的自定义绘制
function renderMarker(context: any) {
  const spMarkerCoord = context.data[0];
  const typeItem = typeObj[spMarkerCoord.specialTypeId as keyof typeof typeObj];
  context.marker.setOffset(new AMap.Pixel(-1, -20));
  context.marker.setExtData({ data: spMarkerCoord });
  context.marker.setIcon(
    new AMap.Icon({
      size: new AMap.Size(30, 30),
      image: typeItem.image,
      imageSize: new AMap.Size(30, 30),
      imageOffset: new AMap.Pixel(0, 0)
    })
  );
  context.marker.setLabel({
    offset: new AMap.Pixel(0, -10),
    content: `<div class='${typeItem.class}'>${spMarkerCoord.label}</div>`,
    direction: 'top'
  });

  context.marker.on('click', (ev: any) => {
    const params = ev.target.getExtData();
    handleClickMarker(params);
  });
}
```

## 覆盖物事件

```js
const circle = new AMap.Circle({
  map: map,
  center: [116.368904, 39.913423],
  radius: 1500,
  strokeColor: '#3366FF', // 边框线颜色
  strokeOpacity: 0.3, // 边框线透明度
  strokeWeight: 3, // 边框线宽
  fillColor: '#FFA500', // 填充色
  fillOpacity: 0.5 // 填充透明度
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
  fillOpacity: 0.5, // 填充透明度
  draggable: true // 允许覆盖物被拖拽
});

marker.on('mouseover', function () {}); // 鼠标移入覆盖物
marker.on('mouseout', function () {}); // 鼠标移出覆盖物
marker.on('click', function () {}); // 点击覆盖物

// 在指定位置打开信息窗体
function openInfo() {
  const infoWindow = new AMap.InfoWindow({
    content: '信息窗体'
  });
  infoWindow.on('open', handleOpenInfo);
  infoWindow.on('close', handleCloseInfo);
  infoWindow.open(map, map.getCenter());
}

// 触发自定义事件count
map.emit('count', (count += 1));
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

// 添加图层
const map = new AMap.Map('container', {
  layers: [new AMap.TileLayer(), new AMap.TileLayer.Satellite()]
});
```

## 行政区划

获取区级编码 adcode，[例子](https://lbs.amap.com/demo/javascript-api/example/district-search/city-drop-down-list)，打开控制台，选择地级市后找到这个请求地址：`https://lbs.amap.com/_AMapService/v3/config/district`，响应结果就是相关数据

## 绘制图形并标注面积

```tsx
import { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

export type measureProps = 'rule' | 'measureArea';
export type drawProps = 'circle' | 'rect' | 'polygon';

const MapContainer = () => {
  const map = useRef<any>(null);
  const AMap = useRef<any>(null);
  const [mouseTool, setMouseTool] = useState<any>();

  const initMap = async () => {
    AMap.current = await AMapLoader.load({ key: mapKey, version: '2.0', plugins: ['AMap.MouseTool'] });

    map.current = new AMap.current.Map('container', {
      resizeEnable: true,
      center: [116.397428, 40.10993],
      zoom: 9
    });

    const ms = new AMap.current.MouseTool(map.current);
    setMouseTool(ms);

    ms.on('draw', onMouseToolDrawEnd);
  };

  useEffect(() => {
    if (map.current === null) {
      initMap();
    }

    return () => {
      map.current?.destroy();
    };
  }, []);

  function onMouseToolDrawEnd(e: any) {
    if (circleRadiusTextMarker.current) {
      map.current.remove(circleRadiusTextMarker.current);
      circleRadiusTextMarker.current = null;
    }

    const data = e.obj.getExtData();
    const type = data.type;
    const gl = e.obj;

    if (type === 'circle') {
      const radius = gl.getRadius();
      if (radius == 0) return;

      const π = 3.1415926;
      const center = gl.getCenter();
      const areaM = π * radius * radius;
      const areaKM = (areaM / 1000000).toFixed(2);
      const r = (radius / 1000).toFixed(2);
      const text = new AMap.current.Text({
        position: center,
        text: `<div>范围面积：${areaKM}平方公里</div><div>半径：${r}公里</div>`,
        offset: new AMap.current.Pixel(-20, -20),
        extData: { type: 'circle' }
      });
      map.current.add(text);
    }

    if (type === 'rect') {
      const bounds = gl.getBounds();
      const northEast = bounds.northEast;
      const southWest = bounds.southWest;
      if (northEast.pos === southWest.pos) return;

      const lat = (northEast.lat + southWest.lat) / 2;
      const lng = (northEast.lng + southWest.lng) / 2;

      const southEast = new AMap.current.LngLat(northEast.lng, southWest.lat);
      const wDistance = southWest.distance(southEast);
      const hDistance = northEast.distance(southEast);
      const wKM = (wDistance / 1000).toFixed(2);
      const hKM = (hDistance / 1000).toFixed(2);
      // const path = gl.getPath();
      // const areaM = AMap.current.GeometryUtil.ringArea(path);
      const areaKM = ((wDistance * hDistance) / 1000000).toFixed(2);

      const text = new AMap.current.Text({
        position: new AMap.current.LngLat(lng, lat),
        text: `<div>范围面积：${areaKM}平方公里</div><div>长：${wKM}公里</div><div>宽：${hKM}公里</div>`,
        offset: new AMap.current.Pixel(-20, -20),
        extData: { type: 'rect' }
      });
      map.current.add(text);
    }

    if (type === 'polygon') {
      const path = gl.getPath();
      const areaM = AMap.current.GeometryUtil.ringArea(path);
      const areaKM = (areaM / 1000000).toFixed(2);

      let alllng = 0,
        alllat = 0;
      for (const item of path) {
        alllng += item.lng;
        alllat += item.lat;
      }
      const lat = alllat / path.length;
      const lng = alllng / path.length;

      const text = new AMap.current.Text({
        position: new AMap.current.LngLat(lng, lat),
        text: `<div>范围面积：${areaKM}平方公里</div>`,
        offset: new AMap.current.Pixel(-20, -20),
        extData: { type: 'polygon' }
      });
      map.current.add(text);
    }

    // 这块功能是：框选搜索，用户可以绘制圆、矩形、多边形，框选出点标记，用作后续数据展示
    if (['circle', 'rect', 'polygon'].includes(type)) {
      const searchType = ['Overlay.Circle', 'Overlay.Rectangle', 'Overlay.Polygon'];
      if (searchType.includes(gl.className)) {
        const searchMarkers: any = [];
        const allMarkers = map.current.getAllOverlays('marker');
        allMarkers.forEach((e: any) => {
          const data = e.getExtData() || {};
          if (Object.keys(data).length > 0 && gl.contains(data.data.coordinates)) {
            searchMarkers.push(data);
          }
        });
      }
    }
  }

  // 测距、测面
  function onMeasure(type: measureProps) {
    if (!mouseTool) return;
    switch (type) {
      case 'rule': {
        const mouseToolRuleOptions = {
          startMarkerOptions: {
            icon: new AMap.current.Icon({
              size: new AMap.current.Size(19, 31),
              imageSize: new AMap.current.Size(19, 31),
              image: 'http://webapi.amap.com/theme/v1.3/markers/b/start.png'
            }),
            offset: new AMap.current.Pixel(-9, -31)
          },
          endMarkerOptions: {
            icon: new AMap.current.Icon({
              size: new AMap.current.Size(19, 31),
              imageSize: new AMap.current.Size(19, 31),
              image: 'http://webapi.amap.com/theme/v1.3/markers/b/end.png'
            }),
            offset: new AMap.current.Pixel(-9, -31)
          },
          midMarkerOptions: {
            icon: new AMap.current.Icon({
              size: new AMap.current.Size(19, 31),
              imageSize: new AMap.current.Size(19, 31),
              image: 'http://webapi.amap.com/theme/v1.3/markers/b/mid.png'
            }),
            offset: new AMap.current.Pixel(-9, -31)
          },
          lineOptions: {
            strokeStyle: 'solid',
            strokeColor: '#FF33FF',
            strokeOpacity: 1,
            strokeWeight: 2,
            extData: { type }
          }
        };
        mouseTool.rule(mouseToolRuleOptions);
        break;
      }
      case 'measureArea': {
        mouseTool.measureArea({
          strokeColor: '#80d8ff',
          fillColor: '#80d8ff',
          fillOpacity: 0.3,
          extData: { type }
        });
        break;
      }
    }
  }

  // 框选搜索
  function onDrawSearch(type: drawProps) {
    if (!mouseTool) return;

    const drawStyles = {
      strokeColor: '#FF33FF',
      strokeOpacity: 0.2,
      strokeWeight: 3,
      fillColor: '#1791fc',
      fillOpacity: 0.2,
      strokeStyle: 'solid'
    };

    switch (type) {
      case 'circle':
        mouseTool.circle({ ...drawStyles, extData: { type } });
        break;
      case 'rect':
        mouseTool.rectangle({ ...drawStyles, extData: { type } });
        break;
      case 'polygon':
        mouseTool.polygon({ ...drawStyles, extData: { type } });
        break;
      default:
        break;
    }
  }

  function onClearAll() {
    mouseTool.close(true); // 关闭，并清除覆盖物

    // 清空绘制图形产生的文本标记
    const allTexts = map.current.getAllOverlays('text');
    allTexts.forEach((t: any) => {
      const extData = t.getExtData();
      if (['circle', 'rect', 'polygon'].includes(extData.type)) {
        t.setMap(null);
        t = null;
      }
    });
  }
};

return <div id="container" style={{ height: '100vh' }}></div>;

export default MapContainer;
```

### 绘制圆形实时显示半径和面积

```tsx
// 1. 定义一个字段存储圆形标记
const circleRadiusTextMarker = useRef<any>(null);

// 2. 在初始化地图initMap中，添加监听绘制中的事件
ms.on('drawing', onMouseToolDrawing);

// 3. 绘制drawing事件回调函数
function onMouseToolDrawing(e: any) {
  const data = e.obj.getExtData();
  const type = data.type;
  const gl = e.obj;

  if (type === 'circle') {
    const radius = gl.getRadius();
    if (radius == 0) return;

    const π = 3.1415926;
    const center = gl.getCenter();
    const areaM = π * radius * radius;
    const areaKM = (areaM / 1000000).toFixed(2);
    const r = (radius / 1000).toFixed(2);
    const textContent = `<div>范围面积：${areaKM}平方公里</div><div>半径：${r}公里</div>`;
    if (circleRadiusTextMarker.current) {
      circleRadiusTextMarker.current.setText(textContent);
    } else {
      const textMarker = new AMap.current.Text({
        position: center,
        text: textContent,
        offset: new AMap.current.Pixel(-20, -20),
        extData: { type: 'circleRadiusTextMarker' }
      });
      circleRadiusTextMarker.current = textMarker;
      map.current.add(textMarker);
    }
  }
}

// 4. 鼠标工具绘制结束，要清除文本标记，并设置为默认值null
function onMouseToolDrawEnd(e: any) {
  if (circleRadiusTextMarker.current) {
    map.current.remove(circleRadiusTextMarker.current);
    circleRadiusTextMarker.current = null;
  }
  // 其他代码省略
}
```
