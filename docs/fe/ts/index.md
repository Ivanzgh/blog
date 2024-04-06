---
outline: deep
---

# TypeScript

- 官网：[https://www.typescriptlang.org](https://www.typescriptlang.org)
- 中文手册： [https://typescript.bootcss.com](https://typescript.bootcss.com)
- [《深入理解 TypeScript》](https://jkchao.github.io/typescript-book-chinese/)

## 安装

::: code-group

```sh[全局安装]
npm install -g typescript
```

```sh[局部安装]
pnpm add -D typescript
```

:::

验证

```sh
tsc -v
```

如果是局部安装的，需要使用 npx 运行

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

```typescript
const isDone: boolean = false; // 布尔
const num: number = 6; // 数字
const str: string = 'zgh'; // 字符串
const obj: object = {}; // 对象

const u: undefined = undefined;
const n: null = null;
```

### 数组类型

```typescript
const list1: number[] = [1, 2, 3]; // 由数字组成的数组

const list2: Array<number> = [4, 5, 6]; // 数组泛型

const list3: [string, number] = ['1', 2]; // 元组Tuple，表示一个已知元素数量和类型的数组

const list4: (number | string)[] = [1, 'a', 'b', 2]; // 不知道元素数量，类型已知

const list5: [string, number] = ['ha', 666];
const [ha, info] = list5; // 解构赋值
```

对象数组的类型注解

```typescript
const arr: { name: string; age: number }[] = [
  { name: 'tom', age: 18 },
  { name: 'jack', age: 19 }
];
```

如果有同样类型的数组，可以用 **类型别名**

```typescript
type user = { name: string; age: number };

const arr: user[] = [
  { name: 'tom', age: 18 },
  { name: 'jack', age: 19 }
];
```

也可以使用 **类**

```typescript
class user {
  name: string;
  age: number;
}

const arr: user[] = [
  { name: 'tom', age: 18 },
  { name: 'jack', age: 19 }
];
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

### 联合类型

以`|`为标记，若希望属性为多个类型中的一个，可以使用联合类型。下面的例子表示函数参数接受一个数字类型的数组或者一个字符串

```typescript
let union = function (item: number[] | string) {
  if (typeof item === 'string') {
    return 'string';
  }
  return item;
};
union('sss');
```

### 类型别名

使用`type`定义一个类型别名

```typescript
// 此处直接注解name是一个string类型
let name: string;

// 此处定义一个别名age
type age = string | number;
let user: age;
user = 123;
user = 'he';
```

类型别名和接口的区别

```typescript
type name = string;

type user1 = { name: string; age: number };

interface user2 {
  name: string;
  age: number;
}
```

类型别名可以直接注解字符串、数字等类型，而接口只能注解对象

## 高级类型

### Record

构建一个类型，包含指定的属性且必填

```ts
type Props = Record<'x' | 'y', number>;

// 等同于
// type Props = {
//   x: number;
//   y: number;
// };

export type Props = Record<string, unknown>;

// 等同于
// type Props = {
//     [x: string]: unknown;
// }
```

### Omit<T, K exdends keyof any>

排除接口中指定的属性（除了某些项，其余的全部都要），第一个参数表示要继承的类型，第二个参数表示要省略的属性，多个属性用竖线隔开

```ts
export interface UserProps {
  name: string;
  age: number;
  sex: string;
}

export type UserProps1 = Omit<UserProps, 'age'>;

// 等同于
// type UserProps1 = {
//   name: string;
//   sex: string;
// }

export type UserProps2 = Omit<UserProps, 'age' | 'sex'>;

// 等同于
// type UserProps2 = {
//   name: string;
// }
```

### Pick

选取类型中的指定类型（除了某些项，其余的都不要）

```ts
export type UserProps3 = Pick<UserProps, 'age' | 'sex'>;

// type UserProps3 = {
//   age: number;
//   sex: string;
// }
```

### Partial

将类型的所有属性变为可选

```ts
export type UserProps4 = Partial<UserProps>;

// 等同于
// type UserProps4 = {
//   name?: string | undefined;
//   age?: number | undefined;
//   sex?: string | undefined;
// };
```

### Readonly

将类型的所有属性变为只读

```ts
export type UserProps5 = Readonly<UserProps>;

// 等同于
// type UserProps5 = {
//   readonly name: string;
//   readonly age: number;
//   readonly sex: string;
// };
```

### Required

将类型的所有属性变为必填

```ts
export type UserProps6 = Required<{ x: number; y?: number }>;

// 等同于
// type UserProps6 = {
//   x: number;
//   y: number;
// };
```

### Exclude(T, U)

排除联合类型中指定的子类型

```ts
export type UserProps7 = Exclude<string | number | boolean, number>;

// 等同于
// type UserProps7 = string | boolean
```

### Extract(T, U)

提取联合类型中的指定类型，如果存在则返回该类型，不存在则返回 never

```ts
export type UserProps8 = Extract<string | number | boolean, number>;
export type UserProps9 = Extract<string | number | boolean, []>;

// 等同于
// type UserProps8 = number;
// type UserProps9 = never;
```

### NonNullable

过滤联合类型中的 null 和 undefined 类型

```ts
export type UserProps9 = NonNullable<string | null | undefined>;

// 等同于
// type UserProps9 = string;
```

### Parameters<T extends (...args: any) => any>

获取函数的所有参数类型

```ts
type Fun = (a: string, b: number) => void;
export type Props = Parameters<Fun>;

// 等同于
// type Props = [a: string, b: number]

const F1 = (a: string, b: number) => a + b;
export type Props = Parameters<typeof F1>;
```

### ReturnType

获取函数的返回值类型

```ts
type Fun = (a: number, b: number) => number;
const F1 = (a: number, b: number) => a + b;

export type Props1 = ReturnType<Fun>;
export type Props2 = ReturnType<typeof F1>;

// 等同于
// type Props = number;
```

### ConstructorParameters

获取构造函数的参数类型

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

export type Props = ConstructorParameters<typeof Person>;

// 等同于
// type Props = [name: string, age: number]
```

### InstanceType

获取构造函数的返回值类型

```ts
interface EntityConstructor {
  new (a: boolean, b: string): string;
}

export type P1 = InstanceType<EntityConstructor>;

// 等同于
// type P1 = string;
```

### ThisParameterType

获取函数中 this 的数据类型，没有就返回 unknown

```ts
interface Foo {
  x: number;
}
function fn(this: Foo) {
  console.log(this);
}

export type Test = ThisParameterType<typeof fn>;

// 等同于
// type Props = Foo;
```

### OmitThisParameter

移除函数中 this 的数据类型

```ts
interface Foo {
  x: number;
}
type Fn = (this: Foo) => void;

export type NonReturnFn = OmitThisParameter<Fn>;

// 等同于
// type NonReturnFn = () => void
```
