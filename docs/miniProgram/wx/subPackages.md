# 分包加载

将小程序不同功能的代码分别打包成不同的子包，在构建时打包成不同的分包，用户在使用时按需进行加载。

包含一个主包和多个子包。

**加载顺序：**

在小程序启动时，默认会下载主包并启动主包内的页面；当用户进入分包内某个页面时，微信客户端会把对应分包下载下来，下载完成后再进行展示。

**大小限制：**

1. 整个小程序所有分包大小不超过 20M
2. 单个分包或主包大小不能超过 2M

## 配置分包加载

在 app.json 中配置分包，通过`subPackages`或`subpackages`定义分包结构。

每个分包结构含三个常用字段：

1. `root`：分包的根目录，该目录下的所有文件都会被打包成一个独立的包
2. `name`：分包的别名，用于在代码中引用该分包
3. `pages`：指定当前分包中包含哪些页面

示例：

1. 根目录下新建 modules 目录
2. 在 app.json 中配置 subPackages

```json
{
  "subPackages": [
    {
      "root": "modules/foo",
      "name": "foo",
      "pages": ["pages/index/index", "pages/detail/index"]
    }
  ]
}
```

3. 按下`cmd + s`保存，然后就会自动在 modules 目录下生成 foo 目录，目录结构如下：

```
- modules
  - foo
    - pages
      - index
      - detail
```

4. 查看依赖分析：点击右上角的详情 -> 基本信息 -> 本地代码 -> 代码依赖分析

## 跳转到分包页面

如果某个页面要跳转到分包页面，需要在路径前面添加分包的根目录路径，即 root 路径。

```html
<navigator url="/modules/foo/pages/index/index">跳转到分包页面</navigator>
```

## 打包、引用原则

**打包原则：**

1. tabBar 页面必须在主包内
2. 最外层的 pages 字段，属于主包的页面，必须放在主包内
3. 按 subPackages 配置路径进行打包，配置路径外的目录将被打包到主包中
4. 分包之间不能相互嵌套

**引用原则：**

1. 主包不可以引用分包的资源，分包可以使用主包的公共资源
2. 分包与分包之间资源无法相互引用，分包异步化时不受此条限制

## 独立分包

> 独立分包是指能够独立于主包和其他分包运行的包。

从独立分包中进入小程序时，不需要下载主包，当用户进入普通分包或主包内的页面时，主包才会被下载。

开发者可以将功能相对独立的页面配置到独立分包中，因为独立分包不依赖主包就可以运行，可以很大程度上提升分包页面的启动速度。

在 subPackages 定义的分包结构中添加`independent`字段，值为 true，即可声明该分包是独立分包。

```json
{
  "subPackages": [
    {
      "root": "modules/foo",
      "name": "foo",
      "pages": ["pages/index/index", "pages/detail/index"]
    },
    {
      "root": "modules/bar",
      "name": "bar",
      "pages": ["pages/index/index"],
      "independent": true
    }
  ]
}
```

注意事项：

1. 独立分包中不能依赖主包和其他分包中的资源
2. 主包中的 `app.wxss` 对独立分包无效
3. `App()` 只能在主包内定义，不能在独立分包中定义

## 分包预下载

分包预下载是指访问小程序某个页面时，预先下载其他分包中的代码和资源。当用户访问分包中的页面时，可以直接使用已经预先下载的代码和资源，提高用户体验。

需要在 app.json 中配置 preloadRule 字段。

```json
{
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["foo"]
    }
  }
}
```

- `pages/index/index`：表示当访问该页面时，会预下载分包
- `network`，可选值有：`all`、`wifi`，表示什么网络环境下可以预下载，默认 all
- `packages`里配置要预下载的分包。可以是分包的别名，就是 subPackages 里配置的 name 字段。也可以是根目录，如`modules/foo`

配置完成后，打开调试器，可以看到分包预下载的日志：`preloadSubpackages: foo`
、`preloadSubpackages: success`

### 独立分包预下载主包

```json
{
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["modules/foo"]
    },
    "modules/bar/pages/index/index": {
      "network": "all",
      "packages": ["__APP__"]
    }
  }
}
```

- `__APP__`表示主包

验证方式：

1. 点击开发者工具顶部正中间的「普通编译」，下拉选择「添加编译模式」，在弹窗中配置启动页面路径为`modules/bar/pages/index/index`，点击确定。然后在控制台发现`__APP__:  module not found`
2. 点击「预览」，用手机扫描二维码预览。可以用 vConsole 插件查看日志，发现`preloadSubpackages: __APP__`、`preloadSubpackages: success`
