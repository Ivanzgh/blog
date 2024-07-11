# AJAX

## XMLHttpRequest

```js
const xhr = new XMLHttpRequest();

// 请求方式，路径，是否异步
xhr.open('GET', 'https://www.easy-mock.com/mock/5c94518744e20f337dc3c58c/test/zgh/zghivan', false);

// 设置xhrt对象不发送数据到服务器
xhr.send(null);

if (xhr.status == 200) {
  const data = xhr.responseText;
  document.getElementById('contont').innerText = data;
}
```

### 封装 ajax

调用方式：

```js
ajax({
  type: 'GET',
  url: 'http://localhost:3000/posts',
  timeout: 5000,
  data: {},
  success: (res) => {
    console.log('success', res);
  },
  error: (err) => {
    console.log('error', err);
  }
});
```

实现代码：

```js
const ajax = (options) => {
  const objToString = (data) => {
    // 加个时间戳，避免缓存
    data.t = new Dat().getTime();
    let res = [];
    for (let key in data) {
      // url里不能有中文
      res.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    return res.join('&');
  };

  let str = objToString(options.data || {});

  // 1. 创建一个xhr对象
  var xhr, timer;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    // 兼容IE
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  // 2. 设置请求方式，路径，是否异步
  if (options.type.toUpperCase() === 'GET') {
    xhr.open(options.type, options.url + '?=' + str, options.async || true);
    xhr.send(null);
  }

  if (options.type.toUpperCase() === 'POST') {
    xhr.open(options.type, options.url, options.async || true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(options.data);
  }

  // 3. 监听状态改变
  xhr.onreadystatechange = function () {
    clearInterval(timer);
    if (xhr.readyState == 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        options.success(xhr.responseText);
      } else {
        options.error(xhr.responseText);
      }
    }
  };

  // 4. 设置超时时间
  if (options.timeout) {
    timer = setInterval(() => {
      xhr.abort(); // 中断请求
      clearInterval(timer);
    }, options.timeout);
  }
};
```

准备 json 数据，使用 [json-server](https://github.com/typicode/json-server) 搭建一个本地服务器，开始验证。

## jquery 中的 ajax

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
      // post请求可以传递数据
      // data: {id : 1},
      success: function (data) {
        console.log(data);
      },
      error: function () {
        console.log('error');
      }
    });
  });
</script>
```

jquery 中的`$.ajax()`常用参数：

| 参数        | 说明                       |
| ----------- | -------------------------- |
| url         | 请求地址                   |
| async       | 是否异步                   |
| data        | 发送到服务器的数据         |
| contentType | 发送到服务器的数据编码类型 |
| type        | 请求类型                   |
| success     | 请求成功的回调函数         |
| error       | 请求失败的回调函数         |

若为 get 请求可直接在 url 中使用`?`拼接

## fetch

```js
fetch('http://localhost:3000/posts')
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

## axios

基于 Promise 可以用于浏览器和 node.js 的网络请求库

- 作用于浏览器端和 node.js
- 在服务端使用 node.js 的 http 模块，而在浏览器端使用 XMLHttpRequests

### 特性

- 从浏览器创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 超时处理
- 查询参数序列化支持嵌套项处理
- 自动将请求体序列化为：
  - JSON (application/json)
  - Multipart / FormData (multipart/form-data)
  - URL encoded form (application/x-www-form-urlencoded)
- 将 HTML Form 转换成 JSON 进行请求
- 自动转换 JSON 数据
- 获取浏览器和 node.js 的请求进度，并提供额外的信息（速度、剩余时间）
- 为 node.js 设置带宽限制
- 兼容符合规范的 FormData 和 Blob（包括 node.js）
- 客户端支持防御 XSRF

### Content-Type

Axios 请求头中的`Content-Type`常见的有三种：

- Content-Type: `application/json`
- Content-Type: `application/x-www-form-urlencoded`
- Content-Type: `multipart/form-data`

请求头配置：

```js
headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
},
```

1、`application/json`是默认的方式，声明了将请求体中的数据以 json 字符串的格式传给后端。

2、`application/x-www-form-urlencoded`声明了请求体中的数据会以键值对（普通表单形式）发送到后端，这种类型是 Ajax 默认的。
请求体一般是 json 对象，可以使用[qs](https://github.com/ljharb/qs)库将对象转为 url 参数形式。

qs 能将对象和 url 中的参数互相转换

[官方文档 urlencoded](https://axios-http.com/zh/docs/urlencoded)

```js
import qs from 'qs';

const url = 'user=zgh&password=123';
// 转为对象
console.log(qs.parse(url)); // { user: 'zgh', password: '123' }

const obj = { name: 'zgh', age: 23 };
// 转为url参数形式
console.log(qs.stringify(obj)); // 'name=zgh&age=23'
```

::: tip 提示
最新版本中，已实现了自动序列化。当请求头中的 `content-type` 是 `application/x-www-form-urlencoded` 时，Axios 将自动地将普通对象序列化成 urlencoded 的格式。
:::

3、`multipart/form-data`一般用来传输文件，数据为二进制格式，也可为键值对格式

[官方文档 form-data](https://axios-http.com/zh/docs/multipart)

```js
const fileData = new FormData();
fileData.append('file', file);
fileData.append('name', 'zgh');

// 如果想传输文件数组
fileData.append('files', file1);
fileData.append('files', file2);
fileData.append('files', file3);
```

::: tip 提示

从 v0.27.0 版本开始，当请求头中的 `Content-Type` 是 `multipart/form-data` 时，Axios 支持自动地将普通对象序列化成一个 FormData 对象

:::
