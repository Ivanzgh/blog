# 迭代器模式

迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

> 主要思想是将集合的遍历行为抽取为单独的迭代器对象。

迭代器模式相对简单，绝大多数语言都内置了迭代器模式。在 js 中，如有 forEach 方法来遍历数组。

## 内部迭代器

内部迭代器：在迭代器内部完成迭代，外部不需要关心迭代的过程，只需要一次初始调用。

```js
const each = function (arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
};

each([1, 2, 3, 4, 5], (item, index) => {
  console.log(item, index);
});
```

倒序迭代器：

```js
const reverseEach = function (arr, callback) {
  for (let i = arr.length - 1; i >= 0; i--) {
    callback(arr[i], i);
  }
};
reverseEach([1, 2, 3, 4, 5], function (item, index) {
  console.log(item, index);
});
```

## 外部迭代器

外部迭代器：把迭代过程放在迭代器外部。增加了复杂度，也增强了灵活性。

示例：比较两个数组是否相等

```js
const iterator = function (obj) {
  let current = 0;
  const next = function () {
    current++;
  };
  const isDone = function () {
    return current >= obj.length;
  };
  const getCurrent = function () {
    return obj[current];
  };
  return { next, isDone, getCurrent };
};

function compare(iterator1, iterator2) {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrent() !== iterator2.getCurrent()) {
      console.log('不相等');
      return false;
    }
    iterator1.next();
    iterator2.next();
  }
  console.log('相等');
  return true;
}

const iterator1 = iterator([1, 2, 3, 4, 5]);
const iterator2 = iterator([1, 2, 3, 4, 5]);

compare(iterator1, iterator2);
```

## 中止迭代器

对于不符合条件的迭代，可以提前终止迭代。

```js
const each = function (arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i) === false) {
      break;
    }
  }
};

each([1, 2, 3, 4, 5], (item, index) => {
  if (item > 3) {
    return false;
  }
  console.log(item);
});
```
