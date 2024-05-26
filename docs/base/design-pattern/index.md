# 设计模式

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418201.png)

> 设计模式是在软件工程中经过验证的最佳实践，是一系列解决特定编程问题的标准或通用解决方案模板。

在前端开发中采用设计模式有助于提高代码的可读性、可维护性以及可重用性。

## 核心思想

封装变化，**将变与不变分离，确保变化的部分灵活、不变的部分稳定**。

## 设计原则

- 单一功能原则（Single Responsibility Principle）
- 开放封闭原则（Opened Closed Principle）
- 里式替换原则（Liskov Substitution Principle）
- 接口隔离原则（Interface Segregation Principle）
- 依赖反转原则（Dependency Inversion Principle）

单一功能原则：一个函数应该只负责一个功能，不应该承担多个功能。

开放封闭原则：对扩展开放，对修改封闭。即类、函数、模块可以扩展，但是不能修改。

## 原型模式

> 通过复制现有对象的原型来创建新的对象。

通过原型模式，可以创建具有相似属性和行为的对象，并且可以通过修改原型对象来影响所有基于该原型创建的对象，从而实现对象的复用和共享。

```js
const personPrototype = {
  foo() {
    console.log(this.name);
  }
};

const person1 = Object.create(personPrototype);
person1.name = 'zgh';

const person2 = Object.create(personPrototype);
person2.name = 'lrx';

person1.foo();
person2.foo();
```

## 构造器模式

> 在 js 中使用构造函数去创建对象，就是应用了构造器模式。

如果想创建两个对象，可能会用如下方式：

```js
// 假设对象很复杂
const person1 = { name: 'zgh', age: 23, foo() {} };
const person2 = { name: 'lrx', age: 22, foo() {} };
```

但是创建很多个这种对象，就会比较麻烦：复制粘贴、如果要修改就需要改动所有的代码。采用构造器模式就能轻松解决：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.foo = function () {};
}
const person1 = new Person('zgh', 23);
const person2 = new Person('lrx', 22);
```

这里变的是每个人的姓名、年龄这些值，这是人的**个性**；不变的是每个人都具备姓名、年龄这些属性，这是人的**共性**。

构造器就是将 name、age 赋值给对象的过程封装，确保了每个对象都具备这些属性，确保了共性的不变；同时将 name、age 各自的取值操作开放，确保了个性的灵活。

