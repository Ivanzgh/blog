# postcss

- 官网：[https://postcss.org](https://postcss.org)
- github：[https://github.com/postcss/postcss](https://github.com/postcss/postcss)

使用 JavaScript 转换 CSS 的工具

## 安装

```sh
pnpm add -D postcss postcss-cli
```

打包：

```sh
npx postcss style.css -o dist.css
```

## 添加浏览器前缀

```sh
pnpm add -D autoprefixer
```

使用插件：

```sh
npx postcss style.css -o dist.css -u autoprefixer
```

查看哪些属性需要添加前缀：

```sh
npx autoprefixer --info
```

## 创建`postcss.config.js`

在项目根目录下创建`postcss.config.js`文件，内容如下：

```js
module.exports = {
  plugins: [require('autoprefixer')]
};
```

此时就不需要在命令行添加`-u autoprefixer`了

```sh
npx postcss style.css -o dist.css
```

## 配置脚本命令

在 package.json 中添加脚本命令：

```json
{
  "scripts": {
    "build": "postcss style.css -o dist.css"
  }
}
```

后续只需要执行`pnpm build`即可

## 支持 css 最新的特性

安装预设，支持 css 最新的特性

```sh
pnpm add -D postcss-preset-env
```

例如使用嵌套语法：

```css
.box {
  bgckground: green;
  &:hover {
    bgckground: red;
  }
}
```

## 配置 stylelint

```sh
pnpm add -D stylelint stylelint-config-standard
```

创建`.stylelintrc.json`文件

```json
{
  "extends": ["stylelint-config-standard"]
}
```

然后在`postcss.config.js`中使用：

```js
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    require('stylelint'),
    require('autoprefixer'),
    postcssPresetEnv({
      stage: 0
    })
  ]
};
```

执行打包命令后，就可以看到一堆警告信息

## 配置 postcss-pxtorem

[https://github.com/cuth/postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)

```sh
pnpm add -D postcss-pxtorem
```

然后在`postcss.config.js`中使用：

```js
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    require('stylelint'),
    require('autoprefixer'),
    postcssPresetEnv({
      stage: 0
    }),
    require('postcss-pxtorem')
  ]
};
```

执行命令后，可以在打包后的 css 文件中看到 px 单位被转为 rem

**使用默认设置时，仅针对与字体相关的属性**。如果想让其他属性也支持转换，可以配置`propList`

```js
const postcssPresetEnv = require('postcss-preset-env');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  plugins: [
    require('stylelint'),
    require('autoprefixer'),
    postcssPresetEnv({
      stage: 0
    }),
    pxtorem({
      propList: ['*']
    })
  ]
};
```
