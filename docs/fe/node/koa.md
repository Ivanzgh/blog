# Koa

官网：<https://koajs.com>

github：<https://github.com/koajs/koa>

## 简介

koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。使用 koa 编写 web 应用，通过组合不同的 generator，可以免除重复繁琐的回调函数嵌套，并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用变得得心应手。

## 快速上手

```sh
npm install koa
```

```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3000);
```

## 中间件

Koa 是一个中间件框架，可以采用两种不同的方法来实现中间件：

- async function
- common function

以下是使用两种不同方法实现一个日志中间件的示例

1、async functions (node v7.6+)

```js
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
```

2、Common function

```js
app.use((ctx, next) => {
  const start = Date.now();
  return next().then(() => {
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });
});
```

- 中间件通常带有两个参数 (ctx, next), ctx 是一个请求的上下文（context）
- next 是调用执行下游中间件的函数. 在代码执行完成后通过 then 方法返回一个 Promise

## 上下文、请求响应

每个中间件都接收一个 Koa 的 Context 对象，该对象封装了一个传入的 http 消息，并对该消息进行了相应的响应。 ctx 通常用作上下文对象的参数名称。

```js
app.use(async (ctx, next) => {
  await next();
});
```

- Koa 提供了一个 Request 对象作为 Context 的 request 属性。 Request 对象提供了用于处理 http 请求的方法，该请求委托给 node http 模块的 `IncomingMessage`
- Koa 提供了一个 Response 对象作为 Context 的 response 属性。 Response 对象提供了用于处理 http 响应的方法，该响应委托给 `ServerResponse`

Koa 对 Node 的请求和响应对象进行委托而不是扩展它们。这种模式提供了更清晰的接口，并减少了不同中间件与 Node 本身之间的冲突，并为流处理提供了更好的支持。

- `IncomingMessage` 可以作为 Context 上的 req 属性被直接访问
- `ServerResponse` 也可以作为 Context 上的 res 属性被直接访问

示例 1：检查请求客户端 xml 支持

```js
app.use(async (ctx, next) => {
  ctx.assert(ctx.request.accepts('xml'), 406);
  // 相当于:
  // if (!ctx.request.accepts('xml')) ctx.throw(406);
  await next();
});
```

示例 2：使用 Koa 的 Response 对象将文件作为响应体流式传输

```js
app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'xml';
  ctx.response.body = fs.createReadStream('really_large.xml');
});
```

Context 对象还提供了其 request 和 response 方法的快捷方式：

- `ctx.type` 可以代替 `ctx.response.type`
- `ctx.accepts` 可以代替 `ctx.request.accepts`

## Koa 与 Express 比较

### 更轻量

- koa 不提供内置的中间件
- koa 不提供路由，而是把路由这个库分离出来了（koa/router）

### Context 对象

koa 增加了一个 Context 对象，作为这次请求的上下文对象（在 koa2 中作为中间件的第一个参数传入）。同时 Context 上也挂载了 Request 和 Response 两个对象。和 Express 类似，这两个对象都提供了大量的便捷方法辅助开发, 在保存一些公有的参数时变得更加合情合理

### 异步流程控制

express 采用 callback 来处理异步， koa v1 采用 generator，koa v2 采用 async/await

generator 和 async/await 使用同步的写法来处理异步，明显好于 callback 和 promise

### 中间件模型

express 基于 connect 中间件，线性模型

koa 中间件采用洋葱模型（对于每个中间件，在完成了一些事情后，可以非常优雅的将控制权传递给下一个中间件，并能够等待它完成，当后续的中间件完成处理后，控制权又回到了自己）

## 路由

```js
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.post('/list', (ctx) => {
  ctx.body = ['k1', 'k2', 'k3'];
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
```

## 静态资源

```js
const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

app.use(static(path.join(__dirname, 'public')));

app.use(async (ctx) => {
  ctx.body = 'hello world';
});

app.listen(3000);
```
