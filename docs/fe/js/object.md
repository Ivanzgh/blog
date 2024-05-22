# 对象

## 创建对象的方式

### 1、直接创建

```js
const obj = { name: 'zgh', age: 23 };
```

创建一个纯对象，不会继承 Object 的属性和方法，如 constructor、valueOf 等

```js
const obj = Object.create(null);
```

### 2、new Object()

```js
let obj = new Object();
obj.name = 'zgh';
obj.age = 23;
```

### 3、工厂模式

工厂模式解决了重复实例化多个对象的问题

```js
function createObj(name, age) {
  let obj = new Object();
  obj.name = name;
  obj.age = age;
  return obj;
}
let person1 = createObj('zgh', 23);
let person2 = createObj('lrx', 22);
```

### 4、构造函数模式

```js
function createObj(name, age) {
  this.name = name;
  this.age = age;
}
let person1 = new createObj('zgh', 23);
let person2 = new createObj('lrx', 22);
console.log(person1, person2);
```

### 5、原型模式

```js
function Person() {}

Person.prototype.name = 'zgh';
Person.prototype.age = 23;
console.log(Person.prototype); // {name: "zgh", age: 23, constructor: ƒ}

let person1 = new Person(); // 创建一个实例 person1
console.log(person1.name); // zgh
```

### 6、混合模式（构造函数模式+原型模式）

构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype = {
  // 每个函数都有prototype属性，指向该函数原型对象，原型对象都有constructor属性，这是一个指向prototype属性所在函数的指针
  constructor: Person,
  say: function () {
    console.log(this.name);
  }
};
let person1 = new Person('zgh', 23);
let person2 = new Person('lrx', 22);
console.log(person1, person2);
```

可以看出，混合模式共享着对相同方法的引用，又保证了每个实例有自己的私有属性。最大限度的节省了内存

## Object.create()

`Object.create()`以一个现有对象作为原型，创建一个新对象。参数接收：`Object`、`null`

```js
const user = {
  age: 24,
  say() {
    console.log(`My name is ${this.name}. ${this.age} years old`);
  }
};

const me = Object.create(user);
me.name = 'zgh';
me.age = 23;
me.say(); // My name is zgh. 23 years old
```

创建一个新对象`{name: "zgh", age: 23}`，在这个对象的`__proto__`上有 `user` 对象

## valueOf

valueOf()方法通常由 js 在后台自动调用，不会显式的出现在代码里

```js
const obj = {
  i: 1,
  valueOf: function () {
    if (this.i === 1) {
      this.i++;
      return 1;
    } else {
      return 2;
    }
  }
};
if (obj == 1 && obj == 2) {
  console.log(obj);
}
```

这段代码会执行，此时 obj.i 的值为 2

## 空对象判断

1. `Object.getOwnPropertyNames()`，返回对象中属性名称组成的数组

2. `Object.keys()`，返回对象中属性名称组成的数组

3. 转为 json 字符串

```js
let obj = {};
Object.getOwnPropertyNames(obj).length === 0; // true

Object.keys(obj).length === 0; // true

JSON.stringify({}) === '{}'; // true
```

## Object.keys()

返回对象中属性名称组成的数组。`Object.keys()` 只会返回对象自身的可枚举属性名，而不会返回对象从原型链继承的属性名。

```js
const obj = { a: 1, b: 2 };
Object.keys(obj); // ['a', 'b']
```

## Object.values()

返回对象中属性的值组成的数组

```js
const obj = { a: 1, b: 2 };
Object.values(obj); // [1, 2]
```

## Object.assign()

`Object.assign(target, ...sources)`方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，并返回目标对象。
简单说就是通过复制一个或多个对象来创建一个新的对象

```js
let obj1 = { a: 1, b: 2, c: 3 };
let obj2 = { d: 4, e: 5, c: 6 };
Object.assign(obj2, obj1);
console.log(obj2); // {d: 4, e: 5, c: 3, a: 1, b: 2}
```

如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。如例子中的 `obj2.c` 值由 6 被覆盖为 3

```js
let obj1 = { name: 'zgh', age: 22 };
let obj2 = { address: 'beijing' };
let obj = {};
Object.assign(obj, obj1, obj2);
console.log(obj); // {name: "zgh", age: 22, address: "beijing"}
```

当`Object.assign()`方法用于数组时

```js
let arr11 = Object.assign([1, 2, 3], [4, 5]);
console.log(arr11); // [4, 5, 3]

// 说明:对象是根据属性名来对应，数组是根据索引号来对应，相当于
let arr23 = { 0: 1, 1: 2, 2: 3 }; //相同的属性名有0、1，后面的覆盖前面的
```

assign 实现了浅复制，会把原型上的属性也复制了，但是不能复制继承的属性

::: warning
`Object.assign`不会在 source 对象值为 `null` 或 `undefined` 的时候抛出错误。
:::

## hasOwnProperty()

返回一个布尔值，表示一个对象自己是否拥有指定的属性，而不是继承的，不会检查对象原型链中的属性。
即使属性值是`null`或`undefined`，也会返回`true`

```js
const user = { age: 24 };
const me = Object.create(user);
me.name = 'zgh';
me.p1 = null;
me.p2 = undefined;

console.log(me.hasOwnProperty('name')); // true
console.log(me.hasOwnProperty('age')); // false
console.log(me.hasOwnProperty('p1')); // true
console.log(me.hasOwnProperty('p2')); // true
```

判断对象是否包含特定属性，除了使用 hasOwnProperty 方法，还能使用 in 运算符

```js
const obj = { a: 1, b: 2, c: 3 };
const val = 'b';

if (val in obj) {
  console.log(`对象包含属性 ${val}`);
} else {
  console.log(`对象不包含属性 ${val}`);
}
```

in 运算符会检查对象的整个原型链，而 hasOwnProperty 方法只会检查对象本身的属性

## Object.getPrototypeOf()

获取对象的原型

```js
const proto = {};
const obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true
```

## Object.setPrototypeOf()

设置对象的原型

```js
const obj = { a: 1 };
Object.setPrototypeOf(obj, { b: 2 });
```

## Object.defineProperty()

`Object.defineProperty(obj, prop, descriptor)`方法会直接在一个对象上定义一个新属性或者修改现有属性，并返回此对象。
`obj`表示要定义属性的对象，`prop`表示要定义或修改的属性名称或`Symbol`，`descriptor`表示属性描述符。

属性描述符有**数据描述符**和**存取描述符**两种，不能同时使用。二者都有以下可选键值：

- `configurable`，表示对象的属性是否可以被删除，以及除`value`和`writable`特性外的其他特性是否可以被修改，默认`false`
- `enumerable`，表示对象的属性是否可以在`for...in`循环和`Object.keys()`中被枚举，默认`false`

### 数据描述符

- `value`，表示该属性对应的值，默认`undefined`
- `writable`，表示是否可写，默认`false`

```js
let o = {};
Object.defineProperty(o, 'a', {
  value: 37,
  writable: false,
  enumerable: true,
  configurable: true
});
console.log(o.a); // 37
o.a = 25;
console.log(o.a); // 37
```

### 存取描述符

- `get`，表示属性的 getter 函数，当访问该属性时会被调用
- `set`，表示属性的 setter 函数，当属性值被修改时会被调用

```js
let obj = { a: 1 };
let num = 2;
Object.defineProperty(obj, 'count', {
  get() {
    return this.a + num;
  },
  set(v) {
    num = v;
  },
  enumerable: true,
  configurable: true
});
console.log(obj.count); // 3
obj.count = 3;
console.log(num); // 3
console.log(obj.count); // 4
```

## Object.defineProperties()

给对象添加多个属性并分别指定它们的配置

```js
let obj = {};
Object.defineProperties(obj, {
  property1: { value: true, writable: true },
  property2: { value: 'Hello', writable: false }
  // etc. etc.
});
```

## getter 和 setter

从 ES5 开始提供了`getter`和`setter`，可以将属性值的获取和设置分别绑定到方法上，称之为“存取器”。

### 简单的 getter 和 setter

```js
let obj = {
  a: 1,
  get val() {
    return this.a + 1;
  },
  set val(value) {
    this.a = value;
  }
};

console.log(obj.val); // 2
obj.val = 100;
console.log(obj.val); // 101
```

第一次获取`obj.val`的值为 2，接着给 a 赋值 100，然后第二次获取就是 100+1，即 101。
注意不要使用`obj.val()`，否则报错`Uncaught TypeError: obj.val is not a function`

### 在`Object.defineProperty()`中使用

`Object.defineProperty(obj, prop, descriptor)` 方法会直接在一个对象上定义一个新属性或者修改现有属性，并返回此对象。

```js
let obj = { a: 1 };
Object.defineProperty(obj, 'count', {
  get() {
    return this.a;
  },
  set(v) {
    this.a = v;
  }
});
console.log(obj.count); // 1
obj.count = 3;
console.log(obj.count); // 3
```

### 在 class 中使用

ES6 增加了`class`类的概念，在其中的 setter 和 getter 使用如下：

```js
class Obj {
  constructor(props) {
    this.num = props;
  }
  get val() {
    return this.num;
  }
  set val(v) {
    this.num = v;
  }
}
const res = new Obj(6);
console.log(res.val); // 6
res.val = 8;
console.log(res.val); // 8
```

## Object.entries()

返回一个给定对象自身可枚举属性的键值对数组

```js
const obj = { name: 'zgh', age: 23 };
const arr = Object.entries(obj);
console.log(arr); // [['name', 'zgh'], ['age',23]]
```

## Object.fromEntries()

将键值对数组转为对象

1、将 Map 转化为 Object:

```js
const entries = new Map([
  ['name', 'zgh'],
  ['age', 23]
]);

const obj = Object.fromEntries(entries);
console.log(obj); // { name: "zgh", age: 23 }
```

2、将 Array 转化为 Object:

```js
const arr = [
  ['0', 'a'],
  ['1', 'b'],
  ['2', 'c']
];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```
