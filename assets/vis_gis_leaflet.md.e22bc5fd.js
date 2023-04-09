import{_ as s,c as a,o as l,Q as n}from"./chunks/framework.f14b72c3.js";const u=JSON.parse('{"title":"Leaflet","description":"","frontmatter":{},"headers":[],"relativePath":"vis/gis/leaflet.md","lastUpdated":1681036152000}'),p={name:"vis/gis/leaflet.md"},o=n(`<h1 id="leaflet" tabindex="-1">Leaflet <a class="header-anchor" href="#leaflet" aria-label="Permalink to &quot;Leaflet&quot;">​</a></h1><p>官网地址: <a href="https://leafletjs.com/" target="_blank" rel="noreferrer">https://leafletjs.com/</a></p><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><p>npm 安装</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">npm </span><span style="color:#F1FA8C;">install</span><span style="color:#F8F8F2;"> </span><span style="color:#F1FA8C;">leaflet</span></span>
<span class="line"></span></code></pre></div><p>CDN</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">link</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">rel</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">stylesheet</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">href</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">https://unpkg.com/leaflet@1.6.0/dist/leaflet.css</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> /&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">script</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">src</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">https://unpkg.com/leaflet@1.6.0/dist/leaflet.js</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">&gt;&lt;/</span><span style="color:#FF79C6;">script</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="加载地图" tabindex="-1">加载地图 <a class="header-anchor" href="#加载地图" aria-label="Permalink to &quot;加载地图&quot;">​</a></h2><h3 id="准备一个地图容器" tabindex="-1">准备一个地图容器 <a class="header-anchor" href="#准备一个地图容器" aria-label="Permalink to &quot;准备一个地图容器&quot;">​</a></h3><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">div</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">id</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">map</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">style</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">width: 100%;height:800px;</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">&gt;&lt;/</span><span style="color:#FF79C6;">div</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="声明一个地图" tabindex="-1">声明一个地图 <a class="header-anchor" href="#声明一个地图" aria-label="Permalink to &quot;声明一个地图&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> map </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">L</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">map</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">map</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  center</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> [</span><span style="color:#BD93F9;">39.90923</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">116.397428</span><span style="color:#F8F8F2;">],</span></span>
<span class="line"><span style="color:#F8F8F2;">  zoom</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">12</span></span>
<span class="line"><span style="color:#F8F8F2;">})</span></span>
<span class="line"></span></code></pre></div><h3 id="添加图层" tabindex="-1">添加图层 <a class="header-anchor" href="#添加图层" aria-label="Permalink to &quot;添加图层&quot;">​</a></h3><h4 id="_1-、高德地图标准图层" tabindex="-1">（1）、高德地图标准图层 <a class="header-anchor" href="#_1-、高德地图标准图层" aria-label="Permalink to &quot;（1）、高德地图标准图层&quot;">​</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#BD93F9;">L</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">tileLayer</span><span style="color:#F8F8F2;">(</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&amp;size=1&amp;scale=1&amp;style=8&amp;x={x}&amp;y={y}&amp;z={z}</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  {</span></span>
<span class="line"><span style="color:#F8F8F2;">    subdomains</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> [</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">1</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">2</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">3</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">4</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">] </span><span style="color:#6272A4;">// 子域名，对应 urlTemplate 链接中的参数 {s}</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">).</span><span style="color:#50FA7B;">addTo</span><span style="color:#F8F8F2;">(map)</span></span>
<span class="line"></span></code></pre></div><h4 id="_2-、高德地图卫星图层" tabindex="-1">（2）、高德地图卫星图层 <a class="header-anchor" href="#_2-、高德地图卫星图层" aria-label="Permalink to &quot;（2）、高德地图卫星图层&quot;">​</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#BD93F9;">L</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">tileLayer</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">http://webst0{s}.is.autonavi.com/appmaptile?style=6&amp;x={x}&amp;y={y}&amp;z={z}</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  subdomains</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> [</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">1</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">2</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">3</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">4</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">]</span></span>
<span class="line"><span style="color:#F8F8F2;">}).</span><span style="color:#50FA7B;">addTo</span><span style="color:#F8F8F2;">(map)</span></span>
<span class="line"></span></code></pre></div><h4 id="_3-、高德地图标注" tabindex="-1">（3）、高德地图标注 <a class="header-anchor" href="#_3-、高德地图标注" aria-label="Permalink to &quot;（3）、高德地图标注&quot;">​</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#BD93F9;">L</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">tileLayer</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">http://webst0{s}.is.autonavi.com/appmaptile?style=8&amp;x={x}&amp;y={y}&amp;z={z}</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, {</span></span>
<span class="line"><span style="color:#F8F8F2;">  subdomains</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> [</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">1</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">2</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">3</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">4</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">]</span></span>
<span class="line"><span style="color:#F8F8F2;">}).</span><span style="color:#50FA7B;">addTo</span><span style="color:#F8F8F2;">(map)</span></span>
<span class="line"></span></code></pre></div><h4 id="_4-、谷歌地图" tabindex="-1">（4）、谷歌地图 <a class="header-anchor" href="#_4-、谷歌地图" aria-label="Permalink to &quot;（4）、谷歌地图&quot;">​</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#BD93F9;">L</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">tileLayer</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">http://www.google.cn/maps/vt?lyrs=m@189&amp;gl=cn&amp;x={x}&amp;y={y}&amp;z={z}</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">).</span><span style="color:#50FA7B;">addTo</span><span style="color:#F8F8F2;">(map)</span></span>
<span class="line"></span></code></pre></div><h4 id="_5-、谷歌卫星地图" tabindex="-1">（5）、谷歌卫星地图 <a class="header-anchor" href="#_5-、谷歌卫星地图" aria-label="Permalink to &quot;（5）、谷歌卫星地图&quot;">​</a></h4><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#BD93F9;">L</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">tileLayer</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">http://www.google.cn/maps/vt?lyrs=s@189&amp;gl=cn&amp;x={x}&amp;y={y}&amp;z={z}</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">).</span><span style="color:#50FA7B;">addTo</span><span style="color:#F8F8F2;">(map)</span></span>
<span class="line"></span></code></pre></div><h4 id="_6-、百度地图" tabindex="-1">（6）、百度地图 <a class="header-anchor" href="#_6-、百度地图" aria-label="Permalink to &quot;（6）、百度地图&quot;">​</a></h4><p>详见 <a href="https://github.com/Ivanzgh/leaflet/blob/master/src/baiduLayer.html" target="_blank" rel="noreferrer">baiduLayer.html</a></p><h3 id="切换图层" tabindex="-1">切换图层 <a class="header-anchor" href="#切换图层" aria-label="Permalink to &quot;切换图层&quot;">​</a></h3><p><a href="https://leafletjs.com/reference-1.0.3.html#control-layers" target="_blank" rel="noreferrer">Control.Layers</a></p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#BD93F9;">L</span><span style="color:#F8F8F2;">.control.</span><span style="color:#50FA7B;">layers</span><span style="color:#F8F8F2;">( baselayers</span><span style="color:#FF79C6;">?</span><span style="color:#F8F8F2;">, overlays</span><span style="color:#FF79C6;">?</span><span style="color:#F8F8F2;">, &lt;</span><span style="color:#8BE9FD;font-style:italic;">Control.Layers</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">options</span><span style="color:#F8F8F2;">&gt; options?)</span></span>
<span class="line"></span></code></pre></div><p>使用给定的层创建一个属性控件。基层将使用单选按钮来切换，而覆盖将用复选框来切换。 所有的基层都应该在基层对象中传递，但是在地图实例化过程中，应该只在映射中添加一个。 详见 <a href="https://github.com/Ivanzgh/leaflet/blob/master/src/layer.html" target="_blank" rel="noreferrer">layer.html</a></p><p>更多示例请详见 <a href="https://github.com/Ivanzgh/leaflet" target="_blank" rel="noreferrer">leaflet</a></p>`,30),e=[o];function t(F,c,r,y,i,d){return l(),a("div",null,e)}const m=s(p,[["render",t]]);export{u as __pageData,m as default};
