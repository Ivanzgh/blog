(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{369:function(t,a,s){"use strict";s.r(a);var n=s(19),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"基础"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#基础"}},[t._v("#")]),t._v(" 基础")]),t._v(" "),s("h2",{attrs:{id:"安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[t._v("#")]),t._v(" 安装")]),t._v(" "),s("p",[t._v("地址： "),s("a",{attrs:{href:"http://nginx.org/en/download.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://nginx.org/en/download.html"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"image",width:"800",height:"500","data-src":"/blog/img/be/nginx_download.png",loading:"lazy"}})]),t._v(" "),s("p",[t._v("Mainline version：最新版本")]),t._v(" "),s("p",[t._v("Stable version：稳定版，生产环境上建议使用这个版本")]),t._v(" "),s("p",[t._v("Legacy versions：历史版本")]),t._v(" "),s("h2",{attrs:{id:"介绍"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),s("p",[t._v("Nginx就是反向代理服务器。")]),t._v(" "),s("p",[t._v("代理服务器一般是指局域网内部的机器通过代理服务发送请求到互联网上的服务器，代理服务器一般作用于客户端。")]),t._v(" "),s("p",[s("img",{staticClass:"lazy",attrs:{alt:"image","data-src":"/blog/img/be/nginx1.png",loading:"lazy"}})]),t._v(" "),s("p",[t._v("简单的说：")]),t._v(" "),s("p",[t._v("正向代理：客户端知道服务器端，通过代理端连接服务器端。代理端代理的是服务器端。")]),t._v(" "),s("p",[t._v("反向代理：服务器端知道客户端，客户端不知道服务器端，通过代理端连接服务器端。代理端代理的是客户端，代理对象刚好相反，所以叫反向代理。")]),t._v(" "),s("h2",{attrs:{id:"设置windows下nginx开机自启"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设置windows下nginx开机自启"}},[t._v("#")]),t._v(" 设置windows下nginx开机自启")]),t._v(" "),s("p",[t._v("首先下载winsw工具")]),t._v(" "),s("p",[t._v("地址："),s("a",{attrs:{href:"http://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/"),s("OutboundLink")],1),s("br"),t._v("\n例如下载V2.9.0则选择winsw-2.9.0-net4.exe")]),t._v(" "),s("p",[t._v("或者 "),s("a",{attrs:{href:"https://github.com/winsw/winsw/releases",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/winsw/winsw/releases"),s("OutboundLink")],1),t._v(" ，选择WinSW.NET4.exe  表示64位")]),t._v(" "),s("p",[t._v("将下载的winsw移动到nginx的安装目录,并将winsw工具改名为nginx-service.exe")]),t._v(" "),s("p",[t._v("然后在nginx安装目录下新建文件nginx-service.xml，logpath标签里设置Nginx的安装位置")]),t._v(" "),s("div",{staticClass:"language-xml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-xml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("service")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("nginx"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("id")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("nginx"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("description")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("nginx"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("description")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("logpath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("D:\\nginx-1.19.0"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("logpath")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("logmode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("roll"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("logmode")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("depend")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("depend")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("executable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("D:\\nginx-1.19.0\\nginx.exe"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("executable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("stopexecutable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("D:\\nginx-1.19.0\\nginx.exe -s stop"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("stopexecutable")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("service")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),s("p",[t._v("打开cmd，进入Nginx安装目录，输入nginx-service.exe install ，将其注册为Windows服务。")]),t._v(" "),s("p",[t._v("然后运行 nginx-service.exe start 启动服务")]),t._v(" "),s("p",[t._v("win+R输入service.msc打开系统服务，查看Nginx服务，启动类型为自动即成功开启服务。")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("nginx-service.exe install      注册对应的系统服务\nnginx-service.exe uninstall    删除对应的系统服务\nnginx-service.exe stop         停止对应的系统服务\nnginx-service.exe start        启动对应的系统服务\n")])])]),s("h2",{attrs:{id:"配置nginx-conf文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置nginx-conf文件"}},[t._v("#")]),t._v(" 配置nginx.conf文件")]),t._v(" "),s("p",[t._v("在http/server里添加如下内容，")]),t._v(" "),s("div",{staticClass:"language-conf extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v('location / {\n    #root   D:\\dist;\n    #index  index.html index.htm;\n}\nlocation /services/tilt {\n    alias   D:\\data;\n    add_header Access-Control-Allow-Origin *;\n    add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept";\n    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";\n    fastcgi_hide_header Cache-Control;\n    proxy_hide_header Cache-Control; \n    add_header Cache-Control private;\n    fastcgi_hide_header Pragma;\n    proxy_hide_header Pragma;\n}\ngzip  on;\ngzip_min_length 1k;\ngzip_buffers 4 16k;\ngzip_http_version 1.0;\ngzip_comp_level 2;\ngzip_types text/plain application/javascript application/css application/json text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;\ngzip_vary off;\ngzip_disable "MSIE [1-6]\\.";\n')])])]),s("blockquote",[s("p",[s("strong",[t._v("alias D:\\data")]),t._v(" 指定文件路径，即本地要托管的数据")])]),t._v(" "),s("p",[t._v("启动nginx，比如要模拟生产环境，将项目打包后的文件托管到nginx服务，打开http://127.0.0.1即可查看。")]),t._v(" "),s("p",[t._v("打开http://127.0.0.1/services/tilt/yizhuang/tileset.json 即可看到D盘里data文件夹下的数据。")]),t._v(" "),s("p",[t._v("此处http://127.0.0.1/services/tilt是nginx暴露出去的路径，后边的/yizhuang/tileset.json 是由D:\\data里的内容决定的")])])}),[],!1,null,null,null);a.default=e.exports}}]);