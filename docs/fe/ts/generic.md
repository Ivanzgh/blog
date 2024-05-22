---
outline: deep
---

# 泛型

泛型（generic），即**泛指的类型**，是指在定义函数、类、接口时不预先指定具体类型，而是在使用时再指定类型。以尖括号 `<>`定义，括号里面是泛型名称，一般使用`<T>`表示泛型。

## 泛型函数

先看一个联合类型的例子，函数参数可以是字符串或者数字：

```ts
function foo(a: string | number) {}
foo('hello');
```

使用泛型后的例子如下，定义了一个`<T>`泛型，在调用函数时要声明泛型的具体类型，TS 也会类型推断。

```ts
function foo<T>(a: T): T {
  return a;
}

foo<string>('hello');
foo<number>(1);
foo(2); // 类型推断
```

定义`type`或者`interface`，可以传入泛型参数，达到类型复用的效果：

```ts
type PropsType<T> = {
  [key: string]: T;
};

const obj: PropsType<number> = { a: 1, b: 2 };
```

## 泛型数组

有两种表示方式：`Array<T>` 和 `T[]`

```ts
function foo<T>(a: T[]) {}
foo<string>(['hello', 'world']);

function bar<T>(a: Array<T>) {}
bar<string>(['hello', 'world']);
```

## 泛型接口

定义一个接口来描述泛型函数的形状。

```tsx
interface CreateArrayFun<T> {
  (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFun<any> = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};

createArray(3, 'x'); // ['x', 'x', 'x']
```

## 泛型类

```ts
class Foo<T> {
  constructor(private first: T[]) {}
  say(index: number): T {
    return this.first[index];
  }
}

const instance = new Foo<string>(['hello', 'world']);
instance.say(1); // 'world'
```

## 泛型继承

上个例子中，假如传入对象数组，希望调用 say 方法返回传入的 name 值，直接改成`this.first[index].name`会报错
`Property 'name' does not exist on type 'T'`，因为 T 类型参数是任意类型，无法保证能访问到 name 属性。

```ts
interface Person {
  name: string;
}
class Foo<T extends Person> {
  constructor(private first: T[]) {}
  say(index: number): string {
    return this.first[index].name;
  }
}

const params = [{ name: 'z' }, { name: 'g' }, { name: 'h' }];
const instance = new Foo(params);
instance.say(1); // 'g'
```

这时用到了泛型的继承，T 继承了接口 Person，这意味着传给 T 的任何类型都必须要包含 `name: string` 属性，所以在 say 方法里能安全的访问 name 属性。

前面省略了参数类型，因为泛型的类型推断，所以也不会报错，完整的写法如下：

```ts
const instance = new Foo<{ name: string }>(params);
```

还要注意`say(index: number): string {}`不能写成`say(index: number): T {}`。原意是返回 Person 接口中定义的 name 属性的值，该值明确为 string 类型。而 T 是一个泛型参数，它代表的是传入的整个对象类型，不仅仅是 name 属性的类型。

## 泛型约束

```ts
class Foo<T> {
  constructor(private first: T[]) {}
  say(index: number): T {
    return this.first[index];
  }
}

const gen1 = new Foo<boolean>([true, false]);
const gen2 = new Foo<string>(['hello', 'world']);
const gen3 = new Foo<number>([1, 2]);
```

上面的例子可以看到泛型可以是`string`、`number`、`boolean`等类型，现在进行泛型约束，使其类型只能是`number`或者`string`

```ts
class Foo<T extends number | string> {
  constructor(private first: T[]) {}
  say(index: number): T {
    return this.first[index];
  }
}

const gen2 = new Foo<string>(['hello', 'world']);
const gen3 = new Foo<number>([1, 2]);
```

## 默认类型参数

```ts
function foo<T = string>(a: T) {
  console.log(a);
}
foo('hi');
```

## 定义多个泛型

比如定义两个泛型 T、P

```ts
function foo<T, P>(a: T, b: P) {}
foo<string, number>('hi', 666);
```

常见的类型参数名称如下，只是惯例，不是硬性规定。

- T：Type，表示单个类型
- U：表示第二个类型
- K：Key，键名
- V：Value，键值
- P：Params，参数类型
- E：Element，集合的元素类型
- R：Result，函数的返回结果
- N：Number，数字类型

## 泛型工具

### Record

```ts
type Record<K extends string | number | symbol, T> = { [P in K]: T };
```

构建一个类型，包含指定的属性且必填

```ts
type Props = Record<'x' | 'y', number>;

// 等同于
// type Props = {
//   x: number;
//   y: number;
// };

type Props = Record<string, unknown>;

// 等同于
// type Props = {
//     [x: string]: unknown;
// }
```

### Omit<T, K exdends keyof any>

排除接口中指定的属性（除了某些项，其余的全部都要），第一个参数表示要继承的类型，第二个参数表示要省略的属性，多个属性用竖线隔开

```ts
interface UserProps {
  name: string;
  age: number;
  sex: string;
}

type UserProps1 = Omit<UserProps, 'age'>;

// 等同于
// type UserProps1 = {
//   name: string;
//   sex: string;
// }

type UserProps2 = Omit<UserProps, 'age' | 'sex'>;

// 等同于
// type UserProps2 = {
//   name: string;
// }
```

### Pick

选取类型中的指定类型（除了某些项，其余的都不要）

```ts
type UserProps3 = Pick<UserProps, 'age' | 'sex'>;

// type UserProps3 = {
//   age: number;
//   sex: string;
// }
```

### Partial

将类型的所有属性变为可选

```ts
type UserProps4 = Partial<UserProps>;

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
type UserProps5 = Readonly<UserProps>;

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
type UserProps6 = Required<{ x: number; y?: number }>;

// 等同于
// type UserProps6 = {
//   x: number;
//   y: number;
// };
```

### Exclude(T, U)

排除联合类型中指定的子类型

```ts
type UserProps7 = Exclude<string | number | boolean, number>;

// 等同于
// type UserProps7 = string | boolean
```

### Extract(T, U)

提取联合类型中的指定类型，如果存在则返回该类型，不存在则返回 never

```ts
type UserProps8 = Extract<string | number | boolean, number>;
type UserProps9 = Extract<string | number | boolean, []>;

// 等同于
// type UserProps8 = number;
// type UserProps9 = never;
```

### NonNullable

过滤联合类型中的 null 和 undefined 类型

```ts
type UserProps9 = NonNullable<string | null | undefined>;

// 等同于
// type UserProps9 = string;
```

### Parameters<T extends (...args: any) => any>

获取函数的所有参数类型

```ts
type Fun = (a: string, b: number) => void;
type Props = Parameters<Fun>;

// 等同于
// type Props = [a: string, b: number]

const F1 = (a: string, b: number) => a + b;
type Props = Parameters<typeof F1>;
```

### ReturnType

获取函数的返回值类型

```ts
type Fun = (a: number, b: number) => number;
const F1 = (a: number, b: number) => a + b;

type Props1 = ReturnType<Fun>;
type Props2 = ReturnType<typeof F1>;

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

type Props = ConstructorParameters<typeof Person>;

// 等同于
// type Props = [name: string, age: number]
```

### InstanceType

获取构造函数的返回值类型

```ts
interface EntityConstructor {
  new (a: boolean, b: string): string;
}

type P1 = InstanceType<EntityConstructor>;

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

type Test = ThisParameterType<typeof fn>;

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

type NonReturnFn = OmitThisParameter<Fn>;

// 等同于
// type NonReturnFn = () => void
```
