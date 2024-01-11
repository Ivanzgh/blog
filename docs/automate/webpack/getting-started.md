# 快速入门

## 基本使用

创建项目、安装依赖：

```sh
mkdir webpack-demo
cd webpack-demo

pnpm init
pnpm add -D webpack webpack-cli
```

创建 src/index.js

1、简单写入：

```js
function component() {
  const element = document.createElement('div');
  return element;
}

document.body.appendChild(component());
```

执行 `npx webpack` 即可创建 dist 目录，并产生了 main.js 文件，打开后可以看到：

```js
document.body.appendChild(document.createElement('div'));
```

构建后的内容很简单，将代码简化并压缩成一行了

2、引入第三方库 lodash

```sh
npm install --save lodash
```

```js
import _ from 'lodash';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}

document.body.appendChild(component());
```

执行 `npx webpack`之后打开 dist/main.js 发现完全看不懂内容

可以看到控制台有警告信息：

> WARNING in configuration
> The 'mode' option has not been set, webpack will fallback to 'production' for this value.
> Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
> You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/

信息显示需要配置 mode 参数，可选项有 development 或者 production（默认值），执行配置：

```sh
npx webpack --mode=development
```

再打开 main.js 还是看不懂，但是开头的注释信息提到了 eval 开发工具

```js{2,6}
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
```

直接禁用 eval，执行：

```sh
npx webpack --mode=development --devtool=false
```

结果依然复杂，因为 webpack 对 loadsh 做了处理，这里就去掉 loash。新建 src/utils.js，内容如下：

```js
export const foo = () => {
  console.log('hello');
};

const key = 'world';

export default key;
```

src/index.js 内容如下：

```js
import key, { foo } from './utils';

function component() {
  const element = document.createElement('div');

  foo();
  console.log('key', key);

  return element;
}

document.body.appendChild(component());
```

为了简化命令行输入，在 package.json 里创建一个 build 脚本，后续就可以使用`pnpm build`

```json
 "scripts": {
    "build": "rm -rf ./dist && webpack --mode=development --devtool=false"
  },
```

执行`pnpm build`，查看 main.js

## main.js 结果分析

```js
// 立即执行函数表达式 IIFE
(() => {
  'use strict';

  // 对象存储模块
  var __webpack_modules__ = {
    './src/utils.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      // 标记模块为 ES Module
      __webpack_require__.r(__webpack_exports__);
      // 定义模块导出
      __webpack_require__.d(__webpack_exports__, {
        default: () => __WEBPACK_DEFAULT_EXPORT__, // 默认导出
        foo: () => foo // 命名导出
      });

      const foo = () => {
        console.log('hello');
      };

      const key = 'world';

      // 默认导出 key
      const __WEBPACK_DEFAULT_EXPORT__ = key;
    }
  };

  // 模块缓存
  var __webpack_module_cache__ = {};

  // require 函数，用于加载模块
  function __webpack_require__(moduleId) {
    // 检查模块是否缓存
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // 创建一个新的模块，并放入缓存对象里
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {}
    });

    // 执行模块函数
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    return module.exports;
  }

  /* webpack/runtime/define property getters */
  (() => {
    // 定义 getter 函数用于导出属性
    __webpack_require__.d = (exports, definition) => {
      for (var key in definition) {
        if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
      }
    };
  })();

  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    // 判断对象是否具有指定属性的快捷方法
    __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  })();

  /* webpack/runtime/make namespace object */
  (() => {
    // 定义 __esModule 标记模块为 ES Module
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();

  var __webpack_exports__ = {};

  // ./src/index.js 入口模块，使用 IIFE 与其他模块隔离
  (() => {
    // 标记当前模块为 ES Module
    __webpack_require__.r(__webpack_exports__);
    // 引入 utils 模块
    var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__('./src/utils.js');

    function component() {
      const element = document.createElement('div');

      // 调用 utils 模块中的 foo 函数
      (0, _utils__WEBPACK_IMPORTED_MODULE_0__.foo)();
      // 打印 utils 模块中的默认导出
      console.log('key', _utils__WEBPACK_IMPORTED_MODULE_0__['default']);

      return element;
    }

    document.body.appendChild(component());
  })();
})();
```

::: warning 注意
webpack 不会更改除了 import 和 export 语句以外的任何代码。如果在使用 ES2015 的其他功能，可以通过 webpack 的 Loader 去使用转译器，如 Babel
:::

## 配置文件

在根目录新建 `webpack.config.js`配置文件，有了这个就不需要在终端输入大量命令，在这里配置即可

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

::: tip

- `path.resolve()`返回一个绝对路径
- `__dirname` 当前文件的文件夹绝对路径

:::

然后执行 `npx webpack --config webpack.config.js`

如果存在`webpack.config.js`文件，默认情况下 webpack 会使用这个文件，只需要执行`npx webpack`即可。

使用`--config`可以传递任何名称的配置，比如配置文件叫 `config.js`，那么就可以执行`npx webpack --config config.js`。在面对多个配置文件的时候很有用

更改 package.json 里的 npm 脚本：

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
```

以后就可以使用 `pnpm build`代替`npx webpack`命令

## 如何快速查看配置项

如果在`webpack.config.js`中添加配置，编辑器是没有任何提示的。比如我想配置 mode 有哪些可选项，可以添加一个注释：`@type {import('webpack').Configuration}`，这里编辑器会提示 Configuration 字段，然后就可以看到 mode 的可选项提示了。

一般的，在使用其他库的时候也可以尝试这样做，还有一些库会给出一个 defineConfig 字段，如`import { defineConfig } from 'vitepress';`

```js{12}
const path = require('path');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development'
};
```

## FAQ

`npx webpack`

npx 是什么？

执行`npx webpack`后发生了什么？什么是可执行文件？

`npx webpack --mode=development`，这里的 mode 的作用是什么？有哪些可选项？

node 命令行如何传递和接收参数的？

webpack 能转换我们的代码，那么肯定涉及到文件读取和写入的操作。node 是如何读取和写入文件的？
