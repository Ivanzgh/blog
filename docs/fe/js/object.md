# object

## Object.assign()
`Object.assign(target, ...sources)`方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，并返回目标对象。
简单说就是通过复制一个或多个对象来创建一个新的对象
```js
let obj1 = {
    a: 1,
    b: 2,
    c: 3
};
let obj2 = {
    d: 4,
    e: 5,
    c: 6
};
Object.assign(obj2, obj1);
console.log(obj2);   // {d: 4, e: 5, c: 3, a: 1, b: 2}
```
如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。如例子中的 obj2.c 值由6被覆盖为3

::: warning
`Object.assign`不会在source对象值为 `null` 或 `undefined` 的时候抛出错误。
:::


## Object.defineProperty()
`Object.defineProperty(obj, prop, descriptor)`方法会直接在一个对象上定义一个新属性或者修改现有属性，并返回此对象。
`obj`表示要定义属性的对象，`prop`表示要定义或修改的属性名称或`Symbol`，`descriptor`表示属性描述符。

属性描述符有**数据描述符**和**存取描述符**两种，不能同时使用。二者都有以下可选键值：
* `configurable`，表示对象的属性是否可以被删除，以及除`value`和`writable`特性外的其他特性是否可以被修改，默认`false`
* `enumerable`，表示对象的属性是否可以在`for...in`循环和`Object.keys()`中被枚举，默认`false`

**数据描述符**
+ `value`，表示该属性对应的值，默认`undefined`
+ `writable`,表示是否可写，默认`false`
```js
let o = {}; 
Object.defineProperty(o, 'a', {
    value: 37,
    writable: false,
    enumerable : true,
    configurable : true
});
console.log(o.a);   // 37
o.a = 25;
console.log(o.a)    // 37
```

**存取描述符**
+ `get`，表示属性的getter函数，当访问该属性时会被调用
+ `set`,表示属性的setter函数，当属性值被修改时会被调用
```js
let obj = {
    a: 1
};
let num = 2;
Object.defineProperty(obj, 'count', {
    get() {
        return this.a + num
    },
    set(v) {
        num = v
    },
    enumerable : true,
    configurable : true
});
console.log(obj.count);     // 3
obj.count = 3;
console.log(num);       // 3
console.log(obj.count);     // 4
```
## Object.defineProperties()
给对象添加多个属性并分别指定它们的配置
```js
let obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  // etc. etc.
});
```




## getter和setter
从ES5开始提供了`getter`和`setter`，可以将属性值的获取和设置分别绑定到方法上，称之为“存取器”。

### 简单的getter和setter
```js
let obj = {
    a: 1,
    get val() {
        return this.a + 1;
    },
    set val(value) {
        this.a = value
    }
};

console.log(obj.val); // 2
obj.val = 100;
console.log(obj.val);  // 101
```
第一次获取`obj.val`的值为2，接着给a赋值100，然后第二次获取就是100+1，即101。
注意不要使用`obj.val()`，否则报错`Uncaught TypeError: obj.val is not a function`

### 使用`Object.defineProperty(obj, prop, descriptor)`
`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性或者修改现有属性，并返回此对象。
```js
let obj = {
    a: 1
};
Object.defineProperty(obj, 'count', {
    get() {
        return this.a
    },
    set(v) {
        this.a = v
    }
});
console.log(obj.count);      // 1
obj.count = 3;
console.log(obj.count);      // 3
```

### class
ES6增加了`class`类的概念，在其中的setter和getter使用如下：
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
const res = new Obj(6);
console.log(res.val);       // 6
res.val = 8;
console.log(res.val);       // 8
```