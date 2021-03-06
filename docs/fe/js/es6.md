# ES6

## let 和 const

### let

用来声明变量，**只在`let`命令所在的代码块内有效**，即**块级作用域**。不存在变量提升，它所声明的变量一定要在声明后使用，不允许重复声明，否则报错。 举个例子：

```js
function varTest() {
  var a = 1
  if (true) {
    var a = 2
    console.log(a) // 2
  }
  console.log(a) // 2
}

function letTest() {
  console.log(b) // ReferenceError: b is not defined
  let b = 1
  // let b = 2; // Uncaught SyntaxError: Identifier 'b' has already been declared
  if (true) {
    let b = 2
    console.log(b) // 2
  }
  console.log(b) // 1
}
```

在`letTest()`的 if 语句中，可以再次声明变量 b，是因为变量 b 只在这个 if 语句中有效，即块级作用域，所以最后打印出来的是 1。
如果在 if 语句中使用`var`声明变量 b，会报错。`let`在 for 循环和 if 中使用是同规则的

### const

`const`声明一个只读的常量。一旦声明，常量的值就不能改变。必须立即初始化，不能留到后面赋值。只在声明所在的块级作用域内有效。
不存在变量提升，不允许重复声明。**复杂类型(数组、对象等)指针指向的地址不能更改，内部数据可以更改**

```js
const a = '123'
a = '234' // TypeError: Assignment to constant letiable.
const arr = [1, 2, 3]
arr.push(4)
console.log(arr) // [1,2,3,4]
arr = []
console.log(arr) // 改变数组的指向会出错 Uncaught TypeError: Assignment to constant letiable
```

::: warning
let 和 const 声明的全局变量不属于顶层对象的属性，只存在于块级作用域中

```js
let a = 1
const b = 2
console.log(window.a) // undefined
console.log(window.b) // undefined
```

:::

<https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/133>

## 模板字符串

模板字符串（templatestring）是增强版的字符串，用反引号\`标识，嵌入的变量名写在`${}`之中。

第一个用途，基本的字符串格式化。

```js
const name = 'world'
// ES5
console.log('hello' + name)
// ES6
console.log(`hello${name}`)
```

第二个用途，做多行字符串或者字符串一行行拼接。

```js
// ES5
let a =
  'Hi \
    Girl!'
// ES6
let say = `<div>
        <p>hello, world</p>
    </div>`
```

ES6 还提供了一些字符串方法，如下：

```js
// 1.includes：判断是否包含参数字符串，返回布尔值
const str = 'welcome'
console.log(str.includes('e')) // true

// 2.repeat: 获取字符串重复n次
const str = 'he'
console.log(str.repeat(3)) // 'hehehe'
//如果带入小数, Math.floor(num) 来处理
// s.repeat(3.1) 或者 s.repeat(3.9) 都当做 s.repeat(3) 来处理

// 3. startsWith 和 endsWith 判断是否以给定文本开始或者结束
const str = 'hello world!'
console.log(str.startsWith('hello')) // true
console.log(str.endsWith('!')) // true
```

## 解构赋值

### 数组的解构赋值

可以从数组中提取值，按照对应位置，对变量赋值。这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

```js
let [a, b, c] = [1, 2, 3]
console.log(a, b, c) // 1 2 3
```

**注意细节:**

1、左右结构不同

```js
let [a, b, c, d] = [1, 2, 3]
console.log(a, b, c, d) // 1 2 3 undefined
```

2、跳过部分

```js
let [a, , c] = [1, 2, 3]
console.log(a, c) // 1 3
```

3、默认值

```js
let [a, b, c, d = 666] = [1, 2, 3]
console.log(a, b, c, d) // 1 2 3 666

let [a = 11, b = 22, c, d = 666] = []
console.log(a, b, c, d) // 11 22 undefined 666
```

4、嵌套

```js
let [a, b, c] = [1, 2, [3]]
console.log(a, b, c) // 1 2 [3]

let [a, b, [c]] = [1, 2, [3]]
console.log(a, b, c) // 1 2 3
```

### 对象的解构赋值

```js
let { name, age } = {
  name: 'zgh',
  age: 22
}
console.log(name, age) // zgh 22
```

::: tip 对象与数组解构的不同点

- 数组的元素是按次序排列的，变量的取值由它的位置决定
- 对象的属性没有次序，变量必须与属性同名，才能取到正确的值
  :::

### 函数参数的解构赋值

```js
let f = ([a, b]) => a + b
f([1, 2]) // 3
```

上述代码可将数组`[1, 2]`看作一个参数`param`，即`param = [1, 2]`，外面的小括号不能去掉

## 函数

### 为函数的参数设置默认值

在 ES6 里，可以给定义的函数接收的参数设置默认值，如果不指定该函数的参数的值，就会使用默认参数值。

```js
function Person(name = 'zgh', age = 22) {
  console.log(name) //  zgh
  console.log(age) // 22
}
Person()
```

如果在调用函数的时候传入实参，则会改变默认参数的值。

```js
function Person(name = 'zgh', age = 22) {
  console.log(name) //  Jack
  console.log(age) // 20
}
Person('Jack', 20)
```

### 箭头函数

#### ES6 允许使用“箭头”（=>）定义函数

```js
//1.不带参数
let sum = () => 1 + 2
//等同于
let sum = function() {
  return 1 + 2
}

//2.带一个参数
let sum = a => a
//等同于
let sum = function(a) {
  return a
}

//3.带多个参数,需要使用小括号将参数括起来
let sum = (a, b) => a + b
//等同于
let sum = function(a, b) {
  return a + b
}

//4.代码块部分多于一条语句需要用大括号将其括起来，并且使用return语句返回。
let sum = (a, b) => {
  let c = a + b
  return c
}

//5.返回对象，就必须用小括号把该对象括起来
let person = name => ({ name: 'zgh', age: 22 })
//等同于
let person = function(name) {
  return {
    name: 'zgh',
    age: 22
  }
}
```

#### 箭头函数的 this 指向

箭头函数本身是没有`this`和`arguments`的，在箭头函数中引用 this 实际上是调用的是定义时的父执行上下文的 this。简单对象（非函数）是没有执行上下文的。

```js
let obj = {
  say() {
    let f1 = () => console.log(this)
    f1()
  }
}
let rs = obj.say
rs() // f1执行时，say函数指向window，所以f1中的this指向window
obj.say() // f1执行时，say函数指向obj，所以f1中的this指向obj
```

## 对象

### 对象的简洁表示法

#### 属性的简写

条件：属性的值是一个变量，且变量名称和键名是一致的

```js
let name = 'zgh'
let age = 22

//ES5写法
let obj = {
  name: name,
  age: age
}

//ES6写法
let obj = {
  name,
  age
}
```

#### 方法的简写

```js
//ES5写法
let obj = {
  hello: function() {
    console.log('hello')
  }
}

//ES6写法
let obj = {
  hello() {
    console.log('hello')
  }
}
```

## Set

`Set`对象是一组不重复的、无序的值的集合，可以往里面添加、删除、查询数据。

`Set`本身是一个构造函数，用来生成`Set`数据结构

`Set()`接受具有`iterable`可迭代接口的数据结构作为参数，如数组、类数组、字符串等。
不能接受对象结构，否则报错`Uncaught TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))`

```js
const set1 = new Set([1, 2, 3, 4, 5, 5, 5, 5])
set1.size // 5

// 两个对象是不相等的
const set2 = new Set()
set2.add({})
set3.size // 1
set3.add({})
set3.size // 2

// 声明一个Set对象
let mySet = new Set()

// 添加元素
mySet.add(1)
mySet.add('hi')
mySet.add([2, 'hello'])

// 判断集合中是否存在一个元素1
mySet.has(1) // true

// 删除集合中的字符串
mySet.delete('hi')

// 获取集合中元素的数量
mySet.size // 3

// 遍历
mySet.forEach(item => console.log(item))

// 删除集合中所有的元素
mySet.clear()
```

遍历操作

```js
let mySet = new Set(['a', 'b', 'c'])

// entries()返回的遍历器同时包括键名和键值，二者一样
for (let i of mySet.entries()) {
  console.log(i)
}
// ["a", "a"]
// ["b", "b"]
// ["c", "c"]

// keys()返回键名
for (let i of mySet.keys()) {
  console.log(i)
}
// 'a'
// 'b'
// 'c'

// values()返回键值，结果同keys()
for (let i of mySet.values()) {
  console.log(i)
}
```

`Set`只存储唯一值，可用来数组去重

```js
let arr = [1, 1, 2, 2, 3, 3]
let res1 = [...new Set(arr)] // [1, 2, 3]

// 或者使用 Array.from()
let res2 = Array.from(new Set(arr)) // [1, 2, 3]
```

也可以用来字符串去重

```js
const str = [...new Set('ababbc')].join('')
console.log(str) // 'abc'
```

## Map

类似于对象，里面存放的也是键值对，区别在于：对象中的键名只能是字符串，如果使用 map，它里面的键可以是任意值。

```js
//创建一个Map对象
let myMap = new Map()

//添加键值对
myMap.set('a', 'hello')
myMap.set([1, 2, 3], { name: 'zgh' })

//查看集合中元素的数量
myMap.size

//获取相应的键值
myMap.get('a')

//删除一个键值对，然后再判断该键值对是否存在
myMap.delete('a')
myMap.has('a')

//删除Map集合中所有的键值对
myMap.clear()
```

## ...操作符

...是 ES6 中新添加的一种操作符，可以叫做 spread（扩展）或者 rest（剩余）

rest (剩余操作符)一般会用在函数的参数里面。比如:想让一个函数支持更多的参数，参数的数量不受限制，这个时候就可以使用剩余操作符。

```js
function Name(x, y, ...z) {
  console.log(x) // a
  console.log(y) // b
  console.log(z) //["c" "d" "e"]
}
Name('a', 'b', 'c', 'd', 'e')
```

剩余操作符后面的变量会变成一个数组，多余的参数会被放入这个数组中。

spread（扩展运算符）用在数组的前面，作用就是将这个数组展开，展开后就变成了字符串。

```js
let arr1 = ['a', 'b', 'c', 'd', 'e']
let arr2 = ['f', 'g']
let arr3 = [...arr1, ...arr2]
console.log(arr3) // ["a", "b", "c", "d", "e", "f", "g"]
console.log(...arr1) // a b c d e
```

使用拓展运算符展开一个新的对象，第二个对象的属性值会改写第一个对象的同名属性值

```js
let object1 = { a:1, b:2,c:3 }
let object2 = { b:30, c:40, d:50}
let merged = {…object1, …object2}
console.log(merged) // {a:1, b:30, c:40, d:50}
```

## Class

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 `class` 关键字，可以定义类。基本上，ES6 的 class 可以看作只是一个语法糖，
它的绝大部分功能，ES5 都可以做到，新的 class 写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```js
//ES5 中使用面向对象
function Person(name, age) {
  this.name = name
  this.age = age
  this.say = function() {
    console.log('hello')
  }
}
let obj = new Person('zgh', 22)
obj.say()

//ES6 中使用面向对象
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  say() {
    console.log('hello')
  }
}
let obj = new Person('zgh', 22)
obj.say()
```

上面代码定义了一个“类”，里面有一个`constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。也就是说，ES5 的构造函数 `Person`，
对应 ES6 的 `Person` 类的构造方法。

Person 类除了构造方法，还定义了一个`say`方法。注意，定义“类”的方法的时候，前面不需要加上`function`这个关键字，直接把函数定义放进去了就可以了。
另外，方法之间不需要逗号分隔，否则会报错。

```js
function Foo() {}
Foo.prototype.constructor === Foo // true

const fo = new Foo()
fo.constructor === Foo // true
```

`Foo.prototype`默认有一个公有且不可枚举的`construetor`属性，这个属性引用的是对象关联的函数（上例中是 Foo）。
“构造函数”调用`new Foo()`创建的对象在`__proto__`上也有`construetor`属性，指向“创建这个对象的函数”

<https://segmentfault.com/a/1190000023516545>

### Class 继承

```js
class NBAPlayer {
  constructor(name, age, height) {
    this.name = name
    this.age = age
    this.height = height
  }
  say() {
    console.log(`我是${this.name},${this.age}岁,身高${this.height}cm`)
  }
}
class MVP extends NBAPlayer {
  constructor(name, age, height, year) {
    super(name, age, height)
    this.year = year
  }
  showMVP() {
    console.log(`我是${this.name},在${this.year}获得MVP!`)
  }
}
let r1 = new NBAPlayer('Jack', '39', '198')
r1.say()
let r2 = new MVP('Jack', '39', '198', '2010')
r2.showMVP()
```

`extends`关键字用于实现类之间的继承。子类继承父类的所有属性和方法，使用`super`可以调用父类的方法。

### 静态方法、静态属性

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前加上`static`关键字，则这个方法不会被实例继承，
而是直接通过类来调用，这就是静态方法。

```js
class Foo {
  static f() {
    return '666'
  }
}
Foo.f() // '666'
let person = new Foo()
person.f() // TypeError: person.f is not a function
```

父类的静态方法可以被子类继承

```js
class Foo {
  static f() {
    return '666'
  }
}

class Bar extends Foo {}
Bar.f() // "666"
```

静态方法也可以被`super`对象调用

```js
class Foo {
  static f() {
    return '666'
  }
}
class Bar extends Foo {
  static g() {
    return super.f()
  }
}
Bar.g() // "666"
```

#### 类的静态属性

```js
// es6写法
class Foo {}
Foo.prop = 1

// es7写法，推荐这一种写法
class Bar {
  static prop = 1
  constructor() {
    console.log(Bar.prop)
  }
}
```

#### 类的实例属性

类的实例属性可以用等式，写入类的定义之中

```js
class Foo {
  state = { value: 1 }
  constructor() {
    console.log(this.state.value) // 1
  }
}
```

再看看 react 类组件写法，以前定义类的实例属性只能在`constructor`里面，现在可以写在外面

```js
class Foo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }
  modalRef = null
}
```

## Promise

`promise`用同步编程的方式来编写异步代码，解决回调嵌套问题

```js
new Promise((resolve, reject) => {})
```

### Promise 的三种状态

- `resolved` 成功
- `rejected` 失败
- `pending` 创建 promise 对象实例进行中

#### then 方法

分别指定`resolved`状态和`rejected`状态的回调函数，第二个参数可选（不推荐使用）。
返回的是一个新的`Promise`，支持链式调用

```js
function pro(params) {
  return new Promise((resolve, reject) => {
    if (params) {
      resolve('hahaha')
    } else {
      reject('error')
    }
  })
}
pro(true).then(
  res => {
    console.log(res)
  },
  err => console.log(err)
)
```

::: warning
`Promise` 本身是同步的，`then` 方法是异步的

```js
const p = new Promise((resolve, reject) => {
  console.log(1)
  resolve(3)
})
p.then(res => console.log(res))
console.log(2)
```

结果是 1、2、3
:::

#### catch 方法

```js
function Cat(ready) {
  return new Promise((resolve, reject) => {
    if (ready) {
      resolve('Tom')
    } else {
      reject('Kitty')
    }
  })
}
Cat(false)
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err))
```

`catch`方法可以捕获错误，作用和 `then(onFulfilled, onRejected)` 当中的 `onRejected` 函数类似。

```js
Cat(false)
  .then(res => {
    console.log(tom)
  })
  .catch(err => console.log(err))
```

示例未定义变量 tom，如果不使用 catch 会直接报错，终止程序。使用后不会报错，但会将错误信息传递到 catch 方法中，方便处理

::: tip
将`catch`语句和`try/catch`语句进行比较
:::

示例：以下代码输出什么？

```js
try {
  ;(async function() {
    a()
      .b()
      .c()
  })()
} catch (e) {
  console.log(`执行出错：${e.message}`)
}
```

答案：`Uncaught (in promise) ReferenceError: a is not defined`

`async`定义了异步任务，而`try catch`无法捕获异步任务，所以无法执行`catch`语句，
改为同步即可`await (async function() { a().b().c() })()`

#### all 和 race 方法

`Promise.all()`提供并行执行异步操作的能力，将多个实例包装成一个新实例，返回全部实例状态变更后的结果数组(**全部变更再返回**)

`Promise.race()`将多个实例包装成一个新实例，返回全部实例状态优先变更后的结果(**先变更先返回**)

```js
let p1 = new Promise(function(resolve) {
  setTimeout(function() {
    resolve('Hello')
  }, 3000)
})

let p2 = new Promise(function(resolve) {
  setTimeout(function() {
    resolve('world')
  }, 1000)
})

Promise.all([p1, p2]).then(res => {
  console.log(res)
})

Promise.race([p1, p2]).then(res => {
  console.log(res)
})
```

结果是 1 秒后打印出`world`，3 秒后打印出`["Hello", "world"]`，表明`Promise.all` 方法会按照参数数组里面的顺序将结果返回。
`Promise.race`方法则是只要该数组中的`Promise`对象的状态发生变化（无论是`resolve`还是`reject`）该方法都会返回。

## async、await

`async`、`await`用来处理异步问题

`async`放置在函数的前面，返回一个`promise`

**await 只能在 async 函数里面使用**，可以让 js 进行等待，直到一个 promise 执行并返回它的结果，js 才会继续往下执行

```js
async function f() {
  let res = await axios.get(url)
  return res.data //  等待返回请求结果后才执行
}
f()
```

[参考](https://segmentfault.com/a/1190000013292562?utm_source=channel-newest)

## generator

Generator 是一种异步编程解决方案，执行 Generator 函数会返回一个遍历器对象。两个特征：星号\*、`yield`表达式

调用函数返回一个指向内部状态的指针，即遍历器对象。必须调用遍历器的`next`方法，使得指针移向下一个状态。
`yield`表达式就是暂停标志

```js
function* g() {
  yield 'hello'
  yield 'world'
  return 'haha'
}
const ee = g() // 函数并不会立即执行
console.log(ee) // g {<suspended>}

console.log(ee.next()) // {value: "hello", done: false}
console.log(ee.next()) // {value: "world", done: false}
console.log(ee.next()) // {value: "haha", done: true}
console.log(ee.next()) // {value: undefined, done: true}
```

遍历器对象`{value: "hello", done: false}`表示 value 是`yield`表达式的值，`done: false`表示遍历还没有结束

Generator 函数可以不用`yield`表达式，这时就变成了一个单纯的暂缓执行函数。

```js
function* gg() {
  console.log('666')
}
const g1 = gg()

setTimeout(() => {
  g1.next() // 1s后输出666
}, 1000)
```

`yield`表达式只能用在 Generator 函数里面

## Proxy

外界对目标对象的访问可以被 Proxy 拦截，进行过滤和改写，意为“代理器”

```js
let proxy = new Proxy(target, handler)
```

- target 目标对象
- handler 配置对象

在 ES6 之前，我们可以使用`Object.defineProperty`去保护对象的私有属性。例如:

```js
let sign = {
  _appid: '12345678',
  _appkey: '666',
  desc: 'zgh的密钥'
}

Object.defineProperties(sign, {
  _appid: {
    writable: false
  },
  _appkey: {
    writable: false
  }
})
```

但是如果想对多个属性进行保护，就得对多个属性进行声明`writable: false`，显然很麻烦，这时就可以用 Proxy 来解决这个问题

Proxy 意味着我们代理了这个对象，该对象所有的属性操作都会经过 Proxy

```js
let sign = {
  _appid: '123456',
  _appkey: '666',
  desc: 'zgh的密钥'
}
let signProxy = new Proxy(sign, {
  get(target, property, receiver) {
    return target[property]
  },
  set(target, propName, value, receiver) {
    if (propName !== 'desc') {
      console.log('该属性是私有属性，不允许修改!')
    } else {
      target[propName] = value
    }
  }
})
console.log(signProxy._appid) // "123456"
signProxy._appkey = 'dd' // 该属性是私有属性，不允许修改!
console.log(signProxy._appkey) // "666"
```

这时依然可以直接修改 sign 对象，如果希望对象完全不可修改，可以直接将 sign 写到 Proxy 的 target

**应用场景:**

- 数据校检
- 属性保护

### 示例

#### 数据类型验证

有一个记账的对象，记录着用户的存款金额，为了方便以后计算，要保证存入的数据类型必须为`Number`

```js
let account = {
  num: 8888
}

let proxyAccount = new Proxy(account, {
  get(target, property) {
    return target[property]
  },
  set(target, propName, propValue) {
    if (propName === 'num' && typeof propValue != 'number') {
      throw new TypeError('The num is not an number')
    }
    target[propName] = propValue
  }
})

proxyAccount.num = '666'
console.log(proxyAccount.num) // Uncaught TypeError: The num is not an number
```

#### 简易版本 Vue 双向数据绑定

功能：通过 v-model 绑定一个值的同时，v-bind 的 dom 元素可以实现双向数据绑定。

代码如下:

```html
<div id="container">
  用户名：
  <input type="text" id="user" v-model="text" is-number />
  密码：
  <input type="password" v-model="password" />
  <h1 v-bind="text"></h1>
  <h2 v-bind="password"></h2>
</div>

<script>
  const container = [...document.querySelector('#container').children]

  let proxyObj = new Proxy(
    { text: '', password: '' },
    {
      get(target, property) {
        return target[property]
      },
      set(target, propName, propValue, receiver) {
        let isCanEdit = true
        container.forEach(dom => {
          if (dom.getAttribute('v-bind') === propName) {
            dom.innerHTML = propValue
          }
          if (dom.getAttribute('v-model') === propName) {
            dom.value = propValue
          }
        })

        target[propName] = propValue
      }
    }
  )

  container.forEach(dom => {
    if (dom.getAttribute('v-model') in proxyObj) {
      dom.addEventListener('input', function() {
        proxyObj[this.getAttribute('v-model')] = this.value
      })
    }
  })
</script>
```

首先获取到所有的 dom 节点，然后使用`Proxy`代理`{text: "", password: ""}`对象。
遍历所有的 dom 节点，如果某个节点有`v-model`属性，且属性值在代理对象中，那么就监听输入框的变化，
将该节点的值（input 框内的值）赋值给代理对象对应的属性，从而实现简单的双向数据绑定

::: tip

- `v-model`和`v-bind`的属性值要相同，如都是 text 或都是 password
- `dom.addEventListener("input", function() {})`这里不能使用箭头函数，否则 this 指向 Window 对象
  :::
