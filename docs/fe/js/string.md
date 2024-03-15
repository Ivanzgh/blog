---
outline: deep
---

# 字符串

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;width:100%; height:500px;" src="https://www.processon.com/embed/642bcbd74b2eec0a2e99309a"></iframe>

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
```

## 获取字符串指定位置的值

### charAt()

获取指定位置的字符

与通过索引值获取的区别是：

- 当索引值不在字符串长度范围内时，str[index]会返回 undefined，而 charAt(index)会返回空字符串
- str[index]不兼容 ie6-ie8，charAt(index)可以兼容

```js
const str = 'zgh'
str.charAt(1) // g
str[1] // g

str.charAt(3) // ''
str[3] // undefined
```

示例：计算当前是星期几

```js
const day = '今天是星期' + '日一二三四五六'.charAt(new Date().getDay())
```

延伸：

```js
const arr = ['日', '一', '二', '三', '四', '五', '六']
const week = new Date().getDay()
const day = '今天是星期' + arr[week]
```

### chatCodeAt()

获取指定位置字符的 Unicode 值，返回值是 0 - 65535 之间的整数，表示给定索引处的 UTF-16 代码单元，如果指定位置没有字符，将返回 NaN

```js
let str = 'abcdefg'
str.charCodeAt(1) // 98
```

## 检索是否包含指定的字符

### indexOf()

查找某个字符，有则返回第一次匹配到的索引位置，否则返回-1。接收两个参数：

- searchvalue：必需，规定需检索的字符串值
- fromindex：可选的整数参数，规定开始检索的位置。取值范围是 0 到 `string.length - 1`。如省略则从首字符开始检索

```js
const str = 'abcdefgabc'
console.log(str.indexOf('a')) // 0
console.log(str.indexOf('z')) // -1
console.log(str.indexOf('c', 4)) // 9
```

### lastIndexOf()

查找某个字符，返回最后一次匹配到的索引位置，否则返回-1

```js
'zghzgh'.lastIndexOf('z') // 3
```

### includes()

判断字符串是否包含指定的字符串。返回 true 或 false。接收两个参数：

- searchvalue：必需，要查找的字符串
- start：可选，设置从那个位置开始查找，默认为 0

```js
'zgh'.includes('g') // true
```

### startsWith()

检测字符串是否以指定的字符串开始。返回 true 或 false。接收两个参数：字符串、查找位置

```js
const str = 'Hello world!'

str.startsWith('Hello') // true
str.startsWith('wo', 6) // true
```

### endsWith()

检测字符串是否以指定的字符串结尾。返回 true 或 false。接收两个参数：

- 要搜索的字符串
- 字符串的长度 n，从字符串的前 n 个字符中进行检索，默认值为原始字符串长度 string.length

```js
const str = 'Hello world!'

str.endsWith('!') // true
str.endsWith('lo', 5) // true
```

## 截取字符串

### substring()

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

### slice()

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

### substr()

截取从 start 下标开始的指定数目的字符。**作为遗留函数尽量避免使用**，使用`substring()`代替

语法：`str.substr(start[, length])`
参数|描述
:---:|:---
start|起始下标。如果是负数，如-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
length|截取长度

```js
const a = 'abcdef'
a.substr(1, 3) // bcd
a.substr() // abcdef，这里无参数
```

## 将字符串分割为数组

### split()

把一个字符串分割成字符串数组，不改变原始字符串

语法 `str.split(separator, howmany)`

- separator：字符串或正则表达式，从该参数指定的地方分割
- howmany：指定返回的数组的最大长度

```js
let str = 'hello world'

str.split(' ') // ['hello', 'world']
str.split('') // ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
str.split(' ', 1) // ['hello']

'2:3:4:5'.split(':') // ['2', '3', '4', '5']
'|a|b|c'.split('|') // ['', 'a', 'b', 'c']
```

## 连接多个字符串

### concat()

连接多个字符串，不会改变原始数据，返回新的字符串

```js
const str1 = 'hello'
const str2 = 'world'
const str3 = '!'

const res = str1.concat(str2, str3) // helloworld!
```

在实际开发中，更多的是使用加操作符+、模版字符串``

## 匹配、替换

### replace()

替换字符串，接收两个参数：

- 被替换的字符串或者正则表达式
- 要替换的值，可以是字符串或者返回字符串的函数

```js
'zgh'.replace('z', 'zhang') // zhanggh

const str = 'hello world'
str.replace(/world/gi, 'zgh') // 'hello zgh'
```

### match()

在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。返回指定的值，不是位置

```js
const str = 'abcdef'
str.match('c') // ["c", index: 2, input: "abcdef", groups: undefined]
str.match(/c/) // ["c", index: 2, input: "abcdef", groups: undefined]
str.match(/c/g) // ["c"]
```

### search()

检索字符串中指定的字符串，或检索与正则表达式相匹配的子字符串。返回字符串中第一个与正则表达式相匹配的子串的起始位置

```js
const str = 'abcdef'
str.search(/bcd/) // 1
```

## 大小写转换

### toLowerCase()

```js
const str = 'ZGH'
str.toLowerCase() // zgh
```

### toUpperCase()

```js
const str = 'zgh'
str.toUpperCase() // ZGH
```

## 移除首尾空白符

### trim()

移除字符串首尾空白符，不会改变原始数据

```js
const str = '  abcdef  '
str.trim() // "abcdef"
```

### trimStart()

返回一个去除了开头空白的字符串，不会改变原始数据

```js
const s = '  abc  '
s.trimStart() // "abc  "
```

### trimEnd()

返回一个去除了结尾空白的字符串，不会改变原始数据

```js
const s = '  abc  '
s.trimEnd() // "  abc"
```

## 重复字符串

### repeat()

重复字符串 n 次，不会改变原始数据

```js
const str = 'zgh'
str.repeat(2) // 'zghzgh'
```

## 补齐字符串长度

### padStart()

用于头部补全。接收两个参数：

- 第一个参数是一个数字，表示字符串补齐之后的长度
- 第二个参数是用来补全的字符串 ​

1、如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串：`'z'.padStart(1, 'gh') // 'z'`

2、如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串：

```js
'z'.padStart(5, 'gh') // 'ghghz'
```

3、如果省略第二个参数，默认使用空格补全长度：`'z'.padStart(4) // ' z'`

4、常见用途是为数值补全指定位数，例如将返回的数字补齐为三位：

```js
'1'.padStart(3, '0') // '001'
'15'.padStart(3, '0') // '015'
```

### padEnd()

用于尾部补全。接收两个参数，第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串

```js
'z'.padEnd(5, 'gh') // 'zghgh'
```

## 字符串转为数字

### parseInt()

可解析一个字符串，并返回一个整数。该方法有两个参数：

- string：必需。要被解析的字符串。
- radix：可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。

当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。

```js
parseInt('10') // 10
parseInt('17', 8) // 15
parseInt('010') // 10
```

当参数 radix 的值以 “0x” 或 “0X” 开头，将以 16 为基数：`parseInt("0x10") // 16`

如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN：`parseInt("50", 1)`

只有字符串中的第一个数字会被返回，当遇到第一个不是数字的字符为止:`parseInt("40 4years") // 40`

如果字符串的第一个字符不能被转换为数字，就会返回 NaN：`parseInt("new100") // NaN`

字符串开头和结尾的空格是允许的：`parseInt(" 60 ") // 60`

### parseFloat()

可解析一个字符串，并返回一个浮点数。如果参数的第一个字符不能被解析成为数字，则返回 NaN

```js
parseFloat('10.00') // 10.00
parseFloat('10.01') // 10.01
parseFloat('-10.01') // -10.01
parseFloat('10.5 years') // 10.5
parseFloat('new40.5') // NaN
```

## 单双引号转换

```js
// 双引号替换成单引号
let _adrobj = JSON.stringify(address).replace(/\"/g, "'")

// 单引号替换成双引号
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
   const fullTime = '2009-12-30 13:28:29'
   const res = fullTime.split(' ')
   const date = res[0]
   const time = res[1]
   ```

2. slice

   ```js
   const str = '2019-08-18  00:00:00'
   str.slice(0, 10) // 2019-08-18
   ```

## 截取文件后缀

```js
const fileName = 'file.pdf'

// 方法1
const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1)

// 方法2
const fileExtension = fileName.substring(fileName.length - 3, fileName.length).toLowerCase()

// 方法3
const fileExtension = fileName.split('.').pop().toLowerCase()
```
