# GeoServer

GeoServer 是一个用于共享地理空间数据的开源服务器

- [GeoServer 官网](https://geoserver.org/)
- [文档](https://docs.geoserver.org/)
- [GeoServer 用户手册中文版](https://www.osgeo.cn/geoserver-user-manual/index.html)

下载：<https://geoserver.org/release/stable/>

安装解压后运行 `bin` 文件夹下的`startup.bat` （`linux` 为 `startup.sh`）

打开`http://localhost:8080/geoserver/web/`，用户名：`admin` 密码：`geoserver`

## 地图样式

可以参考[minedata](https://www.minedata.cn/platform/market/map)的地图模版，申请账号有 90 天试用期。

可以在 geoserver 中用 YSLD 写样式

## YSLD

- [文档地址](https://docs.geoserver.org/latest/en/user/styling/ysld/index.html)
- [中文版文档地址](https://www.osgeo.cn/geoserver-user-manual/styling/ysld/index.html)

在 geoserver 中使用 `YSLD`样式需要安装插件，找到[YSLD Styling](https://geoserver.org/release/stable/)点击下载
