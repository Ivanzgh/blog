# 泛型

泛型，generic，即泛指的类型，以尖括号 `<>`定义，括号里面是泛型名称，一般使用`<T>`表示泛型

## 泛型在函数中的使用

先看一个联合类型的例子，函数参数可以是字符串或者数字

```typescript
function foo1(first: string | number, last: string | number) {
    return `${first}-${last}`
}
foo1('hello', 'world')
```

使用泛型后的例子如下，定义了一个`<Fan>`泛型，在调用函数时要声明泛型的具体类型

```typescript
function foo2<Fan>(first: Fan, last: Fan) {
    return `${first}-${last}`
}
foo2<string>('hello', 'world')

foo2<number>(1, 2)
```

定义一种`type`或者`interface`，可以传入泛型参数，达到类型复用的效果

```ts
type Fan<T> = {
    [key: string]: T;
}

const obj: Fan<number> = {
    a: 1,
    b: 2
}
```

## 泛型在数组中的使用

有两种表示方式：`Array<T>` 和 `T[]`

```typescript
function foo3<T>(first: T[]) {
    return first.length
}
foo3<string>(['hello', 'world'])

function foo4<T>(first: Array<T>) {
    return first.length
}
foo4<string>(['hello', 'world'])
```

## 定义多个泛型

比如定义两个泛型T、P

```typescript
function foo5<T, P>(first: T, second: P) {
    return `${first}-${second}`
}
foo5<string, number>('hi', 666)
```

## 泛型在类中的使用

```typescript
class Foo<T> {
    constructor(private first: T[]) {}
    say(index: number): T {
        return this.first[index]
    }
}

const gen = new Foo<string>(['hello','world'])
gen.say(1)      // 'world'
```

## 泛型继承

上个例子中，假如传入对象数组，希望调用say方法返回传入的name值，直接改成`this.first[index].name`会报错
`Property 'name' does not exist on type 'T'.`，这时就要用到泛型的继承了

```typescript
interface Person {
    name: string
}
class Foo<T extends Person> {
    constructor(private first: T[]) {}
    say(index: number): string {
        return this.first[index].name
    }
}
const fff = new Foo([{name: 'z'}, {name: 'g'}, {name: 'h'}])
fff.say(1)  // 'g'
```

这里省略了参数类型，因为泛型的类型推断，所以也不会报错，完整的写法如下

```typescript
const fff = new Foo<{name: string}>([{name: 'z'}, {name: 'g'}, {name: 'h'}])
```

## 泛型约束

```typescript
class Foo<T> {
    constructor(private first: T[]) {}
    say(index: number): T {
        return this.first[index]
    }
}

const gen1 = new Foo<boolean>([true, false])
const gen2 = new Foo<string>(['hello','world'])
const gen3 = new Foo<number>([1, 2])
```

上面的例子可以看到泛型可以是`string`、`number`、`boolean`等类型，
现在进行泛型约束，使其类型只能是`number`或者`string`

```typescript
class Foo<T extends number | string> {
    constructor(private first: T[]) {}
    say(index: number): T {
        return this.first[index]
    }
}

const gen2 = new Foo<string>(['hello','world'])
const gen3 = new Foo<number>([1, 2])
```
