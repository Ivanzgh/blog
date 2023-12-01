# MongoDB

## 简介

[官网文档](https://docs.mongodb.com)

[中文文档](http://www.mongodb.org.cn/)

[Mongoose 文档](https://mongoosejs.com/docs/index.html)

MongoDB 是一个基于分布式文件存储的数据库。由 C++语言编写，旨在为 WEB 应用提供可扩展的高性能数据存储解决方案。

MongoDB 是一个介于**关系数据库**和**非关系数据库**之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。

## 核心概念

- **数据库**（database） 数据库是一个数据仓库，数据库服务下可以创建很多数据库，数据库中可以存放很多集合

- **集合**（collection） 集合类似于 JS 中的数组，在集合中可以存放很多文档

- **文档**（document） 文档是数据库中的最小单位，类似于 JS 中的对象

![img](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1685026945.jpg)

通过 JSON 文件来理解 Mongodb 中的概念

- 一个 **JSON 文件** 就像是一个 **数据库**，一个 Mongodb 服务下可以有 N 个数据库
- JSON 文件中的 **一级属性的数组值** 就像是 **集合**
- 数组中的对象就像是 **文档**
- 对象中的属性有时也称之为 **字段**

一般情况下，一个项目使用一个数据库，一个集合会存储同一种类型的数据

```json
{
  "users": [
    { "id": 1, "name": "张三" },
    { "id": 2, "name": "李四" },
    { "id": 3, "name": "王五" }
  ],
  "books": [
    { "id": 1, "name": "你不知道的JS(上)" },
    { "id": 2, "name": "你不知道的JS(中)" },
    { "id": 3, "name": "你不知道的JS(下)" }
  ]
}
```

## 命令行交互

### 数据库命令

```sh
# 显示所有的数据库
show dbs

# 切换到指定的数据库，如果数据库不存在会自动创建数据库
use '数据库名'

# 显示当前所在的数据库
db

# 删除当前数据库
use '库名'
db.dropDatabase()
```

### 集合命令

```sh
# 创建集合
db.createCollection('集合名称')

# 显示当前数据库中的所有集合
show collections

# 删除某个集合
db.'集合名'.drop()

# 重命名集合
db.'集合名'.renameCollection('newName')
```

### 文档命令

```sh
# 插入文档
db.'集合名'.insert('文档对象')

# 查询文档
# _id 是 mongodb 自动生成的唯一编号，用来唯一标识文档
db.'集合名'.find('查询条件')

# 更新文档
db.'集合名'.update('查询条件', '新的文档')
db.'集合名'.update({ name: '张三' }, { $set: { age:19 } })

# 删除文档
db.'集合名'.remove('查询条件')
```

## Mongoose

Mongoose 是一个对象文档模型库，方便使用代码操作 mongodb 数据库

### 使用方式

```js
// 安装、导入 mongoose
const mongoose = require('mongoose');

// 连接数据库，数据库名称是 mydb
mongoose.connect('mongodb://127.0.0.1:27017/mydb');

// 连接成功
mongoose.connection.on('open', () => {
  console.log('连接成功');
  // 设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({ title: String, author: String, price: Number });

  // 创建文档模型对象
  let BookModel = mongoose.model('book', BookSchema);

  // 插入文档
  BookModel.create({ title: '一气化三清', author: '老子', price: 100 }, (err, data) => {
    if (err) throw err;
    console.log(data);
    // 断开连接
    mongoose.disconnect();
  });
});

// 连接出错
mongoose.connection.on('error', () => {
  console.log('连接出错');
});

// 连接关闭
mongoose.connection.on('close', () => {
  console.log('连接关闭');
});
```

### 文档字段类型

文档结构可选的常用字段类型列表

| 类型       | 描述                                                       |
| ---------- | ---------------------------------------------------------- |
| String     | 字符串                                                     |
| Number     | 数字                                                       |
| Boolean    | 布尔值                                                     |
| Array      | 数组，也可以使用 [] 来标识                                 |
| Date       | 日期                                                       |
| Buffer     | Buffer 对象                                                |
| Mixed      | 任意类型，需要使用 mongoose.Schema.Types.Mixed 指定        |
| ObjectId   | 对象 ID，需要使用 mongoose.Schema.Types.ObjectId 指定      |
| Decimal128 | 高精度数字，需要使用 mongoose.Schema.Types.Decimal128 指定 |

### 字段值验证

Mongoose 有一些内建验证器，可以对字段值进行验证

```js
// 必填项
title: { type: String, required: true }

// 默认值
author: { type: String, default: '匿名' }

// 枚举值，设置的值必须是数组中的
gender: { type: String, enum: ['男','女'] }

// 唯一值
username: { type: String, unique: true }
```

## CURD

数据库的基本操作包括四个，增加（create），删除（delete），修改（update），查（read）

### 增加

插入一条

```js
SongModel.create({ title: '给我一首歌的时间', author: 'Jay' }, (err, data) => {
  if (err) throw err;
  console.log(data); // 插入后的数据对象
});
```

批量插入

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb');

mongoose.connection.on('open', () => {
  // 声明文档结构
  const PhoneSchema = new mongoose.Schema({ brand: String, color: String, price: Number, tags: Array });
  // 创建模型对象
  const PhoneModel = mongoose.model('phone', PhoneSchema);
  const phoneData = [
    { brand: 'iphone', color: 'dark purple', price: 8999 },
    { brand: 'xiaomi', color: 'red', price: 3499 }
  ];
  PhoneModel.insertMany(phoneData, (err, data) => {
    if (err) throw err;
    console.log('写入成功');
    mongoose.connection.close();
  });
});
```

### 删除

删除一条数据

```js
SongModel.deleteOne({ _id: '5dd65f32be6401035cb5b1ed' }, (err) => {
  if (err) throw err;
  console.log('删除成功');
  mongoose.connection.close();
});
```

批量删除

```js
SongModel.deleteMany({ author: 'Jay' }, (err) => {
  if (err) throw err;
  console.log('删除成功');
  mongoose.connection.close();
});
```

### 更新

更新一条数据

```js
SongModel.updateOne({ author: 'zhangsan' }, { author: '张三' }, (err) => {
  if (err) throw err;
  mongoose.connection.close();
});
```

批量更新数据

```js
SongModel.updateMany({ author: 'lisi' }, { author: '李四' }, (err) => {
  if (err) throw err;
  mongoose.connection.close();
});
```

### 查询

查询一条数据

```js
SongModel.findOne({ author: 'Jay' }, (err, data) => {
  if (err) throw err;
  console.log(data);
  mongoose.connection.close();
});

// 根据 id 查询数据
SongModel.findById('5dd662b5381fc316b44ce167', (err, data) => {
  if (err) throw err;
  console.log(data);
  mongoose.connection.close();
});
```

批量查询数据

```js
// 不加条件查询
SongModel.find((err, data) => {
  if (err) throw err;
  console.log(data);
  mongoose.connection.close();
});

// 加条件查询
SongModel.find({ author: 'Jay' }, (err, data) => {
  if (err) throw err;
  console.log(data);
  mongoose.connection.close();
});
```

## 条件控制

运算符
在 mongodb 不能使用 `> 、<、 >=、 <=、 !==` 等运算符，需要使用替代符号

| 运算符 | 替代符号 |
| :----: | :------: |
|   >    |   $gt    |
|   <    |   $lt    |
|   =    |   $gte   |
|   <=   |   $lte   |
|  !==   |   $ne    |

```js
// id 号比 3 大的所有的记录
db.students.find({ id: { $gt: 3 } });

// 价格小于 20 的图书
BookModel.find({ price: { $lt: 20 } }, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### 逻辑运算

`$or` 逻辑或

```js
db.students.find({ $or: [{ age: 18 }, { age: 24 }] });

BookModel.find({ $or: [{ author: '张三' }, { author: '李四' }] }, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

`$and` 逻辑与

```js
db.students.find({ $and: [{ age: { $lt: 20 } }, { age: { $gt: 15 } }] });

// 价格大于 30 且 小于 100
BookModel.find({ $and: [{ price: { $gt: 10 } }, { price: { $lt: 100 } }] }, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### 正则匹配

条件中可以直接使用 JS 的正则语法，通过正则可以进行模糊查询

```js
db.students.find({ name: /san/ });

BookModel.find({ name: /三/ }, (err, data) => {
  if (err) throw err;
  console.log(data);
});

BookModel.find({ name: new RegExp('三') }, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

## 个性化读取

字段筛选

```js
// 0: 不要的字段
// 1: 要的字段
SongModel.find()
  .select({ _id: 0, title: 1 })
  .exec((err, data) => {
    if (err) throw err;
    console.log(data);
    mongoose.connection.close();
  });
```

数据排序

```js
// sort 排序
// 1: 升序
// -1: 倒序
SongModel.find()
  .sort({ hot: 1 })
  .exec((err, data) => {
    if (err) throw err;
    console.log(data);
    mongoose.connection.close();
  });
```

数据截取

```js
// skip 跳过， limit 限定
SongModel.find()
  .skip(10)
  .limit(10)
  .exec((err, data) => {
    if (err) throw err;
    console.log(data);
    mongoose.connection.close();
  });
```

## 图形化管理工具

可以使用图形化的管理工具来对 Mongodb 进行交互

- [Robo 3T 免费](https://github.com/Studio3T/robomongo/releases)
- [Navicat 收费](https://www.navicat.com.cn/)

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

## FAQ

### 端口占用

报错信息：

```sh
 Unclean full-time diagnostic data capture shutdown detected, found interim file, some metrics may have been lost. OK
```

解决方法：找到项目存放 data 的地方，删除`diagnostic.data`文件夹即可
