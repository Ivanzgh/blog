# Window 对象

## window.location 对象

| 属性     | 描述                              |
| :------- | :-------------------------------- |
| hash     | 从井号 (#) 开始的 URL（锚）       |
| host     | 主机名和当前 URL 的端口号         |
| hostname | 当前 URL 的主机名                 |
| href     | 完整的 URL                        |
| pathname | 当前 URL 的路径部分               |
| port     | 当前 URL 的端口号                 |
| protocol | 当前 URL 的协议                   |
| search   | 从问号 (?) 开始的 URL（查询部分） |

## 刷新页面

```js
function refresh() {
  location.reload()
}
```

## 关闭当前窗口

```js
function closeCurrentWindow() {
  window.opener = null
  window.open('', '_self')
  window.close()
}
```

## 回退历史

返回上一页

```js
function historyBack() {
  window.history.go(-1)
}
```

## 获取 url 参数

### 获取单个参数

```js
let urlParam = window.location.search
let loc = urlParam.substring(urlParam.lastIndexOf('=') + 1, urlParam.length)
console.log(loc)
```

### 获取多个参数

```js
//  <a href="file:///D:/test/url.html?index=1&item=2">fe</a>

function GetRequest() {
  let url = location.search //获取url中"?"符后的字串
  let theRequest = new Object()
  if (url.indexOf('?') != -1) {
    let str = url.substr(1)
    strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
    }
  }
  return theRequest
}
GetRequest() // {index: "1", item: "2"}
```

### 获取参数对象

node.js中有一个queryString模块，可以将参数转化为一个对象，键相同就合并成数组

```js
let url = 'http://www.baidu.com?name=zgh&appearance=cool&appearance=handsome'
// 期待结果： { name: 'zgh', appearance: [ 'cool', 'handsome' ] }

function handsome(url) {
  let arr = url.split('?')[1].split('&')
  let obj = {}
  arr.forEach((e) => {
    let param = e.split('=')
    let key = param[0]
    let value = param[1]
    if (obj[key]) {
      obj[key] = Array.isArray(obj[key]) ? obj[key] : [obj[key]]
      obj[key].push(value)
    } else {
      obj[key] = value
    }
  })
  return obj
}
handsome(url)
```

## 路由跳转

`location` 和 `history` 接口

在单页应用中，通常由前端来配置路由，根据不同的 url 显示不同的内容。

我们在单页应用中需要做到的是改变 url 不刷新页面

<https://segmentfault.com/a/1190000014120456?tdsourcetag=s_pctim_aiomsg>

## 确保浏览器不走缓存路线

1. 在 ajax 发送请求前加上 `anyAjaxObj.setRequestHeader("If-Modified-Since","0")`

2. 在 ajax 发送请求前加上 `anyAjaxObj.setRequestHeader("Cache-Control","no-cache")`

3. 在 URL 后面加上一个随机数： `"fresh=" + Math.random();`

4. 在 URL 后面加上时间搓：`"nowtime=" + new Date().getTime();`

5. 如果是使用 jQuery，直接使用`$.ajaxSetup({cache:false})`即可，这样页面的所有 ajax 都会
   执行这条语句，不需要保存缓存记录。
