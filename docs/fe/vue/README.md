# Vue

## data 为何声明为函数

普通组件中的 data 为何声明为函数？

当一个组件被定义，`data`必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。
如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！
通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。

data 声明为对象：

```js
function VueComponent() {}
VueComponent.prototype.$options = {
  data: { name: "Vue" },
};
let f1 = new VueComponent();
f1.$options.data.name = "React";
let f2 = new VueComponent();
console.log(f2.$options.data.name); // React
```

data 声明为函数：

```js
function VueComponent() {}
VueComponent.prototype.$options = {
  data: () => ({ name: "Vue" }),
};
let f11 = new VueComponent();
let res1 = f11.$options.data();
res1.name = "React";
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

## v-model原理

```html
<input placeholder="请输入" id="username" />
内容：<span id="uName"></span>

<script>
  let obj = {}
  Object.defineProperty(obj, "username", {
    get() {
      return this
    },
    set(val) {
      document.getElementById("uName").innerText = val;
    }
  })
  const el = document.getElementById("username")
  el.addEventListener("keyup", function () {
    obj.username = event.target.value
  })
</script>
```

## 双向数据绑定原理

### 1、双向绑定原理

vue2是采用**数据劫持**结合**发布者-订阅者模式**，通过`Object.defineProperty()`来劫持各个属性的`setter`、`getter`，在数据变动时发布消息给订阅者，触发响应的监听回调。

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

![image](/blog/img/fe/vue1.png)

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
    },
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
  nodeToFragment: function(node, vm) {
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
  compileElement: function(node, vm) {
    var reg = /\{\{(.*)\}\}/;
    //节点类型为元素(input元素这里)
    if (node.nodeType === 1) {
      var attr = node.attributes;
      // 解析属性
      for (var i = 0; i < attr.length; i++) {
        if (attr[i].nodeName == "v-model") {
          //遍历属性节点找到v-model的属性
          var name = attr[i].nodeValue; // 获取v-model绑定的属性名
          node.addEventListener("input", function(e) {
            // 给相应的data属性赋值，进而触发该属性的set方法
            vm[name] = e.target.value;
          });
          new Watcher(vm, node, name, "value"); //创建新的watcher，会触发函数向对应属性的dep数组中添加订阅者，
        }
      }
    }
    //节点类型为text
    if (node.nodeType === 3) {
      if (reg.test(node.nodeValue)) {
        var name = RegExp.$1; // 获取匹配到的字符串
        name = name.trim();
        new Watcher(vm, node, name, "nodeValue");
      }
    }
  },
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
  update: function() {
    this.get();
    this.node[this.type] = this.value; // 订阅者执行相应操作
  },
  // 获取data的属性值
  get: function() {
    console.log(1);
    this.value = this.vm[this.name]; //触发相应属性的get
  },
};
```

4.4 实现 Dep 来为每个属性添加订阅者

```js
function Dep() {
  this.subs = [];
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
    this.subs.forEach(function(sub) {
      sub.update();
    });
  },
};
```

### 5、总结

首先我们为每个 vue 属性用 Object.defineProperty()实现数据劫持，为每个属性分配一个订阅者集合的管理数组 dep；然后在编译的时候在该属性的数组 dep 中添加订阅者，v-model 会添加一个订阅者，{{}}也会，v-bind 也会，只要用到该属性的指令理论上都会，接着为 input 会添加监听事件，修改值就会为该属性赋值，触发该属性的 set 方法，在 set 方法内通知订阅者数组 dep，订阅者数组循环调用各订阅者的 update 方法更新视图。

参考文章： [vue 的双向绑定原理及实现](https://www.cnblogs.com/libin-1/p/6893712.html)

### 简易版本 Vue2 双向数据绑定

```html
<div id="app">
  订阅视图1：<span class="box1"></span>
  订阅视图2：<span class="box2"></span>
</div>

<script src="index.js"></script>
<script>
  let obj = {}
  dataRes({ data: obj, tag: 'view1', dataKey: 'one', selector: '.box1' })
  dataRes({ data: obj, tag: 'view2', dataKey: 'two', selector: '.box2' })

  obj.one = '这是视图一'
  obj.two = '这是视图二'
</script>
```

```js
// // 订阅器模型
const Dep = {
  // 容器
  container: {},
  // 添加订阅
  listen(key, fn) {
    (this.container[key] || (this.container[key] = [])).push(fn)
  },
  // 发布
  trigger() {
    let key = Array.prototype.shift.call(arguments),
      fns = this.container[key]
    if (!fns || fns.length === 0) {
      return
    }
    for (let i = 0, len = fns.length; i < len; i++) {
      fns[i].apply(this, arguments)
    }
    // for (let i = 0, fn; (fn = fns[i++]); ) {
    //   fn.apply(this, arguments);
    // }
  }
}

// 数据劫持
const dataRes = ({ data, tag, dataKey, selector }) => {
  let value = '',
    el = document.querySelector(selector)

  Object.defineProperty(data, dataKey, {
    get() {
      return value
    },
    set(val) {
      value = val
      Dep.trigger(tag, val)
    }
  })

  Dep.listen(tag, (text) => {
    el.innerHTML = text
  })
}
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
  const container = [...document.querySelector('#container').children]

  let proxyObj = new Proxy(
    { text: '', password: '' },
    {
      get(target, property) {
        return target[property]
      },
      set(target, propName, propValue, receiver) {
        let isCanEdit = true
        container.forEach((dom) => {
          if (dom.getAttribute('v-bind') === propName) {
            dom.innerHTML = propValue
          }
          if (dom.getAttribute('v-model') === propName) {
            dom.value = propValue
          }
        })

        target[propName] = propValue
      }
    }
  )

  container.forEach((dom) => {
    if (dom.getAttribute('v-model') in proxyObj) {
      dom.addEventListener('input', function () {
        proxyObj[this.getAttribute('v-model')] = this.value
      })
    }
  })
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
import Vue from 'vue'

import Button from './Button.vue'

Vue.component('st-button', Button)
```

在mian.js文件中引入

```js
import '@/components/selfComponents'
```

在需要公共组件的界面使用`<st-button />`

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
