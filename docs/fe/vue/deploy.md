# 部署

## 解决GitHub图片加载失败

windows下找到`C:\Windows\System32\drivers\etc\hosts`文件，添加如下内容，
```
199.232.68.133 raw.githubusercontent.com
```
`199.232.68.133`这个地址会变，在[https://www.ipaddress.com/](https://www.ipaddress.com/)中搜索`raw.githubusercontent.com`
就能找到最新的地址，刷新github即可看到图片。