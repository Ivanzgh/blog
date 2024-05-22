# 接口

作用：

- 描述对象的形状
- 对类的一部分行为进行抽象

规则：

- 接口一般首字母大写
- 接口只支持声明对象类型

示例：

```ts
interface Person {
  name: string;
  age: number;
}

let user: Person = {
  name: 'Ivan',
  age: 25
};
```

这样就约束了 user 的形状必须和接口 Person 一致。

## 可选属性

在接口属性名称后面加`?`即表示非必需。

```ts
interface Person {
  name: string;
  age?: number;
}

let user: Person = {
  name: 'lolo'
};
```

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值，使用`readonly`指定只读属性。

```typescript
interface User {
  readonly name: string;
  readonly age: number;
}
let my: User = { name: 'zgh', age: 24 };
my.age = 23; // Error
```

::: tip
数组也有只读属性，`let arr: ReadonlyArray<number> = [1, 2, 3]`
:::

## 任意属性

当一个接口中有可选属性和只读属性时，还希望允许有其他的任意属性，可以用**索引签名**实现。

```typescript
interface User {
  name?: string;
  readonly age: number;
  [propName: string]: any;
}
let my: User = { name: 'zgh', age: 24, height: 183 };
```

`[propName: string]: any`表示属性名称是字符串类型，值是任意类型。

注意：一旦定义了任意属性，那么确定类型和可选类型都必须是它的类型的子集。

```ts
interface Person {
  name: string;
  age?: number; // 报错
  [x: string]: string;
}
```

这里任意属性是 string 类型，但是 age 属性是 number 类型，number 不是 string 的子集，所以报错。

将任意属性的类型设为 any 类型即可：

```ts
interface Person {
  name: string;
  age?: number;
  [x: string]: any;
}
```

## 函数类型

接口也可以描述函数类型，给接口定义一个调用签名，包括参数列表和返回值类型。

```typescript
interface Fun {
  (name: string, age: number): boolean;
}
let myFun: Fun = function (name: string, age: number) {
  return age > 20;
};
myFun('zgh', 23);
```

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。

```typescript
interface Fun {
  (name: string, age: number): boolean;
}
let myFun: Fun = function (n: string, a: number): boolean {
  return a > 20;
};
```

函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。

函数类型的另一种写法：

```ts
interface Fun {
  say: (name: string, age: number) => boolean;
}
```

在这个例子中，Fun 接口描述了一个对象，该对象需要有一个名为 say 的属性，这个属性是一个函数，接受两个参数：一个类型为 string 的 name 和一个类型为 number 的 age，并返回一个 boolean 类型的值。

它定义了一个具有单个属性 say 的**对象类型**，其中 say 是一个函数类型，而不是直接定义一个函数类型本身。

## 可索引类型

可索引类型有一个索引签名，包括索引的类型和返回值类型，支持数字索引和字符串索引共两种签名

```typescript
interface Arr {
  [index: number]: string;
}

let ar: Arr = ['red', 'green', 'blue'];
let re = ar[1];
console.log(re); // 'green'
```

上面表示用`number`类型 1 去索引`Arr`时会得到一个`string`类型 'green'

## 内联类型注解

如果你不想写接口，可以直接使用内联类型注解。但是在多处使用相同注解时，建议使用接口

```typescript
let user: { name: string; age: number };
user = { name: 'zgh', age: 23 };

// 或者在声明时初始化
let user: { name: string; age: number } = { name: 'zgh', age: 23 };
```

## 方法

接口里可以写方法

```typescript
interface Info {
  ff: number;
  gg: string;
  say(): string; // 定义一个say方法，返回值类型是字符串
}
function getInfo2(res: Info): string {
  const sayInfo = res.say();
  return res.ff + res.gg;
}
const user = {
  gg: 'zgh',
  ff: 666,
  say(): string {
    return 'hello world';
  }
};
getInfo2(user);
```

## 接口合并

接口中的属性会合并到一个接口中，同名属性类型必须一致。

```ts
interface Person {
  name: string;
}
interface Person {
  age: number;
}
```

相当于：

```ts
interface Person {
  name: string;
  age: number;
}
```

接口中的函数合并就是函数重载。

## 接口继承

```ts
interface FooProps {
  name: string;
}

interface BarProps extends FooProps {
  age: number;
}
```
