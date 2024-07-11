---
outline: deep
---

# 浏览器

## 浏览器的工作原理

[https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/)

## 浏览器缓存机制

## 浏览器中的 JavaScript 执行机制

## V8 工作原理

## 页面渲染原理

## PWA

渐进式网页应用

## 回流与重绘

回流必定引发重绘，重绘不一定引发回流

### 回流(reflow)

若改变了 DOM 元素的形状、大小或页面布局就会触发 reflow

触发条件：

- 添加或删除可见的 DOM 元素
- 元素位置发生变化
- 元素尺寸发生变化（width height padding margin border）
- 浏览器窗口尺寸变化
- 内容变化（如文本变化）
- 页面初始渲染（无法避免）

### 重绘(repaint)

只是改变了样式，不影响周围元素或布局，如`color`或`background-color`，会引起浏览器的重绘。

触发重绘的行为：

- 修改颜色
- 修改文本方向
- 修改阴影

### 减少回流的方式

- 动画设置`position: fixed`或 `absolute`，尽可能地使元素脱离文档流，从而减少对其他元素的影响
- 避免使用`table`布局，`table`中每个元素的大小以及内容的改动，都会导致整个`table`的重新计算
- 使用 `visibility: hidden` 替换 `display: none`
- 使用 requestAnimationFrame 作为动画帧。动画速度越快，回流次数越多

## Chrome 历史版本下载

[https://www.chromedownloads.net/chrome64osx](https://www.chromedownloads.net/chrome64osx)

[chrome 80 版本下载地址](https://www.chromedownloads.net/chrome64osx-stable/989.html)，使用的时候关掉新版浏览器
