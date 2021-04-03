# DOM

## 基础操作

### 简介

DOM : Document Object Model 文档对象模型

Document : html 文档

Object : html 元素

Model : 树模型(dom 树)

是一组用来描述 js 代码怎样与 html 文档进行交互和访问的 web 标准，它定义了一系列对象、方法和属性，用于访问、操作和创建文档中的内容、结构、样式和行为。

#### js 和 dom 的关系

js 包括 dom，js 由 ECMAScript、DOM、BOM 组成

#### 节点

```html
<a href="http://www.baidu.com">百度</a>
```

- 整个元素表示元素节点；
- href="http://www.baidu.com" 表示属性节点；
- 百度 表示文本节点

### 操作元素节点

- 创建 createElement
- 插入 appendChild、insertBefore
- 复制 cloneNode
- 删除 removeChild
- 替换 replaceChild

#### createElement

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <body>
    <div id="box"></div>
  </body>
  <script>
    let h1 = document.createElement('h1')
    console.log(h1) // <h1></h1>
  </script>
</html>
```

创建好的元素并未添加进页面

#### appendChild、insertBefore

```js
let h1 = document.createElement('h1')
let h2 = document.createElement('h2')
let box = document.getElementById('box')
box.appendChild(h1)
box.insertBefore(h2, h1) //将h2添加到h1的前面
```

#### cloneNode

```js
// <div id="box">hello</div>

let box = document.getElementById('box')
let rs = box.cloneNode() //浅复制
//let rs = box.cloneNode(true) //深复制
console.log(rs)
```

#### removeChild

```js
/**
<div id="box">
    <h1>hello</h1>
    <p>world</p>
</div>
*/

let box = document.getElementById('box')
let rm = document.getElementsByTagName('p')[0]
box.removeChild(rm) //删除p元素
```

#### replaceChild

```js
/**
<div id="box">
    <h1>hello</h1>
</div>
*/

let box = document.getElementById('box')
let h1 = box.getElementsByTagName('h1')[0]
let p = document.createElement('p')
box.replaceChild(p, h1)
```

### 操作属性节点

两种操作方式：

- 对象.属性
- setAttribute()、getAttribute()

`对象.属性`方式只对 html 中定义的属性起作用，可获取或修改属性

```js
// <a href="http://www.baidu.com">百度</a>

let a = document.getElementsByTagName('a')[0]
console.log(a.href)
// a.href = 'xxx'
```

::: warning
属性节点并没有作为节点出现
:::

### 操作文本节点

## JS 事件绑定的方式

- 行内绑定
- 动态绑定
- 事件监听

### 行内绑定

<标签 属性列表 事件="事件的处理程序" />

```html
<input type="button" onclick="display()" />
```

### 动态绑定

dom 对象.事件 = 事件的处理程序（通常是一个匿名函数）

```html
<input id="demo" type="button" value="点击我，显示 type 属性" />
<script type="text/javascript">
  document.getElementById('demo').onclick = function() {
    alert(this.getAttribute('type')) // this 指当前发生事件的HTML元素，这里是<div>标签
  }
</script>
```

### 绑定事件处理函数

用 `addEventListener()` 或 `attachEvent()` 来绑定事件监听函数
用 `addEventListener()` 或 `attachEvent()` 来绑定事件监听函数

IE8.0 及其以下版本不支持`addEventListener()` ，它使用`attachEvent()`来绑定事件监听函数

<https://www.cnblogs.com/javawebstudy/p/5266168.html>

## target 和 currentTarget 的区别

`e.target` 指向触发事件监听的对象。

`e.currentTarget` 指向添加监听事件的对象。

<https://www.jianshu.com/p/1dd668ccc97a>

## 事件委托

事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

<https://www.cnblogs.com/Chen-XiaoJun/p/6210987.html>
