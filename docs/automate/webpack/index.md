---
outline: deep
---

# Webpack

::: tip
**目标**：学会使用 Webpack 进行前端项目的打包和优化。

**关键结果**：

1. 完成 Webpack 的基础学习，包括 Webpack 的安装、配置和使用方法。
2. 能够使用 Webpack 进行前端项目的打包和优化，包括代码分割、压缩、模块化等。
3. 实践使用 Webpack 进行前端项目的开发，包括搭建开发环境、打包发布等。
4. 学习 Webpack 的高级特性，包括插件开发、性能优化等。
5. 完成一个基于 Webpack 的前端项目，包括开发、打包、发布等环节。

- splitChunksPlugin、mini-css-extract-plugin、html-webpack-plugin
- Tree shaking
- Dll
- css extract

:::

## 简介

- 官网：<https://webpack.js.org>，进入文档从 Guides 模块的 [Getting Started](https://webpack.js.org/guides/getting-started) 开始看
- [中文文档](https://webpack.docschina.org/guides/getting-started)

webpack 是一个构建工具

构建工具能解决什么问题？

- 混淆代码，提高保密性
- 提高代码兼容性
- 模块整合，减少 http 请求
- 压缩代码体积，提高性能

```sh
pnpm add -D webpack webpack-cli
```

**基本概念：**

- **entry**: 使用哪个模块来作为构建的起始入口
- **output**: 打包后的文件放在哪里、如何命名这些文件
- **loader**: 处理文件的转换器，用于对模块源码进行转换。
  - webpack 自身只能识别 js、json 文件，像 css 、ts 、jsx 等文件都需要通过 loader 解析
- **plugin**: 扩展 webpack 的功能。比如打包优化、资源管理、注入环境变量等
- **mode**: 对于不同的环境选择不同的配置
  - 开发模式：development
  - 生产模式：production

```js
// webpack.config.js
module.exports = {
  entry: '',
  output: {},
  module: {
    rules: []
  },
  plugins: [],
  mode: ''
};
```

## mode

对于不同的环境选择不同的配置

- 开发模式：development
- 生产模式：production
- none

### 开发模式

这个模式下主要做两件事：

1、编译代码，使浏览器能识别运行

webpack 默认不能处理样式、字体、图像、html 等资源，所以要加载配置来编译这些资源

2、代码质量检查，检查代码规范和格式，统一团队编码风格

### 生产模式

- 优化代码运行性能
- 优化代码打包速度

### 环境配置

```sh
pnpm add -D webpack webpack-cli webpack-dev-server webpack-merge
```

- webpack 、webpack-cli：打包必备
- webpack-dev-server：一个提供热更新的开发服务器
- webpack-merge：合并配置文件

在根目录新建 scripts 目录，在里面创建三个配置文件：

- `webpack.base.js`，公用配置
- `webpack.dev.js`，开发环境配置
- `webpack.prod.js`，生产环境配置

获取环境变量：

```sh
pnpm add cross-env -D
```

配置脚本：

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack serve -c scripts/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack -c scripts/webpack.prod.js"
  }
}
```

```js
// webpack.base.js
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js'
  }
};

// webpack.dev.js
const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    open: true,
    port: 8080
  }
});

// webpack.prod.js
const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production'
});
```

## Output

```js
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/main.js', // 将 js 文件输出到 assets/js 目录中
    clean: true // 自动将上次打包目录资源清空
  }
};
```

## Loader

Loader 本质上是一个转换器，将匹配到的文件中的源码通过转换，使其变成另一种形态

例如，浏览器不认识 typescript 语法，但是可以通过 ts-loader 对其进行转换。从原理上来看，Loder 就是一个函数，参数为需要转换的源代码，返回转换后的新代码

示例：假如我想在代码里用中文定义变量，浏览器肯定不认识，这时可以写个 loader 去转换，设定的语法格式：`变量 name = 'zgh'`

```js
function chineseLoader(originCode) {
  return originCode.replace(/变量/g, 'let');
}
```

这里的`chineseLoader`就是一个极简单的 Loader

可以通过传入多个 Loader 以达到**链式调用**的效果，loader 会**从右到左**被应用

## Plugin

## webpack-dev-server

[webpack-dev-server](https://webpack.js.org/api/webpack-dev-server)，一个提供热更新的开发服务器

```sh
pnpm add -D webpack-dev-server
```

```js
// webpack.config.js
module.exports = {
  mode: 'development',
  devServer: {
    open: true, // 自动打开浏览器
    // host: "localhost", // 服务器域名
    port: 8080 // 服务器端口号
  }
};
```

运行指令：

```sh
npx webpack serve
```

在使用开发服务器时，所有代码都在内存中编译打包，并不会输出到 dist 目录下

## 处理样式资源

webpack 本身不能识别样式资源，需要使用对应的 loader 来处理。[快速上手 -> 加载 css](https://webpack.js.org/guides/asset-management/#loading-css)

### 处理 CSS

- [css-loader](https://webpack.docschina.org/loaders/css-loader)
- [style-loader](https://webpack.docschina.org/loaders/style-loader)

处理引入的 css 资源，如`import './index.css'`

```sh
pnpm add -D css-loader style-loader
```

- `css-loader`：将 css 转为 CommonJS 规范的 js 代码
- `style-loader`：将 js 模块转为 css 样式，并创建一个 style 标签，将样式插入到 DOM 中

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // 执行顺序是从右到左
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

### 处理 Less

[less-loader](https://webpack.docschina.org/loaders/less-loader)，将 less 文件编译成 css 文件

```sh
pnpm add -D less-loader
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
};
```

### 处理 Scss

[sass-loader](https://webpack.docschina.org/loaders/sass-loader)，将 Sass/SCSS 文件编译为 CSS

```sh
pnpm add -D sass sass-loader
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
```

### 处理 Stylus

[stylus-loader](https://webpack.docschina.org/loaders/stylus-loader)，将 Stylus 文件编译为 CSS

```sh
pnpm add -D stylus stylus-loader
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  }
};
```

### 处理 CSS 兼容性

[postcss-loader](https://webpack.docschina.org/loaders/postcss-loader)，使用 PostCSS 处理 CSS

```sh
pnpm add -D postcss postcss-loader postcss-preset-env
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  }
};
```

### 将 CSS 提取到单独的文件

[mini-css-extract-plugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/)，会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载

```sh
pnpm add -D mini-css-extract-plugin
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: 'static/css/main.css'
    })
  ]
};
```

### 压缩 CSS 体积

[css-minimizer-webpack-plugin](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/)，优化、压缩 CSS 体积

```sh
pnpm add -D css-minimizer-webpack-plugin
```

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  mode: 'production',
  plugins: [
    // css压缩
    new CssMinimizerPlugin()
  ]
};
```

## 处理图像

[快速上手 -> 加载图像](https://webpack.js.org/guides/asset-management/#loading-images)

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024 // 小于 25kb 会被转为 Base64
          }
        },
        generator: {
          filename: 'assets/imgs/[name].[hash:8][ext]'
        }
      }
    ]
  }
};
```

1、[Rule.parser.dataUrlCondition](https://webpack.docschina.org/configuration/module/#ruleparserdataurlcondition)，如果资源小于 maxSize，则会以 Base64 编码的形式注入到包里

- 优点：减少请求数量
- 缺点：资源会大一些

2、修改输出资源的名称和路径

```js
{
  generator: {
    filename: 'assets/imgs/[name].[hash:8][ext]';
  }
}
```

- [name]：文件名
- [ext]：文件之前的后缀
- [hash:8]：hash 值前 8 位

打包后，会生成一个`assets/imgs`文件夹，里面包含图像文件

::: tip

修改输出 js 的名称和路径

```js
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/main.js' // 将 js 文件输出到 assets/js 目录中
  }
};
```

:::

## 处理字体

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash:8][ext]'
        }
      }
    ]
  }
};
```

## 处理音视频

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(ttf|woff2?|map4|map3|avi)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/media/[hash:8][ext]'
        }
      }
    ]
  }
};
```

## 处理 html

自动引入打包之后的资源，避免手动引入打包后的资源。

例如，打包后的 js 资源形如`c84b3819.js`，如果手动引入如`<script defer="defer" src="c84b3819.js"></script>`，则太麻烦了

```sh
pnpm add -D html-webpack-plugin
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    })
  ]
};
```

以某个 html 文件为模板创建文件，这里是 `./public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1, minimal-ui, viewport-fit=cover"
    />
    <title></title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

生产模式默认开启了 html 压缩

## 处理 js

生产模式默认开启了 js 压缩

1. 兼容性处理。比如将 ES6 语法转换为 ES5 语法，使用 Babel
2. 代码格式处理，使用 Eslint

### Eslint 配置

<https://webpack.js.org/plugins/eslint-webpack-plugin/>

```sh
pnpm add -D eslint eslint-webpack-plugin
```

```js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  plugins: [
    new ESLintPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, 'src')
    })
  ]
};
```

### Babel 配置

```sh
pnpm add -D babel-loader @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

将 js、ts、jsx、tsx 文件都交给 babel-loader 处理，并配置对应的 presets，这些 presets 会从右向左执行

```js
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js'
  },
  resolve: {
    // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
    extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
    // 配置别名
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'last 2 versions, > 0.2%, not dead', // 根据项目去配置
                  useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
                  corejs: 3
                }
              ],
              ['@babel/preset-typescript'],
              ['@babel/preset-react']
            ]
          }
        }
      }
    ]
  }
};
```

执行`pnpm build`

## GZIP 压缩

## 依赖分析和 CDN 加速

这里以 Vue 项目打包优化为例，减少打包体积，生产环境使用 CDN 加速

### 依赖分析

依赖分析可以看出项目中各个依赖所占的打包体积，辅助分析可以优化的地方。

1、安装`webpack-bundle-analyzer`插件，[仓库地址](https://github.com/webpack-contrib/webpack-bundle-analyzer)

```sh
npm i -D webpack-bundle-analyzer
```

2、在`package.json`中配置分析命令：`build:analyze`，这里定义一个`ANALYZE_MODE`字段，并设置为 `true`

```json
{
  "scripts": {
    "dev": "vue-cli-service serve",
    "build:prod": "vue-cli-service build",
    "build:analyze": "ANALYZE_MODE=true vue-cli-service build --mode analyze"
  }
}
```

3、配置`vue.config.js`

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  chainWebpack(config) {
    // 依赖分析
    if (process.env.ANALYZE_MODE) {
      config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
    }

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      // 设置哪些资源不需要被打包，改为获取CDN资源
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        'element-ui': 'ELEMENT'
      });

      // 给 index.html 传参
      config.plugin('html').tap((args) => {
        args[0].useCdn = true;
        return args;
      });
    });
  }
};
```

关于[externals](https://webpack.js.org/configuration/externals/#root)，`{ key: value }`，其中 key 是第三方依赖库的名称，和`package.json` 文件中的依赖名称一样。关于 value 的值，先把 CDN 的链接打开查看源代码，一般就是暴露出来的全局变量名称

4、配置 index.html 模板，引入 CDN 链接

[配置参考链接](https://cli.vuejs.org/zh/guide/html-and-static-assets.html)

```html
<% if(htmlWebpackPlugin.options.useCdn==true) { %>
<script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-router@3.5.4/dist/vue-router.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios@1.3.6/dist/axios.min.js"></script>
<% } %>
```

常见的 CDN 提供商：[jsdelivr](https://www.jsdelivr.com/)、[cdnjs](https://cdnjs.com/libraries)、[bootcdn](https://www.bootcdn.cn/)、[unpkg](https://unpkg.com/)

如果有自建 CDN 服务，可以从 jsdelivr 上面下载各个库、各个版本的源码

5、执行命令，查看项目依赖体积情况

```sh
npm run build:analyze
```

## 项目生成目录结构

```sh
npm install mddir
```

进入目录：`cd node_modules/mddir/src`

执行：`node mddir '../../../src`，这里是只生成 src 目录下的结构，如果要生成全部的目录就去掉 src

执行之后得到一个`directoryList.md`文件，在`node_modules/mddir/src`路径下，
拷贝内容之后记得删除依赖

```sh
npm install mddir
```

如果需要忽略特定文件，可以在忽略规则中指定文件路径，例如：

```sh
node mddir -- ignore "node_modules|dist|/src/api/"
```

上面的命令将忽略`node_modules`、`dist`、`/src/api`目录下的文件

## webpack 构建过程

1. Compiler
2. Compilation
3. Module
4. Chunk
5. Bundle

## 项目打包优化

从以下角度来优化：

1. 提升开发体验
2. 提升打包构建速度
3. 减少代码体积
4. 优化代码运行性能

## SourceMap

SourceMap 用于映射源文件到构建文件，方便调试。会生成一个 map 后缀的文件，包含源代码和构建后的代码每一行、每一列的映射关系，当构建后的代码出错时，浏览器会自动跳转到源文件的对应位置。

[Devtool](https://webpack.js.org/configuration/devtool/)，控制是否生成、如何生成 SourceMap

```js
// 开发环境
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map'
};

// 生产环境
module.exports = {
  mode: 'production',
  devtool: 'source-map'
};
```

## HMR

Hot Module Replacement，在应用程序运行时替换、添加或删除模块，而无需完全重新加载

[介绍概念及工作原理](https://webpack.js.org/concepts/hot-module-replacement)

[介绍如何使用 HMR](https://webpack.js.org/guides/hot-module-replacement)

[HotModuleReplacementPlugin](https://webpack.js.org/plugins/hot-module-replacement-plugin)，启用热更新 (HMR)，

::: warning
不应在生产环境开启 HMR，因为 HMR 会触发浏览器刷新，导致用户操作丢失
:::

1. 更新 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 配置

```js
module.exports = {
  devServer: {
    hot: true // 开启HMR功能
  }
};
```

此时 css 样式会经过 style-loader 处理后具备 HMR 功能，但是 js 还不行

2. 配置 js

```js
// main.js
import moduleA from './moduleA.js';
import moduleB from './moduleB.js';

if (module.hot) {
  module.hot.accept('./moduleA.js', function () {
    console.log('Accepting the updated moduleA module!');
    moduleA();
  });

  module.hot.accept('./moduleB.js', function () {
    console.log('Accepting the updated moduleB module!');
    moduleB();
  });
}
```

这样配置很麻烦，实际开发会使用其他 loader 来处理 js，如：

- [React Hot Loader](https://github.com/gaearon/react-hot-loader)
- [Vue Loader](https://github.com/vuejs/vue-loader)

## Tree Shaking

[Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 是指在构建时，移除未使用的 js 代码，以减少代码体积。

## PWA

[渐进式网络应用程序(progressive web application - PWA)](https://webpack.js.org/guides/progressive-web-application/)，是一种可以提供类似于原生应用程序体验的 web app，提供离线运行功能

```sh
pnpm add -D workbox-webpack-plugin
```

```js
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  plugins: [
    new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};
```

入口文件 main.js 添加注册代码：

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
```

## 代码分割

[split chunks](https://webpack.js.org/guides/code-splitting/)

将打包后的代码分割成多个文件，按需加载

### 1. 配置多入口

配置了几个入口，就至少输出几个 js 文件

```js
const path = require('path');

module.exports = {
  mode: 'development',
  // entry: './src/index.js', // 单入口
  entry: {
    index: './src/index.js',
    print: './src/foo.js'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  }
};
```

### 2. 提取重复代码

如果多个文件都引入了同一份代码，那么这一份代码会被打包到多个文件中，导致体积变大。可以提取打包公共的代码，其他文件引用打包后的 js 文件

[splitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)

SplitChunksPlugin 的默认配置：

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000, // 分割代码最小的大小
      minRemainingSize: 0, // 类似于minSize，确保最后提取的文件大小不能为0
      minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 30, // 入口js文件最大并行请求数量
      enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // 组，哪些模块要打包到一个组
      cacheGroups: {
        // 组名
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          priority: -10, // 权重（越大越高）
          reuseExistingChunk: true // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则将重用该chunk，而不是生成新的模块
        },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minChunks: 2, // 这里的minChunks权重更大
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

示例：

::: code-group

```js [index.js]
import { a } from './com';

console.log(a);

console.log('index');
```

```js [foo.js]
import { a } from './com';

console.log(a);

console.log('foo');
```

```js [com.js]
export const a = 1;
```

:::

webpack.config.js

```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/foo.js'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all', // 对所有模块都进行分割
      cacheGroups: {
        default: {
          minSize: 0,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

### 3. 动态导入，实现按需加载

修改文件内容：

::: code-group

```js [index.js]
console.log('index');

document.getElementById('btn').onclick = function () {
  import('./com.js').then((res) => {
    console.log(res);
  });
};
```

```js [foo.js]
console.log('foo');
```

```js [com.js]
export const a = 1;
```

```html [public/index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Code Split</title>
  </head>
  <body>
    <button id="btn">引入com.js</button>
  </body>
</html>
```

:::

wepack.config.js 配置：

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/foo.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    })
  ],
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: {
          minSize: 0,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

执行`npx webpack`，打开`dist/index.html`，点击按钮，会加载`com.js`，可以在控制台的 NetWork 查看加载顺序，然后在控制台输出`com.js`里的内容。

所以，通过 import 动态导入语法导入模块，模块就被代码分割，同时也能按需加载了

### 给动态导入的文件命名

在前面的例子中，动态导入的 com.js 在打包后的文件名为 `src_com_js.bundle.js`，如果要给动态导入的文件命名，可以使用 webpackChunkName

修改 index.js 内容：

```js
console.log('index');

document.getElementById('btn').onclick = function () {
  import(/* webpackChunkName: "common" */ './com.js').then((res) => {
    console.log(res);
  });
};
```

"common"会作为`[name]`的值显示，执行`npx webpack`，然后就可以看到名称变为`common.bundle.js`了

eslint 会对动态导入语法报错，需要修改 eslint 配置文件：

```sh
pnpm add -D eslint-plugin-import
```

```js
// .eslintrc.js
module.exports = {
  plugins: ['import']
};
```

## Preload、Prefetch

[prefetching/preloading modules](https://webpack.js.org/guides/code-splitting/#prefetchingpreloading-modules)

Preload 和 Prefetch 是 webpack 提供的资源**预加载**功能，可以减少页面加载时间。

- Preload：告诉浏览器立即加载资源，适用于首屏加载
- Prefetch：告诉浏览器在空闲时才开始加载资源

共同点：

- 都只会加载资源，并不执行
- 都有缓存

区别：

- Preload 加载优先级高，Prefetch 加载优先级低
- Preload 只能加载当前页面需要使用的资源，Prefetch 可以加载当前页面资源，也可以加载下一个页面需要使用的资源

问题：兼容性较差，Preload 相对于 Prefetch 兼容性好一点

总结：

- 当前页面优先级高的资源用 Preload 加载
- 下一个页面需要使用的资源用 Prefetch 加载

```sh
pnpm add -D @vue/preload-webpack-plugin
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin()
    new PreloadWebpackPlugin({
      rel: "preload", // preload兼容性更好
      as: "script",
    })
  ]
}
```
