# NPM

npm 官网：[https://www.npmjs.com/](https://www.npmjs.com/)

npm 中文文档：[https://www.npmjs.cn/](https://www.npmjs.cn/)

## 常用指令

| order                                | Description                            |
| :----------------------------------- | :------------------------------------- |
| npm init                             | 初始化，生成 package.json              |
| npm install packname (简写 npm i )   | 安装依赖包，默认将依赖安装到生产环境中 |
| npm uninstall packnae (简写 npm uni) | 卸载依赖包                             |
| npm update packname                  | 更新依赖包                             |
| npm install npm -g                   | npm 升级                               |
| npm config get registry              | 查看镜像地址                           |
| npm list -g                          | 查看所有全局安装的模块                 |

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

```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

安装成功后即可使用：

```sh
cnpm install packname
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
