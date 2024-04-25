# HTML

## HTML 历史和版本

HTML（Hypertext Markup Language）是超文本标记语言，用于创建网页的结构和内容

HTML 的发展历史：[wiki](https://zh.wikipedia.org/wiki/HTML)

- HTML1.0：1993 年 6 月，这是 HTML 的最早版本，用于创建基本的文本和链接
- HTML2.0：1995 年 11 月，2000 年 6 月被宣布已经过时，引入了一些新的元素和属性，如表格和表单元素
- HTML3.2：1997 年 1 月 14 日
- HTML 4.0：1997 年 12 月 18 日
- HTML4.01：1999 年 12 月 24 日，引入了 CSS 支持，使得网页样式更加可控
- XHTML：2000 年 1 月，XHTML（可扩展超文本标记语言）要求文档符合 XML 规范
- HTML5：2014 年 10 月 28 日，HTML5 是 HTML 的最新主要版本，引入多媒体元素、本地存储、Canvas 绘图 API、新的语义元素以及更多的表单控件。

## DOCTYPE 的作用

`<!DOCTYPE html>`指定了当前 HTML 文档的版本和类型，以帮助浏览器正确地呈现页面。目的是确保浏览器按照规范来渲染页面，以避免不同浏览器之间的兼容性问题

## HTML 元素和标签的区别

HTML 元素由起始标签、内容和结束标签组成，如`<p>html</p>`。HTML 标签只是元素的起始和结束部分，如`<p>`和`</p>`

## HTML5 新特性

- 语义化元素，如 `header`、`nav`、`footer`、`section`、`main`、`article`、`aside`
- 多媒体元素，如 `video`、`audio`
- 本地存储，如 localStorage、sessionStorage
- 新表单控件，calendar、date、time、email、url、search ，如 `<input type='date'>`、`<input type='email'>`
- 支持 Canvas 和 SVG 绘图
- 拖拽 API
- 地理 API
- webworker
- websocket

## 块级元素、行内元素

块级元素，`display: block;`，独占一行，默认宽度由父容器决定，默认高度由内容决定。

常见的有`<div>`、`<p>`、`<h1>`至`<h6>`、`<ul>`、`<ol>`、`<li>`、`<form>`、`<table>`、`<header>`、`<footer>`、`<nav>`、`<section>`、`<article>`、`<blockguote>`等

行内元素，`display: inline`，不会独占一行，

- 默认宽高由内容决定，直接设置宽高无效
- 对 margin 和 padding 仅设置左右方向有效，上下无效（上下可以设置，但是不占据空间）
- 可以设置行高
- 行内元素中不能放块级元素

常见的有 `<span>`、`<a>`、`<strong>`、`<b>`、`<em>`、`<i>`、`<br>`、`<code>`、`<sub>`、`<sup>`、`<cite>`、`<abbr>`等

行内块级元素，`display: inline-block`，不独占一行

- 默认宽高是自身内容宽高，可以设置宽高
- 之间会有空白间隙

常见的有`<img>`、`<input>`、`<button>`、`<textarea>`、`<select>`等

## 标签默认样式

常用页面标签的默认样式、自带属性、不同浏览器的差异、处理浏览器兼容问题的方式

1、默认样式

- `<h1>`到`<h6>`标签：标题标签具有不同的字体大小和加粗程度
- `<p>`标签：段落标签通常有一些默认的外边距和内边距
- `<ul>`和`<ol>`标签：无序列表和有序列表通常有默认的项目符号或编号样式
- `<a>`标签：链接标签通常以不同颜色和下划线显示

2、自带属性

- `<a>`标签：href 属性用于指定链接
- `<img>`标签：src 属性用于指定图像的来源
- `<input>`标签：用于创建表单输入字段，具有多种类型（如文本、密码、复选框等）
- `<form>`标签：用于创建表单，action 属性用于指定表单提交的地址

3、不同浏览器的差异

可以使用 CSS 重置样式或规范化样式表，以确保不同浏览器的表现一致

4、处理浏览器兼容问题的方式

- 使用 CSS Reset 或 Normalize.css
- 使用浏览器前缀：`-webkit-`、`-moz-`、`-ms-`
- 使用`@supports`规则，检测浏览器是否支持特定的 CSS 功能

## 无序列表、有序列表

```html
<!-- 无序列表 -->
<ul>
  <li>z</li>
  <li>g</li>
  <li>h</li>
</ul>

<!-- 有序列表 -->
<ol>
  <li>z</li>
  <li>g</li>
  <li>h</li>
</ol>
```

## HTML 嵌套规则

- 块级元素可以嵌套行内元素
- p 标签里面不能放块级元素，否则渲染时会出现两个 p 元素
- `<ul>` 和 `<ol>`标签必须包含 `<li>`
- `<table>`、`<tr>`、`<th>`、`<td>`
- 自闭合元素：`<img>`、`<br>`

## HTML 的元数据

元数据提供关于文档的信息，通常包含在`<head>`部分，常见包括：`<title>`、`<link>`、`<meta>`

### meta 标签

深入了解`<meta>`标签的各种属性，如字符集、视口设置、作者信息等，以及它们对 SEO 和移动友好性的影响

1、字符集设置：通过 charset 属性，可以指定网页的字符编码

```html
<meta charset="UTF-8" />
```

2、视口设置：viewport 属性用于控制网页在移动设备上的布局和缩放

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

3、描述：description 属性用于提供网页的简短描述，通常在搜索结果中显示。良好的描述可以吸引用户点击链接，并有助于 SEO

```html
<meta name="description" content="这是一个示例网站的描述" />
```

4、关键字：keywords 属性已不再被大多数搜索引擎用于排名，但仍然可以用于说明网页的主题

```html
<meta name="keywords" content="关键词1, 关键词2, 关键词3" />
```

5、作者：author 属性可用于指定网页的作者信息，对于博客和新闻网站很有用

```html
<meta name="author" content="zgh" />
```

6、Robots：robots 属性可以控制搜索引擎的爬虫如何索引和处理网页。常见的选项包括 index（允许索引）、noindex（不允许索引）、follow（允许跟踪链接）、nofollow（不允许跟踪链接）等

```html
<meta name="robots" content="index, follow" />
```

## HTML 实体字符

HTML 实体字符是一种用实体编码表示特殊字符的方式。以下是一些常见的 HTML 实体字符：

- `&amp;` & 符号(和号)
- `&lt;` < 符号 (小于号)
- `&gt;` > 符号 (大于号)
- `&quot;` " 符号 (双引号)
- `&apos;` ' 符号 (单引号)
- `&nbsp;` 不断行空格
- `&copy;` 版权符号 ©
- `&reg;` 注册商标符号 ®
- `&trade;` 商标符号 ™
- `&euro;` 欧元符号 €
- `&pound;` 英镑符号 £
- `&yen;` 日元符号 ¥
- `&cent;` 分符号 ¢
- `&dollar;` 美元符号 $
- `&deg;` 度符号 °
- `&frac12;` 分数 1/2
- `&frac14;` 分数 1/4
- `&frac34;` 分数 3/4
- `&plusmn;` 正负号 ±
- `&times;` 乘号 ×
- `&divide;` 除号 ÷
- `&alpha;` 希腊字母 α (Alpha)
- `&beta;` 希腊字母 β (Beta)
- `&gamma;` 希腊字母 γ (Gamma)
- `&delta;` 希腊字母 δ (Delta)

## HTML 语义化和 ARIA

### 语义化

语义化是指使用适当的 HTML 元素来描述文档的结构和内容，以便提高可读性和可维护性。有助于搜索引擎理解文档的内容，并提供无障碍性

- 根据内容的类型，选择合适的标签，即用正确的标签做正确的事情
- 让页面的内容结构更清晰
- 在没有`CSS`的情况下也能呈现较好的内容结构
- 搜索引擎的爬虫也依赖于`HTML`标记来确定上下文和各个关键字的权重，利于`SEO`

不要千篇一律的用`div`，使用语义化更好的标签：`header`、`nav`、`footer`、`section`、`article`、`aside`等

### 可访问性

使用 ARIA（可访问性相关的 HTML 属性）来增强可访问性 HTML

## 表单和输入类型

深入了解 HTML 表单元素，包括各种输入类型，如文本框、单选按钮、复选框、下拉框等。学习如何验证表单数据以及使用 HTML5 中的新表单属性

```html
<form action="/submit" method="post">
  <label for="username">用户名：</label>
  <input type="text" id="username" name="username" />
  <input type="submit" value="提交" />
</form>
```

- name：表单项的字段标识

### label

label 标签用于定义表单元素的标签文本。

- for 属性用于指定与该标签关联的表单控件的 id 属性
- 当用户点击 label 标签时，浏览器会自动将焦点转移到与之相关联的表单控件上

```html
<label for="username">用户名：</label>
<input type="text" id="username" name="username" />
```

## 表单校验

### 校验提示

当 input 输入框失去焦点就触发校验事件，在点击提交时让每个 input 都触发校验

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>表单验证</title>
    <style type="text/css">
      .error {
        display: none;
        color: #f00;
      }
    </style>
  </head>
  <body>
    <form method="post">
      <p>用户名：</p>
      <p>
        <input type="text" name="username" class="auth" />
        <span class="error">用户名至少3位！</span>
      </p>
      <p>密码：</p>
      <p>
        <input type="password" name="password" class="auth" />
        <span class="error">密码至少6位！</span>
      </p>
      <p>确认密码：</p>
      <p>
        <input type="password" name="respassword" class="auth" />
        <span class="error">两次密码不一致！</span>
      </p>
      <p>邮箱：</p>
      <p>
        <input type="text" name="email" class="auth" />
        <span class="error">邮箱格式不正确！</span>
      </p>
      <p>手机号码：</p>
      <p>
        <input type="text" name="phone" class="auth" maxlength="11" />
        <span class="error">手机号码错误！</span>
      </p>
      <button type="button" class="loginbtn">OK</button>
    </form>
  </body>
  <script src="jquery-3.3.1.js"></script>
  <script type="text/javascript">
    $('input[name=username]').blur(function () {
      if (this.value.length < 3) {
        $(this).next().show();
      } else {
        $(this).next().hide();
      }
    });
    $('input[name=password]').blur(function () {
      if (this.value.length < 6) {
        $(this).next().show();
      } else {
        $(this).next().hide();
      }
    });
    $('input[name=respassword]').blur(function () {
      var val1 = $('input[name=password]').val();
      if (val1 != this.value) {
        $(this).next().show();
      } else {
        $(this).next().hide();
      }
    });

    $('input[name=email]').blur(function () {
      if (!this.value.match(/^\w+@\w+\.\w+$/i)) {
        $(this).next().show();
      } else {
        $(this).next().hide();
      }
    });
    $('input[name=phone]').blur(function () {
      if (!this.value.match(/^1\d{10}$/)) {
        $(this).next().show();
      } else {
        $(this).next().hide();
      }
    });

    $('.loginbtn').click(function () {
      $('.auth').blur();

      let formData = $('form').serialize(); // 获取表单值的URL编码字符串
      let formDataArray = $('form').serializeArray(); // 获取表单值的对象数组

      console.log(formData);
      console.log(formDataArray);

      var data = {};
      $.each(formDataArray, function (i, obj) {
        data[obj.name] = obj.value;
      });
      console.log(data);
    });
  </script>
</html>
```

### 校验分页器跳转框

```js
// <input type="text" id="pageJump" oninput="validateInput(this)" />

var tatalPage = 5;

function validateInput(inputElement) {
  // 移除非数字字符
  inputElement.value = inputElement.value.replace(/\D/g, '');
  // 确保输入是正整数，如果输入是非正整数，则默认为1
  if (inputElement.value !== '' && parseInt(inputElement.value) <= 0) {
    inputElement.value = '1';
  }
  // 将输入值限制在最大值内
  const inputValue = parseInt(inputElement.value);
  if (inputValue > tatalPage) {
    inputElement.value = tatalPage.toString();
  }
}
```

## 多媒体

深入了解如何嵌入音频、视频和其他多媒体内容，以及不同浏览器之间的兼容性问题

### video 视频

```js
<video width="320" height="240" controls>
  <source src="video.mp4" type="video/mp4" />
  <source src="video.ogg" type="video/ogg" />
  Your browser does not support the video tag
</video>
```

1、controls 属性指定是否显示媒体控件

2、poster 提供预览图

```js
<video src="index.mp4" poster="pos.img"></video>
```

3、autoplay 自动播放

4、loop 是否循环播放

### audio 音频

## iframe 嵌入

iframe 能将另一个网页嵌入到当前网页中

```html
<iframe
  name="oaIframe"
  style="width: 100%; height: calc(100vh - 56px);margin:-20px;border:none"
  src="https://abc.com"
/>
```

- 需要注意跨域 CORS、是否允许嵌入等安全隐患限制
- 最好是通过 js 动态的给 iframe 添加 src 属性
- allowFullScreen 属性：允许全屏

缺点：

1. iframe 会阻塞主页面的 onload 事件
2. 搜索引擎的检索程序无法解读这种页面，不利于 SEO
3. iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，会影响页面的并行加载

### sandbox

- allow-scripts
- allow-top-navigation
- allow-same-origin
- allow-forms

### X-Frame-Options

[X-Frame-Options](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/X-Frame-Options)

### Content-Security-Policy

[Content-Security-Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Security-Policy#%E5%AF%BC%E8%88%AA%E6%8C%87%E4%BB%A4)

配置 nginx

```sh
# 允许所有
add_header Content-Security-Policy "frame-ancestors *"

# 允许指定域名
add_header Content-Security-Policy "frame-ancestors https://abc.com"
```

### iframe 嵌套站点无法登录的问题

场景：以 iframe 标签嵌入一个现有的项目到网站中，嵌入的网站无法正常登录，直接在浏览器地址栏输入 url 并登录是正常的

观察登录接口的响应头发现：Set-Cookie 后面有一个警告 ⚠️

警告信息显示：写入 Cookie 失败。原因是没有显式设置 cookie 的 SameSite 属性，默认为 Lax，又因为响应的接口属于非顶层导航的跨站请求，浏览器将其屏蔽了

- [HTTP Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)
- [Set-Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie#samesitesamesite-value)

SameSite 是一种用于增强安全性的 Cookie 属性，规定了在跨站点请求时是否发送 Cookie。默认情况下，SameSite 属性是 Lax

解决办法：设置 `SameSite=None`

以下是在 Spring Boot 中配置 SameSite=None 的步骤：

1. 首先确保 Spring Boot 版本在 5.1.4 或更高版本，因为在这个版本中添加了对 SameSite 属性的支持
2. 在 Spring Boot 的配置文件（`application.properties` 或 `application.yml`）中添加以下配置：

```sh
server.servlet.session.cookie.same-site: none
server.servlet.session.cookie.secure: true
```

secure 用于指定只在 HTTPS 连接中发送 Cookie

## IE 浏览器的版本差异和时间节点

| 版本 | 发布时间 | 说明                                                                                                |
| :--- | :------- | :-------------------------------------------------------------------------------------------------- |
| IE1  | 1995 年  | 是 IE 的首个版本，最早用于 Windows 95                                                               |
| IE1  | 2001 年  | 这个版本在 Windows XP 操作系统中非常流行，但也因其不良的标准支持和安全漏洞而闻名                    |
| IE7  | 2006 年  | 引入了一些改进，包括改进的标准支持和更好的安全性                                                    |
| IE8  | 2009 年  | 进一步改善了标准支持，但在当时仍然存在与现代标准的不兼容性                                          |
| IE9  | 2011 年  | 引入了 HTML5 支持和更好的性能，但仍然存在一些兼容性问题                                             |
| IE10 | 2012 年  | 提供了更多的 HTML5 支持和改进的性能                                                                 |
| IE11 | 2013 年  | 是 IE 的最后一个主要版本。它在标准支持和性能方面有所改进，但 IE 仍然在现代 Web 标准方面存在严重不足 |

2022 年 6 月 15 日，微软宣布永久关闭 IE 浏览器

## 主流浏览器，关键版本、内核差异

|      浏览器       | 内核                                                                                                           | 关键版本                                                                                      |
| :---------------: | :------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
|   Apple Safari    | WebKit                                                                                                         | 2003 年首次发布，一些重要版本包括 Safari 1.0、Safari 3.0、Safari 5.0、Safari 14.0 等          |
|   Google Chrome   | Blink（WebKit 的分支）                                                                                         | 首个稳定版本是在 2008 年发布的                                                                |
|  Mozilla Firefox  | Gecko                                                                                                          | 2004 年首次发布，重要版本包括 Firefox 1.0、Firefox 3.0、Firefox Quantum（57.0）等             |
|  Microsoft Edge   | 2019 年以前的版本使用 EdgeHTML 内核，2019 年以后的版本基于 Chromium。而基于 Chromium 的版本使用 Blink 渲染引擎 | EdgeHTML 版本首次在 Windows 10 上发布，2019 年以后的基于 Chromium 的版本是 Edge 79 及更高版本 |
|       Opera       | 早期使用自己的 Presto 渲染引擎，自 Opera 15 版本以后基于 Chromium 的版本使用 Blink 渲染引擎                    | 1996 年首次发布，重要版本包括 Opera 7、Opera 12、Opera 15                                     |
| Internet Explorer | Trident                                                                                                        |                                                                                               |

## a 标签

```html
<a href="https://www.baidu.com" target="_top">top</a>
```

- href：超链接所指向的 URL
- target：指定在何处显示链接

### target 属性

- `_self`：当前页面加载。默认值
- `_blank`：通常在新标签页打开，但用户可以通过配置选择在新窗口打开。
- `_parent`：当前浏览环境的父级浏览上下文。如果没有父级框架，行为与 `_self` 相同。
- `_top`：最顶级的浏览上下文。如果没有，行为与 `_self` 相同。
  - 路径要写全，`https://` 不能省略，否则就时相对路径
  - 在 js 中可用`window.top.location.href = 'https://www.baidu.com'`

### download 属性

浏览器将链接的 URL 视为下载资源

```html
<a href="a.pdf" download>download</a>
```

如果链接是图片，则直接打开，不会下载

## dl、dt、dd 表格标签

dl dt dd 是一个组合型标签

dl 标签定义一个描述列表（definition list）。

dl 标签与 dt（定义项目/名字）和 dd（描述每一个项目/名字）一起使用。

```html
<dl>
  <dt>列表标题</dt>
  <dd>列表内容</dd>
  <dd>列表内容</dd>
</dl>
```

在 dl 下，dt 与 dd 处于同级标签。dd 标签可以若干。

通常使用在具有标题，而标题下对应有若干列表简单的（栏目标题+对应标题列表）和标题对应下面有内容

## 表格

- table 表格
- thead 表头
- tbody 表体
- tr 每一行
- th 定义表头单元格，列的标题，内容加粗且默认居中显示
- td 定义数据单元格，单元格的内容

```html
<table>
  <thead>
    <tr>
      <th>姓名</th>
      <th>年龄</th>
      <th>城市</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>25</td>
      <td>北京</td>
    </tr>
    <tr>
      <td>李四</td>
      <td>20</td>
      <td>上海</td>
    </tr>
    <tr>
      <td>王五</td>
      <td>18</td>
      <td>深圳</td>
    </tr>
  </tbody>
</table>
```

常用的样式：

```css
table {
  /* 合并边框 */
  border-collapse: collapse;

  /* 创建滚动条 */
  overflow: auto;
}

/* 奇数行背景色 */
tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

/* 表头固定 */
thead {
  position: sticky;
  top: 0;
}
```

## input

### 属性

1、accept 属性，指定浏览器可以处理的 MIME 类型的列表，MIME 类型是标识文档类型的标准

```html
<input type="file" accept=".jpg, .png" />
```

accept 可以接受的值有哪些？

2、autofocus 属性，自动聚焦

```html
<input type="text" autofocus />
```

3、inputmode 属性，指定文本框中输入的内容属性，帮助浏览器优化输入体验，例如在移动端自动弹出合适的虚拟键盘

与 type 属性不同的是，inputmode 属性并不会改变浏览器对 input 的处理，它仅仅是决定如何展示键盘

```html
<input type="text" inputmode="emial" />
```

可用类型：

- text：默认值，使用用户本地区域设置的标准文本输入键盘
- none：无虚拟键盘
- tel：电话输入键盘
- url：优化网址输入
- email：优化邮件地址输入
- numeric：数字输入键盘
- decimal：小数输入键盘
- search：优化搜索输入

4、pattern 属性，指定文本框中输入内容的正则表达式。错误信息可以使用 title 属性自定义

```html
<form action="">
  <input name="username" pattern="[A-Za-z0-9]" title="error" />
  <input type="submit" />
</form>
```

5、required 属性，指定表单元素是否必填，不会阻止用户提交空格或空白字符

```html
<form action="">
  <input text="text" required />
  <input type="submit" />
</form>
```

6、autocomplete 属性，指定表单元素是否启用自动完成

```html
<input autocomplete="off" />
```

可用类型：

- on：默认值，表示启用自动完成功能
- off：表示禁用自动完成功能
- name：表示使用表单元素的 name 属性作为自动完成的关键字
- email：最近输入的电子邮件地址
- username：用户名
- current-password：密码
- new-password：新密码
- tel：电话号码
- address-level1：国家或地区名称
- address-level2：省份或州名称
- address-level3：城市或地区名称
- address-level4：街道名称
- country：国家名称

7、multiple 属性，指定表单元素是否允许多选，用于下拉列表、文件上传和复选框等

```html
<input type="file" multiple />
```

8、readonly 属性，指定表单元素是否只读

```html
<input type="text" readonly />
```

9、type 属性

- text 单行文本输入框
- password 密码输入框(密码显示为`***`)
- radio 单选框
- checkbox 复选框
- file 上传文件
- button 普通按钮
- reset 重置按钮（触发表单的 reset 事件）
- submit 提交按钮（触发表单的 submit 事件）
- email 用于输入 email
- url 用于输入 url
- number 专门用于 number
- range 显示为滑动条，用于输入一定范围内的值
- date 选取日期和时间（还包含：month、week、time、datetime、datetime-local）
- color 选取颜色

### 样式

```css
input {
  /* 修改input边框样式 */
  outline: 2px solid #f00;
  outline: none;
}
```

### input 框设置只读

- readonly
- disabled
- onfocus="this.blur()"

```html
<input type="text" value="hello" readonly />

<input type="text" value="hello" disabled />

<input type="text" value="hello" onfocus="this.blur()" />
```

三种方式的区别：

1. 使用 disabled 会使输入框变灰，不可输入，不可点击，可复制
2. 使用 readonly 不可输入，可点击，不变灰，可复制
3. onfocus="this.blur()"不可输入，不可点击，不变灰，不可复制

## 表单

- `outline: none;` 取消 input、textarea 的聚焦边框
- `resize: none;` 禁止 textarea 可拖动

## 监听 input 框的值变化

```html
<input type="text" name="planLeave" readonly />
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
<script>
  $("input[name='planLeave']")
    .trigger('input')
    .bind('input propertychange', function () {
      alert('hehe');
    });
</script>
```

### select

#### 鼠标移入展开下拉框

`select`有一个`size`属性，设置`size`的值即可显示`option`的展开数量

```js
select.size = 6;
```

#### 根据后台数据设置选中项

默认选中后台返回的下拉项

```html
<select name="codeShare" id="codeShare">
  <option value="0">否</option>
  <option value="1">是</option>
</select>
<button onclick="he()">click</button>

<script>
  function he() {
    const Flag = '1'; //后台返回的数据
    $("#codeShare option[value='" + Flag + "']").attr('selected', 'selected');
  }
</script>
```

#### 通过 ajax 动态加载 select 控件下拉框的 option

[参考](https://blog.csdn.net/zhengxiangwen/article/details/46480687)

## figure、figcaption

figure 元素代表一段独立的内容，可能包含 figcaption 元素定义的说明元素。通常，figure 的内容为图像、插图、图表、代码片段等，figcaption 用于为 figure 元素添加标题和描述信息

- IE8 以下不支持
- figure 可以有多个子元素，figcaption 最好只有一个

常用于插图卡片的 hover 特效，鼠标移入显示文字、图片放大、遮罩层等

```html
<figure>
  <img src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/elephant-660-480.jpg" alt="" />
  <figcaption>
    <h2>
      标签
      <span>Figure</span>
    </h2>
    <p>Figure标签真不错，Figcaption也很棒！</p>
  </figcaption>
</figure>
```

```css
figure {
  margin: auto;
  min-width: 320px;
  max-width: 480px;
  max-height: 360px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(-45deg, #34495e 0%, #cc6055 100%);
  cursor: pointer;
}

figcaption {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 2em;
  box-sizing: border-box;
  color: #fff;
  text-align: center;
}

figure h2 {
  margin: 0;
  font-size: 30px;
  font-weight: 300;
  text-transform: uppercase;
  transform: scale(0.8);
  transition: transform 0.35s;
}

figure h2 span {
  font-weight: 600;
}

figure p {
  position: absolute;
  left: 0;
  bottom: 30px;
  margin: 20px;
  padding: 30px;
  border: 2px solid #fff;
  font-size: 18px;
  transform: scale(0.8);
  opacity: 0;
  transition: opacity 0.35s, transform 0.35s, bottom 0.35s;
}

figure img {
  opacity: 0.8;
  transition: opacity 0.35s, transform 0.35s;
}

figure:hover img {
  opacity: 0.1;
  transform: scale(2);
}

figure:hover h2 {
  transform: scale(1);
}

figure:hover p {
  transform: scale(1);
  bottom: 0;
  opacity: 1;
}
```

## contenteditable 属性

指定元素是否可编辑。可选值为：true、false、inherit，默认值为 false。可用于富文本编辑器、可编辑的表格等功能

```html
<div contenteditable="true">可编辑</div>
```

## hidden 属性

指定元素是否隐藏，功能同`display: none`

```html
<p id="hid" hidden>text</p>
```

## async 和 defer

设置 async 属性，脚本将异步加载，不会阻止页面的解析和渲染

defer 属性，用于指定脚本是否应该延迟加载，直到页面解析完成后再执行

```js
<script src="index.js" async></script>

<script src="index.js" defer></script>
```

## draggable 拖动

允许用户通过拖动元素来移动它们

## IE11 中 flex 布局兼容问题

flex:1 解析问题
原因：

```css
/* 在谷歌中flex:1;会解析为 */
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0%;

/* 在IE中被解析为 */
flex-grow: 1;
flex-shrink: 1;
flex-basis: 0px;
```

解决：将 flex:1; 更改为 flex: 1 1 auto;

父容器中 flex-direction(方向):column(列) 和 align-items:center，这俩属性同时存在， 子容器内容过多会溢出容器
原因：
IE 中 flex-shrink 的默认值为 0，既空间不足，项目不缩小，就算设置 flex-shrink:1;，因为上述两个属性同时存在，IE 依旧固执地不缩小这个项目
解决：
给子项目加 max-width:100%;或取消其中一个，并把 flex-shrink 设置为 1

flex 布局不支持 min-height 属性
解决办法：设置高度类似 height:calc(100% - 100px)，减号两边要有空格否则无效

父容器 flex-direction(方向):column(列)，img 设置宽或高危 auto 时无法保持宽高比缩放
解决办法：给 img 包一层 div

父容器 flex-direction(方向):row，img 无法保持宽高比缩放
解决办法：给 img 包一层 div；或容器设置 align-items

父容器 flex-direction(方向):row，子容器设置 flex-basis 确切值（auto 除外），子容器中 box-sizing:border-box 不会生效
解决办法：

- 子容器中 flex-basis 设置 auto，且设置 width：100%；
- 给子项再包裹一个容器，把这个容器当成 flex 容器的子项，在这个容器上设置 flex: 0 0 100%。
