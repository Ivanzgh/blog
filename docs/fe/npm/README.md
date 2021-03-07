# NPM

npm官网：[https://www.npmjs.com/](https://www.npmjs.com/)

npm中文文档：[https://www.npmjs.cn/](https://www.npmjs.cn/)

## 常用指令

<table>
  <thead valign="bottom">
    <tr>
      <th class="head">order</th>
      <th class="head">Description</th>
    </tr>
  </thead>
<tbody valign="top">
  <tr>
    <td>npm init</td>
    <td>初始化，生成package.json</td>
  </tr>
<tr>
  <td>npm install packname (简写 npm i )</td>
  <td>安装依赖包，默认将依赖安装到生产环境中</td>
</tr>
<tr>
  <td>npm uninstall packnae (简写 npm uni)</td>
  <td>卸载依赖包</td>
</tr>
<tr>
  <td>npm update packname</td>
  <td>更新依赖包</td>
</tr>
<tr>
  <td>npm install npm -g</td>
  <td>npm升级</td>
</tr>
<tr>
  <td>npm config get registry</td>
  <td>查看镜像地址</td>
</tr>
<tr>
  <td>npm list -g</td>
  <td>查看所有全局安装的模块</td>
</tr>
</tbody>
</table>

## 安装参数区别

### 全局安装

```sh
npm install packname -g
```

### 生产环境安装

简写：-S ， 并在package.json的dependencies属性写入依赖。

```sh
npm install packname --save
```

### 开发环境安装

简写：-D ， 并在package.json的devDependencies属性写入依赖。

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

切换回npm镜像：

```sh
npm config set registry https://registry.npmjs.org
```

查看镜像源：

```sh
npm get registry
```

## npm发布插件

1、`npm init` 初始化项目,生成package.json文件

2、敲代码

3、创建`.npmignore`文件，发布时会忽略里面的文件

4、创建README.md文件，添加插件描述

5、使用邮箱注册npm账号,官网：<https://www.npmjs.com/>

6、在npm官网查看插件名是否已经注册

7、可以运行`npm whoami` 查看当前用户是不是自己

8、在项目下运行 `npm login`，输入用户名、密码、邮箱

9、运行 `npm publish`

10、在npm官网查看是否发布成功

### npm发布的插件版本号规则

语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。

+ 如果只是修复bug，需要更新Z位。
+ 如果是新增了功能，但是向下兼容，需要更新Y位。
+ 如果有大变动，向下不兼容，需要更新X位。

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

## package.json和package-lock.json的区别

package.json文件记录项目中所需要的所有模块。当执行npm install的时候，node会先从package.json文件中读取所有dependencies信息，
然后根据dependencies中的信息与node_modules中的模块进行对比，没有的直接下载，已有的检查更新（最新版本的nodejs不会更新，因为有package-lock.json文件）。
另外，package.json文件只记录通过`npm install`方式安装的模块信息，而这些模块所依赖的其他子模块的信息不会记录。

package-lock.json文件锁定所有模块的版本号，包括主模块和所有依赖子模块。在执行`npm install`的时候，
node从package.json文件读取模块名称，从package-lock.json文件中获取版本号，然后进行下载或者更新。
因此，正因为有了package-lock.json文件锁定版本号，所以在执行`npm install`的时候，node不会自动更新package.json文件中的模块，
必须用`npm install packagename`（自动更新小版本号）或者`npm install packagename@x.x.x（指定版本号）`来进行安装才会更新，package-lock.json文件中的版本号也会随着更新。

当package.json与package-lock.json都不存在，执行`npm install`时，node会重新生成package-lock.json文件，然后把node_modules中的模块信息全部记入package-lock.json文件，
但不会生成package.json文件，此时，可以通过`npm init`来初始化生成package.json文件。

**总结：**

项目中引入的包版本号之前经常会加^号，每次在执行`npm install`之后，下载的包都会发生变化，
为了系统的稳定性考虑，每次执行完`npm install`之后会创建或者更新package-lock文件。
该文件记录了上一次安装的具体的版本号，相当于是提供了一个参考，在出现版本兼容性问题的时候，就可以参考这个文件来修改版本号即可。
