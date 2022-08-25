# Git

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

`cd ~/.ssh` 切换目录到这个路径

`vim id_rsa.pub` 将这个文件的内容显示到终端上

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

### 推送新分支到远程

```sh
git push --set-upstream origin < branch-name >
```

### 关联远程仓库

如果存在本地项目，想将其推送到 github 上，要先和远程仓库关联，然后推送

```sh
git remote add origin git@github.com:Ivanzgh/elasticsearch.git      # 地址换成自己的

git branch -M main

git push -u origin main
```

创建一个新的仓库

```sh
git clone ssh://git@192.168.8.8:30001/gkhyy/report_web.git
cd report_web
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```

推送一个已经存在的文件夹

```sh
cd existing_folder
git init
git remote add origin ssh://git@192.168.8.8:30001/gkhyy/report_web.git
git add .
git commit -m "Initial commit"
git push -u origin master
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

- all: 表示影响面大 ，如修改了网络框架 会对整个程序产生影响
- location: 表示影响小，某个小小的功能
- module: 表示会影响某个模块 如登录模块、首页模块 、用户管理模块等等

**subject 用来简要描述本次改动**，概述即可

示例: `feat(all): project init`、`docs(location): edit README`

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
