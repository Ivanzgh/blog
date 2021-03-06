# Object

## Object.assign()

`Object.assign(target, ...sources)`方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，并返回目标对象。
简单说就是通过复制一个或多个对象来创建一个新的对象

```js
let obj1 = { a: 1, b: 2, c: 3 }
let obj2 = { d: 4, e: 5, c: 6 }
Object.assign(obj2, obj1)
console.log(obj2) // {d: 4, e: 5, c: 3, a: 1, b: 2}
```

如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。如例子中的 `obj2.c` 值由 6 被覆盖为 3

```js
let obj1 = {
  name: 'zgh',
  age: 22
}
let obj2 = {
  address: 'beijing'
}
let obj = {}
Object.assign(obj, obj1, obj2)
console.log(obj) // {name: "zgh", age: 22, address: "beijing"}
```

当`Object.assign()`方法用于数组时

```js
let arr11 = Object.assign([1, 2, 3], [4, 5])
console.log(arr11) //[4,5,3]

// 说明:对象是根据属性名来对应，数组是根据索引号来对应，相当于
let arr23 = {
  0: 1,
  1: 2,
  2: 3
} //相同的属性名有0、1，后面的覆盖前面的.
```

assign 实现了浅复制，会把原型上的属性也复制了，但是不能复制继承过来的属性

::: warning
`Object.assign`不会在 source 对象值为 `null` 或 `undefined` 的时候抛出错误。
:::

## Object.create()

`Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`

```js
const user = {
  age: 24,
  say() {
    console.log(`My name is ${this.name}. ${this.age} years old`)
  }
}

const me = Object.create(user)

me.name = 'zgh'
me.age = 23

me.say() // My name is zgh. 23 years old
```

创建一个新对象`{name: "zgh", age: 23}`，在这个对象的`__proto__`上有 `user` 对象

## hasOwnProperty()

返回一个布尔值，表示一个对象自己是否拥有指定的属性，而不是继承的，不会检查对象原型链中的属性。
即使属性值是`null`或`undefined`，也会返回`true`

```js
const user = {
  age: 24
}

const me = Object.create(user)
me.name = 'zgh'

me.p1 = null
me.p2 = undefined

console.log(me.hasOwnProperty('name')) // true
console.log(me.hasOwnProperty('age')) // false

console.log(me.hasOwnProperty('p1')) // true
console.log(me.hasOwnProperty('p2')) // true
```

## Object.getPrototypeOf()

获取对象的原型

```js
const proto = {}
const obj = Object.create(proto)
Object.getPrototypeOf(obj) === proto // true
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
let o = {}
Object.defineProperty(o, 'a', {
  value: 37,
  writable: false,
  enumerable: true,
  configurable: true
})
console.log(o.a) // 37
o.a = 25
console.log(o.a) // 37
```

### 存取描述符

- `get`，表示属性的 getter 函数，当访问该属性时会被调用
- `set`，表示属性的 setter 函数，当属性值被修改时会被调用

```js
let obj = {
  a: 1
}
let num = 2
Object.defineProperty(obj, 'count', {
  get() {
    return this.a + num
  },
  set(v) {
    num = v
  },
  enumerable: true,
  configurable: true
})
console.log(obj.count) // 3
obj.count = 3
console.log(num) // 3
console.log(obj.count) // 4
```

## Object.defineProperties()

给对象添加多个属性并分别指定它们的配置

```js
let obj = {}
Object.defineProperties(obj, {
  property1: {
    value: true,
    writable: true
  },
  property2: {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
})
```

## getter 和 setter

从 ES5 开始提供了`getter`和`setter`，可以将属性值的获取和设置分别绑定到方法上，称之为“存取器”。

### 简单的 getter 和 setter

```js
let obj = {
  a: 1,
  get val() {
    return this.a + 1
  },
  set val(value) {
    this.a = value
  }
}

console.log(obj.val) // 2
obj.val = 100
console.log(obj.val) // 101
```

第一次获取`obj.val`的值为 2，接着给 a 赋值 100，然后第二次获取就是 100+1，即 101。
注意不要使用`obj.val()`，否则报错`Uncaught TypeError: obj.val is not a function`

### 使用`Object.defineProperty(obj, prop, descriptor)`

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性或者修改现有属性，并返回此对象。

```js
let obj = {
  a: 1
}
Object.defineProperty(obj, 'count', {
  get() {
    return this.a
  },
  set(v) {
    this.a = v
  }
})
console.log(obj.count) // 1
obj.count = 3
console.log(obj.count) // 3
```

### class

ES6 增加了`class`类的概念，在其中的 setter 和 getter 使用如下：

```js
class Obj {
  constructor(props) {
    this.num = props
  }
  get val() {
    return this.num
  }
  set val(v) {
    this.num = v
  }
}
const res = new Obj(6)
console.log(res.val) // 6
res.val = 8
console.log(res.val) // 8
```
