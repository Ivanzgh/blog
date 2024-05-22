# 断言

## 类型断言

类型断言可以手动指定一个值的类型。就是告诉 TS 编译器你比它更懂这个类型，让它别报错，但是无法避免运行时的错误。

有尖括号`<>`语法和`as`语法两种，类似类型转换，不进行特殊的数据检查和解构。没有运行时的影响，只在编译阶段起作用。

```ts
let str: any = 'typescript';

let res1: string = <string>str;

let res2: number = (<string>str).length;

let res3: number = (str as string).length;
```

::: warning
在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的，尖括号会和 JSX 语法产生歧义
:::

在 typescript 中，如下代码是会报错的，因为`obj`类型检测就是一个空对象，不能添加其他属性

```ts
const obj = {};
obj.name = 'zgh';
obj.age = 23;
```

使用类型断言后可以了

```ts
interface User {
  name: string;
  age: number;
}

const user = {} as User;
user.name = 'zgh';
user.age = 23;
```

## 非空断言操作符

`!` 后缀运算符就是非空断言，确保某个变量非空，即告诉编译器这个变量不可能是 `null` 和 `undefined`。

### 忽略 undefined 和 null 类型

```ts
function fn(data: string | undefined | null) {
  const a: string = data; // 报错
  const b: string = data!;
}
```

### 调用函数时忽略 undefined 类型

```ts
type FnType = () => number;

function foo(fn: FnType | undefined) {
  const num1 = fn(); // 报错，fn可能是undefined
  const num2 = fn!();
}
```

### 确定赋值断言

在变量声明后面放一个 ! 号，告诉 ts 该属性会被明确地赋值。

```ts
let x: number;
fn();
// 报错，变量 x 在赋值前被使用了
console.log(2 * x);

function fn() {
  x = 1;
}
```

可以改为`let x!: number;`

### 谨慎使用非空断言

::: warning

非空断言操作符 `!` 不应随意使用，因为它绕过了 TypeScript 的静态类型检查，应当在你确切知道变量不会为 `null` 或 `undefined` 时谨慎使用。

:::

错误使用非空断言的示例：

::: code-group

```ts
const a: number | undefined = undefined;
const b: number = a!;
console.log(b);
```

```js
'use strict';
const a = undefined;
const b = a;
console.log(b);
```

:::

b 期望是 number 类型，但是编译后 b 会变成 undefined。因为 ! 非空断言操作符会从编译生成的 js 代码中移除
