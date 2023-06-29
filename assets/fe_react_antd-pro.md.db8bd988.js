import{_ as s,c as a,o as n,Q as l}from"./chunks/framework.f14b72c3.js";const u=JSON.parse('{"title":"Ant Design Pro v5","description":"","frontmatter":{},"headers":[],"relativePath":"fe/react/antd-pro.md","lastUpdated":1688050449000}'),p={name:"fe/react/antd-pro.md"},o=l(`<h1 id="ant-design-pro-v5" tabindex="-1">Ant Design Pro v5 <a class="header-anchor" href="#ant-design-pro-v5" aria-label="Permalink to &quot;Ant Design Pro v5&quot;">​</a></h1><h2 id="初始化时依赖包报错" tabindex="-1">初始化时依赖包报错 <a class="header-anchor" href="#初始化时依赖包报错" aria-label="Permalink to &quot;初始化时依赖包报错&quot;">​</a></h2><p>配置 tsconfig.json</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">{</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#8BE9FE;">&quot;</span><span style="color:#8BE9FD;">compilerOptions</span><span style="color:#8BE9FE;">&quot;</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#8BE9FE;">&quot;</span><span style="color:#8BE9FD;">forceConsistentCasingInFileNames</span><span style="color:#8BE9FE;">&quot;</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">false</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="添加路由" tabindex="-1">添加路由 <a class="header-anchor" href="#添加路由" aria-label="Permalink to &quot;添加路由&quot;">​</a></h2><p>在<code>config/routes.ts</code>下配置，比如添加 home 路由，先在<code>src/pages</code>下新建 Home.tsx 路由组件</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">default</span><span style="color:#F8F8F2;"> [</span></span>
<span class="line"><span style="color:#F8F8F2;">  {</span></span>
<span class="line"><span style="color:#F8F8F2;">    path</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">/home</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">    name</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">home</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">    icon</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">home</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">    component</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">./Home</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">];</span></span>
<span class="line"></span></code></pre></div><h2 id="model" tabindex="-1">model <a class="header-anchor" href="#model" aria-label="Permalink to &quot;model&quot;">​</a></h2><p><a href="https://pro.ant.design/zh-CN/docs/simple-model" target="_blank" rel="noreferrer">https://pro.ant.design/zh-CN/docs/simple-model</a></p><p>新建<code>src/models</code>目录</p><p>使用：</p><ol><li>如果只是简单地获取值，比如有一个<code>src/models/user.ts</code>，默认导出 user，则使用方式：<code>&lt;div&gt;{useModel(&#39;user&#39;)}&lt;/div&gt;</code></li><li>如果想使用暴露出的一部分方法去更改状态值，可以添加第二个参数，是一个函数</li></ol><p>建立一个 counter.ts 文件</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">import</span><span style="color:#F8F8F2;"> { useState, useCallback } </span><span style="color:#FF79C6;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">react</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">default</span><span style="color:#F8F8F2;"> () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> [counter, setCounter] </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">useState</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> increment </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">useCallback</span><span style="color:#F8F8F2;">(() </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">setCounter</span><span style="color:#F8F8F2;">((</span><span style="color:#FFB86C;font-style:italic;">c</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> c </span><span style="color:#FF79C6;">+</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">), []);</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> decrement </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">useCallback</span><span style="color:#F8F8F2;">(() </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">setCounter</span><span style="color:#F8F8F2;">((</span><span style="color:#FFB86C;font-style:italic;">c</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> c </span><span style="color:#FF79C6;">-</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">), []);</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> { counter, increment, decrement };</span></span>
<span class="line"><span style="color:#F8F8F2;">};</span></span>
<span class="line"></span></code></pre></div><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">import</span><span style="color:#F8F8F2;"> { useModel } </span><span style="color:#FF79C6;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">@umijs/max</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">default</span><span style="color:#F8F8F2;"> const </span><span style="color:#50FA7B;">App</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> { add, minus } </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">useModel</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">counter</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, (</span><span style="color:#FFB86C;font-style:italic;">ret</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> ({</span></span>
<span class="line"><span style="color:#F8F8F2;">    add</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> ret.increment,</span></span>
<span class="line"><span style="color:#F8F8F2;">    minus</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> ret.decrement</span></span>
<span class="line"><span style="color:#F8F8F2;">  }));</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> (</span></span>
<span class="line"><span style="color:#F8F8F2;">    &lt;</span><span style="color:#FF79C6;">div</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">      &lt;</span><span style="color:#FF79C6;">button</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">type</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">button</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">onClick</span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;">{add}&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">        add by 1</span></span>
<span class="line"><span style="color:#F8F8F2;">      &lt;/</span><span style="color:#FF79C6;">button</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">      &lt;</span><span style="color:#FF79C6;">button</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">type</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">button</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">onClick</span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;">{minus}&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">        minus by 1</span></span>
<span class="line"><span style="color:#F8F8F2;">      &lt;/</span><span style="color:#FF79C6;">button</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">    &lt;/</span><span style="color:#FF79C6;">div</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">  );</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span></code></pre></div><ol start="3"><li>在 app.tsx 中，有一个 getInitialState 方法，可以初始化全局状态</li></ol><p><a href="https://pro.ant.design/zh-CN/docs/initial-state" target="_blank" rel="noreferrer">https://pro.ant.design/zh-CN/docs/initial-state</a></p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">import</span><span style="color:#F8F8F2;"> { useModel } </span><span style="color:#FF79C6;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">@umijs/max</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> { initialState } </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">useModel</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">@@initialState</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> &lt;</span><span style="color:#FF79C6;">h1</span><span style="color:#F8F8F2;">&gt;{initialState?.title}&lt;/</span><span style="color:#FF79C6;">h1</span><span style="color:#F8F8F2;">&gt;;</span></span>
<span class="line"></span></code></pre></div><h2 id="国际化" tabindex="-1">国际化 <a class="header-anchor" href="#国际化" aria-label="Permalink to &quot;国际化&quot;">​</a></h2><p><a href="https://umijs.org/docs/max/i18n" target="_blank" rel="noreferrer">https://umijs.org/docs/max/i18n</a></p><h3 id="菜单" tabindex="-1">菜单 <a class="header-anchor" href="#菜单" aria-label="Permalink to &quot;菜单&quot;">​</a></h3><p>在 locales 的 zh-CN （中文）的 menu.ts，以及 en-US（英文）的 menu.ts 中增加上面新添加的 Home 页面国际化 key 与值</p><h3 id="页面" tabindex="-1">页面 <a class="header-anchor" href="#页面" aria-label="Permalink to &quot;页面&quot;">​</a></h3><p>使用 umi 自带的 FormattedMessage 组件，id 就是国际化的 key。还有一种方式是使用 useIntl 钩子函数，可以在方法中使用，更加灵活</p><div class="language-tsx"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">import</span><span style="color:#F8F8F2;"> { FormattedMessage, useIntl } </span><span style="color:#FF79C6;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">@umijs/max</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">Home</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> (</span></span>
<span class="line"><span style="color:#F8F8F2;">    &lt;</span><span style="color:#FF79C6;">div</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">className</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">home</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">      &lt;</span><span style="color:#8BE9FD;font-style:italic;">FormattedMessage</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">id</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">pages.home.title</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> /&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">    &lt;/</span><span style="color:#FF79C6;">div</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">  );</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">default</span><span style="color:#F8F8F2;"> Home;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">UpdateForm</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> (</span><span style="color:#FFB86C;font-style:italic;">props</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> intl </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">useIntl</span><span style="color:#F8F8F2;">();</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> &lt;</span><span style="color:#FF79C6;">h1</span><span style="color:#F8F8F2;">&gt;{intl.</span><span style="color:#50FA7B;">formatMessage</span><span style="color:#F8F8F2;">({ id</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">pages.home.title</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> })}&lt;/</span><span style="color:#FF79C6;">h1</span><span style="color:#F8F8F2;">&gt;;</span></span>
<span class="line"><span style="color:#F8F8F2;">};</span></span>
<span class="line"></span></code></pre></div><h2 id="开发规范" tabindex="-1">开发规范 <a class="header-anchor" href="#开发规范" aria-label="Permalink to &quot;开发规范&quot;">​</a></h2><ol><li>所有路由组件（会配置在路由配置中的组件）以大驼峰命名打平到 pages 下面第一级。不建议在路由组件内部再嵌套路由组件</li></ol><h2 id="踩坑记录" tabindex="-1">踩坑记录 <a class="header-anchor" href="#踩坑记录" aria-label="Permalink to &quot;踩坑记录&quot;">​</a></h2><h3 id="安装-ant-design-charts-报错" tabindex="-1">安装 @ant-design/charts 报错 <a class="header-anchor" href="#安装-ant-design-charts-报错" aria-label="Permalink to &quot;安装 @ant-design/charts 报错&quot;">​</a></h3><p>如果按照官方文档安装主包，会因为 antd 的版本问题报错，相关 <a href="https://github.com/ant-design/ant-design-charts/issues/1689" target="_blank" rel="noreferrer">Issue</a>。安装对应的子包即可。常用子包如下：</p><ul><li>统计图表：<code>@ant-design/plots</code></li><li>地图：<code>@ant-design/maps</code></li><li>流程图：<code>@ant-design/flowchart</code></li><li>关系图：<code>@ant-design/graphs</code></li></ul><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula"><code><span class="line"><span style="color:#6272A4;"># 不推荐的安装方式</span></span>
<span class="line"><span style="color:#F8F8F2;">npm </span><span style="color:#F1FA8C;">install</span><span style="color:#F8F8F2;"> </span><span style="color:#F1FA8C;">@ant-design/charts</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">--save</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;"># 推荐的安装方式</span></span>
<span class="line"><span style="color:#F8F8F2;">npm </span><span style="color:#F1FA8C;">install</span><span style="color:#F8F8F2;"> </span><span style="color:#F1FA8C;">@ant-design/plots</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">-S</span></span>
<span class="line"></span></code></pre></div>`,32),e=[o];function F(t,c,r,y,i,d){return n(),a("div",null,e)}const h=s(p,[["render",F]]);export{u as __pageData,h as default};
