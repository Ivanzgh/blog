# Webpack

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

## GZIP 压缩

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
