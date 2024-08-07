# 模块化规范

## 模块化历史

1、文件划分形式

- 每个文件是一个独立的模块，通过 script 标签引入不同模块
- 缺点：模块之间缺少依赖关系、维护困难、没有私有空间、变量污染等

```html
<script src="a.js"></script>
<script src="b.js"></script>
```

2、命名空间形式

- 规定每个模块只暴露一个全局对象，然后模块的内容都挂载到这个对象中
- 未解决依赖关系
- 外部可以更改模块内的变量

```js
window.moduleA = {
  name: 'zgh',
  f1: function () {}
};

modeluA.name = 'js';
```

3、立即执行函数

为模块提供私有空间，通过参数的形式作为依赖声明。本质是匿名函数的自调用。

```js
(function ($) {
  var name = 'zgh';

  function f1() {}

  window.moduleA = {
    f1: f1
  };
})(jQuery);
```

- 用 script 标签在页面引入模块，模块的加载不受控，维护困难
- script 标签的加载顺序不能乱。例如例子中的 Jquery 必须要在前面

理想方式：在页面中引入一个 JS 入口文件，其余的模块可以通过代码控制，**按需加载**进来

除了模块加载的问题以外，还需要规定模块化的规范，当前主流是 CommonJS 、ES Modules

## 模块化概述

### 什么是模块化？

> 将一个复杂的程序依据一定的规范封装成几个模块，并组合在一起。

模块的内部数据、方法是私有的，只是向外部暴露一些接口方法与外部模块通信。

### 为什么要有模块化？

- 数据、方法都是私有的，避免命名冲突，减少命名空间污染
- 降低耦合性，模块拆分，按需加载
- 高复用性，独立的功能模块便于多处复用
- 高可维护性，维护单独的小模块更方便，如果维护一个有很多功能放在一起的大文件会很困难

### 为什么要引入模块化规范？

如果引入模块化，可能就是在一个文件中引入多个 js 文件，如：

```html
<script src="a.js"></script>
<script src="b.js"></script>
<script src="c.js"></script>
```

这样做会带来很多问题：

- 请求过多：引入 n 个 js 文件，就有 n 次 http 请求
- 依赖模糊：不同的 js 文件可能会相互依赖，如果改一个文件，其他文件可能会报错

最终可能难以维护，所以引入了模块化**规范**

## CommonJS 规范

CommonJS 规范是一套约定标准，主要内容是模块通过 `module.exports` 导出对外的变量或接口，通过 `require()` 来导入其他模块的输出到当前模块作用域中。

- 每个文件就是一个模块，有自己的作用域
- 在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见
- 可以从 `node_modules` 中引入一个库或者从本地目录引入一个文件
- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了
- **同步加载**

> Node.js 早期遵循的就是`CommonJS`规范。从`v13.2.0`之后也引入了规范的`ES Modules`机制，同时兼容早期的`CommonJS`

### 模块的导入导出

引入模块的方式：

```js
const module1 = require('模块名');
```

暴露的模块本质是 exports 对象

```js
const axios = require('axios');

function getData() {}

function postData() {}

// 方式一、exports
exports.getData = getData;

// 方式二、module.exports
// 导出单个
module.exports.getData = getData;

// 导出所有
module.exports = { getData, postData };
```

### 模块的初始化

一个模块中的 JS 代码仅在模块第一次被使用时执行一次，并且在使用的过程中进行初始化，然后会被缓存起来，便于后续继续使用

示例：add.js

```js
let a = 1;

function add() {
  return ++a;
}

exports.add = add;
```

在 main.js 中引入 add.js 模块

```js
let addModule1 = require('./add');
let addModule2 = require('./add');

console.log(addModule1.add()); // 2
console.log(addModule2.add()); // 3
```

在终端执行 `node main.js` 运行程序，可以看出 add.js 这个模块虽然被引用了两次，但只初始化了一次

## AMD

AMD (Asynchronous Module Definition) 是 js 中一种模块定义的规范，可以在浏览器端**异步加载**模块

AMD 规范主要解决的问题是浏览器中模块化开发的时候，如何保证模块的依赖能够被正确地加载。在 AMD 规范中，**模块是以函数的形式组织，并且需要通过 define 函数进行定义**

```js
define(id?, dependencies?, factory);
```

- id 是可选参数，表示模块标识符
- dependencies 是可选参数，表示依赖的模块列表
- factory 是一个函数，在模块加载完成后执行。这个函数返回模块的接口

```js
define('moduleA', ['moduleB', 'moduleC'], function (moduleB, moduleC) {
  // ... do something ...
  return {};
});
```

这里定义了一个名为 moduleA 的模块，它依赖于 moduleB 和 moduleC 两个模块。在 factory 函数中可以使用这些依赖模块，并返回该模块对外暴露的接口。

使用 require 函数来获取一个模块的接口：

```js
require([dependencies], callback);
```

- dependencies 需要加载的模块列表
- callback 是一个函数，在所有依赖模块都被加载完成后执行。在该函数中，可以使用依赖模块的接口。

例如加载上面定义的 moduleA 模块

```js
require(['moduleA'], function (moduleA) {
  // ... do something ...
});
```

通常情况下会使用 [RequireJS](https://requirejs.org) 库来实现 AMD 规范的模块加载和管理。[Why AMD](https://requirejs.org/docs/whyamd.html)

## CMD

CMD（Common Module Definition） 规范和 AMD 很相似，尽量保持简单，并与 CommonJS 规范保持了很大的兼容性。

- 优点是依赖就近，延迟执行，容易在 Node.js 中运行
- 缺点是依赖 SPM 打包，模块的加载逻辑偏重
- 代表实现有 [Sea.js](https://github.com/seajs/seajs)

依赖就近：执行到这一部分的时候，再去加载对应的文件

```js
define(function (require, exports, module) {
  const dep1 = require('dep1');
  const dep2 = require('dep2');
  exports.doSomething = {};
  module.exports = {};
});
```

## UMD

UMD（Universal Module Definition）规范类似于兼容 CommonJS 和 AMD 的语法糖，是模块定义的跨平台解决方案

## ESM

ESM（ES Modules）表示 ES6 的模块规范，支持异步特性，是最常用的一种规范

```js
// a.js
const a = () => {};
const b = 'are you ok';
export { a, b };

// 导入
import { a, b } from 'a.js';
```

`export default`默认导出，一个模块内只能有一个，在 `import` 时可以用任意名字引入

```js
// default.js
const a = () => {};
export default a;

// 其他文件导入，可以任意命名
import foo from 'default.js';
```

还可直接在定义变量时就导出

```js
export const a = 100;
export const b = () => {};
```

如果想在导入导出时重新命名

```js
// 导出时将a重新命名为test
export { a as test, b };

// 导入时将b重新命名为mm
import { a, b as mm } from 'a.js';
```

在导入时还可以将导出的变量声明成一个任意名字的对象的属性

```js
import * as obj from 'a.js';

console.log(obj.a);
console.log(obj.b);
```

## 构建工具

有了模块化和模块化规范，那具体怎么落地实现呢？

开发方式从 JSP、PHP、原生 JavaScript、jQuery，再到 Angular、React、 Vue 框架。从 ES5、ES6+，再到 TypeScript，以及 less、scss 等。前端开发变的复杂，会遇到一些问题：

- 需要模块化开发，逻辑复用
- 使用高级特性来加快开发效率，如 ES6+、sass、less
- 监听文件的变化并反映到浏览器上（热更新）
- 静态资源需要模块化
- 代码压缩、合并以及其他相关的优化

所以 webpack、vite、rollop、gulp、turbopack 等构建工具就产生了
