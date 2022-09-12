# css

## 盒模型

页面中的每个标签元素都由几个部分组成：内容(content)、内边距(padding)、边框(border)、外边距(margin)

![image](https://cdn.jsdelivr.net/gh/Ivanzgh/ossimg@main/blog/1661153690.png)

标准盒模型：`width = content`

IE 盒模型：`width = content + padding + border`

盒模型可通过`box-sizing`设置，支持到 IE8

- `box-sizing: content-box` 标准盒模型
- `box-sizing: border-box` IE 的怪异盒模型

### margin 特性

margin 始终是透明的

<http://www.hicss.net/do-not-tell-me-you-understand-margin/>

#### 1、给子盒子设置 margin-top 后，父盒子也跟着子盒子一块向下移动

这个问题发生的原因是根据规范，一个盒子如果没有上补白(padding-top)和上边框(border-top)，
那么这个盒子的上边距会和其内部文档流中的第一个子元素的上边距重叠。

解决办法：给父 div 设置 `border-top` 或者 `padding-top`。

### padding 特性

行内元素的内边距对左、右、下起作用。

行内元素的外边距只对左、右起作用。

给行内元素加上绝对定位后，行内元素的内边距和外边距对左、右、上、下均起作用

## 外边距合并

当两个垂直外边距相遇时，它们将形成一个外边距。

合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

![image](http://www.w3school.com.cn/i/ct_css_margin_collapsing_example_1.gif)

w3school 介绍网址： <http://www.w3school.com.cn/css/css_margin_collapsing.asp>

解决方法: 统一设置 margin-top 或者 margin-bottom，不要混合使用

## 优先级算法

- 就近原则，同权重情况下样式定义最近者为准
- 载入样式以最后载入的定位为准

优先级为:

- 同权重: 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。
- !important > id > class > tag
- !important 比 内联优先级高

### 权重的规则

标签的权重为 1，class 的权重为 10，id 的权重为 100

- `div {}`，权重为 1
- `.class1 {}`，权重为 10
- `#id1 {}`，权重为 100
- `#id1 div {}`，权重为 100+1=101
- `.class1 div {}`，权重为 10+1=11
- `.class1 .class2 div {}`，权重为 10+10+1=21

## 清除浮动

**浮动元素会脱离文档流并向左/向右浮动，直到碰到父元素或者另一个浮动元素**

清除浮动是为了清除使用浮动元素产生的影响。浮动会导致父元素高度坍塌，而高度的塌陷使我们页面后面的布局不能正常显示

主推采用`::after`伪元素方法清理浮动

```css
.clearfix {
  /*触发IE6中的 hasLayout*/
  zoom: 1;
}
.clearfix::after {
  content: '';
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
```

## BFC 规范

### 块级格式化上下文：block formatting context

（W3C CSS 2.1 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。）
一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。
不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器），因此 Box 内的元素会以不同的方式渲染,也就是说 BFC 内部的元素和外部的元素不会互相影响。

### BFC 特性和创建条件

特性:

- 内部的 Box 会在垂直方向，从顶部开始一个接一个地放置。
- Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生叠加
- 每个元素的 margin box 的左边，与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- BFC 的区域不会与 float box 叠加。
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。
- 计算 BFC 的高度时，浮动元素也参与计算。

BFC 由以下之一创建：

- 根元素或其它包含它的元素
- 浮动 (元素的 float 不是 none)
- 绝对定位的元素 (元素具有 position 为 absolute 或 fixed)
- 内联块 inline-blocks (元素具有 `display: inline-block`)
- 表格单元格 (元素具有 `display: table-cell`，HTML 表格单元格默认属性)
- 表格标题 (元素具有 `display: table-caption`, HTML 表格标题默认属性)
- 块元素具有 overflow ，且值不是 visible
- display:flow-root

### BFC 作用

- **解决 margin 重叠的问题**

同一个 BFC 下的两个相邻的盒子会出现垂直 margin 重叠的问题，通常我们可以为其中一个盒子添加一个父元素，并使其触发 BFC，即可解决这个问题

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      .box {
        /* 关键点 */
        overflow: auto;
      }
      p {
        margin: 30px;
        height: 30px;
        background-color: #f00;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <p>1</p>
    </div>
    <p>2</p>
    <p>3</p>
  </body>
</html>
```

- **浮动带来的布局问题**

在同一个 BFC 下即使有元素浮动，BFC 下元素的最左边边缘总是会与包含它的盒子左边相接触，那么就会出现浮动元素遮盖了其他元素的情况。
BFC 还有一条重要特性：BFC 的区域不会与 float box 重叠。试想，在一个 BFC，如果存在一个 float 元素，和一个 div，浮动元素会遮盖住 div，
此时，如果给这个 div 构建一个新的 BFC，由于 BFC 特性，内外不相互影响，此时 div 会被 float 元素挤开

比如下面这个例子，绿色盒子会因为浮动遮盖住红色的盒子，但由于两个盒子都在同一个 BFC（body 元素）下，根据 BFC 特性，
红色盒子会与包含块相接，此时只要让红色盒子触发 BFC，我们为红色盒子添加一个触发 BFC 的条件`overflow:hidden`，
此时红色盒子由于 BFC 的特性隔离开绿色，这样我们就可以通过 float 元素的方式实现两栏布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        position: relative;
      }
      .green {
        width: 30px;
        height: 30px;
        background-color: #0f0;
        float: left;
      }
      .red {
        width: 50px;
        height: 50px;
        background-color: #f00;
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div class="green"></div>
    <div class="red"></div>
  </body>
</html>
```

- **清除浮动**

在触发 BFC 后，这个盒子的高度将包含浮动元素的高度，在计算时，浮动元素会参与高度计算，我们可以理解为，当一个父元素中包含了浮动元素，
而浮动元素超出了父元素，此时我们为父元素创建 BFC，那么浮动元素就会包裹进这个 BFC 解决了父元素中高度塌陷的问题

如下面的例子，div.parent 包含了两个 div.child，而两个 div 由于赋予了`float:left`使其浮动，导致了 div.parent 高度的坍塌，
此时我们给 div.parent 添加一个`overflow:hidden`属性值，使 div.parent 触发 BFC，由于 BFC 下的盒子会包含浮动元素的高度，
因此盒子就被撑了起来，高度塌陷的问题也就得到了解决

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      .parent {
        border: 2px solid #f00;
        overflow: hidden;
      }
      .child {
        height: 30px;
        border: 1px solid #0f0;
        float: left;
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="child">child1</div>
      <div class="child">child2</div>
    </div>
  </body>
</html>
```

## 隐藏元素

以下方式都能隐藏元素，而且 Dom 元素还在

- `display: none;` 不占据页面位置
- `opacity: 0;` 占据页面位置
- `visibility: hidden;` 占据页面位置

## rgba()和 opacity 的区别

二者均可设置透明度，使用`opacity`后子元素会继承父元素的透明效果，设置`rgba`元素的子元素不会继承透明效果

### opacity

opacity 属性能够设置的范围值 `0.0 ~ 1.0`，值越小越透明。示例`opacity: 0.5;`

ie9 以下使用滤镜 `filter:alpha(opacity=x)`，x 取值从 0 到 100，值越小越透明

如果项目为了要兼容 ie8 及以下，则需要写两段代码

```css
.box {
  opacity: 0.5;
  filter: alpha(opacity=50);
}
```

### rgba

rgba 是 rgb 的扩展，增加透明度，`alpha`参数介于 `0.0 ~ 1.0`之间，值越小越透明。
示例`background-color: rgba(0, 0, 0, 0.5);`，小数点前的 0 可以省略。ie9 以下不兼容

## 改变页面鼠标样式

```css
* {
  cursor: url(https://chokcoco.github.io/demo/boom/cd_glowsword.cur), auto !important;
}
```

## calc()设置流式布局宽高

calc 是英文单词 calculate(计算)的缩写，支持到 IE9

### vh、vw

viewport：可视窗口，也就是浏览器。

vw Viewport 宽度，1vw 等于 viewport 宽度的 1%

vh Viewport 高度，1vh 等于 viewport 高的的 1%

### calc()

calc 是 css3 提供的一个在 css 文件中计算值的函数,用于动态计算长度值。

- 运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
- 任何长度值都可以使用 calc()函数进行计算；
- calc()函数支持 "+", "-", "\*", "/" 运算；
- calc()函数使用标准的数学运算优先级规则；

`calc(100vh - 10px)` 表示整个浏览器窗口高度减去 10px 的大小;

`calc(100vw - 10px)` 表示整个浏览器窗口宽度减去 10px 的大小

如果用了 CSS 预处理器（less,scss）会被它们先解析，这时需要禁用解析 `calc(~ '100vh - 64px')` (less 的写法）

::: tip
元素高度是否可以用百分比显示取决于父级元素。在浏览器默认状态下没有给 body 高度，
设置`html,body { height: 100%; }`，子元素才能正常显示
:::

## 设置页面小图标

在 head 标签引入

```html
<link rel="shortcut icon" type="image/x-icon" href="cxp.ico" />
```

## 伪类、伪元素

### 伪类

是选择器的一种，用于选择处于特定状态的元素，用一个冒号表示，例如`:first-child`、`:last-child`、`:hover`、`:focus`、`:link`、`:visited`等

### 伪元素

用两个冒号表示，`::before`、`::after`

例如，给激活的菜单项底部添加下划线

```css
.menu-active::after {
  content: '';
  position: absolute;
  bottom: 1px;
  left: 50%;
  width: 30px;
  height: 3px;
  transform: translateX(-15px);
  background-color: #3c82f3;
}
```

## 设置复制文本的样式

```css
p::selection {
  color: #f00;
  background-color: #eee;
}
```

## 事件穿透

比如有报警全屏闪烁功能，在报警时间内要求可以点击其他按钮。可以做一个全屏遮罩层覆盖在上面，
关键在`pointer-events: none;`这个 css3 属性，可以让事件穿透

```css
/* <div class="alarm"></div> */

.alarm {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  pointer-events: none;
  margin: 0;
  z-index: 3000;
  box-shadow: inset 0 0 70px #f00;
  animation: twinkling 1s infinite normal;
}
@keyframes twinkling {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```

## 文本

- 首行缩进 2 个字

```css
text-indent: 2em;
```

- 文字加下划线

```css
text-decoration: underline;
```

- 字体设置

```css
font: 600 16px/30px 微软雅黑;
```

表示字体粗 600，字体大小 16px，行高 30px，微软雅黑字体

- 文字换行
  - 强制换行，行尾会将一个完整的单词拆开

```css
word-break: break-all;
```

- 行尾不会拆解单词，如果宽度不够会放到下一行，尾部会有空白

```css
word-wrap: break-word;
```

## 文本超出显示省略号

当文本内容为数字或者字母时候，flex 布局无法将数字或字母截断实现换行，需要强制换行`word-break: break-all;`

flex 布局时显示省略号

```html
<div style="display: flex; border: 1px solid red">
  <div style="min-width: 0; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
    好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊
  </div>
  <div style="min-width: 0; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
    好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊
  </div>
  <div style="min-width: 0; text-overflow: ellipsis; overflow: hidden; white-space: nowrap">
    好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊好多蚊子啊
  </div>
</div>
```
