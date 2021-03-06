# 业务效果

## 纯 CSS 创建三角形

<https://www.cnblogs.com/monozxy/p/7903019.html>

把左、右、下三条边隐藏掉（颜色设为 transparent）可画出向下的小三角

```css
#demo {
  width: 0;
  height: 0;
  overflow: hidden; /*处理IE6的最小高度问题*/
  border-width: 20px;
  border-style: solid dashed dashed dashed; /*IE6下, 设置余下三条边的border-style为dashed,即可达到透明的效果，否则会有黑边*/
  border-color: red transparent transparent transparent;
}
```

## 更改复选框样式

<https://blog.csdn.net/qq_34182808/article/details/79992465>

```css
.input-color + label {
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  top: 8px;
  left: 30px;
  background-color: #999;
  border-radius: 4px;
}

.input-color:checked + label::before {
  display: block;
  content: '\2714';
  text-align: center;
  font-size: 16px;
  color: white;
  background-color: #c00;
  border-radius: 4px;
}

/* <input type="checkbox" class="input-color">

<label for="input-color" onclick="toggleStatus()"></label>

*/
```

## 毛玻璃效果

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    color: rgba(0, 0, 0, 0.8);
    height: 100%;
  }
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url(1jpg);
    background-position: center top;
    background-size: cover;
  }
  .content {
    width: 800px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -400px;
    border-radius: 8px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    z-index: 2;
    padding: 50px;
    box-sizing: border-box;
  }
  .content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-filter: blur(20px);
    -moz-filter: blur(20px);
    -ms-filter: blur(20px);
    -o-filter: blur(20px);
    filter: blur(20px);
    z-index: -3;
    margin: -30px;
    background-image: url(1jpg);
    background-position: center top;
    background-size: cover;
    background-attachment: fixed;
  }
</style>

<!------------------------------------------ -->
<div class="container">
  <div class="content">
    <p>Are you ready?</p>
  </div>
</div>
```

<https://www.cnblogs.com/ghost-xyx/p/5677168.html>

## 时光轴

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      ul li {
        list-style: none;
      }

      #interview-records-window {
        width: 800px;
        height: 400px;
        margin: 0 auto;
        background-color: #e4e4e4;
        font-size: 14px;
        color: #333;
        line-height: 24px;
        font-family: '微软雅黑';
        overflow-y: auto;
        overflow-x: hidden;
      }

      #interview-records-window ul li {
        position: relative;
      }
      <!--画线-- > #interview-records-window ul li:before {
        content: '';
        position: absolute;
        left: 160px;
        top: 20px;
        z-index: 0;
        width: 1px;
        height: 100%;
        background-color: #00b800;
      }
      <!--画圆-- > .interview-records-timeline {
        position: absolute;
        left: 150px;
        top: 50px;
        z-index: 10;
        width: 20px;
        height: 20px;
        line-height: 20px;
        background-color: #00b800;
        color: #5fb878;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
      }

      #interview-records-window ul li {
        display: flex;
        padding: 25px 0 0 50px;
      }

      .interview-record-left {
        width: 150px;
        margin-top: 20px;
      }

      .interview-record-right {
        margin-top: 20px;
      }

      .interview-record-right-wrap {
        margin-bottom: 20px;
      }

      .interview-record-title {
        margin-bottom: 10px;
      }

      .interview-record-title img {
        width: 19px;
        height: 22px;
        margin-right: 20px;
      }

      .interview-record-content {
        padding-left: 36px;
        font-size: 14px;
      }

      .interview-record-content p {
        line-height: 1.5;
      }
    </style>
  </head>

  <body>
    <div id="interview-records-window">
      <ul>
        <li>
          <div class="interview-record-left">
            <p>2019.7.17</p>
            <p style="padding-left: 20px;">16:30</p>
          </div>
          <i class="interview-records-timeline"></i>
          <div class="interview-record-right">
            <div class="interview-record-right-wrap">
              <div class="interview-record-title">
                <img src="images/u3824.png" alt="" />
                <span>北京地区招聘JAVA工程师三名</span>
              </div>
              <div class="interview-record-content">
                <p>面试地点：北京海淀区西二旗甲13号院</p>
                <p>接洽人：张三</p>
                <p>接洽人电话：18618437566</p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="interview-record-left">
            <p>2019.7.17</p>
            <p style="padding-left: 20px;">16:30</p>
          </div>
          <i class="interview-records-timeline"></i>
          <div class="interview-record-right">
            <div class="interview-record-right-wrap">
              <div class="interview-record-title">
                <img src="images/u3824.png" alt="" />
                <span>北京地区招聘JAVA工程师三名</span>
              </div>
              <div class="interview-record-content">
                <p>面试地点：北京海淀区西二旗甲13号院</p>
                <p>接洽人：张三</p>
                <p>接洽人电话：18618437566</p>
              </div>
            </div>
            <div class="interview-record-right-wrap">
              <div class="interview-record-title">
                <img src="images/u3824.png" alt="" />
                <span>北京地区招聘JAVA工程师三名</span>
              </div>
              <div class="interview-record-content">
                <p>面试地点：北京海淀区西二旗甲13号院</p>
                <p>接洽人：张三</p>
                <p>接洽人电话：18618437566</p>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="interview-record-left">
            <p>2019.7.17</p>
            <p style="padding-left: 20px;">16:30</p>
          </div>
          <i class="interview-records-timeline"></i>
          <div class="interview-record-right">
            <div class="interview-record-right-wrap">
              <div class="interview-record-title">
                <img src="images/u3824.png" alt="" />
                <span>北京地区招聘JAVA工程师三名</span>
              </div>
              <div class="interview-record-content">
                <p>面试地点：北京海淀区西二旗甲13号院</p>
                <p>接洽人：张三</p>
                <p>接洽人电话：18618437566</p>
              </div>
            </div>
            <div class="interview-record-right-wrap">
              <div class="interview-record-title">
                <img src="images/u3824.png" alt="" />
                <span>北京地区招聘JAVA工程师三名</span>
              </div>
              <div class="interview-record-content">
                <p>面试地点：北京海淀区西二旗甲13号院</p>
                <p>接洽人：张三</p>
                <p>接洽人电话：18618437566</p>
              </div>
            </div>
            <div class="interview-record-right-wrap">
              <div class="interview-record-title">
                <img src="images/u3824.png" alt="" />
                <span>北京地区招聘JAVA工程师三名</span>
              </div>
              <div class="interview-record-content">
                <p>面试地点：北京海淀区西二旗甲13号院</p>
                <p>接洽人：张三</p>
                <p>接洽人电话：18618437566</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </body>
</html>
```

## 进度条

<https://www.cnblogs.com/xiaofeixiang/p/5036154.html>

<https://blog.csdn.net/weixin_40687883/article/details/80388420>

## img 加载失败显示默认图片

```scss
img {
  width: 200px;
  height: 200px;
  vertical-align: middle;

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: 100%;
    background: #fff url('../../assets/logo2.jpg') no-repeat;
  }
}
```

## 修改多选框的样式

根据后台返回的处理状态显示不同的样式，同时可以点击更改状态

```html
<style>
  .input-color + label {
    display: block;
    width: 20px;
    height: 20px;
    cursor: pointer;
    position: absolute;
    top: 8px;
    left: 30px;
    background-color: #999;
    border-radius: 4px;
  }

  .input-color:checked + label::before {
    display: block;
    content: '√';
    text-align: center;
    font-size: 16px;
    color: white;
    background-color: #c00;
    border-radius: 4px;
  }
</style>
```

如果表格的某一行的状态是 true

```js
if(item.processResult) {
<td>
    <input type="checkbox" class="input-color" checked>
    <label for="input-color" onclick="toggleStatus('{{item.id}}',false)"></label>
</td>
}
```

如果表格的某一行的状态是 false

```js
if(!item.processResult) {
<td>
    <input type="checkbox" class="input-color">
    <label for="input-color" onclick="toggleStatus('{{item.id}}',true)"><span style="color: #fff;">√</span></label>
</td>
}
```

点击某一条数据可以切换状态

```html
<script>
  function toggleStatus(statusId, status) {
    var jsonData = {
      id: statusId,
      processResult: status
    }
    postURL('/business/feedback/updateProcessResultById', JSON.stringify(jsonData), function(data) {
      if (data.success) {
        getFeedBackList()
      } else {
        console.log('error')
      }
    })
  }
</script>
```

## 换行显示后端返回的数据

### 1、可以使用 CSS 样式

```css
white-space: pre-line;
```

white-space:pre-line, 把多个空格合并成一个

white-space:pre-wrap, 会保留所有空格。

### 2、如果有\n 可以使用 br 标签替换

```html
<script>
  var str =
    '职位描述: 诚聘20名商务模特：\n岗位要求：年龄在18-26周岁之间，身高在165cm以上。\n有良好的形象和气质，颜值较高，有才艺、有经验者优先，无经验可以提供免费培训。 '
  res = str.replace(/\n+/g, '<br/>')
  document.write(res)
</script>
```

### 3、文本域 textarea

若是在文本域中显示，默认会首行缩进 2 个空格，只需将 textarea 标签写在一行即可

```css
<textarea rows="10" cols="50"></textarea>
```

## 放射性条状物

核心在`clip-path: polygon()`属性

```html
<div class="box"></div>

<style>
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    background-color: #ffb782;
    border-radius: 20px;
  }

  .box::before {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ffa766;
    width: 100%;
    height: 100%;
    content: '';
    clip-path: polygon(
      20% 0%,
      5% 0,
      50% 50%,
      0 28%,
      0 15%,
      50% 50%,
      0 40%,
      0 49%,
      50% 50%,
      0 58%,
      0 68%,
      50% 50%,
      0 80%,
      0 96%,
      50% 50%,
      15% 100%,
      0 190%,
      50% 50%,
      42% 100%,
      70% 178%,
      50% 50%,
      70% 100%,
      100% 120%,
      50% 50%,
      100% 97%,
      100% 84%,
      50% 50%,
      100% 73%,
      100% 62%,
      50% 50%,
      100% 56%,
      100% 48%,
      50% 50%,
      100% 41%,
      100% 32%,
      50% 50%,
      100% 22%,
      100% 7%,
      50% 50%,
      85% 0,
      66% 0,
      50% 50%,
      50% 0,
      33% 0,
      50% 50%
    );
  }
</style>
```

## 文字有下划线背景

鼠标移入有背景色填满文字的过渡动画

```css
/* <a href="#">hello world</a> */

a {
  color: rgb(15, 15, 15);
  text-decoration: none;
  outline: none;
  background-color: transparent;

  padding: 2px 0px 1px;
  background-image: linear-gradient(
    transparent 0%,
    transparent calc(50% - 9px),
    rgba(0, 255, 0, 0.5) calc(50% - 9px),
    rgba(0, 255, 0, 0.5) 100%
  );
  transition: background-position 120ms ease-in-out 0s, padding 120ms ease-in-out 0s;
  background-size: 100% 200%;
  background-position: 0px 0px;
  word-break: break-word;
}
a:hover {
  background-image: linear-gradient(
    transparent 0%,
    transparent calc(50% - 9px),
    rgb(0, 255, 0) calc(50% - 9px),
    rgb(0, 255, 0) 100%
  );
  background-position: 0px 100%;
}
```
