# 枚举

枚举是组织收集有关联变量的一种方式

## 数字枚举

```typescript
enum Direction {
    NORTH,
    SOUTH,
    EAST,
    WEST
}
let dir: Direction = Direction.NORTH
console.log(dir)    // 0
let dirName: string = Direction[2]
console.log(dirName)    // EAST
let taoWa = Direction[Direction[Direction.SOUTH]]
console.log(taoWa)      // 1
```

被编译成js后的代码

```js {3}
var Direction;
(function (Direction) {
    Direction[Direction["NORTH"] = 0] = "NORTH";
    Direction[Direction["SOUTH"] = 1] = "SOUTH";
    Direction[Direction["EAST"] = 2] = "EAST";
    Direction[Direction["WEST"] = 3] = "WEST";
})(Direction || (Direction = {}));
var dir = Direction.NORTH;
console.log(dir); // 0
var dirName = Direction[2];
console.log(dirName); // EAST
var taoWa = Direction[Direction[Direction.SOUTH]];
console.log(taoWa); // 1
```

分析高亮行代码，`Direction["NORTH"] = 0`是将`Direction`对象中的`NORTH`属性值设为0，接着执行`Direction[0] = "NORTH"`

::: tip
js赋值运算符返回的是被赋予的值

```js
let a = []
function f() {
    return a['b'] = 0
}
f()    // 0
```

:::

数字枚举默认第一个值是从0开始，后续依次递增1，但是也可以改变任意枚举成员关联的数字

```typescript
enum Direction {
    NORTH,      // 0
    SOUTH = 3,  // 3
    EAST,       // 4
    WEST        // 5
}
```

## 字符串枚举

枚举类型的值可以是字符串

```typescript
enum Direction {
    NORTH = 'north',
    SOUTH = 'south',
    EAST = 'east',
    WEST = 'west'
}
let resData = 'east'        // 假设resData就是后端返回的值
let res = resData as Direction
if (res === Direction.NORTH) {
    console.log('密码正确')
} else {
    console.log('甩锅给后端')
}
```

## 常量枚举

```typescript
enum Dir {
    False,
    True,
    Undefined,
    Null
}
const r = Dir.False
```

编译成js后

```js
var Dir;
(function (Dir) {
    Dir[Dir["False"] = 0] = "False";
    Dir[Dir["True"] = 1] = "True";
    Dir[Dir["Undefined"] = 2] = "Undefined";
    Dir[Dir["Null"] = 3] = "Null";
})(Dir || (Dir = {}));
var r = Dir.False;
```

可以看到`const r = Dir.False`编译后没啥区别，还是存在变量`Dir`。如果使用常量枚举可以看到简化了很多

```typescript
const enum Dir {
    False,
    True,
    Undefined,
    Null
}
const r = Dir.False

// 编译后的js
var r = 0 /* False */;
```

## 枚举的静态方法

使用`namespace`可以给枚举类型添加静态方法

例子表示是否上班（不双休的就算了），注意`export`不可少

```typescript
enum Weekday {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

namespace Weekday {
    export function isBusinessDay(day: Weekday) {
        switch (day) {
            case Weekday.Saturday:
            case Weekday.Sunday:
                return false;
            default:
                return true;
        }
    }
}

const mon = Weekday.Monday;
const sun = Weekday.Sunday;

console.log(Weekday.isBusinessDay(mon)); // true
console.log(Weekday.isBusinessDay(sun)); // false
```

## 开放式枚举

可以拆分枚举块。在延续块中必须设置初始值，否则报错

```typescript
enum Color {
    Red,
    Green,
    Blue
}

enum Color {
    DarkRed = 3 ,
    DarkGreen,
    DarkBlue
}
```

编译后

```js
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
(function (Color) {
    Color[Color["DarkRed"] = 3] = "DarkRed";
    Color[Color["DarkGreen"] = 4] = "DarkGreen";
    Color[Color["DarkBlue"] = 5] = "DarkBlue";
})(Color || (Color = {}));
```
