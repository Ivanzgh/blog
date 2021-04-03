# 类

## 基本使用

typescript 中的类和 ES6 中的类大部分相同

```typescript
class Foo {
  content: string = 'hello world'
  say() {
    return this.content
  }
}

class Bar extends Foo {
  song() {
    return 'dadada'
  }
}

const msg = new Bar()
console.log(msg.say()) // hello world
console.log(msg.song()) // dadada
```

首先声明了一个 Foo 类，有 content 属性和 say 方法。然后声明了一个 Bar 类继承 Foo 类，创建实例后调用 say 和 song 方法均可行。

类的重写，就是子类可以重新编写父类里边的代码。比如在子类 Bar 中也写一个 say 方法，可以返回其他内容。
`super`关键字可以调用父类中的方法

```typescript
class Bar extends Foo {
  song() {
    return 'dadada'
  }
  say() {
    return super.say() + ' 666'
  }
}

const msg = new Bar()
console.log(msg.say()) // hello world 666
```

## 类的访问类型

类的访问类型有`public`、`private`、`protected`三种，分别表示公共的、私有的、受保护的。

`public`类型在类的内部和外部都可访问，默认的类型就是`public`

`private`类型只能在类的内部访问，外部和继承的子类都不能访问

`protected`类型能在类的内部和继承的子类中访问，不能在外部访问

```typescript
class Foo {
  private con: number = 8
  protected content: string = 'hello world'
  public say() {
    return this.content
  }
}

class Bar extends Foo {
  song() {
    return this.content
  }
}

const msg = new Bar()
msg.say()
```

## 类的构造函数

在类 Foo 中定义一个未赋初值的 name 属性、一个赋初值的 age 属性，在创建实例时传递参数通过构造器给 name 属性赋值

```typescript
class Foo {
  name: string
  age: number = 23
  constructor(name) {
    this.name = name
  }
  say() {
    return this.age
  }
}
const res = new Foo('zgh')
console.log(res) // Foo { name: 'zgh', age: 23 }
console.log(res.say()) // 23
```

以上写法便于理解，但是还有简便写法

```typescript
class Foo {
  constructor(public name: string, public age: number) {}
  say() {
    return this.name
  }
}
const res = new Foo('zgh', 23)
console.log(res) // Foo { name: 'zgh', age: 23 }
```

这种写法相当于定义了 name 和 age 属性，然后在构造器中进行赋值

注意属性前面的`public`关键字不能少，否则报错`Property 'name' does not exist on type 'Foo'.`

在子类中使用构造器需要使用`super()`调用父类的构造器，如果有参数还需传递参数。
如果在父类中没有显示的声明构造器，也有默认的构造器`constructor() {}`，仍需调用`super()`

```typescript
class Foo {
  constructor(public name: string, public age: number) {}
  say() {
    return this.name
  }
}

class Bar extends Foo {
  constructor(public name: string, public age: number, public msg: string) {
    super(name, age)
  }
}

const res = new Bar('zgh', 23, 'handsome')
console.log(res) // Bar { name: 'zgh', age: 23, msg: 'handsome' }
```

## 类的 getter、setter

假设有一个私有属性`_age`，外部是不能访问的，可以通过`getter、setter`属性从外部获取和设置

```typescript
class girlFriend {
  constructor(private _age: number) {}
  get age() {
    return this._age
  }
  set age(age: number) {
    this._age = age
  }
}
const girl = new girlFriend(18)
console.log(girl.age) // 18
girl.age = 20
console.log(girl.age) // 20
```

## 抽象类

抽象类和抽象方法都以`abstract`关键字开始

```typescript
abstract class Hobby {
  abstract skill(): string // 抽象方法没有具体逻辑，不能加大括号
}

class Song extends Hobby {
  skill() {
    return '唱'
  }
}

class Jump extends Hobby {
  skill() {
    return '跳'
  }
}

class Rap extends Hobby {
  skill() {
    return 'rap'
  }
}
```
