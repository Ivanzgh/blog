# vue3

## 创建项目

### vite

先安装`vite`，然后按照提示操作即可

```sh
npm init vite@latest
```

### @vue/cli

首先安装或更新`@vue/cli 4.5.7`版本及以上

```sh
npm install -g @vue/cli
```

创建一个项目，名称叫 `myvue3`

```sh
vue create myvue3
```

::: warning
如果在`Windows`上使用 `Git Bash`，交互提示符并不工作。必须通过 `winpty vue.cmd create myvue3` 启动这个命令
:::

选择模板，如果搭配 `typescript`，需要选择最后一项自定义

```sh
? Please pick a preset: (Use arrow keys)
> Default ([Vue 2] babel, eslint)
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)
  Manually select features
```

选择自定义选项，箭头上下移动，按空格即可选择，最后回车

```sh
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
>(*) Choose Vue version
 (*) Babel
 (*) TypeScript
 ( ) Progressive Web App (PWA) Support
 ( ) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```

选择版本，选择`3.x`

```sh
? Choose a version of Vue.js that you want to start the project with (Use arrow
keys)
> 2.x
  3.x (Preview)
```

是否使用`class-style`这个类样式语法，选择 no

```sh
? Use class-style component syntax? (y/N)
```

是否使用`TypeScript`和`Babel`的形式编译 JSX，选择 no

```sh
? Use Babel alongside TypeScript (required for modern mode, auto-detected polyfi
lls, transpiling JSX)? (Y/n)
```

如果上面选择了`Router`，会出现下面的选项，是否使用`history`路由模式，选择 yes

```sh
? Use history mode for router? (Requires proper server setup for index fallback
in production) (Y/n)
```

选择代码规范，一般选择`ESLint + Prettier`来统一前端代码风格

```sh
? Pick a linter / formatter config:
  ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
> ESLint + Prettier
  TSLint (deprecated)
```

添加 `lint` 特性，直接回车即可

```sh
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i
> to invert selection)
>(*) Lint on save
 ( ) Lint and fix on commit
```

选择将配置写入单独的文件还是`package.json`中，我选择`package.json`，你随意

```sh
? Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
> In dedicated config files
  In package.json
```

选择是否保存配置，方便下次使用，选择 no

```sh
? Save this as a preset for future projects? (y/N)
```

然后等待依赖下载，如果同时安装了`npm`和`yarn`，还会让你选择下载工具

## 组合 API

以下所有内容都是搭配`typescript`的

vue3 新增`setup()`语法，包括两个参数`props`和`context`。定义的变量和方法等都在`setup()`里面，

### ref、reactive

二者都能定义变量

#### ref

先导入`ref`，将变量的值放入`ref()`中，如`const name = ref("");`，使用的时候变量名还要带上`.value`，最后将变量返回。
以前在`data()`中的变量都得返回，现在页面中没有使用的变量可以不用返回了

```vue
<template>
  <button v-for="(item, index) in user" :key="index" @click="clickName(index)">{{ index }} : {{ item }}</button>
  <h1>{{ name }}</h1>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const user = ref(['tom', 'jack', 'ivan'])
    const name = ref('')
    const clickName = (index: number) => {
      name.value = user.value[index]
    }

    return {
      user,
      name,
      clickName
    }
  }
})
</script>
```

#### reactive

使用`reactive()`声明的变量使用时可以不带上`.value`，接收一个对象，最后只需返回一个变量即可。但是在模板中使用时还得以对象的形式使用
比如返回一个 data 变量，使用时`data.name`，这时可以用`toRefs()`将其转换成`ref`，然后在模板中就能直接使用变量`name`了

```vue
<template>
  <button v-for="(item, index) in list" :key="index" @click="btnFun(index)">{{ index }} : {{ item }}</button>
  <h1>{{ listName }}</h1>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

interface DataProps {
  list: string[]
  listName: string
  btnFun: (index: number) => void
}

export default defineComponent({
  name: 'App',
  setup() {
    const data: DataProps = reactive({
      list: ['first', 'second', 'third'],
      listName: '',
      btnFun: (index: number) => {
        data.listName = data.list[index]
      }
    })

    return { ...toRefs(data) }
  }
})
</script>
```

## 生命周期

`setup()`开始创建组件之前，在`beforeCreate()`和`created()`之前执行

```vue
<template>
  <h1>vue</h1>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onRenderTriggered,
  onRenderTracked,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    console.log('开始创建组件')

    onBeforeMount(() => {
      console.log('挂载前')
    })

    onMounted(() => {
      console.log('完成挂载')
    })

    onBeforeUpdate(() => {
      console.log('更新前')
    })

    onUpdated(() => {
      console.log('完成更新')
    })

    onRenderTriggered((event) => {
      console.log('状态触发')
    })

    onRenderTracked((event) => {
      console.log('状态跟踪')
    })

    onBeforeUnmount(() => {
      console.log('卸载之前')
    })

    onUnmounted(() => {
      console.log('卸载完成')
    })
  }
})
</script>
```

有趣的是在`setup()`函数之后可以继续编写 Vue2 的生命周期函数，即 Vue2 的生命周期函数还是可用的，但是别混用

vue2 和 vue3 生命周期对比：

```sh
beforeCreate  -> setup()
created       -> setup()
beforeMount   -> onBeforeMount
mounted       -> onMounted
beforeUpdate  -> onBeforeUpdate
updated       -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed     -> onUnmounted
activated     -> onActivated
deactivated   -> onDeactivated
errorCaptured -> onErrorCaptured
```

## watch 监听

先导入`watch`，第一个参数是要监听的变量，第二个是回调函数。如果要监听多个变量，那么第一个参数传入数组

```vue
<template>
  <h1>{{ name }}</h1>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const name = ref('hello')

    watch(overText, (newVal, oldVal) => {
      console.log(newVal)
    })

    return { name }
  }
})
</script>
```

## 计算属性

`computed()`

```vue
<template>
  <div class="hello">
    <button v-for="(item, index) in list" :key="index">{{ index }} : {{ item }}</button>
    <p>{{ count }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'

interface DataProps {
  list: string[]
}

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const data: DataProps = reactive({
      list: ['first', 'second', 'third']
    })

    const count = computed(() => data.list.length)

    return { ...toRefs(data), count }
  }
})
</script>
```

## hooks

在 `src` 目录下新建 `hooks` 文件夹，建立一个`useMousePosition.ts`文件，功能是获取鼠标位置，hooks 命名建议以`use`开头

```ts
import { ref, onMounted, onUnmounted } from 'vue'

export default function mousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(e: any) {
    x.value = e.pageX
    y.value = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
```

然后在使用它的组件中导入，最后`return`返回，即可在模板中使用

```vue
<template>
  <h1>鼠标位置：{{ x }} - {{ y }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import mousePosition from '@/hooks/useMousePosition'

export default defineComponent({
  name: 'App',
  setup() {
    const { x, y } = mousePosition()

    return { x, y }
  }
})
</script>
```

## 填坑记录

### vue-router

#### 404 错误

2020/2/3

匹配 404 路由时，以前是`path: "*"`，现在是`path: "/:catchAll(.*)"`，否则报下面的错误

```sh
Catch all routes ("*") must now be defined using a param with a custom regexp.
```

更正：

```sh
  {
    path: "/404",
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ "@/views/404.vue"),
  },
  { path: "/:catchAll(.*)", redirect: "/404" }
```
