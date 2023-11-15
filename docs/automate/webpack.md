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

官网：<https://webpack.js.org/>，进入文档从 Guides 模块的 [Getting Started](https://webpack.js.org/guides/getting-started/) 开始看

webpack 是一个构建工具

构建工具能解决什么问题？

- 混淆代码，让别人看不懂，提高保密性
- 提高代码兼容性
- 压缩代码体积，提高性能

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

##
