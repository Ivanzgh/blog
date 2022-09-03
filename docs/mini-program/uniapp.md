# uniapp

## App 离线打包

官方文档：<https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android>

### 生成离线资源

打开 HBuilderX 选择 发行 => 原生 App-本地打包 => 生成本地打包 App 资源，打包后的资源在`unpackage/resources`路径下

### 开发环境

- 下载 Android Studio
- 下载 App 离线 SDK：<https://nativesupport.dcloud.net.cn/AppDocs/download/android>
- 申请 Appkey：<https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey>

### android studio 配置

#### 放置打包资源

打开项目后找到 `assets/apps`目录，下一级目录名称是`__UNI__2A4F113`，这个是 uniapp 应用标识，可以在 HBuilderX 的 manifes.json 中找到，也可以在打包资源的 manifes.json 里找到。 该目录下面还有一个 www 目录，这里面就是放本地打包资源的。使用时将 www 目录下的文件全部删除，将自己的打包资源放进去。

在`assets/data/dcloud_control.xml`里也要修改应用标识

```xml
<hbuilder>
<apps>
    <app appid="__UNI__2A4F113" appver=""/>
</apps>
</hbuilder>

```

#### 设置应用名称

路径`app/src/main/res/values/strings.xml`

```xml
<resources>
    <string name="app_name">应用名称</string>
</resources>
```

#### 设置应用图标

路径`app/src/main/res/`，新建一个文件夹`drawable-hdpi`，里面放 logo 图片

### 配置 build.gradle

```sh
apply plugin: 'com.android.application'

android {
    compileSdkVersion 29
    buildToolsVersion '28.0.3'
    defaultConfig {
        applicationId "uni.UNI2A4F113"
        minSdkVersion 21
        targetSdkVersion 28
        versionCode 101
        versionName "1.7.85"
        multiDexEnabled true
        ndk {
            abiFilters 'armeabi-v7a', 'arm64-v8a'
        }
        manifestPlaceholders = [
                "apk.applicationId"     : "uni.UNI2A4F113",
                "GETUI_APPID"           : "unipush的appid",
                "plus.unipush.appid"    : "unipush的appid",
                "plus.unipush.appkey"   : "unipuish的appkey",
                "plus.unipush.appsecret": "unipush的secrety"
        ]
        compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_8
            targetCompatibility JavaVersion.VERSION_1_8
        }
    }
    signingConfigs {
        config {
            keyAlias '__uni__2a4f113'
            keyPassword 'J02ojI7r'
            storeFile file('key.keystore')
            storePassword 'J02ojI7r'
            v1SigningEnabled true
            v2SigningEnabled true
        }
    }
    buildTypes {
        debug {
            signingConfig signingConfigs.config
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
        release {
            signingConfig signingConfigs.config
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
    lintOptions {
        checkReleaseBuilds false
        abortOnError false
    }
    aaptOptions {
        additionalParameters '--auto-add-overlay'
        ignoreAssetsPattern "!.svn:!.git:.*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~"
    }
}
repositories {
    flatDir {
        dirs 'libs'
    }
}
dependencies {
    implementation fileTree(include: ['*.jar'], dir: 'libs')
    implementation fileTree(include: ['*.aar'], dir: 'libs')
    implementation 'androidx.appcompat:appcompat:1.0.0'
    implementation 'androidx.legacy:legacy-support-v4:1.0.0'
    implementation 'androidx.recyclerview:recyclerview:1.0.0'
    implementation 'com.facebook.fresco:fresco:2.5.0'
    implementation "com.facebook.fresco:animated-gif:2.5.0"
    implementation 'com.github.bumptech.glide:glide:4.9.0'
    implementation 'com.alibaba:fastjson:1.1.46.android'
}
```

1. 配置应用标识`applicationId`，这里还是同上的应用标识

2. 配置应用版本名称和版本号，这里要和 HBuilderX 的 manifes.json 中的版本号一致

3. 配置 cpu 类型 ndk， `abiFilters 'armeabi-v7a', 'arm64-v8a'`，去掉 x86，
   [参考文档](https://uniapp.dcloud.net.cn/tutorial/app-android-abifilters.html)

4. 配置签名证书

```sh
    signingConfigs {
        config {
            keyAlias '__uni__2a4f113'
            keyPassword '你的密码'
            storeFile file('key.keystore')
            storePassword '你的密码'
            v1SigningEnabled true
            v2SigningEnabled true
        }
    }
```

keyAlias 别名、keyPassword 密码

`storeFile file('key.keystore')`表示证书地址，在创建证书时会有一个 keystore 后缀的文件或者 jks 后缀的文件，将它放在和 build.gra 同级的目录

### 配置 AndroidManifest.xml

1. 在文件开头配置 package 名称，改为应用标识

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="uni.UNI2A4F113"></manifest>
```

2. 配置 android 权限

类似`<uses-permission android:name="android.permission.CAMERA" />`这种权限配置，可以在 HBuilderX 的 manifes.json 中的 App 权限配置找到

3. 模块配置

[文档地址](https://nativesupport.dcloud.net.cn/AppDocs/usemodule/androidModuleConfig/geolocation)

地图、消息推送等相关模块都可配置，按照文档引入工程需要的 jar/aar 文件，并在 application 节点下配置相关代码

4. 添加 provider 信息

```xml
<provider
  android:name="io.dcloud.common.util.DCloud_FileProvider"
  android:authorities="uni.UNI2A4F113.dc.fileprovider"
  android:exported="false"
  android:grantUriPermissions="true"
>
  <meta-data android:name="android.support.FILE_PROVIDER_PATHS" android:resource="@xml/dcloud_file_provider" />
</provider>
```

注意当前应用的包名`uni.UNI2A4F113`

5. 配置 Appkey

```xml
<meta-data android:name="dcloud_appkey" android:value="你申请的key" />
```

### 打包

配置完成后，点击打包图标，等待打包，然后会生成一个 apk 文件，安装到手机里即可
