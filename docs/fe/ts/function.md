# 函数

## 函数声明

在没有提供函数实现的情况下，有两种声明函数的方式

```typescript
type f = {
    (info: string): string;
}

type g = (info: string) => string;
```

表示有一个函数参数是`info`，参数和返回值都是字符串类型

## 参数注解

```typescript
// 内联类型注解
function getInfo(info: string) {}

// 接口类型注解
interface Info {
    ff: number;
    gg: string;
}
function getInfo2(res: Info) {
    return res.ff + res.gg
}
getInfo2({gg: 'zgh',ff: 666})

// 可选参数
function getInfo3(info: string, msg?: string) {}

// 参数设置默认值
function getInfo4(info: string = 'success') {}
```

## 返回值注解

通常不需要给函数返回值添加注解，编译器会推断出来

```typescript
// 没有返回值
function getInfo(): void {
  console.log("This is message");
}

// 返回{name: string, age: number}
function getUser(info: string): { name: string; age: number } {
    return {name: info, age: 23}
}
getUser('zgh')
```

## 函数重载

函数根据传入不同的参数而返回不同类型的数据

```typescript
function f(x: string): string;
function f(x: number): number;
function f(x) {
    if (typeof x === 'string') {
        return x
    } else if (typeof x === 'number') {
        return x + 1
    }
}

console.log(f(1))
```

这样改变后，重载的f函数在调用的时候会进行正确的类型检查。

编译器会先从重载列表的第一个重载定义开始查找匹配项，直到选择出正确的检查类型。
因此，在定义重载的时候，一定要把最精确的定义放在最前面。

注意，`function f(x) {}`并不是重载列表的一部分，这里只有两个，以其它参数调用f会报错。
