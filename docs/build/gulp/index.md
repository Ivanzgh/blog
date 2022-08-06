# Gulp

中文官网：[https://v3.gulpjs.com.cn/](https://v3.gulpjs.com.cn/)

## 入门指南

### 1. 全局安装 gulp

```sh
npm install --global gulp
```

### 2. 作为项目的开发依赖（devDependencies）安装

```sh
npm install --save-dev gulp
```

### 3. 在项目根目录下创建一个名为 gulpfile.js 的文件

```js
const gulp = require('gulp')

gulp.task('testname', function() {
  // 将你的默认的任务代码放在这
})
```

### 4. 运行 gulp

```sh
gulp testname
```

## API 文档

### gulp.src(globs[, options])

获取文件路径

```js
// 获取src/js文件夹下的所有js文件,base默认为src/js/
gulp
  .src('src/js/**/*.js')
  .pipe(minify()) // 文件流过管道，经过插件处理
  .pipe(gulp.dest('dist')) // 写入 'dist/test.js'

gulp
  .src('src/js/**/*.js', { base: 'src' })
  .pipe(minify())
  .pipe(gulp.dest('dist')) // 写入 'dist/js/test.js'
```

### gulp.dest(path[, options])

文件处理后的存放位置

### gulp.task(name[, deps], fn)

定义一个任务

### gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])

监视文件，并且可以在文件发生改动时候做一些事情。

示例:

在 gulpfile.js 中新建一个任务 portal，将三个文件夹下的所有内容打包到 portal/版本号文件夹下，注意以.开头的文件需要单独写出

```js
gulp.task('portal', () => {
  return gulp
    .src(['./demos/**', './docs/**', './index/**', './demos/**/.npmignore'], { base: './' })
    .pipe(gulp.dest('portal/' + package.version))
})
```

## 插件开发

实现一个将字符串添加到文件开头的功能

首先新建一个 package.json 文件

```sh
npm init
```

然后在根目录下新建一个入口文件 index.js

```js
let through = require('through2')

function gulp_prefix(prefix) {
  if (!prefix) {
    prefix = ''
  }
  // 新建buffer
  var prefix = Buffer.from(prefix)

  let stream = through.obj(function(file, encoding, callback) {
    // 如果file类型不是buffer 退出不做处理
    if (!file.isBuffer()) {
      return callback()
    }
    // 将字符串加到文件数据开头，file.contents.toString()可以将buffer类型转为string类型
    file.contents = Buffer.concat([prefix, file.contents])
    // 确保文件会传给下一个插件
    this.push(file)
    // 告诉stream引擎，已经处理完成
    callback()
  })
  return stream
}
module.exports = gulp_prefix
```

接着将 index.js 文件复制到项目的 node_modules/gulp-prefix 文件夹下

最后在根目录下新建一个 gulpfile.js 文件

```js
const gulp = require('gulp')
const prefix = require('gulp-prefix')

gulp.task('prefix', function() {
  return gulp
    .src('src/*.js')
    .pipe(prefix('我是要传递给插件到参数'))
    .pipe(gulp.dest('dist'))
})
```

运行:

```sh
gulp prefix
```

测试

::: tip
如果需要命令行传参，可以使用 minimist 插件
:::

在 gulp-prefix 插件中

```js
const minimist = require('minimist')

let knownOptions = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'prod'
  }
}
let options = minimist(process.argv.slice(2), knownOptions)
let baseEnv = options.env // baseEnv即是命令行传递到参数
```

传递参数 dev，运行：

```sh
gulp prefix --env dev
```

最后一步就是发布插件，详细步骤可参考本博客的 npm 模块。
