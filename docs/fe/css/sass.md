# Sass

## 变量

```scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

## 嵌套

不要过度嵌套，否则难以维护

```scss
nav {
  color: #fff;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: inline-block;
  }
}
```

## 模块拆分

- 以下划线开头命名的 Sass 文件，如 `_base.scss`
- 下划线让 Sass 知道该文件只是部分文件，不应将其生成为 CSS 文件
- 模块与 `@use` 规则一起使用

```scss
// _base.scss
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}

// styles.scss
@use 'base';

.inverse {
  background-color: base.$primary-color;
  color: white;
}
```

## @mixin 混入

创建可复用的代码片段

```scss
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, 0.25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```

## @extend 扩展

共享一组 css 属性。编译后的每个 class 类都将获得相同的属性，可以避免在 html 上写多个 class 类名

```scss
%message {
  color: #333;
}

.message {
  @extend %message;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}
```

编译后的代码：

```css
.error,
.success,
.message {
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}
```

## 数学运算

`math.div()` 除法运算符

## @function 函数

## @if 条件语句

```scss
@mixin avatar($size, $circle: false) {
  width: $size;
  height: $size;

  @if $circle {
    color: #fff;
  }
}

.square-av {
  @include avatar(100px, $circle: false);
}
.circle-av {
  @include avatar(100px, $circle: true);
}
```

输出结果：

```scss
.square-av {
  width: 100px;
  height: 100px;
}

.circle-av {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
```

条件语句：`@else`、`@else if`

```scss
@if $circle == a {
  color: #fff;
} @else if $circle == b {
  color: #000
} @else {
  color #333;
}
```

## @each 遍历

```scss
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    width: $size;
  }
}
```

遍历键值对

```scss
$icons: (
  'a': '#f00',
  'b': '#ff0',
  'c': '#fff'
);

@each $name, $color in $icons {
  .icon-#{$name} {
    color: $color;
  }
}
```
