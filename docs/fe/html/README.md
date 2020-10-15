# html

## HTML语义化

+ 语义化是指根据内容的类型，选择合适的标签（代码语义化）,即用正确的标签做正确的事情;
+ html语义化让页面的内容结构化，结构更清晰，有助于浏览器、搜索引擎解析对内容的抓取;
+ 语义化的HTML在没有CSS的情况下也能呈现较好的内容结构与代码结构;
+ 搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;

## cookies，sessionStorage 、 localStorage

+ cookie是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密），cookie数据始终在同源的http请求中携带，即会在浏览器和服务器间来回传递。
+ sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
+ 大小： cookie数据大小不能超过4k。
sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
+ 时效：localStorage存储持久数据，浏览器关闭后数据不丢失除非用户主动删除数据或清除浏览器/应用缓存；sessionStorage数据在当前浏览器窗口关闭后自动删除。cookie设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

1)、如何让cookie浏览器关闭就失效？

不对cookie设置任何正、负或0时间的即可;

2)、sessionStorage在浏览器多窗口之间 (同域)数据是否互通共享? 

不会，都是独立的，localStorage会共享;

3)、能让localStorage也跟cookie一样设置过期时间？

可以，每次在存储的时候同时也存入一个时效时间戳，而在获取数据前，先与当前时间比较，如果小于当前时间则过期了，直接返回空的数据。


## dl、dt、dd表格标签

dl dt dd是一个组合型标签

dl 标签定义一个描述列表（definition list）。

dl 标签与 dt（定义项目/名字）和dd（描述每一个项目/名字）一起使用。

```html
<dl>
    <dt>列表标题</dt>
    <dd>列表内容</dd>
    <dd>列表内容</dd>
    ...
</dl>
```
在dl下，dt与dd处于同级标签。dd标签可以若干。

通常使用在具有标题，而标题下对应有若干列表简单的（栏目标题+对应标题列表）和标题对应下面有内容。

## 文本

### 首行缩进2个字
```
text-indent:2em;
```

### 文字加下划线
```
text-decoration:underline
```
### 字体设置
```
font:600 16px/30px 微软雅黑

表示字体粗600，字体大小16px，行高30px，微软雅黑字体
```

### 文字换行
```
word-break: break-all;
```
强制换行，行尾会将一个完整的单词拆开

```
word-wrap:break-word
```
行尾不会拆解单词，如果宽度不够会放到下一行，尾部会有空白

## 表单

### input

#### 禁止显示历史记录
`autocomplete="off"` 禁用自动完成功能。on 启用

#### input框设置只读
方法一、readonly
```
<input type="text" value="hello" readonly>
```
```
<input type="text" value="hello" readonly='true'>
```
方法二、disabled
```
<input type="text" value="hello" disabled>
```
```
<input type="text" value="hello" disabled='true'>
```
方法三、onfocus="this.blur()"
```
<input type="text" value="hello" onfocus="this.blur()">
```
::: tip 区别：
1、使用disabled会使输入框变灰，不可输入，不可点击，可复制

2、使用readonly不可输入，可点击，不变灰，可复制

3、onfocus="this.blur()"不可输入，不可点击，不变灰，不可复制
:::

## 监听input框的值变化
```html
<input type="text" name="planLeave" readonly>
<script src="https://cdn.bootcss.com/jquery/3.4.1/jquery.js"></script>
<script>
   $("input[name='planLeave']").trigger("input").bind('input propertychange', function () {
        alert('hehe')
   });
</script>
```

### select
#### 鼠标移入展开下拉框
select有一个size属性，设置size的值即可显示option的展开数量
```
select.size = 6
```
#### 根据后台数据设置选中项
默认选中后台返回的下拉项
```
<select name="codeShare" id="codeShare">
    <option value="0">否</option>
    <option value="1">是</option>
</select>
<button onclick="he()">click</button>
        
<script>
    function he() {
        //后台返回的数据
        var Flag = "1"

        $("#codeShare option[value='" + Flag + "']").attr("selected", "selected");
    }
</script>
```

#### 通过ajax动态加载select控件下拉框的option
https://blog.csdn.net/zhengxiangwen/article/details/46480687