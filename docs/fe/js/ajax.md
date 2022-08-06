# AJAX

## XMLHttpRequest

<https://juejin.im/post/58e4a174ac502e006c1e18f4#heading-0>

<https://www.jianshu.com/p/918c63045bc3>

<https://blog.csdn.net/z550449054/article/details/80538623>

```js
// <div id="hehe"></div>

const xhr = new XMLHttpRequest()
//请求方式，路径，是否异步
xhr.open('GET', 'https://www.easy-mock.com/mock/5c94518744e20f337dc3c58c/test/zgh/zghivan', false)
//设置xhrt对象不发送数据到服务器
xhr.send(null)
console.log(xhr)
if (xhr.status == 200) {
  const data = xhr.responseText
  console.log(data)
  document.getElementById('hehe').innerText = data
}
```

## ajax 获取数据

数据交互的几种方式：

<http://www.cnblogs.com/zxt-17862802783/p/7787258.html>

```html
<button id="btn">click!</button>

<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.js"></script>
<script>
  $('#btn').click(function me() {
    $.ajax({
      url: 'https://www.easy-mock.com/mock/5c94518744e20f337dc3c58c/test/zgh/zghivan',
      type: 'get',
      dataType: 'json',
      async: true,
      //post请求可以传递数据
      //data: {id : 1},
      success: function (data) {
        console.log(data)
      },
      error: function () {
        console.log('error')
      }
    })
  })
</script>
```

jquery 中的\$.ajax()常用参数：

```sh
url 请求地址

async 是否异步

data 发送到服务器的数据

contentType  发送信息至服务器时内容编码类型

type  请求类型

success 请求成功的回调函数

error  请求失败的回调函数
```

若为 get 请求可直接在 url 中使用?拼接

推荐： <http://louiszhai.github.io/2016/11/02/ajax/>

MDN : <https://developer.mozilla.org/zh-CN/docs/Web/Guide/AJAX>

## axios

### Content-Type

Axios 请求头中的`Content-Type`常见的有三种：

- Content-Type: application/json

- Content-Type: application/x-www-form-urlencoded

- Content-Type: multipart/form-data

请求头配置：

```js
headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
},
```

1、`application/json`是默认的方式，声明了将请求体中的数据以 json 字符串的格式传给后端。

2、`application/x-www-form-urlencoded`声明了请求体中的数据会以键值对（普通表单形式）发送到后端，这种类型是 Ajax 默认的。
请求体一般是 json 对象，可以使用`qs`库将对象转为 url 参数形式。

qs 是 Axios 默认就有的，能将对象和 url 中的参数互相转换

```js
import qs from 'qs'

const url = 'user=zgh&password=123'
// 转为对象
console.log(qs.parse(url)) // { user: 'zgh', password: '123' }

const obj = { name: 'zgh', age: 23 }
// 转为url参数形式
console.log(qs.stringify(obj)) // 'name=zgh&age=23'
```

3、`multipart/form-data`一般用来传输文件，数据为二进制格式，也可为键值对格式

```js
const fileData = new FormData()
fileData.append('file', file)
fileData.append('name', 'zgh')

// 如果想传输文件数组
fileData.append('files', file1)
fileData.append('files', file2)
fileData.append('files', file3)

```
