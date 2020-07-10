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
            