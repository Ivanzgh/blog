import{_ as s,c as a,o as n,Q as l}from"./chunks/framework.f14b72c3.js";const h=JSON.parse('{"title":"Docker","description":"","frontmatter":{},"headers":[],"relativePath":"be/docker.md","lastUpdated":1683514170000}'),o={name:"be/docker.md"},p=l(`<h1 id="docker" tabindex="-1">Docker <a class="header-anchor" href="#docker" aria-label="Permalink to &quot;Docker&quot;">​</a></h1><h2 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h2><p>包含一些 docker 命令和一些 Linux 命令</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">docker </span><span style="color:#F1FA8C;">image</span><span style="color:#F8F8F2;"> </span><span style="color:#F1FA8C;">ls</span><span style="color:#F8F8F2;">   </span><span style="color:#6272A4;">#列出镜像</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">docker </span><span style="color:#F1FA8C;">logs</span><span style="color:#F8F8F2;"> </span><span style="color:#F1FA8C;">es</span><span style="color:#F8F8F2;">   </span><span style="color:#6272A4;">#查看全部es日志</span></span>
<span class="line"><span style="color:#F8F8F2;">docker </span><span style="color:#F1FA8C;">logs</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">-f</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">-t</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">--tail</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">100</span><span style="color:#F8F8F2;"> </span><span style="color:#F1FA8C;">es</span><span style="color:#F8F8F2;">    </span><span style="color:#6272A4;">#从日志末尾显示多少行日志， 默认是all</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">docker </span><span style="color:#F1FA8C;">ps</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">-a</span><span style="color:#F8F8F2;">        </span><span style="color:#6272A4;">#显示所有的容器，包括未运行的</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">docker </span><span style="color:#F1FA8C;">restart</span><span style="color:#F8F8F2;"> </span><span style="color:#F1FA8C;">es</span><span style="color:#F8F8F2;">    </span><span style="color:#6272A4;">#重启es容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">docker </span><span style="color:#F1FA8C;">stop</span><span style="color:#F8F8F2;"> </span><span style="color:#F1FA8C;">es</span><span style="color:#F8F8F2;">    </span><span style="color:#6272A4;">#关闭es容器</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8BE9FD;">pwd</span><span style="color:#F8F8F2;">   </span><span style="color:#6272A4;">#显示工作目录</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">ll    </span><span style="color:#6272A4;">#显示当前目录下的全部子目录</span></span>
<span class="line"></span>
<span class="line"><span style="color:#8BE9FD;">history</span><span style="color:#F8F8F2;"> </span><span style="color:#6272A4;">#查看命令的历史记录</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">free </span><span style="color:#BD93F9;">-h</span><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">#查看内存</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><p>编辑文件使用<code>vim</code>，比如编辑 es 配置文件<code>elasticsearch.yml</code>，</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula"><code><span class="line"><span style="color:#F8F8F2;">vim </span><span style="color:#F1FA8C;">elasticsearch.yml</span></span>
<span class="line"></span></code></pre></div><p>点击<code>insert</code>键开始编辑，编辑完成后点击<code>Ecs</code>键，输入<code>:wq</code>保存退出。<code>:q</code>退出不保存，<code>:wq!</code>强制保存退出</p>`,7),e=[p];function c(t,F,r,y,i,d){return n(),a("div",null,e)}const A=s(o,[["render",c]]);export{h as __pageData,A as default};
