# Babel

## 简介

[官网](https://babeljs.io/)

babel 是 JavaScript 编译器。

用途：

- 转译 esnext、typescript、flow 等到目标环境支持的 js
- 代码的静态分析
- 特定用途的代码转换

## 参考资料

- [babal 学习手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
- [babel-plugin-import](https://github.com/umijs/babel-plugin-import)
- [babel 常见包的介绍](https://segmentfault.com/a/1190000043348439?utm_source=sf-similar-article)
- [小册《babel 插件通关秘籍》实战案例代码](https://github.com/QuarkGluonPlasma/babel-plugin-exercize)

## 编译流程

解析、转换、生成

- parse：把源码字符串转换成抽象语法树（AST）
- transform：遍历 AST，调用插件生成新的 AST
- generate：将转换后的 AST 生成目标代码，并生成 sourcemap

[AST 部分可以参考这里](./ast.md)

## 前期准备

### 1. 项目准备

先准备一个空项目

```sh
mkdir babel-1 && cd babel-1
npm init -y
mkdir src && cd src
touch index.js
```

在 `src/index.js` 写入简单代码:

```js
const fn = () => 1;
```

### 2. 安装依赖

`@babel/core`，核心模块

`@babel/cli`，终端运行工具

```sh
# 安装
npm i -D @babel/cli @babel/core

# 查看cli工具接受的选项
npx babel -h
```

### 3. 执行转译

解析 src 目录下的所有 js 文件，并将其转换后的文件都输出到 lib 目录下

```sh
npx babel src -d lib
```

也可以在 `package.json` 中配置脚本命令，之后运行`npm run build`

```json
{
  "scripts": {
    "build": "babel src -d lib"
  }
}
```

```sh
# 将结果打印到控制台
npx babel src/index.js

# 将某个目录的文件全部编译成一个新的目录
babel src --out-dir lib
# 缩写
babel src -d lib

# 将结果写入到指定的文件
babal src/a.js --out-file lib/a.js
# 缩写
babal src/a.js -o lib/a.js
```

## Plugins

plugins 就是 js 程序，让 Babel 如何对代码进行转换。

例如在`src/index.js`中使用了箭头函数，需要将其转为 ES5 代码

```sh
# 安装插件
npm i -D @babel/plugin-transform-arrow-functions

# 执行
npx babel src -d lib --plugins=@babel/plugin-transform-arrow-functions
```

然后在`lib/index.js`里可以看到将代码转为了以下所示

```js
const fn = function () {
  return 1;
};
```

### 如何生成一个插件

如 example-babel-plugin.js

```js
// 一个插件就是一个函数
export default function ({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        let name = path.node.name; // 反转字符串： JavaScript -> tpircSavaJ
        path.node.name = [...name].reverse().join('');
      }
    }
  };
}
```

## Presets

Presets 是一组 Plugins 的集合，代替预先设定的一组插件，避免逐一添加所需的插件。

例如，env 这个 preset 包括支持 ES6+的所有插件

```sh
npm i -D @babel/preset-env
```

继续在`src/index.js`中添加代码，使用 ES7 增加的求幂运算符

```js
const fn = () => 1;
let a = 3 ** 2;
```

执行这个 preset

```sh
npx babel src -d lib --presets=@babel/preset-env
```

然后打开`lib/index.js`看转换后的结果

```js
'use strict';

var fn = function fn() {
  return 1;
};
var a = Math.pow(3, 2);
```

### 其他 presets

```sh
npm install -D @babel/preset-react

npm install -D @babel/preset-typescript
```

## 配置

在终端手动输入很长的命令不太方便，所以更偏向于使用配置文件。在项目的根目录创建一个`babel.config.json`文件，需要 Babel v7.8.0 或更高版本。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": { "chrome": "80", "edge": "17", "firefox": "60", "safari": "11.1" }
      }
    ]
  ]
}
```

如果使用的是 Babel 的旧版本，则创建一个`babel.config.js`的文件

```js
const presets = [
  [
    '@babel/env',
    {
      targets: { chrome: '80', edge: '17', firefox: '60', safari: '11.1' }
    }
  ]
];

module.exports = { presets };
```

然后执行前面定义的脚本命令：`npm run build`

上方配置使用了 env 这个 preset，且只会为目标浏览器中没有的功能加载转换插件。

如配置了`chrome: '80'`表示转换完之后的代码支持到 chrome80 版本。执行脚本后发现`lib/index.js`里面到代码没有变化，这是因为 chrome80 版本已经支持了示例中的 ES6+ 代码（箭头函数、let、const、求幂运算），所以就没有必要将其转换了。如果更改为`chrome: '30'`会发现发生变化了，代码全部被转换为 ES5 代码。

## Polyfill

Polyfill 翻译为**垫片**，意为兜底的东西，是对执行环境或者其他功能的补充，让新的语法和方法也能在低版本浏览器里运行。

修改`src/index.js`，添加了 `Array.prototype.includes` 方法

```js
const fn = () => 1;
let a = 3 ** 2;
const b = [1, 2, 3].includes(1);
```

在 chrome30 版本中是不支持 includes 方法的，而 Polyfill 的作用就是引用一个可以使用的环境

```js
npm i core-js@3
```

配置`babel.config.json`，在前面配置的 targets 后面添加`useBuiltIns: 'usage'`。执行`npm run build`，转换后的代码如下，会发现在文件开头引入了一个文件，includes 方法能正常使用了

```js
'use strict';

require('core-js/modules/es7.array.includes.js');
var fn = function fn() {
  return 1;
};
var a = Math.pow(3, 2);
var b = [1, 2, 3].includes(1);
```

useBuiltIns 是`@babel/env`提供的参数，默认值是 false。`useBuiltIns: 'usage'`的作用是只加载所需要的 polyfill，即按需加载。
如果用了插件`@babel/plugin-transform-runtime`，就不能设置这个选项。

执行脚本时在终端有一段警告：

```sh
WARNING (@babel/preset-env): We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.

You should also be sure that the version you pass to the `corejs` option matches the version specified in your `package.json`'s `dependencies` section. If it doesn't, you need to run one of the following commands:

  npm install --save core-js@2    npm install --save core-js@3
  yarn add core-js@2              yarn add core-js@3
```

这是因为还缺少 corejs 的版本配置，`babel.config.json`完整配置如下：

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": { "chrome": "30", "edge": "17", "firefox": "60", "safari": "11.1" },
        "useBuiltIns": "usage",
        "corejs": "3.6.5"
      }
    ]
  ]
}
```

推荐使用 `core-js@3` + `@babel/preset-env`，然后设置`@babel/preset-env`的`corejs` 选项为 3

`@babel/polyfill`也可以实现，但是在 Babel7.4.0 以上已经不被推荐使用。

Q：既然 Plugins 能将新特性转换成目标浏览器支持的 js，那么为什么还需要 Polyfill 呢？

A：因为一些原型链上的实例方法（如 includes）是没法通过代码转过去用的，实例方法的内部实现很复杂。如果通过代码转换实现效果会很复杂，所以采用引入环境这样的方式来达到功能的补充

`@babel/plugin-transform-runtime`

## 工具包

- `@babel/parser` 对源码进行解析，可以通过 plugins、sourceType 等来指定 parse 语法
- `@babel/traverse` 通过 visitor 函数对遍历到的 AST 进行处理，分为 enter 和 exit 两个阶段，具体操作 AST 可以使用 path 的 api，还可以通过 state 在遍历过程中传递一些数据
- `@babel/types` 用于创建、判断 AST 节点
- `@babel/template` 用于批量创建节点
- `@babel/code-frame` 可以创建友好的报错信息
- `@babel/generator` 生成目标代码字符串
- `@babel/core` 核心包

## 插入函数调用参数

示例：通过 babel 自动在 console.log 中插入文件名和行列号的参数，方便定位到代码

- 函数调用表达式的 AST 是 CallExpression
- CallExrpession 节点有两个属性，callee 和 arguments，表示调用的函数名和参数
- 判断当 callee 是 console.xx 时，在 arguments 的数组中插入一个 AST 节点

```js
// console.js
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

const ast = parser.parse(sourceCode, {
  // 解析代码的模式，可选值：script、module、unambiguous
  sourceType: 'unambiguous', // 根据内容是否包含 import、export 自动设置
  plugins: ['jsx'] // 因为sourceCode用到了jsx语法，所以要启用jsx的plugin
});

const targetCalleeName = ['log', 'info', 'error', 'debug'].map((item) => `console.${item}`);

// traverse 过程中要声明对什么 AST 做什么修改， AST 可以在 astexplorer.net 来查看
traverse(ast, {
  CallExpression(path, state) {
    // const calleeName = generate(path.node.callee).code;
    const calleeName = path.get('callee').toString();
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;
      path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`));
    }
  }
});

const { code, map } = generate(ast);
console.log(code);
```

执行`node ./console.js`，可以看到类似形式：`console.log("filename: (2, 4)", 1);`
