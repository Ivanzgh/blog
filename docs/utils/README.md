# 工具

## webStorm

### Windows系统快捷键

+ ctrl + d  复制本行到下一行
+ ctrl + alt + l    格式化代码
+ ctrl + alt + s    打开配置窗口
+ ctrl + /  注释
+ ctrl + x 删除行
+ ctrl + f  查找文本

### Mac系统快捷键

+ shift + Enter 软回车 ,无论在前一行代码的什么位置,都能定位到下一行.
+ command 显示/隐藏 左侧面板
+ command + b / 点击 定位方法
+ command + option + L 代码格式化
+ fn+option+f7 查看函数哪里调用过
+ command + e 打开最近打开的文件或者项目 (直接支持文件名搜索)
+ command + shift + v 选择粘贴剪切板上的内容
+ command + d 直接粘贴当前选中的内容
+ command + 退格键 删除当前鼠标所在行
+ command + option + 左右箭头 定位到上次编辑的位置
+ command + option + 上下箭头 依次顺序轮换激活打开的标签页
+ command + fn + f12 查看当前页面所有函数
+ command + f 当前页搜索
+ command + shift + f 全局搜索内容
+ command + shift + o 搜索文件
+ command + / 注释/取消注释
+ /** + Enter 自动生成注释
+ command + j 输出模板
+ control + tab 切换上次打开的文件
+ command + b 跳到变量声明处
+ command + x 剪切行
+ command + shift + u 切换大小写

### 操作设置

#### 1、左下角显示npm

可在项目的package.json栏右键选中show npm Scripts即可

#### 2、设置背景图片

在设置中找到Plugins搜索`Blackground Image Plus +`安装，然后重启编辑器。从View --> `set Blackground Image`选项，选择图片地址即可。

#### 3、设置主题

官网: [http://www.material-theme.com/](http://www.material-theme.com/)
插件下载：[Material Theme UI](https://plugins.jetbrains.com/plugin/8006-material-theme-ui/)

使用IDEs的主题插件，最方便的还是在编辑器的Plugins下载

还有一种方式是导入外部主题，[http://www.themesmap.com/](http://www.themesmap.com/)，
下载喜欢的主题，Editor --> Color Scheme 点击右侧的小齿轮，选择import Scheme即可

![image](/blog/img/utils/webstorm_theme.png)

## VScode

### 快捷键

+ ctrl + f - 搜索/替换
+ shift + alt + 鼠标左键选择 - 选择多行

### 报错"在此系统上禁止运行脚本"

在Windows系统下，如果运行像`node foo.js`这样的脚本时，报错禁止运行脚本

首先以管理员身份运行vscode，在终端输入`get-ExecutionPolicy`得到`Restricted`，表示被限制。
接着输入`set-ExecutionPolicy RemoteSigned`解除限制即可，可以用第一条命令查看结果为`RemoteSigned`

### 设置vue3模板

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

### 插件

#### 主题

`Dracula Official`

![image](/blog/img/utils/vscode_theme.png)

#### 代码格式化

`Prettier - Code formatter`和`Beautify`

#### 快速生成React代码片段

`Simple React Snippets`

#### js/ts代码更优雅

`JavaScript Booster`

#### 更好的注释

`Better Comments`改变注释的颜色

+ !  红色注释
+ ?  蓝色注释
+ //  灰色删除线注释
+ todo 橘红色注释
+ * 浅绿色注释

#### makrdown语法检查

`markdownlint`

语法规则：

+ MD001 - Heading levels should only increment by one level at a time（标题级数只能逐级扩大）
+ MD002 - First heading should be a top level heading（文档的第一个标题必须是最高级的标题，即h1）
+ MD003 - Heading style（整篇文档的标题格式要统一）
+ MD004 - Unordered list style（整篇文档的无序列表的格式要一致）
+ MD005 - Inconsistent indentation for list items at the same level（同一个等级的列表的缩进要一致）
+ MD006 - Consider starting bulleted lists at the beginning of the line（一级标题不能缩进）
+ MD007 - Unordered list indentation（无序列表嵌套的时候默认采取两个空格的缩进方式）
+ MD009 - Trailing spaces（行尾只能添加0或2个空格）
+ MD010 - Hard tabs（不能使用tab来进行缩进，要使用空格）
+ MD011 - Reversed link syntax（内联形式的链接和创建方式是否错误，中括号和圆括号是否使用正确）
+ MD012 - Multiple consecutive blank lines（文档中不能有连续的空行，在代码块中这个规则无效）
+ MD013 - Line length（默认行的最大长度是80，对表格代码块标题都有效）
+ MD014 - Dollar signs used before commands without showing output（在代码块和终端命令前不要有$符号，如果代码块中既有终端命令也有命令的输出，则终端命令前可以有$）
+ MD018 - No space after hash on atx style heading（标题格式如果是"atx"，则#号和文字之间需要一个空格隔开）
+ MD019 - Multiple spaces after hash on atx style heading（标题格式如果是"atx"的话，#号和文字之间只需要一个空格隔开，不需要多个）
+ MD020 - No space inside hashes on closed atx style heading（在"closed_atx"格式的标题中，文字和前后的#号之间都需要一个空格隔开）
+ MD021 - Multiple spaces inside hashes on closed atx style heading（在"closed_atx"格式的标题中，文字和前后的#号之间只需要一个空格隔开，不能有多余的）
+ MD022 - Headings should be surrounded by blank lines（标题的上下行必须都是空格）
+ MD023 - Headings must start at the beginning of the line（标题行不能缩进）
+ MD024 - Multiple headings with the same content（在文档中不能有重复性的标题）
+ MD025 - Multiple top level headings in the same document（同一个文档中只能有一个最高级的标题）
+ MD026 - Trailing punctuation in heading（标题的末尾不能有". , ; : ! ? "这些符号）
+ MD027 - Multiple spaces after blockquote symbol（在创建引用块的时候，右尖号与文字之间要有一个空格）
+ MD028 - Blank line inside blockquote（两个引用区块间不能仅用一个空行隔开或者同一引用区块中不能有空行，如果一行中没有内容，则这一行要用>开头）
+ MD029 - Ordered list item prefix（有序列表的前缀序号格式必须用1或者从1开始的递增数字）
+ MD030 - Spaces after list markers（列表的前缀符号和文字之间用一个空格隔开，在列表嵌套或者同一列表项中有多个段落时，无序列表缩进两个空格，有序列表缩进3个空格）
+ MD031 - Fenced code blocks should be surrounded by blank lines（单独的代码块前后需要用空行隔开）
+ MD032 - Lists should be surrounded by blank lines（列表前后需要用空格隔开）
+ MD033 - Inline HTML（文档中不允许使用html语句）
+ MD034 - Bare URL used（单纯的链接地址需要用尖括号 <> 包裹）
+ MD035 - Horizontal rule style（创建水平线时整篇文档要一致）
+ MD036 - Emphasis used instead of a heading（不能用强调来代替标题 ****）
+ MD037 - Spaces inside emphasis markers（强调的符号和文字之间不能有空格）
+ MD038 - Spaces inside code span elements（创建行内代码段的时候，单反引号和代码之间不能有空格）
+ MD039 - Spaces inside link text（链接名和包围它的中括号之间不能有空格，但链接名中间可以有空格）
+ MD040 - Fenced code blocks should have a language specified（块级代码应该指定代码块的编程语言，方便代码高亮）
+ MD041 - First line in file should be a top level heading（文档的第一个非空行应该是文档最高级的标题，默认是1级标题）
+ MD042 - No empty links（链接的地址不能为空）
+ MD043 - Required heading structure（要求标题遵循一定的结构，默认是没有规定的结构）
+ MD044 - Proper names should have the correct capitalization（指定一些名称，会检查它是否有正确的大写）
+ MD045 - Images should have alternate text (alt text)（图片链接必须包含描述文本）
+ MD046 - Code block style（整篇文档采用一致的代码格式）
+ MD047 - Files should end with a single newline character（文档末尾需要一个空行）
