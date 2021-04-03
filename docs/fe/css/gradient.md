# 渐变

## 线性渐变

语法:

```css
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
```

direction 表示渐变方向，后面表示多个渐变颜色。若需要透明度可使用`rgba()`

示例:

```css
.box {
  width: 500px;
  height: 300px;
  background-image: linear-gradient(90deg, #f00, #0f0);
}
```

渐变方向默认从上到下，参数为 0 度时，从下到上渐变；90 度从左往右；度数可为负值。

### 重复线性渐变

```css
background-image: repeating-linear-gradient(90deg, #f00, #0f0 8%, #00f 20%);
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
