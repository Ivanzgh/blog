# 布局

## flex 布局

<https://www.processon.com/view/link/62ecd60ae401fd1b18071d48>

<https://the-echoplex.net/flexyboxes/>

<https://www.yuque.com/linxz/flex>

## grid 布局

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

### 三栏布局

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
<!--....................-->
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

## 两边宽度固定，中间自适应

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .left {
        width: 200px;
        height: 100px;
        background-color: #f00;
        float: left;
      }
      .right {
        width: 200px;
        height: 100px;
        background-color: #f0f;
        float: right;
      }
      .middle {
        height: 200px;
        background-color: #00f;
        margin: 0 200px 0 200px;
      }
    </style>
  </head>
  <body>
    <div class="left">left</div>
    <div class="right">right</div>
    <div class="middle">middle</div>
  </body>
</html>
```

关键点在于中间部分设置左右 margin 等于左右两边的宽度，middle 部分放到最后渲染

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
