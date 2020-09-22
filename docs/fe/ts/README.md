# typescript

官网：[https://www.typescriptlang.org/](https://www.typescriptlang.org/)

中文手册： [https://typescript.bootcss.com/](https://typescript.bootcss.com/)

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

## 接口

```typescript
interface Person {
    first: string;
    last: string;
}

function greeter(person: Person) {
    return 'hello,' + person.first + 'and' + person.last;
}

// let user = 'tom';
let user = {first: 'zgh', last: 'ivan'};
greeter(user);
```
类型检查器会检查`greeter`的调用，greeter有一个参数，并要求这个对象参数有名称为`first`和`last`、类型为`string`的属性，
属性的顺序不会检查

### 可选属性
接口里的属性并不都是必需的
```typescript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = {color: 'blue', area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare
}
let square = createSquare({color: 'red'});
```
在接口属性名称后面加`?`即表示非必需

::: tip
createSquare()后面的`{ color: string; area: number }`表示返回值类型
:::

### 只读属性
一些对象属性只能在对象刚刚创建的时候修改其值，使用`readonly`指定只读属性
```typescript
interface User {
    readonly name: string;
    readonly age: number;
}
let my: User = {name: 'zgh', age: 24};
my.age = 23     // Error
```

::: tip
数组也有只读属性，`let arr: ReadonlyArray<number> = [1, 2, 3]`
:::

### 任意属性
当一个接口中有可选属性和只读属性时，还希望允许有其他的任意属性
```typescript
interface User {
    name?: string;
    readonly age: number;
    [propName: string]: any
}
let my: User = {name: 'zgh', age: 24, height: 183};
```

## 断言

### 类型断言
类型断言有尖括号语法和`as`语法两种，类似类型转换，不进行特殊的数据检查和解构，即告诉编译器知道自己在干啥
```typescript
let str1: any = 'typescript';

let res1 = <string>str1
console.log(res1);       // 'typescript'

let res2: number = (<string>str1).length;
console.log(res2);   // 10

let str2: any = 'typescript';
let res3: number = (str2 as string).length;
console.log(res3)       // 10
```

::: warning
在TypeScript里使用JSX时，只有as语法断言是被允许的。
:::