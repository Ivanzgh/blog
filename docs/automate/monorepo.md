---
outline: deep
---

# Menorepo

> 在单一仓库中管理多个包。

为什么需要单一仓库？

- 减少仓库数量，减少仓库维护成本
- 简化依赖管理，所有项目共享同一个依赖树

方案选择：

- 可行方案：Lerna、NPM/Yarn/PNPM workspaces
- 推荐方案：PNPM workspaces

案例：

- 采用 Yarn Workspaces 方案的项目：vue-cli
- 采用 PNPM workspaces 方案的项目：vue3、vite

## 参考资料

- https://monorepo.tools

## Workspaces

Workspaces 是包管理器提供的原生功能。包管理器的 workspaces 文档：

- [npm](https://docs.npmjs.com/cli/using-npm/workspaces)
- [yarn](https://yarnpkg.com/features/workspaces)
- [pnpm](https://pnpm.io/workspaces)

## Lerna

[Lerna](https://lerna.js.org) 是一个管理 Monorepo 的工具，可以处理多个包的版本控制、依赖管理和发布流程。

功能：

1. 版本管理：自动增加版本号，自动生成变更日志文件 CHANGELOG.md
2. 发布管理：自动生成 git tag 并发布到 npm

## Lerna + Yarn Workspaces

### 初始化项目

1. 创建一个新的 Monorepo 项目

```bash
mkdir my-monorepo && cd my-monorepo
```

2. 初始化 git 仓库和 package.json 文件

```bash
git init
npm init
```

3. 安装 lerna

```bash
npx lerna init
```

### 配置 Yarn Workspaces

1. 在根目录的 package.json 中添加 Workspaces 配置：

```json
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": ["packages/*"],
  "devDependencies": {
    "lerna": "^4.0.0",
    "lerna-changelog": "^2.2.0"
  }
}
```

2. 安装依赖

```bash
yarn install
```

### 配置 Lerna

1. 在 lerna.json 文件中启用 Yarn Workspaces：

```json
{
  "packages": ["packages/*"],
  "version": "0.0.0",
  "npmClient": "yarn",
  "useWorkspaces": true
}
```

2. 添加示例包

```bash
mkdir -p packages/package-a
cd packages/package-a
yarn init -y
```

## PNPM Workspaces

pnpm workspaces 是当前的主流方案。

- [pnpm Workspace 文档](https://pnpm.io/zh/workspaces)
- [在 pnpm 中使用 Changesets](https://pnpm.io/zh/using-changesets)
- [@changesets/cli 文档](https://github.com/changesets/changesets/blob/main/packages/cli/README.md)

### 初始化项目

1. 创建一个新的 Monorepo 项目

```bash
mkdir monorepo1 && cd monorepo1
```

2. 初始化 git 仓库和 package.json 文件

```bash
git init
pnpm init
```

3. 在 packages.json 中添加`"private": true`，防止最外层包被发布出去，设为 `true` 后发布时会给出提示。

### 配置 pnpm Workspaces

1. 在根目录创建 `pnpm-workspace.yaml` 文件：

```yaml
packages:
  - 'packages/*'
```

2. 创建 `packages` 目录和第一个子包 foo：

```bash
mkdir -p packages/foo
cd packages/foo
pnpm init
```

3. 修改子包名，如`@monorepo1/foo`，以`@`开始，后面是项目名称
4. 回到根目录，创建第二个子包 bar，后续步骤同第 2 ～ 3 步

### 添加依赖

如果要安装公共依赖，所有包可共享，必须要加上`-w`参数。`-w`  表示向 workspace 根目录添加依赖。例如：

```bash
pnpm add -Dw eslint typescript
```

如果要安装局部依赖，只需要在子包目录下执行即可。例如：

```bash
cd packages/foo
pnpm add lodash
```

补充：

- `-r` 表示在 workspace 工作区执行命令
- `--filter xxx` 表示指定在哪个包下执行指令

例如：表示在 foo 中安装 lodash 包

```bash
pnpm add lodash -r --filter @monorepo1/foo
```

### 链接本地包

将 foo 作为依赖添加到 bar，步骤如下：

1. 代码开发，在 foo 和 bar 里分别创建 index.js 文件，内容如下：

```js
// foo/index.js
export default function () {
  console.log('aaa');
}

// bar/index.js
import fn from '@monorepo1/foo';
fn();
```

2. 进入 bar 目录，在 bar 里添加依赖。执行内容如下，表示在 bar 里添加 foo 的依赖，这样`import fn from '@monorepo1/foo';`就可以使用了

```sh
pnpm -F @monorepo1/bar add @monorepo1/foo
```

`-F`或者`--filter`是[过滤选择器](https://pnpm.io/zh/filtering)，表示让 pnpm 在特定包下执行指令。

执行之后，会在 bar 的`node_modules`里看到 foo，并且在 bar 的 package.json 里可以看到：

```json
{
  "dependencies": {
    "@monorepo1/foo": "workspace:*"
  }
}
```

### 管理包版本和发布

pnpm 本身不提供版本管理和发布功能，可以结合 Changesets 或 Lerna 来实现功能。

参考文档：[在 pnpm 中使用 Changesets](https://pnpm.io/zh/using-changesets)

1. 安装发包依赖

在项目根目录安装`@changesets/cli`，执行 changesets 的初始化命令：

```sh
pnpm add -Dw @changesets/cli

pnpm changeset init
```

初始化后会在项目根目录下生成`.changeset`文件。

2. 开始发布版本。登录 npm：

```sh
npm login
```

3. 预发布

```sh
pnpm changeset pre enter <tag>

# 例如：
pnpm changeset pre enter alpha
```

tag 的类型：

- alpha 是内部测试版，一般不向外部发布，会有很多 bug，一般只有测试人员使用
- beta 也是测试版，这个阶段的版本会一直加入新的功能，在 alpha 版本之后推出
- rc（Release Candidate）发行候选版本。rc 版不会再加入新的功能，主要着重于修复错误

```sh
pnpm changeset
# major、patch、minor
# 1.0.0

# 变更版本号
pnpm changeset version

# 发布
pnpm changeset publish

# 退出预发布
pnpm changeset pre exit
```

4. 查看 npm

<https://www.bilibili.com/video/BV1Aj411h7F2>
