import{_ as s,c as a,o as n,a as e}from"./app.fb0475dd.js";const h=JSON.parse('{"title":"Docker","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5E38\u7528\u547D\u4EE4","slug":"\u5E38\u7528\u547D\u4EE4","link":"#\u5E38\u7528\u547D\u4EE4","children":[]}],"relativePath":"be/docker/index.md","lastUpdated":1677460466000}'),l={name:"be/docker/index.md"},p=e(`<h1 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-hidden="true">#</a></h1><h2 id="\u5E38\u7528\u547D\u4EE4" tabindex="-1">\u5E38\u7528\u547D\u4EE4 <a class="header-anchor" href="#\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a></h2><p>\u5305\u542B\u4E00\u4E9B docker \u547D\u4EE4\u548C\u4E00\u4E9B Linux \u547D\u4EE4</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#F8F8F2;">docker image ls   </span><span style="color:#6272A4;">#\u5217\u51FA\u955C\u50CF</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">docker logs es   </span><span style="color:#6272A4;">#\u67E5\u770B\u5168\u90E8es\u65E5\u5FD7</span></span>
<span class="line"><span style="color:#F8F8F2;">docker logs -f -t --tail 100 es    </span><span style="color:#6272A4;">#\u4ECE\u65E5\u5FD7\u672B\u5C3E\u663E\u793A\u591A\u5C11\u884C\u65E5\u5FD7\uFF0C \u9ED8\u8BA4\u662Fall</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">docker ps -a        </span><span style="color:#6272A4;">#\u663E\u793A\u6240\u6709\u7684\u5BB9\u5668\uFF0C\u5305\u62EC\u672A\u8FD0\u884C\u7684</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">docker restart es    </span><span style="color:#6272A4;">#\u91CD\u542Fes\u5BB9\u5668</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">docker stop es    </span><span style="color:#6272A4;">#\u5173\u95EDes\u5BB9\u5668</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8BE9FD;">pwd</span><span style="color:#F8F8F2;">   </span><span style="color:#6272A4;">#\u663E\u793A\u5DE5\u4F5C\u76EE\u5F55</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">ll    </span><span style="color:#6272A4;">#\u663E\u793A\u5F53\u524D\u76EE\u5F55\u4E0B\u7684\u5168\u90E8\u5B50\u76EE\u5F55</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8BE9FD;">history</span><span style="color:#F8F8F2;"> </span><span style="color:#6272A4;">#\u67E5\u770B\u547D\u4EE4\u7684\u5386\u53F2\u8BB0\u5F55</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">free -h  </span><span style="color:#6272A4;">#\u67E5\u770B\u5185\u5B58</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>\u7F16\u8F91\u6587\u4EF6\u4F7F\u7528<code>vim</code>\uFF0C\u6BD4\u5982\u7F16\u8F91 es \u914D\u7F6E\u6587\u4EF6<code>elasticsearch.yml</code>\uFF0C</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#F8F8F2;">vim elasticsearch.yml</span></span>
<span class="line"></span></code></pre></div><p>\u70B9\u51FB<code>insert</code>\u952E\u5F00\u59CB\u7F16\u8F91\uFF0C\u7F16\u8F91\u5B8C\u6210\u540E\u70B9\u51FB<code>Ecs</code>\u952E\uFF0C\u8F93\u5165<code>:wq</code>\u4FDD\u5B58\u9000\u51FA\u3002<code>:q</code>\u9000\u51FA\u4E0D\u4FDD\u5B58\uFF0C<code>:wq!</code>\u5F3A\u5236\u4FDD\u5B58\u9000\u51FA</p>`,7),c=[p];function o(t,r,d,i,F,y){return n(),a("div",null,c)}const k=s(l,[["render",o]]);export{h as __pageData,k as default};
