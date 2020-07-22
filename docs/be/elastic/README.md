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
node.name: node14		#节点名称
node.master: true		#主节点
node.data: true			#数据节点
cluster.initial_master_nodes: ["node14","node15"]		#集群的主节点
network.bind_host: 0.0.0.0				#设置可以访问的ip,默认为0.0.0.0，这里全部设置通过
network.publish_host: 192.168.18.14		#设置其它结点和该结点通信的ip地址
http.port: 9200		 					#设置对外服务的http端口，默认为9200
transport.tcp.port: 9300				#设置节点之间通信的tcp端口，默认是9300
transport.tcp.compress: true			#设置是否压缩tcp传输时的数据，默认false
discovery.zen.ping.unicast.hosts: ["192.168.18.14","192.168.18.15"]		#集群的主节点
discovery.zen.minimum_master_nodes: 1		#自动发现主节点的最小数
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

最后在浏览器输入`192.168.18.14:9200`或者`192.168.18.15:9200`均可看到下图所示内容：

![image](/blog/img/es_cluster.png)

查看集群状态  
```
http://192.168.18.14:9200/_cluster/health
```

![image](/blog/img/es_cluster_health.png)

`status`字段是 `green` 表示集群正常可用

在两个节点上查看所有索引，可以看到所有索引都同步 
```
/_cat/indices
```

### 常见问题
1、报错 `max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]`

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