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
      success: function(data) {
        console.log(data)
      },
      error: function() {
        console.log('error')
      }
    })
  })
</script>
```

jquery 中的\$.ajax()常用参数：

```null
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
