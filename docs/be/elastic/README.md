# 基础

Node.js api地址：

[https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/index.html)

## 安装
```
npm install @elastic/elasticsearch
```

## 使用
```js
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
```
index表示索引；size表示每页的数据条数，默认10；from表示跳过开始的结果数，默认0，比如第一页返回10条数据，第二页就从第11条开始返回，即from为10
```js
client.search({
    index: "lgbzdzk",
    size: 10,
    from: 0,
    body: {
        "track_total_hits": true, // 默认值为10000，设为true后可精确计数
        "query": {
            "match": {
                "name": "高级前端"
            }
        },
        "aggs": {
          "house_count": {
            "cardinality": {
              "field": "RZF_XZDXXDZ.keyword"
            }
          }
        }
    }
}).then(res => {
    let total = res.body.hits.total
    let arrPoint = res.body.hits.hits
    console.log(arrPoint);
    console.log(total);
    console.log(res.body.aggregations);  // 房屋去重计数
}).catch(e => {
    console.log(e);
})
```
## 搜索
### 通用匹配
```json
{
    "query": {
        "match": {
            "name": "高级前端"
        }
    }
}
```
自动分词，会将含有“高级”和“前端”字样的数据都匹配出来

### 短语匹配
短语匹配不存在分词的情况，类似于精确匹配
```json
{
    "query": {
        "match_phrase": {
            "BIP_XM": "张三丰"
        }
    }
}
```

### 多字段匹配
多个字段内只要含有关键词都会被匹配出来
```json
{
    "query": {
        "multi_match": {
            "query": "北京市朝阳区",
            "fields": ["RZF_XZDXXDZ","RZF_DZ"]
        }
    }
}
```
### 布尔查询

must关键词，表示所有条件必须满足

还有should表示或的关系、must_not表示一定不满足
```json
{
    "query": {
        "bool": {
            "must": [
                {
                  "match": {
                    "BIP_XM": "张三"
                  }
                },
                {
                  "term": {
                    "BIP_SFZHM": "412824196808303929"
                  }
                }
            ]
        }
    }
}
```

### 去重计数
统计某个字段上出现的不同值的个数

"house_count"为自定义字段，聚合字段需要keyword类型
```json
{
    "query": {},
    "aggs": {
        "house_count": {
            "cardinality": {
              "field": "RZF_XZDXXDZ.keyword"
            }
        }
    }
}
```

### 查询geo_point类型数据

#### 搜索圆形区域内的点

location字段应与数据库字段相对应
```json
{
    "query": {
        "bool": {
            "must": {
                "match_all": {}
            },
            "filter": {
                "geo_distance": {
                    "distance": "10km",
                    "location": [116.52325,39.87126]
                }
            }
        }
    }
}
```

#### 搜索矩形范围区域内的点
```json
{
    "query": {
        "bool": {
            "must": {
                "match_all": {}
            },
            "filter": {
                "geo_bounding_box": {
                    "location": {
                      "top_left": [116.52325,39.87126],
                      "bottom_right": [116.53325,39.86126]
                    }
                }
            }
        }
    }
}
```

#### 搜索多边形区域内的点
```json
{
    "query": {
        "bool": {
            "must": {
                "match_all": {}
            },
            "filter": {
                "geo_polygon": {
                    "location": {
                        "points": [
                            [116.529251, 39.870735],
                            [116.487755, 39.670625],
                            [116.568255, 39.770525]
                        ]
                    }
                }
            }
        }
    }
}
```
## 数据导入

## 删除

## 修改


## 集群

在`elasticsearch.yml`中添加如下内容：
```yml
cluster.name: elasticsearch		#集群名称，唯一
node.name: node12		#节点名称
node.master: true		#主节点
node.data: true			#数据节点
cluster.initial_master_nodes: ["node10","node11","node12"]		#集群的主节点
network.bind_host: 0.0.0.0				#设置可以访问的ip,默认为0.0.0.0，这里全部设置通过
network.publish_host: 192.168.18.12		#设置其它结点和该结点通信的ip地址
http.port: 9200		 					#设置对外服务的http端口，默认为9200
transport.tcp.port: 9300				#设置节点之间通信的tcp端口，默认是9300
transport.tcp.compress: true			#设置是否压缩tcp传输时的数据，默认false
discovery.zen.ping.unicast.hosts: ["192.168.18.10","192.168.18.11","192.168.18.12"]		#集群的主节点
discovery.zen.minimum_master_nodes: 2		#自动发现主节点的最小数 N = 节点数/2 + 1
http.cors.enabled: true
http.cors.allow-origin: "*"
```

首先进入elasticsearch的配置文件，比如 
```yml
cd /mntdata/docker/var/lib/docker/volumes/es/confing/
```
输入`ll`可查看子目录，直到出现`elasticsearch.yml`

编辑es配置文件，点击`insert`键开始编辑，编辑完成后点击`Ecs`键，输入`:wq`保存退出。`:q`退出不保存，`:wq!`强制保存退出
```yml
vim elasticsearch.yml
```
接着重启es容器
```yml
docker restart es
```
注意es这个容器名字根据实际来定，可输入以下命令显示所有的容器，包括未运行的
```yml
docker ps -a
```

其他命令：
```yml
docker image ls   #列出镜像

docker logs es   #查看es日志

pwd   #显示工作目录

history #查看命令的历史记录

free -h  #查看内存
```

最后在浏览器输入`192.168.18.10:9200`、`192.168.18.11:9200`或者`192.168.18.12:9200`均可看到下图所示内容：

![image](/blog/img/es_cluster.png)

查看集群状态  
```
http://192.168.18.12:9200/_cluster/health
```

![image](/blog/img/es_cluster_health.png)

`status`字段是 `green` 表示集群正常可用

在两个节点上查看所有索引，可以看到所有索引都同步 
```
/_cat/indices
```

### 常见问题
**1、报错 `max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]`**

切换到root用户修改配置`sysctl.conf`
```yml
vi /etc/sysctl.conf 
```
添加下面配置：
```yml
vm.max_map_count=262144
```
执行
```yml
sysctl -p
```
重新启动elasticsearch

**2、文件无权限**

报错信息如下：
```yml
java.lang.IllegalStateException: failed to obtain node locks, tried [[/usr/share/elasticsearch/data]] with lock id [0]; maybe these locations are not writable or multiple nodes were started without increasing [node.max_local_storage_nodes] (was [1])?

java.io.IOException: failed to obtain lock on /usr/share/elasticsearch/data/nodes/0

java.nio.file.AccessDeniedException: /usr/share/elasticsearch/data/nodes/0/node.lock
```
这是文件没有访问权限，此处在`/mntdata/docker/var/lib/docker/db_data_volumes`目录下输入
```yml
chmod -R 777 /mntdata/docker/var/lib/docker/db_data_volumes/dockercompose_sxmap-search-elasticsearch
```

找到`docker-compose`配置文件`cd /mntdata/map-server/docker-compose/`，可以看到`/usr/share/elasticsearch/data`存放es数据的目录映射到了上边的目录
`/mntdata/docker/var/lib/docker/db_data_volumes/dockercompose_sxmap-search-elasticsearch`，注意目录结构根据自己的实际目录来定。

下面就是`map-search-docker-compose.yml`配置文件
```yml
version: '2.1'
services:
  sxmap-elasticsearch:
    image: elasticsearch:7.5.1
    restart: always
    #environment:
     # - discovery.type=single-node
    volumes:
      - /mntdata/docker/var/lib/docker/db_data_volumes/dockercompose_sxmap-search-elasticsearch:/usr/share/elasticsearch/data
      - /mntdata/docker/var/lib/docker/db_data_volumes/dockercompose_sxmap-search-elasticsearch-config:/usr/share/elasticsearch/config
    ports:
      - 9200:9200
      - 9300:9300
  sxmap-search-node:
    image: sxmap/mapsearch:last
    restart: always
    environment:
      - GEOSERVER=http://geoserver:8080/geoserver
      - ELASTICSEARCH=http://sxmap-elasticsearch:9200
    volumes:
      - sxmap-search-node:/opt/mapSearch
    ports:
      - '9999:5000'
```

**3、报错`with the same id but is a different node instance`**

这种情况一般是复制节点造成的，比如在集群中新增一个节点，通常会复制一个已经存在的节点，这样会将节点数据也复制过来，
所以删除存放elsticsearch数据的文件夹中的节点数据即可。

```yml
rm -rf /mntdata/docker/var/lib/docker/db_data_volumes/dockercompose_sxmap-search-elasticsearch/nodes/
```

如果删除时报错`Directory not empty`或者`Device or resource busy`，将容器先停掉
```yml
docker stop dockercompose_sxmap-elasticsearch_1
```
再执行删除命令就能删掉数据，然后重启容器即可。

如果报错`failed to find metadata for existing index`，解决方法同上删除nodes文件夹