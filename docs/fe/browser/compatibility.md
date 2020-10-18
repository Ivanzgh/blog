# 浏览器兼容性问题

## hack及IE条件注释
```html
<!--[if IE]>
此处文字能够在IE浏览器下显示，其它浏览器不显示
<![endif]-->
```

```html
<!--[if !IE]><!-->
此处文字能够在非IE浏览器下显示，IE浏览器不显示
<!--<![endif]-->
```

```html
<!--[if IE 6]>
这段文字只在IE6浏览器显示
<![endif]-->
```

```html
<!--[if gte IE 6]>
这段文字只在IE6以上(包括)版本IE浏览器显示
<![endif]-->
```

```html
<!--[if ! IE 8]>
这段文字在非IE8浏览器显示
<![endif]-->
```

gt : greater than，大于

lt : less than，小于

gte : greater than or equal，大于等于

lte : less than or equal，小于等于

! : 选择条件版本以外所有版本，无论高低

## 兼容性插件
### Normalize.css
不同的浏览器的默认样式存在差异，可以使用`normalize.css`初始化样式库。
```
<link href="https://cdn.bootcss.com/normalize/7.0.0/normalize.min.css" rel="stylesheet">
```
简单粗暴法：
```
* {margin : 0;padding : 0;}
```
### html5shiv.js
解决IE9以下浏览器对HTML5新增标签不识别的问题。
```
<!--[if lt IE 9]>
  <script type="text/javascript" src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<![endif]-->
```
### respond.js
解决IE9以下不支持CSS3媒体查询的问题。
```
<script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
```
### picturefill.js
解决 IE 9 10 11 等浏览器不支持 `<picture>` 标签的问题
```
<script src="https://cdn.bootcss.com/picturefill/3.0.3/picturefill.min.js"></script>
```
