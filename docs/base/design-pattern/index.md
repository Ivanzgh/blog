# 设计模式

![image](/img/fe/js2.png)

## SOLID 设计原则

> "SOLID" 是由罗伯特·C·马丁在 21 世纪早期引入的记忆术首字母缩略字，指代了面向对象编程和面向对象设计的五个基本原则。

- 单一功能原则（Single Responsibility Principle）
- 开放封闭原则（Opened Closed Principle）
- 里式替换原则（Liskov Substitution Principle）
- 接口隔离原则（Interface Segregation Principle）
- 依赖反转原则（Dependency Inversion Principle）

## 核心思想

封装变化，**将变与不变分离，确保变化的部分灵活、不变的部分稳定**

## 构造器模式

如果想创建两个对象，可能会用如下方式：

```js
const person1 = { name: 'zgh', age: 23 }
const person2 = { name: 'lrx', age: 22 }
```

但是创建很多个这种对象，就会很费事，采用构造器模式就能轻松解决

```js
function createObj(name, age) {
  this.name = name
  this.age = age
}
const person1 = new createObj('zgh', 23)
const person2 = new createObj('lrx', 22)
```

这里变的是每个人的姓名、年龄这些值，这是人的**个性**，不变的是每个人都具备姓名、年龄这些属性，这是人的**共性**。

构造器就是将 name、age 赋值给对象的过程封装，确保了每个对象都具备这些属性，确保了共性的不变，同时将 name、age 各自的取值操作开放，确保了个性的灵活

## 单例模式

单例模式，**保证一个类仅有一个实例，并提供一个全局访问点**

```js
class SingleDog {
  show() {
    console.log('一个单例对象')
  }
}
const s1 = new SingleDog()
const s2 = new SingleDog()
```

上面的实例 s1、s2 是相互独立的对象，而单例模式则是无论创建多少次，都返回第一次创建的唯一的实例。
需要构造函数**具备判断自己是否已经构造过一个实例**的能力。

```js
class SingDog {
  show() {
    console.log('单例对象')
  }
  static getInstance() {
    if (!SingDog.instance) {
      SingDog.instance = new SingDog()
    }
    return SingDog.instance
  }
}

const s1 = SingDog.getInstance()
const s2 = SingDog.getInstance()
console.log(s1 === s2) // true
```

上面使用静态方法，还可以使用闭包，都指向唯一的实例

```js
SingDog.getInstance = (function() {
  let instance = null
  return function() {
    if (!instance) {
      instance = new SingDog()
    }
    return instance
  }
})()
```
