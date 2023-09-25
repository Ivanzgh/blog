# Vscode

[配置参考](https://juejin.cn/post/6844903826063884296)


## 快捷键

- `command + f` 搜索/替换
- `command + 反引号` 打开控制台
- `command + shift + n` 新建窗口
- `command + o` 打开文件
- `shift + option + 上下箭头` 向上或下复制一行
- `shift + option + 鼠标左键选择` 选择多行
- `shift + option + 光标选中` 选中多行同时编辑
- `option + 左右箭头` 切换更改的位置
- f2 重命名一个变量

## 报错"在此系统上禁止运行脚本"

在 Windows 系统下，如果运行像`node foo.js`这样的脚本时，报错禁止运行脚本

首先以管理员身份运行 vscode，在终端输入`get-ExecutionPolicy`得到`Restricted`，表示被限制。
接着输入`set-ExecutionPolicy RemoteSigned`解除限制即可，可以用第一条命令查看结果为`RemoteSigned`

## 设置 vue3 模板

打开`File` -> `Preferences` -> `User Snippets`输入`vue.json`,将下方代码放进去，可自定义

```json
{
  "Print to console": {
    "prefix": "vue",
    "body": [
      "<template>\n",
      "</template>\n",
      "<script lang=\"ts\">",
      "import { defineComponent, ref } from 'vue';\n",
      "export default defineComponent({",
      "  components: {},",
      "  setup() {",
      "    return {}",
      "  },",
      "})",
      "</script>\n",
      "<style scoped lang=\"scss\">\n",
      "</style>"
    ]
  }
}
```

## 插件

### 主题

- `Snazzy Operator`
- `Dracula Official`

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418526.png)

### 代码格式化

- `Prettier - Code formatter` 推荐

- `Beautify`

在根目录新建`.prettierrc.js`

```js
module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  singleQuote: true, // 使用单引号
  printWidth: 100, // 超过最大值换行
  htmlWhitespaceSensitivity: 'ignore',
  semi: false, // 结尾不用分号
  disableLanguages: ['vue'], // 不格式化vue文件，vue文件的格式化单独设置
  trailingComma: 'none' // 函数最后不需要逗号
};
```

### 页面预览

- `Live Server` 本地服务，热更新

- `Open In Browser`

- `View In Browser`

### html 和 css

- `Auto Rename Tag` 自动重命名 html 标签

- `HTML CSS Support` 支持 id 和 class 属性关联提示

- `Easy LESS` 支持 less

- `language-stylus` 支持 stylus

- `Bracket Pair Colorizer` 括号高亮

### 其他

`vscode-icons` 小图标

`Vetur` vue 工具

`Bookmarks` 书签，方便跳转

`韭菜盒子` 股票基金

`Weixin Read` 微信读书

`vscode-mindmap` 集成百度脑图 <https://naotu.baidu.com>

`Draw.io Integration` 集成`Draw.io`的功能，支持流程图、思维导图与 UML 图等

### 快速生成 React 代码片段

`Simple React Snippets`

### js/ts 代码更优雅

`JavaScript Booster`

### 更好的注释

`Better Comments`改变注释的颜色

- ! 红色注释
- ? 蓝色注释
- // 灰色删除线注释
- todo 橘红色注释
- \* 浅绿色注释

### makrdown 语法检查

`markdownlint`

<https://github.com/DavidAnson/markdownlint>
