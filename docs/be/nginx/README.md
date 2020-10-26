# 基础

## 安装

地址： [http://nginx.org/en/download.html](http://nginx.org/en/download.html)

![image](/blog/img/be/nginx_download.png =800x500)

Mainline version：最新版本

Stable version：稳定版，生产环境上建议使用这个版本

Legacy versions：历史版本

## 介绍

Nginx就是反向代理服务器。

代理服务器一般是指局域网内部的机器通过代理服务发送请求到互联网上的服务器，代理服务器一般作用于客户端。

![image](/blog/img/be/nginx1.png)

简单的说：

正向代理：客户端知道服务器端，通过代理端连接服务器端。代理端代理的是服务器端。

反向代理：服务器端知道客户端，客户端不知道服务器端，通过代理端连接服务器端。代理端代理的是客户端，代理对象刚好相反，所以叫反向代理。

## 设置windows下nginx开机自启

首先下载winsw工具

地址：[http://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/](http://repo.jenkins-ci.org/releases/com/sun/winsw/winsw/)  
例如下载V2.9.0则选择winsw-2.9.0-net4.exe

或者 [https://github.com/winsw/winsw/releases](https://github.com/winsw/winsw/releases) ，选择WinSW.NET4.exe  表示64位

将下载的winsw移动到nginx的安装目录,并将winsw工具改名为nginx-service.exe

然后在nginx安装目录下新建文件nginx-service.xml，logpath标签里设置Nginx的安装位置

```xml
<service>
    <id>nginx</id>
    <name>nginx</name>
    <description>nginx</description>
    <logpath>D:\nginx-1.19.0</logpath>
    <logmode>roll</logmode>
    <depend></depend>
    <executable>D:\nginx-1.19.0\nginx.exe</executable>
    <stopexecutable>D:\nginx-1.19.0\nginx.exe -s stop</stopexecutable>
</service>
```

打开cmd，进入Nginx安装目录，输入nginx-service.exe install ，将其注册为Windows服务。

然后运行 nginx-service.exe start 启动服务

win+R输入service.msc打开系统服务，查看Nginx服务，启动类型为自动即成功开启服务。

```sh
nginx-service.exe install      注册对应的系统服务
nginx-service.exe uninstall    删除对应的系统服务
nginx-service.exe stop         停止对应的系统服务
nginx-service.exe start        启动对应的系统服务
```

## 配置nginx.conf文件

在http/server里添加如下内容，

```conf
location / {
    #root   D:\dist;
    #index  index.html index.htm;
}
location /services/tilt {
    alias   D:\data;
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept";
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
    fastcgi_hide_header Cache-Control;
    proxy_hide_header Cache-Control;
    add_header Cache-Control private;
    fastcgi_hide_header Pragma;
    proxy_hide_header Pragma;
}
gzip  on;
gzip_min_length 1k;
gzip_buffers 4 16k;
gzip_http_version 1.0;
gzip_comp_level 2;
gzip_types text/plain application/javascript application/css application/json text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
gzip_vary off;
gzip_disable "MSIE [1-6]\.";
```

>**alias D:\data** 指定文件路径，即本地要托管的数据

启动nginx，比如要模拟生产环境，将项目打包后的文件托管到nginx服务，打开<http://127.0.0.1>即可查看。

打开<http://127.0.0.1/services/tilt/yizhuang/tileset.json> 即可看到D盘里data文件夹下的数据。

此处<http://127.0.0.1/services/tilt>是nginx暴露出去的路径，后边的/yizhuang/tileset.json 是由D:\data里的内容决定的
