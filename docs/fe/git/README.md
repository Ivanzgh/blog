# git

## 介绍

git 是分布式版本控制系统

- Workspace：工作区
- Index / Stage：暂存区
- Repository：本地仓库
- Remote：远程仓库

## 配置

### 全局配置用户信息

```sh
git config --global user.name "your_name"

git config --global user.email "your_email"
```

### 生成 SSH 密钥

```sh
 ssh-keygen -t rsa -C 1972571253@qq.com
```

在 Mac 终端里查看密钥：

cd ~/.ssh 切换目录到这个路径

vim id_rsa.pub 将这个文件的内容显示到终端上

然后将公共密钥添加进 github 或者 gitlab 里

测试连接是否成功:

```sh
ssh -T git@github.com
```

如果提示：`Hi Ivanzgh! You've successfully authenticated, but GitHub does not provide shell access.` 说明你连接成功了

## 常用命令

### 克隆远程仓库

```sh
git clone < remote-address >
```

### 新建分支

```sh
git branch < branch-name >
```

### 切换分支，并更新工作区

```sh
git checkout < branch-name >
```

### 新建分支，并切换到该分支

等同于以上两条命令

```sh
git checkout -b < branch-name >
```

### 删除分支

```sh
git branch -d < branch-name >
```

### 合并分支

```sh
git merge
```

### 查看仓库当前状态

```sh
git status
```

### 将所有文件都添加到暂存区

```sh
git add .
```

### 提交到本地仓库，-m 后表示提交信息

```sh
git commit -m 'xx'
```

### 拉取远程仓库

```sh
git pull
```

### 提交到远程仓库

```sh
git push
```

### 查看本地远程所有分支

```sh
git remote show origin
```

### 查看本地关联的仓库地址

```sh
git remote -v
```

### 删除远程已经不存在但本地还存在的分支

```sh
git remote prune origin
```

### 关联远程仓库

如果存在本地项目，想将其推送到 github 上，要先和远程仓库关联，然后推送

```sh
git remote add origin git@github.com:Ivanzgh/elasticsearch.git      # 地址换成自己的

git branch -M main

git push -u origin main
```

## 集成到编辑器

### webstorm 集成 git

#### 1、克隆项目

VCS --> Git --> Clone，在弹出窗口 URL 输入项目地址，第二栏选择安装地址

#### 2、新建分支

在右下角点击 git 选择 New Branch,输入分支名字

#### 3、切换 dev 分支

选择本地 dev 分支，点击 checkout 切换到 dev 分支，pull 拉取远程仓库

#### 4、返回开发分支

选择开发分支，点击 checkout 切换到开发分支，接着选择 dev 分支，点击 merge into current 将 dev 最新版本合并到开发分支

#### 5、推送远程仓库

本地开发完成后，提交远程仓库即可，待合并请求通过后，拉取最新版本继续开发。

提交步骤：选中项目右键，选择 Git，先 Add，再 commit，接着 push

### vscode 集成 git

在 Mac 终端输入 git clone 拉取项目，注意存放位置，然后用 vscode 打开，编辑完成后点击左侧菜单栏第三个按钮，先点击 CHANGES 目录右侧的 + 号（鼠标移入显示），表示将内容添加到暂存区，接着点击最上方右侧的对勾，表示提交到本地仓库，点击后会弹出一个输入框，输入提交信息，最后在编辑器左下角出现一个向上的箭头，点击即可提交到远程仓库，向下的箭头表示从远程仓库拉取代码，旁边还有分支信息，可新建和切换。当然，如果使用命令行请忽视以上内容。

## 提交规范

### 格式

```sh
<type>(<scope>): <subject>
```

### 常用的 type 值

- feat:新功能
- fix:修复 bug
- doc:仅仅修改了文档，比如 README 等等
- style:仅仅修改了空格、格式缩进、不改变代码逻辑
- refactor:代码重构，没有加新功能或者修复 bug
- perf:性能优化，比如提升性能、体验
- test:测试用例，包括单元测试、集成测试等
- build :改变了 build 工具 如 grunt 换成了 npm
- chore: 改变构建流程、或者增加依赖库、工具等
- revert: 撤销上一次的 commit

### scope 用来说明此次修改的影响范围

- all ：表示影响面大 ，如修改了网络框架 会对整个程序产生影响
- location： 表示影响小，某个小小的功能
- module：表示会影响某个模块 如登录模块、首页模块 、用户管理模块等等

### subject 用来简要描述本次改动，概述即可

示例:

```sh
feat(all): project init
```

```sh
doc(location): edit README
```

## 常见问题

### mac 下误将.DS_Store 文件上传到 GitHub

在 Mac 下，每个目录都有一个.DS_Store 文件，用于存储当前文件夹的一些 meta 信息。没上传前可以将其添加到.gitignore 文件中，若已经上传，则删除远端的即可

```sh
git rm --cached .DS_Store
```

以上命令将.DS_Store 文件从 git 索引库中删除，并没有操作本地文件。

### .gitkeep 的作用

为了可以提交空的文件夹

### 无法访问 github

Windows 下修改 hosts 文件，打开`C:\Windows\System32\drivers\etc`下的 hosts 文件，添加如下内容：

```yml
140.82.113.4 github.com
199.232.69.194 github.global.ssl.fastly.net
185.199.108.153 assets-cdn.github.com
185.199.109.153 assets-cdn.github.com
185.199.110.153 assets-cdn.github.com
185.199.111.153 assets-cdn.github.com
140.82.112.3 gist.github.com
199.232.68.133 raw.githubusercontent.com
199.232.68.133 gist.githubusercontent.com
199.232.68.133 cloud.githubusercontent.com
199.232.68.133 camo.githubusercontent.com
199.232.68.133 avatars0.githubusercontent.com
199.232.68.133 avatars1.githubusercontent.com
199.232.68.133 avatars2.githubusercontent.com
199.232.68.133 avatars3.githubusercontent.com
199.232.68.133 avatars4.githubusercontent.com
199.232.68.133 avatars5.githubusercontent.com
199.232.68.133 avatars6.githubusercontent.com
199.232.68.133 avatars7.githubusercontent.com
199.232.68.133 avatars8.githubusercontent.com
```

添加以后可以解决 github 无法访问、图片和头像加载失败等问题。

注意以上地址并不是固定的，通过[https://www.ipaddress.com/](https://www.ipaddress.com/)输入以上各个域名即可查询到最新的 IP 地址。
如果有必要可以刷新一下 DNS 解析缓存，打开 cmd 窗口输入`ipconfig /flushdns`即可。

::: tip
如果无法保存 hosts 文件，可以在开始栏找到 Windows 附件，找到记事本，以管理员身份运行，然后找到 hosts 文件位置，选择所有文件，即可保存更改。
:::
