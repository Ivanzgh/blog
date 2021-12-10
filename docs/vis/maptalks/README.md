# maptalks

## ToolTip

先初始化地图，然后生成一个点，鼠标移入显示提示信息，使用`ToolTip`或者`InfoWindow`

```js
const map = new maptalks.Map('map', {
  center: [118.5120580992, 38.5709155036],
  zoom: 5,
  minZoom: 1,
  maxZoom: 18,
  seamlessZoom: false,
  spatialReference: { projection: 'baidu' },
  baseLayer: new maptalks.TileLayer('base', {
    urlTemplate:
      'http://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1',
    subdomains: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    attribution: '&copy; <a target="_blank" href="http://map.baidu.com">Baidu</a>'
  })
})

const point = new maptalks.Marker([info.lng, info.lat], {
  symbol: {
    markerFile: 'foo.png',
    markerWidth: 24,
    markerHeight: 30
  }
})
const toolTip = new maptalks.ui.ToolTip(
  `<div style='color: #000; width:200px; background:#fff; opacity:0.8;padding:6px;'>
        <div>船名：${info.cnName ? info.cnName : '-'}</div><div>MMSI：${info.mmsi}</div>
        <div>时间：${
          info.updateTime ? moment(info.updateTime).format('YYYY-MM-DD HH:mm:ss') : '-'
        }</div></div>`
)
toolTip.setStyle('tip')
toolTip.addTo(point)

// const infoWindow = new maptalks.ui.InfoWindow({
//   single: false,
//   width: 200,
//   height: 180,
//   custom: true,
//   dx: -100,
//   dy: -3,
//   content: `<div style='color: #000; width:200px; background:#fff; opacity:0.8;padding:6px;'>
//   <div>船名：${info.cnName ? info.cnName : '-'}</div><div>MMSI：${info.mmsi}</div>
//   <div>时间：${info.updateTime ? moment(info.updateTime).format('YYYY-MM-DD HH:mm:ss') : '-'}</div></div>`
// })
// infoWindow.addTo(map)

// point.on('mouseover', () => {
//   infoWindow.show({ x: info.lng, y: info.lat })
// })
// point.on('mouseout', () => {
//   infoWindow.hide()
// })
new maptalks.VectorLayer('vector', point).addTo(map)
```

## 计算船舶点位角度

- maptalks 默认以正东为起始角度，逆时针旋转为正方向
- 船首向以正北为起始角度，顺时针旋转为正方向
- marker 点位默认就有 90 度

所以在设置船舶图标方向时，直接将船首向（heading）取反即可，`markerRotation: -heading`

## 设置 svg 点位图标

```js
export const getShipPath = function(s) {
  return [
    {
      path: 'M422.976017 76.166077l244.036492 927.338671h-488.072985l244.036493-927.338671z m0 0',
      'stroke-width': '2',
      stroke: s,
      fill: '#f4ea2a'
    },
    {
      path:
        'M692.369426 1024H153.582608L422.976017 0 692.369426 1024z m-488.072985-39.083969h437.359151L422.976017 153.285422 204.296441 984.916031z m0 0',
      'stroke-width': '6',
      stroke: s,
      fill: '#f4ea2a'
    }
  ]
}

export const shipSymbol = function(lineColor) {
  const symbol = [
    {
      markerType: 'path',
      markerPath: getShipPath(lineColor),
      markerPathWidth: 1024,
      markerPathHeight: 1024,
      markerWidth: 24,
      markerHeight: 30,
      markerDy: 15, // height的一半
      markerDx: 2
    }
  ]
  return symbol
}
```

`markerPathWidth`和`markerPathHeight`表示 svg 的 `viewBox` 属性，
允许指定一个给定的一组图形伸展以适应特定的容器元素。

经纬度位置在图片图标的正中心，在 svg 图标的下方，所以需要沿 y 轴偏移图标高度的一半
