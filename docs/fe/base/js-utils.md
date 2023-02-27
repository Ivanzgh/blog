# 老工具了

## 随机生成 16 进制颜色

```js
const getRandomColor = () => {
  return `#` + [0, 0, 0].map(() => (~~(Math.random() * 0x100)).toString(16).replace(/^(\d)$/, `0$1`)).join(``)
}
getRandomColor()
```

## 根据经纬度计算距离

```js
function toRadians(degree) {
  return (degree * Math.PI) / 180
}
function distance(lon1, lat1, lon2, lat2) {
  const R = 6371 // 地球半径 6371 km
  let deltaLatitude = toRadians(lat2 - lat1)
  let deltaLongitude = toRadians(lon2 - lon1)
  lat1 = toRadians(lat1)
  lat2 = toRadians(lat2)

  let a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
let res = distance(116.293598, 40.227442, 116.29216, 40.200555)
console.log(res) // 3km
```

## 浮点数取整

通常使用`Math.floor()`、`Math.ceil()`、`Math.round()`，简便写法：

```js
console.log(~~8.666) // 8
console.log(8.666 >> 0) // 8
console.log(8.666 << 0) // 8
console.log(8.666 | 0) // 8
// >>>不可对负数取整
console.log(8.666 >>> 0) // 8
```

## 求幂运算

如求 2 的 3 次方

```js
Math.pow(2, 3)

// 简便写法
let res = 2 ** 3
```

## 去除字符串前后空格

### 原生 js 实现

```js
let str = '   17813102539'
let phone = str.replace(/\s/g, '')
console.log(phone)
```

或者

```js
let str = '  abc  '
function trim(str) {
  return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '')
}
console.log(trim(str)) // 'abc'
```

### jQuery 实现

```js
let str = '  abc  '
$.trim(str)
```

jquery 的内部实现如下

```js
function trim(str) {
  return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '')
}
```

## 时间处理

### 获取一天以 5 分钟为间隔的时间数组

```js
const minute = 5 //间隔分钟
const seconds = minute * 60
const len = (60 * 24 * 60) / seconds //数组长度
let newArr = []
let total = 0
for (let i = 0; i < len; i++) {
  let h = parseInt(total / 3600),
    min = parseInt((total % 3600) / 60)
  newArr.push((h < 10 ? '0' + h : h) + ':' + (min < 10 ? '0' + min : min))
  total += seconds
}
console.log(newArr) // ['00:00', '00:05', '00:10', ..., '23:55']
```

### 获取一分钟内以 2s 间隔组成的时间

```sh
npm install dayjs --save
```

```js
import dayjs from 'dayjs'

const nowTime = dayjs().format('HH:mm:ss')
let key = []
for (let i = 60; i > 0; i--) {
  if (i % 2 == 0) {
    key.push(i)
  }
}
let arr = [],
  time = ''
for (let i = 0; i < key.length; i++) {
  time = dayjs().subtract(key[i], 's').format('HH:mm:ss')
  arr.push(time)
}
const res = [...arr, nowTime]
```

### 实时显示当前日期时间

```js
import dayjs from 'dayjs'
const formatWeek = ['日', '一', '二', '三', '四', '五', '六']

function showNowTime() {
  this.timer = setInterval(() => {
    let year = dayjs().format('YYYY')
    let month = dayjs().format('MM').substring(0, 1) === '0' ? dayjs().format('MM').substring(1) : dayjs().format('MM')
    let day = dayjs().format('DD').substring(0, 1) === '0' ? dayjs().format('DD').substring(1) : dayjs().format('DD')
    this.nowDate = `${year}年${month}月${day}日`
    this.nowTime = dayjs().format('HH:mm:ss')
    this.nowDay = '星期' + formatWeek[dayjs().day()]
  }, 1000)
}
```

## 分钟格式化转为天、时、分

```js
function formatMinutes(minutes) {
  const day = parseInt(Math.floor(minutes / 1440))
  const hour = day > 0 ? Math.floor((minutes - day * 1440) / 60) : Math.floor(minutes / 60)
  const minute = hour > 0 ? Math.floor(minutes - day * 1440 - hour * 60) : minutes
  let time = ''
  if (day > 0) time += day + 'd'
  if (hour > 0) time += hour + 'h'
  if (minute > 0) time += minute + 'm'
  return time
}
```

## Date 日期对象与时间戳互相转换

### 将 Date 对象转换成时间戳

#### 方法一、Number()

```js
let newDay = new Date()
console.log(Number(newDay))
```

返回当前的时间的时间戳

#### 方法二、使用日期对象 Date.parse()方法

```js
let newDay = new Date()
console.log(Date.parse(newDay))
```

也会返回当前时间的时间戳

#### 方法三、利用转义符进行转义

```js
let newDay = +new Date()
console.log(newDay)
```

方法对比:

第一种使用数字对象的方法返回的时间戳，精确到了毫秒，而日期对象的 Date.parse()方法只精确到了秒，
后三位都是用的 0 填充的，推荐第一种

### 将时间戳转换成 Date 对象

```js
let newDate = new Date('时间戳') //实例化一个Date对象，将时间戳直接传入，注意一定是13位
let time_str = newDate.toLocaleDateString() //可直接得到当地时间字符串
```

或者

```js
let timestamp3 = 1403058804000 //声明一个时间戳
let newDate = new Date() //实例化一个Date对象
newDate.setTime(timestamp3) //设置Date对象的时间为时间戳的时间
```

## 获取当前时间

```html
<input type="text" id="show" style="width: 300px;" />

<script>
  function getTime() {
    let nowDate = new Date()
    let year = nowDate.getFullYear()
    let month = nowDate.getMonth() + 1 > 10 ? nowDate.getMonth() + 1 : '0' + (nowDate.getMonth() + 1)
    let day = nowDate.getDate() > 10 ? nowDate.getDate() : '0' + nowDate.getDate()
    let hour = nowDate.getHours() > 10 ? nowDate.getHours() : nowDate.getHours() === 0 ? 24 : '0' + nowDate.getHours()
    let minutes = nowDate.getMinutes() >= 10 ? nowDate.getMinutes() : '0' + nowDate.getMinutes()
    let seconds = nowDate.getSeconds() > 10 ? nowDate.getSeconds() : '0' + nowDate.getSeconds()
    let str = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
    document.getElementById('show').value = str
  }
  window.setInterval('getTime()', 1000)
</script>
```

## 获取宽高

screen 屏幕

scroll 滚动

### 获取屏幕宽高

```js
window.screen.width
window.screen.height
```

### 获取 body 宽高

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

## 转义 escape()、encodeURI()和 decodeURI()

### encodeURI()　　

转义一个 URI 中的字符

语法：`encodeURI(url)`

这个在编码不同的 AJAX 请求时，解决中文乱码问题经常用到。

```js
let str1 = '你好javascript'
let str2 = encodeURI(str1)
document.write(str2) //输出%E4%BD%A0%E5%A5%BDjavascript
```

### decodeURI()

解码一个 URI 中的字符

语法：`decodeURI(url)`

```js
let str1 = '你好javascript'
let str2 = encodeURI(str1)
document.write(str2) //输出%E4%BD%A0%E5%A5%BDjavascript
let str3 = decodeURI(str2)
document.write('<br/>' + str3) //输出你好javascript
```

### encodeURIComponent()

转义 URI 组件中的字符

```js
let str1 = '你好javascript'
let str2 = encodeURIComponent(str1)
document.write(str2) //输出%E4%BD%A0%E5%A5%BDjavascript
```

### decodeURIComponent()

解码一个 URI 组件中的字符

```js
let str1 = '你好javascript'
let str2 = encodeURIComponent(str1)
document.write(str2) //输出%E4%BD%A0%E5%A5%BDjavascript
let str3 = decodeURIComponent(str2)
document.write('<br/>' + str3) //输出    你好javascript
```

### escape()

编码一个字符串

语法：`escape(value)`

```js
let str = 'javascript 你好'
let str1 = escape(str)
document.write(str1) //javascript%20%u4F60%u597D
```

### unecape()　　

解码一个由 escape()函数编码的字符串

```js
window.onload = function () {
  let str = 'javascript 你好'
  let str1 = escape(str)
  document.write(str1) //javascript%20%u4F60%u597D
  let str2 = unescape(str1)
  alert(str2) //弹出 javascript你好
}
```

## B、KB、MB、GB 单位转换

```js
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

## 查找英文文章中出现频率最高的单词

```js
function findMostWord(article) {
  if (!article) return

  article = article.trim().toLowerCase()

  let wordList = article.match(/[a-z]+/g),
    visited = [],
    maxNum = 0,
    maxWord = ''

  article = ' ' + wordList.join('  ') + ' '

  wordList.forEach(function (item) {
    if (visited.indexOf(item) < 0) {
      visited.push(item)

      let word = new RegExp(' ' + item + ' ', 'g')
      let num = article.match(word).length

      if (num > maxNum) {
        maxNum = num
        maxWord = item
      }
    }
  })

  return maxWord + '  ' + maxNum
}
```

## 检测是否是 IE 浏览器

```js
!!window.ActiveXObject || 'ActiveXObject' in window ? true : false
```

## 检测浏览器类型

```js
function getBrowser() {
  const str = navigator.userAgent
  const list = ['Chrome', 'Safari', 'Firefox', 'Opera']
  for (let i = 0; i < list.length; i++) {
    const e = list[i]
    if (str.includes(e)) {
      return e
    }
  }
  return 'other'
}
```

## 密码强度判断

```js
/**
 * 纯数字、纯字母 = 弱
 * 数字 + 字母 & 小于10位 = 中
 * 数字 + 字母 & 大于等于10位 = 强
 */
export const passwordStrength = function (val) {
  const num = /^\d+$/
  const eng = /^([a-zA-Z]+)$/
  if (num.test(val) || eng.test(val)) {
    return 0
  }
  if (!num.test(val) && !eng.test(val) && val.length < 10) {
    return 1
  }
  if (!num.test(val) && !eng.test(val) && val.length >= 10) {
    return 2
  }
}
```

## 截取浏览器路径

```js
clearUrl() {
  let url = window.location.href
  if (url.indexOf('/?') != -1) {
    url = url.split('/?')[0] + '#/workbench'
  }
  localStorage.removeItem('account.forceToken')
  window.history.pushState({}, 0, url)
}
```

获取最后一个斜杠后的内容

```js
const url = '/dataManage/projectStage'
const index = url.lastIndexOf('/')
const router = url.substring(index + 1, url.length)
console.log(router) // projectStage
```

## 对象数组转换

```js
/**
 * const obj = { a1: 1, b1: 2, a2: 3, b2: 4 }
 * const arr = [{ a: 1, b: 2 }, { a: 3, b: 4 }]
 */

const res = Object.values(
  Object.entries(obj).reduce(
    (acc, [key, val]) => (Object.assign((acc[[key.match(/\d/)]] ||= {}), { [key.replace(/\d/, '')]: val }), acc),
    {}
  )
)
console.log(JSON.stringify(res))
```

`||=`表示或等于，`a ||= b` 等同于 `a || (a = b)`
`&&=`表示且等于，`a &&= b` 等同于 `a && (a = b)`

## 经纬度格式化

度转为度分秒

```js
function transformLonlatToDD(lon, lat) {
  //利用 >> 位运算符取整
  const lonUnit = lon > 0 ? 'E' : 'W'
  const latUnit = lat > 0 ? 'N' : 'S'
  const resLon = lonlat(lon) + lonUnit
  const resLat = lonlat(lat) + latUnit
  return [resLon, resLat]
}

function lonlat(coordinate) {
  const d = coordinate >> 0 // 度
  const m = ((coordinate % 1) * 60) >> 0 // 分
  const s = ((((coordinate % 1) * 60) % 1) * 60) >> 0 // 秒
  const ms = ((((coordinate % 1) * 60) % 1) * 60) % 1
  const mss = Math.round(parseFloat(ms) * 100) / 100 // 四舍五入，保留两位小数
  const lon23 = Math.abs(s) + mss
  const res = Math.abs(d) + 'º' + Math.abs(m) + "'" + lon23.toFixed(2) + "''"
  return res
}
```

## js 实现拖拽功能

- 当鼠标移点击元素时，触发`mousedown`事件，让元素变为可移动状态
- 当鼠标在移动时，触发`mousemove`事件，先判断元素是否处于可移动状态
- 当鼠标松开时，触发`mouseup`事件，使元素变为不可移动状态

```js
/**
<div id='box'></div>

#box {
  width: 50px;
  height: 50px;
  background-color: #f00;
  border-radius: 50%;
  cursor: pointer;
  position: absolute;
}
*/

const box = document.getElementById('box')
let isMove = false
box.addEventListener('mousedown', () => {
  isMove = true
})
box.addEventListener('mouseup', () => {
  isMove = false
})

document.addEventListener('mousemove', (e) => {
  if (!isMove) return
  const x = e.pageX - box.offsetWidth / 2
  const y = e.pageY - box.offsetHeight / 2
  box.style.left = `${x}px`
  box.style.top = `${y}px`
})
```

## 计算数组中元素出现的次数，并实现去重

```js
function getCount(arr, rank,ranktype){
    let obj = {}, k, arr1 = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        k = arr[i];
        if (obj[k]) {
            obj[k]++;
        } else {
            obj[k] = 1;
        }
    }
    //保存结果{el-'元素'，count-出现次数}
    for (let o in obj) {
        arr1.push({el: o, count: obj[o]});
    }
    //排序（降序）
    arr1.sort(function (n1, n2) {
        return n2.count - n1.count
    });
    //如果ranktype为1，则为升序，反转数组
    if(ranktype===1){
        arr1=arr1.reverse();
    }
    const rank1 = rank || arr1.length;
    return arr1.slice(0,rank1);
}

getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])//默认情况，返回所有元素出现的次数
getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)//传参（rank=3），只返回出现次数排序前三的
getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)//传参（ranktype=1,rank=null），升序返回所有元素出现次数
getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)//传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的


    // getCount(data) {
    //   let obj = {},
    //     k,
    //     arr1 = []
    //   for (let i = 0, len = data.length; i < len; i++) {
    //     k = data[i]
    //     if (obj[k]) {
    //       obj[k]++
    //     } else {
    //       obj[k] = 1
    //     }
    //   }
    //   for (let o in obj) {
    //     arr1.push({ el: o, count: obj[o] })
    //   }
    //   arr1.sort((n1, n2) => n2.count - n1.count)
    //   return arr1.slice(0, arr1.length)
    // },

    // 直接传入对象数组
  funtion getCount2(data) {
      let obj = {},
        k,
        arr1 = []
      for (let i = 0, len = data.length; i < len; i++) {
        k = data[i].location
        if (obj[k]) {
          obj[k] = { num: obj[k].num + 1, params: data[i] }
        } else {
          obj[k] = { num: 1, params: data[i] }
        }
      }
      for (let o in obj) {
        arr1.push({ location: o, num: obj[o].num, params: obj[o].params })
      }
      return arr1.slice(0, arr1.length)
    }
```

## 获取范围内的随机整数

```js
getRandom(n, m) {
  return Math.floor(Math.random() * (m - n + 1) + n)
}

getRandom(1, 100)
getRandom(0, 5)
```

## 查找树形元素

```js
const data = [
  {
    id: 1,
    name: '终端管理',
    pid: 0,
    children: [
      {
        id: 2,
        name: '终端列表',
        pid: 1,
        children: [{ id: 4, name: '添加终端', pid: 2 }]
      },
      { id: 3, name: '划拨设备', pid: 1 }
    ]
  },
  {
    id: 5,
    name: '系统设置',
    pid: 0,
    children: [
      {
        id: 6,
        name: '权限管理',
        pid: 5,
        children: [
          { id: 7, name: '用户角色', pid: 6 },
          { id: 8, name: '菜单设置', pid: 6 }
        ]
      }
    ]
  }
]
function getChidlren(data, id) {
  let hasFound = false, // 表示是否找到id值
    result = null
  const fn = function (data) {
    if (Array.isArray(data) && !hasFound) {
      data.forEach((item) => {
        if (item.id === id) {
          result = item
          hasFound = true
        } else if (item.children) {
          fn(item.children)
        }
      })
    }
  }
  fn(data)
  return result
}
getChidlren(data, 3)
```

## 数组拆分

```js
// array需要拆分的数组,size每组数组多少个
function arrayChunk(array, size) {
  let data = []
  for (let i = 0; i < array.length; i += size) {
    data.push(array.slice(i, i + size))
  }
  return data
}

const arr = [1, 2, 3, 4]
arrayChunk(arr, 2) // [[1, 2], [3, 4]]
```