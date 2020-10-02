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

**1、左下角显示npm**

可在项目的package.json栏右键选中show npm Scripts即可

**2、设置背景图片**

在设置中找到Plugins搜索`Blackground Image Plus + `安装，然后重启编辑器。从View --> `set Blackground Image`选项，选择图片地址即可。

**3、设置主题**

官网: [http://www.material-theme.com/](http://www.material-theme.com/)
插件下载：[Material Theme UI](https://plugins.jetbrains.com/plugin/8006-material-theme-ui/)

使用IDEs的主题插件，最方便的还是在编辑器的Plugins下载

还有一种方式是导入外部主题，[http://www.themesmap.com/](http://www.themesmap.com/)，
下载喜欢的主题，Editor --> Color Scheme 点击右侧的小齿轮，选择import Scheme即可

## vscode 

### 报错"在此系统上禁止运行脚本"
在Windows系统下，如果运行像`node foo.js`这样的脚本时，报错禁止运行脚本

首先以管理员身份运行vscode，在终端输入`get-ExecutionPolicy`得到`Restricted`，表示被限制。
接着输入`set-ExecutionPolicy RemoteSigned`解除限制即可，可以用第一条命令查看结果为`RemoteSigned`
