# 调试

## 浏览器调试

### 恢复执行和单步执行的区别？

恢复执行是让程序继续执行，而单步执行则是让程序逐行执行

恢复执行（Resume）是指在调试器暂停执行后，通过点击恢复执行按钮，让代码继续执行到**下一个断点或程序结束处**。这相当于取消断点并让程序继续执行，直到下一个断点或程序结束。

单步执行则是在调试器暂停执行后，以不同的方式**逐行执行**代码

单步执行的三种方式：

- Step Over（跨过）：执行当前行代码并停止在下一行。如果当前行代码是一个函数调用，那么会将整个函数执行完并停在函数返回后的下一行
- Step Into（进入）：如果当前行代码是一个函数调用，那么进入这个函数并停在函数的第一行，否则就和 Step Over 相同
- Step Out（跳出）：在当前函数内部执行，执行完当前函数并返回到函数调用的下一行

## Node 调试

## VsCode 调试

1. 点击 Debug 窗口的 `Run and Debug` 或者 `create a launch.json file` 可以快速创建调试的配置文件，选择调试平台

2. 生成的 launch.json 如下。如果 url 不一致，需要修改 url

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

创建 Chrome Debug 配置有两种方式：launch、attach

- launch：把 url 对应的网页跑起来，指定调试端口，然后 frontend 自动 attach 到这个端口
- attach：如果已经有一个在调试模式跑的浏览器了，那直接连接上就行

3. 点击左上角的小三角形启动调试，会弹出一个浏览器窗口，一般在 vscode 的左上方会出现一排调试按钮
4. 在代码里添加 debugger 断点，然后点击 Restart 调试按钮，就可以看到代码的运行过程了

## 调试 vue2 项目

在 vue.config.js 配置 source-map：

```js
configureWebpack: {
   devtool: process.env.NODE_ENV !== "production" ? "source-map" : '',
 }
```

配置 launch.json：

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:1024",
      "webRoot": "${workspaceFolder}",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${workspaceFolder}/src/*"
      }
    }
  ]
}
```
