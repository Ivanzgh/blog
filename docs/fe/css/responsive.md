# 响应式布局

## Web、H5、WebApp

- 移动 Web 开发，代码是在手机、平板等浏览器中运行
- Pc Web 开发，代码是在 PC 端（电脑）浏览器中运行

移动 Web 和 Pc Web 的区别：

- 屏幕尺寸不同
- 网络环境和设备性能不同
- 交互方式不同
- 兼容性不同

App 开发分类：

- Native 开发，如 Android 开发、IOS 开发
- Web App，应用程序在浏览器中运行
- Hybrid 混合模式，是 Native APP 和 Web APP 的混合体，同时具有两者的特点

H5 在非技术圈常指移动 Web 页面，一般是用于活动营销的手机网页

## 像素、分辨率、物理像素、逻辑像素、设备像素比

设备像素指的是物理像素，一般手机的分辨率指的就是设备像素，一个设备的设备像素是不可变的。

css 像素和设备独立像素是等价的，不管在何种分辨率的设备上，css 像素的大小应该是一致的，css 像素是一个相对单位，它是相
对于设备像素的，一个 css 像素的大小取决于页面缩放程度和 dpr 的大小。

dpr 指的是设备像素和设备独立像素的比值，一般的 pc 屏幕，dpr=1。在 iphone4 时，苹果推出了 retina 屏幕，它的 dpr
为 2。屏幕的缩放会改变 dpr 的值。

ppi 指的是每英寸的物理像素的密度，ppi 越大，屏幕的分辨率越大。

## viewport 视口

移动端：

- 大部分手机浏览器的宽为 980px
- 手机端网页中 html 的默认宽等于浏览器宽为 980px
- 将 body 的 margin 设为 0 后，body 的宽度等于 980px

运行下方代码，打开控制台调到手机模式，

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0" /> -->
    <style>
      body {
        margin: 0;
      }
    </style>
  </head>
  <body></body>
</html>
```

如果把移动设备上浏览器的可视区域设为 viewport 的话，某些网站就会因为 viewport 太窄而显示错乱，所以这些浏览器就决定
默认情况下把 viewport 设为一个较宽的值，比如 980px，这样的话即使是那些为桌面设计的网站也能在移动浏览器上正常显示了。
ppk 把这个浏览器默认的 viewport 叫做 layout viewport。

layout viewport 的宽度是大于浏览器可视区域的宽度的，所以我们还需要一个 viewport 来代表浏览器可视区域的大小，ppk 把
这个 viewport 叫做 visual viewport。

ideal viewport 是最适合移动设备的 viewport，ideal viewport 的宽度等于移动设备的屏幕宽度，只要在 css 中把某一元
素的宽度设为 ideal viewport 的宽度（单位用 px），那么这个元素的宽度就是设备屏幕的宽度了，也就是宽度为 100%的效果。i
deal viewport 的意义在于，无论在何种分辨率的屏幕下，那些针对 ideal viewport 而设计的网站，不需要用户手动缩放，也
不需要出现横向滚动条，都可以完美的呈现给用户。

---

移动端一共需要理解三个 viewport 的概念的理解。

第一个视口是布局视口，在移动端显示网页时，由于移动端的屏幕尺寸比较小，如果网页使用移动端的屏幕尺寸进行布局的话，那么整
个页面的布局都会显示错乱。所以移动端浏览器提供了一个 layout viewport 布局视口的概念，使用这个视口来对页面进行布局展
示，一般 layout viewport 的大小为 980px，因此页面布局不会有太大的变化，我们可以通过拖动和缩放来查看到这个页面。

第二个视口指的是视觉视口，visual viewport 指的是移动设备上我们可见的区域的视口大小，一般为屏幕的分辨率的大小。visu
al viewport 和 layout viewport 的关系，就像是我们通过窗户看外面的风景，视觉视口就是窗户，而外面的风景就是布局视口
中的网页内容。

第三个视口是理想视口，由于 layout viewport 一般比 visual viewport 要大，所以想要看到整个页面必须通过拖动和缩放才
能实现。所以又提出了 ideal viewport 的概念，ideal viewport 下用户不用缩放和滚动条就能够查看到整个页面，并且页面在
不同分辨率下显示的内容大小相同。ideal viewport 其实就是通过修改 layout viewport 的大小，让它等于设备的宽度，这个
宽度可以理解为是设备独立像素，因此根据 ideal viewport 设计的页面，在不同分辨率的屏幕下，显示应该相同。

<https://juejin.cn/post/6844903655045333000>

## em、rem、px、vw、vh 的区别

## 像素单位

1、px

- 绝对单位
- 指定像素值，固定布局尺寸

2、rem

- 相对根元素（html）的 `font-size` 值的大小
- 1rem 等于根元素的字体大小
- 不受自身和父级元素的字体大小的影响
- 为了计算方便，可以设置`html { font-size: 62.5% }`，因为`16 * 0.625 = 10`，这样 1rem=10px

3、em

- 相对单位，基于父元素字体大小
- 如果元素自身设置了字体大小，如`font-size: 20px`，则基于元素自身的字体大小

4、vw

- 视窗宽度单位
- 1vw 等于视窗宽度的 1%

5、vh

- 视窗高度单位
- 1vh 等于视窗高度的 1%

6、vmax 和 vmin

- 视窗宽度和视窗高度的最大值或最小值，哪个最大或最小就取哪个值，可以考虑用在兼容横屏和竖屏的布局

7、百分比%，相对于父元素

## 媒体查询

设置断点，响应不同的屏幕尺寸

- PC 端优先：先考虑大屏，再考虑小屏；使用 max-width
- 移动端优先：先考虑最小屏，再考虑大屏；使用 min-width

媒体类型：

- all 所有设备，默认值
- screen 屏幕设备
- pint 打印设备
- speech 屏幕阅读器

```css
@media screen and (max-width: 1600px) {
}
@media screen and (max-width: 1536px) {
}
@media screen and (max-width: 1440px) {
}
@media screen and (max-width: 1366px) {
}
@media screen and (max-width: 1280px) {
}
@media screen and (max-width: 1200px) {
}
```

### window.matchMedia()

判定是否匹配媒体查询

```js
const mediaQueryString = '(max-width: 600px)';
let media = window.matchMedia(mediaQueryString);

const listener = () => console.log(media.matches);
window.addEventListener('resize', listener);
window.removeEventListener('resize', listener);
```

## 屏幕分辨率

| 尺寸        | 比例  | 说明                                 |
| ----------- | ----- | ------------------------------------ |
| 3840 x 2160 |       | 4k                                   |
| 2560 x 1440 |       | 2k                                   |
| 1920 x 1080 | 16:9  | ✅ 主流                              |
| 1920 x 1200 | 16:10 | 常见 20 寸电脑使用                   |
| 1680 x 1050 | 16:10 | 常见 15.4、20 寸电脑使用             |
| 1600 x 1200 | 4:3   | 常见 15、16.1 寸电脑使用             |
| 1600 x 1024 | 14:9  | 不常见                               |
| 1600 x 900  | 16:9  | 非主流                               |
| 1536 x 864  | 16:9  |                                      |
| 1440 x 1050 | 4:3   | 常见 15、16.1 寸电脑使用             |
| 1440 x 900  | 16:10 | 苹果 17 寸电脑使用                   |
| 1366 x 768  | 15:10 | ✅ 主流，常见 15.2 寸电脑使用        |
| 1280 x 1024 | 5:4   | 常见 14.1、15 寸电脑使用             |
| 1280 x 854  | 16:9  | 不常见                               |
| 1280 x 800  | 16:10 | 常见 10.8、12.1、15.4 寸电脑使用     |
| 1200 x 700  | 12:7  |                                      |
| 1024 x 768  | 4:3   | 常见 10.4、12.1、14.1、15 寸电脑使用 |
| 1024 x 600  |       | 常见 8.9 寸电脑使用                  |

移动端常见断点：

- xs：<576px 超小屏
- sm：576~768px 小屏
- md：768px~992px 中屏
- lg：992px~1200px 大屏
- xl：>=1200px 超大屏

## 布局方案

响应式布局，媒体查询、相对单位（如百分比、vw/vh、rem 等）

自适应布局，例如左右两边宽度固定，中间宽度自适应

弹性布局，使用相对单位，结合 flex 或 grid 布局

### rem + 弹性布局

可以使用 vscode 插件将 px 转为 rem，[地址](https://marketplace.visualstudio.com/items?itemName=cipchk.cssrem)

```css
html {
  /* 或者 62.5% */
  font-size: 10px;
}
```

自动设置 html 元素的字体大小：

```js
function setRootFontSize() {
  const baseFontSize = 16;
  const screenWidth = window.innerWidth;
  const newSize = (screenWidth / 1920) * 16;
  document.documentElement.style.fontSize = newSize + 'px';
}
window.addEventListener('load', setRootFontSize);
window.addEventListener('resize', setRootFontSize);
```

## 移动端适配
