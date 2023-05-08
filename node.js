// console.log(window);
// console.log(global);
// console.log(globalThis);

// alloc
// let buf1 = Buffer.alloc(10);
// console.log(buf1);
// <Buffer 00 00 00 00 00 00 00 00 00 00>

// allocUnsafe
// let buf2 = Buffer.allocUnsafe(10);
// console.log(buf2);
// <Buffer 00 00 00 00 00 00 00 00 00 00>

//
// let buf3 = Buffer.allocUnsafe(10000);
// console.log(buf3);
// 每次执行的结果还不一致
// <Buffer 00 00 00 00 00 00 00 00 fd 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 fd 70 7c 6d 01 00 00 00 30 e2 89 6d 01 00 00 00 80 82 00 38 01 00 00 00 00 00 ... 9950 more bytes>

// from
// let buf4 = Buffer.from([11, 22, 33]);
// console.log(buf4); // <Buffer 0b 16 21>
// let buf5 = Buffer.from("hello");
// console.log(buf5); // <Buffer 68 65 6c 6c 6f>
// console.log(buf5.toString()); // hello
// let buf6 = Buffer.from("中文");
// console.log(buf6); // <Buffer e4 b8 ad e6 96 87>
// let buf7 = Buffer.from("中文", "utf8");
// console.log(buf7); // <Buffer e4 b8 ad e6 96 87>

const fs = require('fs');

// fs.writeFile('./1.txt', 'hello', (err) => {
//   if (err) {
//     console.log('写入失败：', err);
//   } else {
//     console.log('写入成功');
//   }
// });

// fs.writeFileSync('./1.txt', 'world');

// fs.appendFile('./1.txt', '\nhello', (err) => {
//   if (err) throw err;
//   console.log('追加成功');
// });
// fs.appendFileSync('./1.txt', '\nworld');

// fs.readFile('./1.txt', (err, data) => {
//   if (err) throw err;
//   console.log(data.toString());
// }

// fs.readFile('./1.txt', 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.open('./1.txt', 'r', (err, fd) => {
//   if (err) throw err;
//   console.log(fd);
//   fs.readFile(fd, 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   });
// });

// const fileBuffer = Buffer.from('./1.txt', 'utf-8');
// fs.readFile(fileBuffer, { encoding: 'utf-8' }, (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// const fileURL = new URL('file:///Users/zgh/code/blog/1.txt');
// fs.readFile(fileURL, { encoding: 'utf-8' }, (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// const data = fs.readFileSync('./1.txt', { encoding: 'utf-8' });
// console.log(data);

// const ws = fs.createWriteStream('./1.txt')
// ws.write('hello')
// ws.write('world')
// ws.close()

const rs = fs.createReadStream('./index.mp4');
rs.on('data', (chunk) => {
  // console.log(chunk.toString());
  console.log(chunk.length);
});
// 可选
rs.on('end', () => {
  console.log('读取完成');
});
