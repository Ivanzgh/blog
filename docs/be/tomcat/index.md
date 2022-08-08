# Tomcat

## 安装

[https://tomcat.apache.org/](https://tomcat.apache.org/)

[java jdk 下载](https://www.oracle.com/java/technologies/javase-downloads.html)

## 配置 java 环境变量

```sh
JAVA_HOME  C:\Program Files\Java\jdk-14.0.2
```

在 `Path` 中增加 `%JAVA_HOME%\bin`

## 修改配置

### 修改端口

在 conf 文件夹中找到 `server.xml` 文件，将 `8080` 端口号修改为 `80`

```xml
<Connector port="80" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8443" />
```

### 部署项目

方式一、在 `conf/server.xml` 中配置 `context`

`docBase` 是项目实际存放位置的根目录，映射为 path 虚拟目录；

```xml
<Host name="localhost"  appBase="webapps" unpackWARs="true" autoDeploy="true" xmlValidation="false" xmlNamespaceAware="false">
      <Context path=""  docBase="C:\bksxweb" reloadable="true"/>
</Host>
```

方式二、在 tomcat 安装目录下找到 `webapps` 文件件，将项目放到里边

在 tomcat 下的 bin 文件夹中找到 `startup.bat` 双击启动，启动成功后在浏览器打开 `localhost` 即可看到 webapps 文件夹下的 `ROOT` 项目，若要看其他的项目，例如 example 项目则在浏览器输入`localhost/example`。
注意此处是 80 端口，不会显示在地址栏中，如果没有修改 8080 端口号，则要输入 localhost:8080 才能看到效果。

## 常见问题

### 中文乱码

启动时若控制台中文乱码，在 conf 文件夹下打开 `logging.properties`，大概在第 51 行将`UTF-8`改为`GBK`，重启 tomcat 即可

```sh
java.util.logging.ConsoleHandler.encoding = GBK
```

### Tomcat 启动报内存溢出错误：java.lang.OutOfMemoryError: PermGen space 异常

找到 Tomcat 安装位置 bin 目录下的 `catalina.bat` 文件，添加如下内容：

```sh
set JAVA_OPTS=%JAVA_OPTS% -server -Xmx1024M -Xms512m -XX:MaxNewSize=256m -XX:PermSize=512M -XX:MaxPermSize=512m
```

![image](/blog/img/be/tomcat_perm.png)
