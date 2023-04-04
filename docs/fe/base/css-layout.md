# 布局

## flex 布局

<https://www.processon.com/view/link/62ecd60ae401fd1b18071d48>

<https://the-echoplex.net/flexyboxes/>

<https://www.cnblogs.com/nuannuan7362/p/5823381.html>

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block; width:100%; height:500px;" src="https://www.processon.com/embed/62e696b45653bb071617d8d0"></iframe>

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

<https://juejin.cn/post/6854573220306255880> (有些属性已废弃，要筛选)

```css
.container {
  display: grid;
  /* grid-template-columns属性定义每一列的列宽，grid-template-rows属性定义每一行的行高。 */
  grid-template-columns: repeat(4, 60px);
  grid-template-rows: repeat(2, 60px);
  /* grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式， 
        grid-row-gap属性设置行与行的间隔（行间距），grid-column-gap属性设置列与列的间隔（列间距）
        这里设置的是10 行与行之间 列与列之间 都是10 */
  grid-gap: 10px;
  /* item在这个单元格中的位置，justify-items属性设置单元格内容的水平位置（左中右），align-items属性设置单元格内容的垂直位置（上中下） */
  align-items: center;
  justify-items: center;
  /* justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）。 */
  justify-content: center;
  align-content: center;

  width: 100%;
  height: 500px;
  background: #f3f3f3;
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

### 方法一、内外边距相抵消

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

### 方法二、flex 布局

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

1、使用`-webkit-line-clamp`属性（需要浏览器支持），可以限制行数

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

2、利用伪元素实现，兼容性好，但是需要知道文本容器的高度

```css
.box {
  width: 100px;
  overflow: hidden;
  height: 70px;
  position: relative;
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

3、如果文本容器高度不固定，可以通过 js 动态计算高度，再配合伪元素实现

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
