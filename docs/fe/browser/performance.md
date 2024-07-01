# 性能优化

> 从输入 URL 到页面加载完成，发生了什么？

1. DNS 解析
2. TCP 连接
3. HTTP 请求抛出
4. 服务端处理请求，HTTP 响应返回
5. 浏览器拿到响应数据，解析响应内容，把解析的结果展示给用户

问题：

1. 什么情况下会进行 dns 解析 三次链接
2. 一定会进行 TCP 链接吗
3. 如果长连接什么时候会关闭，短连接什么时候会关闭
4. 收到服务端的请求报文一定会是解析 dom 渲染页面吗

## 方式

- 减少 http 请求次数：CSS Sprites, JS、CSS 源码压缩、图片大小控制合适；网页 Gzip，CDN 托管，data 缓存 ，图片服务器。

- 前端模板 JS+数据，减少由于 HTML 标签导致的带宽浪费，前端用变量保存 AJAX 请求结果，每次操作本地变量，不用请求，减少请求次数

- 用 innerHTML 代替 DOM 操作，减少 DOM 操作次数，优化 javascript 性能。

- 当需要设置的样式很多时设置 className 而不是直接操作 style。

- 少用全局变量、缓存 DOM 节点查找的结果。减少 IO 读取操作。

- 避免使用 CSS Expression（css 表达式）又称 Dynamic properties(动态属性)。

- 图片预加载，将样式表放在顶部，将脚本放在底部 加上时间戳。

- 避免在页面的主体布局中使用 table，table 要等其中的内容完全下载之后才会显示出来，显示比 div+css 布局慢。

对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘 IO。向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如 join 查询），减少磁盘 IO 指尽量不使用文件系统作为缓存、减少读写文件次数等。

## 预加载、懒加载

> 延迟加载（懒加载）是一种将资源标识为非阻塞（非关键）资源并**仅在需要时加载**它们的策略。

图片懒加载

1. html 标签设置懒加载
2. js 方法实现懒加载
3. 调用 web api，即 IntersectionObserver
4. 使用第三方库，如 Layzload.js、Lozad.js
5. 运用框架中的懒加载组件，如 vue-lazyload、react-lazyload

1、html 标签设置懒加载

给 img 标签加上 loading 属性，并设置为 lazy ，表示该图片是懒加载的，只有在需要的时候才会加载。

示例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 300px;
        height: 5000px;
        background-color: #f00;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
    <div class="lazy">
      <img src="https://www.baidu.com/img/bd_logo1.png" loading="lazy" alt="" />
    </div>
  </body>
</html>
```

让图片超出可视范围，打开控制台的 network 面板，可以看到初始时浏览器并未加载图片，在滑动到快靠近图片时，才加载的图片资源。这里快靠近图片就加载，是因为浏览器的预加载行为

2、js 方法实现懒加载

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 300px;
        height: 5000px;
        background-color: #f00;
      }
    </style>
  </head>
  <body>
    <div class="box"></div>
    <div class="lazy">
      <img data-src="https://www.baidu.com/img/bd_logo1.png" class="imglazy" alt="" />
      <div class="box"></div>
      <img data-src="https://www.baidu.com/img/bd_logo.png" class="imglazy" alt="" />
    </div>

    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const lazyImages = document.querySelectorAll('.imglazy');

        function isElementInViewport(el) {
          const rect = el.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
        }

        function lazyLoad() {
          lazyImages.forEach((el) => {
            if (isElementInViewport(el)) {
              el.src = el.dataset.src;
              el.classList.remove('imglazy');
            }
          });
        }

        function throttle(fn, delay) {
          let timer = null;
          return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
              fn.apply(context, args);
            }, delay);
          };
        }

        // 这里使用节流，避免多次触发scroll事件
        window.addEventListener('scroll', throttle(lazyLoad, 500));
        lazyLoad();
      });
    </script>
  </body>
</html>
```

3、调用 IntersectionObserver

```js
document.addEventListener('DOMContentLoaded', function () {
  const lazyImages = document.querySelectorAll('.imglazy');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        entry.target.classList.remove('imglazy');
        observer.unobserve(entry.target);
      }
    });
  });
  lazyImages.forEach((el) => {
    observer.observe(el);
  });
});
```

##
