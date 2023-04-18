# 前端模块化

## CommonJS 规范

`Node.js`遵循的就是`CommonJS`规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。可以从 `node_modules` 中引入一个库或者从本地目录引入一个文件。Node.js 从`v13.2.0`之后也引入了规范的`ES Modules`机制，同时兼容早期的`CommonJS`

- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了
- 同步加载

```js
// import
const axios = require('axios')

function getData() {}

function postData() {}

// 导出单个
module.exports.getData = getData

// 导出所有
module.exports = { getData, postData }
```

## AMD 规范

AMD 规范表示异步模块定义。

```js
define(['dep1', 'dep2'], function (dep1, dep2) {
  //Define the module value by returning a value.
  return function () {}
})
```

或者

```js
// "simplified CommonJS wrapping" https://requirejs.org/docs/whyamd.html
define(function (require) {
  const dep1 = require('dep1'),
    dep2 = require('dep2')
  return function () {}
})
```

## ESM

ESM 表示 ES6 的模块规范，支持异步特性，是最常用的一种规范

```js
// a.js
const a = () => {}
const b = 'are you ok'
export { a, b }

// 导入
import { a, b } from 'a.js'
```

`export default`默认导出，一个模块内只能有一个，在 `import` 时可以用任意名字引入

```js
// default.js'
const a = () => {}
export default a

// 其他文件导入，可以任意命名，如jj
import jj from 'default.js'
```

还可直接在定义变量时就导出

```js
export const a = 100
export const b = () => {}
```

如果想在导入导出时重新命名

```js
// 导出时将a重新命名为test
export { a as test, b }

// 导入时将b重新命名为mm
import { a, b as mm } from 'a.js'
```

在导入时还可以将导出的变量声明成一个任意名字的对象的属性

```js
import * as obj from 'a.js'

console.log(obj.a)
console.log(obj.b)
```
