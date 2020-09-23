# TypeScript

官网：[https://www.typescriptlang.org/](https://www.typescriptlang.org/)

中文手册： [https://typescript.bootcss.com/](https://typescript.bootcss.com/)

[《深入理解TypeScript》](https://jkchao.github.io/typescript-book-chinese/)

::: tip 关于《深入理解TypeScript》
注意typescript版本问题，代码还是手动敲一下为好，当前内容基于`Version 4.0.3`，一切以官方为主
:::

## 介绍

安装
```sh
npm install -g typescript
```
验证
```sh
tsc -v 
```
编译
```sh
tsc helloworld.ts

#如果不在根目录下，要加反斜杠
tsc .\src\helloworld.ts
```

## 类型

```typescript
let isDone: boolean = false;    // 布尔
let num: number = 6;        // 数字
let str: string = 'zgh';    // 字符串
let list1: number[] = [1,2,3];      // 由数字组成的数组
let list2: Array<number> = [4,5,6];     // 数组泛型
let list3: [string,number] = ['1',2];   // 元组Tuple，表示一个已知元素数量和类型的数组
let u: undefined = undefined;
let n: null = null;
```
`Symbol`类型
```typescript
const sym = Symbol();
let obj = {
  [sym]: "zgh",
};
console.log(obj[sym]); // zgh
```

`枚举`类型
```typescript
enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST
}
let dir: Direction = Direction.NORTH
console.log(dir)    // 0
let dirName: string = Direction[2]
console.log(dirName)    // EAST
```

`Any`类型，即任意类型，ts允许对any类型的值进行任何操作
```typescript
let notSure: any
notSure.user.name   // ok
notSure[0]      // ok
notSure()       // ok
new notSure()   // ok
```

`unknown`类型，就是不知道啥类型，只能被赋值给`any`类型和`unknown`类型本身
```typescript
let unk: unknown

unk.user.name       // Error
unk()       // Error
new unk()       // Error

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

`void`类型，表示没有任何类型。比如当一个函数没有返回值时
```typescript
// 声明函数返回值为void
function getInfo(): void {
  console.log("This is message");
}
```

`never`类型，表示永不存在的值的类型。 例如，`never`类型是那些总是会抛出异常、没有返回值的函数表达式、箭头函数表达式的返回值类型
```typescript
function error(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}
```



