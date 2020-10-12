# 算法

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
[{
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
    }]
```

实现
```js
const arr = [
    {id: 1, value: "节点1", p_id: 0},
    {id: 2, value: "节点2", p_id: 1},
    {id: 3, value: "节点3", p_id: 1},
    {id: 4, value: "节点4", p_id: 2},
    {id: 5, value: "节点5", p_id: 0},
    {id: 6, value: "节点6", p_id: 5},
    {id: 7, value: "节点7", p_id: 6},
    {id: 8, value: "节点8", p_id: 6},
];
let getTree = (arr) => {
    return arr.reduce((prev, next) => {
        let finder = arr.find(item => item.id === next.p_id)
        if (finder) {
            (finder.children || (finder.children = [], finder.children)).push(next)
            prev.every(next => next.id !== finder.id) && prev.push(finder)
        }
        return prev
    }, [])
        .reduce((prev, next, i, arr) => (arr.every(item => item.id !== next.p_id) && prev.push(next), prev), [])
}
getTree(arr)
```
时间复杂度 O(n)