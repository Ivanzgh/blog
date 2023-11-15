# 浏览器兼容性问题

## 检测是否是 IE 浏览器

```js
function isIE() {
  var userAgent = navigator.userAgent;
  var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
  if (isIE || isIE11) {
    return true;
  }
  return false;
}
```

## 检测浏览器类型

```js
function getBrowser() {
  var userAgent = navigator.userAgent;

  if (userAgent.indexOf('Chrome') != -1) {
    return 'Chrome';
  } else if (userAgent.indexOf('Safari') != -1) {
    return 'Safari';
  } else if (userAgent.indexOf('Firefox') != -1) {
    return 'Firefox';
  } else if (userAgent.indexOf('MSIE') != -1 || !!document.documentMode == true) {
    return 'Internet Explorer';
  } else {
    return 'Unknown';
  }
}
```

## hack 及 IE 条件注释

```html
<!--[if IE]>此处文字能够在IE浏览器下显示，其它浏览器不显示<![endif]-->
```

```html
<!--[if !IE]><!-->
此处文字能够在非IE浏览器下显示，IE浏览器不显示
<!--<![endif]-->
```

```html
<!--[if IE 6]>这段文字只在IE6浏览器显示<![endif]-->
```

```html
<!--[if gte IE 6]>这段文字只在IE6以上(包括)版本IE浏览器显示<![endif]-->
```

```html
<!--[if ! IE 8]>这段文字在非IE8浏览器显示<![endif]-->
```

- `gt` : `greater than`，大于
- `lt` : `less than`，小于
- `gte` : `greater than or equal`，大于等于
- `lte` : `less than or equal`，小于等于
- `!` : 选择条件版本以外所有版本，无论高低

## 兼容性插件

### Normalize.css

不同的浏览器的默认样式存在差异，可以使用`normalize.css`初始化样式库。

```html
<link href="https://cdn.bootcss.com/normalize/7.0.0/normalize.min.css" rel="stylesheet" />
```

简单粗暴法：

```css
* {
  margin: 0;
  padding: 0;
}
```

### html5shiv.js

解决 IE9 以下浏览器对 HTML5 新增标签不识别的问题。

```html
<!--[if lt IE 9]>
  <script type="text/javascript" src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<![endif]-->
```

### respond.js

解决 IE9 以下不支持 CSS3 媒体查询的问题。

```html
<script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
```

### picturefill.js

解决 IE 9 10 11 等浏览器不支持 `<picture>` 标签的问题

```html
<script src="https://cdn.bootcss.com/picturefill/3.0.3/picturefill.min.js"></script>
```
