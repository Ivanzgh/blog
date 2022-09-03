import{_ as s,c as a,o as n,a as l}from"./app.38368cd2.js";const E=JSON.parse('{"title":"uniapp","description":"","frontmatter":{},"headers":[{"level":2,"title":"App \u79BB\u7EBF\u6253\u5305","slug":"app-\u79BB\u7EBF\u6253\u5305","link":"#app-\u79BB\u7EBF\u6253\u5305","children":[{"level":3,"title":"\u751F\u6210\u79BB\u7EBF\u8D44\u6E90","slug":"\u751F\u6210\u79BB\u7EBF\u8D44\u6E90","link":"#\u751F\u6210\u79BB\u7EBF\u8D44\u6E90","children":[]},{"level":3,"title":"\u5F00\u53D1\u73AF\u5883","slug":"\u5F00\u53D1\u73AF\u5883","link":"#\u5F00\u53D1\u73AF\u5883","children":[]},{"level":3,"title":"android studio \u914D\u7F6E","slug":"android-studio-\u914D\u7F6E","link":"#android-studio-\u914D\u7F6E","children":[]},{"level":3,"title":"\u914D\u7F6E build.gradle","slug":"\u914D\u7F6E-build-gradle","link":"#\u914D\u7F6E-build-gradle","children":[]},{"level":3,"title":"\u914D\u7F6E AndroidManifest.xml","slug":"\u914D\u7F6E-androidmanifest-xml","link":"#\u914D\u7F6E-androidmanifest-xml","children":[]},{"level":3,"title":"\u6253\u5305","slug":"\u6253\u5305","link":"#\u6253\u5305","children":[]}]}],"relativePath":"mini-program/uniapp.md","lastUpdated":1662180954000}'),p={name:"mini-program/uniapp.md"},o=l(`<h1 id="uniapp" tabindex="-1">uniapp <a class="header-anchor" href="#uniapp" aria-hidden="true">#</a></h1><h2 id="app-\u79BB\u7EBF\u6253\u5305" tabindex="-1">App \u79BB\u7EBF\u6253\u5305 <a class="header-anchor" href="#app-\u79BB\u7EBF\u6253\u5305" aria-hidden="true">#</a></h2><p>\u5B98\u65B9\u6587\u6863\uFF1A<a href="https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android" target="_blank" rel="noreferrer">https://nativesupport.dcloud.net.cn/AppDocs/usesdk/android</a></p><h3 id="\u751F\u6210\u79BB\u7EBF\u8D44\u6E90" tabindex="-1">\u751F\u6210\u79BB\u7EBF\u8D44\u6E90 <a class="header-anchor" href="#\u751F\u6210\u79BB\u7EBF\u8D44\u6E90" aria-hidden="true">#</a></h3><p>\u6253\u5F00 HBuilderX \u9009\u62E9 \u53D1\u884C =&gt; \u539F\u751F App-\u672C\u5730\u6253\u5305 =&gt; \u751F\u6210\u672C\u5730\u6253\u5305 App \u8D44\u6E90\uFF0C\u6253\u5305\u540E\u7684\u8D44\u6E90\u5728<code>unpackage/resources</code>\u8DEF\u5F84\u4E0B</p><h3 id="\u5F00\u53D1\u73AF\u5883" tabindex="-1">\u5F00\u53D1\u73AF\u5883 <a class="header-anchor" href="#\u5F00\u53D1\u73AF\u5883" aria-hidden="true">#</a></h3><ul><li>\u4E0B\u8F7D Android Studio</li><li>\u4E0B\u8F7D App \u79BB\u7EBF SDK\uFF1A<a href="https://nativesupport.dcloud.net.cn/AppDocs/download/android" target="_blank" rel="noreferrer">https://nativesupport.dcloud.net.cn/AppDocs/download/android</a></li><li>\u7533\u8BF7 Appkey\uFF1A<a href="https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey" target="_blank" rel="noreferrer">https://nativesupport.dcloud.net.cn/AppDocs/usesdk/appkey</a></li></ul><h3 id="android-studio-\u914D\u7F6E" tabindex="-1">android studio \u914D\u7F6E <a class="header-anchor" href="#android-studio-\u914D\u7F6E" aria-hidden="true">#</a></h3><h4 id="\u653E\u7F6E\u6253\u5305\u8D44\u6E90" tabindex="-1">\u653E\u7F6E\u6253\u5305\u8D44\u6E90 <a class="header-anchor" href="#\u653E\u7F6E\u6253\u5305\u8D44\u6E90" aria-hidden="true">#</a></h4><p>\u6253\u5F00\u9879\u76EE\u540E\u627E\u5230 <code>assets/apps</code>\u76EE\u5F55\uFF0C\u4E0B\u4E00\u7EA7\u76EE\u5F55\u540D\u79F0\u662F<code>__UNI__2A4F113</code>\uFF0C\u8FD9\u4E2A\u662F uniapp \u5E94\u7528\u6807\u8BC6\uFF0C\u53EF\u4EE5\u5728 HBuilderX \u7684 manifes.json \u4E2D\u627E\u5230\uFF0C\u4E5F\u53EF\u4EE5\u5728\u6253\u5305\u8D44\u6E90\u7684 manifes.json \u91CC\u627E\u5230\u3002 \u8BE5\u76EE\u5F55\u4E0B\u9762\u8FD8\u6709\u4E00\u4E2A www \u76EE\u5F55\uFF0C\u8FD9\u91CC\u9762\u5C31\u662F\u653E\u672C\u5730\u6253\u5305\u8D44\u6E90\u7684\u3002\u4F7F\u7528\u65F6\u5C06 www \u76EE\u5F55\u4E0B\u7684\u6587\u4EF6\u5168\u90E8\u5220\u9664\uFF0C\u5C06\u81EA\u5DF1\u7684\u6253\u5305\u8D44\u6E90\u653E\u8FDB\u53BB\u3002</p><p>\u5728<code>assets/data/dcloud_control.xml</code>\u91CC\u4E5F\u8981\u4FEE\u6539\u5E94\u7528\u6807\u8BC6</p><div class="language-xml"><button class="copy"></button><span class="lang">xml</span><pre><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">hbuilder</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">apps</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">    &lt;</span><span style="color:#FF79C6;">app</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">appid</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">__UNI__2A4F113</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">appver</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;&quot;</span><span style="color:#F8F8F2;">/&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">&lt;/</span><span style="color:#FF79C6;">apps</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">&lt;/</span><span style="color:#FF79C6;">hbuilder</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h4 id="\u8BBE\u7F6E\u5E94\u7528\u540D\u79F0" tabindex="-1">\u8BBE\u7F6E\u5E94\u7528\u540D\u79F0 <a class="header-anchor" href="#\u8BBE\u7F6E\u5E94\u7528\u540D\u79F0" aria-hidden="true">#</a></h4><p>\u8DEF\u5F84<code>app/src/main/res/values/strings.xml</code></p><div class="language-xml"><button class="copy"></button><span class="lang">xml</span><pre><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">resources</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">    &lt;</span><span style="color:#FF79C6;">string</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">name</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">app_name</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">&gt;\u5E94\u7528\u540D\u79F0&lt;/</span><span style="color:#FF79C6;">string</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">&lt;/</span><span style="color:#FF79C6;">resources</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"></span></code></pre></div><h4 id="\u8BBE\u7F6E\u5E94\u7528\u56FE\u6807" tabindex="-1">\u8BBE\u7F6E\u5E94\u7528\u56FE\u6807 <a class="header-anchor" href="#\u8BBE\u7F6E\u5E94\u7528\u56FE\u6807" aria-hidden="true">#</a></h4><p>\u8DEF\u5F84<code>app/src/main/res/</code>\uFF0C\u65B0\u5EFA\u4E00\u4E2A\u6587\u4EF6\u5939<code>drawable-hdpi</code>\uFF0C\u91CC\u9762\u653E logo \u56FE\u7247</p><h3 id="\u914D\u7F6E-build-gradle" tabindex="-1">\u914D\u7F6E build.gradle <a class="header-anchor" href="#\u914D\u7F6E-build-gradle" aria-hidden="true">#</a></h3><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#F8F8F2;">apply plugin: </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">com.android.application</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">android {</span></span>
<span class="line"><span style="color:#F8F8F2;">    compileSdkVersion 29</span></span>
<span class="line"><span style="color:#F8F8F2;">    buildToolsVersion </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">28.0.3</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    defaultConfig {</span></span>
<span class="line"><span style="color:#F8F8F2;">        applicationId </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">uni.UNI2A4F113</span><span style="color:#E9F284;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">        minSdkVersion 21</span></span>
<span class="line"><span style="color:#F8F8F2;">        targetSdkVersion 28</span></span>
<span class="line"><span style="color:#F8F8F2;">        versionCode 101</span></span>
<span class="line"><span style="color:#F8F8F2;">        versionName </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">1.7.85</span><span style="color:#E9F284;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">        multiDexEnabled </span><span style="color:#8BE9FD;">true</span></span>
<span class="line"><span style="color:#F8F8F2;">        ndk {</span></span>
<span class="line"><span style="color:#F8F8F2;">            abiFilters </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">armeabi-v7a</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">arm64-v8a</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">        }</span></span>
<span class="line"><span style="color:#F8F8F2;">        manifestPlaceholders = [</span></span>
<span class="line"><span style="color:#F8F8F2;">                </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">apk.applicationId</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">     </span><span style="color:#8BE9FD;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">uni.UNI2A4F113</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">                </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">GETUI_APPID</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">           </span><span style="color:#8BE9FD;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">unipush\u7684appid</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">                </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">plus.unipush.appid</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">    </span><span style="color:#8BE9FD;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">unipush\u7684appid</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">                </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">plus.unipush.appkey</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">   </span><span style="color:#8BE9FD;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">unipuish\u7684appkey</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">                </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">plus.unipush.appsecret</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">: </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">unipush\u7684secrety</span><span style="color:#E9F284;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">        ]</span></span>
<span class="line"><span style="color:#F8F8F2;">        compileOptions {</span></span>
<span class="line"><span style="color:#F8F8F2;">            sourceCompatibility JavaVersion.VERSION_1_8</span></span>
<span class="line"><span style="color:#F8F8F2;">            targetCompatibility JavaVersion.VERSION_1_8</span></span>
<span class="line"><span style="color:#F8F8F2;">        }</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">    signingConfigs {</span></span>
<span class="line"><span style="color:#F8F8F2;">        config {</span></span>
<span class="line"><span style="color:#F8F8F2;">            keyAlias </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">__uni__2a4f113</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">            keyPassword </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">J02ojI7r</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">            storeFile file(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">key.keystore</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">            storePassword </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">J02ojI7r</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">            v1SigningEnabled </span><span style="color:#8BE9FD;">true</span></span>
<span class="line"><span style="color:#F8F8F2;">            v2SigningEnabled </span><span style="color:#8BE9FD;">true</span></span>
<span class="line"><span style="color:#F8F8F2;">        }</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">    buildTypes {</span></span>
<span class="line"><span style="color:#F8F8F2;">        debug {</span></span>
<span class="line"><span style="color:#F8F8F2;">            signingConfig signingConfigs.config</span></span>
<span class="line"><span style="color:#F8F8F2;">            minifyEnabled </span><span style="color:#8BE9FD;">false</span></span>
<span class="line"><span style="color:#F8F8F2;">            proguardFiles getDefaultProguardFile(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">proguard-android.txt</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">), </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">proguard-rules.pro</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">        }</span></span>
<span class="line"><span style="color:#F8F8F2;">        release {</span></span>
<span class="line"><span style="color:#F8F8F2;">            signingConfig signingConfigs.config</span></span>
<span class="line"><span style="color:#F8F8F2;">            minifyEnabled </span><span style="color:#8BE9FD;">false</span></span>
<span class="line"><span style="color:#F8F8F2;">            proguardFiles getDefaultProguardFile(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">proguard-android.txt</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">), </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">proguard-rules.pro</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">        }</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">    lintOptions {</span></span>
<span class="line"><span style="color:#F8F8F2;">        checkReleaseBuilds </span><span style="color:#8BE9FD;">false</span></span>
<span class="line"><span style="color:#F8F8F2;">        abortOnError </span><span style="color:#8BE9FD;">false</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">    aaptOptions {</span></span>
<span class="line"><span style="color:#F8F8F2;">        additionalParameters </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">--auto-add-overlay</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">        ignoreAssetsPattern </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">!.svn:!.git:.*:!CVS:!thumbs.db:!picasa.ini:!*.scc:*~</span><span style="color:#E9F284;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;">repositories {</span></span>
<span class="line"><span style="color:#F8F8F2;">    flatDir {</span></span>
<span class="line"><span style="color:#F8F8F2;">        </span><span style="color:#8BE9FD;">dirs</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">libs</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#F8F8F2;">dependencies {</span></span>
<span class="line"><span style="color:#F8F8F2;">    implementation fileTree(include: [</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">*.jar</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">], dir: </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">libs</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">    implementation fileTree(include: [</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">*.aar</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">], dir: </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">libs</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">    implementation </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">androidx.appcompat:appcompat:1.0.0</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    implementation </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">androidx.legacy:legacy-support-v4:1.0.0</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    implementation </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">androidx.recyclerview:recyclerview:1.0.0</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    implementation </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">com.facebook.fresco:fresco:2.5.0</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    implementation </span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">com.facebook.fresco:animated-gif:2.5.0</span><span style="color:#E9F284;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">    implementation </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">com.github.bumptech.glide:glide:4.9.0</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    implementation </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">com.alibaba:fastjson:1.1.46.android</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span></code></pre></div><ol><li><p>\u914D\u7F6E\u5E94\u7528\u6807\u8BC6<code>applicationId</code>\uFF0C\u8FD9\u91CC\u8FD8\u662F\u540C\u4E0A\u7684\u5E94\u7528\u6807\u8BC6</p></li><li><p>\u914D\u7F6E\u5E94\u7528\u7248\u672C\u540D\u79F0\u548C\u7248\u672C\u53F7\uFF0C\u8FD9\u91CC\u8981\u548C HBuilderX \u7684 manifes.json \u4E2D\u7684\u7248\u672C\u53F7\u4E00\u81F4</p></li><li><p>\u914D\u7F6E cpu \u7C7B\u578B ndk\uFF0C <code>abiFilters &#39;armeabi-v7a&#39;, &#39;arm64-v8a&#39;</code>\uFF0C\u53BB\u6389 x86\uFF0C <a href="https://uniapp.dcloud.net.cn/tutorial/app-android-abifilters.html" target="_blank" rel="noreferrer">\u53C2\u8003\u6587\u6863</a></p></li><li><p>\u914D\u7F6E\u7B7E\u540D\u8BC1\u4E66</p></li></ol><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#F8F8F2;">    signingConfigs {</span></span>
<span class="line"><span style="color:#F8F8F2;">        config {</span></span>
<span class="line"><span style="color:#F8F8F2;">            keyAlias </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">__uni__2a4f113</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">            keyPassword </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">\u4F60\u7684\u5BC6\u7801</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">            storeFile file(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">key.keystore</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">            storePassword </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">\u4F60\u7684\u5BC6\u7801</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">            v1SigningEnabled </span><span style="color:#8BE9FD;">true</span></span>
<span class="line"><span style="color:#F8F8F2;">            v2SigningEnabled </span><span style="color:#8BE9FD;">true</span></span>
<span class="line"><span style="color:#F8F8F2;">        }</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"></span></code></pre></div><p>keyAlias \u522B\u540D\u3001keyPassword \u5BC6\u7801</p><p><code>storeFile file(&#39;key.keystore&#39;)</code>\u8868\u793A\u8BC1\u4E66\u5730\u5740\uFF0C\u5728\u521B\u5EFA\u8BC1\u4E66\u65F6\u4F1A\u6709\u4E00\u4E2A keystore \u540E\u7F00\u7684\u6587\u4EF6\u6216\u8005 jks \u540E\u7F00\u7684\u6587\u4EF6\uFF0C\u5C06\u5B83\u653E\u5728\u548C build.gra \u540C\u7EA7\u7684\u76EE\u5F55</p><h3 id="\u914D\u7F6E-androidmanifest-xml" tabindex="-1">\u914D\u7F6E AndroidManifest.xml <a class="header-anchor" href="#\u914D\u7F6E-androidmanifest-xml" aria-hidden="true">#</a></h3><ol><li>\u5728\u6587\u4EF6\u5F00\u5934\u914D\u7F6E package \u540D\u79F0\uFF0C\u6539\u4E3A\u5E94\u7528\u6807\u8BC6</li></ol><div class="language-xml"><button class="copy"></button><span class="lang">xml</span><pre><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">manifest</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">xmlns</span><span style="color:#FF79C6;">:</span><span style="color:#50FA7B;">android</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">http://schemas.android.com/apk/res/android</span><span style="color:#E9F284;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#50FA7B;">xmlns</span><span style="color:#FF79C6;">:</span><span style="color:#50FA7B;">tools</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">http://schemas.android.com/tools</span><span style="color:#E9F284;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#50FA7B;">package</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">uni.UNI2A4F113</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">&gt;&lt;/</span><span style="color:#FF79C6;">manifest</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"></span></code></pre></div><ol start="2"><li>\u914D\u7F6E android \u6743\u9650</li></ol><p>\u7C7B\u4F3C<code>&lt;uses-permission android:name=&quot;android.permission.CAMERA&quot; /&gt;</code>\u8FD9\u79CD\u6743\u9650\u914D\u7F6E\uFF0C\u53EF\u4EE5\u5728 HBuilderX \u7684 manifes.json \u4E2D\u7684 App \u6743\u9650\u914D\u7F6E\u627E\u5230</p><ol start="3"><li>\u6A21\u5757\u914D\u7F6E</li></ol><p><a href="https://nativesupport.dcloud.net.cn/AppDocs/usemodule/androidModuleConfig/geolocation" target="_blank" rel="noreferrer">\u6587\u6863\u5730\u5740</a></p><p>\u5730\u56FE\u3001\u6D88\u606F\u63A8\u9001\u7B49\u76F8\u5173\u6A21\u5757\u90FD\u53EF\u914D\u7F6E\uFF0C\u6309\u7167\u6587\u6863\u5F15\u5165\u5DE5\u7A0B\u9700\u8981\u7684 jar/aar \u6587\u4EF6\uFF0C\u5E76\u5728 application \u8282\u70B9\u4E0B\u914D\u7F6E\u76F8\u5173\u4EE3\u7801</p><ol start="4"><li>\u6DFB\u52A0 provider \u4FE1\u606F</li></ol><div class="language-xml"><button class="copy"></button><span class="lang">xml</span><pre><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">provider</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">android</span><span style="color:#FF79C6;">:</span><span style="color:#50FA7B;">name</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">io.dcloud.common.util.DCloud_FileProvider</span><span style="color:#E9F284;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">android</span><span style="color:#FF79C6;">:</span><span style="color:#50FA7B;">authorities</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">uni.UNI2A4F113.dc.fileprovider</span><span style="color:#E9F284;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">android</span><span style="color:#FF79C6;">:</span><span style="color:#50FA7B;">exported</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">false</span><span style="color:#E9F284;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">android</span><span style="color:#FF79C6;">:</span><span style="color:#50FA7B;">grantUriPermissions</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">true</span><span style="color:#E9F284;">&quot;</span></span>
<span class="line"><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">  &lt;</span><span style="color:#FF79C6;">meta-data</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">android</span><span style="color:#FF79C6;">:</span><span style="color:#50FA7B;">name</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">android.support.FILE_PROVIDER_PATHS</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">android</span><span style="color:#FF79C6;">:</span><span style="color:#50FA7B;">resource</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">@xml/dcloud_file_provider</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> /&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">&lt;/</span><span style="color:#FF79C6;">provider</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u6CE8\u610F\u5F53\u524D\u5E94\u7528\u7684\u5305\u540D<code>uni.UNI2A4F113</code></p><ol start="5"><li>\u914D\u7F6E Appkey</li></ol><div class="language-xml"><button class="copy"></button><span class="lang">xml</span><pre><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">meta-data</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">android</span><span style="color:#FF79C6;">:</span><span style="color:#50FA7B;">name</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">dcloud_appkey</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">android</span><span style="color:#FF79C6;">:</span><span style="color:#50FA7B;">value</span><span style="color:#F8F8F2;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">\u4F60\u7533\u8BF7\u7684key</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> /&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="\u6253\u5305" tabindex="-1">\u6253\u5305 <a class="header-anchor" href="#\u6253\u5305" aria-hidden="true">#</a></h3><p>\u914D\u7F6E\u5B8C\u6210\u540E\uFF0C\u70B9\u51FB\u6253\u5305\u56FE\u6807\uFF0C\u7B49\u5F85\u6253\u5305\uFF0C\u7136\u540E\u4F1A\u751F\u6210\u4E00\u4E2A apk \u6587\u4EF6\uFF0C\u5B89\u88C5\u5230\u624B\u673A\u91CC\u5373\u53EF</p>`,38),e=[o];function F(t,r,c,i,y,d){return n(),a("div",null,e)}const g=s(p,[["render",F]]);export{E as __pageData,g as default};
