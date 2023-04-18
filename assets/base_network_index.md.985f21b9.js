import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.f14b72c3.js";const u=JSON.parse('{"title":"计算机网络","description":"","frontmatter":{},"headers":[],"relativePath":"base/network/index.md","lastUpdated":1681829744000}'),p={name:"base/network/index.md"},o=l(`<h1 id="计算机网络" tabindex="-1">计算机网络 <a class="header-anchor" href="#计算机网络" aria-label="Permalink to &quot;计算机网络&quot;">​</a></h1><h2 id="osi-的七层协议" tabindex="-1">OSI 的七层协议 <a class="header-anchor" href="#osi-的七层协议" aria-label="Permalink to &quot;OSI 的七层协议&quot;">​</a></h2><p>从上到下依次是：</p><ul><li>应用层</li><li>表示层</li><li>会话层</li><li>运输层</li><li>网络层</li><li>数据链路层</li><li>物理层</li></ul><h2 id="状态码" tabindex="-1">状态码 <a class="header-anchor" href="#状态码" aria-label="Permalink to &quot;状态码&quot;">​</a></h2><p>状态码由 3 位数字组成，第一个数字定义了响应的类别，且有 5 种可能的取值：</p><ul><li>1xx：指示信息–表示请求已接收，继续处理。</li><li>2xx：成功–表示请求已被成功接收、理解、接受。</li></ul><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula"><code><span class="line"><span style="color:#BD93F9;">204</span><span style="color:#F8F8F2;"> No Content 成功，但不返回任何实体的主体部分；</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BD93F9;">206</span><span style="color:#F8F8F2;"> Partial Content 成功执行了一个范围（Range）请求</span></span>
<span class="line"></span></code></pre></div><ul><li>3xx：重定向–要完成请求必须进行更进一步的操作。</li></ul><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula"><code><span class="line"><span style="color:#BD93F9;">301</span><span style="color:#F8F8F2;"> Moved Permanently 永久性重定向，响应报文的Location首部应该有该资源的新URL</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BD93F9;">302</span><span style="color:#F8F8F2;"> Found 临时性重定向，响应报文的Location首部给出的URL用来临时定位资源</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BD93F9;">303</span><span style="color:#F8F8F2;"> See Other 请求的资源存在着另一个URI，客户端应使用GET方法定向获取请求的资源</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BD93F9;">304</span><span style="color:#F8F8F2;"> Not Modified 服务器内容没有更新，可以直接读取浏览器缓存</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BD93F9;">307</span><span style="color:#F8F8F2;"> Temporary Redirect 临时重定向。</span></span>
<span class="line"></span></code></pre></div><ul><li>4xx：客户端错误–请求有语法错误或请求无法实现。</li></ul><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula"><code><span class="line"><span style="color:#BD93F9;">400</span><span style="color:#F8F8F2;"> Bad Request 表示客户端请求有语法错误，不能被服务器所理解</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BD93F9;">401</span><span style="color:#F8F8F2;"> Unauthonzed 表示请求未经授权，该状态代码必须与 WWW-Authenticate 报头域一起使用</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BD93F9;">403</span><span style="color:#F8F8F2;"> Forbidden 表示服务器收到请求，但是拒绝提供服务，通常会在响应正文中给出不提供服务的原因</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BD93F9;">404</span><span style="color:#F8F8F2;"> Not Found 请求的资源不存在，例如，输入了错误的URL</span></span>
<span class="line"></span></code></pre></div><ul><li>5xx：服务器端错误–服务器未能实现合法的请求。</li></ul><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki dracula"><code><span class="line"><span style="color:#BD93F9;">500</span><span style="color:#F8F8F2;"> Internel Server Error 表示服务器发生不可预期的错误，导致无法完成客户端的请求</span></span>
<span class="line"></span>
<span class="line"><span style="color:#BD93F9;">503</span><span style="color:#F8F8F2;"> Service Unavailable 表示服务器当前不能够处理客户端的请求，在一段时间之后，服务器可能会恢复正常</span></span>
<span class="line"></span></code></pre></div><h2 id="get-和-post" tabindex="-1">GET 和 POST <a class="header-anchor" href="#get-和-post" aria-label="Permalink to &quot;GET 和 POST&quot;">​</a></h2><h2 id="tcp-和-udp" tabindex="-1">TCP 和 UDP <a class="header-anchor" href="#tcp-和-udp" aria-label="Permalink to &quot;TCP 和 UDP&quot;">​</a></h2><h2 id="三次握手、四次挥手" tabindex="-1">三次握手、四次挥手 <a class="header-anchor" href="#三次握手、四次挥手" aria-label="Permalink to &quot;三次握手、四次挥手&quot;">​</a></h2><h2 id="http、https、http2-0" tabindex="-1">HTTP、HTTPS、HTTP2.0 <a class="header-anchor" href="#http、https、http2-0" aria-label="Permalink to &quot;HTTP、HTTPS、HTTP2.0&quot;">​</a></h2><h2 id="dns" tabindex="-1">DNS <a class="header-anchor" href="#dns" aria-label="Permalink to &quot;DNS&quot;">​</a></h2><h2 id="强缓存和协商缓存" tabindex="-1">强缓存和协商缓存 <a class="header-anchor" href="#强缓存和协商缓存" aria-label="Permalink to &quot;强缓存和协商缓存&quot;">​</a></h2><p>浏览器缓存是浏览器对之前请求过的文件进行缓存，以便下一次访问时重复使用，节省带宽，提高访问速度，降低服务器压力</p><p>http 缓存机制主要是在 http 响应头中设定，响应头中相关字段为 Expires、Cache-Control、Last-Modified、Etag</p><h3 id="强缓存" tabindex="-1">强缓存 <a class="header-anchor" href="#强缓存" aria-label="Permalink to &quot;强缓存&quot;">​</a></h3><p>浏览器不会向服务器发送请求，直接从本地缓存中读取文件，并返回<code>Status Code: 200 OK</code>，这里也有两种情况：</p><ul><li><code>form memory cache</code>，从内存读取资源，关闭浏览器后数据就没了</li><li><code>form disk cache</code>，从磁盘读取资源，关闭浏览器后数据仍然存在</li></ul><p>优先访问内存里的缓存、然后是磁盘里的缓存，最后是请求网络资源</p><p>相关的响应头</p><ul><li>Expires 过期时间</li><li>Cache-Control <ul><li>max-age，假如值为3600，表示当前时间后的3600秒内，不向服务器请求新的数据</li><li>no-cache</li><li>no-store，不缓存任何数据</li></ul></li></ul><p>Expires 是 http1.0 规范，是绝对时间，当客户端本地时间和服务器时间不一致时会产生误差，浏览器会向服务器请求新的资源。 Cache-Control 是 http1.1 规范，是相对时间，优先级高于 Expires</p><h3 id="协商缓存" tabindex="-1">协商缓存 <a class="header-anchor" href="#协商缓存" aria-label="Permalink to &quot;协商缓存&quot;">​</a></h3><p>向服务器发送请求，服务器会根据请求头来判断是否命中协商缓存，如果命中则返回 304 状态码并带上新的响应头，通知浏览器从缓存中读取资源， 否则返回新的数据资源</p><h2 id="浏览器输入-url-到页面展现的过程" tabindex="-1">浏览器输入 url 到页面展现的过程 <a class="header-anchor" href="#浏览器输入-url-到页面展现的过程" aria-label="Permalink to &quot;浏览器输入 url 到页面展现的过程&quot;">​</a></h2><h3 id="_1、dns-解析" tabindex="-1">1、DNS 解析 <a class="header-anchor" href="#_1、dns-解析" aria-label="Permalink to &quot;1、DNS 解析&quot;">​</a></h3><p>域名到 IP 地址的转换过程</p><p><img src="https://image-static.segmentfault.com/161/828/1618288278-57f00bf9444dd_articlex" alt="image"></p><p>首先在本地域名服务器中查询 IP 地址，如果没有找到的情况下，本地域名服务器会向根域名服务器发送一个请求， 如果根域名服务器也不存在该域名时，本地域名会向 com 顶级域名服务器发送一个请求，依次类推下去。 直到最后本地域名服务器得到 google 的 IP 地址并把它缓存到本地，供下次查询使用。</p><p>DNS 域名：</p><table><thead><tr><th>名称类型</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td>根域</td><td>DNS 域名中使用时，规定由尾部句点（.）来指定名称位于根或更高级别的域层次结构</td><td>单个句点或句点用于末尾的名称</td></tr><tr><td>顶级域</td><td>用来指示某个国家/地区/组织使用的名称的类型名称</td><td>.com</td></tr><tr><td>第二层域</td><td>个人或组织在 Internet 上使用的注册名称</td><td>baidu.com</td></tr><tr><td>子域</td><td>已注册的二级域名派生的域名，即网站名</td><td>www.baidu.com</td></tr><tr><td>主机名</td><td>通常情况下，DNS 域名的最左侧的标签标识网络上的特定计算机</td><td>h1.www.baidu.com</td></tr></tbody></table><h3 id="_2、tcp-连接" tabindex="-1">2、TCP 连接 <a class="header-anchor" href="#_2、tcp-连接" aria-label="Permalink to &quot;2、TCP 连接&quot;">​</a></h3><h3 id="_3、http-请求" tabindex="-1">3、HTTP 请求 <a class="header-anchor" href="#_3、http-请求" aria-label="Permalink to &quot;3、HTTP 请求&quot;">​</a></h3><h3 id="_4、服务器处理请求并返回-http-报文" tabindex="-1">4、服务器处理请求并返回 HTTP 报文 <a class="header-anchor" href="#_4、服务器处理请求并返回-http-报文" aria-label="Permalink to &quot;4、服务器处理请求并返回 HTTP 报文&quot;">​</a></h3><h3 id="_5、浏览器解析渲染页面" tabindex="-1">5、浏览器解析渲染页面 <a class="header-anchor" href="#_5、浏览器解析渲染页面" aria-label="Permalink to &quot;5、浏览器解析渲染页面&quot;">​</a></h3><p>参考地址：</p><p><a href="https://segmentfault.com/a/1190000006879700" target="_blank" rel="noreferrer">https://segmentfault.com/a/1190000006879700</a></p><p><a href="https://www.cnblogs.com/kongxy/p/4615226.html" target="_blank" rel="noreferrer">https://www.cnblogs.com/kongxy/p/4615226.html</a></p><h2 id="websocket" tabindex="-1">websocket <a class="header-anchor" href="#websocket" aria-label="Permalink to &quot;websocket&quot;">​</a></h2><h3 id="原生-ws" tabindex="-1">原生 ws <a class="header-anchor" href="#原生-ws" aria-label="Permalink to &quot;原生 ws&quot;">​</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> WSURL </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">ws://192.168.8.210:8083</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> ws, tt</span></span>
<span class="line"><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> lockReconnect </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">false</span><span style="color:#F8F8F2;"> </span><span style="color:#6272A4;">//避免重复连接</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> websocket </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">Init</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> (</span><span style="color:#FFB86C;font-style:italic;">url</span><span style="color:#F8F8F2;">, </span><span style="color:#FFB86C;font-style:italic;">messageHandle</span><span style="color:#F8F8F2;">, </span><span style="color:#FFB86C;font-style:italic;">notReConn</span><span style="color:#F8F8F2;">, </span><span style="color:#FFB86C;font-style:italic;">onerror</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">WebSocket</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">in</span><span style="color:#F8F8F2;"> window) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      ws </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-weight:bold;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">WebSocket</span><span style="color:#F8F8F2;">(BaseWs </span><span style="color:#FF79C6;">+</span><span style="color:#F8F8F2;"> url)</span></span>
<span class="line"><span style="color:#F8F8F2;">    } </span><span style="color:#FF79C6;">else</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">      console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">您的浏览器不支持 WebSocket!</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#FF79C6;">return</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">    ws.</span><span style="color:#50FA7B;">onopen</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> () {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#6272A4;">// heartCheck.start();</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#6272A4;">// ws.send(&#39;from client: hello&#39;)</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">    ws.</span><span style="color:#50FA7B;">onmessage</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> (</span><span style="color:#FFB86C;font-style:italic;">e</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#6272A4;">//heartCheck.start()</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (e.data </span><span style="color:#FF79C6;">==</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">ok</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">        </span><span style="color:#6272A4;">//心跳消息不做处理</span></span>
<span class="line"><span style="color:#F8F8F2;">        </span><span style="color:#FF79C6;">return</span></span>
<span class="line"><span style="color:#F8F8F2;">      }</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#6272A4;">// console.log(&#39;from server: &#39; + e.data);</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#50FA7B;">messageHandle</span><span style="color:#F8F8F2;">(e.data)</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">    ws.</span><span style="color:#50FA7B;">onclose</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#6272A4;">// if (onerror) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#6272A4;">//   onerror()</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#6272A4;">// }</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#6272A4;">// if (!notReConn) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#6272A4;">//   reconnect(url, messageHandle)</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#6272A4;">// }</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">    ws.</span><span style="color:#50FA7B;">onerror</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (onerror) {</span></span>
<span class="line"><span style="color:#F8F8F2;">        </span><span style="color:#50FA7B;">onerror</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">      }</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (</span><span style="color:#FF79C6;">!</span><span style="color:#F8F8F2;">notReConn) {</span></span>
<span class="line"><span style="color:#F8F8F2;">        </span><span style="color:#50FA7B;">reconnect</span><span style="color:#F8F8F2;">(url, messageHandle)</span></span>
<span class="line"><span style="color:#F8F8F2;">      }</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> ws</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">toBreakOff</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">    lockReconnect </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">true</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">Send</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> (</span><span style="color:#FFB86C;font-style:italic;">data</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> msg </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">JSON</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">stringify</span><span style="color:#F8F8F2;">(data)</span></span>
<span class="line"><span style="color:#F8F8F2;">    console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">发送消息：</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">+</span><span style="color:#F8F8F2;"> msg)</span></span>
<span class="line"><span style="color:#F8F8F2;">    ws.</span><span style="color:#50FA7B;">send</span><span style="color:#F8F8F2;">(msg)</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">closeWs</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (ws) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      ws.</span><span style="color:#50FA7B;">close</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">getWebSocket</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> ws</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">getStatus</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (ws.readyState </span><span style="color:#FF79C6;">==</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">未连接</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    } </span><span style="color:#FF79C6;">else</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (ws.readyState </span><span style="color:#FF79C6;">==</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">已连接</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    } </span><span style="color:#FF79C6;">else</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (ws.readyState </span><span style="color:#FF79C6;">==</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">2</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">连接正在关闭</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    } </span><span style="color:#FF79C6;">else</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (ws.readyState </span><span style="color:#FF79C6;">==</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">3</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">连接已关闭</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">default</span><span style="color:#F8F8F2;"> websocket</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;">//根据消息标识做不同的处理</span></span>
<span class="line"><span style="color:#6272A4;">// function messageHandle(message) {</span></span>
<span class="line"><span style="color:#6272A4;">//   let msg = JSON.parse(message)</span></span>
<span class="line"><span style="color:#6272A4;">//   switch (msg.flag) {</span></span>
<span class="line"><span style="color:#6272A4;">//     case &#39;command&#39;:</span></span>
<span class="line"><span style="color:#6272A4;">//       console.log(&quot;指令消息类型&quot;)</span></span>
<span class="line"><span style="color:#6272A4;">//       break;</span></span>
<span class="line"><span style="color:#6272A4;">//     case &#39;inform&#39;:</span></span>
<span class="line"><span style="color:#6272A4;">//       console.log(&quot;通知&quot;)</span></span>
<span class="line"><span style="color:#6272A4;">//       break;</span></span>
<span class="line"><span style="color:#6272A4;">//     default:</span></span>
<span class="line"><span style="color:#6272A4;">//       console.log(&quot;未知消息类型&quot;)</span></span>
<span class="line"><span style="color:#6272A4;">//   }</span></span>
<span class="line"><span style="color:#6272A4;">// }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">reconnect</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;font-style:italic;">url</span><span style="color:#F8F8F2;">, </span><span style="color:#FFB86C;font-style:italic;">messageHandle</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (lockReconnect) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">return</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">  lockReconnect </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">true</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">//没连接上会一直重连，设置延迟避免请求过多</span></span>
<span class="line"><span style="color:#F8F8F2;">  tt </span><span style="color:#FF79C6;">&amp;&amp;</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">clearTimeout</span><span style="color:#F8F8F2;">(tt)</span></span>
<span class="line"><span style="color:#F8F8F2;">  tt </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">setTimeout</span><span style="color:#F8F8F2;">(</span><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> () {</span></span>
<span class="line"><span style="color:#F8F8F2;">    console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">执行断线重连...</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">    websocket.</span><span style="color:#50FA7B;">Init</span><span style="color:#F8F8F2;">(url, messageHandle)</span></span>
<span class="line"><span style="color:#F8F8F2;">    lockReconnect </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">false</span></span>
<span class="line"><span style="color:#F8F8F2;">  }, </span><span style="color:#BD93F9;">4000</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;">//心跳检测</span></span>
<span class="line"><span style="color:#6272A4;">// let heartCheck = {</span></span>
<span class="line"><span style="color:#6272A4;">//   timeout: 1000 * 60 * 3,</span></span>
<span class="line"><span style="color:#6272A4;">//   timeoutObj: null,</span></span>
<span class="line"><span style="color:#6272A4;">//   serverTimeoutObj: null,</span></span>
<span class="line"><span style="color:#6272A4;">//   start: function(){</span></span>
<span class="line"><span style="color:#6272A4;">//     console.log(&#39;开始心跳检测&#39;);</span></span>
<span class="line"><span style="color:#6272A4;">//     let self = this;</span></span>
<span class="line"><span style="color:#6272A4;">//     this.timeoutObj &amp;&amp; clearTimeout(this.timeoutObj);</span></span>
<span class="line"><span style="color:#6272A4;">//     this.serverTimeoutObj &amp;&amp; clearTimeout(this.serverTimeoutObj);</span></span>
<span class="line"><span style="color:#6272A4;">//     this.timeoutObj = setTimeout(function(){</span></span>
<span class="line"><span style="color:#6272A4;">//       //这里发送一个心跳，后端收到后，返回一个心跳消息，</span></span>
<span class="line"><span style="color:#6272A4;">//       //onmessage拿到返回的心跳就说明连接正常</span></span>
<span class="line"><span style="color:#6272A4;">//       console.log(&#39;心跳检测...&#39;);</span></span>
<span class="line"><span style="color:#6272A4;">//       ws.send(&quot;HeartBeat:&quot;+ clientId );</span></span>
<span class="line"><span style="color:#6272A4;">//       self.serverTimeoutObj = setTimeout(function() {</span></span>
<span class="line"><span style="color:#6272A4;">//         if(ws.readyState!=1){</span></span>
<span class="line"><span style="color:#6272A4;">//            ws.close();</span></span>
<span class="line"><span style="color:#6272A4;">//         }</span></span>
<span class="line"><span style="color:#6272A4;">//         // createWebSocket();</span></span>
<span class="line"><span style="color:#6272A4;">//       }, self.timeout);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;">//     }, this.timeout)</span></span>
<span class="line"><span style="color:#6272A4;">//   }</span></span>
<span class="line"><span style="color:#6272A4;">// }</span></span>
<span class="line"></span></code></pre></div><p>在 vue 中使用如下：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">default</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">data</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">      msg</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">      ws</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">      isDestroyed</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">false</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">  methods</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#50FA7B;">init</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.ws </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> webSocket.</span><span style="color:#50FA7B;">Init</span><span style="color:#F8F8F2;">(</span><span style="color:#F1FA8C;">\`/ship/detail/</span><span style="color:#FF79C6;">\${</span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.mmsi</span><span style="color:#FF79C6;">}</span><span style="color:#F1FA8C;">\`</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.messageHandle, </span><span style="color:#BD93F9;">true</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.onerror)</span></span>
<span class="line"><span style="color:#F8F8F2;">    },</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#50FA7B;">messageHandle</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;font-style:italic;">message</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.msg </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">JSON</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">parse</span><span style="color:#F8F8F2;">(message)</span></span>
<span class="line"><span style="color:#F8F8F2;">    },</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#50FA7B;">onerror</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (</span><span style="color:#FF79C6;">!</span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.isDestroyed) {</span></span>
<span class="line"><span style="color:#F8F8F2;">        </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.$notification.</span><span style="color:#50FA7B;">open</span><span style="color:#F8F8F2;">({</span></span>
<span class="line"><span style="color:#F8F8F2;">          message</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">提示</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">          description</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">webSocket连接出错，请重新加载页面</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">          </span><span style="color:#50FA7B;">btn</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> (</span><span style="color:#FFB86C;font-style:italic;">h</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">            </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">h</span><span style="color:#F8F8F2;">(</span></span>
<span class="line"><span style="color:#F8F8F2;">              </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">a-button</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">,</span></span>
<span class="line"><span style="color:#F8F8F2;">              { props</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> { type</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">primary</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">, size</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">small</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> }, on</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> { </span><span style="color:#50FA7B;">click</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.$router.</span><span style="color:#50FA7B;">go</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">) } },</span></span>
<span class="line"><span style="color:#F8F8F2;">              </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">重新载入</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#F8F8F2;">            )</span></span>
<span class="line"><span style="color:#F8F8F2;">          },</span></span>
<span class="line"><span style="color:#F8F8F2;">          onClose</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> close</span></span>
<span class="line"><span style="color:#F8F8F2;">        })</span></span>
<span class="line"><span style="color:#F8F8F2;">      }</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">mounted</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">init</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">  },</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">destroyed</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.isDestroyed </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">true</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (Object.</span><span style="color:#50FA7B;">keys</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.ws).length </span><span style="color:#FF79C6;">!=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.ws.</span><span style="color:#50FA7B;">close</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="sockjs-和-stomp" tabindex="-1">SockJS 和 Stomp <a class="header-anchor" href="#sockjs-和-stomp" aria-label="Permalink to &quot;SockJS 和 Stomp&quot;">​</a></h3><p><a href="http://jmesnil.net/stomp-websocket/doc/" target="_blank" rel="noreferrer">stomp-websocket</a></p><p>SockJS 是设计在浏览器中使用的，支持三种方式传输数据：WebSocket，HTTP Streaming，HTTP 长轮询</p><p>当 SockJS 发送 GET /info 请求的时候，服务端需要决定使用哪种传输格式，首先会检查 WebSocket，如果不行则使用 HTTP Streaming， 如果还是不行就使用 HTTP 的长轮询</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">import</span><span style="color:#F8F8F2;"> SockJS </span><span style="color:#FF79C6;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">sockjs-client</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#FF79C6;">import</span><span style="color:#F8F8F2;"> Stomp </span><span style="color:#FF79C6;">from</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">stompjs</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> stompClient</span></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> WSURL </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">ws://192.168.8.210:8083</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> token </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">jifodsjaoifjsf12345</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> serialNo </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">s12345</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> uuid </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">ffsdfjsdlkaf</span><span style="color:#E9F284;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">connectMonitorWs</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> socket </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-weight:bold;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">SockJS</span><span style="color:#F8F8F2;">(WSURL </span><span style="color:#FF79C6;">+</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">?token=</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">+</span><span style="color:#F8F8F2;"> token, </span><span style="color:#E9F284;">&#39;&#39;</span><span style="color:#F8F8F2;">, { timeout</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">10000</span><span style="color:#F8F8F2;"> })</span></span>
<span class="line"><span style="color:#F8F8F2;">  stompClient </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> Stomp.</span><span style="color:#50FA7B;">over</span><span style="color:#F8F8F2;">(socket)</span></span>
<span class="line"><span style="color:#F8F8F2;">  stompClient.</span><span style="color:#50FA7B;">connect</span><span style="color:#F8F8F2;">(</span></span>
<span class="line"><span style="color:#F8F8F2;">    { serialNo</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> serialNo },</span></span>
<span class="line"><span style="color:#F8F8F2;">    () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#50FA7B;">successCallback</span><span style="color:#F8F8F2;">(serialNo, uuid)</span></span>
<span class="line"><span style="color:#F8F8F2;">    },</span></span>
<span class="line"><span style="color:#F8F8F2;">    () </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#50FA7B;">setTimeout</span><span style="color:#F8F8F2;">(() </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">        </span><span style="color:#50FA7B;">connectMonitorWs</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">      }, </span><span style="color:#BD93F9;">5000</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">  )</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">successCallback</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;font-style:italic;">serialNo</span><span style="color:#F8F8F2;">, </span><span style="color:#FFB86C;font-style:italic;">uuid</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">// 获取客户端连接编号</span></span>
<span class="line"><span style="color:#F8F8F2;">  stompClient.</span><span style="color:#50FA7B;">send</span><span style="color:#F8F8F2;">(</span><span style="color:#F1FA8C;">\`/app/monitor/client/code/</span><span style="color:#FF79C6;">\${</span><span style="color:#F8F8F2;">serialNo</span><span style="color:#FF79C6;">}</span><span style="color:#F1FA8C;">\`</span><span style="color:#F8F8F2;">, { </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">content-type</span><span style="color:#E9F284;">&#39;</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">text/plain</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> }, uuid)</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">// 客户端连接编号下发</span></span>
<span class="line"><span style="color:#F8F8F2;">  stompClient.</span><span style="color:#50FA7B;">subscribe</span><span style="color:#F8F8F2;">(</span><span style="color:#F1FA8C;">\`/topic/monitor/client/code/</span><span style="color:#FF79C6;">\${</span><span style="color:#F8F8F2;">serialNo</span><span style="color:#FF79C6;">}</span><span style="color:#F1FA8C;">/</span><span style="color:#FF79C6;">\${</span><span style="color:#F8F8F2;">uuid</span><span style="color:#FF79C6;">}</span><span style="color:#F1FA8C;">\`</span><span style="color:#F8F8F2;">, (</span><span style="color:#FFB86C;font-style:italic;">msg</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> data </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">JSON</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">parse</span><span style="color:#F8F8F2;">(msg.body)</span></span>
<span class="line"><span style="color:#F8F8F2;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">// 申请主控制</span></span>
<span class="line"><span style="color:#F8F8F2;">  stompClient.</span><span style="color:#50FA7B;">send</span><span style="color:#F8F8F2;">(</span><span style="color:#F1FA8C;">\`/app/monitor/main/control/</span><span style="color:#FF79C6;">\${</span><span style="color:#F8F8F2;">serialNo</span><span style="color:#FF79C6;">}</span><span style="color:#F1FA8C;">\`</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">// 主控制信号下发</span></span>
<span class="line"><span style="color:#F8F8F2;">  stompClient.</span><span style="color:#50FA7B;">subscribe</span><span style="color:#F8F8F2;">(</span><span style="color:#F1FA8C;">\`/topic/monitor/control/</span><span style="color:#FF79C6;">\${</span><span style="color:#F8F8F2;">serialNo</span><span style="color:#FF79C6;">}</span><span style="color:#F1FA8C;">\`</span><span style="color:#F8F8F2;">, (</span><span style="color:#FFB86C;font-style:italic;">msg</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> data </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> msg.body</span></span>
<span class="line"><span style="color:#F8F8F2;">    console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(data)</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#6272A4;">// 如果自己的客户端的连接编号和主控制端的连接编号一致，那么自己就是主控制端</span></span>
<span class="line"><span style="color:#F8F8F2;">  })</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#6272A4;">// 实时快照下发</span></span>
<span class="line"><span style="color:#F8F8F2;">  stompClient.</span><span style="color:#50FA7B;">subscribe</span><span style="color:#F8F8F2;">(</span><span style="color:#F1FA8C;">\`/topic/monitor/live/snapshot/</span><span style="color:#FF79C6;">\${</span><span style="color:#F8F8F2;">serialNo</span><span style="color:#FF79C6;">}</span><span style="color:#F1FA8C;">\`</span><span style="color:#F8F8F2;">, (</span><span style="color:#FFB86C;font-style:italic;">msg</span><span style="color:#F8F8F2;">) </span><span style="color:#FF79C6;">=&gt;</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> data </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">JSON</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">parse</span><span style="color:#F8F8F2;">(msg.body)</span></span>
<span class="line"><span style="color:#F8F8F2;">    console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(data)</span></span>
<span class="line"><span style="color:#F8F8F2;">  })</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;">// 更新图片状态</span></span>
<span class="line"><span style="color:#FF79C6;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">updateImage</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;font-style:italic;">serialNo</span><span style="color:#F8F8F2;">, </span><span style="color:#FFB86C;font-style:italic;">params</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">  stompClient.</span><span style="color:#50FA7B;">send</span><span style="color:#F8F8F2;">(</span><span style="color:#F1FA8C;">\`/app/monitor/image/status/</span><span style="color:#FF79C6;">\${</span><span style="color:#F8F8F2;">serialNo</span><span style="color:#FF79C6;">}</span><span style="color:#F1FA8C;">\`</span><span style="color:#F8F8F2;">, {}, </span><span style="color:#BD93F9;">JSON</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">stringify</span><span style="color:#F8F8F2;">(params))</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;">// 取消订阅</span></span>
<span class="line"><span style="color:#FF79C6;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">pauseSubscribe</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (stompClient) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    stompClient.</span><span style="color:#50FA7B;">unsubscribe</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6272A4;">// 销毁ws连接</span></span>
<span class="line"><span style="color:#FF79C6;">export</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">disconnect</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (stompClient) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    stompClient.</span><span style="color:#50FA7B;">disconnect</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span></code></pre></div>`,55),F=[o];function e(t,c,r,y,i,C){return a(),n("div",null,F)}const h=s(p,[["render",e]]);export{u as __pageData,h as default};
