# Vue

## data为何声明为函数

普通组件中的data为何声明为函数？

当一个组件被定义，`data`必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。
如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！
通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。

data声明为对象：

```js
function VueComponent() {}
VueComponent.prototype.$options = {
    data: { name: 'Vue' }
}
let f1 = new VueComponent()
f1.$options.data.name = 'React'
let f2 = new VueComponent()
console.log(f2.$options.data.name);    // React
```

data声明为函数：

```js
function VueComponent() {}
VueComponent.prototype.$options = {
    data: () => ({name: 'Vue'})
}
let f11 = new VueComponent()
let res1 = f11.$options.data()
res1.name = 'React'
console.log(res1)     // {name: "React"}
let f22 = new VueComponent()
console.log(f22.$options.data())   // {name: "Vue"}
```

`new Vue()`可以将`data`声明为一个普通对象是因为这个类创建的实例不会被复用，只会new一次。
而`App.vue`同样是因为整个系统中`App.vue`只会被使用一次，所以不存在上述的问题。

## v-if和v-show区别

`v-if`是真正的条件渲染，会有性能开销，每次插入或者移除元素时都必须要生成元素内部的DOM树

`v-show`则不管条件是什么都会渲染元素，基于`display:none`显示隐藏

一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。
因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好
