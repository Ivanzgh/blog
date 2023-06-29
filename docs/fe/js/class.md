# 原型/继承/构造函数/类

如何生成一个对象？

## 生成一个简单的对象

```js
const user = {};
user.name = 'zgh';
user.age = 25;
user.say = function () {
  return `${name} is ${age} years old`;
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

## Object.create

前面创建对象的方式，每次实例化一个 User 时，需要重新分配内存去创建一遍 say 方法。可能想到的优化方式是将 User 对象里的方法都提取出去

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

如果继续在 userMethods 里增加方法 a，那么还要手动在 User 函数里增加相应的方法：`user.a = userMethods.a`，这样在后续维护的时候就比较麻烦。

如何才能不在 User 函数里添加方法呢？

使用`Object.create(proto)`，这个方法生成一个空对象，并将参数设置为自己的原型。

```js
const userMethods = {
  say() {
    return `${this.name} is ${this.age} years old`;
  },
  a() {
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
user1.a();
```

可以看到 user 本身是没有 a 方法的，但是也能调用

假如在一个对象里找某个属性或方法，没找到，那么 js 就会继续往这个对象的原型里找，找不到就继续往这个对象原型的原型里找，直到找到或者返回 undefined，这个过程就是原型链

## 函数的 prototype

前面的 User 函数还需要配合 userMethods 对象使用，能不能省掉这步？

可以使用函数的 prototype 属性。每个函数都有 prototype 属性，prototype 属性指向一个对象，对象的 constructor 指向这个函数

对象的原型可以通过`Object.getPrototypeOf(obj)`或者`__proto__`（不推荐）取到

```js
function User() {}
console.log(User.prototype); // {constructor: ƒ}

const user1 = User();
console.log(user1.prototype); // undefined

console.log(Object.getPrototypeOf(user1)); // {say: ƒ, a: ƒ}
console.log(Object.getPrototypeOf(user1) === userMethods); // true
```

所以可以将 userMethods 里的方法全部挂在函数的 prototype 上

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
User.prototype.a = function () {
  console.log(this.name);
};

const user1 = User('zhangsan', 20);
```

扩展思考题：

```js
// 打印结果是什么？
function f() {}
f.prototype.a = function () {
  console.log(1);
};
console.log(f.a());

// 打印结果是什么？
function g() {
  const obj = {};
  return obj;
}
g.prototype.a = function () {
  console.log(1);
};
console.log(g.a());
```

## 构造函数

将方法挂在函数的 prototype 上真是优雅，所以 js 就推出了**构造函数**，在构造函数前面加上 new 指令，就可以构造对象了

```js
function User(name, age) {
  // const user = Object.create(User.prototype);
  // user.name = name;
  // user.age = age;
  // return user;

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

## new 指令

### 原理

new 关键字用于创建一个对象实例，过程如下：

1. 创建一个新的空对象
2. 将 this 指向新对象
3. 执行函数体内的代码
4. 返回新对象

```js
function Person(name) {
  this.name = name;
  // return 1;
  // return { age: 25 };
}

const zgh = new Person('zgh');
```

1. 如果函数体不返回值或者返回原始数据类型，则返回新对象
2. 如果函数题返回对象，则返回该对象，而不是新创建的对象

如果构造函数有一个原型对象，则新创建的对象将继承原型对象上的属性和方法

```js
function Person(name) {
  this.name = name;
}
Person.prototype.say = function () {
  console.log(`${this.name} said hello world`);
};

const zgh = new Person('zgh');
zgh.say();
```

### 手动实现 new

```js
function myNew(constructor, ...args) {
  // 检查构造函数是否为函数类型
  if (typeof constructor !== 'function') {
    throw new TypeError('Constructor must be a function');
  }

  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return typeof result === 'object' && result !== null ? result : obj;
}
```

1. 创建一个新对象，继承构造函数的原型对象
2. 将构造函数的 this 指向新创建的对象，并执行构造函数
3. 如果构造函数返回一个对象，则直接返回该对象，否则返回新创建的对象

myNew 函数接收两个参数：构造函数、参数列表，使用方式如下：

```js
function Person(name) {
  this.name = name;
}
Person.prototype.say = function () {
  console.log(`${this.name} said hello world`);
};

function myNew(constructor, ...args) {
  // 创建一个新对象，该对象的原型为构造函数的prototype属性
  const obj = Object.create(constructor.prototype);
  const result = constructor.apply(obj, args);
  return typeof result === 'object' && result !== null ? result : obj;
}

const tom = myNew(Person, 'tom');
console.log(tom);
```

## class

es5 的写法：

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

es6 的写法：

```js
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  say() {
    return `${this.name} is ${this.age} years old`;
  }
  foo() {
    console.log(this.name);
  }
}

const user = new User('zhangsan', 20);

console.log(typeof User); // function
```

可以看到 class 只是构造函数的语法糖而已，原理简单描述如下：

1. 创建一个叫做 User 的函数
2. 把 class 的 constructor 里面的代码放到 User 函数里
3. 将 class 的方法，如 say、foo 放到 User.prototype 里

## class 的继承

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

通过继承而来的 class 必须要在 constructor 里调用 super，否则使用 this 会报错

1. `super(...)`是用来调用父类的`constructor`方法，只能在 constructor 里调用
2. `super.method(...)`是用来调用父类的方法

## 扩展题

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

解析：

1. TestA 首先在自己的身上挂了一个 a 属性，并不是在原型链上
2. TestA 在原型上挂了一个 a 属性
3. 根据原型链由近及远的规则，自己有的属性就不会去原型上找。所以打印 step1 的结果就是 hello
4. 打印 step2 的结果是 hi，因为改变的是自身的属性
5. 打印 step3 时，先删除的是自身的 a 属性，在自身没找到就去原型上找，所以结果就是 world
6. 打印 step4 时，前面已经删除过自身的 a 属性，再删除一遍没啥区别，还是会去原型上找，所以结果还是 world
7. 打印 step5 时，在自身又挂了一个 a 属性，并且赋值为 undefined，所以打印结果就是 undefined
