# docker

## 常用命令

包含一些docker命令和一些Linux命令
```yml
docker image ls   #列出镜像

docker logs es   #查看全部es日志
docker logs -f -t --tail 100 es    #从日志末尾显示多少行日志， 默认是all

docker ps -a        #显示所有的容器，包括未运行的

docker restart es    #重启es容器

docker stop es    #关闭es容器

pwd   #显示工作目录

ll    #显示当前目录下的全部子目录

history #查看命令的历史记录

free -h  #查看内存

```


编辑文件使用`vim`，比如编辑es配置文件`elasticsearch.yml`，
```yml
vim elasticsearch.yml
```
点击`insert`键开始编辑，编辑完成后点击`Ecs`键，输入`:wq`保存退出。`:q`退出不保存，`:wq!`强制保存退出