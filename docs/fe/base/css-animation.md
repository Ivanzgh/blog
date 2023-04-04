# 动画

## boder 图片

## 圆角

## 背景

## 文本效果

## transform 转换

主要用于给元素做变换，主要由以下几种变换：rotate(旋转)、scale(缩放)、skew(扭曲)、translate(移动)、matrix(矩阵变换)

transform 本身是没有过渡效果的,它只是对元素做大小、旋转、倾斜等各种变换,通过和 transition 或者 animation 相结合,可以让这一变换过程具有动画的效果

## translate 移动

- translateX(x px)
- translateY(y px)
- translateZ(z px)

## rotate 旋转

- rotateX(x deg)
- rotateY(y deg)
- rotateZ(z deg)

`perspective` 设置从何处查看一个元素的角度：

`perspective-origin` 设置一个 3D 元素的基数位置：

```css
/* 
<div class="box">
  <div class="content"></div>
</div> 
*/

.box {
  perspective: 800px;
  perspective-origin: 50% 50%;
  transform-style: preserve-3d;
}
.content {
  width: 300px;
  height: 300px;
  background: #0f0;
  margin: 100px auto;
  transform: rotateX(45deg);
}
```

### 使用 transform-origin 调整旋转中心

- X 轴：left , center, right
- Y 轴：top , center , bottom
- Z 轴：length px

### transform 的 `rotate translateX` 的先后执行顺序有何不同？

如果先旋转再平移的话，会按照旋转后的坐标系进行平移。哪个在前就先执行

## scale 缩放

语法：`scale: sx sy`

- sx: 缩放向量的横坐标
- sy: 缩放向量的纵坐标，如未设置则被设置为 sx，均等缩放

```css
.box {
  width: 100px;
  height: 100px;
  background-color: #f00;
  scale: 5 2;
}
```

```css
.box {
  transform: scale(2);
}
```

## skew 扭曲

## 设置 3D 场景

使用 3D 场景：`transform-style: preserve-3d;`

## transition 过渡

语法：`transition: <过渡属性> <过渡时间> <缓动函数> <延迟时间>`

- 过渡属性`transition-property`：指定要过渡的 CSS 属性，可以是单个属性或多个属性，多个属性之间用逗号分隔
- 过渡时间`transition-duration`：指定过渡的持续时间，以秒或毫秒为单位
- 缓动函数`transition-timing-function`：控制过渡过程中变化的速度和方式
  - `ease` 默认值，慢进快出
  - `ease-in` 慢进
  - `ease-out` 快出
  - `ease-in-out` 缓慢开始，缓慢结束(与 ease 稍有区别)
  - `linear` 匀速
  - `cubic-bezier()` 贝塞尔曲线
- 延迟时间`transition-delay`：指定过渡效果的延迟时间，以秒或毫秒为单位

```css
.box {
  width: 100px;
  height: 100px;
  background-color: #ff0;
  opacity: 0;
  transition: all 1s ease;
}

.box:hover {
  opacity: 1;
}

.box1 {
  width: 100px;
  height: 100px;
  background-color: #f00;
  transition: width 0.5s ease-in-out, height 0.5s ease-in-out;
}
.box1:hover {
  width: 200px;
  height: 200px;
}
```

其他的属性：

- `transition: all` 指定所有 CSS 属性都要过渡
- `transition: none` 禁用所有过渡效果
- `transition: initial` 将所有过渡效果恢复到默认值
- `transition: inherit` 从父元素继承过渡效果

注意不是所有的 CSS 属性都支持过渡效果

## animation

`@keyframes`定义动画规则。0% 是动画的开始，100% 是动画的完成。或用关键词 "from" 和 "to"，等同于 0% 和 100%

要注意兼容性，一般要加浏览器前缀

示例：`animation: box 5s;`表示动画名称是`box`，动画时间是 5s

```css
.container {
  width: 300px;
  height: 300px;
  background: #f00;
  animation: box 5s;
  -o-animation: box 5s; /* Opera */
  -moz-animation: box 5s; /* Firefox */
  -webkit-animation: box 5s; /* Safari and Chrome */
}
@keyframes box {
  0% {
    background: #f00;
  }
  100% {
    background: #00f;
  }
}
@-o-keyframes box {
  0% {
    background: #f00;
  }
  100% {
    background: #00f;
  }
}
@-moz-keyframes box {
  0% {
    background: #f00;
  }
  100% {
    background: #00f;
  }
}
@-webkit-keyframes box {
  0% {
    background: #f00;
  }
  100% {
    background: #00f;
  }
}
```

### 动画属性

`animation` 所有动画属性的简写属性，除了 `animation-play-state` 属性。

`animation-name` 规定 `@keyframes` 动画的名称。

`animation-duration` 规定动画完成一个周期所花费的秒或毫秒。默认是 0。

`animation-timing-function` 规定动画的速度曲线。默认是 "ease"。

`animation-delay` 规定动画何时开始。默认是 0。

`animation-iteration-count` 规定动画被播放的次数。默认是 1。`infinite`表示无限次

`animation-direction` 规定动画是否在下一周期逆向地播放。默认是 "normal"。`alternate`表示轮流反向播放

`animation-play-state` 规定动画是否正在运行或暂停。默认是 "running"。`paused`表示暂停

`animation-fill-mode` 规定对象动画时间之外的状态。

### 简写

animation 属性是一个简写属性，用于设置六个动画属性

语法:

```css
animation: name duration timing-function delay iteration-count direction;
```

```css
.container {
  width: 300px;
  height: 300px;
  background: #f00;
  animation-name: box;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: running;
}
```

以上代码等效于以下所示：

```css
.container {
  animation: box 5s linear 2s infinite alternate;
}
```

### animation-timing-function

此属性使用三次贝塞尔曲线来生成曲线

`linear` 动画从头到尾的速度是相同的。等同于 cubic-bezier(0,0,0.25,1)

`ease` 默认值。动画以低速开始，然后加快，在结束前变慢。等同于 cubic-bezier(0.25,0.1,0.25,1)

`ease-in` 动画以低速开始。等同于 cubic-bezier(0.42,0,1,1)

`ease-out` 动画以低速结束。等同于 cubic-bezier(0,0,0.58,1)

`ease-in-out` 动画以低速开始和结束。等同于 cubic-bezier(0.42,0,0.58,1)

`cubic-bezier(n,n,n,n)` 在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。

### animation-fill-mode

规定动画在播放之前或之后，其动画效果是否可见。

`none` 不改变默认行为。

`forwards` 当动画完成后（由 animation-iteration-count 决定），保持最后一个属性值（在最后一个关键帧中定义）。

`backwards` 在 animation-delay 所指定的一段时间内，在动画显示之前，应用开始属性值（在第一个关键帧中定义）。

`both` 向前和向后填充模式都被应用。

## transition 和 animation 以及 transform 的区别

transform 本身没有动画效果，它实现动画需要依赖其余两者
Animation 和 transition 大部分属性是相同的，他们都是随时间改变元素的属性值
transition 设置的是 css 属性变化时的过渡动画，而 animation 动画会自动执行；transition 定义的动画触发一次执行一次，想再次执行就需要再次触发；animation 可以执行指定次数或者无数次；
transition 定义的动画只有两个状态,开始态和结束态,animation 可以定义多个动画中间态,且可以控制多个复杂动画的有序执行.

## 如何优化动画性能

尽量减少 js 动画，如需要，使用对性能友好的 requestAnimationFrame
开启硬件加速
使用 css3 的 transform 代替 left、top 减少使用引起页面重排的属性：（该 CSS 属性可以旋转，缩放，倾斜，或者上传给定的元素。这是通过修改 CSS 可视格式模型的坐标空间来实现的。）
requestAnimationFrame() 方法，会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成
requestIdleCallback() 方法，它指定只有当一帧的末尾有空闲时间，才会执行回调函数。

手写动画的最小时间间隔是多久？

多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔为 1/60＊1000ms ＝ 16.7ms。
