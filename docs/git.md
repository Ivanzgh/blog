# Git

## 介绍

Git 是**分布式版本控制系统**（Distributed Version Control System - DVCS）。除了中央仓库外，还有本地仓库，可以查看或回退到历史版本

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666452147.png)

- Workspace：工作区
- Index / Stage：暂存区
- Repository：本地仓库
- Remote：远程仓库

## 配置单个 SSH-Key

### 全局配置用户信息

```sh
git config --global user.name "your_name"

git config --global user.email "your_email"

# 查看全局的用户名
git config --global user.name

# 查看全局的邮箱
git config --global user.email

```

### 生成 SSH 密钥

```sh
 ssh-keygen -t rsa -C "youremail@email.com"
```

在 Mac 终端里查看密钥：`vim ~/.ssh/id_rsa.pub`，然后将公共密钥添加进 github 或者 gitlab 里。或者直接复制密钥

```sh
pbcopy < ~/.ssh/id_ras.pub
```

测试连接是否成功: `ssh -T git@github.com`

如果提示：`Hi Ivanzgh! You've successfully authenticated, but GitHub does not provide shell access.` 说明连接成功了

查看当前仓库配置信息

```sh
git config --local --list
```

查看全局配置信息

```sh
git config --global --list
```

## 配置多个 SSH-Key

如果想将个人的 GitHub 密钥和公司的密钥区分开来，就需要配置多个 SSH Key

### 删除本地的 SSH

这个步骤**不是必需的**，如果想全部重来就可以使用。打开终端输入`cd ~/.ssh`，如果顺利进入到.ssh 文件夹，使用命令：

```sh
cd ..
rm -r .ssh
```

### 清空默认的用户名和邮箱

查看已配置的 git 列表 `git config --list`

如果没有默认的用户名和邮箱就忽略，否则执行以下命令：

```sh
git config --global --unset user.name
git config --global --unset user.email
```

### 创建新的 SSH

打开终端输入`cd ~/.ssh`，如果没有 .ssh 目录，先创建该目录

```sh
mkdir ~/.ssh
```

在 .ssh 目录下生成 `ssh-key`，填入自己的邮箱地址

```sh
ssh-keygen -t rsa -C "youremail@email.com"
```

然后会要输入 SSH key 的名字，如`id_rsa`、`id_rsa_github`随你自定义，然后不要输入密码，一直回车就行。

然后配置其他的 SSH Key，如 gitlab，邮箱也可以变更

```sh
ssh-keygen -t rsa -f ~/.ssh/id_rsa_gitlab -C "youremail@email.com"
```

然后同上要输入名字，一路回车

### 将私钥添加到 ssh-agent 信任列表

```sh
ssh-add ~/.ssh/id_rsa
```

如果出现`Identity added: /Users/zgh/.ssh/id_rsa (youremail@email.com)`，表示添加成功了。

继续添加另一个`ssh-add ~/.ssh/id_rsa_gitlab`

关于`ssh-agent`信任列表

```sh
# 查看信任列表
ssh-add -l

# 清空所有的ssh key
ssh-add -D
```

### 配置 config 文件

终端输入`open ~/.ssh/`，看看有没有 config 文件，文件没有后缀，如果没有就新建一个

```sh
cd ~/.ssh

touch config
```

然后可以在终端修改`vim config`，也可以直接打开 config 文件修改，Mac 下通过文本编辑打开。

```sh
Host github
HostName github.com
User git
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa

Host gitlab
HostName gitlab.com
User git
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa_gitlab

# 以 # 开头的是注释，会被忽略
# Host: 机器别名，用于标识特定的配置
# HostName: 主机名，一般为ip或者主机域名
# IdentityFile: 私钥证书文件位置，默认位置是~/.ssh/id_rsa，如果采用默认证书，可不填此项
# User：用于连接的用户名
# Port: SSH访问主机的端口号，默认是22端口
```

### 将公钥添加到远程仓库

将公钥复制到剪贴板，然后去添加到各个远程仓库

```sh
pbcopy < ~/.ssh/id_rsa.pub

# gitlab
# pbcopy < ~/.ssh/id_rsa_gitlab.pub
```

### 测试连接

```sh
ssh -T git@github.com
```

如果 config 配置的用户名是其他的，如 zgh，那么在`@`后面还需加上用户名，克隆的时候也需要加上

```sh
ssh -T git@zgh.github.com
```

然后在不同的仓库下设置局部的用户名和邮箱

```sh
git config user.name "yourname"  
git config user.email "youremail"
```

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
git branch -D < branch-name >
```

### 合并分支

```sh
git merge < branch-name >
```

### 查看仓库当前状态

```sh
git status
```

### 查看提交历史

```sh
git log
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
git branch -a
```

### 查看 origin 的详细信息

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

### 本地分支关联远程分支

如果远程新建了一个分支，本地没有该分支，那么可以使用该命令在本地新建一个分支名叫 dev ，会自动跟踪远程的同名分支 dev

```sh
git checkout --track origin/dev
```

### 首次推送新分支到远程

```sh
git push --set-upstream origin < branch-name >
```

### 关联远程仓库

在远程创建一个新的仓库，克隆到本地后推送

```sh
git clone ssh://git@192.168.8.8:30001/gkhyy/report_web.git
cd report_web
touch README.md
git add README.md
git commit -m "add README"
git push -u origin main
```

如果存在本地项目，想将其推送到 github 上，要先和远程仓库关联，然后推送

```sh
git remote add origin git@github.com:Ivanzgh/elasticsearch.git      # 地址换成自己的

git branch -M main

git push -u origin main
```

推送一个已经存在的文件夹

```sh
cd existing_folder
git init
git remote add origin ssh://git@192.168.8.8:30001/gkhyy/report_web.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

推送一个已经存在的 git 仓库

```sh
cd existing_repo
git remote rename origin old-origin
git remote add origin ssh://git@192.168.8.8:30001/gkhyy/report_web.git
git push -u origin --all
git push -u origin --tags
```

## 提交规范

格式：`<type>(<scope>): <subject>`

**常用的 type 值**

- feat: 新功能
- fix: 修复 bug
- docs: 仅仅修改了文档，比如 README 等等
- style: 仅仅修改了空格、格式缩进、不改变代码逻辑
- refactor: 代码重构，没有加新功能或者修复 bug
- perf: 性能优化，比如提升性能、体验
- test: 测试用例，包括单元测试、集成测试等
- build: 改变了 build 工具 如 grunt 换成了 npm
- chore: 改变构建流程、或者增加依赖库、工具等
- revert: 撤销上一次的 commit

**scope 用来说明此次修改的影响范围**

- all: 表示影响面大 ，如修改了网络框架，会对整个程序产生影响
- location: 表示影响小，某个小小的功能
- module: 表示会影响某个模块，如登录模块、首页模块等

**subject 用来简要描述本次改动**

示例: `feat(all): project init`、`docs(location): edit README`

## 分支管理

### 分支类型

- master/main: 主分支，正式环境部署使用
- develop: 日常开发分支，保存了开发的最新代码，具有当前版本需要上线的所有功能
- feature: 功能分支，从 develop 分支拉取
- release: 发布分支，为发布新的产品版本而设计的分支
  - 当 develop 分支已经有了本次上线的所有代码的时候，并且已通过全部测试的时候，可以从 develop 分支创建 release 分支了
  - 可以让 develop 分支空闲出来以接受新的 feature 分支上的代码提交，进入新的软件开发迭代周期
  - 生产上线时将 release 代码合并到 main 分支，并打 tag
- hotfix: 线上 bug 紧急修复分支，从 main 分支创建而来，修改完成后合并到 main 分支和 develop 分支

比如现在需要开发登录功能，首先从 develop 分支拉取最新代码，然后执行`git checkout -b feat-login`，表示新建了`feat-login`分支，并切换到了这个分支的工作区。代码提交后发起合并申请，期望合并到 develop 分支，仓库管理者同意合并后将删除这个分支。

如果是修复测试环境的 bug，例如`fix-login`分支，那么需要合并到对应的 release 分支。release 分支可以有多个版本，如 release1.0.0、release2.0.1 等。

release 分支和 develop 分支要定期同步，保持一致

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

```sh
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
