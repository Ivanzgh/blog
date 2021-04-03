# 前端模块化

## CommonJ 规范

`Node.js`遵循的就是`CommonJS`规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。可以从 `node_modules` 中引入一个库或者从本地目录引入一个文件。

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
define(['dep1', 'dep2'], function(dep1, dep2) {
  //Define the module value by returning a value.
  return function() {}
})
```

或者

```js
// "simplified CommonJS wrapping" https://requirejs.org/docs/whyamd.html
define(function(require) {
  const dep1 = require('dep1'),
    dep2 = require('dep2')
  return function() {}
})
```

## ESM

ESM 表示 ES6 的模块规范，支持异步特性，是最常用的一种规范。

```js
import axios from 'axios';
import {foo, bar} from './demo';

export default function() {};

export const function1() {};
export const function2() {};
```
