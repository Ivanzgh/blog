# 设计模式

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418201.png)

## SOLID 设计原则

> "SOLID" 是由罗伯特·C·马丁在 21 世纪早期引入的记忆术首字母缩略字，指代了面向对象编程和面向对象设计的五个基本原则。

- 单一功能原则（Single Responsibility Principle）
- 开放封闭原则（Opened Closed Principle）
- 里式替换原则（Liskov Substitution Principle）
- 接口隔离原则（Interface Segregation Principle）
- 依赖反转原则（Dependency Inversion Principle）

## 核心思想

封装变化，**将变与不变分离，确保变化的部分灵活、不变的部分稳定**

## 原型模式

## 构造器模式

如果想创建两个对象，可能会用如下方式：

```js
const person1 = { name: 'zgh', age: 23 };
const person2 = { name: 'lrx', age: 22 };
```

但是创建很多个这种对象，就会很费事，采用构造器模式就能轻松解决

```js
function createObj(name, age) {
  this.name = name;
  this.age = age;
}
const person1 = new createObj('zgh', 23);
const person2 = new createObj('lrx', 22);
```

这里变的是每个人的姓名、年龄这些值，这是人的**个性**，不变的是每个人都具备姓名、年龄这些属性，这是人的**共性**。

构造器就是将 name、age 赋值给对象的过程封装，确保了每个对象都具备这些属性，确保了共性的不变，同时将 name、age 各自的取值操作开放，确保了个性的灵活
