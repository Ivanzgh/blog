# OpenLayers

## 介绍

OpenLayers 是一个专为 WebGIS 客户端开发提供的JavaScript 类库包，用于实现标准格式发布的地图数据访问。
简单说，就是用于在网页中实现地图的动态显示和交互。

官网：[https://openlayers.org/](https://openlayers.org/)

下载：[https://openlayers.org/download/](https://openlayers.org/download/)

## 快速上手

```html
<!doctype html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/css/ol.css" type="text/css">
    <style>
      .map {
        height: 400px;
        width: 100%;
      }
    </style>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.1.1/build/ol.js"></script>
    <title>OpenLayers example</title>
  </head>
  <body>
    <h2>My Map</h2>
    <div id="map" class="map"></div>
    <script type="text/javascript">
      var map = new ol.Map({
        target: 'map',      // 地图容器
        layers: [              // 图层组
          new ol.layer.Tile({
            source: new ol.source.OSM()   // 数据源
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([37.41, 8.82]),  // 视图中心
          zoom: 4     // 初始缩放层级
        })
      });
    </script>
  </body>
</html>
```

整个地图看作一个容器（Map），核心为地图图层（Layer），每个图层有对应的数据源（Source），并由地图视图（View）进行地图展示。地图容器上还支持一些与用户交互的控件（Control和Interaction），另外，OpenLayers还支持事件机制。

## 加载WMS服务

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index</title>
    <link rel="stylesheet" href="./openlayers/ol.css">
    <script src="./openlayers/ol.js"></script>
    <style>
        #map {
            width: 100%;
            height: 100vh;
        }
    </style>
</head>
<body>
<div id="map"></div>
<script>
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://xxx/geoserver/xxx/wms',   // wms服务地址
                    params: {
                        'LAYERS': 'xxx:xxx',       // 图层
                        'TILED': true
                    },
                    serverType:'geoserver'      // 服务类型
                })
            })
        ],
        view: new ol.View({
            // 限制地图范围
            // extent: fromLonLat([115.7,39.4,117.4,41.6]),
            center: ol.proj.fromLonLat([116.38, 39.9]),
            zoom: 11,
            // 限制地图缩放级别
            minZoom: 6,
            maxZoom: 20,
            // projection: 'EPSG:3857'  // 默认投影为 EPSG:3857
        }),
        controls: [
            // 添加层级缩放控件
            new ol.control.Zoom(),
            // 添加比例尺控件
            new ol.control.ScaleLine({
                //设置度量单位为米
                units: 'metric',
                className: 'ol-scale-line'
            })
        ]
    });
</script>
</body>
</html>
```

## 绘制点线面

openlayers支持的类型有 `Point`, `LineString`, `LinearRing`, `Polygon`, `MultiPoint`, `MultiLineString`, `MultiPolygon`, `GeometryCollection`, `Circle`

在以上代码的基础上接着添加以下代码：

```js
// 添加一个矢量图层
const pointLayer = new ol.layer.Vector({
    source: new ol.source.Vector()
});
map.addLayer(pointLayer);

// 添加交互
const drawPoint = new ol.interaction.Draw({
    type: 'Point',
    source: pointLayer.getSource()
});
map.addInteraction(drawPoint);
```

首先添加一个矢量图层，接着创建一个交互，注意添加 `source: pointLayer.getSource()` 用于保存绘制的内容。如果要绘制线、面等其他类型，只需更改`ol.interaction.Draw()`中type的类型即可。

## 手绘形状

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>freehand</title>
    <link rel="stylesheet" href="./openlayers/ol.css">
    <style>
        ul, li {
            list-style: none;
        }
        ul li {
            width: 75px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
        }
        ul li:hover {
            background-color: #40E0D0;
        }
        #map {
            position: relative;
            width: 100%;
            height: 800px;
        }
        .operat {
            position: absolute;
            top: 20px;
            right: 60px;
            z-index: 2000;
            display: flex;
            color: #fff;
            background: #34495e;
            padding-left: 0;
            text-align: center;
        }
        #type {
            display: none;
            top: 28px;
            color: #fff;
            background: #34495e;
            font-size: 14px;
            width: 150px;
            text-align: left;
            outline: none;
        }
        #type option {
            width: 150px;
            height: 25px;
            line-height: 25px;
        }
        #type option:hover {
            background-color: #008080;
        }
    </style>
    <script src="./openlayers/ol.js"></script>
</head>
<body>
<div id="map">
    <ul class="operat">
        <li id="shape">Shape
            <select id="type">
                <option value="none">None</option>
                <option value="Point">Point</option>
                <option value="LineString">LineString</option>
                <option value="Polygon">Polygon</option>
                <option value="Circle">Circle</option>
                <option value="Rectangle">Rectangle</option>
                <option value="Square">Square</option>
                <option value="freehandLine">freehandLine</option>
                <option value="freehandPolygon">freehandPolygon</option>
            </select>
        </li>
        <li id="disable">Disable</li>
        <li id="clear">Clear</li>
    </ul>
</div>
<script>
    let map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.TileWMS({
                    url: 'http://xxx/geoserver/xxx/wms',
                    params: {
                        'LAYERS': 'xxx:xxx',
                        'TILED': true
                    },
                    serverType: 'geoserver'
                })
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([116.38, 39.9]),
            zoom: 11,
            minZoom: 6,
            maxZoom: 20
        }),
        controls: [
            new ol.control.Zoom(),
            new ol.control.ScaleLine({
                units: 'metric',
                className: 'ol-scale-line'
            })
        ]
    });

    let typeSelect = document.getElementById('type');
    let shape = document.getElementById('shape');
    shape.onmouseover = function () {
        typeSelect.style.display = 'block';
        typeSelect.size = 9
    };
    shape.onmouseout = function () {
        typeSelect.style.display = 'none'
    };
    let draw;

    // 添加一个矢量图层
    let vectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            // 线的样式
            stroke: new ol.style.Stroke({
                color: '#000',
                width: 2
            }),
            // 将点设置成圆形样式
            image: new ol.style.Circle({
                // 点的颜色
                fill: new ol.style.Fill({
                    color: '#f00'
                }),
                // 圆形半径
                radius: 5
            })
        })
    });
    map.addLayer(vectorLayer);

    function addInteraction() {
        let value = typeSelect.value;
        if (value !== 'none') {
            switch (value) {
                case 'Point' :
                    draw = new ol.interaction.Draw({
                        type: 'Point',
                        source: vectorLayer.getSource()
                    });
                    break;
                case 'LineString' :
                    draw = new ol.interaction.Draw({
                        type: 'LineString',
                        source: vectorLayer.getSource()
                    });
                    break;
                case 'Polygon' :
                    draw = new ol.interaction.Draw({
                        type: 'Polygon',
                        source: vectorLayer.getSource()
                    });
                    break;
                case 'Circle' :
                    draw = new ol.interaction.Draw({
                        type: 'Circle',
                        source: vectorLayer.getSource()
                    });
                    break;
                case 'Rectangle' :
                    draw = new ol.interaction.Draw({
                        type: 'Circle',
                        source: vectorLayer.getSource(),
                        geometryFunction: ol.interaction.Draw.createBox()
                    });
                    break;
                case 'Square' :
                    draw = new ol.interaction.Draw({
                        type: 'Circle',
                        source: vectorLayer.getSource(),
                        // 参数 4 表示4条边，此处可随意设置多边形
                        geometryFunction: ol.interaction.Draw.createRegularPolygon(4)
                    });
                    break;
                case 'freehandLine' :
                    draw = new ol.interaction.Draw({
                        type: 'LineString',
                        freehand: true,   // 手绘任意线
                        source: vectorLayer.getSource()
                    });
                    break;
                case 'freehandPolygon' :
                    draw = new ol.interaction.Draw({
                        type: 'Polygon',
                        freehand: true,
                        source: vectorLayer.getSource()
                    });
                    break;
                default :
                    break;
            }
            map.addInteraction(draw);
        }
    }

    // 监听选择的值
    typeSelect.onchange = function () {
        //先移除上一个Interaction
        map.removeInteraction(draw);
        //再根据typeSelect的值绘制新的Interaction
        addInteraction();
    };
    addInteraction();

    let disableDraw = document.getElementById('disable');
    disableDraw.addEventListener("click", function () {
        map.removeInteraction(draw)
    });

    let clearDraw = document.getElementById('clear');
    clearDraw.addEventListener("click", function () {
        // 移除矢量图层数据
        vectorLayer.getSource().clear()
        // 移除交互
        // map.removeInteraction(draw)
    })
</script>
</body>
</html>
```
