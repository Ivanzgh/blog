# 部署

## 阿里云部署静态页面

### 创建 Bucket

打开阿里云对象存储 OSS，在 Bucket 列表点击创建 Bucket

注意项：

- Bucket 名称：创建成功后不可更改
- 地域：可以选择中国香港，本地冗余存储 标准型单价，[计费详细](https://www.aliyun.com/price/product?spm=5176.8466035.bucket-overview.4.51481450Zgpyk0#/oss/detail/ossbag)
  - 0-5GB（含）部分：免费
  - 5GB 以上部分：0.136 元/GB/月
- 存储类型：标准存储
- 读写权限：公共读，这样别人就可以访问文件

### 上传文件

在 Bucket 列表，单击目标 Bucket 名称 -> 文件管理 -> 文件列表，上传需要展示的文件，可以上传 index.html、404.html、favicon.ico 等网站需要的文件，也可以直接放入前端打包文件

这个时候已经可以拿到每个文件的地址，但是是阿里云的域名，不好看还不方便记忆，如果有域名，可以使用自有域名

### 设置静态页面

在该 Bucket 下选择 数据管理 -> 静态页面

- 默认首页设置为 index.html
- 子目录首页选择开通
- 文件 404 规则选择 Redirect
- 默认 404 页设置为 404.html

### 域名管理

在该 Bucket 下选择 Bucket 配置 -> 域名管理

参考文档：<https://help.aliyun.com/document_detail/195675.html>

如果你的域名是在阿里云注册的，在绑定域名时选择「自动添加 CNAME 记录」，接着去 [云解析 DNS](https://dns.console.aliyun.com/?spm=a2cle.14465449.products-recent.ddns.667223faRfAaEB#/dns/domainList) 模块，可以看到自动添加了一条记录，然后就可以通过 HTTP 协议访问自定义域名了。

如果需要通过 HTTPS 协议访问文件，需完成 [证书托管](https://help.aliyun.com/document_detail/97187.htm?spm=a2c4g.11186623.0.0.dbf54580OESOEG#section-evp-h0m-z2e)

### 证书管理

[数字证书管理服务](https://yundun.console.aliyun.com/?spm=0.2020520163.products-recent.dcas.4137DYYVDYYVFc&p=cas#/overview) 点击「SSL 证书」菜单，可以使用阿里云免费证书或者其他证书，这里用阿里云的免费证书

在「免费证书」页面点击「立即购买」，购买数量选择 20 个，颁发厂商选择 DigiCert，一顿操作后就可以申请到 20 个有效期是 1 年的证书。0 元购后点击「创建证书」，即可创建一个免费证书

回到前面的 Bucket 下的「域名管理」，点击证书托管，下拉选择刚刚创建的证书名称，保存后即可 HTTPS 协议访问了

### SSL 证书

SSL 证书为网站和移动应用提供 HTTPS 保护，对流量加密，防止数据被窃取

### FreeSSL

申请地址：[https://freessl.cn/](https://freessl.cn/)  
证书类型：域名型（DV）  
证书品牌：TrustAsia（亚洲诚信）  
域名类型：双域名  
有效期：1 年

---

证书类型：域名型（DV）  
证书品牌：Let’s Encrypt  
域名类型：多域名通配符  
有效期：3 个月
申请数量：不限

## 阿里云 OSS 图床搭建

[参考地址](https://developer.aliyun.com/article/976564)

图床放在阿里云，上传工具：Windows 系统用 [PicGo](https://picgo.github.io/PicGo-Doc/zh/guide/)，macOS 用 [uPic](https://blog.svend.cc/upic/)
