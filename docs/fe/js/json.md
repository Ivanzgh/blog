# JSON

## json转化为数组

```js
function jsonToArray(obj){
    let r = {key:[],value:[]};
    for(let k in obj){
        if(!obj.hasOwnProperty(k)){
            continue;
        }
        r.key.push(k);
        r.value.push(obj[k]);
    }
    return r;
}
let json = {"a":1,"b":2,"c":3,"d":4,"e":5};
let arrJson = jsonToArray(json);
console.log(arrJson);
console.log("key:" + arrJson.key[0]);   //key:a
console.log("value:" + arrJson.value[0]); //value:1
console.log("keylen:" + arrJson.key.length); //keylen:5
```

`hasOwnProperty`表示是否有自己的属性。这个方法会查找一个对象是否有某个属性，但是不会去查找它的原型链。

## 格式化JSON代码

`JSON.stringify()` 不仅可以简单地将对象转化为字符串，也可以用它来格式化JSON输出

```js
const obj = {
foo: { bar: [11, 22, 33, 44], baz: { bing: true, boom: 'Hello' } }
};
// The third parameter is the number of spaces used to
// beautify the JSON output.
JSON.stringify(obj, null, 4);
// =>"{
// =>    "foo": {
// =>        "bar": [
// =>            11,
// =>            22,
// =>            33,
// =>            44
// =>        ],
// =>        "baz": {
// =>            "bing": true,
// =>            "boom": "Hello"
// =>        }
// =>    }
// =>}"
```

JSON.parse()能将json格式的字符串转化为json对象

::: warning
JSON.parse()和JSON.stringify()支持IE8及其以上版本
:::

## 通过key获取value

### 直接获取

```js
const getJson = function(key){
    const json = {"a":1,"b":2,"c":3,"d":4,"e":5};
        return json[key];
    };
getJson("a")      // 1
```

### eval()

`eval()`函数可计算某个字符串，并执行其中的的 js 代码

```js
function getJson(key) {
    const json = {"a":1,"b":2,"c":3,"d":4,"e":5};
    return eval('json.'+ key)
}
getJson('a')   // 1
```

### 遍历json获取其属性

```js
function getJson(key) {
    const json = {"a":1,"b":2,"c":3,"d":4,"e":5};
    for (let i in json) {
        if (i === key) {
            return json[i]    // 1
        }
    }
}
getJson('a')
```
