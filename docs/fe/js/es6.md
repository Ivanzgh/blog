# ES6

## 简介

- ES6 是 ECMA 为 JavaScript 制定的第 6 个标准版本
- ECMAscript 2015 是在 2015 年 6 月发布 ES6 的第一个版本。以此类推，ECMAscript 2016 是 ES6 的第二个版本，也叫 ES7、ES2016。
- ES6 是一个泛指，含义是 5.1 版本以后的 JavaScript 下一代标准。

## let 和 const

### let

用来声明变量，**只在`let`命令所在的代码块内有效**，即[块级作用域](https://ivanzgh.github.io/blog/fe/base/js.html#%E5%9D%97%E7%BA%A7%E4%BD%9C%E7%94%A8%E5%9F%9F)。不存在变量提升，不允许重复声明

```js
function varTest() {
  var a = 1;
  if (true) {
    var a = 2;
    console.log(a); // 2
  }
  console.log(a); // 2
}

function letTest() {
  console.log(b); // ReferenceError: b is not defined
  let b = 1;
  // let b = 2; // Uncaught SyntaxError: Identifier 'b' has already been declared
  if (true) {
    let b = 2;
    console.log(b); // 2
  }
  console.log(b); // 1
}
```

在`letTest()`的 if 语句中，可以再次声明变量 b，是因为变量 b 只在这个 if 语句中有效。
如果在 if 语句中使用`var`声明变量 b，会报错

let 很适合在 for 循环时声明索引变量

### const

`const`声明一个只读的常量，必须初始化赋值。一旦声明，常量的值就不能改变，只在声明所在的块级作用域内有效。
不存在变量提升，不允许重复声明。**复杂类型(数组、对象等)指针指向的地址不能更改，内部数据可以更改**

```js
const a = '123';
a = '234'; // TypeError: Assignment to constant letiable

const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // [1,2,3,4]
arr = [];
console.log(arr); // 改变数组的指向会出错 Uncaught TypeError: Assignment to constant letiable
```

::: warning
let 和 const 声明的全局变量不属于顶层对象的属性，只存在于块级作用域中

```js
let a = 1;
const b = 2;
console.log(window.a); // undefined
console.log(window.b); // undefined
```

:::

<https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/133>

## 模板字符串

模板字符串（templatestring）是增强版的字符串，用反引号\`标识，嵌入的变量名写在`${}`之中。

第一个用途，基本的字符串格式化。

```js
const name = 'world';
// ES5
console.log('hello' + name);
// ES6
console.log(`hello${name}`);
```

第二个用途，做多行字符串或者字符串一行行拼接。

```js
// ES5
let a =
  'Hi \
    Girl!';
// ES6
let say = `<div>
        <p>hello, world</p>
    </div>`;
```

ES6 还提供了一些字符串方法，如下：

```js
// 1.includes：判断是否包含参数字符串，返回布尔值
const str = 'welcome';
console.log(str.includes('e')); // true

// 2.repeat: 获取字符串重复n次
const str = 'he';
console.log(str.repeat(3)); // 'hehehe'
// 如果带入小数, Math.floor(num) 来处理
// s.repeat(3.1) 或者 s.repeat(3.9) 都当做 s.repeat(3) 来处理

// 3. startsWith 和 endsWith 判断是否以给定文本开始或者结束
const str = 'hello world!';
console.log(str.startsWith('hello')); // true
console.log(str.endsWith('!')); // true
```

## 解构赋值

### 数组的解构赋值

可以从数组中提取值，按照对应位置，对变量赋值。这种写法属**模式匹配**，只要等号两边的模式相同，左边的变量就会被赋予对应的值

```js
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3
```

**注意细节:**

1、左右结构不同

```js
let [a, b, c, d] = [1, 2, 3];
console.log(a, b, c, d); // 1 2 3 undefined
```

2、跳过部分

```js
let [a, , c] = [1, 2, 3];
console.log(a, c); // 1 3
```

3、默认值

```js
let [a, b, c, d = 666] = [1, 2, 3];
console.log(a, b, c, d); // 1 2 3 666

let [a = 11, b = 22, c, d = 666] = [];
console.log(a, b, c, d); // 11 22 undefined 666
```

4、嵌套

```js
let [a, b, c] = [1, 2, [3]];
console.log(a, b, c); // 1 2 [3]

let [a, b, [c]] = [1, 2, [3]];
console.log(a, b, c); // 1 2 3
```

5、数组的对象解构

```js
const str = '23,zgh,boy';
// { 数组下标: 变量名 }
const { 1: name, 2: sex, 0: age } = str.split(',');
console.log(name, sex, age); // zgh boy 23
```

### 对象的解构赋值

```js
let { name, age } = { name: 'zgh', age: 22 };
console.log(name, age); // zgh 22
```

::: tip 对象与数组解构的不同点

- 数组的元素是按次序排列的，变量的取值由它的位置决定
- 对象的属性没有次序，变量必须与属性同名，才能取到正确的值

:::

### 函数参数的解构赋值

```js
let f = ([a, b]) => a + b;
f([1, 2]); // 3
```

上述代码可将数组`[1, 2]`看作一个参数`param`，即`param = [1, 2]`

## 函数扩展

### 为函数的参数设置默认值

可以给函数的参数设置默认值，如果不指定该函数的参数值，就会使用默认参数值

```js
function Person(name = 'zgh', num = 22) {
  const name = name || 'zgh';
  const num = num || 22;
}
Person();
Person('Jack', 20);
```

如果没有设置默认值，调用时 num 传入 0，0 为 false，那么例子中的 num 结果就为 22 而不是 0

### 箭头函数

#### ES6 允许使用“箭头”（=>）定义函数

```js
//1.不带参数
let sum = () => 1 + 2;
//等同于
let sum = function () {
  return 1 + 2;
};

//2.带一个参数
let sum = (a) => a;
//等同于
let sum = function (a) {
  return a;
};

//3.带多个参数,需要使用小括号将参数括起来
let sum = (a, b) => a + b;
//等同于
let sum = function (a, b) {
  return a + b;
};

//4.代码块部分多于一条语句需要用大括号将其括起来，并且使用return语句返回。
let sum = (a, b) => {
  let c = a + b;
  return c;
};

//5.返回对象，就必须用小括号把该对象括起来
let person = (name) => ({ name: 'zgh', age: 22 });
//等同于
let person = function (name) {
  return { name: 'zgh', age: 22 };
};
```

#### 箭头函数的 this 指向

箭头函数本身是没有`this`和`arguments`的，在箭头函数中引用 this 实际上是调用的是定义时的父执行上下文的 this。简单对象（非函数）是没有执行上下文的。

- 使用`call，apply，bind`都不能改变 this 指向
- 箭头函数没有原型属性`prototype`
- 不能用作构造函数，即 new 指令

```js
let obj = {
  say() {
    let f1 = () => console.log(this);
    f1();
  }
};
let rs = obj.say;
rs(); // f1执行时，say函数指向window，所以f1中的this指向window
obj.say(); // f1执行时，say函数指向obj，所以f1中的this指向obj

// 下面写法错误！
let Person = (name) => {
  this.name = name;
};
```

## 对象扩展

### 对象简写

- 属性的简写

条件：属性的值是一个变量，且变量名称和键名是一致的

```js
let name = 'zgh';
let age = 22;

// ES5写法
let obj = { name: name, age: age };

// ES6写法
let obj = { name, age };
```

- 方法的简写

```js
// ES5写法
let obj = {
  hello: function () {
    console.log('hello');
  }
};

// ES6写法
let obj = {
  hello() {
    console.log('hello');
  }
};
```

## Map

类似于对象，可以用来存储键值对的集合

```js
// 创建一个Map对象
let myMap = new Map();

// 添加键值对
myMap.set('a', 'hello');
myMap.set([1, 2, 3], { name: 'zgh' });

// 也可以在声明时就添加键值对，二维数组
const user = new Map([
  ['foo', 'zgh'],
  ['baz', 23]
]);

// 查看集合中元素的数量
myMap.size;

// 获取相应的键值
myMap.get('a');

// 删除一个键值对
myMap.delete('a');

// 判断该键值对是否存在
myMap.has('a');

// 删除集合中所有的键值对
myMap.clear();

// 可以遍历
myMap.forEach((value, key) => {
  console.log(key + ': ' + value);
});
```

### Map 和 Object 有什么不同?

- 二者都属于键值对结构
- Object 中的键名只能是`String`或者`Symbol`类型，而 Map 的键可以是任意值
- Object 可以从原型链继承属性和方法，而 Map 不具备继承性

### Map 的使用场景

1、**缓存**

Map 可以用来缓存一些计算结果，避免重复计算。比如缓存斐波那契数列的结果

```js
const fibCache = new Map();
function fibonacci(n) {
  if (n < 2) {
    return n;
  }
  if (fibCache.has(n)) {
    return fibCache.get(n);
  }
  const result = fibonacci(n - 1) + fibonacci(n - 2);
  fibCache.set(n, result);
  return result;
}

console.log(fibonacci(6)); // 8
```

2、**数据结构**

Map 可以用作一些数据结构的基础，比如字典、哈希表等。例如实现哈希表时，可以使用 Map 来存储键值对

```js
class HashTable {
  constructor() {
    this.table = new Map();
  }

  put(key, value) {
    this.table.set(key, value);
  }

  get(key) {
    return this.table.get(key);
  }

  remove(key) {
    this.table.delete(key);
  }
}

const hashObj = new HashTable();
hashObj.put('a', 1);
console.log(hashObj.get('a'));
console.log(hashObj);
```

3、**状态管理**

Map 可以用于管理应用程序的状态。例如在 React 中，可以使用 Map 来存储组件的状态（这里只是例子，在 React 中实际上不要这么做！）

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = new Map([['count', 0]]);
  }

  increment() {
    this.setState((state) => {
      let count = state.get('count') + 1;
      return new Map([['count', count]]);
    });
  }

  render() {
    return (
      <div>
        Count: {this.state.get('count')}
        <button onClick={() => this.increment()}>Increment</button>
      </div>
    );
  }
}
```

### 关于 Map 的编程题

1、编写一个函数，接受一个数组作为参数，返回一个 Map，其中键为数组中的元素，值为元素在数组中出现的次数。例如：

```js
countOccurrences([1, 2, 3, 2, 3, 3]); // Map { 1 => 1, 2 => 2, 3 => 3 }
```

2、编写一个函数，接受一个 Map 作为参数，返回一个由 Map 的键值对颠倒后的新 Map。例如：

```js
invertMap(
  new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3]
  ])
); // Map { 1 => 'a', 2 => 'b', 3 => 'c' }
```

3、编写一个函数，接受两个 Map 作为参数，返回一个新 Map，其中包含两个 Map 的所有键值对。例如：

```js
mergeMaps(
  new Map([
    ['a', 1],
    ['b', 2]
  ]),
  new Map([
    ['c', 3],
    ['d', 4]
  ])
); // Map { 'a' => 1, 'b' => 2, 'c' => 3, 'd' => 4 }
```

4、编写一个函数，接受一个 Map 作为参数，返回一个新 Map，其中包含原始 Map 中所有值大于 10 的键值对。例如：

```js
filterMap(
  new Map([
    ['a', 5],
    ['b', 10],
    ['c', 15]
  ])
); // Map { 'c' => 15 }
```

5、编写一个函数，接受一个 Map 作为参数，返回一个新 Map，其中包含原始 Map 中所有键值对的值的平方。例如：

```js
mapValues(
  new Map([
    ['a', 2],
    ['b', 3],
    ['c', 4]
  ])
); // Map { 'a' => 4, 'b' => 9, 'c' => 16 }
```

6、编写一个函数，接受一个 Map 作为参数，返回一个新 Map，其中包含原始 Map 中所有键值对的值的和。例如：

```js
sumValues(
  new Map([
    ['a', 2],
    ['b', 3],
    ['c', 4]
  ])
); // 9
```

7、编写一个函数，接受一个 Map 作为参数，返回一个新 Map，其中包含原始 Map 中所有键值对的键和值的乘积。例如：

```js
multiplyKeysAndValues(
  new Map([
    ['a', 2],
    ['b', 3],
    ['c', 4]
  ])
); // Map { 'a' => 2, 'b' => 6, 'c' => 12 }
```

8、编写一个函数，接受两个 Map 作为参数，返回一个新 Map，其中包含原始 Map1 中所有键值对的键和 Map2 中对应键的值的乘积。例如：

```js
multiplyMaps(
  new Map([
    ['a', 2],
    ['b', 3],
    ['c', 4]
  ]),
  new Map([
    ['a', 10],
    ['c', 20]
  ])
); // Map { 'a' => 20, 'c' => 80 }
```

9、编写一个函数，接受一个 Map 和一个回调函数作为参数，对于 Map 中的每个键值对，使用回调函数将键和值进行操作，并返回一个新 Map。例如：

```js
mapMapValues(
  new Map([
    ['a', 2],
    ['b', 3],
    ['c', 4]
  ]),
  (key, value) => [key.toUpperCase(), value * 2]
); // Map { 'A' => 4, 'B' => 6, 'C' => 8 }
```

10、编写一个函数，接受一个 Map 和一个数组作为参数，将数组中的元素作为键，Map 中对应键的值作为值，返回一个新的 Map。例如：

```js
mapFromArray(
  new Map([
    ['a', 2],
    ['b', 3],
    ['c', 4]
  ]),
  ['a', 'c']
); // Map { 'a' => 2, 'c' => 4 }
```

## WeakMap

## Set

`Set`对象是一组不重复的、无序的值的集合，可以往里面添加、删除、查询数据。

`Set`本身是一个构造函数，用来生成`Set`数据结构

`Set()`接受具有`iterable`可迭代接口的数据结构作为参数，如数组、类数组、字符串等。
不能接受对象结构，否则报错`Uncaught TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))`

```js
// 声明一个Set对象
let mySet = new Set();
let mySet2 = new Set([1, 2, 3]);

// 添加元素
mySet.add(1);
mySet.add('hi');
mySet.add([2, 'hello']);

// 判断集合中是否存在一个元素1
mySet.has(1); // true

// 删除集合中的字符串
mySet.delete('hi');

// 获取集合中元素的数量
mySet.size; // 3

// 遍历
mySet.forEach((item) => console.log(item));

// 删除集合中所有的元素
mySet.clear();

// 两个对象是不相等的
const set2 = new Set();
set2.add({});
set2.size; // 1
set2.add({});
set2.size; // 2
```

遍历操作

```js
let mySet = new Set(['a', 'b', 'c']);

// entries()返回的遍历器同时包括键名和键值，二者一样
for (let i of mySet.entries()) {
  console.log(i);
}
// ["a", "a"]
// ["b", "b"]
// ["c", "c"]

// keys()返回键名
for (let i of mySet.keys()) {
  console.log(i);
}
// 'a'
// 'b'
// 'c'

// values()返回键值，结果同keys()
for (let i of mySet.values()) {
  console.log(i);
}
```

`Set`只存储唯一值，可用来数组去重

```js
let arr = [1, 1, 2, 2, 3, 3];
let res1 = [...new Set(arr)]; // [1, 2, 3]

// 或者使用 Array.from()
let res2 = Array.from(new Set(arr)); // [1, 2, 3]
```

也可以用来字符串去重

```js
const str = [...new Set('ababbc')].join('');
console.log(str); // 'abc'
```

## WeakSet

### 使用场景

### WeakSet 和 Set 的区别

## 扩展操作符

`...`可以叫做 spread（扩展）或者 rest（剩余）操作符

剩余运算符一般会用在函数的参数里面。比如想让一个函数支持更多的参数，参数的数量不受限制，这个时候就可以使用剩余操作符

```js
function Name(x, y, ...z) {
  console.log(x); // a
  console.log(y); // b
  console.log(z); // ["c", "d", "e"]
}
Name('a', 'b', 'c', 'd', 'e');
```

剩余操作符后面的变量会变成一个数组，多余的参数会被放入这个数组中

扩展运算符用在数组的前面，作用就是将这个数组展开

```js
const arr1 = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['f', 'g'];
const arr3 = [...arr1, ...arr2]; // ["a", "b", "c", "d", "e", "f", "g"]

// 等同于concat
const arr4 = arr1.concat(arr2);
```

展开对象：

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // {a: 1, b: 2, c: 3}

const obj3 = { a: 1, b: 2, c: 3 };
const { a, ...x } = obj3;
console.log(a); // 1
console.log(x); // {b: 2, c: 3}
```

使用扩展运算符展开一个新的对象，第二个对象的属性值会覆盖第一个对象的同名属性值

```js
const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { b: 30, c: 40, d: 50 };
const merged = { ...obj1, ...obj2 }; // {a: 1, b: 30, c: 40, d: 50}
```

## Class

通过 `class` 关键字，可以定义**类**。class 可以看作只是一个**语法糖**，
它的绝大部分功能，ES5 都可以做到，新的 class 写法让对象原型的写法更加清晰、更像面向对象编程的语法

```js
// ES5 中使用面向对象
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.say = function () {
    console.log('hello');
  };
}
let obj = new Person('zgh', 22);
obj.say();

// ES6 中使用面向对象
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    console.log('hello');
  }
}
let obj = new Person('zgh', 22);
obj.say();
```

上面代码定义了一个**类**，里面有一个`constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。即 ES5 的构造函数 `Person`，
对应 ES6 的 `Person` 类的构造方法。

Person 类除了构造方法，还定义了一个`say`方法。注意，定义“类”的方法的时候，前面不需要加上`function`这个关键字，直接把函数定义放进去了就可以了。
另外，方法之间不需要逗号分隔，否则会报错。

```js
function Foo() {}
Foo.prototype.constructor === Foo; // true

const fo = new Foo();
fo.constructor === Foo; // true
```

`Foo.prototype`默认有一个公有且不可枚举的`construetor`属性，这个属性引用的是对象关联的函数（上例中是 Foo）。
**构造函数**调用`new Foo()`创建的对象在`__proto__`上也有`construetor`属性，指向**创建这个对象的函数**

<https://segmentfault.com/a/1190000023516545>

### Class 继承

```js
class NBAPlayer {
  constructor(name, age, height) {
    this.name = name;
    this.age = age;
    this.height = height;
  }
  say() {
    console.log(`我是${this.name},${this.age}岁,身高${this.height}cm`);
  }
}
class MVP extends NBAPlayer {
  constructor(name, age, height, year) {
    super(name, age, height);
    this.year = year;
  }
  showMVP() {
    console.log(`我是${this.name},在${this.year}获得MVP!`);
  }
}
let r1 = new NBAPlayer('Jack', '39', '198');
r1.say();
let r2 = new MVP('Jack', '39', '198', '2010');
r2.showMVP();
```

`extends`关键字用于实现类之间的继承。子类继承父类的所有属性和方法，使用`super`可以调用父类的方法。

### 静态方法、静态属性

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前加上`static`关键字，则这个方法**不会被实例继承**，
而是直接通过类来调用，这就是静态方法。

```js
class Foo {
  static f() {
    return '666';
  }
}
Foo.f(); // '666'
let person = new Foo();
person.f(); // TypeError: person.f is not a function
```

父类的静态方法**可以被子类继承**

```js
class Foo {
  static f() {
    return '666';
  }
}

class Bar extends Foo {}
Bar.f(); // "666"
```

静态方法也可以被`super`对象调用

```js
class Foo {
  static f() {
    return '666';
  }
}
class Bar extends Foo {
  static g() {
    return super.f();
  }
}
Bar.g(); // "666"
```

#### 类的静态属性

```js
// es6写法
class Foo {}
Foo.prop = 1;

// es7写法，推荐这一种写法
class Bar {
  static prop = 1;
  constructor() {
    console.log(Bar.prop);
  }
}
```

#### 类的实例属性

类的实例属性可以用等式，写入类的定义之中

```js
class Foo {
  state = { value: 1 };
  constructor() {
    console.log(this.state.value); // 1
  }
}
```

再看看 react 类组件写法，以前定义类的实例属性只能在`constructor`里面，现在可以写在外面

```js
class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  modalRef = null;
}
```

## Proxy

外界对目标对象的访问可以被 Proxy 拦截，进行过滤和改写，意为“代理器”

```js
let proxy = new Proxy(target, handler);
```

- target 目标对象
- handler 配置对象

在 ES6 之前，我们可以使用`Object.defineProperty`去保护对象的私有属性。例如:

```js
let sign = { _appid: '12345678', _appkey: '666', desc: 'zgh的密钥' };

Object.defineProperties(sign, {
  _appid: {
    writable: false
  },
  _appkey: {
    writable: false
  }
});
```

但是如果想对多个属性进行保护，就得对多个属性进行声明`writable: false`，显然很麻烦，这时就可以用 Proxy 来解决这个问题

Proxy 意味着我们代理了这个对象，该对象所有的属性操作都会经过 Proxy

```js
let sign = { _appid: '123456', _appkey: '666', desc: 'zgh的密钥' };
let signProxy = new Proxy(sign, {
  get(target, property, receiver) {
    return target[property];
  },
  set(target, propName, value, receiver) {
    if (propName !== 'desc') {
      console.log('该属性是私有属性，不允许修改!');
    } else {
      target[propName] = value;
    }
  }
});
console.log(signProxy._appid); // "123456"
signProxy._appkey = 'dd'; // 该属性是私有属性，不允许修改!
console.log(signProxy._appkey); // "666"
```

这时依然可以直接修改 sign 对象，如果希望对象完全不可修改，可以直接将 sign 写到 Proxy 的 target

**应用场景:**

- 数据校检
- 属性保护

### 示例

#### 数据类型验证

有一个记账的对象，记录着用户的存款金额，为了方便以后计算，要保证存入的数据类型必须为`Number`

```js
let account = { num: 8888 };

let proxyAccount = new Proxy(account, {
  get(target, property) {
    return target[property];
  },
  set(target, propName, propValue) {
    if (propName === 'num' && typeof propValue != 'number') {
      throw new TypeError('The num is not an number');
    }
    target[propName] = propValue;
  }
});

proxyAccount.num = '666';
console.log(proxyAccount.num); // Uncaught TypeError: The num is not an number
```

## 空值合并运算符

写法：`a ?? b`，如果第一个参数是`null/undefined`，则`??`返回第一个参数，否则返回第二个参数。
效果等同于`(a !== null && a !== undefined) ? a : b`

```js
let a;
let b = a ?? 1; // 1
```

- `??`运算符的优先级非常低，仅略高于 `?` 和 `=`，使用时要考虑是否添加括号
- 如果没有明确添加括号，不能将其与`||`或`&&`一起使用

### 与`||`的区别

- `||` 返回第一个真值，`??` 返回第一个已定义的值
- `||` 无法区分 `false`、`0`、空字符串`""`、`NaN`和`null/undefined`

```js
let a = 0;
a || 1; // 1
a ?? 1; // 0
```

### 补充：双感叹号!!

双感叹号确保结果类型是布尔类型

```js
!0; // true

!undefined; // true

!null; // true

!''; // true

!!0; // false

!!undefined; // false

!!null; // false

!!''; // false
```

## 可选链和双问号

当位于 `?.` 前面的值为 `undefined` 或 `null` 时，会立即阻止代码的执行，并返回 `undefined`

```js
const obj = { name: 'zgh' };
obj?.a;
```

可选链的三种形式：

- `obj?.pron`
- `obj?.[pron]`
- `obj.method?.()`

假设有表达式为：`left ?? right`

- 当 left 是：0、''、false，会返回 left 的值
- 当 left 是 null、undefined，会返回 right 的值

`||`与双问号的区别是：当 left 是 0、''、false 时，会返回 right 的值

## 逻辑运算符和赋值运算符

### &&=

`x &&= y`等价于：`x && (x = y)`，当 x 为真时，`x = y`

### ||=

`x ||= y`等价于：`x || (x = y)`，仅在 x 为 false 的时候，`x = y`

### ??=

`x ??= y` 等价于 `x ?? (x = y)`，仅在 x 为 null 或 undefined 的时候，x = y
