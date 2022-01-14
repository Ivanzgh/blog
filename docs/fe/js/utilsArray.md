# Array

## 将值转换为数组

```js
const castArray = (value) => (Array.isArray(value) ? value : [value])
castArray(1) // [1]
castArray([1, 2, 3]) // [1, 2, 3]
```

```ts
const castArray = <T, _>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value])
```

## 检查数组是否为空

```js
// 这里默认value是数组，否则非数组类型也会返回false
const isEmpty = value => Array.isArray(value) && !value.length
isEmpty([]) // true
isEmpty([1, 2, 3] // false
```

```ts
const isEmpty = <T, _>(arr: T[]): boolean => Array.isArray(arr) && !arr.length
```

## 比较两个数组

1、不考虑元素顺序、是否重复

将数组去重，排序，然后转换为字符串

```js
const isEqual = (a, b) => JSON.stringify([...new Set(a)].sort()) === JSON.stringify([...new Set(b)].sort())

isEqual([1, 2, 3], [1, 2, 3]) // true
isEqual([1, 2, 3], [1, 3, 2]) // true
isEqual([1, 2, 3], [1, '2', 3]) // false
```

```ts
const isEqual = <T, _>(a: T[], b: T[]): boolean =>
  JSON.stringify([...new Set(a)].sort()) === JSON.stringify([...new Set(b)].sort())
```

2、考虑元素顺序

```js
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// 判断长度是否相等，数组a的每一项元素都等于数组b内同下标的元素
const isEqual = (a, b) => a.length === b.length && a.every((e, i) => e === b[i])

isEqual([1, 2, 3], [1, 3, 2]) // false
```

```ts
const isEqual = <T, _>(a: T[], b: T[]): boolean => JSON.stringify(a) === JSON.stringify(b)

const isEqual = <T, _>(a: T[], b: T[]): boolean => a.length === b.length && a.every((v, i) => v === b[i])
```

## 克隆数组

浅拷贝

```js
const clone1 = (arr) => arr.slice(0)
const clone2 = (arr) => [...arr]
const clone3 = (arr) => Array.from(arr)
const clone4 = (arr) => arr.map((x) => x)
const clone5 = (arr) => JSON.parse(JSON.stringify(arr))
const clone6 = (arr) => arr.concat([])
```

```ts
const clone1 = <T, _>(arr: T[]): T[] => arr.slice(0)
const clone2 = <T, _>(arr: T[]): T[] => [...arr]
const clone3 = <T, _>(arr: T[]): T[] => Array.from(arr)
const clone4 = <T, _>(arr: T[]): T[] => arr.map((x) => x)
const clone5 = <T, _>(arr: T[]): T[] => JSON.parse(JSON.stringify(arr))
const clone6 = <T, _>(arr: T[]): T[] => arr.concat([])
```

## 将字符串数组转为数字类型

```js
const toNumbers = (arr) => arr.map(Number)

// 或者隐式类型转换
const toNumbers = (arr) => arr.map((x) => +x)

toNumbers(['1', '2', '3']) // [1, 2, 3]
```

```ts
const toNumbers = (arr: string[]): number[] => arr.map(Number)

const toNumbers = (arr: string[]): number[] => arr.map((x) => +x)
```

## 将对象数组转为单个对象

方式一

```js
const toObject = (arr, key) => arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {})

const arr = [
  { id: '1', name: 'zgh', age: 23 },
  { id: '2', name: 'lmh', age: 19 },
  { id: '3', name: 'lrx', age: 20 }
]
toObject(arr, 'id')

/*  期望的结果
{
  1: { id: '1', name: 'zgh', age: 23 }
  2: { id: '2', name: 'lmh', age: 19 }
  3: { id: '3', name: 'lrx', age: 20 }
}
 */
```

这里`reduce`如果不设置初始值`{}`，当数组里只有一条数据时，返回结果就是`{ id: '1', name: 'zgh', age: 23 }`，与期望不符。
设置初始值后，里面的 a 就是`{}`，b 就是第一条数据

方式二

```js
const toObject = (arr, key) => Object.fromEntries(arr.map((it) => [it[key], it]))

// 或者使用 Map 对象
const toObject = (arr, key) => {
  const map = new Map()
  arr.forEach((e) => {
    map.set(e[key], e)
  })
  return Object.fromEntries(map)
}
```

`Object.fromEntries()`将键值对数组转为对象

```ts
const toObject = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): Record<string, T> =>
  arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {})

const toObject = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): Record<string, T> =>
  Object.fromEntries(arr.map((it) => [it[key], it]))
```

## 按对象数组的属性计数

比如有一份数据，统计出姓名为张三李四的人数

```js
const arr = [
  { name: 'zgh', age: 23 },
  { name: 'zgh', age: 24 },
  { name: 'lmh', age: 25 },
  { name: 'lrx', age: 18 },
  { name: 'lrx', age: 19 }
]

const countBy = (arr, prop) => {
  return arr.reduce((prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev), {})
}
countBy(arr, 'name') // {zgh: 2, lmh: 1, lrx: 2}
```
