# Chrome

## 调试

[devtools.chrome.com](https://developer.chrome.com/docs/devtools/javascript?hl=zh-cn)

### 重新发起请求

不用刷新页面

1. 选中 Network
2. 点击 `Fetch/XHR`
3. 选择要重新发送的请求
4. 右键选择 `Replay XHR`，或者直接按下 R 键

### 在控制台快速发起请求

1. 选中 Network
2. 点击 `Fetch/XHR`
3. 选择 `Copy as fetch`
4. 在控制台粘贴代码
5. 修改参数，回车

### 复制打印在控制台的变量值

右键选择 `Copy object`

### 截长屏

方式一、

1. 打开控制台
2. 输入 `cmd + shift + p`，执行 Command 命令
3. 输入 `Capture full size screenshot`，按下回车

如果要截取选中的区域

1. 在 Elements 标签菜单中选择元素
2. 同上，输入 `Capture node screenshot`

方式二、

在 Elements 中选中 html，然后右键选择 `Capture node screenshot`，也可以选中元素，截取部分

### 一键展开所有 DOM 元素

option + 选中点击想展开的元素

### 控制台引用上一次执行的结果

在控制台输入 `$_`

### 切换控制台主题

1. 打开控制台
2. 输入 `cmd + shift + p`，执行 Command 命令
3. 输入 `Switch to dark theme` 或者 `Switch to light theme`进行主题切换

### "$"和"$$"选择器

- `$`：表示`document.querySelector`，如`$('body')`
- `$$`：表示`document.querySelectorAll`
