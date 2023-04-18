import{_ as s,c as a,o as n,Q as o}from"./chunks/framework.f14b72c3.js";const _=JSON.parse('{"title":"tsconfig.json","description":"","frontmatter":{},"headers":[],"relativePath":"fe/ts/config.md","lastUpdated":1681829744000}'),t={name:"fe/ts/config.md"},l=o(`<h1 id="tsconfig-json" tabindex="-1">tsconfig.json <a class="header-anchor" href="#tsconfig-json" aria-label="Permalink to &quot;tsconfig.json&quot;">​</a></h1><p><code>tsconfig.json</code>文件是用来配置如何编译 ts 文件的，一般在项目的根目录下，使用下方命令可生成</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">tsc </span><span style="color:#BD93F9;">--init</span></span>
<span class="line"></span></code></pre></div><h2 id="选择编译文件" tabindex="-1">选择编译文件 <a class="header-anchor" href="#选择编译文件" aria-label="Permalink to &quot;选择编译文件&quot;">​</a></h2><p>默认是编译所有 ts 文件</p><p><code>include</code>表示包含哪些要编译的文件，<code>exclude</code>表示不包含哪些文件，二者都可使用通配符</p><p><code>files</code>指定一个包含相对或绝对文件路径的列表</p><div class="language-json"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">{</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#8BE9FE;">&quot;</span><span style="color:#8BE9FD;">include</span><span style="color:#8BE9FE;">&quot;</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> [</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">bar.ts</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">],</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">//   &quot;include&quot;: [&quot;src/**/*&quot;],</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">//   &quot;exclude&quot;: [&quot;bar.ts&quot;],</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">//   &quot;files&quot;: [&quot;foo.ts&quot;, &quot;bar.ts&quot;],</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#8BE9FE;">&quot;</span><span style="color:#8BE9FD;">compilerOptions</span><span style="color:#8BE9FE;">&quot;</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> {}</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>文件名称只能用双引号，用单引号会报错</p></div>`,9),e=[l];function p(c,r,i,F,d,u){return n(),a("div",null,e)}const q=s(t,[["render",p]]);export{_ as __pageData,q as default};