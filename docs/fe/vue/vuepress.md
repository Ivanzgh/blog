# vuePress

## vuepress部署到GitHub Pages

### 手动部署
在项目根目录下新建deplogy.sh文件，配置好后在项目根文件夹右键 `gitBash here` , 然后输入部署命令**bash deploy.sh**

```shell script
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Ivanzgh/blog.git master:gh-pages

cd -
```


### github actions 自动化部署
每次只需要将代码提交到github上即可，无需其他操作
#### 设置`GitHub personal access`
[设置个人访问令牌](https://docs.github.com/cn/github/authenticating-to-github/creating-a-personal-access-token)

授予此令牌的作用域或权限时，只需勾选`repo`仓库即可。然后回到项目的`Settings`下的`Secrets`目录生成一个新令牌，名称叫
`ACCESS_TOKEN`

进入`Actions`点击`Set up this workflow`创建一个新的`action`

![image](/blog/img/vuepress/workflow.png)

创建`.github/workflows/ci.yml`文件，名称随意。
这里用了[deploy-to-github-pages](https://github.com/marketplace/actions/deploy-to-github-pages)这个action，
选择最新版本

内容如下，注意版本问题

```yaml
name: Build and Deploy
on:
  push:
    branches:
      - master
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2.3.2
        with:
          persist-credentials: false
      
      - name: Install and Build 🔧 
        run: |
          npm install
          npm run docs:build
      - name: Deploy 🚀
        uses: JamesIves/github-pages-deploy-action@3.6.1
        with:
          ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
          BRANCH: gh-pages # The branch the action should deploy to.
          FOLDER: docs/.vuepress/dist # The folder the action should deploy.
          CLEAN: true # Automatically remove deleted files from the deploy branch
```

`on`设置工作流的触发条件，一般设置为`on: [push]`，表示在每次 `git push` 操作后自动触发该项目的工作流。
也可以让工作流在 `master`分支的 `push`事件上运行：
```yaml
on:
  push:
    branches:
      - master
```

`runs-on: ubuntu-latest`表示工作流将在 `ubuntu` 的最新版本上运行，GitHub Actions 提供 Linux、Windows 和 macOS 来构建运行

`actions/checkout@v2.3.2`是github官方的一个action，用于clone该仓库的源码到工作流中。


::: tip 
打包命令需要修改为`npm run docs:build`，因为vuepress的打包命令就是如此

`with`参数里注意第一行前面的key是`ACCESS_TOKEN`，初始是`GITHUB_TOKEN`，后面的就是刚配置的个人访问令牌

`gh-pages` 是GitHub Pages 要读取的分支

`FOLDER: docs/.vuepress/dist`就是要部署的文件目录
:::

如果出现如下问题，
```
No url found for submodule path 'docs/.vuepress/dist' in .gitmodules
```
就是git子模块找不到dist文件夹，我是之前使用手动部署导致本地产生了dist文件夹，所以删除dist文件夹再push到github上即可。
在`.gitignore`中将`docs/.vuepress/dist`也删除，假如你添加过这个。
