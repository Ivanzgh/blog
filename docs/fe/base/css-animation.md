# 动画

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block; width:100%; height:600px;" src="https://www.processon.com/embed/642a91d2f967315e33ee331a"></iframe>

## transition 过渡

语法：`transition: <过渡属性> <过渡时间> <缓动函数> <延迟时间>`

- `transition-property`：指定要过渡的 CSS 属性，可以是单个或多个属性，多个属性之间用逗号分隔
- `transition-duration`：指定过渡的持续时间，以秒或毫秒为单位
- `transition-timing-function`：控制过渡过程中变化的速度和方式
  - `linear` 匀速
  - `ease`：默认值，以低速开始，然后加快，在结束前变慢
  - `ease-in`：以低速开始
  - `ease-out`：以低速结束
  - `ease-in-out`：缓慢开始，缓慢结束
  - `cubic-bezier()` 贝塞尔曲线
- `transition-delay`：指定过渡效果的延迟时间，以秒或毫秒为单位

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

- `@keyframes`定义动画规则
- 0% 是动画的开始，100% 是动画的完成
- 关键词 `from` 和 `to`，等同于 0% 和 100%
- 要注意兼容性，一般要加浏览器前缀

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
  /* 同上 */
}
@-moz-keyframes box {
  /* 同上 */
}
@-webkit-keyframes box {
  /* 同上 */
}
```

### 动画属性

- `animation` 简写：`animation: name duration timing-function delay iteration-count direction fill-model play-pause:`
- `animation-name` 规定 `@keyframes` 动画的名称
- `animation-duration` 规定动画完成一个周期所花费的秒或毫秒。默认是 0
- `animation-timing-function` 缓动函数，定义在每一个动画周期中执行的节奏
  - `linear`：匀速
  - `ease`：默认值，动画以低速开始，然后加快，在结束前变慢
  - `ease-in`：以低速开始
  - `ease-out`：以低速结束
  - `ease-in-out`：开始和结束均低速
  - `cubic-bezier(n, n, n, n)`：三次贝塞尔曲线，取值范围 0 到 1
  - `steps(number, position)`可以让动画不连续
    - 示例：steps(4, end)
    - number：表示把动画分成了多少段
    - position：表示动画是从时间段的开头连续还是末尾连续
- `animation-delay` 延迟时间
  - 立即开始，默认值 0 秒，单位是 s 或 ms
  - 正数，表示几秒后开始
  - 负数，表示立即开始，但是位置从某个时间点开始
- `animation-iteration-count` 播放次数
  - 默认值 1，可以是小数
  - `infinite`表示无限次
- `animation-direction` 播放方向
  - `normal`：正向播放，默认值
  - `reverse`：反向播放
  - `alternate`：正反交替播放，第一次迭代是正向播放
  - `alternate-reverse`：正反交替播放，第一次迭代是反向播放
- `animation-fill-mode` 动画在执行之前和之后，如何将样式应用于目标
- `animation-play-state` 规定动画是否正在运行或暂停
  - `running`：运行中，默认值
  - `paused`：暂停
  - 恢复暂停的动画将从暂停时停止的位置开始播放

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

- `linear` 匀速。等同于 `cubic-bezier(0,0,0.25,1)`
- `ease` 默认值。动画以低速开始，然后加快，在结束前变慢。等同于 `cubic-bezier(0.25,0.1,0.25,1)`
- `ease-in` 动画以低速开始。等同于 `cubic-bezier(0.42,0,1,1)`
- `ease-out` 动画以低速结束。等同于 `cubic-bezier(0,0,0.58,1)`
- `ease-in-out` 动画以低速开始和结束。等同于 `cubic-bezier(0.42,0,0.58,1)`
- `cubic-bezier(n,n,n,n)` 三次贝塞尔曲线，取值范围 0 到 1

### animation-fill-mode

规定动画在执行之前和之后，如何将样式应用于其目标

- `none` 当动画未执行时，动画不会将任何样式应用于目标
- `forwards` 当动画完成后，保持最后一个关键帧的值（由`animation-duration`和 `animation-iteration-count` 决定）
- `backwards` 立即应用第一个关键帧中定义的值，并在 `animation-delay` 期间保留此值
- `both` 两种模式都被应用

假如一个盒子要在动画开始时立即改变颜色，并从左到右运动

```css
/* 延迟 1 秒后执行动画 */
animation-delay: 1s;

/* 1秒后改变颜色，并从左到右运动，运动结束后回到原位置 */
animation-fill-mode: none;

/* 1秒后改变颜色，并从左到右运动，运动结束后保持在最后的位置 */
animation-fill-mode: forwards;

/* 立即改变颜色，1秒后从左到右运动，运动结束后回到原位置 */
animation-fill-mode: backwards;

/* 立即改变颜色，1秒后从左到右运动，运动结束后保持在最后的位置 */
animation-fill-mode: both;
```

## transform 变换

主要用于给元素做变换，主要由以下几种变换：rotate(旋转)、scale(缩放)、skew(扭曲)、translate(移动)、matrix(矩阵变换)

- transform 本身是没有过渡效果的，它只是对元素做大小、旋转、倾斜等各种变换
- 通过和 transition 或者 animation 相结合，可以让变换过程具有动画的效果

### translate 移动

`transform: translate(100px, 50%)`，百分比是以自身为基准

`transform: translate(100px)`，只写一个值表示沿 X 轴移动距离是 100px， 沿 Y 轴移动距离是 0

- translateX() 沿 X 轴移动距离
- translateY()
- translateZ()
- translate3d(x, y, z)

## rotate 旋转

示例：`transform: rotate(10deg)`

单位如下，正值表示沿水平方向顺时针旋转，负值表示沿水平方向逆时针旋转

- `deg`：角度
- `turn`：圈数，`1turn = 360deg`
- `rad`：弧度，`2πrad = 1turn = 360deg`

- rotateX()
- rotateY()
- rotateZ()
- rotate3d(x, y, z, a)

## scale 缩放

语法：`scale: sx sy`

- sx: 缩放向量的横坐标
- sy: 缩放向量的纵坐标，如未设置则被设置为 sx，均等缩放

示例：`transform: scale(2);`

## skew 扭曲

示例：`transform: skew(30deg, 20deg)`，表示沿 X 轴倾斜 30 度，沿 Y 轴倾斜 20 度

负数表示相反方向倾斜，第二个参数为空表示为 0

## matrix 矩阵变换

向量、线性代数

## transform-origin

更改元素变形的原点

- X 轴：长度单位、百分比、关键字：left、center、right
- Y 轴：长度单位、百分比、关键字：top、center、bottom
- Z 轴：长度单位

示例：`transform-origin: 30px center 2px`

## transform-style

规定被子元素如何在 3D 空间中显示，3D 或者平面显示

- `flat`：设置元素的子元素位于该元素的平面中
- `preserve-3d`：设置元素的子元素位于 3D 空间中

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

- `perspective` 控制 3d 元素的透视效果，数值相当于眼睛距离元素的距离，实现近大远小的效果
- `perspective-origin` 设置一个 3D 元素的基数位置

### transform 的 `rotate translateX` 的先后执行顺序有何不同？

如果先旋转再平移的话，会按照旋转后的坐标系进行平移。哪个在前就先执行

## transition 和 animation 以及 transform 的区别

- transform 本身没有动画效果，它实现动画需要依赖其余两者
- animation 和 transition 大部分属性是相同的，它们都是随时间改变元素的属性值
- transition 设置的是 css 属性变化时的过渡动画，而 animation 动画会自动执行
- transition 定义的动画触发一次就执行一次，想再次执行就需要再次触发；animation 可以执行指定次数或者无数次
- transition 定义的动画只有两个状态，开始态和结束态；animation 可以定义多个动画中间态，且可以控制多个复杂动画的有序执行

## 如何优化动画性能

- 尽量减少 js 动画，使用性能友好的 requestAnimationFrame()
- 开启硬件加速
- 使用 transform 代替 left、top，减少使用引起页面重排的属性
- requestAnimationFrame() 方法，会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成
- requestIdleCallback() 方法，指定只有当一帧的末尾有空闲时间，才会执行回调函数

## 手写动画的最小时间间隔是多久？

多数显示器默认频率是 60Hz，即 1 秒刷新 60 次，所以理论上最小间隔为 1/60＊1000ms ＝ 16.7ms
