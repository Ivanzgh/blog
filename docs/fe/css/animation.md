# 动画

## 兼容性

IE10 + 、Firefox 以及 Opera 支持 `@keyframes` 规则和 `animation` 属性。

Chrome 和 Safari 需要前缀 `-webkit-`

示例:

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
  50% {
    background: #0f0;
  }
  100% {
    background: #00f;
  }
}
@-o-keyframes box {
  0% {
    background: #f00;
  }
  50% {
    background: #0f0;
  }
  100% {
    background: #00f;
  }
}
@-moz-keyframes box {
  0% {
    background: #f00;
  }
  50% {
    background: #0f0;
  }
  100% {
    background: #00f;
  }
}
@-webkit-keyframes box {
  0% {
    background: #f00;
  }
  50% {
    background: #0f0;
  }
  100% {
    background: #00f;
  }
}
```

`animation: box 5s;`表示动画名称是`box`，动画时间是 5s

`@keyframes`定义动画规则

0% 是动画的开始，100% 是动画的完成。或用关键词 "from" 和 "to"，等同于 0% 和 100%。

## 动画属性

`animation` 所有动画属性的简写属性，除了 `animation-play-state` 属性。

`animation-name` 规定 `@keyframes` 动画的名称。

`animation-duration` 规定动画完成一个周期所花费的秒或毫秒。默认是 0。

`animation-timing-function` 规定动画的速度曲线。默认是 "ease"。

`animation-delay` 规定动画何时开始。默认是 0。

`animation-iteration-count` 规定动画被播放的次数。默认是 1。`infinite`表示无限次

`animation-direction` 规定动画是否在下一周期逆向地播放。默认是 "normal"。`alternate`表示轮流反向播放

`animation-play-state` 规定动画是否正在运行或暂停。默认是 "running"。`paused`表示暂停

`animation-fill-mode` 规定对象动画时间之外的状态。

### animation

animation 属性是一个简写属性，用于设置六个动画属性

语法:

```css
animation: name duration timing-function delay iteration-count direction;
```

示例:

此处只写一套样式，实际使用还要考虑浏览器兼容性

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
