# 服务端渲染 SSR

## SSR 简介

SSR 特别指支持在 Node.js 中运行相同应用程序的前端框架（例如 React、Preact、Vue 和 Svelte），将其预渲染成 HTML，最后在客户端进行**水合**处理。

使用 React 可选择的框架：

- [Next.js](https://nextjs.org)
- [Remix](https://remix.run)

## 基于 Vite 构建的 SSR

如果项目是基于 [Vite](https://cn.vitejs.dev/guide/ssr.html) 构建的，可参考的模版：[template-ssr-react](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-react)

目录结构：

```
- index.html
- server.js
- src/
  - main.js          # 导出环境无关的（通用的）应用代码
  - entry-client.js  # 将应用挂载到一个 DOM 元素上
  - entry-server.js  # 使用某框架的 SSR API 渲染该应用
```

1、在 package.json 中添加脚本命令：`"devssr": "node server"`

2、在项目根目录下创建 server.js 文件，内容如下，并安装 express

```js
import fs from 'node:fs/promises';
import express from 'express';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction ? await fs.readFile('./dist/client/index.html', 'utf-8') : '';
const ssrManifest = isProduction ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8') : undefined;

// Create http server
const app = express();

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
```

3、在 src 目录下创建 `entry-client.jsx` 文件

```jsx
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

4、在 src 目录下创建 `entry-server.jsx` 文件

```jsx
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  return { html };
}
```

5、`index.html` 将需要引用 `entry-client.js` 并包含一个占位标记供给服务端渲染时注入：

```html
<div id="root"><!--app-html--></div>
<script type="module" src="/src/entry-client.jsx"></script>
```

现在已经做好了 SSR 工作，接着准备 App.jsx：

```jsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(() => count + 1)}>click</button>
    </>
  );
}

export default App;
```

正常启动`pnpm dev`，查看网页源代码，会发现如下结构，root 下没有任何内容，这样就对 SEO 不友好

```html
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
```

启动`pnpm devssr`，查看网页源代码，可以看到 root 节点下有内容了

```html
<body>
  <div id="root">
    <div>0</div>
    <button>click</button>
  </div>
  <script type="module" src="/src/entry-client.jsx"></script>
</body>
```
