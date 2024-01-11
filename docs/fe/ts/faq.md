# FAQ

## 通过 obj[field] 获取对象的值报错

```ts
const obj: ObjectType = { name: 'zgh', age: 25 };
const field = 'name';

// Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 。。。
const temp = obj[field];

// Solution 1: When the type of the object is known
const temp = obj[field as keyof ObjectType];

// Solution 2: When the type of the object is not known
const temp = obj[field as keyof typeof obj];
```

## Promise 报错

`Expected 1 arguments, but got 0. Did you forget to include 'void' in your type argument to 'Promise'?`

```ts
// 报错写法
return new Promise((resolve, reject) => {
  resolve();
});

// 正确写法
return new Promise<void>((resolve, reject) => {
  resolve();
});
```

## 报错：Property 'style' does not exist on type 'Element'

获取 Dom 时，如果没有任何类型声明会显示 Element 类型，在使用 dom.style 时会报错，需要将其转为 HTMLElement 类型

```ts
const nodes = document.querySelectorAll('.box');
if (nodes.length > 0) {
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].style.color = '#239FF4';
  }
}

// 方式一：
const nodes = document.querySelectorAll<HTMLElement>('.box');

// 方式二：
const nodes = document.querySelectorAll('.box') as NodeListOf<HTMLElement>;
```
