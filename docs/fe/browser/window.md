# Window 对象

## window.location 对象

| 属性/方法           | 描述                                                                                                 |
| :------------------ | :--------------------------------------------------------------------------------------------------- |
| host                | 返回主机名和端口号                                                                                   |
| hostname            | 返回主机名                                                                                           |
| port                | 返回端口号                                                                                           |
| href                | 返回完整的 URL，包括协议、主机、路径、查询参数和片段                                                 |
| origin              | 返回当前页面的协议、主机名和端口号                                                                   |
| pathname            | 返回路径部分，不包括主机名和查询参数                                                                 |
| protocol            | 返回当前页面的协议，如："http:" 或 "https:"                                                          |
| search              | 返回查询参数部分，包括 "?"                                                                           |
| hash                | 返回从井号 (#) 开始的路径                                                                            |
| assign(url)         | 将页面导航到指定的 URL                                                                               |
| replace(url)        | 用指定的 URL 替换当前页面，不会在历史记录中留下记录                                                  |
| reload(forceReload) | 重新加载当前页面。如果 forceReload 参数为 true，则会强制从服务器重新加载页面，否则可能会从缓存中加载 |

## window.history

1、`historty.pushState(stateObj, title, url)`，向浏览器的历史记录中添加一个新的状态。不会导致页面重新加载，但会改变地址栏的 URL

- stateObj: 一个表示新状态的对象
- title: 页面的标题
- url: 新的 URL

2、`historty.replaceState(stateObj, title, url)`，替换当前历史记录条目的状态，不会导致页面重新加载

3、`historty.go(n)`， n 为正整数或负整数，前进后退

4、`historty.forward(n)`，前进，效果同 history.go(1)

5、`historty.back(n)`，后退 ，效果同 history.go(-1)

```js
// 添加一个新的状态到历史记录
window.history.pushState({ page: 1 }, 'Page1', '/page1');

// 替换当前状态
window.history.replaceState({ page: 2 }, 'Page2', '/page2');

// 向前导航
window.history.forward();

// 向后导航
window.history.back();

// 获取历史记录长度
window.history.length;

// 获取当前状态
window.history.state;
```

## 关闭当前窗口

```js
function closeCurrentWindow() {
  window.opener = null;
  window.open('', '_self');
  window.close();
}
```

## 获取 url 参数

### 获取单个参数

```js
let urlParam = window.location.search;
let loc = urlParam.substring(urlParam.lastIndexOf('=') + 1, urlParam.length);
console.log(loc);
```

### 获取多个参数

```js
//  https://www.xxx.com/url.html?id=1&key=2

// 获取所有参数的值
function getURLParameter() {
  let url = location.search; // 获取url中"?"符后的字串
  let res = new Object();
  if (url.indexOf('?') != -1) {
    let str = url.substr(1);
    strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      res[strs[i].split('=')[0]] = strs[i].split('=')[1];
    }
  }
  return res;
}
getURLParameter(); // {id: "1", key: "2"}

// 获取指定参数的值
function getURLParameterByName(name) {
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
getURLParameterByName('id');
```

### 获取参数对象

node.js 中有一个 queryString 模块，可以将参数转化为一个对象，键相同就合并成数组

```js
let url = 'http://www.baidu.com?name=zgh&appearance=cool&appearance=handsome';
// 期待结果： { name: 'zgh', appearance: [ 'cool', 'handsome' ] }

function handsome(url) {
  let arr = url.split('?')[1].split('&');
  let obj = {};
  arr.forEach((e) => {
    let param = e.split('=');
    let key = param[0];
    let value = param[1];
    if (obj[key]) {
      obj[key] = Array.isArray(obj[key]) ? obj[key] : [obj[key]];
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  });
  return obj;
}
handsome(url);
```

## 确保浏览器不走缓存路线

1. 在 ajax 发送请求前加上 `anyAjaxObj.setRequestHeader("If-Modified-Since","0")`

2. 在 ajax 发送请求前加上 `anyAjaxObj.setRequestHeader("Cache-Control","no-cache")`

3. 在 URL 后面加上一个随机数： `"fresh=" + Math.random();`

4. 在 URL 后面加上时间戳：`"nowtime=" + new Date().getTime();`

5. 如果是使用 jQuery，直接使用`$.ajaxSetup({cache:false})`
