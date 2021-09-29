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
