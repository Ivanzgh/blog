# 数组

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;width:100%; height:900px;" src="https://www.processon.com/embed/64623e6407a1a76bf6d4a33a"></iframe>

## join()

把数组的所有元素放入一个字符串，元素通过指定的分隔符分隔，不影响原数组

```js
let arr = [2, 1, 3];
arr.join(); // '2,1,3'
arr.join(''); // '213'
arr.join('-'); // '2-1-3'
```

## toString()

将数组转换为字符串，并返回结果

```js
let arr = [1, 2, 3];
console.log(arr.toString()); // '1,2,3'
```

## concat()

将数组或者值连接成新数组，不影响原数组

```js
let arr1 = [2, 1, 3];
let arr2 = [4, 5];
let rs1 = arr1.concat(arr2);
let rs2 = arr1.concat(4);
let rs3 = arr1.concat(6, [7, 8]);
console.log(rs1); // [2, 1, 3, 4, 5]
console.log(rs2); // [2, 1, 3, 4]
console.log(rs3); // [2, 1, 3, 6, 7, 8]
```

## sort()

对数组的元素排序，接收一个函数作为参数，影响原数组。

如果省略参数，元素按照转换为字符串的各个字符的 `Unicode` 位点进行排序。

- 字符串排序

```js
const arr2 = ['zgh', '唔西迪西', 'ivan'];
arr2.sort(); // ['ivan', 'zgh', '唔西迪西']
arr2.sort((a, b) => a - b); // ['zgh', '唔西迪西', 'ivan']
```

- 数字排序

```js
const arr = [3, 5, 2, 4, 1];
arr.sort(); // [1,2,3,4,5]
// 比较的数字会先被转换为字符串，比较Unicode顺序
const arr1 = [5, 10, 20];
arr1.sort(); // [10, 20, 5]

arr.sort((a, b) => a - b); // 正序 [1, 2, 3, 4, 5]
arr.sort((a, b) => b - a); // 倒序 [5, 4, 3, 2, 1]
```

- 对象数组排序

```js
const arr = [
  { name: '玛卡巴卡', desc: 'one' },
  { name: '唔西迪西', desc: 'two' },
  { name: '桥豆麻袋', desc: 'three' }
]
arr.sort((a, b) => a.name.localeCompare(b.name))

// 结果
0: {name: '玛卡巴卡', desc: 'one'}
1: {name: '桥豆麻袋', desc: 'three'}
2: {name: '唔西迪西', desc: 'two'}
```

## reverse()

把数组中的元素顺序颠倒过来，影响原数组

```js
let arr = [2, 1, 3];
let rs = arr.reverse();
console.log(rs); // [3, 1, 2]
```

## push()

向数组的末尾添加一个或更多元素，并返回新的长度。

```js
let arr = [1, 2, 3];
let rs = arr.push(4);
console.log(rs); // 4
console.log(arr); // [1, 2, 3, 4]
```

## unshift()

向数组的开头添加一个或更多元素，并返回新的长度。

## pop()

删除并返回数组的最后一个元素

## shift()

删除并返回数组的第一个元素

```js
let arr = [3, 4, 2, 1, 5];
arr.shift(); // 3
console.log(arr); // [4, 2, 1, 5]
```

## slice()

语法：`arrayObject.slice(start[, end])`

从数组中截取一段元素，组成一个新的数组。新数组包括`start`，不包括`end`。若没指定 `end`，则从 `start` 截取到数组结束的所有元素。
新数组是对原数组的浅拷贝，原数组不会被改变。

```js
let arr = [1, 2, 3, 4, 5];

arr.slice(0, 3); // [1, 2, 3]
arr.slice(-5, -1); // [1, 2, 3, 4]
arr.slice(1); // [2, 3, 4, 5]
arr.slice(); // [1, 2, 3, 4, 5]
arr.slice(-1); // 5，可以很方便的拿到数组最后一项元素
```

**为什么说新数组是对原数组的浅拷贝？**

```js
const arr1 = [{ a: 1 }, 2, 3];
const arr2 = arr1.slice(0, 1); // [{ a: 1 }]
arr1[0].a = 9;

console.log(arr2); // [{ a: 9 }]
```

可以看到改变原数组的值，新数组也随之改变，复制到的对象只是一个引用

## splice()

删除或者添加元素，然后返回删除的元素

语法：`splice(index,sum,item1,item2,...)`

替换数组中的元素：

```js
let arr = ['a', 'b', 'c', 'd'];
arr.splice(1, 2, 'e', 'f');
console.log(arr); // ["a","e","f","d"]
```

## filter()

逐一过滤数组元素，返回符合条件的元素，得到一个新数组

```js
let arr = [1, 2, 3];
let rs = arr.filter((item) => item > 1);
console.log(rs); // [2, 3]

// 删掉偶数，只保留奇数
let arr = [1, 2, 4, 5, 6, 9, 10, 15];
let r = arr.filter(function (x) {
  return x % 2 !== 0;
});
console.log(r); // [1, 5, 9, 15]

//把一个Array中的空字符串删掉
let arr = ['A', '', 'B', null, undefined, 'C', '  '];
let r = arr.filter(function (s) {
  return s && s.trim(); // 注意：IE9以下的版本没有trim()方法
});
console.log(r); // ['A', 'B', 'C']
```

filter()接收的回调函数，可以有多个参数。通常仅使用第一个参数，表示 Array 的某个元素。回调函数还可以接收另外两个参数，表示元素的位置和数组本身

```js
let arr = ['A', 'B', 'C'];
let r = arr.filter((element, index, self) => {
  console.log(element); // 依次打印'A', 'B', 'C'
  console.log(index); // 依次打印0, 1, 2
  console.log(self); // self就是变量arr
  return true;
});
```

例子：

- 数据去重

```js
const arr = ['a', 's', 'b', 'p', 'a', 'k', 'k', 's'];
arr.filter((ele, index, self) => self.indexOf(ele) === index); // ['a', 's', 'b', 'p', 'k']

// indexOf总是返回某个元素第一次出现的位置，后续重复元素的位置与indexOf返回的位置不相等，因此被filter滤掉了
```

- 过滤虚假值，即 `0`，`undefined`，`null`，`false`，`""`，`''`

```js
const array = [3, 0, 6, 7, '', false];
array.filter(Boolean); // [1, 3, 5]
```

## indexOf()

返回数组中某个指定的元素位置，可用来判断数组中是否包含指定元素

语法 `array.indexOf(item, start)`，`item`查找的元素，`start`开始检索的位置(可选，默认是 0)

```js
let fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
let a = fruits.indexOf('Apple'); // 2

let fruits = ['Banana', 'Orange', 'Apple', 'Mango', 'Banana', 'Orange', 'Apple'];
let a = fruits.indexOf('Apple', 4); // 6

if (fruits.indexOf('Apple') > -1) {
  alert('Apple');
}
```

如果在数组中没找到指定元素则返回 -1

若查找字符串最后出现的位置，用 `lastIndexOf()` 方法

使用严格相等`===`匹配数组中的元素

## includes()

判断元素是否在数组中存在，返回值是 `true`或`false`

语法 `array.includes(item, start)`，`item`要查找的元素，`start`开始检索的位置(可选，默认是 0)，正向查找

如果 start 为负值，则使用`数组长度 + start`的计算结果作为新的索引

```js
let arr = [1, 2, 3];
arr.includes(1); // true
arr.includes(2, -1); // false
```

## find 和 findIndex

find 用于找出第一个符合条件的数组元素。找不到则是`undefined`。注意，它不会返回多个，只找一个，找到了就返回。

findIndex 返回第一个符合条件的数组元素的索引，找不到则是-1

```js
let arr = [
  { name: 'z', score: 90 },
  { name: 'g', score: 95 },
  { name: 'h', score: 99 }
];
let rs1 = arr.find((item) => item.name == 'g');
console.log(rs1); // {name: "g", score: 90}

let rs2 = arr.findIndex((item) => item.name == 'g');
console.log(rs2); // 1
```

## some()

表示一些，只要数组中的某一个元素符合指定的条件，就会返回真，否则返回假。

```js
let arr = [
  { name: 'z', score: 90 },
  { name: 'g', score: 95 },
  { name: 'h', score: 99 }
];
let rs = arr.some((item) => {
  return item.score > 90;
});
console.log(rs); // true
```

## every()

如果数组中的所有元素都符合指定的条件，才返回 true，否则返回 false

## forEach()

`forEach()`方法用于调用数组的每个元素，并将元素传递给回调函数

格式：`array.forEach((item, index, arr) => {})`

- item 当前元素
- index 当前元素索引值 (可选)
- arr 当前元素所属数组 (可选)

```js
let arr = [1, 2, 3];
arr.forEach((item) => {
  console.log(item); // 1 2 3
});
```

::: warning

- 不能使用 break
- 返回值是 undefined
- 若只是遍历数组，不需要更改数组元素，使用`forEach()`更简单

:::

## map()

逐一处理原数组元素，返回一个新数组，`map`的参数同`forEach`是回调函数。
回调函数中要有 `return`，如果不使用返回的新数组就不要用 map()

```js
let arr = [1, 2, 3];
let rs = arr.map((item) => {
  return (item += 10);
});
console.log(rs); // [11, 12, 13]
```

## reduce()

不断地将前一项和后一项的值进行运算，把前一轮运算的结果作为当前运算的前一项。具体规则由回调函数决定，每次的运算会涉及两项

```js
const arr = [2, 1, 5, 3, 4];

// 求和运算
arr.reduce((a, b) => a + b);

// 求最大值
arr.reduce((a, b) => (a > b ? a : b));

// 求最小值
arr.reduce((a, b) => (a < b ? a : b));
```

带初值

```js
// 第一次运算是 4 + 1
let arr = [1, 2, 3];
let sum = arr.reduce((prev, next) => prev + next, 4);
console.log(sum); // 10
```

## Array.isArray()

判断是否是数组类型

```js
let arr = [1, 2, 3];
console.log(Array.isArray(arr)); // true
```

## Array.from()

将类数组对象变成真正的数组

## Array.of()

将一组值变成数组，主要目的是弥补构造器 `Array()`的不足

之前使用 new 创建数组：

```js
let arr1 = new Array(3);
let arr2 = new Array('3');
console.log(arr1, arr2); // [empty × 3] ["3"]
```

使用 Array.of()后：

```js
let arr1 = Array.of(3);
let arr2 = Array.of('3');
console.log(arr1, arr2); // [3] ["3"]
```

## fill()

给数组填充指定值。已有数据会被覆盖。
fill 方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置(不包括结束位置)

```js
let arr = new Array(5);
arr.fill('$');
console.log(arr); //["$", "$", "$", "$", "$"]
//指定填充位置
let arr = [1, 2, 3, 4, 5];
arr.fill('$', 0, 2);
console.log(arr); //["$", "$", 3, 4, 5]
```

## flat()

`flat(depth)`方法可以平铺数组，`depth`表示数组的展开深度，默认是 1。若不管多少层都平铺可以填入`Infinity`关键字

```js
[1, [2, 3, [4, [5]]]].flat(2); //  [1, 2, 3, 4, [5]]
```

## flatMap()

遍历处理数组，然后将结果展开一级，返回一个新数组。等价于调用 map()方法后再调用深度为 1 的 flat()方法，即`arr.map(...args).flat()`

```js
const arr = [1, 2, 3];
const res = arr.flatMap((x) => [x, x * 2]);
console.log(result); // [1, 2, 2, 4, 3, 6]
```

## ...拓展运算符

将数组转换为一个用逗号分隔的参数列表

```js
let arr = [1, 2, 3, 4];
let rs = [...arr];
console.log(rs); //[1, 2, 3, 4]
```

合并数组：

```js
let arr1 = [1, 3];
let arr2 = [2, 4];
let rs = [...arr1, ...arr2];
console.log(rs); //[1, 3, 2, 4]
```

将字符串转为数组：

```js
let arr = 'hello';
let rs = [...arr];
console.log(rs); //["h", "e", "l", "l", "o"]
```

将数组转为对象：

```js
let arr = [1, 2, 3];
let rs = { ...arr };
console.log(rs); //{0: 1, 1: 2, 2: 3}
```

## 数组去重

es5 实现：

```js
let arr = [1, 2, 1, 3, 3, 4, 5, 5];
let res = arr.filter((value, index, array) => {
  return array.indexOf(value) === index;
});
console.log(res); // [1, 2, 3, 4, 5]
```

es6 实现：

```js
let arr = [1, 2, 1, 3, 3, 4, 5, 5];
let res = [...new Set(arr)];
console.log(res); // [1, 2, 3, 4, 5]

// or
Array.from(new Set(arr));
```

## 清空或截断数组

在不重新赋值的情况下，更改数组的 `length` 属性。截断数组是不可逆的

```js
let arr = [1, 2, 1, 3, 3, 4, 5, 5];
arr.length = 3;
console.log(arr); // [1,2,1]

arr.length = 0;
console.log(arr); // []

arr.length = 9;
console.log(arr[1]); // undefined
```

::: tip
数组的 `length` 属性实际上不是数组里元素的个数，而是最大的数字索引值加一

```js
let arr = [];
arr[666] = 'abc';

console.log(arr.length); // 666
```

:::

## 数组扁平化

### 二维数组

```js
let arr = [1, [2, 3], [4, 5], 6];

let res = [].concat(...arr);
console.log(res); //  [1, 2, 3, 4, 5, 6]
```

### 多维数组

```js
let arr = ['z', ['g', 'h', ['d']], 'f'];
let res = arr.join(',').split(',');
console.log(res); // ["z", "g", "h", "d", "f"]
```

或者使用`flat(Infinity)`方法平铺数组

### 递归

```js
const arr = [1, [2, [3, 4]]];

function flatten(arr) {
  let res = [];
  // for (let i = 0; i < arr.length; i++) {
  //     if (Array.isArray(arr[i])) {
  //         res = res.concat(flatten(arr[i]));
  //     } else {
  //         res.push(arr[i]);
  //     }
  // }
  arr.forEach((i) => {
    // if (Array.isArray(i)) {
    //     res = res.concat(flatten(i))
    // } else {
    //     res.push(i)
    // }
    Array.isArray(i) ? (res = res.concat(flatten(i))) : res.push(i);
  });
  return res;
}

console.log(flatten(arr));
```

### 使用 reduce

```js
const arr = [1, [2, [3, 4]]];

function flatten(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}

console.log(flatten(arr));
```

## 求数组交集

### 去掉重复元素

```js
let arr1 = [1, 2, 3, 3, 4, 5];
let arr2 = [1, 3, 5, 6];
let res = [...new Set(arr1)].filter((item) => arr2.includes(item));
console.log(res); // [1, 3, 5]
```

### 保留重复元素

```js
// arr1 = [1, 2, 2, 3]  arr2 = [2, 2]   =>  [2, 2]
const arr1 = [1, 2, 2, 3],
  arr2 = [2, 2, 4];
const res = arr1.filter((i) => arr2.includes(i));
console.log(res); // [2, 2]
```

## 将值转换为数组

```js
const castArray = (value) => (Array.isArray(value) ? value : [value]);
castArray(1); // [1]
castArray([1, 2, 3]); // [1, 2, 3]
```

```ts
const castArray = <T, _>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);
```

## 检查数组是否为空

```js
// 这里默认value是数组，否则非数组类型也会返回false
const isEmpty = value => Array.isArray(value) && !value.length
isEmpty([]) // true
isEmpty([1, 2, 3] // false
```

```ts
const isEmpty = <T, _>(arr: T[]): boolean => Array.isArray(arr) && !arr.length;
```

## 比较两个数组

1、不考虑元素顺序、是否重复

将数组去重，排序，然后转换为字符串

```js
const isEqual = (a, b) => JSON.stringify([...new Set(a)].sort()) === JSON.stringify([...new Set(b)].sort());

isEqual([1, 2, 3], [1, 2, 3]); // true
isEqual([1, 2, 3], [1, 3, 2]); // true
isEqual([1, 2, 3], [1, '2', 3]); // false
```

```ts
const isEqual = <T, _>(a: T[], b: T[]): boolean =>
  JSON.stringify([...new Set(a)].sort()) === JSON.stringify([...new Set(b)].sort());
```

2、考虑元素顺序

```js
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// 判断长度是否相等，数组a的每一项元素都等于数组b内同下标的元素
const isEqual = (a, b) => a.length === b.length && a.every((e, i) => e === b[i]);

isEqual([1, 2, 3], [1, 3, 2]); // false
```

```ts
const isEqual = <T, _>(a: T[], b: T[]): boolean => JSON.stringify(a) === JSON.stringify(b);

const isEqual = <T, _>(a: T[], b: T[]): boolean => a.length === b.length && a.every((v, i) => v === b[i]);
```

## 克隆数组

浅拷贝

```js
const clone1 = (arr) => arr.slice(0);
const clone2 = (arr) => [...arr];
const clone3 = (arr) => Array.from(arr);
const clone4 = (arr) => arr.map((x) => x);
const clone5 = (arr) => JSON.parse(JSON.stringify(arr));
const clone6 = (arr) => arr.concat([]);
```

```ts
const clone1 = <T, _>(arr: T[]): T[] => arr.slice(0);
const clone2 = <T, _>(arr: T[]): T[] => [...arr];
const clone3 = <T, _>(arr: T[]): T[] => Array.from(arr);
const clone4 = <T, _>(arr: T[]): T[] => arr.map((x) => x);
const clone5 = <T, _>(arr: T[]): T[] => JSON.parse(JSON.stringify(arr));
const clone6 = <T, _>(arr: T[]): T[] => arr.concat([]);
```

## 将字符串数组转为数字类型

```js
const toNumbers = (arr) => arr.map(Number);

// 或者隐式类型转换
const toNumbers = (arr) => arr.map((x) => +x);

toNumbers(['1', '2', '3']); // [1, 2, 3]
```

```ts
const toNumbers = (arr: string[]): number[] => arr.map(Number);

const toNumbers = (arr: string[]): number[] => arr.map((x) => +x);
```

## 将对象数组转为单个对象

方式一

```js
const toObject = (arr, key) => arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {});

const arr = [
  { id: '1', name: 'zgh', age: 23 },
  { id: '2', name: 'lmh', age: 19 },
  { id: '3', name: 'lrx', age: 20 }
];
toObject(arr, 'id');

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
const toObject = (arr, key) => Object.fromEntries(arr.map((it) => [it[key], it]));

// 或者使用 Map 对象
const toObject = (arr, key) => {
  const map = new Map();
  arr.forEach((e) => {
    map.set(e[key], e);
  });
  return Object.fromEntries(map);
};
```

`Object.fromEntries()`将键值对数组转为对象

```ts
const toObject = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): Record<string, T> =>
  arr.reduce((a, b) => ({ ...a, [b[key]]: b }), {});

const toObject = <T extends Record<string, any>, K extends keyof T>(arr: T[], key: K): Record<string, T> =>
  Object.fromEntries(arr.map((it) => [it[key], it]));
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
];

const countBy = (arr, prop) => {
  return arr.reduce((prev, curr) => ((prev[curr[prop]] = ++prev[curr[prop]] || 1), prev), {});
};
countBy(arr, 'name'); // {zgh: 2, lmh: 1, lrx: 2}
```
