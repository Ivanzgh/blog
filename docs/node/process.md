# process 模块

[文档](https://nodejs.org/docs/latest/api/process.html)

## process.argv

`process.argv` 可以获得命令行参数，以空格分隔。

假设执行一个脚本 test.js，运行`node test.js`，那么`process.argv`的结果是`['node', 'test.js']`
