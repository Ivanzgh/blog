# rollup

官网：<https://rollupjs.org/guide/en/>

仓库地址：<https://github.com/rollup/rollup>

中文文档：<https://www.rollupjs.com/>

`Rollup` 是一个`JavaScript`模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。

## 快速上手

安装

```sh
npm i rollup -g        # 全局安装
npm i rollup -D        # 项目本地安装
```

首先初始化一个项目`npm init -y`，在`src`文件夹下新建`main.js`和`foo.js`

```js
// foo.js
export function hello() {
  console.log('hello world')
}

// main.js
import { hello } from './foo.js'

hello()
```

在`package.json`中添加打包命令，然后执行`npm run build`即可得到打包后的`bundle.js`

```sh
"build": "rollup -i src/main.js -o dist/bundle.js -f es"
```

- `-i`（--input）后面的`src/main.js`表示入口文件
- `-o`（--output.file）后面的`dist/bundle.js`表示打包后的文件目录
- `-f`（--format）指定打包格式，`es`表示 ESM，即`ES6`模块规范

## 配置文件

在项目根目录下新建一个`rollup.config.js`文件

```js
export default {
  input: './src/main.js',
  output: {
    file: './dist/bundle.js',
    format: 'es'
  }
}
```

然后修改打包命令为`"build": "rollup -c"`即可

也可以按多种规范打包，如下配置会得到 3 个不同的文件

```js
export default {
  input: './src/main.js',
  output: [
    {
      file: './dist/bundle-umd.js',
      format: 'umd',
      name: 'bundle'
    },
    {
      file: './dist/bundle-es.js',
      format: 'es'
    },
    {
      file: './dist/bundle-cjs.js',
      format: 'cjs'
    }
  ]
}
```

rollup 支持的打包文件的格式有`amd`、`cjs`、`es/esm`、`iife`、`umd`

其中`amd`为`AMD`规范，`cjs`为`CommonJS`规范，`esm/es`为`ES`模块规范，`iife`为立即调用函数，
`umd`同时支持 `amd`、`cjs` 和 `iife`

## 插件

### 支持 ES6 语法

`rollup-plugin-babel`用于转换 ES6 语法

```sh
npm i rollup-plugin-babel @babel/core @babel/preset-env -D
```

首先配置`rollup.config.js`文件

```js
import babel from 'rollup-plugin-babel'

export default {
  input: './src/main.js',
  output: {
    file: './dist/bundle.js',
    format: 'es'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
```

然后在项目根目录下新建`.babelrc`文件

```json
{
  "presets": [["@babel/preset-env"]]
}
```

### 支持 CommonJS 规范

rollup 默认不支持`CommonJS`规范，但是第三方库可能使用的是`cjs`，配置`rollup-plugin-commonjs`插件即可

```sh
npm i rollup-plugin-commonjs -D
```

配置`rollup.config.js`

```js
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: './src/main.js',
  output: {
    file: './dist/bundle.js',
    format: 'es'
  },
  plugins: [commonjs()]
}
```

### CSS 处理

`rollup-plugin-postcss`插件支持 css 文件的加载、css 加前缀、css 压缩、对 scss/less 的支持等

```sh
npm i rollup-plugin-postcss postcss -D
```

`rollup.config.js`

```js
import postcss from 'rollup-plugin-postcss'

export default {
  input: './src/main.js',
  output: {
    file: './dist/bundle.js',
    format: 'es'
  },
  plugins: [postcss()]
}
```

`autoprefixer`插件可以自动给 css 加前缀

```sh
npm i autoprefixer@9.8.6 -D
```

css 压缩

```sh
npm i cssnano cssnano-preset-default -D
```

抽离 css 文件

```js
postcss({
  plugins: [autoprefixer(), cssnano()],
  extract: 'css/index.css'
})
```

默认支持 scss、less、stylus

### 代码压缩

`rollup-plugin-terser`

```js
import { terser } from 'rollup-plugin-terser'

export default {
  plugins: [terser()]
}
```

### 热更新

`rollup-plugin-serve`用于启动一个服务器，`rollup-plugin-livereload`用于文件变化时，实时刷新页面

```js
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  input: './src/main.js',
  output: {
    file: './dist/bundle-umd.js',
    name: 'umd',
    format: 'umd'
  },
  plugins: [
    serve({
      contentBase: '', //服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
      port: 8081 //端口号，默认10001
    }),
    livereload('dist') //监听dist目录，当目录中的文件发生变化时，刷新页面
  ]
}
```

在`index.html`中引入打包文件`<script src="./dist/bundle-umd.js"></script>`

此时修改src下的源代码并不会刷新页面，需更改打包命令为`"build": "rollup -wc"`即可，添加`-w`或`--watch`
