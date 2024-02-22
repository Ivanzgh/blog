---
outline: deep
---

# Git

## 介绍

Git 是**分布式版本控制系统**（Distributed Version Control System - DVCS）。官网：<https://git-scm.com/docs>

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

### 1、删除本地的 SSH

这个步骤**不是必需的**，如果想全部重来就可以使用。打开终端输入`cd ~/.ssh`，如果顺利进入到.ssh 文件夹，使用命令：

```sh
cd ..
rm -r .ssh
```

### 2、清空默认的用户名和邮箱

查看已配置的 git 列表 `git config --list`

如果没有默认的用户名和邮箱就忽略，否则执行以下命令：

```sh
git config --global --unset user.name
git config --global --unset user.email
```

### 3、创建新的 SSH

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

### 4、将私钥添加到 ssh-agent 信任列表

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

### 5、配置 config 文件

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

### 6、将公钥添加到远程仓库

将公钥复制到剪贴板，然后去添加到各个远程仓库

```sh
pbcopy < ~/.ssh/id_rsa.pub

# gitlab
# pbcopy < ~/.ssh/id_rsa_gitlab.pub
```

### 7、测试连接

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

## 概念

### HEAD

1. HEAD 是指向当前 commit 的引⽤，它具有唯⼀性，每个仓库中只有⼀个 HEAD。在每次提交时它都会⾃动向前移动到最新的 commit
2. branch 是⼀类引⽤。HEAD 除了直接指向 commit，也可以通过指向某个 branch 来间接指向 commit。当 HEAD 指向⼀个 branch 时，commit 发⽣时，HEAD 会带着它所指向的 branch ⼀起移动

## 常用命令

### 克隆远程仓库

```sh
git clone 仓库地址
```

### rebase

### 多个 commit 合并提交

假设你写完了一个 A 功能，执行`git add .` `git commit`，然后发现还要改动一下，如果继续 add、commit，那么在 push 的时候会有 2 条提交记录，其实你只是完成了一个功能，保留一条提交信息才是简洁明了的。这时就需要将第一次 commit 撤销，回到暂存区，然后再 commit 提交，就只有一条记录了

### 修复最新提交的错误

在提交时，如果加上 --amend 参数，则不会在当前 commit 上增加 commit，⽽是会把当前 commit ⾥的内容和暂存区（stageing area）⾥的内容合并起来后
创建⼀个新的 commit，⽤这个新的 commit 把当前 commit 替换掉，对最新⼀条 commit 进⾏修正

```sh
git commit --amend
```

### HEAD

- HEAD 表示当前版本
- HEAD^ 上一个版本
- HEAD^^ 上上一个版本
- HEAD^^^ 上上上一个版本
- HEAD~n 回撤 n 个版本，这种也是更加方便的

### 撤销最新的提交

`git reset [--soft | --mixed | --hard] [HEAD]`

```sh
git reset --hard ⽬标commit

git reset --hard HEAD^
```

### stash 临时存放⼯作区的改动

stash 指令可以把⼯作区的内容全部放在本地的⼀个独⽴的地⽅，它不会被提交和删除。

假设你当前正在开发中，突然需要优先干其他工作，又不想 add 和 commit，这时就可以将当前内容放入临时区，等其他工作干完了，再切换回你的分支，将临时区的内容取出来，
就可以继续之前的工作了

```sh
# 放进临时存储区
git stash

# 没有被 track 的⽂件，即从来没有被 add 的⽂件不会被 stash
# 可以加上 -u 参数，它是 --includeuntracked 的简写
git stash -u

# 取出
git stash pop

# 查看储存区所有提交列表
git stash list
```

### 暂存区

```sh
# 添加单个文件到暂存区
git add 文件名

# 将当前目录下的所有文件都添加到暂存区
git add .

# 将当前仓库的所有文件都添加到暂存区
git add -A

# 从暂存区撤销文件，工作区的代码还在
git rm --cached 文件名
```

### 提交到本地仓库

```sh
# -m 后表示提交信息
git commit -m 'xx'
```

### 删除本地仓库的文件

```sh
# 删除单个文件
git rm 文件名

# 删除目录
git rm -r 目录名
```

### 拉取远程仓库

```sh
# 如果当前分支和远程分支已经建立了联系
git pull

# 拉取指定远端分支合并到本地当前分支
git pull origin 分支名
```

pull 的内部操作其实是把远程仓库取到本地后（使⽤的是 fetch），再⽤⼀次 merge 来把远端仓库的新 commits 合并到本地

### 提交到远程仓库

```sh
git push

# 初次提交，需要和远程仓库先建立联系
git push --set-upstream origin 分支名
```

### 查看仓库当前状态

```sh
git status
```

### 查看历史记录

```sh
git log

# 查看详细改动，-p 是 --patch的缩写
git log -p

# 查看大致改动
git log --stat
```

### 查看 commit

```sh
# 看当前的commit
git show

# 看任意一个commit
# 在 show 后⾯加上这个 commit 的引⽤（branch 或 HEAD 标记）或它的 SHA-1 码
git show 4fc58ba6808329d98146be8543aa14112c632213


# 看指定commit的指定文件
# 在 commit 的引⽤或 SHA-1 后输⼊⽂件名
git show 4fc58ba6808329d98146be8543aa14112c632213 test.txt
```

### 查看未提交的内容

```sh
# 查看⼯作区和暂存区的区别
git diff

# 查看暂存区和上⼀条 commit 的区别
git diff --staged（或 --cached）

# 查看⼯作区和上⼀条 commit 的区别
git diff HEAD
```

- 第一条命令表示：如果你现在把所有⽂件都 add，你会向暂存区中增加哪些内容
- 第二条命令表示：如果你输⼊ git commit，你将会提交什么
- 第三条命令表示：如果你把所有⽂件都 add， 然后 git commit，你将会提交什么。是上⾯两条命令的内容相加

### 查看 origin 的详细信息

```sh
git remote show origin
```

### 查看本地关联的仓库地址

```sh
git remote -v
```

### 撤销、覆盖

```sh
# 添加所有并推送
git add -A && git commit -m "提交信息" && git push

# 撤销本地修改并同步
git reset --hard && git clean -df && git pull

# 强制覆盖本地代码
git fetch --all &&  git reset --hard origin/master && git pull
```

### 仓库备份

```sh
# 添加备份仓库
git remote set-url --add origin http://192.168.12.2/digsur/digsur-solution.git
```

## 分支

### 新建分支

```sh
git branch 分支名称
```

### 切换分支，并更新工作区

```sh
git checkout 分支名称
```

### 新建分支，并切换到该分支

等同于以上两条命令

```sh
git checkout -b 分支名称
```

### 基于远程仓库创建新分支

```sh
# 基于远程仓库创建新分支
git branch branch_name remote_name/branch

# 基于远程仓库创建新分支并且切换到新分支
git checkout -b branch_name remote_name/branch
```

如基于远程 develop 分支创建开发分支**feture-test**：`git checkout -b feture-test origin/develop`，origin 是远程仓库的别名

这样就可以不用创建本地的 develop 分支

1、在本地创建 develop 分支，基于它创建开发分支，每次提交前拉取最新的 develop 分支，然后合并进开发分支，最后提交
2、基于远程分支创建新分支，本地不用维护 develop 分支，每次提交前先拉取最新的代码，然后提交。这里执行 `git pull` 就是拉取远程 develop 分支的代码

```sh
git add .
git commit -m '提交信息'
git pull

git push
```

### 查看分支

```sh
# 查看本地分支
git branch

# 查看远程分支
git branch -r

# 查看本地远程所有分支
git branch -a

# 查看本地分支所关联的远程分支
git branch -vv
```

### 合并分支

比如你的代码提交之前需要合并最新的 develop 分支，则要做如下操作：

- 切到 develop 分支，git pull 拉一下最新代码
- 切回开发分支，执行 `git merge develop` 合并一下 develop 代码

```sh
git merge 被合并的分支名称

## 撤销合并到执行合并以前的状态
git merge --abort

## 如果合并后的提交还停留在本地Git库，没有被推送到远程
git reset --hard HEAD
```

### 删除分支

```sh
# -d 表示delete，用于已经合并过的分支
git branch -d 分支名称

# -D 用于强制删除，不管是否合并过
git branch -D 分支名称
```

### 分支重命名

```sh
git branch -m 旧分支名称 新分支名称
```

### 同步本地的远程分支

删除远程已经不存在但本地还存在的远程分支

```sh
git remote prune origin


git remote update origin --prune
```

### 本地分支关联远程分支

如果远程新建了一个分支，本地没有该分支，那么可以使用该命令在本地新建一个分支名叫 dev ，会自动跟踪远程的同名分支 dev

```sh
git checkout --track origin/dev
```

### 首次推送新分支到远程

```sh
git push --set-upstream origin 分支名称
```

## tag 标签

<https://git-scm.com/docs/git-tag>

[官网 tag 实践](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)

标签是跟 commit 挂钩的，是对某次历史提交的引用，用来给发布版本打标记

### 创建 tag

```sh
# 创建tag，打在最近的一次 commit 记录上
git tag v1.0.0

# 给历史版本添加tag，后接commit ID
# 这里id可以取前7位表示，先执行 git log --pretty=oneline --abbrev-commit 可以看到
git tag v1.0.1 b3c214115924f9de069aa81d866143e52f4b5348

# 创建有备注的tag
git tag -a v1.0.0 -m '发布v1.0.0版本'

# 给历史版本创建有备注的tag
git tag -a v1.0.0 b3c214115924f9de069aa81d866143e52f4b5348 -m '历史版本带备注'
```

### 查看 tag

```sh
# 查看所有tag
git tag

# 使用通配符过滤tag
git tag -l "v1.1*"

# 查看某个tag的详细信息
git show v1.0.0
```

### 发布 tag

通常的 git push 不会将本地标签推送到远程，需要进行显式的操作

```sh
# 推送单个tag
git push origin v1.0.0

# 推送本地所有tag
git push origin --tags
```

### 删除 tag

```sh
# 删除本地tag
git tag -d v1.0.1

# 删除远程tag，有两种方式
git push origin :refs/tags/v1.0.1

git push origin --delete v1.0.1
```

### 检出标签

如果你做了某些更改然后提交它们，标签不会发生变化， 但你的新提交将不属于任何分支，并且将无法访问，除非通过确切的提交哈希才能访问，通常需要创建一个新分支

```sh
git checkout v1.0.0

# 推荐
git checkout -b new-branch v1.0.0
```

## cherry-pick：把选中的 commits ⼀个个合并进来

cherry-pick 是⼀种特殊的合并操作，使⽤它可以点选⼀批 commits，按序合并

https://git-scm.com/docs/git-cherry-pick

## 关联远程仓库

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
# 地址换成自己的，这里的 origin 可以自定义名称，但是一般不会更改
git remote add origin git@github.com:Ivanzgh/elasticsearch.git

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

## Gitflow 工作流

Gitflow 工作流(Gitflow Workflow)是目前最流行的 git 团队协作模式

- master/main: 主分支，正式环境部署使用，唯一一个正式对外发布的分支，通常还要加上相应版本号的 tag
- develop: 集成分支，专门用来集成开发完成的各种功能的，保存了开发的最新代码，由 main 分支创建而来
- feature: 功能分支，由 develop 分支创建而来，开发完成后被合并进 develop 分支
- release: 预发布分支，为发布新的产品版本而设计的分支
  - 当 develop 分支已经有了本次上线的所有代码，并且已通过全部测试的时候，就可以从 develop 分支创建 release 分支了
  - release 分支创建以后，就不允许再有新的功能特性被加入到这个分支了，只有 bug 修复或者文档编辑之类的工作才允许进入该分支
  - 有了 release 分支就可以让 develop 分支空闲出来以接受新的 feature 分支上的代码提交，进入新的软件开发迭代周期
  - 生产上线时将 release 代码合并到 main 分支，并给 main 分支打上带有版本信息的 tag
  - 同时 release 分支也会被合并到 develop 分支
- hotfix: 线上 bug 紧急修复分支，从 main 分支创建而来，修改完成后合并到 main 分支和 develop 分支，以及当前的 release 分支

比如现在需要开发登录功能，首先从 develop 分支拉取最新代码，然后执行`git checkout -b feat-login`，表示新建了`feat-login`分支，并切换到了这个分支的工作区。代码提交后发起合并申请，期望合并到 develop 分支，仓库管理者同意合并后将删除这个分支。

如果是修复测试环境的 bug，例如`fix-login`分支，那么需要合并到对应的 release 分支。release 分支可以有多个版本，如 release1.0.0、release2.0.1 等。

## 同步上游仓库

### 更新 fork 的仓库

如果 fork 了别人的仓库，当仓库更新了需要同步更新自己的仓库

在 GitHub 进入 fork 的仓库，会看到一个 Fetch upstream 按钮，点击 `Fetch and merge` 按钮，就是执行`git fetch`和`git merge`操作。
这一步只是将你自己 fork 的仓库代码和源仓库代码同步了，但是本地工作区的仓库还没有更新，需要在本地执行`git pull`

### 更新指定的仓库

假设我们基于 ant-design-pro 这个脚手架开发项目，当 antd pro 更新了，我们的项目也想要更新，可以执行以下步骤：

1. 执行`git remote -v`查看远程仓库的信息

2. 在代码仓库中添加 antd 作为远程仓库，执行`git remote add antd git@github.com:ant-design/ant-design-pro.git`

3. 再次执行第一步，会发现多了两条 antd 的记录，上步命令里的 antd 名称可以自定义

4. 创建一个新的分支，在这个新分支执行下面的步骤

5. 从 antd 的远程仓库中拉取最新的代码，执行`git fetch antd master`，表示从上游仓库 antd 拉取 master 分支的代码到本地，如果省略 master 分支表示把所有代码都拉取下来。如果直接执行`git fetch`则还是从默认的 origin 拉取代码，是`git fetch origin master`的简写

6. 合并 antd 的代码，执行`git merge antd/master`，解决冲突

7. 当你完成开发并测试时，就可以将这个新分支合并回你的主分支中，然后执行`git push`推送到远程仓库

如果在第 6 步出现报错：`fatal: refusing to merge unrelated histories`，可以在 `git merge` 命令中添加 `--allow-unrelated-histories` 选项，告诉 Git 允许合并不相关的历史记录

```sh
git merge test/master --allow-unrelated-histories
```

当你在本地仓库中创建一个新的分支时，该分支的历史记录是独立的，并且不包含来自 antd 远程仓库的历史记录。因此当你想将来自 antd 的更新合并到本地分支时，Git 会拒绝合并，因为这些历史记录不相关

## git 上传校验

```sh
# 关闭commit时的语法检测
git commit --no-verify -m “xxx”
```

## FAQ

### mac 下误将.DS_Store 文件上传到 GitHub

在 Mac 下，每个目录都有一个.DS_Store 文件，用于存储当前文件夹的一些 meta 信息。没上传前可以将其添加到.gitignore 文件中，若已经上传，则删除远端的即可

```sh
git rm --cached .DS_Store
```

以上命令将.DS_Store 文件从 git 索引库中删除，并没有操作本地文件。

### .gitkeep 的作用

为了可以提交空的文件夹

### .gitignore

这里可以放入你希望被 git 忽略的⽬录和⽂件

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

### 报错：fatal: refusing to merge unrelated histories

一般在`git pull`或者`git push`时出现，这是因为两个分支没有取得关系

在命令后面加上`--allow-unrelated-histories`

```sh
git pull origin master --allow-unrelated-histories
```
