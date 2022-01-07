# 数组

## join()

把数组的所有元素放入一个字符串，元素通过指定的分隔符分隔，不影响原数组

```js
let arr = [2, 1, 3]
arr.join() // '2,1,3'
arr.join('') // '213'
arr.join('-') // '2-1-3'
```

## sort()

对数组的元素排序，接收一个函数作为参数，影响原数组

```js
let arr = [3, 5, 2, 4, 1]
let newarr1 = arr.sort()
//不加参数默认从小到大排序
console.log(newarr1) // [1,2,3,4,5]

let newarr2 = arr.sort((a, b) => {
  return b - a
})
console.log(newarr2) // [5, 4, 3, 2, 1]
```

## reverse()

把数组中的元素顺序颠倒过来，影响原数组

```js
let arr = [2, 1, 3]
let rs = arr.reverse()
console.log(rs) // [3, 1, 2]
```

## concat()

将数组和/或值连接成新数组，不影响原数组

```js
let arr1 = [2, 1, 3]
let arr2 = [4, 5]
let rs1 = arr1.concat(arr2)
let rs2 = arr1.concat(6, [7, 8])
console.log(rs1) // [2, 1, 3, 4, 5]
console.log(rs2) // [2, 1, 3, 6, 7, 8]
```

## push()

向数组的末尾添加一个或更多元素，并返回新的长度。

```js
let arr = [1, 2, 3]
let rs = arr.push(4)
console.log(rs) // 4
console.log(arr) // [1, 2, 3, 4]
```

## unshift()

向数组的开头添加一个或更多元素，并返回新的长度。

## pop()

删除并返回数组的最后一个元素

## shift()

删除并返回数组的第一个元素

```js
let arr = [3, 4, 2, 1, 5]
arr.shift() // 3
console.log(arr) // [4, 2, 1, 5]
```

## toString()

把数组转换为字符串，并返回结果。

```js
let arr = [1, 2, 3]
console.log(arr.toString()) //1,2,3
```

## slice()

语法：`arrayObject.slice(start[, end])`

从数组中截取一段元素，组成一个新的数组。新数组包括`start`，不包括`end`。若没指定 `end`，则从 `start` 截取到数组结束的所有元素。
新数组是对原数组的浅拷贝，原数组不会被改变。

```js
let arr = [1, 2, 3, 4, 5]

let rs1 = arr.slice(0, 3)
console.log(rs1) // [1, 2, 3]

let rs2 = arr.slice(-5, -1)
console.log(rs2) // [1, 2, 3, 4]

let rs3 = arr.slice(1)
console.log(rs3) //[2, 3, 4, 5]
```

## splice()

删除或者添加元素，然后返回删除的元素

语法：`splice(index,sum,item1,item2,...)`

替换数组中的元素：

```js
let arr = ['a', 'b', 'c', 'd']
arr.splice(1, 2, 'e', 'f')
console.log(arr) // ["a","e","f","d"]
```

## filter()

逐一过滤数组元素，返回符合条件的元素，得到一个新数组

```js
let arr = [1, 2, 3]
let rs = arr.filter(item => item > 1)
console.log(rs) // [2, 3]

// 删掉偶数，只保留奇数
let arr = [1, 2, 4, 5, 6, 9, 10, 15]
let r = arr.filter(function(x) {
  return x % 2 !== 0
})
console.log(r) // [1, 5, 9, 15]

//把一个Array中的空字符串删掉
let arr = ['A', '', 'B', null, undefined, 'C', '  ']
let r = arr.filter(function(s) {
  return s && s.trim() // 注意：IE9以下的版本没有trim()方法
})
console.log(r) // ['A', 'B', 'C']
```

filter()接收的回调函数，可以有多个参数。通常仅使用第一个参数，表示 Array 的某个元素。回调函数还可以接收另外两个参数，表示元素的位置和数组本身

```js
let arr = ['A', 'B', 'C']
let r = arr.filter(function(element, index, self) {
  console.log(element) // 依次打印'A', 'B', 'C'
  console.log(index) // 依次打印0, 1, 2
  console.log(self) // self就是变量arr
  return true
})
```

实例：数据去重

```js
const arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry']
const r = arr.filter(function(element, index, self) {
  return self.indexOf(element) === index
})
console.log(r.toString()) //apple,strawberry,banana,pear,orange

//indexOf总是返回某个元素第一次出现的位置，后续的重复元素位置与indexOf返回的位置不相等，因此被filter滤掉了。
```

## indexOf()

返回数组中某个指定的元素位置，可用来判断数组中是否包含指定元素

语法 `array.indexOf(item,start)`，`item`查找的元素，`start`开始检索的位置(可选)

```js
let fruits = ['Banana', 'Orange', 'Apple', 'Mango']
let a = fruits.indexOf('Apple') // 2

let fruits = ['Banana', 'Orange', 'Apple', 'Mango', 'Banana', 'Orange', 'Apple']
let a = fruits.indexOf('Apple', 4) // 6

if (fruits.indexOf('Apple') > -1) {
  alert('Apple')
}
```

如果在数组中没找到指定元素则返回 -1

若查找字符串最后出现的位置，用 `lastIndexOf()` 方法

## forEach()

`forEach()`方法用于调用数组的每个元素，并将元素传递给回调函数

格式：`array.forEach((item, index, arr) => {})`

- item 当前元素
- index 当前元素索引值 (可选)
- arr 当前元素所属数组 (可选)

```js
let arr = [1, 2, 3]
arr.forEach(item => {
  console.log(item) // 1 2 3
})
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
let arr = [1, 2, 3]
let rs = arr.map(item => {
  return (item += 10)
})
console.log(rs) // [11, 12, 13]
```

## reduce()

不断地将前一项和后一项的值进行运算（具体规则是由回调函数决定的，每次的运算会涉及两项），把前一轮运算的结果作为当前运算的前一项

```js
let arr = [1, 2, 3]
let sum = arr.reduce((prev, next) => {
  return prev + next
})
console.log(sum) // 6
```

带初值

```js
let arr = [1, 2, 3]
let sum = arr.reduce((prev, next) => {
  return prev + next
}, 4)
console.log(sum) // 10
```

示例：求和运算

```js
function add(...args) {
  return args.reduce((prev, next) => prev + next)
}

let res = add2(1, 2, 3, 4, 5, 6)
console.log(res) // 21
```

## some()

表示一些，只要数组中的某一个元素符合指定的条件，就会返回真，否则返回假。

```js
let arr = [
  { name: 'z', score: 90 },
  { name: 'g', score: 95 },
  { name: 'h', score: 99 }
]
let rs = arr.some(item => {
  return item.score > 90
})
console.log(rs) // true
```

## every()

如果数组中的所有元素都符合指定的条件，才返回 true，否则返回 false

## Array.isArray()

判断是否是数组类型

```js
let arr = [1, 2, 3]
console.log(Array.isArray(arr)) // true
```

## Array.from()

将类数组对象变成真正的数组

## Array.of()

将一组值变成数组，主要目的是弥补构造器 `Array()`的不足

之前使用 new 创建数组：

```js
let arr1 = new Array(3)
let arr2 = new Array('3')
console.log(arr1, arr2) // [empty × 3] ["3"]
```

使用 Array.of()后：

```js
let arr1 = Array.of(3)
let arr2 = Array.of('3')
console.log(arr1, arr2) // [3] ["3"]
```

## find 和 findIndex

find 用于找出第一个符合条件的数组元素。找不到则是`undefined`。注意，它不会返回多个，只找一个，找到了就返回。

findIndex 返回第一个符合条件的数组元素的索引,找不到则是-1

```js
let arr = [
  { name: 'z', score: 90 },
  { name: 'g', score: 95 },
  { name: 'h', score: 99 }
]
let rs1 = arr.find(item => {
  return item.name == 'g'
})
console.log(rs1) // {name: "g", score: 90}

let rs2 = arr.findIndex(item => {
  return item.name == 'g'
})
console.log(rs2) // 1
```

## includes

判断元素是否在数组中存在。返回值是 `true`或`false`

```js
let arr = [1, 2, 3]
let rs = arr.includes(1)
console.log(rs) // true
```

## fill

给数组填充指定值。已有数据会被覆盖。
fill 方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置(不包括结束位置)

```js
let arr = new Array(5)
arr.fill('$')
console.log(arr) //["$", "$", "$", "$", "$"]
//指定填充位置
let arr = [1, 2, 3, 4, 5]
arr.fill('$', 0, 2)
console.log(arr) //["$", "$", 3, 4, 5]
```

## flat

`flat(depth)`方法可以平铺数组，`depth`表示数组的展开深度，默认是 1。若不管多少层都平铺可以填入`Infinity`关键字

```js
;[1, [2, 3, [4, [5]]]].flat(2) //  [1, 2, 3, 4, 5]
```

## ...拓展运算符

将数组转换为一个用逗号分隔的参数列表

```js
let arr = [1, 2, 3, 4]
let rs = [...arr]
console.log(rs) //[1, 2, 3, 4]
```

合并数组：

```js
let arr1 = [1, 3]
let arr2 = [2, 4]
let rs = [...arr1, ...arr2]
console.log(rs) //[1, 3, 2, 4]
```

将字符串转为数组：

```js
let arr = 'hello'
let rs = [...arr]
console.log(rs) //["h", "e", "l", "l", "o"]
```

将数组转为对象：

```js
let arr = [1, 2, 3]
let rs = { ...arr }
console.log(rs) //{0: 1, 1: 2, 2: 3}
```

## 数组去重

es5 实现：

```js
let arr = [1, 2, 1, 3, 3, 4, 5, 5]
let res = arr.filter((value, index, array) => {
  return array.indexOf(value) === index
})
console.log(res) // [1, 2, 3, 4, 5]
```

es6 实现：

```js
let arr = [1, 2, 1, 3, 3, 4, 5, 5]
let res = [...new Set(arr)]
console.log(res) // [1, 2, 3, 4, 5]

// or
Array.from(new Set(arr))
```

## 清空或截断数组

在不重新赋值的情况下，更改数组的 `length` 属性。截断数组是不可逆的

```js
let arr = [1, 2, 1, 3, 3, 4, 5, 5]
arr.length = 3
console.log(arr) // [1,2,1]

arr.length = 0
console.log(arr) // []

arr.length = 9
console.log(arr[1]) // undefined
```

::: tip
数组的 `length` 属性实际上不是数组里元素的个数，而是最大的数字索引值加一。

```js
let arr = []
arr[666] = 'abc'

console.log(arr.length) // 666
```

:::

## 数组扁平化

### 二维数组

```js
let arr = [1, [2, 3], [4, 5], 6]

let res = [].concat(...arr)
console.log(res) //  [1, 2, 3, 4, 5, 6]
```

### 多维数组

```js
let arr = ['z', ['g', 'h', ['d']], 'f']
let res = arr.join(',').split(',')
console.log(res) // ["z", "g", "h", "d", "f"]
```

或者使用`flat(Infinity)`方法平铺数组

### 递归

```js
const arr = [1, [2, [3, 4]]]

function flatten(arr) {
  let res = []
  // for (let i = 0; i < arr.length; i++) {
  //     if (Array.isArray(arr[i])) {
  //         res = res.concat(flatten(arr[i]));
  //     } else {
  //         res.push(arr[i]);
  //     }
  // }
  arr.forEach(i => {
    // if (Array.isArray(i)) {
    //     res = res.concat(flatten(i))
    // } else {
    //     res.push(i)
    // }
    Array.isArray(i) ? (res = res.concat(flatten(i))) : res.push(i)
  })
  return res
}

console.log(flatten(arr))
```

### 使用 reduce

```js
const arr = [1, [2, [3, 4]]]

function flatten(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}

console.log(flatten(arr))
```

## 求数组交集

### 去掉重复元素

```js
let arr1 = [1, 2, 3, 3, 4, 5]
let arr2 = [1, 3, 5, 6]
let res = [...new Set(arr1)].filter(item => arr2.includes(item))
console.log(res) // [1, 3, 5]
```

### 保留重复元素

```js
// arr1 = [1, 2, 2, 3]  arr2 = [2, 2]   =>  [2, 2]
const arr1 = [1, 2, 2, 3],
  arr2 = [2, 2, 4]
const res = arr1.filter(i => arr2.includes(i))
console.log(res) // [2, 2]
```
