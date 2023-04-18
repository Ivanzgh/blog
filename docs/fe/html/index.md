# HTML

## HTML 语义化

- 根据内容的类型，选择合适的标签，即用正确的标签做正确的事情
- 让页面的内容结构更清晰
- 在没有`CSS`的情况下也能呈现较好的内容结构
- 搜索引擎的爬虫也依赖于`HTML`标记来确定上下文和各个关键字的权重，利于`SEO`

不要千篇一律的用`div`，使用语义化更好的标签：`header`、`nav`、`footer`、`section`、`article`、`aside`等

## 块级元素、行内元素

### 块级元素

块级元素独占一行，宽度是父级元素的 100%，常见的有`<h1>~<h6>`、`<p>`、`<div>`、`<ul>`、`<li>`等

p 标签里面不能放块级元素，否则渲染时会出现两个 p 元素

### 行内元素

行内元素不会独占一行，直接设置宽高无效，常见的有 `<span>`、`<a>`、`<strong>`、`<b>`、`<em>`、`<i>`、`img`等

## cookies，sessionStorage 、 localStorage

- `cookie`是网站为了标示用户身份而储存在用户本地终端上的数据，通常经过加密，`cookie`数据始终在同源的`http`请求中携带，即会在浏览器和服务器间来回传递
- `sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存
- 大小
  - `cookie`数据大小不能超过**4k**。
  - `sessionStorage`和`localStorage`可以达到**5M 以上**。
- 时效
  - `localStorage`存储持久数据，浏览器关闭后数据不丢失，除非用户主动删除数据或清除浏览器缓存
  - `sessionStorage`数据在当前浏览器窗口关闭后自动删除
  - `cookie`设置的过期时间之前一直有效，即使窗口或浏览器关闭

1、**如何让 cookie 浏览器关闭就失效？**

不对`cookie`设置任何正、负或 0 时间的即可

2、**sessionStorage 在浏览器多窗口之间 (同域)数据是否互通共享?**

不会，都是独立的，`localStorage`会共享

3、**能让 localStorage 也跟 cookie 一样设置过期时间？**

可以，每次在存储的时候同时也存入一个时效时间戳，而在获取数据前，先与当前时间比较，如果小于当前时间则过期了，直接返回空的数据

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

## 表单

- `outline: none;` 取消 input、textarea 的聚焦边框
- `resize: none;` 禁止 textarea 可拖动

### input

- 禁止显示历史记录

`autocomplete="off"` 禁用自动完成功能。on 启用

- input 框设置只读

方法一、readonly

```html
<input type="text" value="hello" readonly />
<input type="text" value="hello" readonly="true" />
```

方法二、disabled

```html
<input type="text" value="hello" disabled />
<input type="text" value="hello" disabled="true" />
```

方法三、onfocus="this.blur()"

```html
<input type="text" value="hello" onfocus="this.blur()" />
```

::: tip 区别：
1、使用 disabled 会使输入框变灰，不可输入，不可点击，可复制

2、使用 readonly 不可输入，可点击，不变灰，可复制

3、onfocus="this.blur()"不可输入，不可点击，不变灰，不可复制
:::

## 监听 input 框的值变化

```html
<input type="text" name="planLeave" readonly />
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
<script>
  $("input[name='planLeave']")
    .trigger('input')
    .bind('input propertychange', function () {
      alert('hehe')
    })
</script>
```

### select

#### 鼠标移入展开下拉框

`select`有一个`size`属性，设置`size`的值即可显示`option`的展开数量

```js
select.size = 6
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
    const Flag = '1' //后台返回的数据
    $("#codeShare option[value='" + Flag + "']").attr('selected', 'selected')
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
