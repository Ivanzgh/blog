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
        this.ecs_id = this.id;
      }
    }
  }
};
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
  <wangEditor ref="editor" v-model="editorContent" :isClear="isClear" @change="getEditor"></wangEditor>
</template>
<script>
import wangEditor from '@/components/editor/wangeditor';
export default {
  components: { wangEditor },
  data() {
    return {
      visible: false,
      editorContent: null,
      isClear: false
    };
  },
  methods: {
    // 获取富文本内容
    getEditor(val) {
      this.editorContent = val;
    },
    showModal() {
      this.visible = true;
      // 打开对话框时都要清空富文本内容
      this.$nextTick(() => {
        setTimeout(() => {
          this.editorContent = '';
          this.$refs.editor.setHtml(this.editorContent);
        });
      });
    }
  }
};
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
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

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
    };
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  }
};
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
    };
  },
  watch: {
    showWeatherMark(v) {
      if (v) {
        this.visible = true;
      }
    }
  },
  methods: {
    cancelShow() {
      this.$emit('changeWeatherMark');
    }
  }
};
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
    <weather-site :showWeatherMark="showWeatherMark" @changeWeatherMark="changeWeatherMark"></weather-site>
  </div>
</template>

<script>
import WeatherSite from './weatherSite';

export default {
  props: { showWeatherMark: Boolean },
  components: { WeatherSite },
  data() {
    return {
      showWeatherMark: false
    };
  },
  methods: {
    showWeather() {
      this.showWeatherMark = true;
    },
    changeWeatherMark() {
      this.showWeatherMark = false;
    }
  }
};
</script>
```

## g2plot

如果在弹窗中可能会出现 dom 没生成就渲染图表，导致报错，可以使用`nextTick`，再加一个定时器

```vue
<template>
  <div style="height:200px" id="container"></div>
</template>
<script>
import { Line } from '@antv/g2plot';
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
        });
        line.render();
      }, 500);
    });
  }
};
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

### 更改系统 title

在`public/index.html`中出现`htmlWebpackPlugin.options.title`，默认系统 title 显示的是项目名称。如果想更改 title，
除了直接改`<title>名称</title>`，也可以更改`vue.config.js`配置`webpack`

```js
const CONFIG = require('./src/config');

module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = CONFIG.title;
      return args;
    });
  }
};
```

## 使用其他字体

在项目的`assets`文件夹下新建`fonts`文件夹，将字体文件放在这里，新建`font.css`

```css
@font-face {
  font-family: 'SourceHanSans'; /* 字体名称 */
  src: url('./SourceHanSansCN-Normal.otf'); /* 字体路径 */
  font-weight: normal;
  font-style: normal;
}
```

然后在`main.js`里引入`import './assets/fonts/font.css'`，如果要全局用就在`App.vue`里引入

```css
#app {
  font-family: SourceHanSans;
}
```

## 国际化

当前主流方案采用 vue-i18n

简化版：将需要翻译的内容放到一个数据源里，切换语言时改变默认语言，传入 key 值返回内容，如下例子

```vue
<template>
  <button @click="changeLanguage('zh')">中文</button>
  <button @click="changeLanguage('en')">英文</button>
  <h1>{{ t('msg') }}</h1>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const locale = {
  zh: {
    msg: '你好世界'
  },
  en: {
    msg: 'hello world'
  }
};
const defaultLocale = ref('zh');
const changeLanguage = (type: string) => {
  defaultLocale.value = type;
};
const t = (key: string) => {
  return locale[defaultLocale.value][key];
};
</script>
```

## 树形组件封装

下拉显示树形结构，可搜索

使用：

```vue
<template>
  <organize-tree v-model="data" :options="orgOptions"></organize-tree>
</template>

<script>
import OrganizeTree from '@/components/OrganizeTree.vue';

export default {
  name: 'Tree',
  components: { OrganizeTree },
  data() {
    return {
      data: [],
      orgOptions: [] // 树形数据源
    };
  }
};
</script>
```

封装

```vue
<template>
  <div class="root">
    <el-select
      v-model="selectShowLabel"
      :clearable="clearable"
      :placeholder="placeholder"
      multiple
      :collapse-tags="collapseTags"
      @clear="clear"
      @remove-tag="removeTag"
    >
      <el-option disabled :style="'margin:5px'" value="">
        <el-input
          v-model="filterText"
          size="small"
          prefix-icon="el-icon-search"
          clearable
          placeholder="输入关键字进行查找"
        />
      </el-option>
      <el-tree
        ref="tree"
        :data="options"
        show-checkbox
        :node-key="defaultProps.value"
        :props="defaultProps"
        :default-expand-all="expandAll"
        :filter-node-method="filterNode"
        @check-change="checkChange"
      />
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'OrganizeTree',
  model: {
    prop: 'checkedArray', // 把父组件传过来的值重命名为checkedArray
    event: 'changeChecked' // 把父组件传过来的方法重命名为changeChecked 其实就是 input
  },
  props: {
    // 选中节点的值
    checkedArray: { type: Array, default: () => [] },
    // 树数据
    options: { type: Array, required: true },
    // 设置指定的label,value,children
    nodeConfig: {
      type: Object,
      default: () => {
        return { label: 'label', value: 'id', children: 'children' };
      }
    },
    // 是否展开所有节点
    expandAll: { type: Boolean, default: false },
    // 下拉框tag是否折叠
    collapseTags: { type: Boolean, default: true },
    // 开启下拉框一键清空
    clearable: { type: Boolean, default: true },
    placeholder: { type: String, default: '请选择' }
  },
  data() {
    return {
      timer: null,
      selectShowLabel: '', // 用于下拉列表展示
      filterText: '' // 筛选输入框绑定值
    };
  },
  computed: {
    defaultProps() {
      return Object.assign({ label: 'label', value: 'id', children: 'children' }, this.nodeConfig);
    }
  },
  watch: {
    // 设置回显
    checkedArray: {
      handler(val) {
        if (val && val.length > 0) {
          this.setCheckedNodes(val);
        }
      },
      // 监听第一次数据更改
      immediate: true
    },
    // 筛选符合条件选项
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  destory() {
    clearTimeout(this.timer);
  },
  methods: {
    // 清空树选择的内容
    clear() {
      this.$refs.tree.setCheckedKeys([]);
    },
    // select移除选中标签
    removeTag(label) {
      // 选中项的value
      const selectedValueArray = this.getCheckedNodes()
        .filter((o) => o[this.defaultProps.label] !== label)
        .map((o) => o[this.defaultProps.value]);
      // 移除的节点
      const removeNode = this.$refs.tree.getCheckedNodes(true).filter((o) => o[this.defaultProps.label] === label);
      // 更新树选中节点
      removeNode.forEach((o) => {
        this.$refs.tree.setChecked(o, false, true);
      });
      // 更新父组件绑定值
      this.$emit('changeChecked', selectedValueArray);
    },
    // 树节点过滤方法
    filterNode(value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    // 获取选中节点
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes(true).map((node) => ({
        [this.defaultProps.label]: node[this.defaultProps.label],
        [this.defaultProps.value]: node[this.defaultProps.value]
      }));
    },
    // 设置选中节点
    async setCheckedNodes(selectedArray) {
      if (!selectedArray || selectedArray.length === 0) {
        this.clear();
        return;
      }

      // 第一次回显dom可能未加载导致setCheckedKeys报错
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(selectedArray);
        this.timer = setTimeout(() => {
          this.checkChange();
        }, 500);
      });
    },
    // 节点选中状态更改
    checkChange() {
      // 获取选中的node节点
      const selectedArray = this.getCheckedNodes();
      // 设置select展示的label
      this.selectShowLabel = selectedArray.map((node) => node[this.defaultProps.label]);
      // 更新model绑定值
      const selectValueArray = selectedArray.map((node) => node[this.defaultProps.value]);
      this.$emit('changeChecked', selectValueArray);
    }
  }
};
</script>
```

## 下拉框单选多选

使用：

```
<project-search v-model="data" :options="projectSearchOptions" @change="selectChange" />
```

```vue
<template>
  <div>
    <el-select
      v-model="childSelectedValue"
      :style="{ width }"
      :multiple="multiple"
      :collapse-tags="collapseTags"
      v-bind="attrs"
      v-on="$listeners"
    >
      <el-checkbox v-if="multiple" v-model="selectChecked" class="all-checkbox" @change="selectAll">全选</el-checkbox>
      <el-option v-for="(item, index) in options" :key="index" :label="item[labelKey]" :value="item[valueKey]" />
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'ProjectSearch',
  props: {
    value: { type: [String, Number, Array] },
    multiple: { type: Boolean, default: false }, // 是否多选
    collapseTags: { type: Boolean, default: false }, // 选中的标签是否折叠
    width: { type: String, default: '100%' }, // 选择框宽度
    labelKey: { type: String, default: 'label' }, // 显示项的名称
    valueKey: { type: String, default: 'value' }, // 显示项的结果
    options: { type: Array, default: () => [] } // 数据
  },
  computed: {
    childSelectedValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    attrs() {
      return {
        // 'popper-append-to-body': false,
        clearable: true,
        filterable: true,
        ...this.$attrs
      };
    },
    selectChecked: {
      get() {
        return this.childSelectedValue?.length === this.options?.length;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  watch: {
    childSelectedValue(val) {
      this.childSelectedValue = val;
    }
  },
  methods: {
    // 点击全选
    selectAll(val) {
      const options = JSON.parse(JSON.stringify(this.options));
      if (val) {
        this.childSelectedValue = options.map((item) => {
          return item[this.valueKey];
        });
      } else {
        this.childSelectedValue = null;
      }
    }
  }
};
</script>
<style lang="scss">
.el-select-dropdown {
  .all-checkbox {
    margin-left: 20px;
  }
}
</style>
```

## el-tooltip

文字超出显示省略号和提示，没超出时不显示

```html
<el-tooltip effect="light" :content="item.name" placement="right" :disabled="isShowTooltip">
  <span @mouseover="mouseOver($event)">{{ item.name }}</span>
</el-tooltip>
```

```js
isShowTooltip: false

mouseOver(event) {
  this.isShowTooltip = event.target.scrollWidth <= event.target.clientWidth
}
```
