# 字符串

## 获取字符串长度

`length`属性可以获取字符串长度，空格也会计算在内

```js
const s1 = 'string'
console.log(s1.length) // 6

const s2 = 'How are you doing today?'
console.log(s2.length) // 24
```

单个值可直接获取

```js
let str = '1,3'
console.log(str[0]) // 1
console.log(str[1]) // ,
console.log(str[2]) // 3
```

## split()

把一个字符串分割成字符串数组

语法 `str.split(separator,howmany)`

```js
let str = 'hello world'

str.split(' ') // ['hello', 'world']
str.split('') // ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
str.split(' ', 1) // ['hello']

'2:3:4:5'.split(':') // ['2', '3', '4', '5']
'|a|b|c'.split('|') // ['', 'a', 'b', 'c']
```

## substring()

截取字符串中介于两个指定下标之间的字符

语法：`str.substring(start,end)`
参数|描述
---|---
start|必需，非负整数
end|可选，非负整数，截取结果不包括该项

```js
let a = 'abcdef'
let b = a.substring(1, 3)
console.log(b) // bc

// 截取小数点后两位数字
let str = '22.123456'
let res = str.substring(0, str.indexOf('.') + 3)
console.log(res) // 22.12
```

## substr()

截取从 start 下标开始的指定数目的字符。作为遗留函数尽量避免使用，使用`substring()`代替

语法：`str.substr(start[, length])`
参数|描述
:---:|:---
start|起始下标。如果是负数，如-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
length|截取长度

```js
let a = 'abcdef'
a.substr(1, 3) // bcd
a.substr() // abcdef，这里无参数
```

## slice()

语法：`str.slice(start, end)`
参数|描述|
---|---
start|必需，起始下标。如果是负数，那么它规定从字符串尾部开始算起的位置。即-1 指最后一个字符，-2 指倒数第二个字符，以此类推
end|可选，结束下标，不包含该处。如果没有指定该参数，那么结果包含从 start 到结束的所有字符。若为负数，同上

示例：截取身份证

```js
let str = '330102197807280020'
let res = str.slice(4)
let res1 = str.replace(res, '**************')
console.log(res1) // 3301**************
```

## charAt()

返回指定位置的字符

例子：计算当前是星期几

```js
const day = '今天是星期' + '日一二三四五六'.charAt(new Date().getDay())
```

还有一些从代码量、代码效率、代码美观等方面都不太好的写法如下

```js
// 使用 if else
let str = ''
let week = new Date().getDay()
if (week == 0) {
  str = '今天是星期日'
} else if (week == 1) {
  str = '今天是星期一'
}
// 或者使用 switch
let str1 = '今天是星期'
let week = new Date().getDay()
switch (week) {
  case 0:
    str1 += '日'
    break
  case 1:
    str1 += '一'
    break
}
// 更进一步
let arr = new Array('日', '一', '二', '三', '四', '五', '六')
let week = new Date().getDay()
let day = '今天是星期' + arr[week]
```

## 单双引号转换

- 双引号替换成单引号

```js
let _adrobj = JSON.stringify(address).replace(/\"/g, "'")
```

- 单引号替换成双引号

```js
let _nstr = _adrdata.replace(/'/g, '"')
```

## 手机号校验

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

## UTC 时间格式转化为本地时间

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

## 截取时间日期

将`yy-mm-dd HH:mm:ss`日期时间格式分割，得到日期和时间

1. split

```js
let time = '2009-12-30 13:28:29'
let res = time.split(' ')
let date = res[0]
let time = res[1]
```

2. slice

```js
let str = '2019-08-18  00:00:00'
str.slice(0, 10) // 2019-08-18
```
