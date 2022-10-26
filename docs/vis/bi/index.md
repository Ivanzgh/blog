# BI

引导 BI 规范化快速实现

## 快速开发流程

1. 确定适配方案
   - scale 等比例缩放
   - vw、vh，占满屏幕
2. 使用 Flex 或者 Gird 布局，先占满九宫格屏幕
3. 在每个格子里填充图表，图表要跟随格子大小变化

## 适配痛点

- 分辨率不同，不能固定写死 px 单位
- 比例不同，不同的显示器宽高比与设计稿不一致
- 不允许出现全屏滚动条

屏幕宽高比例：4:3、16:9、16:10、15:9、21:9

## scale 等比例缩放

### 定义 ScreenAdapter.vue 组件

这个组件用来包裹所有图表内容的，先定义页面整体布局

```vue
<template>
  <div class="screen-adapter">
    <div class="content-wrap" ref="appRef" :style="style">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenAdapter',
  data() {
    return {
      style: {
        width: `${this.baseWidth}px`,
        height: `${this.baseHeight}px`,
        transform: 'scale(1, 1) translate(-50%, -50%)' // 默认不缩放，垂直水平居中
      }
    }
  },
  props: {
    baseWidth: { type: Number, default: 1920 }, // 设计稿尺寸（px）
    baseHeight: { type: Number, default: 1080 }
  },
  mounted() {
    this.onResize = debounce(() => {
      this.calcRate()
    }, 500)
    this.calcRate()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style scoped lang="scss">
.screen-adapter {
  width: 100vw;
  height: 100vh;
  background-color: #061537;
  overflow: hidden;

  .content-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: left top;
    overflow: hidden;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
  }
}
</style>
```

计算缩放比例

```vue
<script>
calcRate() {
     // 默认缩放值
     const scale = { width: '1', height: '1' }

     // 需保持的比例（默认1.77778）
     const baseProportion = parseFloat((this.baseWidth / this.baseHeight).toFixed(5))

     const appRef = this.$refs['appRef']
     if (!appRef) return

     // 当前宽高比
     const w = window.innerWidth || document.body.clientWidth
     const h = window.innerHeight || document.body.clientHeight
     const currentRate = parseFloat((w / h).toFixed(5))
     if (appRef) {
       if (currentRate > baseProportion) {
         // 表示更宽
         scale.width = ((h * baseProportion) / this.baseWidth).toFixed(5)
         scale.height = (h / this.baseHeight).toFixed(5)
       } else {
         // 表示更高
         scale.height = (w / baseProportion / this.baseHeight).toFixed(5)
         scale.width = (w / this.baseWidth).toFixed(5)
       }
       appRef.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
     }
   }
</script>
```

添加防抖函数，避免在窗口尺寸变化时多次渲染，影响性能。页面销毁前要移除 resize 事件

```js
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    timer = setTimeout(
      () => {
        typeof fn === 'function' && fn.apply(null, args)
        clearTimeout(timer)
      },
      delay > 0 ? delay : 100
    )
  }
}
```

在主要组件中使用

```vue
<template>
  <screen-adapter>
    <div class="bg">
      <div class="host-body">
        <div class="content-top">xx管理系统</div>
        <div class="content-main">
          <div class="main-layout">
            <Left1 />
            <Left2 />
            <Left3 />
          </div>
          <div class="main-layout">
            <Middle1 />
            <Middle2 />
            <Middle3 />
          </div>
          <div class="main-layout">
            <Right1 />
            <Right2 />
            <Right3 />
          </div>
        </div>
      </div>
    </div>
  </screen-adapter>
</template>

<style scoped lang="scss">
.bg {
  width: 100%;
  height: 100%;
  padding: 10px 20px 10px 20px;
  background-image: url('@/assets/images/bibg.jpg');
  background-size: cover;
  background-position: center center;
  .host-body {
    height: 100%;
  }
}
.content-top {
  height: 70px;
}
.content-main {
  display: grid;
  grid-template-columns: 3fr 4fr 3fr;
  grid-column-gap: 20px;
  margin-top: 30px;
  min-height: calc(100% - 70px);

  .main-layout {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
```

## vw、vh

`vw`表示视口宽度，`vh`表示视口高度

假设屏幕分辨率是 `1920 x 1080`，宽高等分成 100 份，那么 1920px = 100vw，1080px = 100vh。当设计稿上有一个宽高为`300px x 200px`的`div`时，换算如下：

```js
vw = (300 / 1920) * 100

vh = (200 / 1080) * 100
```

### 特性

- 非等比例缩放，不会有空白
- 在与设计稿宽高比不一致的屏幕里，图表形状会被拉伸

### 思路

- 按照设计稿的尺寸，将`px`按比例计算转为`vw`和`vh`，包括字体大小
- echarts 图表里的`px`通过工具函数转换

### sass 自动换算

如果手动换算所有 px 很繁琐，可以使用 sass 的`math.div()`函数自动换算。

首先安装 sass

```sh
npm i sass sass-loader
```

在`src/style/`里新建一个`util.scss`，定义两个 vw、vh 的函数

```scss
//使用scss的math函数，https://sass-lang.com/documentation/breaking-changes/slash-div

@use 'sass:math';

//默认设计稿的宽度
$designWidth: 1920;
//默认设计稿的高度
$designHeight: 1080;

@function vw($px) {
  @return math.div($px, $designWidth) * 100vw;
}

@function vh($px) {
  @return math.div($px, $designHeight) * 100vh;
}
```

然后去`vue.config.js`配置上面的两个函数全局可用

```js
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        additionalData: `@import "~@/style/util.sass"`
      },
      scss: {
        additionalData: `@import "~@/style/util.scss";`
      }
    }
  }
})
```

在组件中使用，将设计稿的 px 尺寸直接传入 vw、vh 函数即可

```css
.content-top {
  height: vh(65);
  padding: vh(10) vw(20);
  font-size: vh(16);
}
```

### echarts 图表字体换算

在配置 echarts 时不能使用 vw、vh 函数，那么可以封装一个 js 方法转换。在`src/utils/index.js`里定义换算函数

```js
/* Echarts图表字体、间距自适应 */

export const fitChartSize = (size, defalteWidth = 1920) => {
  let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  if (!clientWidth) return size
  let scale = clientWidth / defalteWidth
  return Number((size * scale).toFixed(3))
}
```

比如要设置坐标轴轴的文字大小，如下配置即可将设计稿的 16px 字体大小换算为 vw 单位

```js
import { fitChartSize } from '@/utils'

const option = {
  axisLabel: {
    show: true,
    textStyle: { color: '#00c7ff', fontSize: fitChartSize(16) }
  }
}
```

## rem

根据屏幕宽高比例来设置 html 根元素的 `font-size` 值的大小，通常还是和 16:9 来比较
