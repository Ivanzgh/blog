---
outline: deep
---

# TypeScript

- 官网：[https://www.typescriptlang.org](https://www.typescriptlang.org)
- [在线体验](https://www.typescriptlang.org/play/)

TypeScript 是一种由微软开发的开源编程语言，它是 JS 的一个**超集**，设计目的在于增强 JS 的开发效率和维护性。

TS 在 JS 的基础上添加了**静态类型**，使得开发者能在编码阶段就发现类型错误，提高了代码的健壮性和可维护性。

特性：

1. 静态类型系统：允许在编译时进行类型检查
2. 增强面向对象特性：支持类、接口、模块、泛型等

不支持直接在浏览器运行，需要先编译成 js 代码。

## 安装

::: code-group

```sh[全局安装]
npm install -g typescript
```

```sh[局部安装]
pnpm add -D typescript
```

:::

验证：

```sh
tsc -v
```

如果是局部安装的，需要使用 npx 运行：

```sh
npx tsc -v
```

初始化，会在根目录生成一个`tsconfig.json`文件

```sh
npx tsc --init
```

## 编译

编译，然后可以得到一个同名的 js 文件

```sh
tsc helloworld.ts

#如果不在根目录下，要加反斜杠
tsc .\src\helloworld.ts
```

也可以用`ts-node`插件直接在终端查看结果，但不会生成 js 文件

```sh
npm install -g ts-node
```

运行

```sh
ts-node helloworld.ts
```

## 类型

```ts
const isDone: boolean = false; // 布尔
const num: number = 6; // 数字
const str: string = 'zgh'; // 字符串
const obj: object = {}; // 对象

const u: undefined = undefined;
const n: null = null;
```

`undefined` 和 `null` 是所有类型的子类型

### 数组类型

数组类型的表示方法：

1. 类型 + 方括号：`number[]`、`string[]`
2. 数组泛型：`Array<T>`
3. `interface`，较复杂，一般不用

```ts
const arr1: number[] = [1, 2, 3];

const arr2: Array<number> = [4, 5, 6];

interface NumberArray {
  [x: number]: number;
}
let arr3: NumberArray = [1, 2, 3];
```

对象数组的类型注解：

```ts
const arr: { name: string; age: number }[] = [
  { name: 'tom', age: 18 },
  { name: 'jack', age: 19 }
];
```

如果有同样类型的数组，可以用 **类型别名**，或者使用 **类**

```ts
type Person = {
  name: string;
  age: number;
};

class User {
  name: string;
  age: number;
}

const arr: Person[] = [
  { name: 'tom', age: 18 },
  { name: 'jack', age: 19 }
];
```

### tuple 元组类型

元组 Tuple，表示一个已知元素数量和类型的数组

```ts
const arr1: [string, number] = ['1', 2];

const arr2: (number | string)[] = [1, 'a', 'b', 2]; // 不知道元素数量，类型已知

const arr3: [string, number] = ['ha', 666];
const [ha, info] = arr3; // 解构赋值
```

### `Symbol`类型

```typescript
const sym = Symbol();
let obj = {
  [sym]: 'zgh'
};
console.log(obj[sym]); // zgh
```

### 枚举类型

```typescript
enum Direction {
  NORTH,
  SOUTH,
  EAST,
  WEST
}
let dir: Direction = Direction.NORTH;
console.log(dir); // 0
let dirName: string = Direction[2];
console.log(dirName); // EAST
```

### `Any`类型

即任意类型，ts 允许对 any 类型的值进行任何操作

```typescript
let notSure: any;
notSure.user.name; // ok
notSure[0]; // ok
notSure(); // ok
new notSure(); // ok
```

### `unknown`类型

就是不知道啥类型，只能被赋值给`any`类型和`unknown`类型本身

```typescript
let unk: unknown;

unk.user.name; // Error
unk(); // Error
new unk(); // Error

let value: unknown;

let value1: unknown = value; // OK
let value2: any = value; // OK
let value3: boolean = value; // Error
let value4: number = value; // Error
let value5: string = value; // Error
let value6: object = value; // Error
let value7: any[] = value; // Error
let value8: Function = value; // Error
```

### `void`类型

表示没有任何类型，比如当一个函数没有返回值时

```typescript
function getInfo(): void {
  console.log('This is message');
}
```

### `never`类型

表示永不存在的值的类型。 例如，`never`类型是那些总是会抛出异常、没有返回值的函数表达式、箭头函数表达式的返回值类型

```typescript
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```

## 索引签名

索引签名可以定义对象内的属性、值的类型

```ts
interface Foo {
  [propName: string]: number;
}
```

## 高级类型

### 类型别名

使用`type`定义一个类型别名

```ts
// 此处直接注解name是一个string类型
let name: string;

// 此处定义一个别名age
type age = string | number;

let user1: age = 23;
let user2: age = '23';
```

类型别名和接口的区别：

```typescript
type name = string;

type user1 = { name: string; age: number };

interface user2 {
  name: string;
  age: number;
}
```

类型别名可以直接注解字符串、数字等类型，而接口只能注解对象

### 类型索引

`keyof`，类似 `Object.keys()`

```ts
interface Button {
  type: string;
  text: string;
}

type ButtonType = keyof Button; // "type" | "text"

type NameType = Button['text']; // string
```

### typeof

`typeof` 获取一个变量或对象的类型。

```ts
let str: string = 'hello';

type StrType = typeof str; // string
```

一般和 keyof 一起使用：

```ts
type unionType = keyof typeof T;
```

### 条件类型

允许基于某个条件选择不同的类型。运用三元运算符，即`T extends U ? X : Y`，如果`T`是`U`的子类型，则返回`X`，否则返回`Y`。

```ts
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>; // true
type Test2 = IsString<number>; // false
```

### 类型映射

可以基于现有类型创建新的类型。例如将 User 接口变成只读类型：

```ts
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

interface User {
  name: string;
  age: number;
}

type ReadOnlyUser = ReadOnly<User>;
```

结果就是：

```ts
type ReadOnlyUser = {
  readonly name: string;
  readonly age: number;
};
```

### 类型约束

通过 `extends` 约束。

示例中，约束 fn 的参数只能是 BaseType 类型

```ts
type BaseType = string | number;

function fn<T extends BaseType>(value: T): T {
  return value;
}

fn(1);
```

类型约束一般和类型索引一起使用，例如通过对象的键名获取值：

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### 联合类型

以`|`为标记，声明类型为多个类型中的一个。

```ts
type PropType1 = number | string;

type PropType2 = 'a' | 'b' | 'c';
```

示例中的'a'、'b'、'c'被称为字面量类型，用来**约束取值**只能是某几个值中的一个。

### 交叉类型

交叉类型是将多个类型合并为一个类型，用`&`将多个类型合并在一起。

```ts
type A = { a: number };
type B = A & { b: number };

let obj: B = { a: 1, b: 1 };
```

1、同名的基础类型的属性合并

如果有同名的属性，且是基础类型，如`type A = { a: number; b: string };`里也有 b 属性，结果会报错，不存在覆盖现象。

因为合并后 b 的类型为 `string & number`，很明显这种类型是不存在的，所以 b 的类型为 `never`。

2、同名的引用类型的属性合并

```ts
interface A {
  x: { a: boolean };
}
interface B {
  x: { b: string };
}
interface C {
  x: { c: number };
}

type ABC = A & B & C;

let abc: ABC = {
  x: {
    a: true,
    b: 'ts',
    c: 6
  }
};
```

可以合并成功，因为 x 属性的类型为`{ a: boolean } & { b: string } & { c: number }`，合并后为`{ a: boolean; b: string; c: number }`。

注意，如果 x 属性里面的属性是同名的，如`{ a: boolean } & { a: string } & { a: number }`，则结果依然是 never。
