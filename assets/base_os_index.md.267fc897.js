import{_ as t,c as e,o as l,Q as n}from"./chunks/framework.f14b72c3.js";const y=JSON.parse('{"title":"操作系统","description":"","frontmatter":{},"headers":[],"relativePath":"base/os/index.md","lastUpdated":1684684556000}'),a={name:"base/os/index.md"},r=n('<h1 id="操作系统" tabindex="-1">操作系统 <a class="header-anchor" href="#操作系统" aria-label="Permalink to &quot;操作系统&quot;">​</a></h1><h2 id="进程、线程" tabindex="-1">进程、线程 <a class="header-anchor" href="#进程、线程" aria-label="Permalink to &quot;进程、线程&quot;">​</a></h2><p><strong>进程是系统进行资源分配和调度的基本单位</strong>，特征：动态性、并发性、异步性、独立性</p><p><strong>线程是 <code>CPU</code> 调度和分派的基本单位</strong>，线程是进程的子任务</p><p>区别：</p><ul><li>一个线程只属于一个进程，一个进程可以有多个线程</li><li>进程是资源分配的最小单位，线程是<code>CPU</code>调度的最小单位</li><li>进程在执行过程中有独立的内存单元，而多个线程共享进程的内存</li><li>在创建、销毁、切换中，系统付出的时空开销，进程远大于线程</li></ul><p>为了使参与并发执行的每个程序（含数据）都能独立地运行，在操作系统中必须为其配置一个专门的数据结构，称为<strong>进程控制块</strong>（Process Control Block, PCB）。 系统利用 <code>PCB</code> 来描述进程的基本情况和活动过程，进而控制和管理进程。由程序段、相关的数据段和 <code>PCB</code> 便构成了<strong>进程实体</strong>，简称进程</p><p>为什么要引入进程和线程的概念？</p><ul><li>为了能使程序并发执行，以提高资源利用率和系统吞吐量，并且可以对并发执行的程序加以描述和控制，引入了进程的概念</li><li>引入线程是为了减少程序在并发执行时所付出的时空开销，使<code>OS</code>具有更好的并发性</li></ul><h2 id="同步、异步" tabindex="-1">同步、异步 <a class="header-anchor" href="#同步、异步" aria-label="Permalink to &quot;同步、异步&quot;">​</a></h2><h2 id="进制" tabindex="-1">进制 <a class="header-anchor" href="#进制" aria-label="Permalink to &quot;进制&quot;">​</a></h2><table><thead><tr><th style="text-align:center;">进制</th><th style="text-align:center;">基数</th><th style="text-align:center;">权值</th><th style="text-align:center;">数值表示</th></tr></thead><tbody><tr><td style="text-align:center;">二进制</td><td style="text-align:center;">2</td><td style="text-align:center;">2 的幂次方</td><td style="text-align:center;">0 和 1，通常以 0b 或 0B 前缀标识</td></tr><tr><td style="text-align:center;">八进制</td><td style="text-align:center;">8</td><td style="text-align:center;">8 的幂次方</td><td style="text-align:center;">0~7，通常以 0 开头</td></tr><tr><td style="text-align:center;">十进制</td><td style="text-align:center;">10</td><td style="text-align:center;">10 的幂次方</td><td style="text-align:center;">0~9</td></tr><tr><td style="text-align:center;">十六进制</td><td style="text-align:center;">16</td><td style="text-align:center;">16 的幂次方</td><td style="text-align:center;">0~9 和 A~F（表示十进制数 10~15），通常以 0x 或 0X 开头</td></tr></tbody></table><p>下面是各进制之间的换算方式：</p><ol><li><p><strong>十进制转换为其他进制</strong>：采用除基取余法，将十进制数不断除以对应进制的基数，直到商为 0，将余数倒序排列即可得到对应进制的数。若是转为十六进制，则 10 到 15 分别用字母 A 到 F 表示</p></li><li><p><strong>其他进制转换为十进制</strong>：从右往左数，将每一位上的数值乘以对应进制的幂次方，再将结果相加即可得到十进制数。</p></li></ol><p>如将二进制 1010 转为十进制：<code>(0 * 2^0) + (1 * 2^1) + (0 * 2^2) + (1 * 2^3) = 0 + 2 + 0 + 8 = 10</code>，即将二进制数的每一位乘以 2 的对应幂次方，并将结果相加。</p><ol start="3"><li><p>八进制和二进制之间的转换：将八进制数每一位转换为对应的三位二进制数，或将三位二进制数转换为对应的一位八进制数。</p></li><li><p>十六进制和二进制之间的转换：将十六进制数每一位转换为对应的四位二进制数，或将四位二进制数转换为对应的一位十六进制数。</p></li><li><p>十六进制和八进制之间的转换：先将十六进制数转换为二进制数，再将二进制数每三位转换为对应的一位八进制数，或将八进制数每一位转换为对应的三位二进制数，再将二进制数转换为十六进制数</p></li></ol><p>示例：将十进制数 500 转为对应进制</p><table><thead><tr><th style="text-align:center;">进制</th><th style="text-align:center;">结果</th></tr></thead><tbody><tr><td style="text-align:center;">2</td><td style="text-align:center;">111110100</td></tr><tr><td style="text-align:center;">8</td><td style="text-align:center;">764</td></tr><tr><td style="text-align:center;">10</td><td style="text-align:center;">500</td></tr><tr><td style="text-align:center;">16</td><td style="text-align:center;">1f4</td></tr></tbody></table>',18),d=[r];function i(s,o,c,g,h,x){return l(),e("div",null,d)}const _=t(a,[["render",i]]);export{y as __pageData,_ as default};
