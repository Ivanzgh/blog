import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.f14b72c3.js";const C=JSON.parse('{"title":"Http 模块","description":"","frontmatter":{},"headers":[],"relativePath":"fe/node/http.md","lastUpdated":1684684556000}'),o={name:"fe/node/http.md"},p=l(`<h1 id="http-模块" tabindex="-1">Http 模块 <a class="header-anchor" href="#http-模块" aria-label="Permalink to &quot;Http 模块&quot;">​</a></h1><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> http </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">require</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">http</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> server </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> http.</span><span style="color:#50FA7B;">createServer</span><span style="color:#F8F8F2;">((</span><span style="color:#FFB86C;font-style:italic;">req</span><span style="color:#F8F8F2;">, </span><span style="color:#FFB86C;font-style:italic;">res</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(req.method); </span><span style="color:#6272A4;">// 获取请求方式</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(req.headers); </span><span style="color:#6272A4;">// 获取请求头</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(req.url); </span><span style="color:#6272A4;">// 获取url中的路径和查询参数</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(req.httpVersion); </span><span style="color:#6272A4;">// 获取http版本号</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">// 设置响应头，避免中文乱码</span></span>
<span class="line"><span style="color:#F8F8F2;">  res.</span><span style="color:#50FA7B;">setHeader</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">Content-Type</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">text/html;charset=utf-8</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">  res.</span><span style="color:#50FA7B;">end</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">你好</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">server.</span><span style="color:#50FA7B;">listen</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">9000</span><span style="color:#F8F8F2;">, () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">server start...</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"></span></code></pre></div><h2 id="获取请求体" tabindex="-1">获取请求体 <a class="header-anchor" href="#获取请求体" aria-label="Permalink to &quot;获取请求体&quot;">​</a></h2><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> http </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">require</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">http</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> server </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> http.</span><span style="color:#50FA7B;">createServer</span><span style="color:#F8F8F2;">((</span><span style="color:#FFB86C;font-style:italic;">req</span><span style="color:#F8F8F2;">, </span><span style="color:#FFB86C;font-style:italic;">res</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> body </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;&#39;</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F8F8F2;">  req.</span><span style="color:#50FA7B;">on</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">data</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, (</span><span style="color:#FFB86C;font-style:italic;">chunk</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">    body </span><span style="color:#FF79C6;">+=</span><span style="color:#F8F8F2;"> chunk;</span></span>
<span class="line"><span style="color:#F8F8F2;">  });</span></span>
<span class="line"><span style="color:#F8F8F2;">  req.</span><span style="color:#50FA7B;">on</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">end</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">    console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(body);</span></span>
<span class="line"><span style="color:#F8F8F2;">    res.</span><span style="color:#50FA7B;">end</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">ok</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">  });</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">server.</span><span style="color:#50FA7B;">listen</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">9000</span><span style="color:#F8F8F2;">, () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">server start...</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"></span></code></pre></div><p>get 请求的请求体一般是空的，post 请求体会有值。可以使用一个 form 表单模拟 post 请求，这样前面打印的 body 结果就是类似<code>username=zgh&amp;password=123</code></p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">form</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">action</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">http://127.0.0.1:9000</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">method</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">post</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">  &lt;</span><span style="color:#FF79C6;">input</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">type</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">text</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">name</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">username</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> /&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">  &lt;</span><span style="color:#FF79C6;">input</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">type</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">password</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">name</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">password</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> /&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">  &lt;</span><span style="color:#FF79C6;">input</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">type</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">submit</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">value</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">提交</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> /&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">&lt;/</span><span style="color:#FF79C6;">form</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="获取请求路径和查询参数" tabindex="-1">获取请求路径和查询参数 <a class="header-anchor" href="#获取请求路径和查询参数" aria-label="Permalink to &quot;获取请求路径和查询参数&quot;">​</a></h2><p>假设请求路径为：<code>http://127.0.0.1:9000/list?page=1&amp;size=10</code></p><p>方式一、引入 url 模块解析</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> http </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">require</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">http</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> url </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">require</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">url</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> server </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> http.</span><span style="color:#50FA7B;">createServer</span><span style="color:#F8F8F2;">((</span><span style="color:#FFB86C;font-style:italic;">req</span><span style="color:#F8F8F2;">, </span><span style="color:#FFB86C;font-style:italic;">res</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">// 如果不加第二个参数true，那么结果是字符串 query: &#39;page=1&amp;size=10&#39;，设置为true之后就解析为对象了</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> parsedUrl </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> url.</span><span style="color:#50FA7B;">parse</span><span style="color:#F8F8F2;">(req.url, </span><span style="color:#BD93F9;">true</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(parsedUrl);</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(parsedUrl.pathname); </span><span style="color:#6272A4;">// 获取路径</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">({ page</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> parsedUrl.query.page, size</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> parsedUrl.query.size }); </span><span style="color:#6272A4;">// { page: &#39;1&#39;, size: &#39;10&#39; }</span></span>
<span class="line"><span style="color:#F8F8F2;">  res.</span><span style="color:#50FA7B;">end</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">ok</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">server.</span><span style="color:#50FA7B;">listen</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">9000</span><span style="color:#F8F8F2;">, () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">server start...</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"></span></code></pre></div><p>parsedUrl 的打印结果如下：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">{</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">protocol</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">slashes</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">auth</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">host</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">port</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">hostname</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">hash</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">search</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;?page=</span><span style="color:#BD93F9;">1</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&amp;size=</span><span style="color:#BD93F9;">10</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">query</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> [</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">Object:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">prototype</span><span style="color:#F8F8F2;">] { </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">page</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#BD93F9;">1</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#F8F8F2;">, </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">size</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#BD93F9;">10</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#F8F8F2;"> },</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">pathname</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;/list&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">path</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;/list?page=</span><span style="color:#BD93F9;">1</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&amp;size=</span><span style="color:#BD93F9;">10</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">href</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;/list?page=</span><span style="color:#BD93F9;">1</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&amp;size=</span><span style="color:#BD93F9;">10</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span></code></pre></div><p>方式二、通过 new URL()解析</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> http </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">require</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">http</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> server </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> http.</span><span style="color:#50FA7B;">createServer</span><span style="color:#F8F8F2;">((</span><span style="color:#FFB86C;font-style:italic;">req</span><span style="color:#F8F8F2;">, </span><span style="color:#FFB86C;font-style:italic;">res</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> url </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-weight:bold;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">URL</span><span style="color:#F8F8F2;">(req.url, </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">http://127.0.0.1:9000</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(url);</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(url.pathname); </span><span style="color:#6272A4;">// /list</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(url.searchParams); </span><span style="color:#6272A4;">// URLSearchParams { &#39;page&#39; =&gt; &#39;1&#39;, &#39;size&#39; =&gt; &#39;10&#39; }</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(url.searchParams.</span><span style="color:#50FA7B;">get</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">page</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">)); </span><span style="color:#6272A4;">// 1</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(url.searchParams.</span><span style="color:#50FA7B;">get</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">size</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">)); </span><span style="color:#6272A4;">// 10</span></span>
<span class="line"><span style="color:#F8F8F2;">  res.</span><span style="color:#50FA7B;">end</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">ok</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">server.</span><span style="color:#50FA7B;">listen</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">9000</span><span style="color:#F8F8F2;">, () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">server start...</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">);</span></span>
<span class="line"><span style="color:#F8F8F2;">});</span></span>
<span class="line"></span></code></pre></div><p>url 的打印结果如下：</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">{</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">href</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;http:</span><span style="color:#6272A4;">//127.0.0.1:9000/list?page=1&amp;size=10&#39;,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">origin:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;http:</span><span style="color:#6272A4;">//127.0.0.1:9000&#39;,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">protocol:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;http:&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">username</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">password</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">host</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#BD93F9;">127.0</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">.</span><span style="color:#BD93F9;">0.1</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">:</span><span style="color:#BD93F9;">9000</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">hostname</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#BD93F9;">127.0</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">.</span><span style="color:#BD93F9;">0.1</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">port</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#BD93F9;">9000</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">pathname</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;/list&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">search</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;?page=</span><span style="color:#BD93F9;">1</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&amp;size=</span><span style="color:#BD93F9;">10</span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">searchParams</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">URLSearchParams</span><span style="color:#F8F8F2;"> { </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;page&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">=&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;1&#39;,</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;size&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">=&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;10&#39;</span><span style="color:#F8F8F2;"> },</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">hash</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF5555;font-style:italic;text-decoration:underline;">&#39;&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span></code></pre></div>`,16),e=[p];function t(F,c,r,y,i,d){return a(),n("div",null,e)}const f=s(o,[["render",t]]);export{C as __pageData,f as default};
