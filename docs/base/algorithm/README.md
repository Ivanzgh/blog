# 算法

## 归并排序

归并排序采用**分治思想**。将一个数组分成 2 个，再分成 4 个，依次下去，直到分割成一个一个的数据，
再将这些数据两两合并，直到归并成原始数组。

将小数组合并成大数组，先创建一个临时数组 C，比较 A[0]，B[0]，将较小值放到 C[0]，再比较 A[1]与 B[0]，将较小值放到 C[1]，直到对 A，B 都遍历一遍。

方式一：

```js
function sortArray(nums) {
  if (nums.length < 2) return nums;
  let middle = Math.floor(nums.length / 2);
  let left = [],
    right = [];
  left = nums.slice(0, middle);
  right = nums.slice(middle);
  return merge(sortArray(left), sortArray(right));
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}

let arr = [2, 1, 4, 5, 3, 1, 5, 6, 0];
let res = sortArray(arr);
console.log(res); // [0, 1, 1, 2, 3, 4, 5, 5, 6]
```

方式二、

```js
function mergeArray(arr, first, mid, last, temp) {
  let i = first;
  let m = mid;
  let j = mid + 1;
  let n = last;
  let k = 0;
  while (i <= m && j <= n) {
    if (arr[i] < arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }
  while (i <= m) {
    temp[k++] = arr[i++];
  }
  while (j <= n) {
    temp[k++] = arr[j++];
  }
  for (let l = 0; l < k; l++) {
    arr[first + l] = temp[l];
  }
  return arr;
}

function mergeSort(arr, first, last, temp) {
  if (first < last) {
    let mid = Math.floor((first + last) / 2);
    mergeSort(arr, first, mid, temp); // 左子数组有序
    mergeSort(arr, mid + 1, last, temp); // 右子数组有序
    arr = mergeArray(arr, first, mid, last, temp);
  }
  return arr;
}

let arr = [2, 1, 4, 5, 3, 1, 5, 6, 0];
let temp = [];
let SortedArr = mergeSort(arr, 0, arr.length - 1, temp);
console.log(SortedArr);     // [0, 1, 1, 2, 3, 4, 5, 5, 6]
```

## 数组生成树形结构

```js
const arr = [
  { id: 1, value: "节点1", p_id: 0 },
  { id: 2, value: "节点2", p_id: 1 },
  { id: 3, value: "节点3", p_id: 1 },
  { id: 4, value: "节点4", p_id: 2 },
  { id: 5, value: "节点5", p_id: 0 },
  { id: 6, value: "节点6", p_id: 5 },
  { id: 7, value: "节点7", p_id: 6 },
  { id: 8, value: "节点8", p_id: 6 },
];
```

输出结果如下：

```json
[
  {
    "id": 1,
    "value": "节点1",
    "p_id": 0,
    "children": [
      {
        "id": 2,
        "value": "节点2",
        "p_id": 1,
        "children": [
          {
            "id": 4,
            "value": "节点4",
            "p_id": 2,
            "children": []
          }
        ]
      },
      {
        "id": 3,
        "value": "节点3",
        "p_id": 1,
        "children": []
      }
    ]
  },
  {
    "id": 5,
    "value": "节点5",
    "p_id": 0,
    "children": [
      {
        "id": 6,
        "value": "节点6",
        "p_id": 5,
        "children": [
          {
            "id": 7,
            "value": "节点7",
            "p_id": 6,
            "children": []
          },
          {
            "id": 8,
            "value": "节点8",
            "p_id": 6,
            "children": []
          }
        ]
      }
    ]
  }
]
```

实现

```js
const arr = [
  { id: 1, value: "节点1", p_id: 0 },
  { id: 2, value: "节点2", p_id: 1 },
  { id: 3, value: "节点3", p_id: 1 },
  { id: 4, value: "节点4", p_id: 2 },
  { id: 5, value: "节点5", p_id: 0 },
  { id: 6, value: "节点6", p_id: 5 },
  { id: 7, value: "节点7", p_id: 6 },
  { id: 8, value: "节点8", p_id: 6 },
];
let getTree = (arr) => {
  return arr
    .reduce((prev, next) => {
      let finder = arr.find((item) => item.id === next.p_id);
      if (finder) {
        (finder.children || ((finder.children = []), finder.children)).push(
          next
        );
        prev.every((next) => next.id !== finder.id) && prev.push(finder);
      }
      return prev;
    }, [])
    .reduce(
      (prev, next, i, arr) => (
        arr.every((item) => item.id !== next.p_id) && prev.push(next), prev
      ),
      []
    );
};
getTree(arr);
```

时间复杂度 O(n)
