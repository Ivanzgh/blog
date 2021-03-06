# 组件通信

## 父向子传值

先定义一个子组件，在组件中注册 props

```vue
<template>
  <div>
    <div>{{ message }}(子组件)</div>
  </div>
</template>
<script>
export default {
  props: {
    message: String //定义传值的类型
  }
}
</script>
<style></style>
```

在父组件中，引入子组件，并传入子组件内需要的值

```vue
<template>
  <div>
    <div>父组件</div>
    <child :message="parentMsg"></child>
  </div>
</template>

<script>
import child from './child' //引入child组件
export default {
  data() {
    return {
      parentMsg: 'a message from parent' //在data中定义需要传入的值
    }
  },
  components: {
    child
  }
}
</script>
<style></style>
```

## 子向父传值

在子组件中传递信息，注册 childFn 事件

```vue
methods: { emitIndex(index) { this.$emit('childFn', index) } }
```

在父组件中，接收 childFn 事件

```vue
<child :message="parentMsg" @childFn="parentFn($event)"></child>

methods: { parentFn(event) { this.fileValue = event } }
```

:tada: :100: :rocket:

## 事件总线

event bus 可以让所有组件之间进行通信

::: warning
当项目较大时，使用事件总线不便于维护
:::

新建 bus.js

```js
import Vue from 'vue'
const bus = new Vue()
export default bus
```

在 A 组件中发送信息

```vue
import bus from './bus'; methods: { handleClick() { bus.$emit('collapse', this.isCollapse); } }
```

在 B 组件中接收信息

```vue
import bus from './bus'; mounted() { bus.$on('collapse', param => { this.isCollapse = param }) }
```

移除事件的监听，可使用`$off`

```vue
import bus from './bus'; bus.$off('collapse', {})
```

## vuex 通信

详见 vuex 部分

传递信息

```vue
methods: { login() { this.$store.commit('SET_TOKEN', access_token) } }
```

接收信息

```vue
computed: { token() { return this.$store.state.token } }
```
