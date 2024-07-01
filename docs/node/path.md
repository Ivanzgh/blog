# path 模块

[文档](https://nodejs.org/docs/latest/api/path.html)

可以处理文件和目录路径。

- `path.resolve` 拼接规范的**绝对路径**
- `path.sep` 获取操作系统的路径分隔符
- `path.parse` 解析路径并返回对象
- `path.basename` 获取路径的基础名称
- `path.dirname` 获取路径的目录名
- `path.extname` 获取路径的扩展名
- `path.join` 拼接路径

补充：

- `__dirname` 当前模块的目录名，绝对路径
- `__filename` 当前模块的文件名，绝对路径

```js
const path = require('path');

// 结果：Windows下是反斜杠 \ ，linux下是正斜杠 /
console.log(path.sep);

console.log(path.resolve(__dirname, '1.txt')); // 结果：/Users/zgh/code/blog/1.txt

const pathName = '/Users/zgh/code/blog/1.txt';

console.log(path.basename(pathName)); // 1.txt
console.log(path.basename(pathName, '.txt')); // 第二个参数表示去掉后缀，结果是1

console.log(path.dirname(pathName)); // 结果：/Users/zgh/code/blog

console.log(path.extname(pathName)); // .txt

console.log(path.join('/Users/zgh/code/blog', '1.txt')); // 结果：/Users/zgh/code/blog/1.txt

console.log(path.parse(pathName));
// {
//   root: '/',
//   dir: '/Users/zgh/code/blog',
//   base: '1.txt',
//   ext: '.txt',
//   name: '1'
// }
```

## path.resolve()

`path.resolve()`的第二个参数可以写`'1.txt'`或者`'./1.txt'`，但是不能写`'/index'`，即可以写相对路径

```js
path.resolve(__dirname, '1.txt'); // 结果：/Users/zgh/code/blog/1.txt

path.resolve(__dirname, './1.txt'); // 结果：/Users/zgh/code/blog/1.txt

path.resolve(__dirname, '/1.txt'); // 结果：/1.txt
```
