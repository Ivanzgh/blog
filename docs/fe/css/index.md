# css

## 盒模型

盒模型由四个部分组成：内容`content`、内边距`padding`、边框`border`、外边距`margin`

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666417350.png)

- 标准盒模型：`width = content`
- IE 盒模型：`width = content + padding + border`

盒模型可通过`box-sizing`设置，支持到 IE8

- `box-sizing: content-box` 标准盒模型，默认值
- `box-sizing: border-box` IE 的怪异盒模型

### padding 特性

- 行内元素的内边距对左、右、下起作用
- 行内元素的外边距只对左、右起作用
- 给行内元素加上绝对定位后，行内元素的内边距和外边距对上下左右均起作用

### margin 特性

1、给子元素设置 margin-top 后，父元素也跟着子元素一块向下移动

一个元素如果没有`padding-top`和`border-top`，那么这个元素的上边距会和其内部文档流中的第一个子元素的上边距重叠

解决办法：给父元素设置 `border-top` 或者 `padding-top`

2、`margin: 0 auto;`会让元素水平居中

3、外边距合并

当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

![image](http://www.w3school.com.cn/i/ct_css_margin_collapsing_example_1.gif)

解决方法:

- 统一设置 margin-top 或者 margin-bottom，不要混合使用
- 设置其中一个元素为 BFC

## BFC 规范

### 块级格式化上下文：block formatting context

CSS 2.1 规范中的一个概念，它是一个独立容器，决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。

简单说，BFC 是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行元素摆放，并且不会影响其它环境中的元素。

### BFC 特性和创建条件

让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响

特性:

- 内部的 Box 会在垂直方向，从顶部开始一个接一个地放置
- Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生叠加
- 每个元素的 margin box 的左边，与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此
- BFC 的区域不会与 float box 叠加
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
- 计算 BFC 的高度时，浮动元素也参与计算

BFC 由以下之一创建：

- 根元素
- 浮动元素 float，值为 left|right|inherit，不能是 none
- 使用`position: absolute;`或`position: fixed;`的元素
- 使用 overflow ，值为：hidden|auto|scroll ，不能是 visible
- `display: flex`
- `display: inline-block`
- 表格单元格：`display: table-cell`
- 表格标题：`display: table-caption`

### BFC 作用

1. **解决 margin 重叠的问题**

同一个 BFC 下的两个相邻的盒子会出现垂直 margin 重叠的问题，通常可以为其中一个盒子添加一个父元素，并使其触发 BFC，即可解决这个问题

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

2. **浮动带来的布局问题**

在同一个 BFC 下即使有元素浮动，BFC 下元素的最左边边缘总是会与包含它的盒子左边相接触，那么就会出现浮动元素遮盖了其他元素的情况。

试想，在一个 BFC 内如果存在一个 float 元素和一个 div，浮动元素会遮盖住 div，此时，如果给这个 div 构建一个新的 BFC，由于 BFC 特性，内外不相互影响，此时 div 会被 float 元素挤开

比如下面这个例子，绿色盒子会因为浮动遮盖住红色的盒子，但由于两个盒子都在同一个 BFC（body 元素）下，根据 BFC 特性，红色盒子会与包含块相接，此时只要让红色盒子触发 BFC，我们为红色盒子添加一个触发 BFC 的条件`overflow:hidden`，此时红色盒子由于 BFC 的特性隔离开绿色，这样就可以通过 float 元素的方式实现两栏布局

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

1. **清除浮动**

在触发 BFC 后，这个盒子的高度将包含浮动元素的高度。当一个父元素中包含了浮动元素，而浮动元素超出了父元素，此时为父元素创建 BFC，那么浮动元素就会包裹进这个 BFC，解决了父元素中高度塌陷的问题

如下示例，两个 div 由于设置了`float:left`使其浮动，导致了父元素高度的坍塌，此时给父元素添加一个`overflow:hidden`属性值，使其触发 BFC，由于 BFC 下的盒子会包含浮动元素的高度，
因此盒子就被撑了起来

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

::: tip IFC

IFC 指的是行级格式化上下文，布局规则：

1. 行级上下文内部的盒子会在水平方向，一个接一个地放置
2. 当一行不够的时候会自动切换到下一行
3. 行级上下文的高度由内部最高的内联盒子的高度决定

:::

## CSS 选择器

- 通配符：`*`
- id 选择器：`#id`
- class 选择器：`.class`
- 元素选择器：`p`、`a` 等
- 后代选择器：`p span`、`div a` 等
- 一级子元素选择器：选择元素的直接子元素，如`div > span`作用于第一级子元素，而后代选择器会作用于全部子孙元素
- 伪类选择器：`a:hover` 等
- 属性选择器：`input[type="text"]` 等
- 相邻元素选择器：如`.box1 ~ .box2`

### 选择器权重

1、样式优先级算法：

- 就近原则，同权重情况下样式定义最近者为准
- 载入样式以最后载入的定位为准

2、优先级为：

- `!important` > 行内样式 > #id > .class > 元素和伪元素 > `*` > 继承 > 默认
- 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）

3、权重的规则：

- `!important`：最高权重
- 行内样式：1000
- id 选择器：100
- class 选择器：10
- 标签选择器：1

如：

- `div {}`，权重为 1
- `.class1 {}`，权重为 10
- `#id1 {}`，权重为 100
- `#id1 div {}`，权重为 100 + 1 = 101
- `.class1 div {}`，权重为 10 + 1 = 11
- `.class1 .class2 div {}`，权重为 10 + 10 + 1 = 21

## 伪类、伪元素

- 伪类用于当已有的元素处于某个状态时，为其添加样式
- 伪元素用于创建不在文档树中的元素，并为其添加样式

### 伪类

伪类是选择器的一种，用于选择处于特定状态的元素，用一个冒号表示

- `:hover` 鼠标悬浮状态
- `:focus` 元素本身获得焦点
- `:focus-within` 元素本身及子元素获得焦点
- `:root` 选择文档的根元素，即 html 元素
- `:first-child` 父元素的第一个子元素
- `:last-child` 父元素的最后一个子元素
- `:nth-child(n)` 父元素的第 n 个子元素
- `:nth-child(odd)` 父元素下所有奇数索引位置的子元素
- `:nth-child(even)` 父元素下所有偶数索引位置的子元素
- `:nth-last-child(n)` 父元素的倒数第 n 个子 元素
- `:only-child` 父元素的唯一子元素
- `:first-of-type` 同级同类型元素中第一个元素
- `:last-of-type` 同级同类型元素中最后一个 元素
- `:nth-of-type(n)` 同级同类型元素中第 n 个元 素
- `:nth-last-of-type(n)` 同级同类型元素中倒数第 n 个元素
- `:only-of-type` 同级同类型元素中唯一的元素
- `:empty` 向没有子元素（包括文本内容）的元素添加样式
- `:not` 不处于某个状态
- `:checked` 单/复选框开关选中的状态
- `:disabled` 禁用状态
- `:valid` 校验通过状态
- `:invalid` 校验不通过状态
- `:target` URL 的锚点
- `:link` 访问过的链接
- `:visited` 未访问过的链接
- `:placeholder-shown` 输入框有占位符时的情况（即用户还未输入时）

### 伪元素

用两个冒号表示

- `::before`
- `::after`
- `::selection` 被用户选中的部分
- `::placeholder` 输入框的占位符文本

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

## CSS 变量

CSS 变量（也称为自定义属性）是一种在 CSS 中定义并重复使用的值的方式

- 使用两个横线`--`前缀来定义变量
- 可以在任何 CSS 属性中使用，更加灵活和可维护
- 可快速更改整个网站的样式

例如，以下代码定义了一个名为`primary-color`的变量，并将其用作背景颜色和字体颜色的值：

```css
:root {
  --primary-color: #007bff; /* 定义全局变量 */
}

body {
  background-color: var(--primary-color); /* 引用全局变量 */
  color: var(--primary-color);
}
```

### :root{}是什么

`:root{}` 是一个 CSS 伪类选择器，用于选取文档树的根元素，即 html 元素。通常用于定义全局 CSS 变量和全局样式

由于根元素是文档中唯一的元素，因此在 :root 中定义的任何样式都将应用于整个文档中的所有元素，除非被覆盖或继承覆盖

### var()函数

var() 函数是用于引用 CSS 变量的 CSS 函数，它接受一个参数，即要引用的 CSS 变量的名称，并且还可以接受一个可选参数，即当引用的变量未定义时要使用的备用值。例如：

```css
button {
  background-color: var(--main-color, #ccc);
}
```

### css 变量只能在:root{}中定义吗

CSS 变量可以在任何选择器中定义，但变量的作用域将限制在定义它们的规则块内

在 :root 选择器中定义的变量可以在任何规则块中引用。在其他选择器中定义的变量通常用于当前元素和子元素的样式，不能在父元素和兄弟元素中使用

### 如何通过 js 更改 css 变量

```js
document.documentElement.style.setProperty('--primary-color', '#ff6347');
```

### 使用 css 变量有什么需要注意的地方

1. 兼容性：CSS 变量是 CSS3 中的特性，不是所有的浏览器都支持。在使用 CSS 变量之前，需要仔细考虑浏览器兼容性问题，并提供备用方案

2. 作用域：CSS 变量的作用域是它们被定义的规则块的作用域，即它们只在定义它们的规则块中可见

3. 命名规范：变量的名称需要有意义和明确，并避免与现有样式属性冲突。变量名称需要使用双连字符`--`前缀，并且不能以数字开头

4. 变量的值类型：注意变量值的类型和它们被引用的属性的类型是否相匹配。比如变量值是 color 类型，就不能用在 width 上

5. 动态更新：CSS 变量的值可以在运行时通过 js 动态更新，这可能会导致样式的意外更改

## position 定位

- `relative` 相对定位，元素占据文档位置，可以有偏移
- `absolute` 绝对定位，元素不占位置，相对于父元素定位
- `fixed` 固定在视窗某一位置
- `sticky` “粘”在视窗某一位置

上下左右的偏移距离：`top`、`left`、`bottom`、`right`

## 清除浮动

**浮动元素会脱离文档流并向左/向右浮动，直到碰到父元素或者另一个浮动元素**

清除浮动是为了清除使用浮动元素产生的影响。浮动会导致父元素高度坍塌，从而导致页面后面的布局不能正常显示

推荐采用`::after`伪元素方法清理浮动

```css
.clearfix {
  /*触发IE6中的 hasLayout*/
  zoom: 1;
}
.clearfix::after {
  content: '';
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
```

## img 空白空隙问题

img 元素默认样式导致，因为行内元素默认的垂直对齐方式是基准线 baseline

解决方案：

1. 将 img 设置为块级元素：`display: block;`
2. 设置父元素 div：`line-height: 0;`
3. 设置 img 浮动：`float: left;`
4. 设置父元素：`font-size: 0;`
5. 设置 img 对齐方式：`vertical-align: top`，top、bottom、middle 都可以

## 如何设置文字小于 12px

可以使用 scale 缩小，这个属性只可以缩放可以定义宽高的元素

```css
/* <span class="box">好小的文字呀</span> */

.box {
  font-size: 10px;
  display: inline-block;
  transform: scale(0.7);
}
```

## 元素竖向的百分比设定

对于一些表示竖向距离的属性，例如 `padding-top`、`padding-bottom`、`margin-top`、`margin-bottom`等，当按百分比设定，依据的是父容器的**宽度**，而不是高度

```css
/*
<div class="box1">
  <div class="box2"></div>
</div> 
*/

.box1 {
  width: 200px;
  height: 100px;
  background-color: #eee;
}
.box2 {
  width: 10px;
  height: 10px;
  padding-top: 30%;
  background-color: #f00;
}
```

## 隐藏元素的方式

- `display: none;` 不占据页面位置
- `opacity: 0;` 占据页面位置
- `visibility: hidden;` 占据页面位置
- `transform:scale(0,0)` 将元素缩放为 0，占据页面位置
- 使用绝对定位将元素移出可视区域内
- 通过 z-index 负值，来使其他元素遮盖住该元素
- 通过 clip/clip-path 元素裁剪的方法来实现元素的隐藏，占据页面位置

## rgba()和 opacity 的区别

二者均可设置透明度，使用`opacity`后子元素会继承父元素的透明效果，设置`rgba`元素的子元素不会继承透明效果

### opacity

opacity 属性能够设置的范围值 `0.0 ~ 1.0`，值越小越透明

ie9 以下使用滤镜 `filter: alpha(opacity=x)`，x 取值从 0 到 100，值越小越透明

如果项目为了要兼容 ie8 及以下，则需要写两段代码

```css
.box {
  opacity: 0.5;
  filter: alpha(opacity=50);
}
```

### rgba

rgba 是 rgb 的扩展，增加了透明度，如`background-color: rgba(0, 0, 0, 0.5);`

- `alpha`参数介于 `0.0 ~ 1.0`之间，值越小越透明
- 小数点前的 0 可以省略
- ie9 以下不兼容

## calc()设置流式布局宽高

calc 是英文单词 calculate(计算)的缩写，支持到 IE9，是 css3 提供的一个在 css 文件中计算值的函数，用于动态计算长度值

- 运算符前后都需要保留一个空格，例如：`width: calc(100% - 10px);`
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

## border 边框

### 边框图片

```css
border-image: linear-gradient(#1be9f5, #2c7074) 2 2;
```

### outline

设置轮廓样式，outline 和 border 很类似，但是 outline 不占据空间，绘制于元素内容周围

```css
outline: 2px solid #f00;
outline: none;
```

### 圆角

## background 背景

<https://developer.mozilla.org/zh-CN/docs/Web/CSS/background>

1. `background-color`：背景颜色
2. `background-image`：背景图片
3. `background-size`：背景图片大小
4. `background-position`：背景图片位置
5. `background-repeat`：背景图片重复
6. `background-origin`：指定`background-image`属性的原点位置的背景相对区域
7. `background-attachment`：决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动
8. `background-clip`：设置背景图片或颜色是否延伸到边框、内边距盒子、内容盒子下面
9. `background-blend-mode`：背景图片、背景色如何混合

background 缩写

示例：背景图片占满容器，并始终在容器的中心位置

```css
.bg {
  background-image: url('./bg.jpg');
  background-size: cover;
  background-position: center center;
}
```

## 可替换元素

通过修改某个属性值，呈现的内容就可以被替换的元素就是可替换元素，CSS 可以影响它的位置，但不会影响到它自身的内容

可替换元素：`<iframe>`、`<video>`、`<img>`、`<embed>`

### object-fit

指定可替换元素的内容在元素盒区域中的**填充方式**

```css
object-fit: contain;
object-fit: cover;
object-fit: fill;
object-fit: none;
object-fit: scale-down;
```

- `contain` 内容将被缩放，以保持其宽高比。如果宽高比与框的宽高比不匹配，该内容将被添加“黑边”
- `cover` 在保持宽高比的同时填充元素的整个内容框。如果宽高比与内容框不匹配，将会被**剪裁**
- `fill` 完全填充，如果宽高比与内容框不匹配，将会被**拉伸**
- `none` 保持原有尺寸
- `scale-down` 内容的尺寸与 `none` 或 `contain` 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些

> 黑边：是屏幕中显示的内容除了正常影像外，两侧或四周多出来的未显示区域。因该区域为黑色，故称之为黑边。黑边的产生是由于原始影像与屏幕的尺寸规格不同所造成的

### object-position

指定可替换元素的内容在元素盒区域中的**位置**

```css
object-position: top center;
object-position: right top;
object-position: left bottom;
object-position: 50% 50%;
object-position: 200px 100px;
object-position: 100px;
```

## 设置页面小图标

在 head 标签引入

```html
<link rel="shortcut icon" type="image/x-icon" href="cxp.ico" />
```

## 改变页面鼠标样式

```css
* {
  cursor: url(https://chokcoco.github.io/demo/boom/cd_glowsword.cur), auto !important;
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

- 文本对齐：`text-align`，可选值：left、center、right
- 首行缩进 2 个字

```css
text-indent: 2em;
```

- 字体设置

```css
font: 600 16px/30px 微软雅黑;
```

表示字体粗 600，字体大小 16px，行高 30px，微软雅黑字体

### text-overflow

文本超出部分截断

单行文本超出显示省略号：

```css
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
```

### text-decoration

文字划线

- `text-decoration: none;` 默认
- `text-decoration: underline;` 下划线
- `text-decoration: overline;` 上滑线
- `text-decoration: line-through` 中线

### 文字换行

1、强制换行，行尾会将一个完整的单词拆开

```css
word-break: break-all;
```

2、行尾不会拆解单词，如果宽度不够会放到下一行，尾部会有空白

```css
word-wrap: break-word;
```

### text-transform

指定文本大小写

- `capitalize` 每个单词的首字母转换为大写，其他的字符保留不变
- `uppercase` 所有字符被转换为大写
- `lowercase` 所有字符被转换为小写
- `none` 阻止所有字符的大小写被转换

### letter-spacing

设置文本字符的间距。正值会让字符分布的更远，负值会让字符更接近

```css
letter-spacing: normal;
letter-spacing: 0.5em;
letter-spacing: 6px;
letter-spacing: -1px;
```

- 字母之间的间距 `letter-spacing`
- 单词之间间距 `word-spacing`

### white-space

空格处理

- `nowrap`：使文本永不换行
- `pre`：保留空格和换行符，无法自动换行
- `pre-wrap`：保留空格和换行符，可以自动换行

### text-shadow

文本阴影

### 文本效果

```css
.box {
  text-shadow: 0 0 10px rgb(68, 217, 236), 0 0 30px rgb(84, 203, 247), 0 0 50px rgb(32, 180, 230), 0 0 70px rgb(23, 162, 231),
    0 0 90px rgb(19, 125, 224), 0 0 110px rgb(7, 80, 122), 0 0 130px rgba(14, 62, 158, 1);
}
```

## 兼容性

### 清除默认样式

每个浏览器的 CSS 默认样式不尽相同，最简单直接的就是使用通配符，但是有性能问题

```css
* {
  margin: 0;
  padding: 0;
}
```

也可以使用第三方库清除默认样式，如[normailze.css](https://github.com/necolas/normalize.css)

### 添加浏览器私有属性

在一些 CSS3 属性前加入`-webkit-`、`-moz-`、`-ms-`或`-o-`

```css
.box {
  display: -webkit-flex;
  display: -ms-flex;
  display: flex;
}
```

在 vscode 中可以使用 Autoprefixer 插件

## aspect-ratio

可以定义盒子的宽高比。假如想始终保持元素的宽高比，在响应式布局中等比放大缩小，就可以使用该属性

```css
aspect-ratio: auto;
aspect-ratio: 0.5;
aspect-ratio: 1 / 2;
aspect-ratio: 16 / 9;
```

## 混合模式

`mix-blend-mode`属性描述了**元素的内容**应该与**元素的直系父元素的内容**和**元素的背景**如何混合

```css
mix-blend-mode: normal;
mix-blend-mode: multiply;
mix-blend-mode: screen;
mix-blend-mode: overlay;
mix-blend-mode: darken;
mix-blend-mode: lighten;
mix-blend-mode: color-dodge
mix-blend-mode: color-burn;
mix-blend-mode: hard-light;
mix-blend-mode: soft-light;
mix-blend-mode: difference;
mix-blend-mode: exclusion;
mix-blend-mode: hue;
mix-blend-mode: saturation;
mix-blend-mode: color;
mix-blend-mode: luminosity;

mix-blend-mode: initial;
mix-blend-mode: inherit;
mix-blend-mode: unset;
```

## CSS 优化

1、加载性能

- css 打包压缩
- 减少使用`@import`,而建议使用 link

2、选择器性能

- 减少使用通配符`*`
- 尽量少用后代选择器，降低选择器的权重值
- 可以通过继承的属性，避免对这些属性重复指定规则

3、渲染性能

- 添加浏览器前缀，带浏览器前缀的在前。标准属性在后
- 属性值为 0 时，不加单位
- 以 0 开头的浮动小数，可以省略小数点之前的 0
- css 雪碧图，一张图片上有多个小图标，通过背景定位显示单个图标。减少页面的请求次数，但是图片尺寸会变大

4、可维护性

- 将具有相同属性的样式抽离出来，整合并通过 class 在页面中进行使用，提高 css 的可维护性
- 样式与内容分离：将 css 代码定义到外部 css 中
