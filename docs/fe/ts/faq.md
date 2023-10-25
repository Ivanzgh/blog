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
