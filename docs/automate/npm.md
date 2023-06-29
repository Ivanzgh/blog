# NPM

> npm 全称是 Node Package Manager ，是 Node.js 官方内置的包管理工具

npm 官网：[https://www.npmjs.com/](https://www.npmjs.com/)

npm 中文文档：[https://www.npmjs.cn/](https://www.npmjs.cn/)

## 安装和初始化

Node.js 在安装时会自动安装 npm ，所以如果已经安装了 Node.js，可以直接使用 npm。可以通过 `npm -v` 查看版本号测试，如果显示版本号说明安装成功，反之安装失败

在一个空目录的终端执行`npm init`初始化。初始化的过程中的注意事项：

- package name 不能使用中文、大写，默认值是文件夹的名称
- version 要求 x.x.x 的形式定义，x 必须是数字，默认值是 1.0.0
- ISC 证书与 MIT 证书功能上是相同的
- package.json 可以手动创建与修改

## 常用指令

| order                                | Description                            |
| :----------------------------------- | :------------------------------------- |
| npm init                             | 初始化，生成 package.json              |
| npm init -y 或者 npm init --yes      | 快速创建 package.json                  |
| npm install packname (简写 npm i )   | 安装依赖包，默认将依赖安装到生产环境中 |
| npm uninstall packnae (简写 npm uni) | 卸载依赖包                             |
| npm update packname                  | 更新依赖包                             |
| npm install npm -g                   | npm 升级                               |
| npm config get registry              | 查看镜像地址                           |
| npm list -g                          | 查看所有全局安装的模块                 |
| npm i --legacy-peer-deps             | -                                      |
| npm cache clear --force              | 清除 npm 缓存                          |
| npm ls -g                            | 查看全局安装包                         |

## 安装参数区别

### 全局安装

```sh
npm install packname -g
```

### 生产环境安装

简写：-S ， 并在 package.json 的 dependencies 属性写入依赖。

```sh
npm install packname --save
```

### 开发环境安装

简写：-D ， 并在 package.json 的 devDependencies 属性写入依赖。

```sh
npm install packname --save-dev
```

## 切换淘宝镜像

使用 cnpm 命令

```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

安装成功后即可使用

```sh
cnpm install packname
```

也可以直接设置

```sh
npm config set registry https://registry.npm.taobao.org
```

切换回 npm 镜像：

```sh
npm config set registry https://registry.npmjs.org
```

查看镜像源：

```sh
npm get registry
```

## npm 发布插件

1、`npm init` 初始化项目,生成 package.json 文件

2、敲代码

3、创建`.npmignore`文件，发布时会忽略里面的文件

4、创建 README.md 文件，添加插件描述

5、使用邮箱注册 npm 账号,官网：<https://www.npmjs.com/>

6、在 npm 官网查看插件名是否已经注册

7、可以运行`npm whoami` 查看当前用户是不是自己

8、在项目下运行 `npm login`，输入用户名、密码、邮箱

9、运行 `npm publish`

10、在 npm 官网查看是否发布成功

### npm 发布的插件版本号规则

语义版本号分为 X.Y.Z 三位，分别代表主版本号、次版本号和补丁版本号。

- 如果只是修复 bug，需要更新 Z 位。
- 如果是新增了功能，但是向下兼容，需要更新 Y 位。
- 如果有大变动，向下不兼容，需要更新 X 位。

### 插件升级

首先运行以下命令之一，修改版本

```js
npm version patch  // 补丁【1.0.1】
npm version minor  // 小改【1.1.0】
npm version major  // 大改【2.0.0】
```

然后再运行一遍发布命令即可

```js
npm publish
```

## package.json 和 package-lock.json 的区别

package.json 文件记录项目中所需要的所有模块。当执行 npm install 的时候，node 会先从 package.json 文件中读取所有 dependencies 信息，
然后根据 dependencies 中的信息与 node_modules 中的模块进行对比，没有的直接下载，已有的检查更新（最新版本的 nodejs 不会更新，因为有 package-lock.json 文件）。
另外，package.json 文件只记录通过`npm install`方式安装的模块信息，而这些模块所依赖的其他子模块的信息不会记录。

package-lock.json 文件锁定所有模块的版本号，包括主模块和所有依赖子模块。在执行`npm install`的时候，
node 从 package.json 文件读取模块名称，从 package-lock.json 文件中获取版本号，然后进行下载或者更新。
因此，正因为有了 package-lock.json 文件锁定版本号，所以在执行`npm install`的时候，node 不会自动更新 package.json 文件中的模块，
必须用`npm install packagename`（自动更新小版本号）或者`npm install packagename@x.x.x（指定版本号）`来进行安装才会更新，package-lock.json 文件中的版本号也会随着更新。

当 package.json 与 package-lock.json 都不存在，执行`npm install`时，node 会重新生成 package-lock.json 文件，然后把 node_modules 中的模块信息全部记入 package-lock.json 文件，
但不会生成 package.json 文件，此时，可以通过`npm init`来初始化生成 package.json 文件。

**总结：**

项目中引入的包版本号之前经常会加^号，每次在执行`npm install`之后，下载的包都会发生变化，
为了系统的稳定性考虑，每次执行完`npm install`之后会创建或者更新 package-lock 文件。
该文件记录了上一次安装的具体的版本号，相当于是提供了一个参考，在出现版本兼容性问题的时候，就可以参考这个文件来修改版本号即可。

## npx

npx 是 npm 5.2.0 及以上版本中附带的工具，可以在命令行中运行本地安装的 npm 包，而不需要在全局安装它们。

npx 会在当前目录下的`./node_modules/.bin` 里去查找是否有可执行的命令，没有找到的话再从全局里查找是否有安装对应的模块，全局也没有的话就会自动下载对应的模块，npx 会将依赖包下载到一个临时目录，执行完成后删除本地缓存

例如使用`create-react-app`脚手架创建 react 项目

```sh
# 第一步，安装create-react-app
npm i -g create-react-app
# 第二步，执行命令
create-react-app my-app

# 使用npx只需一行命令
npx create-react-app my-app
```

npx 参数：

- -p, --package: 指定要使用的 npm 包名称或路径，可以与其他参数组合使用
- -c, --call: 直接调用 JS 代码片段，可以与其他参数组合使用
- -q, --quiet: 在输出中禁用 npx 的额外信息，只输出命令的输出结果
- -v, --version: 显示 npx 的版本号
- -h, --help: 显示 npx 的帮助文档
- --ignore-existing: 忽略本地已经安装的同名命令，强制使用最新的版本
- --no-install: 强制使用本地缓存中已经存在的包，不会执行任何安装操作
- --no-optional: 不会安装可选依赖项
- --no-peer: 不会安装对等依赖项
- --no-install-peer-deps: 在安装包时不会安装对等依赖项
- --npm: 指定要使用的 npm 可执行文件路径
- --node-arg: 将额外的参数传递给 node 运行时

## package.json 中的版本符号

版本号形式：`major.minor.patch`，即**主版本号.次版本号.修补版本号**

- major：新的架构调整，不兼容老版本
- minor：新增功能，兼容老版本
- patch：修复 bug，兼容老版本

- `^version`，表示版本号中最左边的非 0 数字的右侧可以是任意版本
  - `如`"^17.0.2"`表示最大版本是`17.x.x`，而不会自动升级到`18.0.0`
  - `"0.2.3"`表示最大版本是`0.2.x`，不会超过`0.3.0`
- `~version`，表示大概匹配
  - 如果 minor 版本号指定了，那么 minor 版本号不变，而 patch 版本号任意
  - 如果 minor 和 patch 版本号未指定，那么 minor 和 patch 版本号任意
  - `~1.2.3`表示版本可以是`1.2.x`
  - `~1`表示版本可以是`1.x.x`

## PNPM

```
Usage: pnpm [command] [flags]
       pnpm [ -h | --help | -v | --version ]

Manage your dependencies:
      add                  Installs a package and any packages that it depends on. By default, any new package is installed as a prod
                           dependency
      import               Generates a pnpm-lock.yaml from an npm package-lock.json (or npm-shrinkwrap.json) file
   i, install              Install all dependencies for a project
  it, install-test         Runs a pnpm install followed immediately by a pnpm test
  ln, link                 Connect the local project to another one
      prune                Removes extraneous packages
  rb, rebuild              Rebuild a package
  rm, remove               Removes packages from node_modules and from the project's package.json
      unlink               Unlinks a package. Like yarn unlink but pnpm re-installs the dependency after removing the external link
  up, update               Updates packages to their latest version based on the specified range

Review your dependencies:
      audit                Checks for known security issues with the installed packages
      licenses             Check licenses in consumed packages
  ls, list                 Print all the versions of packages that are installed, as well as their dependencies, in a tree-structure
      outdated             Check for outdated packages

Run your scripts:
      exec                 Executes a shell command in scope of a project
      run                  Runs a defined package script
      start                Runs an arbitrary command specified in the package's "start" property of its "scripts" object
   t, test                 Runs a package's "test" script, if one was provided

Other:
      pack
      publish              Publishes a package to the registry
      root

Manage your store:
      store add            Adds new packages to the pnpm store directly. Does not modify any projects or files outside the store
      store path           Prints the path to the active store directory
      store prune          Removes unreferenced (extraneous, orphan) packages from the store
      store status         Checks for modified packages in the store

Options:
  -r, --recursive          Run the command for each project in the workspace.
```

移除不再引用的包：

```sh
pnpm store prune
```
