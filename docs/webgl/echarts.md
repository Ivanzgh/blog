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
