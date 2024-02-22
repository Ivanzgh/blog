# Echarts

## 柱状图

设置柱状图位置

```json
{
  "grid": {
    "bottom": 25
  }
}
```

设置柱状图 y 轴不显示小数

```json
{
  "yAxis": {
    "type": "value",
    "min": 0,
    "minInterval": 1
  }
}
```

## 折线图

### 强制显示所有 x 轴标签

```js
const option = {
  xAxis: {
    type: 'category',
    name: '单位:万元',
    axisLabel: {
      interval: 0,
      rotate: 45,
      textStyle: {
        color: '#8A8A8A'
      }
    },
    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  }
};
```

interval 设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，如果值为 2，表示隔两个标签显示一个标签，以此类推

## 饼图

设置饼图位置

```json
{
  "series": [
    {
      "type": "pie",
      "center": ["50%", "45%"]
    }
  ]
}
```

环形饼图

## 动态调整位置大小

监听窗口大小变化，根据窗口大小调整图表的大小。echarts 有一个 resize 方法，可以让图表重新渲染。有些关键配置，如饼图中心点、半径、图例位置等，可以通过变量来动态调整。

```js
window.addEventListener('resize', setPieSize);

function setPieSize() {
  const widthScreen = document.body.clientWidth;
  if (widthScreen > 1680) {
    legendLeft = '52%';
    pieRadius = ['40%', '60%'];
    pieCenter = ['30%', '50%'];
  } else {
    legendLeft = '35%';
    pieRadius = ['20%', '30%'];
    pieCenter = ['20%', '50%'];
  }
  chart1 && chart1.resize();
  chart2 && chart2.resize();
}
```

## 自定义颜色

https://echarts.apache.org/zh/option.html#color

```js
const option = {
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
};
```

## 图例

- [设置图例的形状](https://echarts.apache.org/zh/option.html#legend.icon)
- 图例的宽高：`itemWidth: 10, itemHeight: 10`
