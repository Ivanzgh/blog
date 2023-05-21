# MongoDB

[官网文档](https://docs.mongodb.com)

[中文文档](http://www.mongodb.org.cn/)

[mongoose 文档](https://mongoosejs.com/docs/index.html)

## 简介

MongoDB 是一个基于分布式文件存储的数据库。由 C++语言编写。旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

MongoDB 是一个介于关系数据库和非关系数据库(nosql)之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

## 原子操作

### \$set

用来指定一个键并更新键值，若键不存在则创建。

```js
const { title, content, contentText, category } = req.body;
const data = await article.findById(id);
const updateData = await data.update({
  $set: { title, content, contentText, category }
});
```

### \$inc

对文档的某个值为数字型（只能为满足要求的数字）的键进行增减。

```js
const data = await article.findOneAndUpdate(
  { _id: id },
  {
    $inc: { looknums: 1 }
    // 阅读量每次增加1
    // 若需要减少1，可写成 $inc: {looknums: -1}
  }
);
res.json({ code: 200, data: data, msg: '阅读量修改成功' });
```

### \$unset

用来删除一个键

### \$push

```js
{
  $push: {
    field: value;
  }
}
```

把 value 追加到 field 里面去，field 一定要是数组类型才行，如果 field 不存在，会新增一个数组类型加进去。

### \$pushAll

同\$push,只是一次可以追加多个值到一个数组字段内。

### \$pull

从数组 field 内删除一个等于 value 值。

### \$addToSet

增加一个值到数组内，而且只有当这个值不在数组内才增加。

### \$pop

删除数组的第一个或最后一个元素

### \$rename

修改字段名称

## 常见问题

### 端口占用

报错信息：

```sh
 Unclean full-time diagnostic data capture shutdown detected, found interim file, some metrics may have been lost. OK
```

解决方法：找到项目存放 data 的地方，删除`diagnostic.data`文件夹即可
