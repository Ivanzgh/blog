# Vue2

## 版本历史

Vue2 的最后一个版本是 2.7.16

2.7 系列的版本包含了对 Vue 3 的一些特性的兼容性改进，同时也保持了与 Vue 2 生态系统的兼容性。

2.6.14 是 Vue2 最后一个用 JS 写的版本。

工具库与 Vue2 的兼容性：

- Vue CLI：应使用 4.4.6 或更低版本的 @vue/cli
- Vuex：应使用 Vuex 3.x，https://v3.vuex.vuejs.org/zh/
- Vue Router：通常是 3.x 系列，https://v3.router.vuejs.org/zh/

## 单页面应用和多页面应用的优缺点

### 单页应用 SPA

- 优点：页面切换快
  页面每次切换跳转时，页面局部刷新，JS、CSS 等公共资源仅加载一次
- 缺点：
  - 首屏时间慢
    首屏时需要请求 HTML，要加载公共资源
  - SEO 效果差
    搜索引擎只认识 HTML 里的内容，不认识 JS 的内容，而单页应用的内容都是靠 JS 渲染生成出来的，搜索引擎不识别这部分内容

### 多页应用 MPA

- 优点：

  - 首屏时间快
    访问页面的时候，发送一个 HTTP 请求返回一个 HTML，页面就会展示出来
  - SEO 效果好
    搜索引擎通过识别 HTML 内容来给网页排名

- 缺点：页面切换慢
  多页面跳转需要刷新所有资源

## data 为何声明为函数

因为组件可能被用来创建多个实例，若 data 声明为对象则所有的实例将共享引用同一个数据对象。

data 声明为函数则每次创建一个新实例后，调用 data 函数会返回初始数据的一个全新副本数据对象。

data 声明为对象：

```js
function VueComponent() {}
VueComponent.prototype.$options = {
  data: { name: 'Vue' }
};
let f1 = new VueComponent();
f1.$options.data.name = 'React';
let f2 = new VueComponent();
console.log(f2.$options.data.name); // React
```

data 声明为函数：

```js
function VueComponent() {}
VueComponent.prototype.$options = {
  data: () => ({ name: 'Vue' })
};
let f1 = new VueComponent();
let res = f1.$options.data();
res.name = 'React';
console.log(res); // {name: "React"}
let f2 = new VueComponent();
console.log(f2.$options.data()); // {name: "Vue"}
```

`new Vue()`可以将`data`声明为一个普通对象是因为这个类创建的实例不会被复用，只会 new 一次。
而`App.vue`同样是因为整个系统中`App.vue`只会被使用一次，所以不存在上述的问题。

## v-if 和 v-show 区别

- `v-if`是真正的条件渲染，会有性能开销，每次插入或者移除元素时都必须要生成元素内部的 DOM 树
- `v-show`则不管条件是什么都会渲染元素，基于`display:none`显示隐藏

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。
因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好

扩展：

`v-html`会将绑定的数据作为 HTML 代码插入到元素的 `inneerHTML` 中。可以动态插入 HTML，但是可能会导致 XSS 攻击。

## v-model 原理

v-model 的作用是实现表单控件的双向数据绑定，即在视图和数据模型之间同步更新。

原理：使用`Object.defineProperty()`实现响应式数据劫持，监听事件触发视图更新。

```html
<input type="text" id="input" />
<p id="output"></p>

<script>
  const input = document.getElementById('input');
  const output = document.getElementById('output');

  // 数据对象
  const data = {
    message: 'hello'
  };

  // 响应式数据劫持
  function defineReactive(obj, key) {
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;
        // 更新视图
        input.value = newValue;
        output.textContent = newValue;
      }
    });
  }

  // 初始化响应式数据
  defineReactive(data, 'message');

  // 初始化视图
  input.value = data.message;
  output.textContent = data.message;

  // 监听输入框的输入事件，更新数据对象
  input.addEventListener('input', function (e) {
    data.message = e.target.value;
  });
</script>
```

## 双向数据绑定原理

### 1、双向绑定原理

vue2 是采用**数据劫持**结合**发布者-订阅者模式**，通过`Object.defineProperty()`来劫持各个属性的`setter`、`getter`，在数据变动时发布消息给订阅者，触发响应的监听回调。

### 2、Object.defineProperty()

`Object.defineProperty()`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。

语法：

```sh
Object.defineProperty(obj, prop, descriptor)
```

参数:

- obj 要在其上定义属性的对象。
- prop 要定义或修改的属性的名称。
- descriptor 将被定义或修改的属性描述符。

返回值: 被传递给函数的对象。

MDN 地址： [Object.defineProperty()
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

### 3、如何实现

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418273.png)

`observer` 用来实现对每个组件中的 data 中定义的属性，循环用`Object.defineProperty()`实现数据劫持，以便利用其中的 setter 和 getter，然后通知订阅者，订阅者会触发它的 update 方法，对视图进行更新。

### 4、代码实现

4.1 observer 实现，主要是给每个 vue 的属性用 `Object.defineProperty()`，代码如下：

```js
function defineReactive(obj, key, val) {
  let dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      //添加订阅者watcher到主题对象Dep
      if (Dep.target) {
        // JS的浏览器单线程特性，保证这个全局变量在同一时间内，只会有同一个监听器使用
        dep.addSub(Dep.target);
      }
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      val = newVal;
      // 作为发布者发出通知
      dep.notify(); // 通知后dep会循环调用各自的update方法更新视图
    }
  });
}
function observe(obj, vm) {
  Object.keys(obj).forEach((key) => {
    defineReactive(vm, key, obj[key]);
  });
}
```

4.2 实现 compile

compile 的目的就是解析各种指令成为真正的 html

```js
function Compile(node, vm) {
  if (node) {
    this.$frag = this.nodeToFragment(node, vm);
    return this.$frag;
  }
}
Compile.prototype = {
  nodeToFragment: function (node, vm) {
    var self = this;
    var frag = document.createDocumentFragment();
    var child;
    while ((child = node.firstChild)) {
      console.log([child]);
      self.compileElement(child, vm);
      frag.append(child); // 将所有子节点添加到fragment中
    }
    return frag;
  },
  compileElement: function (node, vm) {
    var reg = /\{\{(.*)\}\}/;
    //节点类型为元素(input元素这里)
    if (node.nodeType === 1) {
      var attr = node.attributes;
      // 解析属性
      for (var i = 0; i < attr.length; i++) {
        if (attr[i].nodeName == 'v-model') {
          //遍历属性节点找到v-model的属性
          var name = attr[i].nodeValue; // 获取v-model绑定的属性名
          node.addEventListener('input', function (e) {
            // 给相应的data属性赋值，进而触发该属性的set方法
            vm[name] = e.target.value;
          });
          new Watcher(vm, node, name, 'value'); //创建新的watcher，会触发函数向对应属性的dep数组中添加订阅者，
        }
      }
    }
    //节点类型为text
    if (node.nodeType === 3) {
      if (reg.test(node.nodeValue)) {
        var name = RegExp.$1; // 获取匹配到的字符串
        name = name.trim();
        new Watcher(vm, node, name, 'nodeValue');
      }
    }
  }
};
```

4.3 watcher 实现

```js
function Watcher(vm, node, name, type) {
  Dep.target = this;
  this.name = name;
  this.node = node;
  this.vm = vm;
  this.type = type;
  this.update();
  Dep.target = null;
}

Watcher.prototype = {
  update: function () {
    this.get();
    this.node[this.type] = this.value; // 订阅者执行相应操作
  },
  // 获取data的属性值
  get: function () {
    console.log(1);
    this.value = this.vm[this.name]; //触发相应属性的get
  }
};
```

4.4 实现 Dep 来为每个属性添加订阅者

```js
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },
  notify: function () {
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};
```

### 5、总结

首先我们为每个 vue 属性用 Object.defineProperty()实现数据劫持，为每个属性分配一个订阅者集合的管理数组 dep；然后在编译的时候在该属性的数组 dep 中添加订阅者，v-model 会添加一个订阅者，`{{}}`也会，v-bind 也会，只要用到该属性的指令理论上都会，接着为 input 会添加监听事件，修改值就会为该属性赋值，触发该属性的 set 方法，在 set 方法内通知订阅者数组 dep，订阅者数组循环调用各订阅者的 update 方法更新视图。

参考文章： [vue 的双向绑定原理及实现](https://www.cnblogs.com/libin-1/p/6893712.html)

### 简易版本 Vue2 双向数据绑定

```html
<div id="app">
  订阅视图1：
  <span class="box1"></span>
  订阅视图2：
  <span class="box2"></span>
</div>

<script src="index.js"></script>
<script>
  let obj = {};
  dataRes({ data: obj, tag: 'view1', dataKey: 'one', selector: '.box1' });
  dataRes({ data: obj, tag: 'view2', dataKey: 'two', selector: '.box2' });

  obj.one = '这是视图一';
  obj.two = '这是视图二';
</script>
```

```js
// // 订阅器模型
const Dep = {
  // 容器
  container: {},
  // 添加订阅
  listen(key, fn) {
    (this.container[key] || (this.container[key] = [])).push(fn);
  },
  // 发布
  trigger() {
    let key = Array.prototype.shift.call(arguments),
      fns = this.container[key];
    if (!fns || fns.length === 0) {
      return;
    }
    for (let i = 0, len = fns.length; i < len; i++) {
      fns[i].apply(this, arguments);
    }
    // for (let i = 0, fn; (fn = fns[i++]); ) {
    //   fn.apply(this, arguments);
    // }
  }
};

// 数据劫持
const dataRes = ({ data, tag, dataKey, selector }) => {
  let value = '',
    el = document.querySelector(selector);

  Object.defineProperty(data, dataKey, {
    get() {
      return value;
    },
    set(val) {
      value = val;
      Dep.trigger(tag, val);
    }
  });

  Dep.listen(tag, (text) => {
    el.innerHTML = text;
  });
};
```

### 简易版本 Vue3 双向数据绑定

功能：通过 v-model 绑定一个值的同时，v-bind 的 dom 元素可以实现双向数据绑定。

代码如下:

```html
<div id="container">
  用户名：
  <input type="text" id="user" v-model="text" is-number />
  密码：
  <input type="password" v-model="password" />
  <h1 v-bind="text"></h1>
  <h2 v-bind="password"></h2>
</div>

<script>
  const container = [...document.querySelector('#container').children];

  let proxyObj = new Proxy(
    { text: '', password: '' },
    {
      get(target, property) {
        return target[property];
      },
      set(target, propName, propValue, receiver) {
        let isCanEdit = true;
        container.forEach((dom) => {
          if (dom.getAttribute('v-bind') === propName) {
            dom.innerHTML = propValue;
          }
          if (dom.getAttribute('v-model') === propName) {
            dom.value = propValue;
          }
        });

        target[propName] = propValue;
      }
    }
  );

  container.forEach((dom) => {
    if (dom.getAttribute('v-model') in proxyObj) {
      dom.addEventListener('input', function () {
        proxyObj[this.getAttribute('v-model')] = this.value;
      });
    }
  });
</script>
```

首先获取到所有的 dom 节点，然后使用`Proxy`代理`{text: "", password: ""}`对象。
遍历所有的 dom 节点，如果某个节点有`v-model`属性，且属性值在代理对象中，那么就监听输入框的变化，
将该节点的值（input 框内的值）赋值给代理对象对应的属性，从而实现简单的双向数据绑定

::: tip

- `v-model`和`v-bind`的属性值要相同，如都是 text 或都是 password
- `dom.addEventListener("input", function() {})`这里不能使用箭头函数，否则 this 指向 Window 对象
  :::

## 自定义组件挂载到全局

在`/components/selfComponents.js`文件中引入所需要组件

```js
import Vue from 'vue';

import Button from './Button.vue';

Vue.component('st-button', Button);
```

在 mian.js 文件中引入

```js
import '@/components/selfComponents';
```

在需要公共组件的界面使用`<st-button />`

## 插槽 slot

插槽 slot 是 vue 的**内容分发机制**，组件内部的模板引擎使用 `<slot>` 元素作为承载分发内容的出口。

- slot 是子组件的一个模板标签元素，由父组件决定是否显示、如何显示
- slot 分为三类：默认插槽、具名插槽、作用域插槽

> 在 2.6.0 中，具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。它取代了 `slot` 和 `slot-scope` 这两个目前已被废弃但未被移除的属性。

### 默认插槽

又称匿名插槽，slot 没有指定 name 属性，一个组件内只能有一个匿名插槽。

```vue
<!-- TestOne.vue -->
<template>
  <div>
    <slot></slot>
  </div>
</template>

<!-- 在别的组件使用 -->
<template>
  <div>
    <TestOne>
      <h1>可以放任意内容</h1>
    </TestOne>
  </div>
</template>
```

实际渲染：

```html
<div>
  <h1>可以放任意内容</h1>
</div>
```

slot 元素中也可以设置默认内容，如`<slot>默认内容</slot>`，当父组件不提供插槽内容时，就显示默认内容。

### 具名插槽

带有具体名字的插槽，slot 有 name 属性，一个组件内可以有多个具名插槽。

在 2.6.0 中，用法是在`<template>`元素上使用`v-slot`指令，缩写语法是 `#`

```vue
<!-- TestTwo.vue -->
<template>
  <div>
    <h1>
      <slot name="hName"></slot>
    </h1>
    <span>
      <slot name="spanName"></slot>
    </span>
  </div>
</template>

<!-- 在别的组件使用 -->
<template>
  <div>
    <TestTwo>
      <!-- <template v-slot:hName>111</template> -->
      <template #hName>111</template>
      <template #spanName>222</template>
    </TestTwo>
  </div>
</template>
```

2.6.0 以前的写法：`<template slot="header">111</template>`

### 作用域插槽

将子组件内部的数据传递给父组件，父组件根据传递过来的数据决定如何渲染插槽。

例如：子组件默认显示某个值，父组件想改变这个值，但是父组件无法访问子组件内部作用域的值。使用作用域插槽如下：

子组件 Child.vue

```vue
<template>
  <div>
    <slot :user="user">{{ user.lastName }}</slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        lastName: '张三',
        firstName: '李四'
      }
    };
  }
};
</script>
```

父组件：

```vue
<template>
  <div>
    <Child>
      <template #default="slotProps">
        {{ slotProps.user.firstName }}
      </template>
    </Child>
  </div>
</template>

<script>
import Child from './Child';
export default {
  components: { Child }
};
</script>
```

将`v-slot`简写后：`<template v-slot:default="slotProps"></template>`

1. 子组件将 user 作为 slot 元素的一个属性绑定上去
2. 父组件通过`v-slot`接收，可以自定义插槽 prop 的名字，如 slotProps

2.6.0 以前的作用域插槽的写法：

```html
<slot-example>
  <template slot-scope="slotProps">{{ slotProps.msg }}</template>
</slot-example>
```

这里的 `slot-scope` 声明了被接收的 prop 对象会作为 slotProps 变量存在于 `<template>` 作用域中。在操作表格时会经常使用，用于获取当前行的数据。

## 过滤器

自定义过滤器，用于文本格式化，放在`|`后面。

适用的地方：

- 双花括号插值：`{{ name | filterName }}`
- `v-bind`表达式：`<div v-bind:id="proId | formatId"></div>`

例如：

```vue
<template>
  <h1>{{ money | filterPrice }}</h1>
</template>

<script>
export default {
  data() {
    return {
      money: 100
    };
  },
  filters: {
    filterPrice(price) {
      return price ? '￥' + price : '-';
    }
  }
};
</script>
```

## Mixins

[文档](https://v2.cn.vuejs.org/v2/guide/mixins.html)

> 混入 (Mixins) 是一种在多个组件之间共享可复用功能的方式。

Mixins 允许把一组可复用的方法、生命周期钩子函数、数据属性和计算属性等组合到一个单独的对象中，然后在多个组件中导入并应用这个 mixin。

- 一个混入对象可以包含任意组件选项，如 data、watch、mounted、methods 等
- 当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项

示例：

::: code-group

```vue [Home.vue]
<template>
  <div>
    <h1>mixins</h1>
    <div>{{ a }}</div>
    <div>{{ count }}</div>
  </div>
</template>

<script>
import Foo from './mixins/foo';

export default {
  name: 'Home',
  mixins: [Foo],
  data() {
    return {};
  }
};
</script>
```

```js [foo.js]
export default {
  data() {
    return {
      a: 1
    };
  },
  computed: {
    count() {
      return 1 + 2 + 3;
    }
  },
  watch: {
    $route(route) {
      console.log(route);
    }
  },
  mounted() {
    this.handleClick();
  },
  methods: {
    handleClick() {
      console.log('click');
    }
  }
};
```

:::

### 选项合并规则

1、数据对象在内部会进行递归合并，并在发生冲突时**以组件数据优先**。

例如，在 mixin 中定义的 data 里的数据，如果组件中定义了同名的 data，那么组件中的 data 会覆盖 mixin 中的 data。

2、同名**钩子函数**将合并为一个数组，都将被调用。混入对象的钩子将在组件自身钩子之前调用。

3、值为对象的选项，例如 methods、components 和 directives，将被合并为同一个对象。两个对象键名冲突时，取**组件对象**的键值对。

### 优势：

1. **代码重用**：可以将通用功能抽象出来，避免代码重复，提高开发效率。
2. **模块化**：有助于组织代码结构，将特定功能独立封装，便于管理和维护。
3. **易于扩展**：当需要在多个组件中添加相同功能时，只需要修改 mixin 即可，不影响原有组件结构。

### 劣势：

1. **命名冲突**：当多个 mixins 或组件自身含有同名的数据属性或方法时，可能出现命名冲突。
2. **难以追踪**：随着项目复杂度增加，当组件依赖多个 mixins 时，源代码的可读性和调试难度可能增大，尤其是当 mixin 中的方法影响组件行为时。
3. **依赖顺序问题**：有时需要关注 mixin 间的依赖顺序，这可能导致代码维护性降低。

### 使用场景

- **共用的生命周期钩子**：例如，多个组件都需要在 `created` 或 `mounted` 中执行相同的初始化逻辑。
- **共用的方法**：某些业务逻辑方法如数据请求、数据处理、工具函数等在多个组件中都需要用到。
- **共用的状态和计算属性**：某些全局的状态和计算逻辑可以抽象到 mixin 中。

### Mixin 与组件的区别

- **组件**是独立模块，具有自己的视图模板、数据、方法、生命周期钩子等，强调的是独立和可复用的界面元素。
- **Mixin** 更侧重于功能和逻辑的复用，不涉及视图渲染，它可以注入到组件中，增强组件的功能，但不改变组件的基本结构。

## 自定义指令

[文档](https://v2.cn.vuejs.org/v2/guide/custom-directive.html)

Vue 除了内置的指令 (v-model 等)，也允许注册自定义指令。常用于 DOM 操作

有全局注册和局部注册两种方式

```js
// 全局注册自定义指令
Vue.directive('my-directive', {
  // 钩子函数
  bind: function (el, binding, vnode) {},
  inserted: function (el, binding, vnode) {},
  update: function (el, binding, vnode) {},
  componentUpdated: function (el, binding, vnode) {},
  unbind: function (el, binding, vnode) {}
});

// 局部注册自定义指令
export default {
  directives: {
    'my-directive': {
      // 同样的钩子函数定义
    }
  }
  // ...
};
```

示例，在 src 目录下新建一个 directive 目录，集中管理全局的指令，目录结构如下：

```sh
|-- src
    |-- directive
    |   |-- permission         # 权限模块
    |   |   |-- hasRole.js     # 角色权限处理
    |   |-- index.js
    |-- main.js
```

::: code-group

```js [main.js]
// 其余内容省略
import Vue from 'vue';

import directive from './directive';

Vue.use(directive);
```

```js [index.js]
import hasRole from './permission/hasRole';

const install = function (Vue) {
  Vue.directive('hasRole', hasRole);
  // 注册其他指令
};

export default install;
```

```js [hasRole.js]
import store from '@/store';

export default {
  inserted(el, binding, vnode) {
    const { value } = binding;
    const super_admin = 'admin';
    const roles = store.getters && store.getters.roles;

    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value;

      const hasRole = roles.some((role) => {
        return super_admin === role || roleFlag.includes(role);
      });

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`请设置角色值`);
    }
  }
};
```

:::

使用方式如下，在组件绑定 `v-hasRole`，数组中的值是角色名称。这里表示只有 admin 角色可以查看

```html
<el-button v-hasRole="['admin']" type="primary" @click="handleView">查看</el-button>
```

## keep-alive

场景：从列表页进入详情页，返回时要保持以前的搜索条件和页数。即从详情页返回列表页不刷新，从其他菜单页面进入列表页要刷新

方式一： 使用 keep-alive

router.js

```js
{
  path: 'device',
  name: 'device',
  component: () => import('@/views/device/index'),
  meta: { title: '设备列表', keepAlive: true, isBack: false }
}
```

在列表页

```js
  activated() {
    // 从其他菜单页面进入
    if (!this.$route.meta.isBack) {
      this.getList()
    } else {
      //详情页返回操作
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === '/list/detail') {
      to.meta.isBack = true
    } else {
      to.meta.isBack = false
    }
    next()
  },
```

详情页

```js
returnPage() {
  this.$router.go(-1)
}
```

方式二、将参数传递给详情页，返回时将参数带回列表页

::: code-group

```vue [list.vue]
<script>
export default {
  created() {
    if (Object.keys(this.$route.params).length > 0) {
      this.queryParams = this.$route.params.queryParams;
    }
    this.getList();
  },
  methods: {
    intoDetail(row) {
      this.$router.push({
        name: 'detail',
        params: { id: row.id, ...this.queryParams }
      });
    }
  }
};
</script>
```

```vue [detail.vue]
<script>
export default {
  methods: {
    returnPage() {
      delete this.$route.params.id;
      this.$router.push({
        name: 'list',
        params: { queryParams: this.$route.params }
      });
    }
  }
};
</script>
```

:::

## 动态绑定样式

### 动态绑定 class

```
// 对象形式
:class="{'p1' : true}"
:class="{'p1' : false, 'p': true}"

// 数组形式
:class="['p1', 'p2']"
:class="[{ 'p1': true }]"
:class="[{ 'p1': false }, 'p2']

// 三元表达式
:class="[ 1 < 2 ? 'p1' : 'p2' ]"

// 回调函数
:class="setClass"

method: {
  setclass () {
    return 'p1';
  }
}
```

### 动态绑定 style

```
// 对象形式
:style="{ color: activeColor, fontSize: fontSize + 'px' }"
:style="{ color: index == 0 ? '#f00' : '#000' }"

// 数组形式
:style="[style1, style2]"
:style="[{ color: index == 0  '#f00': '#000' }, { fontSize: '20px' }]"

// 三元表达式，参考前两个

// 浏览器会根据运行支持情况进行选择
:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"


// 绑定data对象
:style="styleObject"

data() {
  return{
    styleObject: { color: '#f00', fontSize: '18px' }
  }
}
```

## 环境变量和脚本部署

> 以下操作适用于通过 [Vue CLI](https://cli.vuejs.org/zh/guide/mode-and-env.html) 创建的 vue2 项目

### 环境变量

先在项目根目录下创建三个文件：

`.env.development`：

```
NODE_ENV = development
VUE_APP_BASE_API = 'xxx'
```

`.env.production`：

```
NODE_ENV = production
VUE_APP_BASE_API = 'xxx'
```

`.env.staging`：

```
NODE_ENV = production
VUE_APP_BASE_API = 'xxx'
```

然后在 package.json 中添加如下代码：

```json
{
  "scripts": {
    "dev": "vue-cli-service serve",
    "build:prod": "vue-cli-service build",
    "build:stage": "vue-cli-service build --mode staging"
  }
}
```

当运行 vue-cli-service 命令时，所有的环境变量都从对应的环境文件中载入。对应的脚本如下：

- 开发环境：`pnpm dev`
- 生产环境：`pnpm build:prod`
- 测试环境：`pnpm build:stage`

### 脚本部署

```sh
# 当前目录
localURL=$(pwd)
cd ${localURL}

# 拉取最新代码
git pull

# 设置默认值，如果没有在命令行传入参数，就使用默认值stage
env=${1:-stage}

if [ "$env" = "prod" ]; then
    # 生产环境
    serverURL="root@192.168.12.96"
    # 执行package.json里配置的脚本命令
    npm run build:prod
elif [ "$env" = "stage" ]; then
    # 测试环境
    serverURL="root@192.168.12.6"
    npm run build:stage
else
    # 参数错误，退出脚本
    echo "Unknown parameters: $env"
    exit 1
fi

cd ${localURL}/dist/
zip -q -r 'dist.zip' ./*

scp ${localURL}/dist/dist.zip ${serverURL}:/opt/website/pm/web/

ssh ${serverURL} "pwd;unzip -o /opt/website/pm/web/dist.zip -d /opt/website/pm/web;exit;"

# 删除本地的打包文件dist.zip
rm -r ${localURL}/dist

# 按任意键退出脚本
read -n1 -p "Press any key to exit"
echo
exit 0
```

## 服务端渲染 SSR

## watch 和 computed 的区别

computed 是一个计算属性，基于其依赖进行**缓存**，当依赖的数据发生变化时，会重新计算属性的值。

- 支持缓存
- 不支持异步，当 computed 中有异步操作时，无法监听数据的变化
- 依赖的数据包括：组件的 `data` 和父组件传入的 `props`

```js
new Vue({
  el: '#app',
  data: {
    a: 1,
    b: 2
  },
  computed: {
    sum() {
      return this.a + this.b;
    }
  }
});
```

watch 是一个**监听**数据的变化，当数据发生变化时，会执行相应的回调函数。

- 不支持缓存
- 可以处理异步操作，如请求数据

```js
new Vue({
  el: '#app',
  data: {
    name: '',
    queryParams: {
      pageSize: 10,
      pageNum: 1
    }
  },
  watch: {
    name(newValue, oldValue) {},

    queryParams: {
      handler(newValue, oldValue) {},
      immediate: true,
      deep: true
    }
  }
});
```

- `immediate`：组件加载立即触发回调函数
- `deep`：深度监听，发现数据内部的变化，在复杂数据类型中使用

## Vue 模版编译原理

vue 中的模版无法被浏览器解析，因为 template 不是 html 标签，需要将其编译成 js 函数，将其执行后渲染出 html 元素。

vue 的模版编译是将模板字符串转换为渲染函数的过程，主要有三步：

1. 解析（parse）：将模版字符串转换为 AST 抽象语法树。使用正则表达式对 template 字符串进行解析，将标签、指令、属性等转化为 AST
2. 优化（optimize）：标记静态节点，便于后续的渲染优化。具体是遍历 AST，找到静态节点并标记，在页面重渲染进行 diff 比较时，跳过这些静态节点，优化 runtime 的性能
3. 生成代码（generate）：将 AST 转换为 render 渲染函数

可以查看源码：`src/compiler`
