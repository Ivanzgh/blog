# DOM

DOM（Document Object Model） 文档对象模型

- Document：html 文档
- Object：html 元素
- Model：树模型

是一组用来描述 js 代码怎样与 html 文档进行交互和访问的 web 标准，它定义了一系列对象、方法和属性，用于访问、操作和创建文档中的内容、结构、样式和行为。

> JavaScript 包括 DOM，JavaScript 由 ECMAScript、DOM、BOM 组成

## 节点

```html
<div>
  <p title="title">content</p>
</div>
```

- `div`、`p`表示元素节点
- `title` 表示属性节点
- `content` 表示文本节点

## 操作元素节点

- 创建 createElement
- 插入 appendChild、insertBefore
- 复制 cloneNode
- 删除 removeChild
- 替换 replaceChild

### createElement

创建节点，创建好的元素并未添加进页面

```js
let h1 = document.createElement('h1');
console.log(h1); // <h1></h1>
```

### appendChild、insertBefore

插入节点

```js
let h1 = document.createElement('h1');
let h2 = document.createElement('h2');
let box = document.getElementById('box');
box.appendChild(h1);
box.insertBefore(h2, h1); // 将h2添加到h1的前面
```

### cloneNode

复制节点

```js
// <div id="box">hello</div>

let box = document.getElementById('box');
let rs = box.cloneNode(); // 浅复制
// let rs = box.cloneNode(true) // 深复制
```

### removeChild

移除节点

```js
/**
<div id="box">
    <h1>hello</h1>
    <p>world</p>
</div>
*/

let box = document.getElementById('box');
let rm = document.getElementsByTagName('p')[0];
box.removeChild(rm); // 删除p元素
```

### replaceChild

替换节点

```js
/**
<div id="box">
    <h1>hello</h1>
</div>
*/

let box = document.getElementById('box');
let h1 = box.getElementsByTagName('h1')[0];
let p = document.createElement('p');
box.replaceChild(p, h1);
```

## 操作属性节点

两种操作方式：

- _对象.属性_
- `setAttribute()`、`getAttribute()`

_对象.属性_ 方式只对 html 中定义的属性起作用，可获取或修改属性

```js
// <a href="http://www.baidu.com">百度</a>

let a = document.getElementsByTagName('a')[0];
console.log(a.href);
// a.href = 'xxx'
```

```js
const div = document.getElementById('id');
div.setAttribute('class', 'className');
```

示例：

```js
const div = document.createElement('div');

const dataAttribute = document.createAttribute('custom');
dataAttribute.value = '666';

// 将属性节点添加到元素节点上
div.setAttributeNode(dataAttribute);

// 插入dom
document.getElementsByTagName('body')[0].appendChild(div);
```

## 操作文本节点

### createTextNode

```js
const content = document.createTextNode('content');
```

### innerHTML

- 修改 dom 节点的文本内容
- 通过 html 片段，修改节点内容

```js
const div = document.createElement('div');
div.innerHTML = 'hello';

// div.innerHTML = '<p>123</p>';
```

### innerText

设置文本内容

```js
const div = document.createElement('div');
div.innerText = 'hello';
```

### 修改样式

```js
const div = document.createElement('div');
div.innerText = 'hello';

div.style.color = '#f00';
div.style.fontSize = '20px';
```

## 获取节点

```js
// 返回拥有指定id的对象的引用
document.getElementById('id属性值');
// 返回拥有指定class的对象集合
document.getElementsByClassName('class属性值');
// 返回拥有指定标签名的对象集合
document.getElementsByTagName('标签名');
// 返回拥有指定名称的对象集合
document.getElementsByName('name属性值');
// 仅返回第一个匹配的元素
document.element.querySelector('CSS选择器');
// 返回所有匹配的元素
document.element.querySelectorAll('CSS选择器');
// 获取页面中的html标签
document.documentElement;
// 获取页面中的body标签
document.body;
```

示例：querySelector

```js
document.querySelector('.element');
document.querySelector('#element');
document.querySelector('div');
document.querySelector('[name="username"]');
document.querySelector('div + p > span');

const ps = document.querySelectorAll('p');
```

## 事件绑定的方式

- 行内绑定
- 动态绑定
- 事件监听

### 行内绑定

```html
<input type="button" onclick="display()" />
```

### 动态绑定

```js
// <input id="demo" type="button" value="点击我，显示 type 属性" />

document.getElementById('demo').onclick = function () {
  alert(this.getAttribute('type'));
};
```

### 事件监听

用 `addEventListener()` 或 `attachEvent()` 来绑定事件监听函数

IE8.0 及其以下版本不支持`addEventListener()` ，它使用`attachEvent()`来绑定事件监听函数

```js
const el = document.querySelector('.element');
el.addEventListener('click', () => {
  console.log('click');
});
```

## target 和 currentTarget 的区别

`e.target` 指向触发事件监听的对象

`e.currentTarget` 指向添加监听事件的对象

## 事件冒泡、事件捕获、事件委托

1、事件冒泡

当一个元素触发了某个事件后，该事件会向上冒泡到该元素的所有祖先元素，直到 HTML 文档的根元素为止。比如，当点击一个子元素时，点击事件会先在子元素上触发，然后冒泡到父元素，再冒泡到更高级别的祖先元素

2、事件捕获

和事件冒泡相反的概念，即事件从最外层的元素开始捕获，然后逐级向下，直到达到触发事件的元素。这种方式一般不常用

3、事件委托

利用事件冒泡原理，将事件处理器绑定到某个父元素上，然后通过冒泡传递到子元素上触发。这样做可以减少事件处理器的数量，提高性能

4、如何阻止事件冒泡

使用事件对象的 `stopPropagation()` 方法

5、如何阻止默认事件

使用事件对象的 `preventDefault()` 方法。浏览器默认行为有链接跳转、表单提交等

代码示例：

```html
<div id="parent">
  <div id="child">Click me!</div>
</div>
```

事件冒泡示例

```js
const parent = document.querySelector('#parent');
const child = document.querySelector('#child');

parent.addEventListener('click', function (e) {
  console.log('父元素被点击');
});
child.addEventListener('click', function (e) {
  console.log('子元素被点击');
});
document.addEventListener('click', function (e) {
  console.log('document被点击');
});
```

事件捕获示例：在事件监听器中添加了一个参数 `useCapture`，设置为 true 即是事件捕获

```js
parent.addEventListener(
  'click',
  function (e) {
    console.log('父元素被点击');
  },
  true
);
child.addEventListener(
  'click',
  function (e) {
    console.log('子元素被点击');
  },
  true
);
document.addEventListener(
  'click',
  function (e) {
    console.log('document被点击');
  },
  true
);
```

事件委托示例，将事件监听器绑定到父元素上，然后利用 `e.target` 属性判断是否点击的是子元素，从而触发相应的事件处理器

```js
// <div id="parent">
//   <div id="child1">Click me!</div>
//   <div class="child2">Click me!</div>
// </div>

const parent = document.querySelector('#parent');

parent.addEventListener('click', function (e) {
  if (e.target && e.target.matches('#child1')) {
    console.log('子元素1被点击');
  }
  if (e.target && e.target.matches('.child2')) {
    console.log('子元素2被点击');
  }
});
```

阻止事件冒泡示例，在子元素的事件监听器中调用 `e.stopPropagation()` 方法，以阻止事件冒泡到父元素

```js
parent.addEventListener('click', function (e) {
  console.log('父元素被点击');
});

child.addEventListener('click', function (e) {
  console.log('子元素被点击');
  e.stopPropagation();
});
```

## getBoundingClientRect

获取元素的大小及其相对于视口的位置

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418111.png)

## 获取宽高

- screen 屏幕
- scroll 滚动

### 获取屏幕宽高

显示器的宽高

```js
window.screen.width;
window.screen.height;
```

### 获取 body 宽高

clientHeight 是元素内部高度，包含 padding，不包含 border、margin、水平滚动条高度（如果存在）。

- clientHeight = height + padding - 水平滚动条高度
- clientWidth = width + padding - 垂直滚动条高度

offsetHeight 包含 padding、border、水平滚动条高度（如果存在）。

- offsetHeight = height + padding + border + 水平滚动条高度
- offsetWidth = width + padding + border + 垂直滚动条高度

```js
// 获取body宽高，不含边框
document.body.clientWidth;
document.body.clientHeight;

// 获取当前浏览器窗口中HTML文档元素的可视宽高
document.documentElement.clientWidth;
document.documentElement.clientHeight;

// 获取body宽高，包含边框
document.body.offsetWidth;
document.body.offsetHeight;
```

- `scrollHeight`：元素内容高度，包括从视图中溢出的不可见的内容
  - 如果没有垂直滚动条，和 `clientHeight` 相同
  - 包括 padding，不包括 border、margin
  - 包括伪元素，如 `::before` 和 `::after`
- `scrollTop`：滚动条距离顶部的距离

通过`scrollHeight`、`scrollTop`和`clientHeight`做比较，就可以判断是否滚动到底部了。

```js
document.body.scrollWidth;
document.body.scrollHeight;

document.documentElement.scrollTop || document.body.scrollTop;
```

### 获取视口宽高

- `window.innerWidth`：浏览器窗口的视口宽度，包括水平滚动条宽度
- `window.innerHeight`：浏览器窗口的视口高度，包括垂直滚动条，不包括浏览器顶部的菜单栏、地址栏、工具栏等浏览器 UI 组件的高度

100vh 表示视口高度，和 `window.innerHeight` 一样

- `window.outerWidth`：浏览器窗口的宽度
- `window.outerHeight`：整个浏览器窗口的高度，包括浏览器的 UI 组件高度

获取浏览器视口高度的兼容写法：

```js
const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
```
