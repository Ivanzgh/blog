import{_ as s,c as a,o as n,a as l}from"./app.819cc36e.js";const g=JSON.parse('{"title":"\u6D4F\u89C8\u5668\u517C\u5BB9\u6027\u95EE\u9898","description":"","frontmatter":{},"headers":[{"level":2,"title":"hack \u53CA IE \u6761\u4EF6\u6CE8\u91CA","slug":"hack-\u53CA-ie-\u6761\u4EF6\u6CE8\u91CA"},{"level":2,"title":"\u517C\u5BB9\u6027\u63D2\u4EF6","slug":"\u517C\u5BB9\u6027\u63D2\u4EF6"},{"level":3,"title":"Normalize.css","slug":"normalize-css"},{"level":3,"title":"html5shiv.js","slug":"html5shiv-js"},{"level":3,"title":"respond.js","slug":"respond-js"},{"level":3,"title":"picturefill.js","slug":"picturefill-js"}],"relativePath":"fe/browser/compatibility.md","lastUpdated":1659926988000}'),p={name:"fe/browser/compatibility.md"},e=l(`<h1 id="\u6D4F\u89C8\u5668\u517C\u5BB9\u6027\u95EE\u9898" tabindex="-1">\u6D4F\u89C8\u5668\u517C\u5BB9\u6027\u95EE\u9898 <a class="header-anchor" href="#\u6D4F\u89C8\u5668\u517C\u5BB9\u6027\u95EE\u9898" aria-hidden="true">#</a></h1><h2 id="hack-\u53CA-ie-\u6761\u4EF6\u6CE8\u91CA" tabindex="-1">hack \u53CA IE \u6761\u4EF6\u6CE8\u91CA <a class="header-anchor" href="#hack-\u53CA-ie-\u6761\u4EF6\u6CE8\u91CA" aria-hidden="true">#</a></h2><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#6272A4;">&lt;!--[if IE]&gt;</span></span>
<span class="line"><span style="color:#6272A4;">  \u6B64\u5904\u6587\u5B57\u80FD\u591F\u5728IE\u6D4F\u89C8\u5668\u4E0B\u663E\u793A\uFF0C\u5176\u5B83\u6D4F\u89C8\u5668\u4E0D\u663E\u793A</span></span>
<span class="line"><span style="color:#6272A4;">&lt;![endif]--&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#6272A4;">&lt;!--[if !IE]&gt;&lt;!--&gt;</span></span>
<span class="line"><span style="color:#F8F8F2;">\u6B64\u5904\u6587\u5B57\u80FD\u591F\u5728\u975EIE\u6D4F\u89C8\u5668\u4E0B\u663E\u793A\uFF0CIE\u6D4F\u89C8\u5668\u4E0D\u663E\u793A</span></span>
<span class="line"><span style="color:#6272A4;">&lt;!--&lt;![endif]--&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#6272A4;">&lt;!--[if IE 6]&gt;</span></span>
<span class="line"><span style="color:#6272A4;">  \u8FD9\u6BB5\u6587\u5B57\u53EA\u5728IE6\u6D4F\u89C8\u5668\u663E\u793A</span></span>
<span class="line"><span style="color:#6272A4;">&lt;![endif]--&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#6272A4;">&lt;!--[if gte IE 6]&gt;</span></span>
<span class="line"><span style="color:#6272A4;">  \u8FD9\u6BB5\u6587\u5B57\u53EA\u5728IE6\u4EE5\u4E0A(\u5305\u62EC)\u7248\u672CIE\u6D4F\u89C8\u5668\u663E\u793A</span></span>
<span class="line"><span style="color:#6272A4;">&lt;![endif]--&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#6272A4;">&lt;!--[if ! IE 8]&gt;</span></span>
<span class="line"><span style="color:#6272A4;">  \u8FD9\u6BB5\u6587\u5B57\u5728\u975EIE8\u6D4F\u89C8\u5668\u663E\u793A</span></span>
<span class="line"><span style="color:#6272A4;">&lt;![endif]--&gt;</span></span>
<span class="line"></span></code></pre></div><p>gt : greater than\uFF0C\u5927\u4E8E</p><p>lt : less than\uFF0C\u5C0F\u4E8E</p><p>gte : greater than or equal\uFF0C\u5927\u4E8E\u7B49\u4E8E</p><p>lte : less than or equal\uFF0C\u5C0F\u4E8E\u7B49\u4E8E</p><p>! : \u9009\u62E9\u6761\u4EF6\u7248\u672C\u4EE5\u5916\u6240\u6709\u7248\u672C\uFF0C\u65E0\u8BBA\u9AD8\u4F4E</p><h2 id="\u517C\u5BB9\u6027\u63D2\u4EF6" tabindex="-1">\u517C\u5BB9\u6027\u63D2\u4EF6 <a class="header-anchor" href="#\u517C\u5BB9\u6027\u63D2\u4EF6" aria-hidden="true">#</a></h2><h3 id="normalize-css" tabindex="-1">Normalize.css <a class="header-anchor" href="#normalize-css" aria-hidden="true">#</a></h3><p>\u4E0D\u540C\u7684\u6D4F\u89C8\u5668\u7684\u9ED8\u8BA4\u6837\u5F0F\u5B58\u5728\u5DEE\u5F02\uFF0C\u53EF\u4EE5\u4F7F\u7528<code>normalize.css</code>\u521D\u59CB\u5316\u6837\u5F0F\u5E93\u3002</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">link</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">href</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">https://cdn.bootcss.com/normalize/7.0.0/normalize.min.css</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">rel</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">stylesheet</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;"> /&gt;</span></span>
<span class="line"></span></code></pre></div><p>\u7B80\u5355\u7C97\u66B4\u6CD5\uFF1A</p><div class="language-css"><span class="copy"></span><pre><code><span class="line"><span style="color:#FF79C6;">*</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#8BE9FD;">margin</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#8BE9FD;">padding</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">;</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="html5shiv-js" tabindex="-1">html5shiv.js <a class="header-anchor" href="#html5shiv-js" aria-hidden="true">#</a></h3><p>\u89E3\u51B3 IE9 \u4EE5\u4E0B\u6D4F\u89C8\u5668\u5BF9 HTML5 \u65B0\u589E\u6807\u7B7E\u4E0D\u8BC6\u522B\u7684\u95EE\u9898\u3002</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#6272A4;">&lt;!--[if lt IE 9]&gt;</span></span>
<span class="line"><span style="color:#6272A4;">  &lt;script</span></span>
<span class="line"><span style="color:#6272A4;">    type=&quot;text/javascript&quot;</span></span>
<span class="line"><span style="color:#6272A4;">    src=&quot;https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js&quot;</span></span>
<span class="line"><span style="color:#6272A4;">  &gt;&lt;/script&gt;</span></span>
<span class="line"><span style="color:#6272A4;">&lt;![endif]--&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="respond-js" tabindex="-1">respond.js <a class="header-anchor" href="#respond-js" aria-hidden="true">#</a></h3><p>\u89E3\u51B3 IE9 \u4EE5\u4E0B\u4E0D\u652F\u6301 CSS3 \u5A92\u4F53\u67E5\u8BE2\u7684\u95EE\u9898\u3002</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">script</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">src</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">&gt;&lt;/</span><span style="color:#FF79C6;">script</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="picturefill-js" tabindex="-1">picturefill.js <a class="header-anchor" href="#picturefill-js" aria-hidden="true">#</a></h3><p>\u89E3\u51B3 IE 9 10 11 \u7B49\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 <code>&lt;picture&gt;</code> \u6807\u7B7E\u7684\u95EE\u9898</p><div class="language-html"><span class="copy"></span><pre><code><span class="line"><span style="color:#F8F8F2;">&lt;</span><span style="color:#FF79C6;">script</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;font-style:italic;">src</span><span style="color:#FF79C6;">=</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">https://cdn.bootcss.com/picturefill/3.0.3/picturefill.min.js</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">&gt;&lt;/</span><span style="color:#FF79C6;">script</span><span style="color:#F8F8F2;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,27),t=[e];function o(c,r,i,d,F,y){return n(),a("div",null,t)}var u=s(p,[["render",o]]);export{g as __pageData,u as default};
