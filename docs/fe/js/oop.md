# 面向对象

## 创建对象的方式

### 直接创建

```js
let obj = { name: 'zgh', age: 23 }
```

### new

```js
let obj = new Object()
obj.name = 'zgh'
obj.age = 23
```

### 工厂模式

工厂模式解决了重复实例化多个对象的问题

```js
function createObj(name, age) {
  let obj = new Object()
  obj.name = name
  obj.age = age
  return obj
}
let person1 = createObj('zgh', 23)
let person2 = createObj('lrx', 22)
```

### 构造函数模式

```js
function createObj(name, age) {
  this.name = name
  this.age = age
}
let person1 = new createObj('zgh', 23)
let person2 = new createObj('lrx', 22)
console.log(person1, person2)
```

### 原型模式

```js
function Person() {}

Person.prototype.name = 'zgh'
Person.prototype.age = 23
console.log(Person.prototype) // {name: "zgh", age: 23, constructor: ƒ}

let person1 = new Person() //创建一个实例person1
console.log(person1.name) // zgh
```

### 混合模式（构造函数模式+原型模式）

构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性

```js
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype = {
  //每个函数都有prototype属性，指向该函数原型对象，原型对象都有constructor属性，这是一个指向prototype属性所在函数的指针
  constructor: Person,
  say: function() {
    console.log(this.name)
  }
}
let person1 = new Person('zgh', 23)
let person2 = new Person('lrx', 22)
console.log(person1, person2)
```

可以看出，混合模式共享着对相同方法的引用，又保证了每个实例有自己的私有属性。最大限度的节省了内存

## new 的过程

new 一个对象：

```js
function Person(name, age) {
  this.name = name
  this.age = age
}
let person = new Person('zgh', 23)
```

1、创建一个空对象 obj

```js
let obj = {}
```

2、使用 `call` 将构造函数 Person 中的 this 指向刚创建的 obj 对象

```js
let result = Person.call(obj)
```

3、设置原型链，将创建的 obj 的`__proto__`指向构造函数 Person 的`prototype`

```js
obj.__proto__ = Person.prototype
```

4、判断 Person 的返回值类型，如果是值类型，返回 obj。如果是引用类型，则返回这个引用类型的对象。

## 继承

### 构造继承

### 原型继承

```js
function Parent() {
  this.name = 'zgh'
  this.girl = [1, 2, 3, 4, 5]
}
function Child() {
  this.age = 20
}

Child.prototype = new Parent()

let demo = new Child()
console.log(demo.age)
console.log(demo.name)
```

但是这种方式存在一些问题，如下更改`demo1`后`demo2`也随着改变了，因为这两个实例使用的是同一个原型对象

```js
let demo1 = new Child()
let demo2 = new Child()
demo1.girl.push(6)
console.log(demo1.girl) // [1, 2, 3, 4, 5, 6]
console.log(demo2.girl) // [1, 2, 3, 4, 5, 6]
```

### 实例继承

### 拷贝继承

原型`prototype`机制或`apply`和`call`方法去实现较简单，建议使用构造函数与原型混合方式。
