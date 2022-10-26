# Mysql

## 安装

最新版：<https://dev.mysql.com/downloads/mysql/>

选择版本：<https://downloads.mysql.com/archives/community/>

## 初始化

首先打开 cmd 进入 mysql 的 bin 目录下，安装服务

```sh
mysqld --install
```

接着初始化 mysql，在最后一行会产生一个随机密码，要记住后面登录要用

```sh
mysqld --initialize --console
```

然后开启 mysql 服务

```sh
net start mysql
```

> 关闭服务 net stop mysql

登录验证

```sh
mysql -u root -p
```

修改密码

```sh
set password for root@localhost=password("自己需要设置的密码");
```

输入`exit`退出登录，使用新密码登录

## 配置文件

在 mysql 目录下新建一个`my.ini`的配置文件，加入以下内容，注意安装目录和数据存放目录要修改

```ini
[mysql]

# 设置mysql客户端默认字符集
default-character-set=utf8

[mysqld]

#设置3306端口
port = 3306

# 设置mysql的安装目录
basedir=C:\mysql-5.7.30-winx64

# 设置mysql数据库的数据的存放目录
datadir=C:\mysql-5.7.30-winx64\data

# 允许最大连接数
max_connections=200

# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8

# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB

```

## Navicat Premium 导入 sql 文件

点击连接，选择要连接的数据库类型，连接名随意设置，主机填 localhost 或者远程的地址，端口、用户名、密码均是 mysql 设置的，点击测试连接
![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418384.png)

然后新建一个数据库，字符集选择 UTF-8 编码，然后右击新建的数据库，点击运行 SQL 文件即可

## 常见问题

### 安装服务时报错：无法启动此程序，因为计算机丢失 MSVCP120.dll

在执行`mysqld --install`时，若报丢失 MSVCP120.dll 错误，是因为没有安装`vcredist`，
在官网<https://www.microsoft.com/zh-CN/download/details.aspx?id=40784>
下载安装即可。

如果报 MSVCP140.dll 丢失错误，下载安装<https://www.microsoft.com/zh-cn/download/details.aspx?id=48145>

### mysql 不允许外部主机连接解决方法

登录 mysql 后使用如下命令：

```ini
use mysql;

update user set host='%' where user='root';

select host,user from user;

flush privileges;
```

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418359.png)
