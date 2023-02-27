import{_ as s,c as n,o as a,a as l}from"./app.fb0475dd.js";const u=JSON.parse('{"title":"JSON","description":"","frontmatter":{},"headers":[{"level":2,"title":"json \u8F6C\u5316\u4E3A\u6570\u7EC4","slug":"json-\u8F6C\u5316\u4E3A\u6570\u7EC4","link":"#json-\u8F6C\u5316\u4E3A\u6570\u7EC4","children":[]},{"level":2,"title":"\u683C\u5F0F\u5316 JSON \u4EE3\u7801","slug":"\u683C\u5F0F\u5316-json-\u4EE3\u7801","link":"#\u683C\u5F0F\u5316-json-\u4EE3\u7801","children":[]},{"level":2,"title":"\u901A\u8FC7 key \u83B7\u53D6 value","slug":"\u901A\u8FC7-key-\u83B7\u53D6-value","link":"#\u901A\u8FC7-key-\u83B7\u53D6-value","children":[{"level":3,"title":"\u76F4\u63A5\u83B7\u53D6","slug":"\u76F4\u63A5\u83B7\u53D6","link":"#\u76F4\u63A5\u83B7\u53D6","children":[]},{"level":3,"title":"eval()","slug":"eval","link":"#eval","children":[]},{"level":3,"title":"\u904D\u5386 json \u83B7\u53D6\u5176\u5C5E\u6027","slug":"\u904D\u5386-json-\u83B7\u53D6\u5176\u5C5E\u6027","link":"#\u904D\u5386-json-\u83B7\u53D6\u5176\u5C5E\u6027","children":[]}]}],"relativePath":"fe/base/js-json.md","lastUpdated":1677460466000}'),p={name:"fe/base/js-json.md"},o=l(`<h1 id="json" tabindex="-1">JSON <a class="header-anchor" href="#json" aria-hidden="true">#</a></h1><h2 id="json-\u8F6C\u5316\u4E3A\u6570\u7EC4" tabindex="-1">json \u8F6C\u5316\u4E3A\u6570\u7EC4 <a class="header-anchor" href="#json-\u8F6C\u5316\u4E3A\u6570\u7EC4" aria-hidden="true">#</a></h2><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">jsonToArray</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;">obj</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> r </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> { key</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> [], value</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> [] }</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">for</span><span style="color:#F8F8F2;"> (</span><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> k </span><span style="color:#FF79C6;">in</span><span style="color:#F8F8F2;"> obj) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (</span><span style="color:#FF79C6;">!</span><span style="color:#F8F8F2;">obj.</span><span style="color:#50FA7B;">hasOwnProperty</span><span style="color:#F8F8F2;">(k)) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#FF79C6;">continue</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">    r.key.</span><span style="color:#50FA7B;">push</span><span style="color:#F8F8F2;">(k)</span></span>
<span class="line"><span style="color:#F8F8F2;">    r.value.</span><span style="color:#50FA7B;">push</span><span style="color:#F8F8F2;">(obj[k])</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> r</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> json </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> { a</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">, b</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">2</span><span style="color:#F8F8F2;">, c</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">3</span><span style="color:#F8F8F2;">, d</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">4</span><span style="color:#F8F8F2;">, e</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">5</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> arrJson </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">jsonToArray</span><span style="color:#F8F8F2;">(json)</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(arrJson)</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">key:</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">+</span><span style="color:#F8F8F2;"> arrJson.key[</span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">]) </span><span style="color:#6272A4;">//key:a</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">value:</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">+</span><span style="color:#F8F8F2;"> arrJson.value[</span><span style="color:#BD93F9;">0</span><span style="color:#F8F8F2;">]) </span><span style="color:#6272A4;">//value:1</span></span>
<span class="line"><span style="color:#F8F8F2;">console.</span><span style="color:#50FA7B;">log</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">keylen:</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">+</span><span style="color:#F8F8F2;"> arrJson.key.length) </span><span style="color:#6272A4;">//keylen:5</span></span>
<span class="line"></span></code></pre></div><p><code>hasOwnProperty</code>\u8868\u793A\u662F\u5426\u6709\u81EA\u5DF1\u7684\u5C5E\u6027\u3002\u8FD9\u4E2A\u65B9\u6CD5\u4F1A\u67E5\u627E\u4E00\u4E2A\u5BF9\u8C61\u662F\u5426\u6709\u67D0\u4E2A\u5C5E\u6027\uFF0C\u4F46\u662F\u4E0D\u4F1A\u53BB\u67E5\u627E\u5B83\u7684\u539F\u578B\u94FE\u3002</p><h2 id="\u683C\u5F0F\u5316-json-\u4EE3\u7801" tabindex="-1">\u683C\u5F0F\u5316 JSON \u4EE3\u7801 <a class="header-anchor" href="#\u683C\u5F0F\u5316-json-\u4EE3\u7801" aria-hidden="true">#</a></h2><p><code>JSON.stringify()</code> \u4E0D\u4EC5\u53EF\u4EE5\u7B80\u5355\u5730\u5C06\u5BF9\u8C61\u8F6C\u5316\u4E3A\u5B57\u7B26\u4E32\uFF0C\u4E5F\u53EF\u4EE5\u7528\u5B83\u6765\u683C\u5F0F\u5316 JSON \u8F93\u51FA</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> obj </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> {</span></span>
<span class="line"><span style="color:#F8F8F2;">  foo</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> { bar</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> [</span><span style="color:#BD93F9;">11</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">22</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">33</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">44</span><span style="color:#F8F8F2;">], baz</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> { bing</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">true</span><span style="color:#F8F8F2;">, boom</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">Hello</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> } }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#6272A4;">// The third parameter is the number of spaces used to</span></span>
<span class="line"><span style="color:#6272A4;">// beautify the JSON output.</span></span>
<span class="line"><span style="color:#BD93F9;">JSON</span><span style="color:#F8F8F2;">.</span><span style="color:#50FA7B;">stringify</span><span style="color:#F8F8F2;">(obj, </span><span style="color:#BD93F9;">null</span><span style="color:#F8F8F2;">, </span><span style="color:#BD93F9;">4</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"><span style="color:#6272A4;">// &quot;{</span></span>
<span class="line"><span style="color:#6272A4;">//     &quot;foo&quot;: {</span></span>
<span class="line"><span style="color:#6272A4;">//         &quot;bar&quot;: [</span></span>
<span class="line"><span style="color:#6272A4;">//             11,</span></span>
<span class="line"><span style="color:#6272A4;">//             22,</span></span>
<span class="line"><span style="color:#6272A4;">//             33,</span></span>
<span class="line"><span style="color:#6272A4;">//             44</span></span>
<span class="line"><span style="color:#6272A4;">//         ],</span></span>
<span class="line"><span style="color:#6272A4;">//         &quot;baz&quot;: {</span></span>
<span class="line"><span style="color:#6272A4;">//             &quot;bing&quot;: true,</span></span>
<span class="line"><span style="color:#6272A4;">//             &quot;boom&quot;: &quot;Hello&quot;</span></span>
<span class="line"><span style="color:#6272A4;">//         }</span></span>
<span class="line"><span style="color:#6272A4;">//     }</span></span>
<span class="line"><span style="color:#6272A4;">// }&quot;</span></span>
<span class="line"></span></code></pre></div><p>JSON.parse()\u80FD\u5C06 json \u683C\u5F0F\u7684\u5B57\u7B26\u4E32\u8F6C\u5316\u4E3A json \u5BF9\u8C61</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>JSON.parse()\u548C JSON.stringify()\u652F\u6301 IE8 \u53CA\u5176\u4EE5\u4E0A\u7248\u672C</p></div><h2 id="\u901A\u8FC7-key-\u83B7\u53D6-value" tabindex="-1">\u901A\u8FC7 key \u83B7\u53D6 value <a class="header-anchor" href="#\u901A\u8FC7-key-\u83B7\u53D6-value" aria-hidden="true">#</a></h2><h3 id="\u76F4\u63A5\u83B7\u53D6" tabindex="-1">\u76F4\u63A5\u83B7\u53D6 <a class="header-anchor" href="#\u76F4\u63A5\u83B7\u53D6" aria-hidden="true">#</a></h3><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">getJson</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;">key</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> json </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> { a</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">, b</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">2</span><span style="color:#F8F8F2;">, c</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">3</span><span style="color:#F8F8F2;">, d</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">4</span><span style="color:#F8F8F2;">, e</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">5</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> json[key]</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#50FA7B;">getJson</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">a</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">) </span><span style="color:#6272A4;">// 1</span></span>
<span class="line"></span></code></pre></div><h3 id="eval" tabindex="-1">eval() <a class="header-anchor" href="#eval" aria-hidden="true">#</a></h3><p><code>eval()</code>\u51FD\u6570\u53EF\u8BA1\u7B97\u67D0\u4E2A\u5B57\u7B26\u4E32\uFF0C\u5E76\u6267\u884C\u5176\u4E2D\u7684\u7684 js \u4EE3\u7801</p><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">getJson</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;">key</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> json </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> { a</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">, b</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">2</span><span style="color:#F8F8F2;">, c</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">3</span><span style="color:#F8F8F2;">, d</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">4</span><span style="color:#F8F8F2;">, e</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">5</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">eval</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">json.</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;"> </span><span style="color:#FF79C6;">+</span><span style="color:#F8F8F2;"> key)</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#50FA7B;">getJson</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">a</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">) </span><span style="color:#6272A4;">// 1</span></span>
<span class="line"></span></code></pre></div><h3 id="\u904D\u5386-json-\u83B7\u53D6\u5176\u5C5E\u6027" tabindex="-1">\u904D\u5386 json \u83B7\u53D6\u5176\u5C5E\u6027 <a class="header-anchor" href="#\u904D\u5386-json-\u83B7\u53D6\u5176\u5C5E\u6027" aria-hidden="true">#</a></h3><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#FF79C6;">function</span><span style="color:#F8F8F2;"> </span><span style="color:#50FA7B;">getJson</span><span style="color:#F8F8F2;">(</span><span style="color:#FFB86C;">key</span><span style="color:#F8F8F2;">) {</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">const</span><span style="color:#F8F8F2;"> json </span><span style="color:#FF79C6;">=</span><span style="color:#F8F8F2;"> { a</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">1</span><span style="color:#F8F8F2;">, b</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">2</span><span style="color:#F8F8F2;">, c</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">3</span><span style="color:#F8F8F2;">, d</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">4</span><span style="color:#F8F8F2;">, e</span><span style="color:#FF79C6;">:</span><span style="color:#F8F8F2;"> </span><span style="color:#BD93F9;">5</span><span style="color:#F8F8F2;"> }</span></span>
<span class="line"><span style="color:#F8F8F2;">  </span><span style="color:#FF79C6;">for</span><span style="color:#F8F8F2;"> (</span><span style="color:#FF79C6;">let</span><span style="color:#F8F8F2;"> i </span><span style="color:#FF79C6;">in</span><span style="color:#F8F8F2;"> json) {</span></span>
<span class="line"><span style="color:#F8F8F2;">    </span><span style="color:#FF79C6;">if</span><span style="color:#F8F8F2;"> (i </span><span style="color:#FF79C6;">===</span><span style="color:#F8F8F2;"> key) {</span></span>
<span class="line"><span style="color:#F8F8F2;">      </span><span style="color:#FF79C6;">return</span><span style="color:#F8F8F2;"> json[i] </span><span style="color:#6272A4;">// 1</span></span>
<span class="line"><span style="color:#F8F8F2;">    }</span></span>
<span class="line"><span style="color:#F8F8F2;">  }</span></span>
<span class="line"><span style="color:#F8F8F2;">}</span></span>
<span class="line"><span style="color:#50FA7B;">getJson</span><span style="color:#F8F8F2;">(</span><span style="color:#E9F284;">&#39;</span><span style="color:#F1FA8C;">a</span><span style="color:#E9F284;">&#39;</span><span style="color:#F8F8F2;">)</span></span>
<span class="line"></span></code></pre></div>`,17),F=[o];function e(c,t,r,y,i,d){return a(),n("div",null,F)}const h=s(p,[["render",e]]);export{u as __pageData,h as default};