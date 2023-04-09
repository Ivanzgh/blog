# 阴影

## box-shadow

绘制边框阴影

语法:

```css
box-shadow: h-shadow v-shadow blur spread color inset;
```

参数分别表示水平阴影位置，垂直阴影位置，模糊距离，阴影大小，阴影颜色；inset 可选，表示内侧阴影。

示例:

```css
.box {
  box-shadow: 0 0 100px #00ffff inset;
}
```

多个阴影：

```css
.box {
  box-shadow: 0 0 100px #00ffff inset, 20px 20px 50px #f00;
}
```

可以打开 Chrome 控制台找到 box-shadow 一栏点击参数前的小图标调试。

## text-shadow

绘制文字阴影

语法:

```css
text-shadow: h-shadow v-shadow blur color;
```

## filter

```css
.box {
  filter: blur(1px);
}
```
