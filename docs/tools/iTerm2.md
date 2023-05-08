# iTerm2

iTerm2 是 Mac 默认终端 Terminal 的替代品，功能更加强大，可玩性更高

下载地址：<https://iterm2.com/>

下载完成后，把 iTerm2 设为默认终端，找到选项：`iTerm2 -> Make iTerm2 Default Term`点击即可

- [参考链接](https://zhuanlan.zhihu.com/p/550022490)
- [iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)

## 安装 oh-my-zsh

仓库地址：<https://github.com/ohmyzsh/ohmyzsh>

官网给出两种安装方式：

```sh
# curl
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# wget
sh -c "$(wget https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh -O -)"
```

如果使用 wget 方式安装，则需要先安装 wget，这里通过 Homwbrew 安装

```sh
brew install wget
```

安装完成后把 zsh 设为默认的 Shell，Mac 下默认的 Shell 是 bash，但 zsh 拥有更多的自定义空间

```sh
# 查看系统安装的所有Shell
cat /etc/Shells

# 查看当前使用的Shell
echo $SHELL

# 修改默认Shell为zsh
chsh -s /bin/zsh
```

## 配置 oh-my-zsh 主题

查看所有的 oh-my-zsh 自带主题

```bash
ls ~/.oh-my-zsh/themes
```

可以进入 [Themes](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes) 查看每个主题的显示效果

还有第三方主题 [External-themes](https://github.com/ohmyzsh/ohmyzsh/wiki/External-themes) 可以使用

然后开始修改主题，终端输入`open ~/.zshrc` 以文本编辑打开，或者输入`vim ~/.zshrc`使用 vim 打开，以 agnoster 主题为例，

```sh
# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="agnoster"
```

保存之后，输入`source ~/.zshrc`使其生效

或者设置主题为`ZSH_THEME="random"`，这样每启动一次终端，就会随机切换一个主题

也可以选择几个最喜欢的主题，以下以三个主题为例，这样你的主题会在括号中配置的这几个主题中随机切换

```sh
ZSH_THEME_RANDOM_CANDIDATES=("robbyrussell" "agnoster" "ys")
```

## 安装字体

字体仓库<https://github.com/powerline/fonts>，在 fonts 目录下找到  **Meslo Slashed -> Meslo LG M Regular for Powerline.ttf**  字体，下载安装。然后打开 iTerm2，打开 Preferences 配置界面，**Profiles -> Text -> Font**，选择 `Meslo LG M Regular for Powerline` 字体。字体大小也在此处设置

## 插件

在终端输入`open ~/.zshrc`，写入以下内容：

```sh
# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

### zsh-syntax-highlighting

[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)，支持语法高亮

先下载插件

```sh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

在`~/.zshrc`里将插件名称添加进`plugins=()`

```sh
plugins=(
  # other plugins...
  zsh-syntax-highlighting
)
```

### zsh-autosuggestions

[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)，支持命令自动补全

```sh
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

```sh
plugins=(
  # other plugins...
   zsh-autosuggestions
)
```

### autojump

可在任意目录之间进行跳转

```sh
brew install autojump
```

## 隐藏用户名和主机名

可以隐藏命令前面的用户名和主机名

```sh
# 查看用户名
whoami

# 打开配置文件
open ~/.zshrc

# 在文件最后增加 DEFAULT_USER="xxx" 配置
DEFAULT_USER="zgh"
```

## 设置配色方案

打开 Preferences 配置界面，**Profiles -> Colors -> Color Presets**，下拉选择

## 设置 Status bar

可以在终端的最上方实时查看本机的一些信息。打开 Preferences 配置界面，**Profiles -> session -> 最下方勾选 Status bar enable -> configure Status bar**，拖动选择要展示内容即可。下方的 `Auto-Rainbow` 选择 `Automatic`，可以显示颜色

## 设置窗体背景

打开**Preferences -> Profiles -> Window**，可以设置透明度、行列数、背景图片。

如果设置了 Status bar，颜色会和背景图片不一样，打开**Profiles -> Appearance -> General -> Theme**，设置为 Minimal 即可

## 设置快捷键

在 iTerm2 里打开 Preferences 配置界面，**Profiles -> Keys -> configure Hotkey window**，自定义一个快捷键即可

## 快捷键

- `Ctrl + A` : 移动到当前行的最前面
- `Ctrl + E` : 移动到当前行的最后面
- `Ctrl + R` : 搜索之前命令
- `Ctrl + W` : 删除光标前的单词
- `Cmd + D` : 打开一个新的分栏面板
- `Cmd + →`  或  `Cmd + ←` : 在 Tab 之间切换
- `Cmd + ]`  或  `Cmd + [` : 在面板之间切换
