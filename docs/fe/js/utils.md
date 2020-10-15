# 老工具了
## 随机生成16进制颜色
```js
const getRandomColor = () => {
    return `#` + [0, 0, 0].map(() => (~~(Math.random() * 0x100)).toString(16).replace(/^(\d)$/, `0$1`)).join(``)
}
getRandomColor()
``` 

## 根据经纬度计算距离
```js
function toRadians(degree) {
    return degree * Math.PI / 180;
}
function distance(lon1,lat1,lon2,lat2) {
    const R = 6371;    // 地球半径 6371 km
    let deltaLatitude = toRadians(lat2 - lat1);
    let deltaLongitude = toRadians(lon2 - lon1);
    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);

    let a = Math.sin(deltaLatitude/2) * Math.sin(deltaLatitude/2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLongitude/2) * Math.sin(deltaLongitude/2);
    let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
    return R * c;
}
let res = distance(116.293598,40.227442,116.29216,40.200555);   
console.log(res)    // 3km
```

## 浮点数取整
通常使用`Math.floor()`、`Math.ceil()`、`Math.round()`，简便写法：
```js
console.log(~~8.666); // 8
console.log(8.666 >> 0); // 8
console.log(8.666 << 0); // 8
console.log(8.666 | 0); // 8
// >>>不可对负数取整
console.log(8.666 >>> 0); // 8
```

## 求幂运算
如求2的3次方
```js
Math.pow(2, 3)

// 简便写法
let res = 2 ** 3
```

## 去除字符串前后空格
### 原生js实现

```js
let str = '   17813102539'
let phone = str.replace(/\s/g, "")
console.log(phone)
```
或者
```js
let str = '  abc  '
function trim(str) {
    return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
}
console.log(trim(str))  // 'abc'
```

### jQuery实现

```js
let str = '  abc  '
$.trim(str) 
```

jquery的内部实现如下
```js
function trim(str){  
  return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');  
}
```


## Date日期对象与时间戳互相转换
### 将Date对象转换成时间戳
#### 方法一、Number()
```js
let newDay = new Date();
console.log(Number(newDay));
```
返回当前的时间的时间戳

#### 方法二、使用日期对象Date.parse()方法

```js
let newDay = new Date();
console.log(Date.parse(newDay));
```
也会返回当前时间的时间戳

#### 方法三、利用转义符进行转义

```js
let newDay = + new Date();
console.log(newDay);
```
**两种方法对比**

第一种使用数字对象的方法返回的时间戳，精确到了毫秒，而日期对象的Date.parse()方法只精确到了秒，
后三位都是用的0填充的，推荐第一种

### 将时间戳转换成Date对象
```js
let newDate = new Date('时间戳');  //实例化一个Date对象，将时间戳直接传入，注意一定是13位
let time_str = newDate.toLocaleDateString(); //可直接得到当地时间字符串
```
或者
```js
let timestamp3 = 1403058804000;  //声明一个时间戳
let newDate = new Date();  //实例化一个Date对象
newDate.setTime(timestamp3); //设置Date对象的时间为时间戳的时间
```

## 获取当前时间
```html
<input type="text" id="show" style="width: 300px;">

<script>
    function getTime(){
        let nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = (nowDate.getMonth() + 1) > 10 ? nowDate.getMonth() + 1 : '0' + (nowDate.getMonth() + 1);
        let day = nowDate.getDate() > 10 ? nowDate.getDate() : '0' + nowDate.getDate();
        let hour = nowDate.getHours() > 10 ? nowDate.getHours() : (nowDate.getHours() === 0 ? 24 : '0' + nowDate.getHours());
        let minutes = nowDate.getMinutes() >= 10 ? nowDate.getMinutes() : '0' + nowDate.getMinutes();
        let seconds = nowDate.getSeconds() > 10 ? nowDate.getSeconds() : '0' + nowDate.getSeconds();
        let str = year +"-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        document.getElementById("show").value = str;
    }
    window.setInterval("getTime()", 1000);
</script>
```
## 获取屏幕宽高
screen 屏幕

scroll 滚动
### 获取屏幕宽高
```js
window.screen.width
window.screen.height
```
### 获取body宽高
```js
//不含边框
document.body.clientWidth
document.body.clientHeight

//包含边框
document.body.offsetWidth 
document.body.offsetHeight 
```
### 获取网页宽高
```js
document.body.scrollWidth
document.body.scrollHeight
```

## 转义escape()、encodeURI()和decodeURI()
### encodeURI()　　
转义一个URI中的字符

语法：`encodeURI(url)`　

这个在编码不同的AJAX请求时，解决中文乱码问题经常用到。
```js
let str1 = "你好javascript";
let str2 = encodeURI(str1);
document.write(str2);   //输出%E4%BD%A0%E5%A5%BDjavascript 
```

### decodeURI()　　
解码一个URI中的字符

语法：`decodeURI(url)`

```js
let str1 = "你好javascript";
let str2 = encodeURI(str1);
document.write(str2);   //输出%E4%BD%A0%E5%A5%BDjavascript
let str3 = decodeURI(str2);
document.write("<br/>" + str3) //输出你好javascript
```

### encodeURIComponent()　　
转义URI组件中的字符
```js
let str1 = "你好javascript";
let str2 = encodeURIComponent(str1);
document.write(str2);   //输出%E4%BD%A0%E5%A5%BDjavascript
```

### decodeURIComponent()　　
解码一个URI组件中的字符
```js
let str1 = "你好javascript";
let str2 = encodeURIComponent(str1);
document.write(str2);   //输出%E4%BD%A0%E5%A5%BDjavascript
let str3 = decodeURIComponent(str2);
document.write("<br/>" + str3)  //输出    你好javascript
```

### escape()　　
编码一个字符串

语法：`escape(value)`

```js
let str = "javascript 你好";
let str1 = escape(str);
document.write(str1);　　//javascript%20%u4F60%u597D
```

### unecape()　　

解码一个由escape()函数编码的字符串

```js
window.onload = function () {
    let str = "javascript 你好";
    let str1 = escape(str);
    document.write(str1); //javascript%20%u4F60%u597D
    let str2 = unescape(str1);
    alert(str2);　　　　　　//弹出 javascript你好
}
```

## B、KB、MB、GB单位转换
```
conver(limit){
    let size = "";
    if ( limit < 0.1 * 1024 ){ //如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
    } else if (limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
    } else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else{ //其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    let sizestr = size + "";
    let len = sizestr.indexOf(".");
    let dec = sizestr.substr(len + 1, 2);
    if (dec === "00"){//当小数点后为00时 去掉小数部分
        return sizestr.substring(0,len) + sizestr.substr(len + 3,2);
    }
    return sizestr;
}
```
