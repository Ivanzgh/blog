# tomcat

## 安装

[https://tomcat.apache.org/](https://tomcat.apache.org/)

[java jdk下载](https://www.oracle.com/java/technologies/javase-downloads.html)

## 配置java环境变量
```
JAVA_HOME  C:\Program Files\Java\jdk-14.0.2
```
在Path中增加  `%JAVA_HOME%\bin`

## 修改配置
### 修改端口
在conf文件夹中找到server.xml文件，将8080端口号修改为80
```xml
<Connector port="80" protocol="HTTP/1.1" 
               connectionTimeout="20000" 
               redirectPort="8443" />
```

### 部署项目
方式一、在conf/server.xml中配置context

docBase是项目实际存放位置的根目录，映射为path虚拟目录；
```xml
<Host name="localhost"  appBase="webapps"
            unpackWARs="true" autoDeploy="true"
            xmlValidation="false" xmlNamespaceAware="false">

		<Context path=""  docBase="C:\bksxweb" reloadable="true"/>

      </Host>
```
方式二、在tomcat安装目录下找到webapps文件件，将项目放到里边


在tomcat下的bin文件夹中找到startup.bat双击启动，启动成功后在浏览器打开localhost即可看到webapps文件夹下的ROOT项目，若要看其他的项目，例如example项目则在浏览器输入`localhost/example`。
注意此处是80端口，不会显示在地址栏中，如果没有修改8080端口号，则要输入localhost:8080才能看到效果。

## 常见问题
### 中文乱码
启动时若控制台中文乱码，在conf文件夹下打开logging.properties，大概在第51行将`UTF-8`改为`GBK`，重启tomcat即可
```
java.util.logging.ConsoleHandler.encoding = GBK
```

### Tomcat启动报内存溢出错误：java.lang.OutOfMemoryError: PermGen space异常
找到Tomcat安装位置bin目录下的catalina.bat文件，添加如下内容：
```
set JAVA_OPTS=%JAVA_OPTS% -server -Xmx1024M -Xms512m -XX:MaxNewSize=256m -XX:PermSize=512M -XX:MaxPermSize=512m
```
![image](/blog/img/be/tomcat.png)