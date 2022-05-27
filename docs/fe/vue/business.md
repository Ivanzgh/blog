# 业务

## 复用组件

进入详情页，使用`props`将组件和路由解耦：加上 `props: true`

```js
{
    path: '/admin/ecs/:id',
    name: 'ecs_detail',
    meta: {activeMenu: '/admin/ecs'},
    component: () => import('@/admin/ecs/detailPage'),
    props: true
}
```

组件中使用：

```js
export default {
  props: ['id'],
  methods: {
    getId() {
      if (this.id) {
        this.ecs_id = this.id
      }
    }
  }
}
```

还有一种方式可获取路由参数 `this.$route.params.id`

### 如果不同路由使用同一个组件需要重新加载这个组件

组件复用时，虽然路由变化了，但是组件并没有被销毁，此时生命周期函数不会被调用，所以视图是不会更新的。

```js
{
    path: '/admin/es',
    meta: {appId: 'app-WnVLDZGgQ0Mr'},
    component: () => import('@/components/AppDeploy')
},
{
    path: '/admin/oss',
    meta: {appId: 'app-RErkpzXGl4mZ'},
    component: () => import('@/components/AppDeploy')
}
```

方法一、监听`$route`的变化来初始化数据

```js
watch: {
    $route(to) {
        if (to.meta.appId) {
            this.app_id = to.meta.appId
            this.getAppInfo()
        }
    }
}
```

方法二、给`router-view`添加一个唯一的`key`，可直接设置为路由的完整路径

```html
<router-view :key="$route.fullPath"></router-view>
```

只要 url 变化了，就一定会重新创建这个组件。

## wangEditor 富文本

组件封装

```js
<template>
  <div>
    <div id="editorElem"></div>
  </div>
</template>

<script>
import E from 'wangeditor'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,
      editorData: ''
    }
  },
  watch: {
    isClear(val) {
      if (val) {
        this.editor.txt.clear()
        this.editorData = null
      }
    }
  },
  methods: {
    getHtml() {
      return this.editor.txt.html()
    },

    setHtml(val) {
      this.editor.txt.html(val)
    },

    getText() {
      this.editor.txt.text()
    },

    clearVal() {
      this.editor.txt.clear()
      this.editorData = null
    },

    initEditor() {
      const editor = new E('#editorElem')

      editor.config.uploadImgShowBase64 = true // 使用base64保存图片  上下两者不可同用
      // this.editor.config.uploadImgServer = "http://baidu.com/"; // 上传图片到服务器

      editor.config.uploadImgMaxSize = 2 * 1024 * 1024

      /**
      // 配置菜单 可根据文档进行添加
      this.editor.config.menus = [
        // 'head', // 标题
        // 'bold', // 粗体
        "fontSize", // 字号
        // 'fontName', // 字体
        // 'italic', // 斜体
        "underline", // 下划线
        // 'strikeThrough', // 删除线
        "foreColor", // 文字颜色
        "backColor", // 背景颜色
        // 'link', // 插入链接
        "list", // 列表
        "justify", // 对齐方式
        "image", // 插入图片
        // 'quote', // 引用
        "emoticon" // 表情
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        // 'undo', // 撤销
        // 'redo', // 重复
        // 'fullscreen' // 全屏
      ];
      */
      // 配置 onchange 回调函数，将数据同步到 vue 中
      editor.config.onchange = newHtml => {
        this.editorData = newHtml
        this.$emit('change', this.editorData)
      }

      editor.create()
      this.editor = editor

      // this.$nextTick(() => {

      // });
    }
  },
  mounted() {
    this.initEditor()
  },
  beforeDestroy() {
    this.editor.destroy()
    this.editor = null
  }
}
</script>

<style scoped lang="less"></style>

```

使用

```vue
<template>
  <a-button type="primary" icon="plus" @click="showModal">问题反馈</a-button>
  <wangEditor
    ref="editor"
    v-model="editorContent"
    :isClear="isClear"
    @change="getEditor"
  ></wangEditor>
</template>
<script>
import wangEditor from '@/components/editor/wangeditor'
export default {
  components: { wangEditor },
  data() {
    return {
      visible: false,
      editorContent: null,
      isClear: false
    }
  },
  methods: {
    // 获取富文本内容
    getEditor(val) {
      this.editorContent = val
    },
    showModal() {
      this.visible = true
      // 打开对话框时都要清空富文本内容
      this.$nextTick(() => {
        setTimeout(() => {
          this.editorContent = ''
          this.$refs.editor.setHtml(this.editorContent)
        })
      })
    }
  }
}
</script>
```

## 轮播缩略图

安装指定版本

```sh
npm install swiper@5.3.6 vue-awesome-swiper@4.1.0
```

```vue
<template>
  <div class="carousel">
    <swiper class="swiper gallery-top" :options="swiperOptionTop" ref="swiperTop">
      <swiper-slide v-for="(e, i) in imglist" :key="i">
        <img :src="e.url" alt="img" />
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <swiper class="swiper gallery-thumbs" :options="swiperOptionThumbs" ref="swiperThumbs">
      <swiper-slide v-for="(e, i) in imglist" :key="i">
        <img :src="e.url" alt="img" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  props: {},
  components: { Swiper, SwiperSlide },
  data() {
    return {
      imglist: [
        { id: 0, url: require('@/assets/sw/nature-1.jpg') },
        { id: 1, url: require('@/assets/sw/nature-2.jpg') },
        { id: 2, url: require('@/assets/sw/nature-3.jpg') },
        { id: 3, url: require('@/assets/sw/nature-4.jpg') },
        { id: 4, url: require('@/assets/sw/nature-5.jpg') },
        { id: 5, url: require('@/assets/sw/nature-6.jpg') },
        { id: 6, url: require('@/assets/sw/nature-7.jpg') },
        { id: 7, url: require('@/assets/sw/nature-8.jpg') },
        { id: 8, url: require('@/assets/sw/nature-9.jpg') },
        { id: 9, url: require('@/assets/sw/nature-10.jpg') }
      ],
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides 上下数量要一样
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5,
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper
      const swiperThumbs = this.$refs.swiperThumbs.$swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    })
  }
}
</script>

<style scoped lang="less">
.carousel {
  width: 455px;
  height: 323px;
  img {
    width: 100%;
    height: 100%;
  }

  .swiper {
    .swiper-slide {
      background-size: cover;
      background-position: center;
    }
    &.gallery-top {
      height: 80%;
      width: 100%;
    }
    &.gallery-thumbs {
      height: 20%;
      box-sizing: border-box;
      padding: 10px 0;
    }
    &.gallery-thumbs .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.4;
    }
    &.gallery-thumbs .swiper-slide-active {
      opacity: 1;
    }
  }
}
</style>
```

## layer 使用方法

LayerVue：<http://layer-vue.cn/#/doc>，web 弹层窗口

子组件：

```vue
<template>
  <div>
    <LayerVue
      :destroyOnClose="true"
      :visible.sync="visible"
      title="海星湾气象站"
      :area="['430px', '530px']"
      :offset="['100px', '84px']"
      @cancel="cancelShow"
    >
      <div class="layer16">content</div>
    </LayerVue>
  </div>
</template>

<script>
export default {
  props: { showWeatherMark: Boolean },
  data() {
    return {
      visible: false
    }
  },
  watch: {
    showWeatherMark(v) {
      if (v) {
        this.visible = true
      }
    }
  },
  methods: {
    cancelShow() {
      this.$emit('changeWeatherMark')
    }
  }
}
</script>

<style scoped lang="less">
.layer16 {
  padding: 16px;
}
</style>
```

父组件：

```vue
<template>
  <div>
    <a-button type="primary" @click="showWeather">气象站点</a-button>
    <weather-site
      :showWeatherMark="showWeatherMark"
      @changeWeatherMark="changeWeatherMark"
    ></weather-site>
  </div>
</template>

<script>
import WeatherSite from './weatherSite'

export default {
  props: { showWeatherMark: Boolean },
  components: { WeatherSite },
  data() {
    return {
      showWeatherMark: false
    }
  },
  methods: {
    showWeather() {
      this.showWeatherMark = true
    },
    changeWeatherMark() {
      this.showWeatherMark = false
    }
  }
}
</script>
```

## g2plot

如果在弹窗中可能会出现 dom 没生成就渲染图表，导致报错，可以使用`nextTick`，再加一个定时器

```vue
<template>
  <div style="height:200px" id="container"></div>
</template>
<script>
import { Line } from '@antv/g2plot'
export default {
  drawCanview() {
    this.$nextTick(() => {
      setTimeout(() => {
        const line = new Line('container', {
          data: lineData,
          padding: 'auto',
          xField: 'Date',
          yField: 'scales',
          smooth: true
        })
        line.render()
      }, 500)
    })
  }
}
</script>
```

## 过渡动画

```html
<transition name="chat">
  <p v-if="show">hello</p>
</transition>
```

```css
/* 进入前和结束后的状态 */
.chat-enter,
.chat-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
/* 进入和离开的动画时间段 */
.chat-enter-active,
.chat-leave-active {
  transition: all 0.5s ease;
}
```

## vue-cli

### 更改系统title

在`public/index.html`中出现`htmlWebpackPlugin.options.title`，默认系统title显示的是项目名称。如果想更改title，
除了直接改`<title>名称</title>`，也可以更改`vue.config.js`配置`webpack`

```js
const CONFIG = require('./src/config')

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= CONFIG.title
        return args
      })
  }
}
```
