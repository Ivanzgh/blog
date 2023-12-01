---
outline: deep
---

# Buffer

[API 地址](https://nodejs.org/api/buffer.html)

Buffer 是缓冲区，是一个类似于 Array 的对象，用于表示固定长度的字节序列

Buffer 本质是一段内存空间，专门用来处理二进制数据

## 特点

- Buffer 大小固定且无法调整
- Buffer 性能较好，可以直接对计算机内存进行操作
- 每个元素的大小为 1 字节

## 创建方式

### `Buffer.alloc()`

```js
let buf1 = Buffer.alloc(10);
console.log(buf1); // <Buffer 00 00 00 00 00 00 00 00 00 00>
```

### `Buffer.allocUnsafe()`

```js
let buf2 = Buffer.allocUnsafe(10);
console.log(buf2); // <Buffer 00 00 00 00 00 00 00 00 00 00>
```

allocUnsafe 创建的 buffer 可能包含旧的内存数据

```js
let buf3 = Buffer.allocUnsafe(10000);
console.log(buf3);
// <Buffer 00 00 00 00 00 00 00 00 fd 00 00 00 01 00 ... 9950 more bytes>
// 每次执行打印的结果还不一致
```

### `Buffer.from()`

```js
let buf4 = Buffer.from([11, 22, 33]);
console.log(buf4); // <Buffer 0b 16 21>

let buf5 = Buffer.from('hello');
console.log(buf5); // <Buffer 68 65 6c 6c 6f>

// buffer转为字符串，默认是 utf-8 编码
console.log(buf5.toString()); // hello

let buf6 = Buffer.from('中文');
console.log(buf6); // <Buffer e4 b8 ad e6 96 87>
```
