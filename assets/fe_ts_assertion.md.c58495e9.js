import{_ as s,c as a,o as n,Q as l}from"./chunks/framework.f14b72c3.js";const u=JSON.parse('{"title":"断言","description":"","frontmatter":{},"headers":[],"relativePath":"fe/ts/assertion.md","lastUpdated":1695604450000}'),p={name:"fe/ts/assertion.md"},o=l(`<h1 id="断言" tabindex="-1">断言 <a class="header-anchor" href="#断言" aria-label="Permalink to &quot;断言&quot;">​</a></h1><h2 id="类型断言" tabindex="-1">类型断言 <a class="header-anchor" href="#类型断言" aria-label="Permalink to &quot;类型断言&quot;">​</a></h2><p>类型断言就是告诉编译器你比它更懂这个类型，让它别报错，知道自己在干啥。</p><p>有尖括号<code>&lt;&gt;</code>语法和<code>as</code>语法两种，类似类型转换，不进行特殊的数据检查和解构。没有运行时的影响，只在编译阶段起作用。</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> str1</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">any</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">typescript</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> res1 </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> &lt;</span><span style="color:#8BE9FD;font-style:italic;">string</span><span style="color:#F8F8F2;">&gt;str1</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(res1) </span><span style="color:#6272A4;">// &#39;typescript&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> res2</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">number</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> (&lt;</span><span style="color:#8BE9FD;font-style:italic;">string</span><span style="color:#F8F8F2;">&gt;str1).length</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(res2) </span><span style="color:#6272A4;">// 10</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> str2</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">any</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">typescript</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> res3</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">number</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> (str2 </span><span style="color:#FF79C6;">as</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">string</span><span style="color:#F8F8F2;">).length</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(res3) </span><span style="color:#6272A4;">// 10</span></span>
<span class="line"></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的，尖括号会和 JSX 语法产生歧义</p></div><p>在 typescript 中，如下代码是会报错的，因为<code>obj</code>类型检测就是一个空对象，不能添加其他属性</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> obj </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> {}</span></span>
<span class="line"><span style="color:#F8F8F2;">obj.name </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">zgh</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">obj.age </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">23</span></span>
<span class="line"></span></code></pre></div><p>使用类型断言后可以了</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">interface</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">User</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  name</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">string</span></span>
<span class="line"><span style="color:#F8F8F2;">  age</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">number</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> user </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> {} </span><span style="color:#FF79C6;">as</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;font-style:italic;">User</span></span>
<span class="line"><span style="color:#F8F8F2;">user.name </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">zgh</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">user.age </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">23</span></span>
<span class="line"></span></code></pre></div>`,10),e=[o];function t(F,c,r,y,i,d){return n(),a("div",null,e)}const g=s(p,[["render",t]]);export{u as __pageData,g as default};