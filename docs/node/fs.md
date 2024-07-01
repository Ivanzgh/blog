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

```ts
type BufferEncoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'latin1'
  | 'binary'
  | 'hex';
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

示例：修改 package.json 里面的版本号 version

```js
const fs = require('fs');

const pkgStr = fs.readFileSync('./package.json', { encoding: 'utf-8' });
const pkg = JSON.parse(pkgStr);
pkg.version = '1.0.1';

const data = JSON.stringify(pkg, null, '\t');

fs.writeFile('./package.json', data, (err) => {
  if (err) throw err;
  console.log('success');
});

// fs.writeFileSync('./package.json', data);
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

异步地删除文件或符号链接。删除的文件不会保留在垃圾篓里。不适用目录，删除目录要使用`fs.rmdir()`

```js
fs.unlink('./1.txt', (err) => {
  if (err) throw err;
  console.log('删除成功');
});
```

### fs.unlinkSync()

语法：`fs.unlinkSync(path)`

同步删除文件

```js
fs.unlinkSync('1.txt');
```

### fs.rm()

```js
fs.rm('1.txt', (err) => {
  if (err) throw err;
  console.log('success');
});
```

同步删除：`fs.rmSync()`

## 打开文件

### fs.open()

[API](https://nodejs.cn/api/fs.html#fsopenpath-flags-mode-callback)

语法：`fs.open(path[, flags[, mode]], callback)`

异步地打开文件，返回的数据为文件描述符

### fs.opendir()

语法：`fs.opendir(path[, options], callback)`

打开目录

## 复制文件

```js
let path = require('path');
let fs = require('fs');

// 要复制的源文件名、复制操作的目标文件名
function copyFile({ src, dest }) {
  fs.readdir(path.resolve(src), (err, files) => {
    if (err) throw err;
    files.forEach((item) => {
      let oldFile = path.resolve(src, item);
      let newFile = path.resolve(dest, item);
      fs.copyFile(oldFile, newFile, (err) => {
        if (err) throw err;
        console.log(oldFile + '复制到' + newFile);
      });
    });
  });
}

const params = { src: './src/beijing', dest: './src/shanghai' };
copyFile(params);
```

### 方式一、readFlie

- 使用 `fs.readFileSync` 从源路径读取文件内容，并使用 `fs.writeFileSync` 将文件内容写入目标路径
- 这种方式适合复制小文件，因为会一次性把文件内容读到内存中，如果是大文件会爆内存

例如：已有`./src/foo/index.js`，想将其复制到`./src/bar/index.js`里

```js
const fs = require('fs');
const path = require('path');

function copyFile(src, target) {
  const data = fs.readFileSync(path.resolve(src));
  fs.writeFileSync(path.resolve(target), data);
}

copyFile('./src/foo/index.js', './src/bar/index.js');
```

关于路径参数：

- 文件夹不存在会报错，如没有 bar 目录会报错
- 路径最后一级必须是具体的文件，若是文件夹会报错，如 './src/bar'
- 如果存在同名的文件，会覆盖原来的文件

### 方式二、流式写入

对文件读一点就写一点，直到完成复制。

```js
const rs = fs.createReadStream('./index.mp4');
const ws = fs.createWriteStream('./index3.mp4');
rs.on('data', (chunk) => {
  ws.write(chunk);
});
```

流式写入比 readFile 更好。

1. 因为 readFile 会把整个文件读取到内存当中，如果文件很大会占很多内存空间
2. fs.createReadStream()在理想状态下只会占据 64kb 的内存空间。为什么是理想状态？因为文件读取比文件写入更快，当读取到内存中的一个 64kb 的数据还没有完全写入另一个文件中时，后面多个 64kb 的数据可能已经被读取到内存中了。

## 更改文件名称

### 更改单个文件名称

```js
fs.rename('./index1.txt', 'index2.txt', (err) => {
  if (err) throw err;
  console.log('success');
});
```

### 批量更改文件名称

例如，有一个目录结构如下：

```
src
├── bar
│   └── index.js
├── foo
│   └── index.js
├── aa.js
└── bb.js
```

需求：

1. 替换文件夹名称
2. 替换文件名称或者后缀

```js
const fs = require('fs');
const path = require('path');

function renameFiles({ dest, toReplace, replacement = '' }) {
  fs.readdir(path.resolve(dest), (err, files) => {
    if (err) throw err;

    files.forEach((item) => {
      let oldName = path.resolve(dest, item);
      let newFileName = path.basename(item).replace(new RegExp(toReplace, 'g'), replacement);
      let newName = path.join(path.dirname(oldName), newFileName);

      fs.rename(oldName, newName, (renameErr) => {
        if (renameErr) throw renameErr;
        console.log(`名称: ${oldName} 改为 ${newName}`);
      });
    });
  });
}

const params = {
  dest: './src',
  toReplace: '.js',
  replacement: '.ts'
};

renameFiles(params);
```

也可以添加一个判断，如果文件不包含要替换的部分，则不进行替换：

```js
if (newFileName !== path.basename(item)) {
  fs.rename(oldName, newName, (renameErr) => {
    if (renameErr) throw renameErr;
    console.log(`名称: ${oldName} 改为 ${newName}`);
  });
} else {
  console.log(`无需改变: ${oldName}`);
}
```

## 移动文件

例如，想将 1.txt 移动到 docs 文件夹下，注意文件名称不能省略，要在 docs 路径后面写上文件名称

```js
fs.rename('./1.txt', './docs/1.txt', (err) => {
  if (err) throw err;
  console.log('success');
});
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

## 文件夹操作

### 创建文件夹

异步创建：`fs.mkdir(path[,options],callback)`

同步创建：`fs.mkdirSync(path[,options])`

```js
fs.mkdir('./node', (err) => {
  if (err) throw err;
  console.log('success');
});
```

**递归创建**，配置 recursive 为 true，可以递归创建类似`/a/b/c`这样的嵌套文件夹

```js
fs.mkdir('./node/a/b/c', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('success');
});
```

在 vscode 中如果创建空的嵌套文件夹，会以紧凑型形式呈现文件夹。如果想要全部展开，可以`command ,`打开 Settings，输入 compact，将`Explorer: Compact Folder`这个选项取消勾选即可

### 读取文件夹

```js
fs.readdir('./docs/vis', (err, files) => {
  if (err) throw err;
  console.log(files);
});
```

读取结果是一个数组：`[ '.DS_Store', 'bi', 'gis', 'three' ]`，包括隐藏文件（如`.DS_Store`）都能读取出来

### 删除文件夹

```js
fs.rmdir('./node/a', (err) => {
  if (err) throw err;
  console.log('success');
});
```

如果要删除的文件夹不是空的，则会删除失败。这时可以配置使用**递归删除**

方式一、fs.rm()

```js
fs.rm('./node', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('success');
});
```

方式二、fs.rmdir()

```js
fs.rmdir('./node', { recursive: true }, (err) => {
  if (err) throw err;
  console.log('success');
});
```

虽然`fs.rmdir()`目前可以达到效果，但是不推荐使用，在以后会被废弃。这种方式会在控制台打印警告信息：
`DeprecationWarning: In future versions of Node.js, fs.rmdir(path, { recursive: true }) will be removed. Use fs.rm(path, { recursive: true }) instead`

## 查看资源信息

```js
fs.stat('./deploy.sh', (err, stats) => {
  if (err) throw err;
  console.log(stats);

  // 检测是否是文件
  console.log(stats.isFile()); // true

  // 检测是否是文件目录
  console.log(stats.isDirectory()); // false
});
```

打印结果：

```sh
Stats {
  dev: 16777231,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 5261802,
  size: 509,
  blocks: 8,
  atimeMs: 1659754243912.1633,
  mtimeMs: 1659752696316.591,
  ctimeMs: 1659752696316.591,
  birthtimeMs: 1659751221313.8948,
  atime: 2022-08-06T02:50:43.912Z,
  mtime: 2022-08-06T02:24:56.317Z,
  ctime: 2022-08-06T02:24:56.317Z,
  birthtime: 2022-08-06T02:00:21.314Z
}
```

size（文件大小）、birthtime（创建时间）、atime（最后一次访问的时间）、mtime（最后一次修改文件的时间）、ctime（最后一次更改文件状态的时间）

## 相对路径、绝对路径

假设有一个 docs 文件夹，里面有一个 node.js 文件，内容如下，想要在 docs 目录里创建一个 1.txt 的文件

```js
fs.writeFileSync('./1.txt', 'hello');
```

在项目根路径下执行 `node ./docs/node.js`，执行完成后发现在项目根目录生成了一个 1.txt 的文件，并没有在 docs 目录里。需要先进入 docs 目录，再执行命令才可以。

这里使用了相对路径，**相对路径参照物：命令行的工作目录**

`__dirname`保存的是**当前文件所在目录的绝对路径**。比如我有一个 index.js 的文件在 docs 目录下，结果就是`/Users/zgh/code/node/docs`

上面的需求就可以按下方写，注意去掉斜杠前面的小点

```js
fs.writeFileSync(__dirname + '/1.txt', 'hello');
```

`__filename`保存的是当前文件的绝对路径
