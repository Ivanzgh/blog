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

## 双向绑定原理

### 1、双向绑定原理

vue.js 是采用数据劫持结合发布者-订阅者模式，通过`Object.defineProperty()`来劫持各个属性的`setter`、`getter`，在数据变动时发布消息给订阅者，触发响应的监听回调。

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

返回值:

被传递给函数的对象。

MDN 地址： [Object.defineProperty()
](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

### 3、vue 如何实现

![image](/blog/img/fe/vue1.png)

3.1 observer 用来实现对每个 vue 中的 data 中定义的属性循环用 Object.defineProperty()实现数据劫持，以便利用其中的 setter 和 getter，然后通知订阅者，订阅者会触发它的 update 方法，对视图进行更新。

3.2 我们介绍为什么要订阅者，在 vue 中 `v-model`，`v-name`，`{{}}`等都可以对数据进行显示，也就是说假如一个属性都通过这三个指令了，那么每当这个属性改变的时候，相应的这个三个指令的 html 视图也必须改变，于是 vue 中就是每当有这样的可能用到双向绑定的指令，就在一个 Dep 中增加一个订阅者，其订阅者只是更新自己的指令对应的数据，也就是 `v-model='name'`和`{\n{name}}`有两个对应的订阅者，各自管理自己的地方。每当属性的 set 方法触发，就循环更新 Dep 中的订阅者。

### 4、vue 代码实现

4.1 observer 实现，主要是给每个 vue 的属性用 `Object.defineProperty()`，代码如下：

```js
function defineReactive(obj, key, val) {
  var dep = new Dep();
  Object.defineProperty(obj, key, {
    get: function() {
      //添加订阅者watcher到主题对象Dep
      if (Dep.target) {
        // JS的浏览器单线程特性，保证这个全局变量在同一时间内，只会有同一个监听器使用
        dep.addSub(Dep.target);
      }
      return val;
    },
    set: function(newVal) {
      if (newVal === val) return;
      val = newVal;
      console.log(val);
      // 作为发布者发出通知
      dep.notify(); //通知后dep会循环调用各自的update方法更新视图
    },
  });
}
function observe(obj, vm) {
  Object.keys(obj).forEach(function(key) {
    defineReactive(vm, key, obj[key]);
  });
}
```

4.2 实现 compile

compile 的目的就是解析各种指令称真正的 html。

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
