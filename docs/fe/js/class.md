---
outline: deep
---

# 原型/继承/构造函数/类

## 如何生成一个对象？

### 1、工厂函数

首先生成一个简单的对象：

```js
const user = {};
user.name = 'zgh';
user.age = 25;
user.say = function () {
  return `${this.name} is ${this.age} years old`;
};
```

如果要生成很多的 user 对象怎么办呢？可以创建一个函数来专门生成 user 对象：

```js
function User(name, age) {
  const user = {};
  user.name = name;
  user.age = age;
  user.say = function () {
    return `${this.name} is ${this.age} years old`;
  };
  return user;
}
const user1 = User('zhangsan', 20);
const user2 = User('lisi', 30);
```

这个函数就是**工厂函数**

### 2、Object.create

前面创建对象的方式，每次实例化一个 User 时，都需要重新分配内存去创建一遍 say 方法。可能想到的优化方式是将 User 对象里的方法都提取出去，如下：

```js
const userMethods = {
  say() {
    return `${this.name} is ${this.age} years old`;
  }
};

function User(name, age) {
  const user = {};
  user.name = name;
  user.age = age;
  user.say = userMethods.say;
  return user;
}
```

如果继续在 userMethods 里增加方法 song，那么还要手动在 User 函数里增加相应的方法：`user.song = userMethods.song`，这样在后续维护的时候就比较麻烦。

如何才能不在 User 函数里添加方法呢？

使用`Object.create(proto)`，这个方法生成一个空对象，并将参数设置为自己的原型。

```js
const userMethods = {
  say() {
    return `${this.name} is ${this.age} years old`;
  },
  song() {
    console.log(this.name);
  }
};

function User(name, age) {
  const user = Object.create(userMethods);
  user.name = name;
  user.age = age;
  return user;
}
const user1 = User('zhangsan', 20);
user1.song();
```

可以看到 user 本身是没有 song 方法的，但是也能调用。

假如在一个对象里找某个属性或方法，没找到，那么 js 就会继续往这个对象的原型里找，找不到就继续往这个对象原型的原型里找，直到找到或者返回 undefined，这个就是[原型链](/fe/js/#原型和原型链)。

### 3、函数的 prototype

前面的 User 函数还需要配合 userMethods 对象使用，能不能省掉这步？

可以使用函数的 prototype 属性。每个函数都有 prototype 属性，prototype 属性指向一个对象，对象的 constructor 指向这个函数。

对象的原型可以通过`Object.getPrototypeOf(obj)`或者`__proto__`（不推荐）获取。

```js
function User() {}
console.log(User.prototype); // {constructor: ƒ}

const user1 = User();
console.log(user1.prototype); // undefined

console.log(Object.getPrototypeOf(user1)); // {say: ƒ, a: ƒ}
console.log(Object.getPrototypeOf(user1) === userMethods); // true
```

所以可以将 userMethods 里的方法全部挂在函数的 prototype 上：

```js
function User(name, age) {
  const user = Object.create(User.prototype);
  user.name = name;
  user.age = age;
  return user;
}
User.prototype.say = function () {
  return `${this.name} is ${this.age} years old`;
};
User.prototype.song = function () {
  console.log(this.name);
};

const user1 = User('zhangsan', 20);
```

### 4、构造函数

js 引入了**构造函数**，将方法挂载到函数的 prototype 属性上是一种优雅的设计选择。
在构造函数前面加上 `new` 关键字，就可以构造对象了。

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.say = function () {
  return `${this.name} is ${this.age} years old`;
};
User.prototype.a = function () {
  console.log(this.name);
};

const user = new User('zhangsan', 20);
```

## 构造函数

构造函数是用于创建和初始化新对象的函数。定义对象的行为和属性，并与 new 关键字一起使用，创建对象的实例。

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.say = function () {
  return `${this.name} is ${this.age} years old`;
};
User.prototype.a = function () {
  console.log(this.name);
};

const user = new User('zhangsan', 20);
```

### 私有/公有/静态属性方法

- 私有属性和方法：在构造函数中定义，如 var、const、let 定义的变量，外部无法访问
- 公有属性和方法：在构造函数中用 `this` 定义，或者在 `prototype` 上定义，外部可以访问
- 静态属性和方法：直接定义在构造函数上的属性和方法，通过构造函数调用

注意：

- 构造函数调用 prototype 上的方法会报错、属性会是 undefined
- 实例调用静态属性结果是 undefined，调用静态方法会报错

使用场景：

- 静态属性和方法：如`Promise.all()`、`Promise.race()`、`Object.assign()`、`Array.from()`等
- 公有属性和方法：如`Array.prototype.push()`、`Array.prototype.pop()`等

```js
function Person(name, age) {
  // 私有属性和方法
  const a = 1;
  function f() {}

  // 公有属性和方法
  this.name = name;
  this.age = age;
  this.say = function () {};
}
Person.prototype.foo = function () {};

// 静态属性和方法
Person.b = 2;
Person.bar = function () {
  console.log('static method');
};

const p1 = new Person('zhangsan', 18);
console.log(p1);

Person.bar(); // static method
console.log(p1.b); // undefined
p1.bar(); // Uncaught TypeError: p1.bar is not a function
Person.foo(); // Uncaught TypeError: Person.foo is not a function

console.log(Person.age); // undefined
```

注意`Person.age`打印结果是 undefined。

this.age 表示的是给使用构造函数创建的实例上增加属性 age，而不是给构造函数本身增加，只有 Person.age 才是给构造函数上增加属性。

::: tip
`console.log(Person.name);`的打印结果会是 `Person`。
因为在 js 中，函数也是对象，有自己的属性。name 就是函数的名称，其他的还有 length、prototype 等。
:::

### 获取实例对象自身的属性和方法

1、`Object.getOwnPropertyNames()`，返回自身所有属性名

```js
const ownPropertyNames = Object.getOwnPropertyNames(p1);
console.log(ownPropertyNames);
ownPropertyNames.forEach((name) => console.log(p1[name]));
```

2、`Reflect.ownKeys()`，返回对象自身的可枚举属性名、不可枚举属性和 Symbol 属性

```js
let ownPropertyKeys = Reflect.ownKeys(p1);
for (let key of ownPropertyKeys) {
  console.log(`${key}: ${p1[key]}`);
}
```

3、使用 `for...in` 循环结合 `hasOwnProperty` 检查

`for...in` 循环通常用来遍历对象的所有**可枚举属性**（包括原型链上的属性），结合 hasOwnProperty 方法筛选出仅属于实例对象自身的属性

```js
for (let prop in p1) {
  if (p1.hasOwnProperty(prop)) {
    console.log(`${prop}: ${p1[prop]}`);
  }
}
```

4、使用 `Object.keys` 获取实例对象自身的所有可枚举属性

### 扩展思考题

下面两个执行结果是什么？

```js
function f() {}
f.prototype.a = function () {
  console.log(1);
};
f.a();

function g() {
  const obj = {};
  return obj;
}
g.prototype.a = function () {
  console.log(1);
};
g.a();
```

::: details
第一个执行结果会报错。因为 a 方法是挂在原型上的，而不是直接作为 f 的一个方法，所以需要通过实例对象来调用。

第二个执行结果也会报错。 a 方法是挂在原型上的，那通过实例调用就行吗？也不行。因为 g 返回的是一个空对象，这个对象没有关联到`g.prototype`，所以无法通过这个对象调用 a 方法。
:::

## new 指令

### 1、new 解析

new 关键字用于创建一个对象实例。

```js
function Person(name) {
  this.name = name;
}
let instance = new Person('zgh');
console.log(instance.name); // 'zgh'
```

如果构造函数有一个原型对象，则新创建的对象将继承原型对象上的属性和方法。

```js
function Person(name) {
  this.name = name;
}
Person.prototype.say = function () {
  console.log(`${this.name} said hello world`);
};

const instance = new Person('zgh');
instance.say();
```

::: tip

1. 如果函数体不返回值或者返回原始数据类型，则返回新对象
2. 如果函数体返回对象，则返回该对象，而不是新创建的对象

:::

1、在构建函数中显示返回基础类型：

```js
function Person(name) {
  this.name = name;
  return 1;
}
let instance = new Person('zgh');
console.log(instance.name); // 'zgh'
```

2、在构建函数中显示返回引用类型：

```js
function Person(name) {
  this.name = name;
  return { name: 'js' };
}
let instance = new Person('zgh');
console.log(instance.name); // js
```

### 2、new 的过程

::: info 过程如下：

1. 创建一个新的空对象
2. 将 this 指向新对象
3. 执行函数体内的代码
4. 返回新对象

:::

1、创建一个空对象 obj

```js
let obj = {};
```

2、使用 `call` 将构造函数 Person 中的 this 指向刚创建的 obj 对象

```js
let result = Person.call(obj);
```

3、设置原型链，将创建的 obj 的`__proto__`指向构造函数 Person 的`prototype`

```js
obj.__proto__ = Person.prototype;
```

4、判断 Person 的返回值类型，如果是值类型，返回创建的对象 obj。如果是引用类型，则返回这个引用类型的对象

```js
return result instanceof Object ? result : obj;
```

### 3、手写 new

```js
function myNew(constructor, ...args) {
  // 检查构造函数是否为函数类型
  if (typeof constructor !== 'function') {
    throw new TypeError('Constructor must be a function');
  }

  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return result instanceof Object && result !== null ? result : obj;
}
```

1. 创建一个新对象，继承构造函数的原型对象
2. 将构造函数的 this 指向新创建的对象，并执行构造函数
3. 如果构造函数返回一个对象，则直接返回该对象，否则返回新创建的对象

myNew 函数接收两个参数：构造函数、参数列表，使用方式如下：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function () {
  console.log(`${this.name} said hello world`);
};

const instance = myNew(Person, 'tom', 18);
console.log(instance);
```

## class 类

通过 `class` 关键字，可以定义**类**。class 可以看作只是一个**语法糖**，
它的绝大部分功能，ES5 都可以做到，新的 class 写法让对象原型的写法更加清晰、更像面向对象编程的语法。

```js
// ES5 中使用面向对象
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.say = function () {};
}
Person.prototype.foo = function () {};
let instance = new Person('zgh', 22);
instance.say();

// ES6 中使用面向对象
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {}
  foo() {}
}
let instance = new Person('zgh', 22);
instance.say();
```

上面代码定义了一个类，里面有一个`constructor`方法，这就是构造方法，而`this`关键字则代表实例对象。可以看到 class 只是构造函数的语法糖而已，原理简单描述如下：

1. 创建一个叫做 Person 的函数
2. 把 class 的 constructor 里面的代码放到 Person 函数里
3. 将 class 的方法，如 foo 放到 Person.prototype 里

::: tip 注意：

1. 定义 class 的方法的时候，前面不需要加上`function`关键字
2. 方法之间不需要逗号分隔，否则会报错

:::

### constructor

constructor 是类的构造函数，在实例化类的时候，会自动调用 constructor 函数。

- constructor 不是一定要写在 class 的顶部
- constructor 不是必须要定义的，如果没定义，会隐式的创建一个
- 不要返回值

---

```js
function Foo() {}
Foo.prototype.constructor === Foo; // true

const fo = new Foo();
fo.constructor === Foo; // true
```

- `Foo.prototype`默认有一个公有且不可枚举的`construetor`属性，这个属性引用的是对象关联的函数（上例中是 Foo）
- 构造函数调用`new Foo()`创建的对象在`__proto__`上也有`construetor`属性，指向创建这个对象的函数

### 在类中定义属性和方法

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.foo = function () {};
  }
  a = 1;
  bar = function () {};
  say() {}
}
const p1 = new Person('zhangsan', 18);
console.log(p1); //  {a: 1, name: 'zhangsan', age: 18, bar: f, foo: f}
```

- 在 constructor 中用 var/let/const 定义的变量，就是 constructor 的局部变量
- 在 constructor 中用 this 定义的属性和方法会被定义到实例上
- 在 class 中用`=`定义的变量，就是实例的属性，和 constructor 中的属性一样
- 在 class 定义的方法，会被添加到原型对象 prototype 上
- constructor 也在原型上

### class 不可提升

class 的类型是函数，但是不存在提升机制。

```js
class Person {}
console.log(typeof Person); // funciton

const a = new A();
function A() {}
console.log(a); // A {}

const b = new B();
class B {}
console.log(b); // Uncaught ReferenceError: Cannot access 'B' before initialization
```

### 覆盖相同属性

如果 class 中存在两个相同的属性或者方法，constructor 中属于 `this.xx`的属性和方法会覆盖 class 中的属性和方法。如果在原型上也存在同名属性，也是以 constructor 为准。

```js
class Person {
  constructor(name) {
    this.name = name;
    this.type = 'constructor';
  }
  type = 'class';
}
Person.prototype.type = 'prototype';

const p1 = new Person('zhangsan');
console.log(p1.type); // constructor
```

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

### class 的继承

`extends`关键字用于实现类之间的继承。子类继承父类的所有属性和方法，使用`super`可以调用父类的方法。

通过继承而来的 class 必须要在 constructor 里调用 super，否则使用 this 会报错

1. `super(...)`是用来调用父类的`constructor`方法，只能在 constructor 里调用
2. `super.method(...)`是用来调用父类的方法

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    return `${this.name} is ${this.age} years old`;
  }
  foo(params) {
    console.log(params);
  }
}

class Man extends User {
  constructor(name, age, height) {
    super(name, age);
    this.height = height;
  }
  bar(p) {
    super.foo(p);
    console.log(`height is ${this.height}`);
  }
}

const man = new Man('zhangsan', 20, 185);
man.bar(123);
```

### 扩展题

1、输出结果是什么？

```js
class TestA {
  constructor() {
    this.a = 'hello';
  }
}

TestA.prototype.a = 'world';

const obj = new TestA();
console.log('step1', obj.a);

obj.a = 'hi';
console.log('step2', obj.a);

delete obj.a;
console.log('step3', obj.a);

delete obj.a;
console.log('step4', obj.a);

obj.a = undefined;
console.log('step5', obj.a);
```

::: details

解析：

1. TestA 首先在自己的身上挂了一个 a 属性，并不是在原型链上
2. TestA 在原型上挂了一个 a 属性
3. 根据原型链由近及远的规则，自己有的属性就不会去原型上找。所以打印 step1 的结果就是 hello
4. 打印 step2 的结果是 hi，因为改变的是自身的属性
5. 打印 step3 时，先删除的是自身的 a 属性，在自身没找到就去原型上找，所以结果就是 world
6. 打印 step4 时，前面已经删除过自身的 a 属性，再删除一遍没啥区别，还是会去原型上找，所以结果还是 world
7. 打印 step5 时，在自身又挂了一个 a 属性，并且赋值为 undefined，所以打印结果就是 undefined

:::

2、输出结果是什么？

```js
class Person {
  constructor(name) {
    this.name = name;
    let type = 'constructor';
  }
  type = 'class';
  getType = function () {
    console.log(this.type);
    console.log(type);
  };
}
const type = 'window';
const p1 = new Person('zhangsan');
p1.getType();
```

如果 getType 是箭头函数，结果又是什么呢？

::: details
两个的答案都是：class、window
:::

## 对象继承的方式

### 1、原型链继承

通过将一个对象的原型指向另一个原型，实现继承关系，子类的原型是父类的一个实例对象

```js
function Parent() {
  this.name = 'Parent';
  this.nums = [1, 2, 3];
}
function Child() {
  this.name = 'Child';
}

Child.prototype = new Parent();

const demo = new Child();
console.log(demo.name);
```

这种方式的缺点是子类共享了父类的原型对象，可能会导致意外的属性修改。如下更改`demo1`后`demo2`也随着改变了

```js
const demo1 = new Child();
const demo2 = new Child();
demo1.nums.push(4);
console.log(demo1.nums); // [1, 2, 3, 4]
console.log(demo2.nums); // [1, 2, 3, 4]
```

### 2、构造函数继承

通过在子类构造函数中调用父类构造函数，实现属性的继承。缺点是无法继承父类原型上的方法

```js
function Parent() {
  this.name = 'Parent';
  this.nums = [1, 2, 3];
}
Parent.prototype.foo = function () {
  console.log(this.nums);
};

function Child() {
  Parent.call(this);
  this.name = 'Child';
}

const childObj = new Child();
console.log(childObj.nums);

console.log(childObj.foo()); // childObj.foo is not a function
```

### 3、组合继承

组合继承结合了原型链继承和构造函数继承的优点，既能继承原型链上的方法，又能避免属性共享的问题

这种方式的缺点是会调用两次父类构造函数，可能会导致性能问题

```js
function Parent() {
  this.name = 'Parent';
  this.nums = [1, 2, 3];
}
Parent.prototype.foo = function () {
  console.log(this.nums);
};

function Child() {
  Parent.call(this);
  this.name = 'Child';
}

Child.prototype = new Parent();
Child.prototype.constructor = Child; // 修复 constructor 指向

const childObj1 = new Child();
console.log(childObj1.foo()); // [1, 2, 3]
console.log(childObj1.constructor);

childObj1.nums.push(4);
console.log(childObj1.nums); // [1, 2, 3, 4]

const childObj2 = new Child();
console.log(childObj2.nums); // [1, 2, 3]
```

### 4、原型式继承

通过将一个对象作为另一个对象的基础，创建一个新的对象

```js
const parentObj = { name: 'Parent', nums: [1, 2, 3] };
const childObj = Object.create(parentObj);
childObj.name = 'Child';

console.log(childObj.nums); // [1, 2, 3]
```

这种方式会创建一个新的对象，它的原型链指向了 parentObj，从而实现了继承

### 5、寄生式继承

在原型式继承的基础上，对新对象进行了增强

```js
function createChild(obj) {
  const child = Object.create(obj);
  child.say = function () {
    console.log('Hello');
  };
  return child;
}

const parentObj = { name: 'Parent', nums: [1, 2, 3] };
const childObj = createChild(parentObj);

childObj.say(); // 'Hello'
```

### 6、寄生组合式继承

寄生组合式继承是对组合继承进行了优化，避免了调用两次父类构造函数

```js
function inheritPrototype(Child, Parent) {
  const prototype = Object.create(Parent.prototype);
  prototype.constructor = Child;
  Child.prototype = prototype;
}

function Parent() {
  this.name = 'Parent';
  this.nums = [1, 2, 3];
}

function Child() {
  Parent.call(this);
  this.name = 'Child';
}

inheritPrototype(Child, Parent);

const childObj = new Child();
```

### 7、class 继承

ES6+提出的对象继承方式，详见[class 的继承](/fe/js/class#class-的继承)
