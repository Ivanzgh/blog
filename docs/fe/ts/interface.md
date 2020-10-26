# 接口

```ts
function add(param: {one: number, two: number}): number {
    return param.one + param.two;
}
const total = add({ one: 1, two: 2 });
```

注解表示`param`参数是一个对象，有参数`one、two`且类型是`number`，返回值是`number`

也可以使用解构赋值

```typescript
function add({one, two}: {one: number, two: number}): number {
    return one + two;
}
```

使用接口

```typescript
interface Person {
    first: string;
    last: string;
}

function greeter(person: Person): string {
    return 'hello,' + person.first + 'and' + person.last;
}

let user = {first: 'zgh', last: 'ivan'};
greeter(user);
```

类型检查器会检查`greeter`的调用，greeter有一个参数，并要求这个对象参数有名称为`first`和`last`、类型为`string`的属性，
属性的顺序不会检查

::: tip
`interface`只支持声明对象类型，可以合并扩展

```typescript
interface Person {
    first: string;
}
interface Person {
    last: string;
}
const user = {} as Person
console.log(user.first)
console.log(user.last)
```

:::

## 可选属性

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

## 只读属性

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

## 任意属性

当一个接口中有可选属性和只读属性时，还希望允许有其他的任意属性，可以用**索引签名**实现

```typescript
interface User {
    name?: string;
    readonly age: number;
    [propName: string]: any
}
let my: User = {name: 'zgh', age: 24, height: 183};
```

`[propName: string]: any`表示属性名称是字符串类型，值是任意类型

## 函数类型

接口也可以描述函数类型，给接口定义一个调用签名，包括参数列表和返回值类型

```typescript
interface fun {
    (name: string, age: number): boolean;
}
let myFun: fun = function (name: string, age: number) {
    return age > 20;
};
myFun('zgh', 23);
```

对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配

```typescript
interface Fun {
    (name: string, age: number): boolean;
}
let myFun: Fun = function (n: string, a: number): boolean {
    return a > 20;
};
```

函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的

## 可索引类型

可索引类型有一个索引签名，包括索引的类型和返回值类型，支持数字索引和字符串索引共两种签名

```typescript
interface Arr {
    [index: number]: string;
}

let ar: Arr = ['red', 'green', 'blue'];
let re = ar[1];
console.log(re);    // 'green'
```

上面表示用`number`类型1去索引`Arr`时会得到一个`string`类型 'green'

## 内联类型注解

如果你不想写接口，可以直接使用内联类型注解。但是在多处使用相同注解时，建议使用接口

```typescript
let user: {
    name: string;
    age: number;
}
user = {
    name: 'zgh',
    age: 23
}
```

## 方法

接口里可以写方法

```typescript
interface Info {
    ff: number;
    gg: string;
    say(): string;      // 定义一个say方法，返回值类型是字符串
}
function getInfo2(res: Info): string {
    const sayInfo = res.say()
    return res.ff + res.gg
}
const user = {
    gg: 'zgh',
    ff: 666,
    say():string {
        return 'hello world'
    }
}
getInfo2(user)
```
