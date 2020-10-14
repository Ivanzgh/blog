# css

## 盒模型

页面中的每个标签元素都由几个部分组成：内容(content)、内边距(padding)、边框(border)、外边距(margin)

![image](https://user-gold-cdn.xitu.io/2018/9/23/16604521485d9947?imageView2/0/w/1280/h/960/format/webp/ignore-error/1 =750x500)

标准盒模型：`width = content`

IE盒模型：`width = content + padding + border`

### margin特性

margin始终是透明的。

http://www.hicss.net/do-not-tell-me-you-understand-margin/

#### 1、给子盒子设置margin-top后，父盒子也跟着子盒子一块向下移动

这个问题发生的原因是根据规范，一个盒子如果没有上补白(padding-top)和上边框(border-top)，
那么这个盒子的上边距会和其内部文档流中的第一个子元素的上边距重叠。

解决办法：给父div设置border-top或者padding-top。

### padding特性

行内元素的内边距对左、右、下起作用。

行内元素的外边距只对左、右起作用。

给行内元素加上绝对定位后，行内元素的内边距和外边距对左、右、上、下均起作用

## 优先级算法

+ 优先级就近原则，同权重情况下样式定义最近者为准;
+ 载入样式以最后载入的定位为准;

 优先级为:
 
 + 同权重: 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。
 + !important >  id > class > tag
 + !important 比 内联优先级高
 
### 权重的规则
标签的权重为1，class的权重为10，id的权重为100
```css
 /*权重为1*/
  div{}

  /*权重为10*/
  .class1{}

  /*权重为100*/
  #id1{}

  /*权重为100+1=101*/
  #id1 div{}

  /*权重为10+1=11*/
  .class1 div{}

  /*权重为10+10+1=21*/
  .class1 .class2 div{}
```

## BFC规范
### 块级格式化上下文：block formatting context

（W3C CSS 2.1 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。）
   一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。
   不同类型的 Box,会参与不同的 Formatting Context（决定如何渲染文档的容器）,因此Box内的元素会以不同的方式渲染,也就是说BFC内部的元素和外部的元素不会互相影响。
   
### BFC特性和创建条件
特性:
+ 内部的Box会在垂直方向，从顶部开始一个接一个地放置。
+ Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生叠加
+ 每个元素的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
+ BFC的区域不会与float box叠加。
+ BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。
+ 计算BFC的高度时，浮动元素也参与计算。

BFC由以下之一创建：
+ 根元素或其它包含它的元素
+ 浮动 (元素的 float 不是 none)
+ 绝对定位的元素 (元素具有 position 为 absolute 或 fixed)
+ 内联块 inline-blocks (元素具有 `display: inline-block`)
+ 表格单元格 (元素具有 `display: table-cell`，HTML表格单元格默认属性)
+ 表格标题 (元素具有 `display: table-caption`, HTML表格标题默认属性)
+ 块元素具有overflow ，且值不是 visible
+ display:flow-root

### BFC作用
   
#### 解决margin重叠的问题
同一个BFC下的两个相邻的盒子会出现垂直margin重叠的问题，通常我们可以为其中一个盒子添加一个父元素，并使其触发BFC，即可解决这个问题
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        .box {
            <!--关键点-->
            overflow: auto   
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
#### 浮动带来的布局问题

在同一个BFC下即使有元素浮动，BFC下元素的最左边边缘总是会与包含它的盒子左边相接触，那么就会出现浮动元素遮盖了其他元素的情况。
BFC还有一条重要特性：BFC的区域不会与float box 重叠。试想，在一个BFC，如果存在一个float元素，和一个div，浮动元素会遮盖住div，
此时，如果给这个div构建一个新的BFC，由于BFC特性，内外不相互影响，此时div会被float元素挤开。

比如下面这个例子，绿色盒子会因为浮动遮盖住红色的盒子，但由于两个盒子都在同一个BFC（body元素）下，根据BFC特性，
红色盒子会与包含块相接，此时只要让红色盒子触发BFC，我们为红色盒子添加一个触发BFC的条件`overflow:hidden`，
此时红色盒子由于BFC的特性隔离开绿色，这样我们就可以通过float元素的方式实现两栏布局。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
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
            <!--关键点-->
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

#### 清除浮动
在触发BFC后，这个盒子的高度将包含浮动元素的高度，在计算时，浮动元素会参与高度计算，我们可以理解为，当一个父元素中包含了浮动元素，
而浮动元素超出了父元素，此时我们为父元素创建BFC，那么浮动元素就会包裹进这个BFC解决了父元素中高度塌陷的问题。

如下面的例子，div.parent包含了两个div.child，而两个div由于赋予了`float:left`使其浮动，导致了div.parent高度的坍塌，
此时我们给div.parent添加一个`overflow:hidden`属性值，使div.parent触发BFC，由于BFC下的盒子会包含浮动元素的高度，
因此盒子就被撑了起来，高度塌陷的问题也就得到了解决。
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
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

## div水平垂直居中

### 负margin
确定容器的宽高，设置层的外边距
```css
 div {
 	position: absolute;	
 	width:500px;
 	height:300px;
 	top: 50%;
 	left: 50%;
 	margin: -150px 0 0 -250px;     	/* 外边距为自身宽高的一半 */
 	background-color: pink;	 
  }
```
### transform
未知容器的宽高，利用 `transform` 属性
```css
 div {
 	position: absolute;	
 	top: 50%;
 	left: 50%;
 	transform: translate(-50%, -50%); //移动自身长度的一半
 	background-color: pink;	 
 }
```
### margin auto
确定容器的宽高
```html
<div class="container">
    <div class="box-center">
        box-center
    </div>
</div>

<style>
    .container {
        width: 500px;
        height: 300px;
        border: 1px solid red;
        position: relative;
    }

    .box-center {
        width: 100px;
        height: 100px;
        background-color: red;
        color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
</style>
```

### calc()
确定容器的宽高,
通过calc计算属性减去元素本身高度和宽度的一半。

```css
 .box-center {
    position: absolute;
    width: 200px;
    height: 100px;
    top: calc(50% - 50px);
    left: calc(50% - 100px);
    background-color: pink;
}
```

### flex布局
未知容器的宽高，利用 flex 布局，实际使用时应考虑兼容性

```html
 <!--html-->
 <div class="box3">
    <div class="container"></div>
</div>

<!--css-->
 html, body, .box3 {
    height: 100%;
    <!--容器要给高度-->
}

.box3 {
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}

.box3 .container {
    width: 200px;
    height: 200px;
    background-color: #ff0;
}
```

### grid布局
未知容器的宽高
```css
    .container {
        width: 500px;
        height: 300px;
        border: 1px solid red;

        display: grid;
        justify-items: center;
        align-items: center;
    }

    .box-center {
        width: 100px;
        height: 100px;
        background-color: red;
        color: #fff;

        text-align: center;
    }
```

### css-table
未知容器的宽高，通过`display: table-cell`把div元素变为table元素
```css
    .container {
        width: 500px;
        height: 300px;
        border: 1px solid red;

        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }

    .box-center {
        width: 100px;
        height: 100px;
        background-color: red;
        color: #fff;

        display: inline-block;
    }
```


**推荐用法**

+ PC端有兼容性要求，宽高固定，推荐absolute + 负margin

+ PC端有兼容要求，宽高不固定，推荐css-table

+ PC端无兼容性要求，推荐flex

+ 移动端推荐使用flex

## 初始化样式
```css
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
  h1, h2, h3, h4, h5, h6{ font-size:100%; }
  address, cite, dfn, em, var { font-style:normal; }
  code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
  small{ font-size:12px; }
  ul, ol { list-style:none; }
  a { text-decoration:none; }
  a:hover { text-decoration:underline; }
  sup { vertical-align:text-top; }
  sub{ vertical-align:text-bottom; }
  legend { color:#000; }
  fieldset, img { border:0; }
  button, input, select, textarea { font-size:100%; }
  table { border-collapse:collapse; border-spacing:0; }
```

## box-sizing
`box-sizing : content-box` 标准盒模型

`box-sizing : border-box` IE的怪异盒模型

使用场景分析：当需要以`content + padding + border`为整体的时候使用`border-box`，例如：底部菜单栏等

支持到IE8

## border-radius
https://www.jianshu.com/p/4640e9e8375e

## 改变页面鼠标样式
```css
* {
    cursor: url(https://chokcoco.github.io/demo/boom/cd_glowsword.cur),auto !important;
}
```

## calc()设置流式布局宽高

calc是英文单词calculate(计算)的缩写，支持到IE9

### vh、vw

 viewport：可视窗口，也就是浏览器。
 
 vw Viewport宽度，1vw等于viewport宽度的1%
 
 vh Viewport高度，1vh等于viewport高的的1%
 
### calc()
 
calc 是css3提供的一个在css文件中计算值的函数,用于动态计算长度值。
+ 运算符前后都需要保留一个空格，例如：width: calc(100% - 10px)；
+ 任何长度值都可以使用calc()函数进行计算；
+ calc()函数支持 "+", "-", "*", "/" 运算；
+ calc()函数使用标准的数学运算优先级规则；

`calc(100vh - 10px)`  表示整个浏览器窗口高度减去10px的大小;

`calc(100vw - 10px)`   表示整个浏览器窗口宽度减去10px的大小 

如果用了CSS预处理器（less,scss）会被它们先解析，这时需要禁用解析 `calc(~ '100vh - 64px')` (less的写法）

例如在vue项目中使用element-ui设置el-card的高度
```css
  /*定义全局el-card的高度*/
  #app .el-card{
    min-height: calc(100vh - 80px);
  }
```

## rgba()和opacity的区别
二者均可设置透明度,使用opacity后子元素会继承父元素的透明效果，设置rgba元素的子元素不会继承透明效果

### opacity

```css
#box{
    background-color:rgb(125,25,0);
    opacity: 0.5
}
```
IE9, Firefox, Chrome, Opera 和 Safari 使用属性 opacity 来设定透明度。

opacity 属性能够设置的值从 0.0 到 1.0。值越小，越透明。

IE8 以及更早的版本使用滤镜 `filter:alpha(opacity=x)`。x 能够取的值从 0 到 100。值越小，越透明。

所以如果项目为了要兼容IE8及以下，则需要写两段代码
```css
#box{
    background-color:rgb(125,25,0);
    opacity: 0.5;
    filter:alpha(opacity=50); /* 针对 IE8 以及更早的版本 */
}
```

### rgba

```css
#box{
    background-color: rgba(0, 0, 0, .5);
}
```

RGBA 颜色值是 RGB 颜色值的扩展，带有一个 alpha 通道 - 它规定了对象的不透明度。

RGBA 颜色值得到以下浏览器的支持：IE9+、Firefox 3+、Chrome、Safari 以及 Opera 10+。

RGBA 颜色值是这样规定的：`rgba(red, green, blue, alpha)`。alpha 参数是介于 0.0（完全透明）与 1.0（完全不透明）的数字。

那么对于IE8及以下需要做以下兼容：
```css
#box{
    filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr=#80000000,endColorStr=#80000000);
}
```
其中：#88000000 的前两位数字控制透明度，取值16进制从00 -> FF（越小越透明），00表示完全透明，FF就是全不透明，后面六位是色值。

::: warning
如果在IE9里面同时使用这RGBA两种方法时，会造成冲突而无法做到透明度的实现。
而对于opacity是可以两个一起写，没有冲突问题！
:::

## transition
transition: <过度属性> <过渡时间> <过度模式>
```
transition: background 6s linear;
```
过度模式：transition-timing-function

+ ease 缓慢开始，缓慢结束
+ linear 匀速
+ ease-in 缓慢开始
+ ease-out 缓慢结束
+ ease-in-out 缓慢开始，缓慢结束(与ease稍有区别)

## 清除浮动
**浮动元素会脱离文档流并向左/向右浮动，直到碰到父元素或者另一个浮动元素。**

清除浮动是为了清除使用浮动元素产生的影响。浮动会导致父元素高度坍塌，而高度的塌陷使我们页面后面的布局不能正常显示。

主推采用`:after`伪元素方法清理浮动
```css
.clearfix {
    /*触发IE6中的 hasLayout*/
    zoom: 1;
}
.clearfix:after {
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}
```

## 设置3D场景
### 使用transform属性调整元素

使用3D场景：`transform-style: preserve-3d;`

#### transition(位移操作)
+ translateX(x px)
+ translateY(y px)
+ translateZ(z px)
#### rotate(旋转操作)
+ rotateX(x deg)
+ rotateY(y deg)
+ rotateZ(z deg)

`perspective` 设置从何处查看一个元素的角度：

`perspective-origin`  设置一个3D元素的基数位置：
```html
<div class="box">
    <div class="content"></div>
</div>

.box{
    perspective: 800px;
    perspective-origin: 50% 50%;
    transform-style: preserve-3d;
}
.content{
    width: 300px;
    height: 300px;
    background: #0f0;
    margin: 100px auto;
    transform: rotateX(45deg);
}
```

#### 使用transform-origin调整旋转中心

X轴：left , center, right

Y轴：top , center , bottom

Z轴：length px

## 设置body高度100%自适应屏幕
一个对象的高度是否可以用百分比显示取决于父级对象。在浏览器默认状态下没有给body高度，
所以需要给html和body设置`height：100%`，子元素才能正常显示

## 设置页面小图标
在head标签引入
```html
 <link rel="shortcut icon" type="image/x-icon" href="cxp.ico" />
```

## 外边距合并
当两个垂直外边距相遇时，它们将形成一个外边距。

合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

![](http://www.w3school.com.cn/i/ct_css_margin_collapsing_example_1.gif)

w3school介绍网址： http://www.w3school.com.cn/css/css_margin_collapsing.asp

**解决方法**

统一设置margin-top或者margin-bottom，不要混合使用。

## 伪元素
`:after`、`:before`