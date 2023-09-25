# 布局

## flex 布局

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block; width:100%; height:500px;" src="https://www.processon.com/embed/62e696b45653bb071617d8d0"></iframe>

在线体验：<https://the-echoplex.net/flexyboxes/>

### flex 属性

假设在 1 个 500px 的容器中，我们有 3 个 100px 宽的元素，那么这 3 个元素需要占 300px 的宽，剩下 200px 的**可用空间**。

#### flex-basis

定义元素的空间大小，默认值是`auto`，例子中的元素空间大小就是 100px

#### flex-grow

元素会以`flex-basis`为基础，沿主轴方向增长尺寸，可以按比例分配可用空间

假如所有元素都设置`flex-basis: 1`，则可用空间被平分

示例中，假如第一个元素设置`flex-basis: 2`，其余两个设置为`flex-basis: 1`，则第一个元素分配到 100px，其余元素各分配到 50px

#### flex-shrink

元素收缩，只有在 flex 元素总和超出主轴才会生效

#### flex 简写

简写按这个顺序书写: `flex-grow`、`flex-shrink`、`flex-basis`

预定义的简写形式：

- `flex: initial`： 相当于`flex: 0 1 auto`，不拉伸，可收缩
- `flex: auto`： 相当于`flex: 1 1 auto`，可拉伸，可收缩
- `flex: none`： 相当于`flex: 0 0 auto`，不可伸缩
- `flex: 正整数`：`flex: 1`或者`flex: 2`等，相当于`flex: 1 1 0`，元素可以在`flex-basis: 0`的基础上伸缩

## gird 布局

是一个基于二维网格的布局系统

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;width:100%; height:500px;" src="https://www.processon.com/embed/642aa37a3aff4d5813d340cf"></iframe>

### 网格容器

使用`display: grid`或`display: inline-grid`创建一个网格容器，这个元素的所有**直系子元素**将成为网格元素

一个网格元素也可以成为一个网格容器

- 网格单元：单元格，行列线交叉形成
- 网格区域：网格元素向行或列的方向扩展一个或多个单元，形成网格区域，是矩形

### 网格轨道

一个网格轨道就是网格中任意两条线之间的空间

- `grid-template-rows`：定义行轨道，设置行高
- `grid-template-columns`：定义列轨道，设置列宽

以下是关键字和函数：

1、 `grid-template-rows: 100px 100px;` 表示 2 行，每行高度是 100px

2、 repeat 函数，可以简化重复的值，第一个参数是重复的次数，第二个参数是要重复的值

`grid-template-columns: repeat(2, 100px)`

3、 `fr` 代表网格容器中可用空间的一等份

`grid-template-columns: 200px 1fr 2fr` 表示第一个列宽为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3

4、 `auto-fill` 表示自动填充，让一行或者一列中尽可能的容纳更多的单元格

`grid-template-columns: repeat(auto-fill, 200px)` 表示列宽是 200px，但列的数量是不固定的

5、 `minmax`函数，设置长度范围

`grid-template-columns: 1fr 1fr minmax(300px, 2fr)` 表示第三个列宽最小是 300px，最大不能大于前两列宽的两倍

6、 `auto` 由浏览器决定长度，可轻易实现两列或三列布局

`grid-template-columns: 100px auto 100px` 表示第一、第三列为 100px，中间由浏览器决定长度

### 网格线

在定义网格时，定义的是网格轨道，而不是网格线。利用网格线可以灵活的生成复杂的布局

- `grid-row-start: 1;` 表示行线开始位置，这里是 1
- `grid-row-end: 3;` 表示行线结束位置，这里是 3
- `grid-column-start: 1;` 表示列线开始位置，这里是 1
- `grid-column-end: 4;` 表示列线结束位置，这里是 4
- `grid-row: 1 / 3;` 表示行线的简写形式
- `grid-column: 1 / 4;` 表示列线的简写形式

示例：

1. 从左至右，第一个元素从行线 1 延伸到行线 3，占据了两个行轨道。从列线 1 开始，延伸至列线 4，即独占一行
2. 第二个元素从行线 3 到行线 5，跨越了两个行轨道
3. 第三个元素从列线 2 到列线 4，跨越了两个列轨道
4. 剩下的元素会自动放到网格剩余的空间中

```html
<div class="wrapper">
  <div class="box1">One</div>
  <div class="box2">Two</div>
  <div class="box3">Three</div>
  <div class="box4">Four</div>
  <div class="box5">Five</div>
</div>
```

```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 100px;
}
.wrapper div {
  background-color: #f2f2f2;
  border: 1px solid #333;
}
.box1 {
  grid-row: 1 / 3;
  grid-column: 1 / 4;
}
.box2 {
  grid-row: 3 / 5;
}
.box3 {
  grid-column: 2 / 4;
}
```

### 网格间距

- `gap`：简写形式
- `gap-row`：行间距
- `gap-column`：列间距

注意：`grid-gap`、`grid-row-gap`、`grid-column-gap`应避免使用，即将废弃

### 显隐式网格

如果用 `grid-template-columns` 属性定义了列轨道，让网格按所需的内容创建行，这些行会被创建在隐式网格中

显式网格包含了在 `grid-template-columns` 和 `grid-template-rows` 属性中定义的行和列

指定隐式创建的行轨道大小：

- `grid-auto-rows`：隐式行的大小
- `grid-auto-columns`：隐式列的大小

示例：`grid-auto-rows: minmax(100px, auto);` 表示行高最小 100px，高度随内容撑开

### grid-auto-flow

控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列

- `row`：按照逐行填充来排列元素，在必要时增加新行
- `column`：按照逐列填充来排列元素，在必要时增加新列
- `dense`：使用一种“稠密”堆积算法，如果后面出现了稍小的元素，则会试图去填充网格中前面留下的空白。这样做会填上稍大元素留下的空白，但同时也可能导致原来出现的次序被打乱
- `row dense`：行优先的“稠密”堆积算法，表示尽可能填充，而不留空白
- `column dense`：列优先的行有限的“稠密”堆积算法

### grid-template-areas

```html
<div class="box">
  <div class="a">a</div>
  <div class="b">b</div>
  <div class="c">c</div>
  <div class="d">d</div>
</div>
```

```css
.box {
  display: grid;
  width: 100%;
  /* 给定高度，撑开内容 */
  height: 250px;
  grid-template-areas:
    'a a'
    'b c'
    'b d'; /* 2.区域划分 当前为 三行 两列 */
  grid-template-rows: 50px 1fr 30px; /* 3.各区域 宽高设置 */
  grid-template-columns: 150px 1fr;
}
.box div {
  border: 1px solid #333;
}
.a {
  /* 指定当前元素所在的区域位置，从 grid-template-areas 选取值 */
  grid-area: a;
  background-color: #f00;
}
.b {
  grid-area: b;
  background-color: #ff0;
}
.c {
  grid-area: c;
  background-color: #f0f;
}
.d {
  grid-area: d;
  background-color: #00f;
}
```

如果需要空白，就写一个点 `.`

```css
.box {
  grid-template-areas:
    'a a .'
    'b . c'
    'b d .';
}
```

### 对齐位置

1、整个内容区域在容器里面的位置

- `justify-content`：水平位置
- `align-content`：垂直位置
- `place-content`：简写

```css
.box {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;
}
```

2、内容在单元格中的位置

- `justify-items`：水平位置
- `align-items`：垂直位置
- `place-items`：简写
- `justify-self`：用法同`justify-items`，但只作用于单个项目
- `align-self`：用法同`align-items`，但只作用于单个项目
- `place-self`：简写

```css
.box {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}
```

### grid 实现响应式布局

#### fr 实现等分响应式布局

```css
.box {
  grid-template-columns: 1fr 1fr 1fr;
}
```

#### 固定列宽、改变列数量

网格固定列宽，并根据容器的宽度来改变列的数量

```css
.box {
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

#### 列宽度自适应

上个例子中，右侧一般会留下空白，下方示例可以让列的宽度能在某个范围自适应

```css
.box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px 20px;
  grid-auto-rows: 50px;
}
```

## 水平垂直居中

### 已知容器的宽高

- 负`margin`，设置外边距为自身宽高的一半

```css
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 200px;
  margin: -100px 0 0 -200px;
}
```

- margin 设为`auto`

```css
.box {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

- 通过`calc`计算属性减去自身宽高的一半

```css
.box {
  position: absolute;
  width: 200px;
  height: 100px;
  top: calc(50% - 50px);
  left: calc(50% - 100px);
}
```

### 未知容器的宽高

- 利用`transform`属性，移动自身长度的一半

```css
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- flex 布局

```css
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- grid 布局

```css
.box {
  display: grid;
  justify-items: center;
  align-items: center;
}
```

- `display: table-cell`，把元素变为`table`元素，不推荐

```css
.container {
  width: 500px;
  height: 300px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.box-center {
  width: 100px;
  height: 100px;
  background-color: red;
  display: inline-block;
}
```

## 两栏布局

左侧定宽，右侧自适应

假设结构如下：

```html
<style>
  .left {
    background-color: #0ff;
  }
  .right {
    background: #0f0;
  }
</style>

<div class="box">
  <div class="left">11111</div>
  <div class="right">
    33333
    <div class="info">22222</div>
  </div>
</div>
44444
```

1. flex 布局

```css
.box {
  display: flex;
  height: 300px;
}
.left {
  width: 200px;
}
.right {
  flex: 1;
}
```

2. grid 布局

```css
.box {
  height: 300px;
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: 300px;
}
```

3. 浮动布局

```css
.box {
  height: 300px;
  /* 创建BFC，防止父元素高度塌陷 */
  overflow: hidden;
}

.left {
  float: left;
  width: 200px;
  height: 100%;
}

.right {
  height: 100%;
  margin-left: 200px;
}
```

4. 定位

```css
.box {
  height: 300px;
  position: relative;
}
/* 方式一： */
.left,
.right {
  position: absolute;
  top: 0;
  height: 100%;
}
.left {
  left: 0;
  width: 200px;
}
.right {
  left: 200px;
  right: 0;
}
/* 方式二： */
.left {
  position: absolute;
}
.right {
  margin-left: 200px;
}
```

## 三栏布局

两边定宽，中间自适应

假设结构如下：

```html
<style>
  .left {
    background-color: #f00;
  }
  .middle {
    background-color: #0f0;
  }
  .right {
    background-color: #00f;
  }
</style>

<div class="box">
  <div class="left">1</div>
  <div class="middle">2</div>
  <div class="right">3</div>
</div>
```

1. flex 布局

```css
.box {
  display: flex;
  height: 300px;
}
.left {
  width: 200px;
  min-width: 200px;
}
.middle {
  flex: 1;
}
.right {
  width: 200px;
}
```

2. grid 布局

```css
.box {
  display: grid;
  grid-template-columns: 200px auto 200px;
  grid-template-rows: 300px;
}
```

3. 浮动布局

```css
.box {
  /* 创建BFC，防止父元素高度塌陷 */
  overflow: hidden;
}

.left {
  float: left;
  width: 200px;
  height: 300px;
}
.middle {
  height: 300px;
  margin-left: 200px;
  margin-right: 200px;
}
.right {
  float: right;
  width: 200px;
  height: 300px;
}
```

此时要调整 Dom 结构

```html
<div class="box">
  <div class="left">1</div>
  <div class="right">3</div>
  <div class="middle">2</div>
</div>
```

4. 定位

```css
.box {
  position: relative;
  height: 300px;
}
.left {
  position: absolute;
  left: 0;
  width: 200px;
  height: 100%;
}
.middle {
  position: absolute;
  left: 200px;
  right: 200px;
  height: 100%;

  /* 也可以使用 margin
  margin-left: 200px;
  margin-right: 200px; */
}
.right {
  position: absolute;
  right: 0;
  width: 200px;
  height: 100%;
}
```

## 多列等高布局

### 1、内外边距相抵消

父元素要设置`overflow:hidden;`子元素里边要有内容撑开高度

优点：兼容所有浏览器

```html
<div class="box8">
  <div class="box-left">
    <h1>aside</h1>
  </div>
  <div class="box-right">
    <h1>article</h1>
    <h1>article</h1>
    <h1>article</h1>
    <h1>article</h1>
    <h1>article</h1>
  </div>
</div>

<style>
  .box8 {
    margin: 0 auto;
    width: 600px;
    overflow: hidden;
  }
  .box-left {
    float: left;
    width: 150px;
    background-color: #f00;
    padding-bottom: 9999px;
    margin-bottom: -9999px;
  }
  .box-right {
    float: left;
    width: 450px;
    background-color: #00f;
    padding-bottom: 9999px;
    margin-bottom: -9999px;
  }
</style>
```

### 2、flex 布局

给父元素加上`display:flex`即可，不用设置浮动属性，这依赖于`align-items`属性，它的默认值是 `stretch`，
也就是在辅轴上将所有子项目拉伸为同一高度（或宽度）以保持对齐。下面还有子内容还需设置`height: 100%`

```css
display: flex;
align-items: stretch;
```

## 图片和文字等高

将图片作为背景图，特别适合小图标。flex 布局也行

```css
.con-title {
  height: 24px;
  line-height: 24px;
  padding-left: 40px;
  background: url('danger.png') no-repeat left center;
}
```

## 父元素设置 min-height，子元素设置 height:100%失效

```html
<div class="box">
  <div class="child"></div>
</div>

<style>
  .box {
    min-height: 300px;
    background-color: #09f;
  }
  .child {
    height: 100%;
    background-color: #f00;
  }
</style>
```

方案一、给父元素设置`position: relative`，子元素设置 `position: absolute`

```css
.box {
  position: relative;
}
.child {
  position: absolute;
  width: 100%;
}
```

方案二、给父元素设置包裹元素，设置 flex 布局

```html
<div class="box-wrap">
  <div class="box">
    <div class="child"></div>
  </div>
</div>

<style>
  .box-wrap {
    display: flex;
  }
  .box {
    width: 100%;
  }
</style>
```

方案三、父元素设置 grid 布局

```css
.box {
  display: grid;
}
```

方案四、使用 flex 改变布局方向，但是子元素会 100%占满父元素，不能设置比如 50%

```css
.box {
  display: flex;
  flex-direction: column;
}
.child {
  flex: auto;
}
```

## 文本超出显示省略号

### 单行文本

`<div class="box">单行文本显示省略号</div>`

```css
.box {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

分别设置：不换行、隐藏超出部分、显示省略号。宽度必须固定

### 多行文本

1、使用`-webkit-line-clamp`属性（不支持 IE 浏览器），可以限制行数

```css
.box {
  width: 100px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

2、利用伪元素实现，兼容性好，但是需要知道文本容器的高度，而且在文字没有超出容器时也会显示省略号，适合文字都会超出容器的场景

```css
.box {
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 70px;
}
.box::after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 4px;
  background-color: white;
}
```

3、通过 js 动态计算，兼容性好

```css
.content {
  position: relative;
  overflow: hidden;
  height: 66px;
  line-height: 33px;
  font-size: 16px;
  font-weight: 400;
  color: #626262;
}
```

```js
function textOverflowMore(className) {
  var elList = document.getElementsByClassName(className);
  for (var i in elList) {
    var el = elList[i];
    var text = el.innerHTML;
    if (!text || !text.length) return;
    for (var i = 0; i <= text.length; i++) {
      el.innerHTML = text.substr(0, i);
      // 超出元素的高度溢出换行
      if (el.offsetHeight < el.scrollHeight) {
        el.style.overflow = 'hidden';
        // 将末尾的三个文字用...取代
        el.innerHTML = text.substr(0, i - 3) + '...';
        break;
      }
    }
  }
}

textOverflowMore('.content');
```

### flex 布局时显示省略号

当文本内容为数字或者字母时候，flex 布局无法将数字或字母截断实现换行，需要强制换行`word-break: break-all;`

```html
<div class="box">
  <div class="text">文本超出显示省略号文本超出显示省略号文本超出显示省略号文本超出显示省略号文本超出显示省略号</div>
  <div class="text">文本超出显示省略号文本超出显示省略号文本超出显示省略号文本超出显示省略号文本超出显示省略号</div>
  <div class="text">文本超出显示省略号文本超出显示省略号文本超出显示省略号文本超出显示省略号文本超出显示省略号</div>
</div>

<style>
  .box {
    display: flex;
    border: 1px solid red;
  }
  .text {
    min-width: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
```

### 展示全文

使用 title 属性

```html
<div title="文本超出显示省略号文本超出显示省略号文本超出显示省略号">
  文本超出显示省略号文本超出显示省略号文本超出显示省略号
</div>
```
