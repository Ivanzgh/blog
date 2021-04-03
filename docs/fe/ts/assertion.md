# 断言

## 类型断言

类型断言就是告诉编译器你比它更懂这个类型，让它别报错，知道自己在干啥。

有尖括号`<>`语法和`as`语法两种，类似类型转换，不进行特殊的数据检查和解构。没有运行时的影响，只在编译阶段起作用。

```typescript
let str1: any = 'typescript'

let res1 = <string>str1
console.log(res1) // 'typescript'

let res2: number = (<string>str1).length
console.log(res2) // 10

let str2: any = 'typescript'
let res3: number = (str2 as string).length
console.log(res3) // 10
```

::: warning
在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的，尖括号会和 JSX 语法产生歧义
:::

在 typescript 中，如下代码是会报错的，因为`obj`类型检测就是一个空对象，不能添加其他属性

```typescript
const obj = {}
obj.name = 'zgh'
obj.age = 23
```

使用类型断言后可以了

```typescript
interface User {
  name: string
  age: number
}

const user = {} as User
user.name = 'zgh'
user.age = 23
```
