# pnpm

官网：<https://pnpm.io>

## 安装和升级

```sh
# 通过HomeBrew安装
brew install pnpm

# 通过HomeBrew更新
brew upgrade pnpm

# 通过npm安装
npm i -g pnpm

# 通过npm卸载
npm rm -g pnpm

# 通过npm升级
npm update -g pnpm

# pnpm升级
pnpm add -g pnpm
```

如果是通过 npm 安装的 pnpm，后续会提示你使用 `pnpm add -g pnpm` 升级 pnpm，执行后会发现依然还是以前的版本。如果继续通过 npm 卸载 pnpm，执行`pnpm -v`后发现 pnpm 依然存在，并且还是最新的版本。但是以后就不能使用 npm 卸载了，[参考](https://pnpm.io/zh/uninstall)

## 命令简介

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

| 命令             | 说明                       |
| ---------------- | -------------------------- |
| pnpm init        | 初始化项目                 |
| pnpm add         | 安装一个或多个依赖         |
| pnpm i           | 初始化时安装全部的依赖     |
| pnpm rm          | 删除依赖                   |
| pnpm up          | 更新依赖                   |
| pnpm outdated    | 查看过期的依赖             |
| pnpm store prune | 从全局中移除不再引用的依赖 |

## 更新依赖

`pnpm up`，根据**指定的范围**更新软件包的最新版本，如果不带参数将更新所有依赖关系

- `pnpm up` ，遵循 package.json 指定的范围更新所有的依赖项
- `pnpm up --latest` ，更新所有依赖项，此操作会忽略 package.json 指定的范围
- `pnpm up foo@2` ，将 foo 更新到 v2 上的最新版本
- `pnpm up "@babel/*"` ，更新 @babel 范围内的所有依赖项

`--latest`参数可简写为`-L`

例如想更新 prettier 到最新的 3.0.3 版本，在 package.json 中显示的是`"prettier": "^2.8.8"`，执行 `pnpm up prettier`，发现没有任何变化，因为这里已经指定了版本范围只能是`2.x.x`，不能跨版本升级，这时可以添加`--latest`参数

```sh
pnpm up prettier -L
```
