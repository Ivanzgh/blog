# Cesium

## osgb 转 3dtiles

参考资料：

- 转换工具： <https://github.com/fanvanzh/3dtiles>
- 项目编译：<https://github.com/fanvanzh/3dtiles/wiki/How-to-build>

<https://blog.csdn.net/qq_36377037/article/details/86592258>

`cmd` 进入 e 盘 map 文件夹下，找到 `3dtile.exe` 所在的文件夹

```sh
3dtile.exe -f osgb -i E:\Data\倾斜摄影\hgc -o E:\Data\倾斜摄影\hgc_test
```

Rust 社区公开的第三方包都集中在 `crates.io` 网站上面，他们的文档被自动发布到 `doc.rs` 网站上，Rust 提供了非常方便的包管理器 cargo。为了更快速下载第三方包，我们需要把 `crates.io` 换国内的镜像源

### 设置 rustup 的代理

使用中科大的镜像源，<http://mirrors.ustc.edu.cn/>

设置系统环境变量：

```sh
RUSTUP_DIST_SERVER: http://mirrors.ustc.edu.cn/rust-static

RUSTUP_UPDATE_ROOT: http://mirrors.ustc.edu.cn/rust-static/rustup
```

### 设置依赖源的代理

在 `C:/Users/<用户名>/.cargo`目录下新建一个文本文件 `config`（没有后缀）

使用中科大镜像源，添加内容如下：

```sh
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"
```

或者使用阿里云镜像源，添加内容如下：

```sh
[source.crates-io]
replace-with = "rustcc"
[source.rustcc]
registry = "https://code.aliyun.com/rustcc/crates.io-index"
```

### 下载 rustup-init.exe 自动安装工具并按默认执行

地址：<https://www.rust-lang.org/zh-CN/tools/install>

双击 `rustup-init.exe` 后运行安装包，会先提示安装 `visual cpp build tools`，选择 yes。

接着开始安装 `rust`，包含 `compiler`、`rustup` 和 `cargo`。若无特殊需求，选择默认安装，即输入 1 即可

## 平移、贴地、旋转

```js
let primitive = viewer.scene.primitives.add(tileset)

const longitude = 116.2392
const latitude = 39.5847
const height = -20
primitive.readyPromise.then(() => {
  let hpr = new Cesium.Matrix3()
  // new Cesium.HeadingPitchRoll(heading, pitch, roll)
  // heading围绕负z轴的旋转。pitch是围绕负y轴的旋转。Roll是围绕正x轴的旋转
  let hprObj = new Cesium.HeadingPitchRoll(Math.PI, Math.PI, Math.PI)

  //  Cesium.Matrix3.fromHeadingPitchRoll （headingPitchRoll，result）
  hpr = Cesium.Matrix3.fromHeadingPitchRoll(hprObj, hpr)

  // 2、平移
  // 2.3储存平移的结果
  let modelMatrix = Cesium.Matrix4.multiplyByTranslation(
    // 2.1从以度为单位的经度和纬度值返回Cartesian3位置
    // 2.2计算4x4变换矩阵
    Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
    ),
    new Cesium.Cartesian3(),
    new Cesium.Matrix4()
  )
  /// 3、应用旋转
  // Cesium.Matrix4.multiplyByMatrix3 （矩阵，旋转，结果）
  Cesium.Matrix4.multiplyByMatrix3(modelMatrix, hpr, modelMatrix)

  // 赋值
  primitive._root.transform = modelMatrix
})
viewer.zoomTo(tileset)
```
