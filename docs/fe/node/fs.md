---
outline: deep
---

# fs 文件系统

[API 地址](https://nodejs.org/api/fs.html)

fs 模块可以实现与硬盘的交互。例如文件的创建、删除、重命名、移动，还有文件内容的写入、读取以及文件夹的相关操作

## 文件读取

### fs.readFile()

[API](https://nodejs.cn/api/fs.html#fsreadfilepath-options-callback)

语法：`fs.readFile(path[, options], callback)`

异步地读取文件的全部内容。如果未指定编码，则返回原始缓冲区

`fs.readFile()` 函数缓冲整个文件。 为了最小化内存成本，在可能的情况下优先通过 `fs.createReadStream()` 进行流式传输

```js
const fs = require('fs');

fs.readFile('./1.txt', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### fs.readFileSync()

语法：`fs.readFileSync(path[, options])`

同步地读取文件的全部内容，返回 string 或 buffer

```js
const data = fs.readFileSync('./1.txt', { encoding: 'utf-8' });
console.log(data);
```

### fs.createReadStream()

流式读取文件

如果是文本类文件可以使用 `toString()`查看内容，视频不能使用否则会乱码

打印读取的文件长度，会打印出多个**65536**，这个数字表示字节，也就是 64kb

```js
const rs = fs.createReadStream('./index.mp4');
rs.on('data', (chunk) => {
  // console.log(chunk.toString());
  console.log(chunk.length);
});
// 可选
rs.on('end', () => {
  console.log('读取完成');
});
```

### 参数解析

#### path

path 的类型可以是 string、Buffer、URL、integer

1、文件的相对路径或者绝对路径对应的就是 string 类型

2、Buffer 类型

```js
const fileBuffer = Buffer.from('./1.txt', 'utf-8');
fs.readFile(fileBuffer, { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

3、URL 类型，将想要访问的文件地址转换成 URL 对象，仅支持使用 file 协议

```js
const fileURL = new URL('file:///Users/zgh/code/blog/1.txt');
fs.readFile(fileURL, { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

4、integer 指的是**文件描述符**，文件描述符指的是每个打开的文件都分配了一个数字标识符，在 fs 中可以根据文件描述符 fd 来操作文件

```js
fs.open('./1.txt', 'r', (err, fd) => {
  if (err) throw err;
  console.log(fd);
  fs.readFile(fd, 'utf8', (e, data) => {
    if (e) throw e;
    console.log(data);
  });
});
```

#### options

options 有两个参数：`encoding` 和 `flag`。 encoding 代表读取文件的编码格式，如果没有指定 encoding，则返回原始的 Buffer，它的值主要有：

```sh
type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";
```

文件系统标志 flag 常用的值主要有：

```sh
'a':  打开文件用于追加。 如果文件不存在，则创建该文件。
'ax':  类似于 'a'，但如果路径存在，则失败。
'as':  打开文件用于追加（在同步模式中）。 如果文件不存在，则创建该文件。
'as+':  打开文件用于读取和追加（在同步模式中）。 如果文件不存在，则创建该文件。
'r':  打开文件用于读取。 如果文件不存在，则会发生异常。
'r+':  打开文件用于读取和写入。 如果文件不存在，则会发生异常。
'rs+':  打开文件用于读取和写入（在同步模式中）。 指示操作系统绕过本地的文件系统缓存。
'w':  打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件。
'wx':  类似于 'w'，但如果路径存在，则失败。
'w+':  打开文件用于读取和写入。 如果文件不存在则创建文件，如果文件存在则截断文件。
'wx+':  类似于 'w+'，但如果路径存在，则失败。
```

#### callback

callback 指的是读取文件完成以后的回调函数，参数有两个：error、data。error 表示错误信息，data 根据 encoding 而定，默认为 Buffer

### 读取方式的区别

readFile、read、createReadStream

### 读取文件的场景

- 电脑开机
- 程序运行
- 编辑器打开文件
- 查看图片、视频、音乐
- 上传文件
- git 查看日志

## 文件写入

### fs.writeFile()

[API](https://nodejs.cn/api/fs.html#fswritefilefile-data-options-callback)

语法：`fs.writeFile(file, data[, options], callback)`

**异步**地将数据写入文件。

- 当 file 参数是文件名时，如果文件已经存在，则覆盖该文件，如果文件不存在，则创建文件
- 当 file 参数是文件描述符时，文件不会被替换

### fs.writeFileSync()

[API](https://nodejs.cn/api/fs.html#fswritefilesyncfile-data-options)

语法：`fs.writeFileSync(file, data[, options])`

**同步**写入文件，返回 `undefined`

```js
const fs = require('fs');

fs.writeFile('./1.txt', '异步写入', (err) => {
  if (err) {
    console.log('写入失败');
    throw err;
  } else {
    console.log('写入成功');
  }
});

fs.writeFileSync('./1.txt', '同步写入');
```

### fs.appendFile()

[API](https://nodejs.cn/api/fs.html#fsappendfilepath-data-options-callback)

语法：`fs.appendFile(path, data[, options], callback)`

异步地将数据追加到文件的尾部，如果该文件尚不存在，则创建该文件

### fs.appendFileSync()

[API](https://nodejs.cn/api/fs.html#fsappendfilesyncpath-data-options)

语法：`fs.appendFileSync(path, data[, options])`

**同步**地将数据追加到文件中，如果文件尚不存在则创建该文件

```js
fs.appendFile('./1.txt', '\nhello', (err) => {
  if (err) throw err;
  console.log('追加成功');
});

fs.appendFileSync('./1.txt', '\nworld');
```

### fs.createWriteStream()

语法：`fs.createWriteStream(path[, options])`
流式写入文件

```js
const ws = fs.createWriteStream('./1.txt');
ws.write('hello');
ws.write('world');
ws.close();
```

### 写入方式的区别

writeFile、write、createWriteStream

createWriteStream 适合大文件写入或者频繁写入的场景，writeFile 适合写入频率较低的场景

### 写入文件的场景

当需要持久化保存数据的时候，需要文件写入

- 下载文件
- 安装软件
- 保存程序日志
- 编辑器保存文件
- 视频录制

## 删除文件

### fs.unlink()

语法：`fs.unlink(path, callback)`

异步地删除文件或符号链接。不适用目录，删除目录要使用`fs.rmdir()`

```js
fs.unlink('./1.txt', (err) => {
  if (err) throw err;
  console.log('删除成功');
});
```

### fs.unlinkSync()

语法：`fs.unlinkSync(path)`
同步删除文件

## 打开文件

### fs.open()

[API](https://nodejs.cn/api/fs.html#fsopenpath-flags-mode-callback)

语法：`fs.open(path[, flags[, mode]], callback)`

异步地打开文件，返回的数据为文件描述符

### fs.opendir()

语法：`fs.opendir(path[, options], callback)`

打开目录

## 复制文件夹

```js
let path = require('path');
let fs = require('fs');

function copyFile({ src, dest }) {
  fs.readdir(path.resolve(src), (err, files) => {
    if (err) {
      console.log('获取文件夹失败');
      throw err;
    } else {
      files.forEach((item) => {
        let oldFile = path.resolve(src, item);
        let newFile = path.resolve(dest, item);
        fs.copyFile(oldFile, newFile, (err) => {
          if (err) throw err;
          console.log(oldFile + '复制到' + newFile);
        });
      });
    }
  });
}

const params = {
  src: './src/beijing', // 要复制的源文件名
  dest: './src/shanghai' // 复制操作的目标文件名
};
copyFile(params);
```

## 更改文件名称

```js
let path = require('path');
let fs = require('fs');

function rename({ dest, from, to }) {
  fs.readdir(path.resolve(dest), (err, files) => {
    if (err) {
      console.log('获取文件夹失败');
      throw err;
    } else {
      files.forEach((item) => {
        let oldName = path.resolve(dest, item);
        let newName = oldName.replace(from, to);
        fs.rename(oldName, newName, (renameErr) => {
          if (renameErr) throw renameErr;
          console.log(oldName + '文件名称改为:' + newName);
        });
      });
    }
  });
}

const params = {
  dest: './src/shanghai', // 要更改的文件夹
  from: 'jhyj_dc', // 要更改的源文件名
  to: 'jhyj_sh' // 要更改的目标文件名
};
rename(params);
```

## 中文乱码

如果在读取某些 csv 格式的文件时出现中文乱码，可能是使用了 GBK 编码，可以使用 [iconv-lite](https://www.npmjs.com/package/iconv-lite)

```js
const stream = fs.createReadStream(filePath, { encoding: 'binary' });
let data = '';
stream.on('error', (err) => {
  console.error(err);
});
stream.on('data', (chunk) => {
  data += chunk;
});
stream.on('end', () => {
  const buf = Buffer.from(data, 'binary');
  const str = iconv.decode(buf, 'GBK');
});
```
