# Webpack

::: tip
**目标**：学会使用 Webpack 进行前端项目的打包和优化。

**关键结果**：

1. 完成 Webpack 的基础学习，包括 Webpack 的安装、配置和使用方法。
2. 能够使用 Webpack 进行前端项目的打包和优化，包括代码分割、压缩、模块化等。
3. 实践使用 Webpack 进行前端项目的开发，包括搭建开发环境、打包发布等。
4. 学习 Webpack 的高级特性，包括插件开发、性能优化等。
5. 完成一个基于 Webpack 的前端项目，包括开发、打包、发布等环节。

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

## Loader

Loader 本质上是一个转换器，将匹配到的文件中的源码通过转换，使其变成另一种形态。

例如，浏览器不认识 typescript 语法，但是可以通过 ts-loader 对其进行转换。从原理上来看，Loder 就是一个函数，参数为需要转换的源代码，返回转换后的新代码

示例：假如我想在代码里用中文定义变量，浏览器肯定不认识，这时可以写个 loader 去转换，设定的语法格式：`变量 name = 'zgh'`

```js
function chineseLoader(originCode) {
  return originCode.replace(/变量/g, 'let');
}
```

这里的`chineseLoader`就是一个极简单的 Loader

- [加载 css](https://webpack.js.org/guides/asset-management/#loading-css)
- [加载图像](https://webpack.js.org/guides/asset-management/#loading-images)
-

## Plugin

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

## css 样式配置

- css-loader：将 css 解析成 js，但不能挂载到元素上
- style-loader： 将 css 样式通过 style 标签插入到 head 标签中

```sh
pnpm add -D style-loader css-loader
```

webpack.config.js

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

先后顺序：'style-loader' 在前，'css-loader' 在后

- [mini-css-extract-plugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin/)：会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载
- [css-minimizer-webpack-plugin](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/)：优化、压缩 CSS 体积
