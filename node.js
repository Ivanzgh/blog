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

const { log } = require('console');
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

// const rs = fs.createReadStream('./index.mp4');
// rs.on('data', (chunk) => {
//   // console.log(chunk.toString());
//   console.log(chunk.length);
// });
// // 可选
// rs.on('end', () => {
//   console.log('读取完成');
// });

// const data = fs.readFileSync('./index.mp4');
// fs.writeFileSync('index2.mp4', data)

// const rs = fs.createReadStream('./index.mp4');
// const ws = fs.createWriteStream('./index3.mp4');
// // rs.pipe(ws);
// rs.on('data', (chunk) => {
//   ws.write(chunk);
// });

// fs.rm('index.mp4', (err) => {
//   if (err) throw err;
//   console.log('success');
// });

// fs.unlinkSync('ivideo.mp4')

// fs.mkdir('./node/a/b/c', { recursive: true }, (err) => {
//   if (err) throw err;
//   console.log('success');
// });

// fs.readdir('./docs/vis', (err, files) => {
//   if (err) throw err;
//   console.log(files);
// })

// fs.mkdir('./node/a', { recursive: true }, (err) => {
//   if (err) throw err;
//   console.log('success');
// });

// fs.writeFile('./node/1.txt', 'hello', (err) => {
//   if (err) throw err;
//   console.log('success');
// });

// fs.rm('./node', { recursive: true }, (err) => {
//   if (err) throw err;
//   console.log('success');
// });

// fs.stat('./deploy.sh', (err, data) => {
//   if (err) throw err;
//   console.log(data);

//   data.isFile() ? console.log('是合法文件') : console.log('不是合法文件');

//   data.isDirectory() ? console.log('是合法目录') : console.log('不是合法目录');

//   data.isSymbolicLink() ? console.log('是合法银行') : console.log('不是合法银行');
// });

// fs.writeFileSync(__dirname + '/1.txt', 'hello');

// const path = require('path');

// console.log(path.sep); // 结果：/

// console.log(path.resolve(__dirname, './1.txt')); // 结果：/Users/zgh/code/blog/1.txt

// const pathName = '/Users/zgh/code/blog/1.txt';
// console.log(path.parse(pathName));

// console.log(__filename);

// console.log(path.basename(pathName));
// console.log(path.dirname(pathName));
// console.log(path.extname(pathName));

const http = require('http');
// const url = require('url');

const server = http.createServer((req, res) => {
  // console.log(req.method); // 获取请求方式
  // console.log(req.headers); // 获取请求头
  // console.log(req.url); // 获取url中的路径和查询参数
  // console.log(req.httpVersion); // 获取http版本号
  // // 设置响应头，避免中文乱码
  // res.setHeader('Content-Type', 'text/html;charset=utf-8');
  // res.end('你好');
  // 2、
  // let body = '';
  // req.on('data', (chunk) => {
  //   body += chunk;
  // });
  // req.on('end', () => {
  //   console.log(body);
  //   res.end('ok');
  // });
  // 3、
  // let parsedUrl = url.parse(req.url, true);
  // console.log(parsedUrl);
  // console.log(parsedUrl.pathname); // 获取路径
  // console.log({ page: parsedUrl.query.page, size: parsedUrl.query.size }); // { page: '1', size: '10' }

  // 4、
  const url = new URL(req.url, 'http://127.0.0.1:9000');
  // console.log(url);
  // console.log(url.pathname);  // /list
  // console.log(url.searchParams);  // URLSearchParams { 'page' => '1', 'size' => '10' }
  // console.log(url.searchParams.get('page'));  // 1
  // console.log(url.searchParams.get('size'));  // 10
  // res.end('ok');
  const pathname = url.pathname;
  res.setHeader('Content-Type', 'text/html;charset=utf-8');

  if (pathname === '/login') {
    res.end('登录页面');
    return;
  }
  if (pathname === '/reg') {
    res.end('注册页面');
    return;
  }
  res.end('ok');
});

server.listen(9000, () => {
  console.log('server start...');
});
