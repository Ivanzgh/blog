import{_ as s,c as n,o as a,Q as l}from"./chunks/framework.f14b72c3.js";const d=JSON.parse('{"title":"策略模式","description":"","frontmatter":{},"headers":[],"relativePath":"base/design-pattern/strategy.md","lastUpdated":1698246525000}'),p={name:"base/design-pattern/strategy.md"},o=l(`<h1 id="策略模式" tabindex="-1">策略模式 <a class="header-anchor" href="#策略模式" aria-label="Permalink to &quot;策略模式&quot;">​</a></h1><p>策略模式（Strategy Pattern），定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换</p><p>一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。 第二个部分是环境类 Context，Context 接受客户的请求，随后把请求委托给某一个策略类。</p><p>示例：假如我投资股票，看看涨了几个点</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki dracula"><code><span class="line"><span style="color:#FF79C6;">class</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;">A</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">sum</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;font-style:italic;">num</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> num </span><span style="color:#FF79C6;">*</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">0.9</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#FF79C6;">class</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;">B</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">sum</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;font-style:italic;">num</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> num </span><span style="color:#FF79C6;">*</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">0.6</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#FF79C6;">class</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;">C</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">sum</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;font-style:italic;">num</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> num </span><span style="color:#FF79C6;">*</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">0.3</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">class</span><span style="color:#F8F8F2;"> </span><span style="color:#8BE9FD;">S</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">constructor</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.base </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.model </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">null</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">setBase</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;font-style:italic;">x</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.base </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> x</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">setModel</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;font-style:italic;">m</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.model </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> m</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#50FA7B;">getSum</span><span style="color:#F8F8F2;">() {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.model.</span><span style="color:#50FA7B;">sum</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;font-style:italic;">this</span><span style="color:#F8F8F2;">.base) </span><span style="color:#6272A4;">// 将请求委托给某一个策略类</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> obj6 </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;font-weight:bold;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">S</span><span style="color:#F8F8F2;">()</span></span>
<span class="line"><span style="color:#F8F8F2;">obj6.</span><span style="color:#50FA7B;">setBase</span><span style="color:#F8F8F2;">(</span><span style="color:#BD93F9;">10000</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">obj6.</span><span style="color:#50FA7B;">setModel</span><span style="color:#F8F8F2;">(</span><span style="color:#FF79C6;font-weight:bold;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">A</span><span style="color:#F8F8F2;">()) </span><span style="color:#6272A4;">// 设置策略对象</span></span>
<span class="line"><span style="color:#F8F8F2;">obj6.</span><span style="color:#50FA7B;">getSum</span><span style="color:#F8F8F2;">() </span><span style="color:#6272A4;">// 赚了9000</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F8F8F2;">obj6.</span><span style="color:#50FA7B;">setModel</span><span style="color:#F8F8F2;">(</span><span style="color:#FF79C6;font-weight:bold;">new</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">B</span><span style="color:#F8F8F2;">())</span></span>
<span class="line"><span style="color:#F8F8F2;">obj6.</span><span style="color:#50FA7B;">getSum</span><span style="color:#F8F8F2;">() </span><span style="color:#6272A4;">// 赚了6000</span></span>
<span class="line"></span></code></pre></div><p>A、B、C 都是策略类，S 是环境类 Context</p>`,6),F=[o];function e(t,c,r,y,i,B){return a(),n("div",null,F)}const u=s(p,[["render",e]]);export{d as __pageData,u as default};
