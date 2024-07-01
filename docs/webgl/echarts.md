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

设置柱状图顶部是圆角：

```js
const option = {
  series: [
    {
      data: data,
      type: 'bar',
      barWidth: '10',
      itemStyle: {
        color: '#3F8CFF',
        borderRadius: [20, 20, 0, 0] // 设置圆角
      }
    }
  ]
};
```

### 横向柱状图，类似进度条

```jsx
const initPie = (pieData: any) => {
  if (!pieRef.current) return;
  const pieInstance = echarts.init(pieRef.current);
  let charts = {
    name: pieData.map((e: any) => e.name),
    valueData: pieData.map((e: any) => e.value)
  };
  let pData = charts.valueData;
  let color = ['#3F8CFF', '#FFD023', '#43D1A2', '#A5D63F', '#00BAAD'];

  let lineY = [];
  let lineT = [];
  for (let i = 0; i < charts.name.length; i++) {
    let x = i;
    if (x > 1) {
      x = 2;
    }
    let data = {
      name: charts.name[i],
      color: color[x],
      value: pData[i],
      barGap: '-100%',
      itemStyle: {
        normal: {
          show: true,
          color: color[x],
          barBorderRadius: 10
        },
        emphasis: {
          shadowBlur: 15,
          shadowColor: 'rgba(0, 0, 0, 0.1)'
        }
      }
    };
    let data1 = {
      value: pData[2],
      itemStyle: {
        color: '#F5F5F5',
        barBorderRadius: 10
      }
    };
    lineY.push(data);
    lineT.push(data1);
  }

  const option = {
    title: {
      show: false
    },
    grid: {
      borderWidth: 0,
      top: '5%',
      left: '5%',
      right: '10%',
      bottom: '0'
    },
    color: color,
    yAxis: [
      {
        type: 'category',
        inverse: true,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false,
          inside: false
        },
        data: charts.name
      },
      {
        type: 'category',
        inverse: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          inside: false,
          verticalAlign: 'bottom',
          lineHeight: '1',
          textStyle: {
            color: '#b3ccf8',
            fontSize: '14'
          }
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        },
        data: charts.valueData
      }
    ],
    xAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      }
    },
    series: [
      {
        name: 'total',
        type: 'bar',
        zlevel: 1,
        barGap: '-100%',
        barWidth: '10px',
        data: lineT,
        legendHoverLink: false
      },
      {
        name: 'bar',
        type: 'bar',
        zlevel: 2,
        barWidth: '10px',
        data: lineY,
        label: {
          normal: {
            color: '#b3ccf8',
            show: true,
            position: [0, '-18px'],
            textStyle: {
              fontSize: 16
            },
            formatter: function (a: any) {
              return `{color4|${a.name}}`;
            },
            rich: {
              color4: {
                color: '#111827'
              }
            }
          }
        }
      }
    ]
  };

  pieInstance.setOption(option);
  return pieInstance;
};
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
      },
      formatter: function (value: any) {
        if (value.length > 5) {
          return `${value.slice(0, 5)}...`;
        }
        return value;
      }
    },
    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  }
};
```

- interval 设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，如果值为 2，表示隔两个标签显示一个标签，以此类推。
- 如果需要设置文字超出显示省略号，可以设置 formatter
- 倾斜角度可以根据数据项来设置，比如数据长度超过 5 就倾斜：`rotate: data.length > 5 ? 30 : 0`

### 设置折线颜色

线堆叠

```js
const option = {
  series: [
    {
      name: 'apple',
      type: 'line',
      stack: 'Total',
      data: data.currentYear,
      lineStyle: {
        normal: {
          color: '#9BFB94' // 设置线的颜色
        }
      },
      itemStyle: {
        normal: {
          color: '#9BFB94' // 设置线上点的颜色、图例的颜色
        }
      },
      areaStyle: {
        // 设置线条下面区域的渐变色
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'red' },
            { offset: 1, color: 'orange' }
          ],
          global: false
        }
      }
    },
    {
      name: 'orange',
      type: 'line',
      stack: 'Total',
      data: data.lastYear,
      lineStyle: {
        normal: {
          color: '#5781FC'
        }
      },
      itemStyle: {
        normal: {
          color: '#5781FC'
        }
      }
    }
  ]
};
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

文字居中

```js
const option = {
  // 设置饼图分段颜色
  color: ['#FF8D1A', '#8479FF', '#F1645B', '#4992FF'],
  title: {
    text: [`{num|${sum}}{unit|万元}`, `{name|${subtext}}`].join('\n'),
    textAlign: 'center',
    top: 'center',
    left: '25%',
    textStyle: {
      fontWeight: 'normal',
      align: 'center',
      rich: {
        num: {
          color: '#000',
          fontSize: 18,
          lineHeight: 40
        },
        unit: {
          color: '#6E6E6E',
          fontSize: 10
        },
        name: {
          color: '#6E6E6E',
          fontSize: 10,
          fontWeight: 'normal',
          align: 'center'
        }
      }
    }
  },
  legend: {
    orient: 'vertical',
    top: 'center',
    left: '50%',
    icon: 'circle',
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 20,
    textStyle: {
      align: 'left',
      verticalAlign: 'middle',
      rich: {
        name: {
          color: 'rgba(138, 138, 138, 1)',
          fontSize: 10
        },
        value: {
          color: 'rgba(138, 138, 138, 1)',
          fontSize: 10
        }
      }
    },
    data: ['图例1', '图例2', '图例3', '图例4'],
    formatter: (name) => {
      if (data.length) {
        const item = data.filter((item) => item.name === name)[0];
        return `{name|${name}: }{value|${item.value}万元}`;
      }
    }
  },
  series: [
    {
      type: 'pie',
      radius: ['55%', '70%'],
      center: ['25%', '50%'],
      data: data,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          position: 'inner',
          show: false
        }
      }
    }
  ]
};
```

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
- 图例的间距：`itemGap: 10`

## 水球图

需要安装插件：<https://github.com/ecomfe/echarts-liquidfill>

```js
const data = 66;
const fillData = [data / 100, data / 100]; // 水球波纹值，小数

const option = {
  xAxis: {
    show: false
  },
  yAxis: {
    show: false
  },
  grid: {
    top: '2.5%',
    right: '40',
    bottom: '2.5%',
    left: 0
  },
  title: {
    text: `${data}{a|%}`,
    textStyle: {
      fontSize: 30,
      color: '#fff',
      rich: {
        a: {
          fontSize: 18
        }
      }
    },
    x: 'center',
    y: 'center'
  },
  graphic: [
    {
      type: 'group',
      left: 'center',
      top: '60%'
    }
  ],
  series: [
    {
      type: 'liquidFill',
      radius: '70%',
      center: ['50%', '50%'],
      data: fillData,

      outline: {
        show: true,
        borderDistance: 8,
        itemStyle: {
          borderWidth: 5,
          borderColor: '#08B5F7',
          shadowBlur: 10,
          shadowColor: '#08B5F7'
        }
      },
      color: ['#08B5F7', '#4FCBFA50'],
      backgroundStyle: {
        borderWidth: 0,
        borderColor: '#ffffff00',
        color: '#ffffff00'
      },
      label: {
        normal: {
          formatter: ''
        }
      }
    }
  ]
};
```
