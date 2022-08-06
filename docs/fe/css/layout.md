# 布局

## flex 布局

<https://www.processon.com/embed/62e696b45653bb071617d8d0>

<https://the-echoplex.net/flexyboxes/>

<https://www.yuque.com/linxz/flex>

## grid 布局

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
也就是在辅轴上将所有子项目拉伸为同一高度（或宽度）以保持对齐。

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
