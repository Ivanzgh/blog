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

```ts
let isDone: boolean = false;    // 布尔
let num: number = 6;        // 数字
let str: string = 'zgh';    // 字符串
let list1: number[] = [1,2,3];      // 由数字组成的数组
let list2: Array<number> = [4,5,6];     // 数组泛型
let list3: [string,number] = ['1',2];   // 元组，表示一个已知元素数量和类型的数组
```
