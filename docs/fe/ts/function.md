# 函数

## 函数声明

在没有提供函数实现的情况下，有两种声明函数的方式

```typescript
type f = {
  (info: string): string;
};

type g = (info: string) => string;
```

表示有一个函数参数是`info`，参数和返回值都是字符串类型

## 参数注解

```typescript
// 内联类型注解
function getInfo1(info: string) {}

const getInfo2 = (info: string) => {};

const getInfo3: (info: string) => void = (info) => {};

type infoProps = (info: string) => void;
const getInfo4: infoProps = (info) => {};

// 接口类型注解
interface Info {
  ff: number;
  gg: string;
}
function getInfo2(res: Info) {
  return res.ff + res.gg;
}
getInfo2({ gg: 'zgh', ff: 666 });

// 可选参数
function getInfo3(info: string, msg?: string) {}

// 参数设置默认值
function getInfo4(info: string = 'success') {}
```

可选参数必须接在必需参数后面

## 返回值注解

通常不需要给函数返回值添加注解，编译器会推断出来

```typescript
// 没有返回值
function getInfo(): void {
  console.log('This is message');
}

// 返回{name: string, age: number}
function getUser(info: string): { name: string; age: number } {
  return { name: info, age: 23 };
}
getUser('zgh');
```

## 函数重载

函数根据传入不同的参数而返回不同类型的数据。

假设有一个函数 f，如果传入参数是 string 类型，就返回 string 类型；如果是 number 类型，就返回 number 类型。利用联合类型，可以实现：

```ts
function f(x: string | number): string | number {
  if (typeof x === 'string') {
    return x;
  } else if (typeof x === 'number') {
    return x + 1;
  }
  return 0;
}
```

这样有一个缺点，就是定义不够精确，传入什么类型，输出也该是什么类型。如果只看`function f(x: string | number): string | number {}`这部分，我们无法知道`f`函数返回的是`string`还是`number`。这时就需要用到函数重载了。

```ts
function f(x: string): string;
function f(x: number): number;
function f(x: string | number): string | number {
  if (typeof x === 'string') {
    return x;
  } else if (typeof x === 'number') {
    return x + 1;
  }
  return 0;
}
f(1);
```

这样改变后，重载的 f 函数在调用的时候会进行正确的类型检查。

编译器会先从重载列表的第一个重载定义开始查找匹配项，直到选择出正确的检查类型。
因此，在定义重载的时候，一定要把最精确的定义放在最前面。

注意，`function f(x) {}`并不是重载列表的一部分，这里只有两个，以其它参数调用 f 会报错。
