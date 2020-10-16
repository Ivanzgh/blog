# Canvas
## 介绍
canvas 就是绘制图形的。

canvas 是一个二维网格。左上角坐标为 (0,0)

首先创建一个画布

```html
<canvas id="first-canvas" width="1000" height="800"></canvas>
```
然后获取到画布和二维模型
```js
let firCanvas = document.getElementById('first-canvas')
let ctx = firCanvas.getContext('2d')
```
ctx就相当于画笔了

示例：画个矩形
```js
let firCanvas = document.getElementById('first-canvas')
let ctx = firCanvas.getContext('2d')
ctx.beginPath()
ctx.fillStyle= '#0f0'
ctx.fillRect(10,10,200,100)
ctx.closePath()
```
注意设置样式要在绘制之前，否则无效。

如果要绘制多个图形，需要声明开始和结束路径，否则图形会相互干扰，影响结果。

## 线

```js
ctx.moveTo(10,20)  // 定义起点
ctx.lineTo(50,100)  // 定义终点
ctx.strokeStyle= '#f00'   // 线的颜色
ctx.stroke()        // 画线
```
画个树：

```js
ctx.beginPath()
ctx.moveTo(500,50)
ctx.lineTo(300,200)
ctx.lineTo(450,200)
ctx.lineTo(200,300)
ctx.lineTo(450,300)
ctx.lineTo(450,400)
ctx.lineTo(550,400)
ctx.lineTo(550,300)
ctx.lineTo(770,300)
ctx.lineTo(550,200)
ctx.lineTo(700,200)
ctx.fillStyle= '#0f0'
ctx.fill()
ctx.strokeStyle = '#0f0' 
ctx.stroke()
ctx.closePath()
```

电子画笔
```js
let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let drawStatus = false;
    canvas.onmousedown = e => {
        ctx.moveTo(e.offsetX, e.offsetY);
        drawStatus = true;
    };
    canvas.onmouseup = () => drawStatus = false;
    canvas.onmouseout = () => {
        if (drawStatus) {
            drawStatus = false;
        }
    };
    canvas.onmousemove = e => {
        if (drawStatus) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke()
        }
    }
```

## 圆

```js
ctx.arc(100,100,50,0,2*Math.PI,false)
ctx.fillStyle= '#f00'
ctx.fill()
```
```
arc(x, y, radius, startAngle, endAngle, anticlockwise)
```
参数分别表示圆心坐标，半径，起始弧度，结束弧度，绘制方向

角度与弧度的js表达式:
```
弧度 = (Math.PI/180) * 角度
```
anticlockwise为true，则按逆时针绘制，false按顺时针绘制，默认为false

数学中的角度逆时针为正，而这里的起止角是以顺时针为正。当起角设为0度，止角设为120度时，会从右边水平位置向下旋转120度。

## 文字

```js
ctx.beginPath()
ctx.font= '100px 微软雅黑'    // 字体大小和类型
ctx.strokeStyle= 'gold'
ctx.strokeText('hello world !',800,200)
ctx.fillStyle= '#00f'
ctx.fillText('canvas',800,400)      // 文字和位置
ctx.closePath()
```

## 矩形

```js
ctx.beginPath()
ctx.fillStyle= '#eee'
ctx.fillRect(50,400,200,100)
ctx.clearRect(60,420,180,60)  // 在内部擦除一个矩形
ctx.strokeStyle= '#666'
ctx.strokeRect(140,430,30,30)
ctx.closePath()
```
`ctx.fillRect(50,400,200,100)`表示矩形左上角坐标为(50,400)，宽200px，高100px

## 阴影

```js
ctx.beginPath()
ctx.fillStyle= '#000'
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 10
ctx.shadowColor = 'gold'
ctx.shadowBlur= 5
ctx.fillRect(600,400,200,200)
ctx.closePath()
```
shadowOffsetX、shadowOffsetY表示阴影横、纵向偏移量，shadowColor表示阴影颜色，shadowBlur表示模糊等级。

## 渐变

### 线性渐变

```js
ctx.beginPath();
var Color = ctx.createLinearGradient(0, 0, 0, 500);
Color.addColorStop(0.3, "orange");
Color.addColorStop(0.5, "yellow");
Color.addColorStop(1, "gray");
ctx.fillStyle = Color;
ctx.fillRect(0, 0, 1200, 800);
ctx.closePath(); 
ctx.stroke();
```
createLinearGradient(x1,y1,x2,y2)，参数表示起点和终点

addColorStop(x,y)，x表示偏移量，y表示颜色

### 径向渐变

```js
ctx.beginPath()
ctx.arc(500,300,100,0,2*Math.PI,true)
let color = ctx.createRadialGradient(500,300,30,500,300,100)
color.addColorStop(0,'red')
color.addColorStop(0.5,'orange')
color.addColorStop(1,'yellow')
ctx.fillStyle = color
ctx.fill()
ctx.closePath()
ctx.stroke()
```
createRadialGradient(x1,y1,r1,x2,y2,r2)，起始圆心、结束圆心和相关半径

## 图片绘制

`drawImage(image, x, y)`

其中 image 是 image 或者 canvas 对象，x 和 y 是其在目标 canvas 里的起始坐标。

`drawImage(image, x, y, width, height)`

width 和 height，这两个参数用来控制 当向canvas画入时应该缩放的大小

`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)`

image是image或者canvas对象，前4个是定义图像源的切片位置和大小，后4个则是定义切片的目标显示位置和大小

```js
function draw() {
    let ctx = document.getElementById('first-canvas').getContext('2d')
    let img = new Image()
    img.onload = function() {
        ctx.beginPath()
        ctx.drawImage(img,0,0)
        ctx.closePath()
    }
    img.src = './assets/images/green1.png'
}
draw()
```

## 移动

## 旋转

## 缩放

## 变形

## 裁剪

## 动画

可以用window.setInterval(), window.setTimeout(),和window.requestAnimationFrame()来设定定期执行一个指定函数。


### 示例：行走的绿巨人
```html
<canvas id="first-canvas" width="2000" height="800"></canvas>
<div style="display: none;">
    <img src="./assets/images/green1.png" id="img1" alt="">
</div>
```

```js
let firCanvas = document.getElementById('first-canvas')
let ctx = firCanvas.getContext('2d')
let img1 = document.getElementById('img1')
let X = 0;
let countNum = 0;

function picRun() {
    ctx.clearRect(0, 0, 1200, 1000);
    countNum++;
    if (countNum == 10) {
        X += 129;
        countNum = 0;
    }
    if (X >= 387) {
        X = 0;
    }
    ctx.beginPath();
    ctx.drawImage(img1, X, 0, 129, 135, 100, 100, 129, 135);
    ctx.closePath();
    ctx.stroke();
}
window.setInterval(picRun,30)
```

![image](/blog/img/fe/green1.png)
![image](/blog/img/fe/green2.png)

类似于精灵图切割图片，图片宽515px，高135px，每一个小图是四分之一即129px，高度不用切。

clearRect()清除以前的图层，防止堆积覆盖

countNum是计数器，控制图片的切换频率

300ms，当切割宽度到达3个巨人宽度时归零，重新切割。


