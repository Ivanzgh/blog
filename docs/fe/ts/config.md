# tsconfig.json

`tsconfig.json`文件是用来配置如何编译 ts 文件的，一般在项目的根目录下，使用下方命令可生成

```sh
tsc --init
```

## 选择编译文件

默认是编译所有 ts 文件

`include`表示包含哪些要编译的文件，`exclude`表示不包含哪些文件，二者都可使用通配符

`files`指定一个包含相对或绝对文件路径的列表

```json
{
  "include": ["bar.ts"],
  //   "include": ["src/**/*"],
  //   "exclude": ["bar.ts"],
  //   "files": ["foo.ts", "bar.ts"],
  "compilerOptions": {}
}
```

::: warning
文件名称只能用双引号，用单引号会报错
:::

## `.d.ts`文件

`.d.ts`文件是 ts 类型声明文件，用来声明类型信息，以便在开发时进行静态类型检查和代码智能提示。

这些文件以`declare`关键字开头。

- 为 js 库添加类型信息：很多 js 库并没有用 ts 编写，这时可以编写一个 `.d.ts` 文件，用来描述该库的类型信息
- 支持第三方库的类型：使用`@types/*`这种现成的第三方库，如 `@types/node`，`@types/react`等
- 模块和全局变量的声明：声明全局变量、模块、函数、接口等的类型

示例：

```ts
// math.d.ts

// 声明一个全局变量
declare const name: string;

// 声明一个函数
export declare function doSomething(input: string): number;

// 声明一个类
export declare class MyClass {
  constructor(message: string);
  someMethod(): void;
  anotherMethod(value: number): string;
}

// 声明一个模块
declare module 'math' {
  export function add(x: number, y: number): number;
  export function subtract(x: number, y: number): number;
}
```

### namespace

namespace 是 TS 早期时为了解决模块化而创造的关键字。它用来表示全局变量是一个对象，包含很多子属性，避免全局作用域污染。

在早期 TS 1.5 之前还没有 ES6 的时候，TS 提供了一种模块化方案，使用 `module` 关键字表示内部模块。但后来 ES6 也使用了 module 关键字，TS 为了兼容 ES6，使用 namespace 替代了自己的 module。

现在已经不建议使用 namespace，推荐使用 ES6 的模块化方案。

```ts
// Foo.d.ts
declare namespace Foo {
  const count: number;
  function fn(name: string): void;
}
```
