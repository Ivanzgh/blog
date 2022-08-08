# vuePress

## 养个猫

如你所见，左下角有一只卡哇伊的猫，有白色和黑色两种。由[live2d](https://www.live2d.com/zh-CHS/)制作而来，
特别好玩的一个东西，有兴趣自行了解。

首先下载`lived2d.js`，然后在`components`下注册一个`Cat.vue`组件，最后在`config.js`中配置使用

```js
module.exports = {
  plugins: [
    [
      {
        name: 'page-plugin',
        globalUIComponents: ['Cat']
      }
    ]
  ]
}
```

## 插件

地址：[awesome-vuepress](https://github.com/vuepressjs/awesome-vuepress#plugins)

例如：

- `vuepress-plugin-reading-progress` - 阅读进度条
- `@vuepress/plugin-back-to-top` - 返回顶部
- `vuepress-plugin-img-lazy` - 图片懒加载
- `vuepress-plugin-baidu-autopush` - 百度 SEO

## 手动部署

在项目根目录下新建 deplogy.sh 文件，配置好后在项目根文件夹右键 `gitBash here` , 然后输入部署命令`bash deploy.sh`

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

注意将仓库地址修改成自己的地址

## 自动化部署

使用`github actions`实现自动化部署，每次只需要将代码提交到 github 上即可，无需其他操作。

**设置`GitHub personal access`**

[设置个人访问令牌](https://docs.github.com/cn/github/authenticating-to-github/creating-a-personal-access-token)

授予此令牌的作用域或权限时，只需勾选`repo`仓库即可。然后回到项目的`Settings`下的`Secrets`目录生成一个新令牌，名称叫
`ACCESS_TOKEN`

进入`Actions`点击`Set up this workflow`创建一个新的`action`

![image](/img/vuepress/workflow.png)

创建`.github/workflows/ci.yml`文件，名称随意。
这里用了[deploy-to-github-pages](https://github.com/marketplace/actions/deploy-to-github-pages)这个 action，
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

`actions/checkout@v2.3.2`是 github 官方的一个 action，用于 clone 该仓库的源码到工作流中。

::: tip
打包命令需要修改为`npm run docs:build`，因为 vuepress 的打包命令就是如此

`with`参数里注意第一行前面的 key 是`ACCESS_TOKEN`，初始是`GITHUB_TOKEN`，后面的就是刚配置的个人访问令牌

`gh-pages` 是 GitHub Pages 要读取的分支

`FOLDER: docs/.vuepress/dist`就是要部署的文件目录
:::

如果出现如下问题，

```null
No url found for submodule path 'docs/.vuepress/dist' in .gitmodules
```

就是 git 子模块找不到 dist 文件夹，我是之前使用手动部署导致本地产生了 dist 文件夹，所以删除 dist 文件夹再 push 到 github 上即可。
在`.gitignore`中将`docs/.vuepress/dist`也删除，假如你添加过这个。
