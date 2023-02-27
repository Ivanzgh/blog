import{_ as s,c as a,o as n,a as l}from"./app.fb0475dd.js";const g=JSON.parse('{"title":"Three","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u6750\u8D28","slug":"\u6750\u8D28","link":"#\u6750\u8D28","children":[]},{"level":2,"title":"\u76F8\u673A","slug":"\u76F8\u673A","link":"#\u76F8\u673A","children":[{"level":3,"title":"\u6B63\u4EA4\u76F8\u673A","slug":"\u6B63\u4EA4\u76F8\u673A","link":"#\u6B63\u4EA4\u76F8\u673A","children":[]},{"level":3,"title":"\u900F\u89C6\u76F8\u673A","slug":"\u900F\u89C6\u76F8\u673A","link":"#\u900F\u89C6\u76F8\u673A","children":[]}]},{"level":2,"title":"\u706F\u5149","slug":"\u706F\u5149","link":"#\u706F\u5149","children":[{"level":3,"title":"\u5E73\u884C\u5149","slug":"\u5E73\u884C\u5149","link":"#\u5E73\u884C\u5149","children":[]},{"level":3,"title":"\u805A\u5149\u706F","slug":"\u805A\u5149\u706F","link":"#\u805A\u5149\u706F","children":[]}]},{"level":2,"title":"\u9634\u5F71","slug":"\u9634\u5F71","link":"#\u9634\u5F71","children":[]},{"level":2,"title":"\u51E0\u4F55\u4F53","slug":"\u51E0\u4F55\u4F53","link":"#\u51E0\u4F55\u4F53","children":[]},{"level":2,"title":"\u5E73\u79FB\u3001\u65CB\u8F6C\u3001\u7F29\u653E","slug":"\u5E73\u79FB\u3001\u65CB\u8F6C\u3001\u7F29\u653E","link":"#\u5E73\u79FB\u3001\u65CB\u8F6C\u3001\u7F29\u653E","children":[]},{"level":2,"title":"\u7740\u8272\u5668","slug":"\u7740\u8272\u5668","link":"#\u7740\u8272\u5668","children":[]},{"level":2,"title":"\u5DE5\u5177","slug":"\u5DE5\u5177","link":"#\u5DE5\u5177","children":[{"level":3,"title":"stats.js","slug":"stats-js","link":"#stats-js","children":[]},{"level":3,"title":"dat.gui","slug":"dat-gui","link":"#dat-gui","children":[]},{"level":3,"title":"tween.js","slug":"tween-js","link":"#tween-js","children":[]}]}],"relativePath":"vis/three/index.md","lastUpdated":1677460466000}'),p={name:"vis/three/index.md"},o=l(`<h1 id="three" tabindex="-1">Three <a class="header-anchor" href="#three" aria-hidden="true">#</a></h1><h2 id="\u6750\u8D28" tabindex="-1">\u6750\u8D28 <a class="header-anchor" href="#\u6750\u8D28" aria-hidden="true">#</a></h2><h2 id="\u76F8\u673A" tabindex="-1">\u76F8\u673A <a class="header-anchor" href="#\u76F8\u673A" aria-hidden="true">#</a></h2><h3 id="\u6B63\u4EA4\u76F8\u673A" tabindex="-1">\u6B63\u4EA4\u76F8\u673A <a class="header-anchor" href="#\u6B63\u4EA4\u76F8\u673A" aria-hidden="true">#</a></h3><p>\u5728\u8FD9\u79CD\u6295\u5F71\u6A21\u5F0F\u4E0B\uFF0C\u65E0\u8BBA\u7269\u4F53\u8DDD\u79BB\u76F8\u673A\u8DDD\u79BB\u8FDC\u6216\u8005\u8FD1\uFF0C\u5728\u6700\u7EC8\u6E32\u67D3\u7684\u56FE\u7247\u4E2D\u7269\u4F53\u7684\u5927\u5C0F\u90FD\u4FDD\u6301\u4E0D\u53D8\u3002</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#F8F8F2;">OrthographicCamera( left, right, top, bottom, near, far)</span></span>
<span class="line"></span></code></pre></div><ul><li>left \u2014 \u89C6\u9525\u4F53\u5DE6\u4FA7\u9762</li><li>right \u2014 \u53F3\u4FA7\u9762</li><li>top \u2014 \u4E0A\u4FA7\u9762</li><li>bottom \u2014 \u4E0B\u4FA7\u9762</li><li>near \u2014 \u8FD1\u622A\u9762\uFF0C\u9ED8\u8BA4\u503C 0.1</li><li>far \u2014 \u8FDC\u622A\u9762\uFF0C\u9ED8\u8BA4\u503C 2000</li></ul><p><img src="https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418625.png" alt="image"></p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> k </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> window.innerWidth </span><span style="color:#FF79C6;">/</span><span style="color:#F8F8F2;"> window.innerHeight</span></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> s </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">200</span></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> camera </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-style:italic;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">THREE</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">OrthographicCamera</span><span style="color:#F8F8F2;">(</span><span style="color:#FF79C6;">-</span><span style="color:#F8F8F2;">s </span><span style="color:#FF79C6;">*</span><span style="color:#F8F8F2;"> k, s </span><span style="color:#FF79C6;">*</span><span style="color:#F8F8F2;"> k, s, </span><span style="color:#FF79C6;">-</span><span style="color:#F8F8F2;">s, </span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">1000</span><span style="color:#F8F8F2;">) </span><span style="color:#6272A4;">// \u5DE6\u622A\u9762\u3001\u53F3\u622A\u9762\u3001\u4E0A\u622A\u9762\u3001\u4E0B\u622A\u9762\u3001\u8FD1\u622A\u9762\u3001\u8FDC\u622A\u9762</span></span>
<span class="line"><span style="color:#F8F8F2;">camera.position.</span><span style="color:#50FA7B;">set</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">300</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">400</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">300</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">camera.</span><span style="color:#50FA7B;">lookAt</span><span style="color:#F8F8F2;">(scene.position)</span></span>
<span class="line"></span></code></pre></div><h3 id="\u900F\u89C6\u76F8\u673A" tabindex="-1">\u900F\u89C6\u76F8\u673A <a class="header-anchor" href="#\u900F\u89C6\u76F8\u673A" aria-hidden="true">#</a></h3><p>\u8FD9\u4E00\u6295\u5F71\u6A21\u5F0F\u88AB\u7528\u6765\u6A21\u62DF\u4EBA\u773C\u6240\u770B\u5230\u7684\u666F\u8C61</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#F8F8F2;">PerspectiveCamera( fov, aspect, near, far )</span></span>
<span class="line"></span></code></pre></div><ul><li>fov \u2014 \u89C6\u91CE\u89D2\u5EA6\uFF0C\u9ED8\u8BA4\u503C 50</li><li>aspect \u2014 \u89C6\u9525\u4F53\u957F\u5BBD\u6BD4\uFF0C\u9ED8\u8BA4\u503C 1(\u6B63\u65B9\u5F62\u753B\u5E03)</li><li>near \u2014 \u8FD1\u622A\u9762\uFF0C\u9ED8\u8BA4\u503C 0.1</li><li>far \u2014 \u8FDC\u622A\u9762\uFF0C\u9ED8\u8BA4\u503C 2000</li></ul><p>\u53EA\u6709\u79BB\u76F8\u673A\u7684\u8DDD\u79BB\u5927\u4E8E near \u503C\uFF0C\u5C0F\u4E8E far \u503C\uFF0C\u4E14\u5728\u76F8\u673A\u7684\u53EF\u89C6\u89D2\u5EA6\u4E4B\u5185\uFF0C\u624D\u80FD\u88AB\u76F8\u673A\u6295\u5F71\u5230\u3002</p><p><img src="https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418565.png" alt="image"><img src="https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418596.png" alt="image"><img src="https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418611.png" alt="image"></p><p>\u793A\u4F8B\uFF1A</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> camera </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-style:italic;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">THREE</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">PerspectiveCamera</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">45</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">2</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">1000</span><span style="color:#F8F8F2;">) </span><span style="color:#6272A4;">// \u89C6\u89D2(\u5355\u4F4D\u662F\u5EA6)\u3001\u89C6\u9525\u4F53\u957F\u5BBD\u6BD4(width/height)\u3001\u8FD1\u622A\u9762\u3001\u8FDC\u622A\u9762</span></span>
<span class="line"><span style="color:#F8F8F2;">camera.position.</span><span style="color:#50FA7B;">set</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">300</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">400</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">300</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">camera.</span><span style="color:#50FA7B;">lookAt</span><span style="color:#F8F8F2;">(scene.position)</span></span>
<span class="line"></span></code></pre></div><p>\u5982\u679C\u5C06\u89C6\u91CE\u89D2\u5EA6 fov \u53D8\u5C0F\uFF0C\u5219\u7269\u4F53\u5728\u9875\u9762\u4E0A\u4F1A\u53D8\u5927\u3002\u539F\u56E0\u662F\u89C6\u91CE\u89D2\u5EA6\u53D8\u5C0F\u540E\uFF0C\u89C6\u666F\u7A97\u53E3\u5C31\u53D8\u5C0F\u4E86\uFF0C\u800C\u7269\u4F53\u5927\u5C0F\u5B9E\u9645\u662F\u4E0D\u4F1A\u53D8\u7684\uFF0C\u4F46\u76F8\u5BF9\u89C6\u666F\u7A97\u53E3\u6765\u8BF4\u5C31\u53D8\u5927\u4E86\u3002</p><h2 id="\u706F\u5149" tabindex="-1">\u706F\u5149 <a class="header-anchor" href="#\u706F\u5149" aria-hidden="true">#</a></h2><h3 id="\u5E73\u884C\u5149" tabindex="-1">\u5E73\u884C\u5149 <a class="header-anchor" href="#\u5E73\u884C\u5149" aria-hidden="true">#</a></h3><p>\u9ED8\u8BA4<code>position</code>\u4F4D\u7F6E\u5728<code>(0, 1, 0)</code>\uFF0C\u6307\u5411\u539F\u70B9<code>(0, 0, 0)</code>\u3002\u53EF\u8BBE\u7F6E<code>target</code>\u5C5E\u6027\u4E3A\u573A\u666F\u4E2D\u7684\u5176\u4ED6\u4EFB\u610F\u6709<code>position</code>\u5C5E\u6027\u7684\u5BF9\u8C61</p><p>\u4E00\u79CD\u65B9\u5F0F\u662F\u521B\u5EFA<code>Object3D</code>\u5BF9\u8C61</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> targetObject </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-style:italic;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">THREE</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">Object3D</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> v1 </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> { x</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">84768.72257683857</span><span style="color:#F8F8F2;">, y</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">31758.999152786924</span><span style="color:#F8F8F2;">, z</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#F8F8F2;">targetObject.position.</span><span style="color:#50FA7B;">copy</span><span style="color:#F8F8F2;">(v1)</span></span>
<span class="line"><span style="color:#F8F8F2;">scene.</span><span style="color:#50FA7B;">add</span><span style="color:#F8F8F2;">(targetObject)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> light </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-style:italic;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">THREE</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">DirectionalLight</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">0xffffff</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">0.4</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">light.target </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> targetObject</span></span>
<span class="line"><span style="color:#F8F8F2;">scene.</span><span style="color:#50FA7B;">add</span><span style="color:#F8F8F2;">(light)</span></span>
<span class="line"></span></code></pre></div><p>\u53E6\u4E00\u79CD\u65B9\u5F0F\u662F\u5728\u573A\u666F\u4E2D\u521B\u5EFA\u7F51\u683C\u6A21\u578B<code>mesh</code>\u3002\u805A\u5149\u706F\u8BBE\u7F6E<code>target</code>\u5C5E\u6027\u548C\u5E73\u884C\u5149\u7684\u65B9\u5F0F\u4E00\u6837</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> spotLight </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-style:italic;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">THREE</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">SpotLight</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">0x00ff00</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> cubeGeometry </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-style:italic;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">THREE</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">BoxGeometry</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">0.001</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">0.001</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">0.001</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> cubeMaterial </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-style:italic;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">THREE</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">MeshLambertMaterial</span><span style="color:#F8F8F2;">({ color</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">yellow</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> })</span></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> mesh </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-style:italic;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">THREE</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">Mesh</span><span style="color:#F8F8F2;">(cubeGeometry, cubeMaterial)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> v1 </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> { x</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">84768.72257683857</span><span style="color:#F8F8F2;">, y</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">31758.999152786924</span><span style="color:#F8F8F2;">, z</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#F8F8F2;">mesh.position.</span><span style="color:#50FA7B;">copy</span><span style="color:#F8F8F2;">(v1)</span></span>
<span class="line"><span style="color:#F8F8F2;">spotLight.target </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> mesh</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">scene.</span><span style="color:#50FA7B;">add</span><span style="color:#F8F8F2;">(spotLight)</span></span>
<span class="line"><span style="color:#F8F8F2;">scene.</span><span style="color:#50FA7B;">add</span><span style="color:#F8F8F2;">(mesh)</span></span>
<span class="line"></span></code></pre></div><h3 id="\u805A\u5149\u706F" tabindex="-1">\u805A\u5149\u706F <a class="header-anchor" href="#\u805A\u5149\u706F" aria-hidden="true">#</a></h3><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> spotLight </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-style:italic;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">THREE</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">SpotLight</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">0xffffff</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">spotLight.position.</span><span style="color:#50FA7B;">set</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">100</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">1000</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">100</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">scene.</span><span style="color:#50FA7B;">add</span><span style="color:#F8F8F2;">(spotLight)</span></span>
<span class="line"></span></code></pre></div><p>\u8F85\u52A9\u5DE5\u5177</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> spotLightHelper </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-style:italic;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">THREE</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">SpotLightHelper</span><span style="color:#F8F8F2;">(spotLight)</span></span>
<span class="line"><span style="color:#F8F8F2;">scene.</span><span style="color:#50FA7B;">add</span><span style="color:#F8F8F2;">(spotLightHelper)</span></span>
<span class="line"></span></code></pre></div><h2 id="\u9634\u5F71" tabindex="-1">\u9634\u5F71 <a class="header-anchor" href="#\u9634\u5F71" aria-hidden="true">#</a></h2><h2 id="\u51E0\u4F55\u4F53" tabindex="-1">\u51E0\u4F55\u4F53 <a class="header-anchor" href="#\u51E0\u4F55\u4F53" aria-hidden="true">#</a></h2><h2 id="\u5E73\u79FB\u3001\u65CB\u8F6C\u3001\u7F29\u653E" tabindex="-1">\u5E73\u79FB\u3001\u65CB\u8F6C\u3001\u7F29\u653E <a class="header-anchor" href="#\u5E73\u79FB\u3001\u65CB\u8F6C\u3001\u7F29\u653E" aria-hidden="true">#</a></h2><h2 id="\u7740\u8272\u5668" tabindex="-1">\u7740\u8272\u5668 <a class="header-anchor" href="#\u7740\u8272\u5668" aria-hidden="true">#</a></h2><h2 id="\u5DE5\u5177" tabindex="-1">\u5DE5\u5177 <a class="header-anchor" href="#\u5DE5\u5177" aria-hidden="true">#</a></h2><h3 id="stats-js" tabindex="-1">stats.js <a class="header-anchor" href="#stats-js" aria-hidden="true">#</a></h3><p>\u6027\u80FD\u76D1\u63A7</p><p><a href="https://github.com/mrdoob/stats.js" target="_blank" rel="noreferrer">https://github.com/mrdoob/stats.js</a></p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#6272A4;">// &lt;script src=&quot;https://cdn.jsdelivr.net/npm/three@0.97.0/examples/js/libs/stats.min.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> stats </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-style:italic;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">Stats</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">stats.domElement.style.zIndex </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">100</span></span>
<span class="line"><span style="color:#F8F8F2;">document.</span><span style="color:#50FA7B;">getElementById</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">map</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">).</span><span style="color:#50FA7B;">appendChild</span><span style="color:#F8F8F2;">(stats.domElement)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">animation</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">  stats.</span><span style="color:#50FA7B;">update</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">requestAnimationFrame</span><span style="color:#F8F8F2;">(animation)</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#50FA7B;">animation</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"></span></code></pre></div><h3 id="dat-gui" tabindex="-1">dat.gui <a class="header-anchor" href="#dat-gui" aria-hidden="true">#</a></h3><p>\u63A7\u5236\u5668</p><p><a href="https://github.com/dataarts/dat.gui" target="_blank" rel="noreferrer">https://github.com/dataarts/dat.gui</a></p><h3 id="tween-js" tabindex="-1">tween.js <a class="header-anchor" href="#tween-js" aria-hidden="true">#</a></h3><p>\u52A8\u753B\u5F15\u64CE</p><p><a href="https://github.com/tweenjs/tween.js" target="_blank" rel="noreferrer">https://github.com/tweenjs/tween.js</a></p>`,44),e=[o];function t(F,c,r,i,y,d){return n(),a("div",null,e)}const u=s(p,[["render",t]]);export{g as __pageData,u as default};