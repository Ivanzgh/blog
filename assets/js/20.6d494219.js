(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{416:function(t,a,s){"use strict";s.r(a);var n=s(21),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基础"}},[t._v("#")]),t._v(" 基础")]),t._v(" "),s("h2",{attrs:{id:"安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),s("p",[t._v("地址： "),s("a",{attrs:{href:"http://nginx.org/en/download.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://nginx.org/en/download.html"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"image",width:"800",height:"500","data-src":"/blog/img/be/nginx_download.png",loading:"lazy"}})]),t._v(" "),s("p",[t._v("Mainline version：最新版本")]),t._v(" "),s("p",[t._v("Stable version：稳定版，生产环境上建议使用这个版本")]),t._v(" "),s("p",[t._v("Legacy versions：历史版本")]),t._v(" "),s("h2",{attrs:{id:"介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),s("p",[t._v("Nginx 就是反向代理服务器。")]),t._v(" "),s("p",[t._v("代理服务器一般是指局域网内部的机器通过代理服务发送请求到互联网上的服务器，代理服务器一般作用于客户端。")]),t._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"image","data-src":"/blog/img/be/nginx1.png",loading:"lazy"}})]),t._v(" "),s("p",[t._v("简单的说：")]),t._v(" "),s("p",[t._v("正向代理：客户端知道服务器端，通过代理端连接服务器端。代理端代理的是服务器端。")]),t._v(" "),s("p",[t._v("反向代理：服务器端知道客户端，客户端不知道服务器端，通过代理端连接服务器端。代理端代理的是客户端，代理对象刚好相反，所以叫反向代理。")]),t._v(" "),s("h2",{attrs:{id:"命令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#命令"}},[t._v("#")]),t._v(" 命令")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 重新加载资源")]),t._v("\nnginx -s reload \n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 重启")]),t._v("\nnginx -s reopen\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 停止")]),t._v("\nnginx -s stop\n")])])]),s("h2",{attrs:{id:"设置-windows-下-nginx-开机自启"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设置-windows-下-nginx-开机自启"}},[t._v("#")]),t._v(" 设置 windows 下 nginx 开机自启")]),t._v(" "),s("p",[t._v("首先下载 "),s("code",[t._v("winsw")]),t._v(" 工具")]),t._v(" "),s("p",[t._v("地址："),s("a",{attrs:{href:"http://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/"),s("OutboundLink")],1),s("br"),t._v("\n例如下载 "),s("code",[t._v("V2.9.0")]),t._v(" 则选择 "),s("code",[t._v("winsw-2.9.0-net4.exe")])]),t._v(" "),s("p",[t._v("或者 "),s("a",{attrs:{href:"https://github.com/winsw/winsw/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/winsw/winsw/releases"),s("OutboundLink")],1),t._v(" ，选择 "),s("code",[t._v("WinSW.NET4.exe")]),t._v(" 表示 64 位")]),t._v(" "),s("p",[t._v("将下载的 "),s("code",[t._v("winsw")]),t._v(" 移动到 nginx 的安装目录,并将 "),s("code",[t._v("winsw")]),t._v(" 工具改名为 "),s("code",[t._v("nginx-service.exe")])]),t._v(" "),s("p",[t._v("然后在 nginx 安装目录下新建文件 "),s("code",[t._v("nginx-service.xml")]),t._v("，"),s("code",[t._v("logpath")]),t._v(" 标签里设置 Nginx 的安装位置")]),t._v(" "),s("div",{staticClass:"language-xml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-xml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("service")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("nginx"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("nginx"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("description")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("nginx"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("description")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("logpath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("D:\\nginx-1.19.0"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("logpath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("logmode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("roll"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("logmode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("depend")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("depend")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("executable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("D:\\nginx-1.19.0\\nginx.exe"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("executable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("stopexecutable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("D:\\nginx-1.19.0\\nginx.exe -s stop"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("stopexecutable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("service")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("打开 "),s("code",[t._v("cmd")]),t._v("，进入 Nginx 安装目录，输入 "),s("code",[t._v("nginx-service.exe install")]),t._v(" ，将其注册为 Windows 服务。")]),t._v(" "),s("p",[t._v("然后运行 "),s("code",[t._v("nginx-service.exe start")]),t._v(" 启动服务")]),t._v(" "),s("p",[s("code",[t._v("win + R")]),t._v(" 输入 "),s("code",[t._v("service.msc")]),t._v(" 打开系统服务，查看 Nginx 服务，启动类型为自动即成功开启服务。")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[t._v("nginx-service.exe "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("      注册对应的系统服务\nnginx-service.exe uninstall    删除对应的系统服务\nnginx-service.exe stop         停止对应的系统服务\nnginx-service.exe start        启动对应的系统服务\n")])])]),s("h2",{attrs:{id:"配置-nginx-conf-文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置-nginx-conf-文件"}},[t._v("#")]),t._v(" 配置 nginx.conf 文件")]),t._v(" "),s("p",[t._v("在 http/server 里添加如下内容，")]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[t._v("location / "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#root   D:\\dist;")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("#index  index.html index.htm;")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nlocation /services/tilt "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("alias")]),t._v("   D:"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("data"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    add_header Access-Control-Allow-Origin *"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    add_header Access-Control-Allow-Headers "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Origin, X-Requested-With, Content-Type, Accept"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    add_header Access-Control-Allow-Methods "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GET, POST, OPTIONS"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    fastcgi_hide_header Cache-Control"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    proxy_hide_header Cache-Control"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    add_header Cache-Control private"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    fastcgi_hide_header Pragma"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    proxy_hide_header Pragma"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("gzip")]),t._v("  on"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ngzip_min_length 1k"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ngzip_buffers "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v(" 16k"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ngzip_http_version "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ngzip_comp_level "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ngzip_types text/plain application/javascript application/css application/json text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ngzip_vary off"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ngzip_disable "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MSIE [1-6]\\."')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("blockquote",[s("p",[s("strong",[t._v("alias D:\\data")]),t._v(" 指定文件路径，即本地要托管的数据。如果文件名以n开头，因为\\n会导致换行和路径错误，所以要使用\\n或者使用斜杠，如 D:/ndata")])]),t._v(" "),s("p",[t._v("启动 nginx，比如要模拟生产环境，将项目打包后的文件托管到 nginx 服务，打开"),s("a",{attrs:{href:"http://127.0.0.1",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://127.0.0.1"),s("OutboundLink")],1),t._v("即可查看。")]),t._v(" "),s("p",[t._v("打开"),s("a",{attrs:{href:"http://127.0.0.1/services/tilt/yizhuang/tileset.json",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://127.0.0.1/services/tilt/yizhuang/tileset.json"),s("OutboundLink")],1),t._v(" 即可看到 D 盘里 data 文件夹下的数据。")]),t._v(" "),s("p",[t._v("此处"),s("a",{attrs:{href:"http://127.0.0.1/services/tilt",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://127.0.0.1/services/tilt"),s("OutboundLink")],1),t._v("是 nginx 暴露出去的路径，后边的/yizhuang/tileset.json 是由 D:\\data 里的内容决定的")])])}),[],!1,null,null,null);a.default=e.exports}}]);