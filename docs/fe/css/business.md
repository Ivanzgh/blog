# 业务效果

## 01-卡片式栏目介绍

[源码](https://github.com/Ivanzgh/beautiful-css/tree/main/src/pages/01-card-column-introduction)

<iframe height="600" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/ZGHIvan/embed/eYXryvJ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ZGHIvan/pen/eYXryvJ">
  Untitled</a> by zghIvan (<a href="https://codepen.io/ZGHIvan">@ZGHIvan</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

## 纯 CSS 创建三角形

<https://css-tricks.com/the-shapes-of-css/>

<https://www.cnblogs.com/monozxy/p/7903019.html>

将元素的宽高设为 0，只设置 border，任意三条边隐藏（颜色设为 transparent），即可画出小三角

```css
width: 0;
height: 0;
border-width: 20px;
border-style: solid;
border-color: red transparent transparent transparent;
```

## 星级评估

<iframe height="300" style="width: 100%;" scrolling="no" title="星级评估" src="https://codepen.io/ZGHIvan/embed/PoLegex?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/ZGHIvan/pen/PoLegex">
  星级评估</a> by zghIvan (<a href="https://codepen.io/ZGHIvan">@ZGHIvan</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

::: code-group

```css
.rating {
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
}
.star {
  position: relative;
  margin: 0 2px;
  font-size: 40px;
  color: #ddd;
}
.star::before {
  content: '\2605';
  position: absolute;
  left: 0;
}
.star:hover::before,
.star:hover ~ .star::before {
  color: red;
}
```

```html
<div class="rating">
  <span class="star">☆</span>
  <span class="star">☆</span>
  <span class="star">☆</span>
  <span class="star">☆</span>
  <span class="star">☆</span>
</div>
```

:::

## 更改复选框样式

<https://blog.csdn.net/qq_34182808/article/details/79992465>

::: code-group

```css
.input-color + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  left: 30px;
  background-color: #999;
  border-radius: 4px;
}

.input-color:checked + label::before {
  display: block;
  content: '\2714';
  text-align: center;
  font-size: 16px;
  color: white;
  background-color: #c00;
  border-radius: 4px;
}
```

```html
<input type="checkbox" class="input-color" />

<label for="input-color" onclick="toggleStatus()"></label>
```

:::

## 毛玻璃效果

::: code-group

```css
* {
  margin: 0;
  padding: 0;
}
html,
body {
  color: rgba(0, 0, 0, 0.8);
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url(1jpg);
  background-position: center top;
  background-size: cover;
}
.content {
  width: 800px;
  height: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -400px;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 2;
  padding: 50px;
  box-sizing: border-box;
}
.content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-filter: blur(20px);
  -moz-filter: blur(20px);
  -ms-filter: blur(20px);
  -o-filter: blur(20px);
  filter: blur(20px);
  z-index: -3;
  margin: -30px;
  background-image: url(1jpg);
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
}
```

```html
<div class="container">
  <div class="content">
    <p>Are you ready?</p>
  </div>
</div>
```

:::

<https://www.cnblogs.com/ghost-xyx/p/5677168.html>

## 时光轴

::: code-group

```html
<div id="box-wrap">
  <ul>
    <li>
      <div class="left">
        <p>2019.7.17</p>
        <p style="padding-left: 20px;">16:30</p>
      </div>
      <i class="timeline"></i>
      <div class="right">
        <div class="right-box">
          <div class="title">
            <img src="images/u3824.png" alt="" />
            <span>北京地区招聘JAVA工程师三名</span>
          </div>
          <div class="content">
            <p>面试地点：北京海淀区西二旗</p>
            <p>接洽人：张三</p>
            <p>接洽人电话：18618437566</p>
          </div>
        </div>
        <div class="right-box">
          <div class="title">
            <img src="images/u3824.png" alt="" />
            <span>北京地区招聘JAVA工程师三名</span>
          </div>
          <div class="content">
            <p>面试地点：北京海淀区西二旗</p>
            <p>接洽人：张三</p>
            <p>接洽人电话：18618437566</p>
          </div>
        </div>
      </div>
    </li>
  </ul>
</div>
```

```css
#box-wrap {
  width: 800px;
  height: 400px;
  margin: 0 auto;
  background-color: #e4e4e4;
  font-size: 14px;
  color: #333;
  line-height: 24px;
  font-family: '微软雅黑';
  overflow-y: auto;
  overflow-x: hidden;
}

#box-wrap ul li {
  position: relative;
  display: flex;
  padding: 25px 0 0 50px;
}

#box-wrap ul li:before {
  content: '';
  position: absolute;
  left: 160px;
  top: 20px;
  z-index: 0;
  width: 1px;
  height: 100%;
  background-color: #00b800;
}

.timeline {
  position: absolute;
  left: 150px;
  top: 50px;
  z-index: 10;
  width: 20px;
  height: 20px;
  line-height: 20px;
  background-color: #00b800;
  color: #5fb878;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}

.left {
  width: 150px;
  margin-top: 20px;
}

.right {
  margin-top: 20px;
}

.right-box {
  margin-bottom: 20px;
}

.title {
  margin-bottom: 10px;
}

.title img {
  width: 19px;
  height: 22px;
  margin-right: 20px;
}

.content {
  padding-left: 36px;
  font-size: 14px;
}

.content p {
  line-height: 1.5;
}
```

:::

## 进度条

<https://www.cnblogs.com/xiaofeixiang/p/5036154.html>

<https://blog.csdn.net/weixin_40687883/article/details/80388420>

## img 加载失败显示默认图片

```scss
img {
  width: 200px;
  height: 200px;
  vertical-align: middle;

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background: #fff url('../../assets/logo2.jpg') no-repeat;
  }
}
```

## 修改多选框的样式

根据后台返回的处理状态显示不同的样式，同时可以点击更改状态

```css
.input-color + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  left: 30px;
  background-color: #999;
  border-radius: 4px;
}

.input-color:checked + label::before {
  display: block;
  content: '√';
  text-align: center;
  font-size: 16px;
  color: white;
  background-color: #c00;
  border-radius: 4px;
}
```

如果表格的某一行的状态是 true

```js
if(item.processResult) {
<td>
    <input type="checkbox" class="input-color" checked>
    <label for="input-color" onclick="toggleStatus('{{item.id}}',false)"></label>
</td>
}
```

如果表格的某一行的状态是 false

```js
if(!item.processResult) {
<td>
    <input type="checkbox" class="input-color">
    <label for="input-color" onclick="toggleStatus('{{item.id}}',true)"><span style="color: #fff;">√</span></label>
</td>
}
```

点击某一条数据可以切换状态

```html
<script>
  function toggleStatus(statusId, status) {
    var jsonData = {
      id: statusId,
      processResult: status
    };
    postURL('/business/feedback/updateProcessResultById', JSON.stringify(jsonData), function (data) {
      if (data.success) {
        getFeedBackList();
      } else {
        console.log('error');
      }
    });
  }
</script>
```

## 换行显示后端返回的数据

### 1、可以使用 CSS 样式

```css
white-space: pre-line;
```

- `white-space: pre-line`，把多个空格合并成一个
- `white-space: pre-wrap`，会保留所有空格

### 2、如果有\n 可以使用 br 标签替换

```html
<script>
  var str =
    '职位描述: 诚聘20名商务模特：\n岗位要求：年龄在18-26周岁之间，身高在165cm以上。\n有良好的形象和气质，颜值较高，有才艺、有经验者优先，无经验可以提供免费培训。 ';
  res = str.replace(/\n+/g, '<br/>');
  document.write(res);
</script>
```

### 3、文本域 textarea

若是在文本域中显示，默认会首行缩进 2 个空格，只需将 textarea 标签写在一行即可

```css
<textarea rows="10" cols="50"></textarea>
```

## 放射性条状物

核心在`clip-path: polygon()`属性

```html
<div class="box"></div>

<style>
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    background-color: #ffb782;
    border-radius: 20px;
  }

  .box::before {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ffa766;
    width: 100%;
    height: 100%;
    content: '';
    clip-path: polygon(
      20% 0%,
      5% 0,
      50% 50%,
      0 28%,
      0 15%,
      50% 50%,
      0 40%,
      0 49%,
      50% 50%,
      0 58%,
      0 68%,
      50% 50%,
      0 80%,
      0 96%,
      50% 50%,
      15% 100%,
      0 190%,
      50% 50%,
      42% 100%,
      70% 178%,
      50% 50%,
      70% 100%,
      100% 120%,
      50% 50%,
      100% 97%,
      100% 84%,
      50% 50%,
      100% 73%,
      100% 62%,
      50% 50%,
      100% 56%,
      100% 48%,
      50% 50%,
      100% 41%,
      100% 32%,
      50% 50%,
      100% 22%,
      100% 7%,
      50% 50%,
      85% 0,
      66% 0,
      50% 50%,
      50% 0,
      33% 0,
      50% 50%
    );
  }
</style>
```

## 文字有下划线背景

鼠标移入有背景色填满文字的过渡动画

```css
/* <a href="#">hello world</a> */

a {
  color: rgb(15, 15, 15);
  text-decoration: none;
  outline: none;
  background-color: transparent;

  padding: 2px 0px 1px;
  background-image: linear-gradient(
    transparent 0%,
    transparent calc(50% - 9px),
    rgba(0, 255, 0, 0.5) calc(50% - 9px),
    rgba(0, 255, 0, 0.5) 100%
  );
  transition: background-position 120ms ease-in-out 0s, padding 120ms ease-in-out 0s;
  background-size: 100% 200%;
  background-position: 0px 0px;
  word-break: break-word;
}
a:hover {
  background-image: linear-gradient(
    transparent 0%,
    transparent calc(50% - 9px),
    rgb(0, 255, 0) calc(50% - 9px),
    rgb(0, 255, 0) 100%
  );
  background-position: 0px 100%;
}
```

## 元素从左往右渐显

让元素从上往下，或者从左往右渐显出来。可以用伪元素遮盖住元素内容，然后用动画改变伪元素的宽或高

```css
/* <div class="box">天下无双</div> */

.box {
  position: relative;
  padding: 5px;
  display: inline-block;
  border: solid 1px;
  font-size: 1.5rem;
}

.box::after {
  content: ' ';
  background-color: #fff;
  position: absolute;
  top: -1px;
  right: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  animation: slide 3s ease-in forwards;
}

@keyframes slide {
  to {
    width: 0;
  }
}
```

- 如果元素有 border，伪元素的宽高要设为 100%加上 border，对应的 `top` 和 `right` 要设置为负的 border 宽度。
- 因为动画中的文字元素是从左往右显现，伪元素的宽度需要从左往右缩小，所以我们需要将伪元素的固定点设置在右上角或者右下角，即：设置 `top/bottom` 和 `right` 属性；如果动画要从右往左显现，则需要设置 `top/bottom` 和 `left` 属性；同样，如果从上往下显现，那么就设置 `left/right` 和 `bottom` 属性。

还可以使用`clip-path`实现效果

```css
.box {
  position: relative;
  display: inline-block;
  padding: 5px;
  border: solid 1px;
  font-size: 1.5rem;
  clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
  animation: slide 2s forwards;
}

@keyframes slide {
  to {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
}
```

## 网站置灰

如果是主流浏览器添加 filter 滤镜

```css
.gray {
  filter: grayscale(0.95);
}
```

IE10 以下

```css
filter: gray;
```

IE11 和 IE10 去掉了`filter: gray`属性，但是又不支持最新的`filter: grayscale()`。

一般使用 grayscale.js（原链接已失效，可网上查找） 处理，不支持置灰：图片地址是 http 协议、hover、伪元素

```js
var navStr = navigator.userAgent.toLowerCase();
if (navStr.indexOf('msie 10.0') !== -1 || navStr.indexOf('rv:11.0') !== -1) {
  grayscale($('body'));
}
```

## 修改滚动条样式

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar)
