# 渐变

## 线性渐变

语法:

```css
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```

direction 表示渐变方向，后面表示多个渐变颜色，透明度可使用`rgba()`

示例:

```css
background-image: linear-gradient(90deg, #f00, #0f0);
```

使用场景：背景、边框、文本

### 渐变方向

渐变方向默认**从上到下**

- 角度值，如 `90deg`，度数可为负值，顺时针方向
  - `0deg`：从下到上渐变
  - `90deg`：从左往右
- 方向值关键词：
  - `to top`：从下到上
  - `to right`：从左到右
  - `to bottom`：从上到下
  - `to left`：从右到左
  - `to top right` 或 `to right top`：从左下到右上
  - `to top left` 或 `to left top`：从右下到左上
  - `to bottom right` 或 `to right bottom`：从左上到右下
  - `to bottom left` 或 `to left bottom`：从右上到左下

### 颜色位置

可以指定颜色停止点的位置，单位可以是百分比、px、em 等

```css
background-image: linear-gradient(red 20%, yellow 50%, green 100%);
```

在这个例子中，颜色从红色开始，到 20% 处变成黄色，到 50% 处变成绿色，然后从 50% 到 100% 保持绿色

### 重复渐变

```css
background-image: repeating-linear-gradient(90deg, #f00, #0f0 8%, #00f 20%);

/* 在每隔 20px 的地方重复一次从红色到蓝色的 45 度角度的渐变效果 */
background-image: repeating-linear-gradient(45deg, red, blue 20px);
```

### 多重渐变

```css
background-image: linear-gradient(to right, red, blue), linear-gradient(to bottom, green, yellow);
```

### 常见效果

示例：变色的文字

```css
/* <div class="box">天下无敌</div> */

.box {
  font-weight: 700;
  text-fill-color: transparent;
  background-image: linear-gradient(left, #007eef, #dc5cb6 25%, #007eef 50%, #dc5cb6 75%, #007eef);
  background-size: 200%, 100%;
  background-clip: text;
  animation: word 3s linear infinite;
}
@keyframes word {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
```

## 径向渐变

默认情况下，渐变的中心是 center（表示在中心点），渐变的形状是 ellipse（表示椭圆形），渐变的大小是 farthest-corner（表示到最远的角落）。

语法:

```css
background-image: radial-gradient(shape size at position, start-color, ..., last-color);
```

shape 有 circle 圆形和 ellipse 椭圆形

size 有 4 个参数

- closest-side
- farthest-side
- closest-corner
- farthest-corner

closest-side 指定径向渐变的半径长度为从圆心到离圆心最近的边

closest-corner 指定径向渐变的半径长度为从圆心到离圆心最近的角

farthest-side 指定径向渐变的半径长度为从圆心到离圆心最远的边

farthest-corner 指定径向渐变的半径长度为从圆心到离圆心最远的角

示例:

```css
.box {
  width: 500px;
  height: 300px;
  background-image: radial-gradient(circle, #f00, #ff0, #0f0);
}
```

设置形状和发散方向

```css
background-image: radial-gradient(circle at top, orange, green);
```

### 重复径向渐变

```css
background-image: repeating-radial-gradient(circle 50px, orange, green);
```

## 圆锥渐变

[conic-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/conic-gradient) 渐变的颜色围绕一个中心点旋转

```css
background: conic-gradient(red, orange, yellow, green, blue);

/* 一个旋转 45 度的锥形渐变，从蓝色渐变到红色 */
background: conic-gradient(from 45deg, blue, red);

/* 一个蓝紫色框：从蓝色渐变到红色，但只有右下象限可见，因为锥形渐变的中心位于左上角 */
background: conic-gradient(from 90deg at 0 0, blue, red);
```
