# Http 模块

```js
const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.method); // 获取请求方式
  console.log(req.headers); // 获取请求头
  console.log(req.url); // 获取url中的路径和查询参数
  console.log(req.httpVersion); // 获取http版本号
  // 设置响应头，避免中文乱码
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  res.end('你好');
});

server.listen(9000, () => {
  console.log('server start...');
});
```

## 获取请求体

```js
const http = require('http');

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    console.log(body);
    res.end('ok');
  });
});

server.listen(9000, () => {
  console.log('server start...');
});
```

get 请求的请求体一般是空的，post 请求体会有值。可以使用一个 form 表单模拟 post 请求，这样前面打印的 body 结果就是类似`username=zgh&password=123`

```html
<form action="http://127.0.0.1:9000" method="post">
  <input type="text" name="username" />
  <input type="password" name="password" />
  <input type="submit" value="提交" />
</form>
```

## 获取请求路径和查询参数

假设请求路径为：`http://127.0.0.1:9000/list?page=1&size=10`

方式一、引入 url 模块解析

```js
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // 如果不加第二个参数true，那么结果是字符串 query: 'page=1&size=10'，设置为true之后就解析为对象了
  let parsedUrl = url.parse(req.url, true);
  console.log(parsedUrl);
  console.log(parsedUrl.pathname); // 获取路径
  console.log({ page: parsedUrl.query.page, size: parsedUrl.query.size }); // { page: '1', size: '10' }
  res.end('ok');
});

server.listen(9000, () => {
  console.log('server start...');
});
```

parsedUrl 的打印结果如下：

```json
{
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?page=1&size=10',
  query: [Object: null prototype] { page: '1', size: '10' },
  pathname: '/list',
  path: '/list?page=1&size=10',
  href: '/list?page=1&size=10'
}
```

方式二、通过 new URL()解析

```js
const http = require('http');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1:9000');
  console.log(url);
  console.log(url.pathname); // /list
  console.log(url.searchParams); // URLSearchParams { 'page' => '1', 'size' => '10' }
  console.log(url.searchParams.get('page')); // 1
  console.log(url.searchParams.get('size')); // 10
  res.end('ok');
});

server.listen(9000, () => {
  console.log('server start...');
});
```

url 的打印结果如下：

```json
{
  href: 'http://127.0.0.1:9000/list?page=1&size=10',
  origin: 'http://127.0.0.1:9000',
  protocol: 'http:',
  username: '',
  password: '',
  host: '127.0.0.1:9000',
  hostname: '127.0.0.1',
  port: '9000',
  pathname: '/list',
  search: '?page=1&size=10',
  searchParams: URLSearchParams { 'page' => '1', 'size' => '10' },
  hash: ''
}
```
