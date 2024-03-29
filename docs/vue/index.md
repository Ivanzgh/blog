# Vue

## data 为何声明为函数

因为组件可能被用来创建多个实例，若 data 声明为对象则所有的实例将共享引用同一个数据对象

data 声明为函数则每次创建一个新实例后，调用 data 函数会返回初始数据的一个全新副本数据对象

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
let f11 = new VueComponent();
let res1 = f11.$options.data();
res1.name = 'React';
console.log(res1); // {name: "React"}
let f22 = new VueComponent();
console.log(f22.$options.data()); // {name: "Vue"}
```

`new Vue()`可以将`data`声明为一个普通对象是因为这个类创建的实例不会被复用，只会 new 一次。
而`App.vue`同样是因为整个系统中`App.vue`只会被使用一次，所以不存在上述的问题。

## v-if 和 v-show 区别

`v-if`是真正的条件渲染，会有性能开销，每次插入或者移除元素时都必须要生成元素内部的 DOM 树

`v-show`则不管条件是什么都会渲染元素，基于`display:none`显示隐藏

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。
因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好

## v-model 原理

```html
<input placeholder="请输入" id="username" />
内容：
<span id="uName"></span>

<script>
  let obj = {};
  Object.defineProperty(obj, 'username', {
    get() {
      return this;
    },
    set(val) {
      document.getElementById('uName').innerText = val;
    }
  });
  const el = document.getElementById('username');
  el.addEventListener('keyup', function () {
    obj.username = event.target.value;
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

首先我们为每个 vue 属性用 Object.defineProperty()实现数据劫持，为每个属性分配一个订阅者集合的管理数组 dep；然后在编译的时候在该属性的数组 dep 中添加订阅者，v-model 会添加一个订阅者，{{}}也会，v-bind 也会，只要用到该属性的指令理论上都会，接着为 input 会添加监听事件，修改值就会为该属性赋值，触发该属性的 set 方法，在 set 方法内通知订阅者数组 dep，订阅者数组循环调用各订阅者的 update 方法更新视图。

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

## 服务端渲染 SSR

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

```js
// listQuery是查询参数
intoDetail(row) {
  this.$router.push({ name: 'detail', params: { id: row.id, ...this.listQuery } })
},
```

```js
created() {
  if (Object.keys(this.$route.params).length > 0) {
    this.listQuery = this.$route.params.listQuery
  }
  this.getList()
},
```

详情页

```js
returnPage() {
  delete this.$route.params.id
  this.$router.push({ name: 'list', params: { listQuery: this.$route.params } })
}
```

## 插槽 slot

在组件中用来分发内容，简单说就是在组件内部可以扩展内容

### 匿名插槽

```vue
// TestOne.vue
<template>
  <div>
    <slot></slot>
  </div>
</template>

// 在别的组件使用
<template>
  <div>
    <TestOne>
      <h1>可以放任意内容</h1>
    </TestOne>
  </div>
</template>
```

### 具名插槽

```vue
// TestTwo.vue
<template>
  <div>
    // 具名插槽
    <h1>
      <slot name="hName"></slot>
    </h1>
    <span>
      <slot name="spanName"></slot>
    </span>
  </div>
</template>

// 在别的组件使用
<template>
  <div>
    <TestTwo>
      <template #hName>111</template>
      <template #spanName>222</template>
    </TestTwo>
  </div>
</template>
```

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
