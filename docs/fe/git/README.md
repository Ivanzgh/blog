# git
## 介绍

git是分布式版本控制系统

+ Workspace：工作区
+ Index / Stage：暂存区
+ Repository：本地仓库
+ Remote：远程仓库

## 配置

### 全局配置用户信息
```
git config --global user.name "your_name"

git config --global user.email "your_email"
```

### 生成SSH密钥
```
 ssh-keygen -t rsa -C 1972571253@qq.com
```
在Mac终端里查看密钥：

cd ~/.ssh 切换目录到这个路径

vim id_rsa.pub 将这个文件的内容显示到终端上

然后将公共密钥添加进github或者gitlab里

测试连接是否成功:
```
ssh -T git@github.com
```
如果提示：Hi Ivanzgh! You've successfully authenticated, but GitHub does not provide shell access. 说明你连接成功了

## 常用命令

#### 克隆远程仓库
```
git clone < remote-address >
```
#### 新建分支
```
git branch < branch-name >
```
#### 切换分支，并更新工作区
```
git checkout < branch-name >
```
#### 新建分支，并切换到该分支（等同于以上两条命令）
```
git checkout -b < branch-name >
```
#### 删除分支
```
git branch -d < branch-name >
```
#### 合并分支
```
git merge
```
#### 查看仓库当前状态
```
git status
```
#### 将所有文件都添加到暂存区
```
git add .
```
#### 提交到本地仓库，-m 后表示提交信息
```
git commit -m 'xx'
```
#### 拉取远程仓库
```
git pull
```
#### 提交到远程仓库
```
git push
```
#### 查看本地远程所有分支
```
git remote show origin
```
#### 删除远程已经不存在但本地还存在的分支
```
git remote prune origin
```

## 集成到编辑器

### webstorm集成git

#### 1、克隆项目
VCS --> Git --> Clone，在弹出窗口URL输入项目地址，第二栏选择安装地址

#### 2、新建分支

在右下角点击git选择New Branch,输入分支名字

#### 3、切换dev分支

选择本地dev分支，点击checkout切换到dev分支，pull拉取远程仓库

#### 4、返回开发分支

选择开发分支，点击checkout切换到开发分支，接着选择dev分支，点击merge into current将dev最新版本合并到开发分支

#### 5、推送远程仓库

本地开发完成后，提交远程仓库即可，待合并请求通过后，拉取最新版本继续开发。

提交步骤：选中项目右键，选择Git，先Add，再commit，接着push

### vscode集成git

在Mac终端输入git clone 拉取项目，注意存放位置，然后用vscode打开，编辑完成后点击左侧菜单栏第三个按钮，先点击CHANGES目录右侧的 + 号（鼠标移入显示），表示将内容添加到暂存区，接着点击最上方右侧的对勾，表示提交到本地仓库，点击后会弹出一个输入框，输入提交信息，最后在编辑器左下角出现一个向上的箭头，点击即可提交到远程仓库，向下的箭头表示从远程仓库拉取代码，旁边还有分支信息，可新建和切换。当然，如果使用命令行请忽视以上内容。

## 提交规范

#### 格式：
```
<type>(<scope>): <subject>
```
#### type:常用的type值如下：
+ feat:新功能
+ fix:修复bug
+ doc:仅仅修改了文档，比如README等等
+ style:仅仅修改了空格、格式缩进、不改变代码逻辑
+ refactor:代码重构，没有加新功能或者修复bug
+ perf:性能优化，比如提升性能、体验
+ test:测试用例，包括单元测试、集成测试等
+ build :改变了build工具 如 grunt换成了 npm
+ chore: 改变构建流程、或者增加依赖库、工具等
+ revert: 撤销上一次的 commit

#### scope: 用来说明此次修改的影响范围
+ all ：表示影响面大 ，如修改了网络框架 会对整个程序产生影响
+ location： 表示影响小，某个小小的功能
+ module：表示会影响某个模块 如登录模块、首页模块 、用户管理模块等等

#### subject: 用来简要描述本次改动，概述即可

#### 示例：
```
feat(all): project init
```

```
doc(location): edit README
```

## 常见问题
### mac下误将.DS_Store文件上传到GitHub
在Mac下，每个目录都有一个.DS_Store文件，用于存储当前文件夹的一些meta信息。没上传前可以将其添加到.gitignore文件中，若已经上传，则删除远端的即可
```
git rm --cached .DS_Store
```
以上命令将.DS_Store文件从git索引库中删除，并没有操作本地文件。

### .gitkeep的作用
为了可以提交空的文件夹