# 字符串

## 基础方法

### substr()

截取从 start 下标开始的指定数目的字符。

语法：`stringObject.substr(start,length)`
参数|描述
:---:|:---
start|必需。起始下标。如果是负数，如-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
length|可选。截取长度

```js
var a = 'abcdef'
var b = a.substr(1, 3)
console.log(b) //bcd
```

### substring()

截取字符串中介于两个指定下标之间的字符。

语法：`stringObject.substring(start,stop)`
参数|描述
---|---
start|必需，非负整数
stop|可选，非负整数，截取结果不包括该项

```js
var a = 'abcdef'
var b = a.substring(1, 3)
console.log(b) //bc
```

## 常见场景

### 手机号校验

校验手机号，号段主要有(不包括上网卡)：130~139、150~153，155~159，180~189、170~171、176~178。14 号段为上网卡专属号段

```js
let str = '17813102539'
let phone = str.replace(/\s/g, '') //去除空格
let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/
if (str.length == 0) {
  alert('请输入手机号')
} else {
  if (!regs.test(phone)) {
    alert('请输入正确的手机号')
  } else {
    console.log('success')
  }
}
```

### UTC 时间格式转化为本地时间

```js
function convertUTCTimeToLocalTime(UTCDateString) {
  if (!UTCDateString) {
    return '-'
  }
  function formatFunc(str) {
    return str > 9 ? str : '0' + str
  }
  const date2 = new Date(UTCDateString)
  const year = date2.getFullYear()
  const mon = formatFunc(date2.getMonth() + 1)
  const day = formatFunc(date2.getDate())
  let hour = date2.getHours()
  hour = formatFunc(hour)
  const min = formatFunc(date2.getMinutes())
  const dateStr = year + '-' + mon + '-' + day + ' ' + ' ' + hour + ':' + min
  return dateStr
}
```

### 截取时间日期

将“yy-mm-dd HH:mm:ss”日期时间格式分割分别得到日期和时间

#### 方法一、split

```js
let time = '2009-12-30 13:28:29'
let res = time.split(' ')
var date = res[0]
var time = res[1]
console.log(date)
console.log(time)
```

#### 方法二、slice

```js
let str = '2019-08-18  00:00:00'
let res = str.slice(0, 10)
console.log(res) // 2019-08-18
```

### 截取字符串

#### 1、slice

语法：`stringObject.slice(start, end)`

start（必需）：规定从何处开始选取。如果是负数，那么它规定从字符串尾部开始算起的位置。也就是说，-1 指最后一个字符，-2 指倒数第二个字符，以此类推。

end（可选）：规定从何处结束选取，即结束处的字符下标。如果没有指定该参数，那么截取的字符串包含从 start 到结束的所有字符。如果这个参数是负数，那么它规定的是从数组尾部开始算起的字符。

（1）、截取身份证

```js
let str = '330102197807280020'
let res = str.slice(4)
let res1 = str.replace(res, '**************')
console.log(res1) // 3301**************
```

#### 2、split

```js
let str = '3,25'
let arr = str.split(',')
console.log(arr) // ['3','25']
```

#### 3、单个值可直接获取

```js
var str = '1,3'
console.log(str[0]) // 1
console.log(str[1]) // ,
console.log(str[2]) // 3
```

#### 4、substring

截取小数点后两位数字

```js
let str = 22.123456
let res = num.substring(0, str.indexOf('.') + 3)
console.log(res)
```

### 单双引号转换

#### 1.双引号替换成单引号

```js
let _adrobj = JSON.stringify(address).replace(/\"/g, "'")
```

#### 2、单引号替换成双引号

```js
let _nstr = _adrdata.replace(/'/g, '"')
```
