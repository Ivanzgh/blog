# 踩坑记录

## 请求失败

1. 检查是否在微信公众平台配置了服务器域名，和本地请求的域名是否一致
2. 开发者工具右上角点击详情，打开本地配置，勾选上「不校验合法域名、web-view（业务域名）、TLS 版本以及 HTTPS 证书」

## 真机调试拿不到数据

在开发者工具和浏览器都能正常获取数据，但是在真机调试时拿不到数据，请求失败，这时可以考虑证书是否过期

## 真机调试连接状态一直在正常和未连接之间跳转

可以尝试以下方式：

- 重新打开项目
- 重启开发者工具
- 升级版本
- 版本降级

## 用 code 换取 openID 报错

通过`wx.login()`可以获取用户的登录凭证（code），这个临时登录凭证一般只有 5 分钟有效期，可以将该凭证发送到自己的服务器，用于获取用户信息、进行用户认证等操作。

报错信息：`errcode: 40029 errmsg: "invalid code, rid: 64180ee9-5771befc-2c5bd655"`

出现上面的报错，考虑 code 是否被多次调用，还有自己的服务端是否部署正确

## 绑定数据大小写问题

如果想在点击事件里传递参数，可以使用`data-`，如果使用驼峰写法会被小程序全部转为小写

这里如果绑定`data-isOpen="0"`，获取值`e.target.dataset.isOpen`会报错，需要小写：`e.target.dataset.isopen`

```html
<van-button round type="info" data-isopen="0" bind:tap="handleSubmit">保存</van-button>
```

## 路由传递布尔值类型错误

通过路由传递给其他页面的布尔值会被转换为字符串格式：'true'、'false'。可以自己转换一下：`const a = b === 'true' ? true : false`

## input 输入框没有边框颜色

微信小程序里的 input 输入框默认是没有边框颜色的，需要手动添加样式。如果要在全局生效，可在`app.wxss`中添加：

```css
input {
  border: 1px solid #ddd;
}
```

## wx:for 循环变量出错

如果花括号和引号之间有空格，会被解析成为字符串

```html
<view wx:for="{{[1,2,3]}} ">{{item}}</view>

<!-- 等同于 -->
<view wx:for="{{[1,2,3] + ' '}}">{{item}}</view>
```

## 在 wx:if 中使用 indexOf() 判断条件失效

在 wxml 中不支持的语法：

- Object.keys()
- toString()
- indexOf()

创建一个 wxs 后缀的文件，如 utils.wxs 文件

```js
function indexOf(arr, val) {
  return arr.indexOf(val) >= 0;
}
module.exports.indexOf = indexOf;
```

在 wxml 文件顶部引入 utils.wxs 文件

```html
<wxs src="./utils.wxs" module="tools" />

<!-- 使用 -->
<view wx:if="{{tools.indexOf(['a', 'b', 'c'], 'a')}}"></view>
```

补充：

```js
function indexOf(arr, val) {
  return arr.indexOf(val) >= 0;
}

function includes(arr, val) {
  return arr.indexOf(val) !== -1;
}
function isArray(val) {
  // 不支持：
  // 1. Array.isArray(val);
  // 2. Object.prototype.toString.call(val) === '[object Array]';
  if (val.constructor && val.constructor == 'Array') {
    return true;
  }
  return false;
}

module.exports = {
  indexOf: indexOf,
  includes: includes,
  isArray: isArray
};
```
