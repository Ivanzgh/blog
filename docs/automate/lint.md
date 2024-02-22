# Lint 规范

## Husky

husky 可以在执行 git 命令时，执行自定义的程序脚本，可以理解成一个能运行脚本的平台。用于在项目里添加 git hooks，在 commit 前校验代码规范、commit 信息规范等

- 文档：<https://typicode.github.io/husky/getting-started.html>
- github： <https://github.com/typicode/husky>

```sh
# 安装
pnpm add -D husky

# 激活
pnpm exec husky install

# 生成 script 命令
npm pkg set scripts.prepare="husky install"
```

绕过校验：`git commit -m 'msg' --no-verify`，或者简写成：`git commit -m 'msg' -n`

## lint-staged

对暂存区执行脚本（git add）

github：<https://github.com/lint-staged/lint-staged>

```sh
# 安装
pnpm add -D lint-staged

# 添加
npx husky add .husky/pre-commit 'npx lint-staged'
```

配置 lint-staged 可以在`package.json`中，或者创建`.lintstagedrc`文件

1. 在`package.json`文件中配置

```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "**/*.{js,jsx,tsx,ts,less,md,json}": ["prettier --write"]
  },
  "devDependencies": {
    "@commitlint/cli": "^18.2.0",
    "@commitlint/config-conventional": "^18.1.0",
    "husky": "^8.0.3",
    "lint-staged": "^14.0.1",
    "prettier": "3.0.3"
  }
}
```

更详细示例：

```json
{
  "name": "automate",
  "scripts": {
    "lint": "npm run lint:js && npm run lint:prettier && npm run tsc",
    "lint-staged": "lint-staged",
    "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx ",
    "lint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src ",
    "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
    "lint:prettier": "prettier -c --write \"**/**.{js,jsx,tsx,ts,less,md,json}\" --end-of-line auto",
    "prepare": "husky install",
    "prettier": "prettier -c --write \"**/**.{js,jsx,tsx,ts,less,md,json}\"",
    "tsc": "tsc --noEmit"
  },
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
    "**/*.{js,jsx,tsx,ts,less,md,json}": ["prettier --write"]
  }
}
```

2. `.lintstagedrc`配置

```json
{
  "*": "your-cmd"
}
```

## Commitlint

commitlint 是在运行 `git commmit -m 'xxx'` 时，用来检测提交信息是否符合定义的规范

github：<https://github.com/conventional-changelog/commitlint>

优点：

- 清晰的提交记录
- 自动生成 changlog 日志

type 类型：

- feat: 新功能
- fix: 修复问题
- docs: 文档修改
- style: 代码格式修改，如修改了空格、格式缩进，不改变代码逻辑
- refactor: 代码重构，没有加新功能或者修复问题
- perf: 性能优化，比如提升性能、体验
- test: 测试用例，包括单元测试、集成测试等
- build: 改变了构造工具或外部依赖项
- chore: 改变构建流程、或者增加依赖库、工具等
- revert: 回滚到上一个版本
- ci 持续集成修改

```sh
# 安装
pnpm add -D @commitlint/{config-conventional,cli}

# 创建 commitlint.config.js 或者 .cjs
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# 添加
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

## commitzen

git 的规范化提交工具，通过命令行交互，辅助填写 commit 信息

<https://github.com/commitizen/cz-cli>

提交时只需使用 `git cz` 或仅使用 `cz`，而不是 `git commit`

```sh
pnpm add commitizen -g

# 使用 cz-conventional-changelog 适配器初始化项目
commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact
```

## Prettier

保存文件自动格式化代码

<https://prettier.io/docs/en/install>

安装 vscode 插件：`Prettier - Code formatter`

```sh
# 安装
pnpm add --save-dev --save-exact prettier
```

1. 创建`.prettierrc`配置文件

示例：

```json
{
  "singleQuote": true,
  "printWidth": 120,
  "htmlWhitespaceSensitivity": "ignore",
  "tabWidth": 2,
  "trailingComma": "none",
  "bracketSpacing": true
}
```

2. 创建`.prettierignore`配置文件，忽视不需要格式化的文件

示例：

```
**/*.svg
/dist
.dockerignore
.DS_Store
.eslintignore
*.png
*.toml
docker
.editorconfig
Dockerfile*
.gitignore
.prettierignore
LICENSE
.eslintcache
*.lock
yarn-error.log
.history
CNAME
/build
/public
```

3. 格式化所有文件

```sh
# npm
npx prettier . --write

# pnpm
pnpm exec prettier . --write
```

## Eslint

检测代码语法规范和错误

### 安装

安装 vscode 插件：[Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)，该扩展使用安装在打开的工作区文件夹中的 ESLint 库

在项目中安装：

```sh
pnpm add eslint -D
```

### 生成配置文件

在 vscode 中打开命令面板（cmd + shift + p），输入：`Create ESLint configuration`，按照提示生成配置文件

### 忽略文件

在项目根目录新建`.eslintignore`文件，写入文件路径，eslint 就会忽略对这些的文件的检查

```
dist
```

## Stylelint

检测和格式化样式文件语法

- 文档：<https://stylelint.io>
- github：<https://github.com/stylelint/stylelint>

安装 vscode 插件：stylelint

相关依赖：

- stylelint：核心依赖
- stylelint-config-standard：stylelint 拓展，支持配置文件拓展一些检测规则
- stylelint-order：检测 css 属性书写顺序
- stylelint-config-recess-order：stylelint-order 插件的第三方配置

1. 安装 stylelint

```sh
pnpm add -D stylelint stylelint-config-standard stylelint-order stylelint-config-recess-order
```

如果需要格式化 less、scss，还需要安装其他语言解析工具

```sh
pnpm add -D postcss postcss-less
```

2. 创建`.stylelintrc.json`配置文件，内容如下：

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-recess-order"]
}
```

如果要格式化 less，scss，还需要补充自定义解析工具

```json
"overrides": [
  {
    "files": [
      "*.scss",
      "**/*.scss"
    ],
    "customSyntax": "postcss-scss"
  },
  {
    "files": [
      "*.less",
      "**/*.less"
    ],
    "customSyntax": "postcss-less"
  }
]
```

如果需要忽略文件配置，格式：`.stylelintignore`

3. 执行检测命令

```sh
npx stylelint "**/*.css"
```

4. 打开设置，配置`setting.json`文件，可以在文件保存后自动修复一些问题

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  }
}
```

## Editorconfig

<http://editorconfig.org>

统一编辑器设置

安装 vscode 插件：`EditorConfig for VS Code`

添加`.editorconfig`配置文件， 示例：

```
# http://editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```
