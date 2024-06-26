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
};
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
import child from './child'; //引入child组件
export default {
  data() {
    return {
      parentMsg: 'a message from parent' //在data中定义需要传入的值
    };
  },
  components: {
    child
  }
};
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
import Vue from 'vue';
const bus = new Vue();
export default bus;
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

## $attrs、$listeners

假设有组件 A、B、C，组件 A 是 B 的父组件，B 是 C 的父组件，要想使 A、B 组件通信可以使用`$attrs、$listeners`

A 组件：

```vue
<template>
  <A>
    <B :msg="msg" :info="info" />
  </A>
</template>
<script>
export default {
  data() {
    return {
      msg: '我是a组件',
      info: 'hello'
    };
  },
  methods: {
    say(e) {
      this.msg = e;
    }
  }
};
</script>
```

B 组件：

```vue
<template>
  <B>
    <C v-bind="$attrs" v-on="$listeners" />
  </B>
</template>
<script>
export default {
  props: { info: String },
  data() {
    return {
      msg: '我是b组件'
    };
  },
  methods: {
    say(e) {
      this.msg = e;
    }
  }
};
</script>
```

`v-bind="$attrs"`可以继续向下传输，只会输出不在 `props` 中传递的属性

C 组件：

```vue
<template>
  <C>
    <div>{{ world }}</div>
  </C>
</template>
<script>
export default {
  props: { info: String },
  data() {
    return {
      world: 'nice'
    };
  },
  watch: {
    '$attrs.msg'(v) {
      this.world = v;
    }
  },
  methods: {
    hi(e) {
      this.$listeners.say();
    }
  }
};
</script>
```

B 组件就是中间桥梁，在 C 组件中可以通过`this.$listeners`调用 A 组件的方法，
此处，`this.$attrs`可以获取 msg 数据，也可以在`watch`中监听

## $props、$attrs

通过 `v-bind="$props"`和`v-bind="$attrs"` 实现属性透传

在写嵌套组件时，比如 A 的子组件是 B，B 的子组件是 C，A 传递 props 给 B，B 再传递给 C。如果写一大串要传递的属性很繁琐，可以使用`v-bind="$props"`

```vue
<!-- a组件 -->
<template>
  <div>
    <B :p1="p1" :p2="p2" :p3="p3" />
  </div>
</template>

<!-- b组件 -->
<template>
  <div>
    <!-- <C p1="p1" p2="p2" p3="p3" /> -->
    <C v-bind="$props" />
  </div>
</template>
```

有时要基于第三方组件封装组件，如基于 element-ui 的输入框封装组件，el-input 有自己的属性，如 placeholder 等。如果想在父组件中修改 el-input 的属性，可能会一个个的传参，然后在子组件通过 props 接收，如下：

::: code-group

```vue [zInput.vue]
<template>
  <el-input :placeholder="placeholder" />
</template>

<script>
export default {
  props: {
    placeholder: { type: String, default: '' }
  }
};
</script>
```

```vue [App.vue]
<zInput placeholder="请输入" />
```

:::

如果属性太多通过 props 接收太繁琐，甚至可能还会遗漏一些属性，这时可以使用`v-bind="$attrs"`

注意：el-input 自身的属性不能在 props 中接收，其他的参数仍然可以

::: code-group

```vue [zInput.vue]
<template>
  <el-input v-bind="$attrs" />
  {{ msg }}
</template>

<script>
export default {
  props: {
    msg: { type: String, default: '' }
    // placeholder: { type: String, default: '' }
  },
  mounted() {
    console.info(this.$attrs); // {placeholder: '请输入'}
  }
};
</script>
```

```vue [App.vue]
<zInput placeholder="请输入" msg="111" />
```

:::
