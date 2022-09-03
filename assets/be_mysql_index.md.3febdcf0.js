import{_ as s,c as a,o as n,a as l}from"./app.38368cd2.js";const m=JSON.parse('{"title":"Mysql","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5","link":"#\u5B89\u88C5","children":[]},{"level":2,"title":"\u521D\u59CB\u5316","slug":"\u521D\u59CB\u5316","link":"#\u521D\u59CB\u5316","children":[]},{"level":2,"title":"\u914D\u7F6E\u6587\u4EF6","slug":"\u914D\u7F6E\u6587\u4EF6","link":"#\u914D\u7F6E\u6587\u4EF6","children":[]},{"level":2,"title":"Navicat Premium \u5BFC\u5165 sql \u6587\u4EF6","slug":"navicat-premium-\u5BFC\u5165-sql-\u6587\u4EF6","link":"#navicat-premium-\u5BFC\u5165-sql-\u6587\u4EF6","children":[]},{"level":2,"title":"\u5E38\u89C1\u95EE\u9898","slug":"\u5E38\u89C1\u95EE\u9898","link":"#\u5E38\u89C1\u95EE\u9898","children":[{"level":3,"title":"\u5B89\u88C5\u670D\u52A1\u65F6\u62A5\u9519\uFF1A\u65E0\u6CD5\u542F\u52A8\u6B64\u7A0B\u5E8F\uFF0C\u56E0\u4E3A\u8BA1\u7B97\u673A\u4E22\u5931 MSVCP120.dll","slug":"\u5B89\u88C5\u670D\u52A1\u65F6\u62A5\u9519\uFF1A\u65E0\u6CD5\u542F\u52A8\u6B64\u7A0B\u5E8F\uFF0C\u56E0\u4E3A\u8BA1\u7B97\u673A\u4E22\u5931-msvcp120-dll","link":"#\u5B89\u88C5\u670D\u52A1\u65F6\u62A5\u9519\uFF1A\u65E0\u6CD5\u542F\u52A8\u6B64\u7A0B\u5E8F\uFF0C\u56E0\u4E3A\u8BA1\u7B97\u673A\u4E22\u5931-msvcp120-dll","children":[]},{"level":3,"title":"mysql \u4E0D\u5141\u8BB8\u5916\u90E8\u4E3B\u673A\u8FDE\u63A5\u89E3\u51B3\u65B9\u6CD5","slug":"mysql-\u4E0D\u5141\u8BB8\u5916\u90E8\u4E3B\u673A\u8FDE\u63A5\u89E3\u51B3\u65B9\u6CD5","link":"#mysql-\u4E0D\u5141\u8BB8\u5916\u90E8\u4E3B\u673A\u8FDE\u63A5\u89E3\u51B3\u65B9\u6CD5","children":[]}]}],"relativePath":"be/mysql/index.md","lastUpdated":1662180954000}'),e={name:"be/mysql/index.md"},p=l(`<h1 id="mysql" tabindex="-1">Mysql <a class="header-anchor" href="#mysql" aria-hidden="true">#</a></h1><h2 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h2><p>\u6700\u65B0\u7248\uFF1A<a href="https://dev.mysql.com/downloads/mysql/" target="_blank" rel="noreferrer">https://dev.mysql.com/downloads/mysql/</a></p><p>\u9009\u62E9\u7248\u672C\uFF1A<a href="https://downloads.mysql.com/archives/community/" target="_blank" rel="noreferrer">https://downloads.mysql.com/archives/community/</a></p><h2 id="\u521D\u59CB\u5316" tabindex="-1">\u521D\u59CB\u5316 <a class="header-anchor" href="#\u521D\u59CB\u5316" aria-hidden="true">#</a></h2><p>\u9996\u5148\u6253\u5F00 cmd \u8FDB\u5165 mysql \u7684 bin \u76EE\u5F55\u4E0B\uFF0C\u5B89\u88C5\u670D\u52A1</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#F8F8F2;">mysqld --install</span></span>
<span class="line"></span></code></pre></div><p>\u63A5\u7740\u521D\u59CB\u5316 mysql\uFF0C\u5728\u6700\u540E\u4E00\u884C\u4F1A\u4EA7\u751F\u4E00\u4E2A\u968F\u673A\u5BC6\u7801\uFF0C\u8981\u8BB0\u4F4F\u540E\u9762\u767B\u5F55\u8981\u7528</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#F8F8F2;">mysqld --initialize --console</span></span>
<span class="line"></span></code></pre></div><p>\u7136\u540E\u5F00\u542F mysql \u670D\u52A1</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#F8F8F2;">net start mysql</span></span>
<span class="line"></span></code></pre></div><blockquote><p>\u5173\u95ED\u670D\u52A1 net stop mysql</p></blockquote><p>\u767B\u5F55\u9A8C\u8BC1</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#F8F8F2;">mysql -u root -p</span></span>
<span class="line"></span></code></pre></div><p>\u4FEE\u6539\u5BC6\u7801</p><div class="language-sh"><button class="copy"></button><span class="lang">sh</span><pre><code><span class="line"><span style="color:#8BE9FD;">set</span><span style="color:#F8F8F2;"> password </span><span style="color:#FF79C6;">for</span><span style="color:#F8F8F2;"> root@localhost=password(</span><span style="color:#E9F284;">&quot;</span><span style="color:#F1FA8C;">\u81EA\u5DF1\u9700\u8981\u8BBE\u7F6E\u7684\u5BC6\u7801</span><span style="color:#E9F284;">&quot;</span><span style="color:#F8F8F2;">)</span><span style="color:#FF79C6;">;</span></span>
<span class="line"></span></code></pre></div><p>\u8F93\u5165<code>exit</code>\u9000\u51FA\u767B\u5F55\uFF0C\u4F7F\u7528\u65B0\u5BC6\u7801\u767B\u5F55</p><h2 id="\u914D\u7F6E\u6587\u4EF6" tabindex="-1">\u914D\u7F6E\u6587\u4EF6 <a class="header-anchor" href="#\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a></h2><p>\u5728 mysql \u76EE\u5F55\u4E0B\u65B0\u5EFA\u4E00\u4E2A<code>my.ini</code>\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u52A0\u5165\u4EE5\u4E0B\u5185\u5BB9\uFF0C\u6CE8\u610F\u5B89\u88C5\u76EE\u5F55\u548C\u6570\u636E\u5B58\u653E\u76EE\u5F55\u8981\u4FEE\u6539</p><div class="language-ini"><button class="copy"></button><span class="lang">ini</span><pre><code><span class="line"><span style="color:#F8F8F2;">[mysql]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;"># \u8BBE\u7F6Emysql\u5BA2\u6237\u7AEF\u9ED8\u8BA4\u5B57\u7B26\u96C6</span></span>
<span class="line"><span style="color:#FF79C6;">default-character-set=</span><span style="color:#F8F8F2;">utf8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">[mysqld]</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;">#\u8BBE\u7F6E3306\u7AEF\u53E3</span></span>
<span class="line"><span style="color:#FF79C6;">port</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> 3306</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;"># \u8BBE\u7F6Emysql\u7684\u5B89\u88C5\u76EE\u5F55</span></span>
<span class="line"><span style="color:#FF79C6;">basedir=</span><span style="color:#F8F8F2;">C:\\mysql-5.7.30-winx64</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;"># \u8BBE\u7F6Emysql\u6570\u636E\u5E93\u7684\u6570\u636E\u7684\u5B58\u653E\u76EE\u5F55</span></span>
<span class="line"><span style="color:#FF79C6;">datadir=</span><span style="color:#F8F8F2;">C:\\mysql-5.7.30-winx64\\data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;"># \u5141\u8BB8\u6700\u5927\u8FDE\u63A5\u6570</span></span>
<span class="line"><span style="color:#FF79C6;">max_connections=</span><span style="color:#F8F8F2;">200</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;"># \u670D\u52A1\u7AEF\u4F7F\u7528\u7684\u5B57\u7B26\u96C6\u9ED8\u8BA4\u4E3A8\u6BD4\u7279\u7F16\u7801\u7684latin1\u5B57\u7B26\u96C6</span></span>
<span class="line"><span style="color:#FF79C6;">character-set-server=</span><span style="color:#F8F8F2;">utf8</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;"># \u521B\u5EFA\u65B0\u8868\u65F6\u5C06\u4F7F\u7528\u7684\u9ED8\u8BA4\u5B58\u50A8\u5F15\u64CE</span></span>
<span class="line"><span style="color:#FF79C6;">default-storage-engine=</span><span style="color:#F8F8F2;">INNODB</span></span>
<span class="line"></span>
<span class="line"></span></code></pre></div><h2 id="navicat-premium-\u5BFC\u5165-sql-\u6587\u4EF6" tabindex="-1">Navicat Premium \u5BFC\u5165 sql \u6587\u4EF6 <a class="header-anchor" href="#navicat-premium-\u5BFC\u5165-sql-\u6587\u4EF6" aria-hidden="true">#</a></h2><p>\u70B9\u51FB\u8FDE\u63A5\uFF0C\u9009\u62E9\u8981\u8FDE\u63A5\u7684\u6570\u636E\u5E93\u7C7B\u578B\uFF0C\u8FDE\u63A5\u540D\u968F\u610F\u8BBE\u7F6E\uFF0C\u4E3B\u673A\u586B localhost \u6216\u8005\u8FDC\u7A0B\u7684\u5730\u5740\uFF0C\u7AEF\u53E3\u3001\u7528\u6237\u540D\u3001\u5BC6\u7801\u5747\u662F mysql \u8BBE\u7F6E\u7684\uFF0C\u70B9\u51FB\u6D4B\u8BD5\u8FDE\u63A5 <img src="https://cdn.jsdelivr.net/gh/Ivanzgh/ossimg@main/blog/1661154079.png" alt="image"></p><p>\u7136\u540E\u65B0\u5EFA\u4E00\u4E2A\u6570\u636E\u5E93\uFF0C\u5B57\u7B26\u96C6\u9009\u62E9 UTF-8 \u7F16\u7801\uFF0C\u7136\u540E\u53F3\u51FB\u65B0\u5EFA\u7684\u6570\u636E\u5E93\uFF0C\u70B9\u51FB\u8FD0\u884C SQL \u6587\u4EF6\u5373\u53EF</p><h2 id="\u5E38\u89C1\u95EE\u9898" tabindex="-1">\u5E38\u89C1\u95EE\u9898 <a class="header-anchor" href="#\u5E38\u89C1\u95EE\u9898" aria-hidden="true">#</a></h2><h3 id="\u5B89\u88C5\u670D\u52A1\u65F6\u62A5\u9519\uFF1A\u65E0\u6CD5\u542F\u52A8\u6B64\u7A0B\u5E8F\uFF0C\u56E0\u4E3A\u8BA1\u7B97\u673A\u4E22\u5931-msvcp120-dll" tabindex="-1">\u5B89\u88C5\u670D\u52A1\u65F6\u62A5\u9519\uFF1A\u65E0\u6CD5\u542F\u52A8\u6B64\u7A0B\u5E8F\uFF0C\u56E0\u4E3A\u8BA1\u7B97\u673A\u4E22\u5931 MSVCP120.dll <a class="header-anchor" href="#\u5B89\u88C5\u670D\u52A1\u65F6\u62A5\u9519\uFF1A\u65E0\u6CD5\u542F\u52A8\u6B64\u7A0B\u5E8F\uFF0C\u56E0\u4E3A\u8BA1\u7B97\u673A\u4E22\u5931-msvcp120-dll" aria-hidden="true">#</a></h3><p>\u5728\u6267\u884C<code>mysqld --install</code>\u65F6\uFF0C\u82E5\u62A5\u4E22\u5931 MSVCP120.dll \u9519\u8BEF\uFF0C\u662F\u56E0\u4E3A\u6CA1\u6709\u5B89\u88C5<code>vcredist</code>\uFF0C \u5728\u5B98\u7F51<a href="https://www.microsoft.com/zh-CN/download/details.aspx?id=40784" target="_blank" rel="noreferrer">https://www.microsoft.com/zh-CN/download/details.aspx?id=40784</a> \u4E0B\u8F7D\u5B89\u88C5\u5373\u53EF\u3002</p><p>\u5982\u679C\u62A5 MSVCP140.dll \u4E22\u5931\u9519\u8BEF\uFF0C\u4E0B\u8F7D\u5B89\u88C5<a href="https://www.microsoft.com/zh-cn/download/details.aspx?id=48145" target="_blank" rel="noreferrer">https://www.microsoft.com/zh-cn/download/details.aspx?id=48145</a></p><h3 id="mysql-\u4E0D\u5141\u8BB8\u5916\u90E8\u4E3B\u673A\u8FDE\u63A5\u89E3\u51B3\u65B9\u6CD5" tabindex="-1">mysql \u4E0D\u5141\u8BB8\u5916\u90E8\u4E3B\u673A\u8FDE\u63A5\u89E3\u51B3\u65B9\u6CD5 <a class="header-anchor" href="#mysql-\u4E0D\u5141\u8BB8\u5916\u90E8\u4E3B\u673A\u8FDE\u63A5\u89E3\u51B3\u65B9\u6CD5" aria-hidden="true">#</a></h3><p>\u767B\u5F55 mysql \u540E\u4F7F\u7528\u5982\u4E0B\u547D\u4EE4\uFF1A</p><div class="language-ini"><button class="copy"></button><span class="lang">ini</span><pre><code><span class="line"><span style="color:#F8F8F2;">use mysql</span><span style="color:#6272A4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">update user set </span><span style="color:#FF79C6;">host=</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">%</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> where </span><span style="color:#FF79C6;">user=</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">root</span><span style="color:#E9F284;">&#39;</span><span style="color:#6272A4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">select host,user from user</span><span style="color:#6272A4;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">flush privileges</span><span style="color:#6272A4;">;</span></span>
<span class="line"></span></code></pre></div><p><img src="https://cdn.jsdelivr.net/gh/Ivanzgh/ossimg@main/blog/1661154063.png" alt="image"></p>`,31),o=[p];function c(t,r,i,d,F,y){return n(),a("div",null,o)}const u=s(e,[["render",c]]);export{m as __pageData,u as default};