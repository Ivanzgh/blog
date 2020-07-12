# 面向对象

## new的过程
new一个对象：
```js
function Person(name,age) {
    this.name = name
    this.age = age 
}
let person = new Person('zgh',23)
```
1、创建一个空对象obj
```js
var obj = new Object();
```

2、使用call将构造函数Person中的this指向刚创建的obj对象
```js
var result = Person.call(obj);
```

3、设置原型链，将创建的obj的__proto__指向构造函数Person的prototype
```js
obj.__proto__ = Person.prototype;
```

4、判断Person的返回值类型，如果是值类型，返回obj。如果是引用类型，则返回这个引用类型的对象。


## 创建对象的方式

### 直接创建

```js
var obj = {
    name : 'zgh',
    age : 23
}
```

### new

```js
var obj = new Object()
obj.name = 'zgh'
obj.age = 23
```

### 工厂模式
工厂模式解决了重复实例化多个对象的问题
```js
 function createObj(name,age) {
    let obj = new Object()
    obj.name = name
    obj.age = age 
    return obj
}
let person1 = createObj('zgh',23)
let person2 = createObj('hxj',22)
console.log(person1,person2);
```

### 构造函数模式

```js
function createObj(name,age) {
    this.name = name 
    this.age = age 
}
let person1 = new createObj('zgh',23)
let person2 = new createObj('hxj',22)
console.log(person1,person2);
```

### 原型模式

```js
function Person() {}

Person.prototype.name = 'zgh'
Person.prototype.age = 23
console.log(Person.prototype);  // {name: "zgh", age: 23, constructor: ƒ}
    
let person1 = new Person()  //创建一个实例person1
console.log(person1.name);  // zgh
```

### 混合模式（构造函数模式+原型模式）
构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性

```js
function Person(name,age) {
    this.name = name 
    this.age = age 
}
Person.prototype = {
    //每个函数都有prototype属性，指向该函数原型对象，原型对象都有constructor属性，这是一个指向prototype属性所在函数的指针
    constructor : Person,
    say: function() {
        console.log(this.name);
    }
}
let person1 = new Person('zgh',23)
let person2 = new Person('hxj',22)
console.log(person1,person2);
```

可以看出，混合模式共享着对相同方法的引用，又保证了每个实例有自己的私有属性。最大限度的节省了内存

## 继承
### 构造继承
 
### 原型继承
 
### 实例继承
 
### 拷贝继承

原型prototype机制或apply和call方法去实现较简单，建议使用构造函数与原型混合方式。
 ```js
function Parent() {
    this.name = 'zgh'
}
function Child() {
    this.age = 20
}
//通过原型,继承了Parent
Child.prototype = new Parent()
let demo = new Child()
console.log(demo.age);
console.log(demo.name);
 ```