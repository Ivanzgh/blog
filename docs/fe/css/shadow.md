# 阴影

## box-shadow

绘制边框阴影

语法:

```css
box-shadow: h-shadow v-shadow blur spread color inset;
```

参数表示：水平阴影偏移量、垂直阴影偏移量、阴影模糊半径、阴影扩散半径、阴影颜色、是否内侧阴影

示例:

```css
/*四周外阴影*/
box-shadow: 0 0 5px 5px #ccc;
/*四周内阴影*/
box-shadow: inset 0px 0px 5px 1px #000;

/*左*/
box-shadow: -10px 0 5px -5px #333;
/*右*/
box-shadow: 10px 0 5px -5px #333;
/*上*/
box-shadow: 0 -10px 5px -5px #333;
/*下*/
box-shadow: 0 10px 5px -5px #333;

/*右下*/
box-shadow: 5px 5px 1px 1px #666;
/*右上*/
box-shadow: 5px -5px 1px 1px #666;
/*左下*/
box-shadow: -5px 5px 1px 1px #666;
/*左上*/
box-shadow: -5px -5px 1px 1px #666;
```

多重阴影，以逗号分隔

```css
.box {
  background-color: #ff0;
  box-shadow: 0 0 100px #0f0 inset, 20px 20px 50px #f00;
}
```

## text-shadow

绘制文字阴影

语法:

```css
text-shadow: h-shadow v-shadow blur color;
```

示例：

```css
h1 {
  text-shadow: 10px 10px 3px #f00;
}
```

## drop-shadow

`drop-shadow`和`box-shadow`效果类似，但是 `box-shadow` 属性在元素的整个框后面创建一个矩形阴影，而
`drop-shadow()` 过滤器则是创建一个**符合图像本身形状**的阴影

```css
filter: drop-shadow(offset-x offset-y blur-radius spread-radius color);
```

示例：

```css
.box {
  width: 200px;
  height: 200px;
  background-color: #ff0;
  margin: 0 auto;
  filter: drop-shadow(5px 5px 10px black);
  /* box-shadow: 5px 5px 10px black; */
  position: relative;
}
.box::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  left: 0;
  top: -50px;
  border: 20px solid transparent;
  border-bottom-color: #f00;
}
```
