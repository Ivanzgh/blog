# 流媒体

## video 标签

用于播放视频或直播流，可以通过 JS HTMLVideoElement 对象访问

```html
<video controls width="250" src="/media/test.mp4"></video>

<video controls width="250">
  <source src="/media/test.webm" type="video/webm" />
  <source src="/media/test.mp4" type="video/mp4" />
  当前浏览器不支持video标签
</video>
```

常用属性：

- `width` 视频显示区域的宽度，单位是`px`，不支持百分比
- `height` 视频显示区域的高度
- `controls` 控制面板，允许用户控制视频的音量、跨帧、暂停/恢复播放
- `loop` 是否循环播放
- `muted` 是否设置初始静音
- `src` 视频链接，可选，可使用`video`块内的`<source>`元素代替
- `poster` 视频封面

`<source>` 标签放在 `<audio>` 或者 `<video>` 内部，以指定播放的媒体源，可以添加多个不同格式、大小、分辨率的媒体源，
通过 JS HTMLSourceElement 对象访问

## audio 标签

播放音频，可以通过 JS HTMLAudioElement 对象访问

```html
<audio controls>
  <source src="/assets/viper.mp3" type="audio/mp3" />
  <source src="/assets/viper.ogg" type="audio/ogg" />
  <p>你的浏览器不支持audio标签</p>
</audio>
```

## 字幕

使用`<track>`可以给`<video>`和`<audio>`添加字幕

```html
<video controls>
  <source src="/assets/movie.mp4" type="video/mp4" />
  <track default label="嗷嗷" kind="subtitles" srclang="en" src="/assets/subtitles_en.vtt" />
  当前浏览器不支持video标签
</video>
```

### 属性

- `default`，启用字幕，有多个`<track>`时只能有一个可以设置该属性
- `src`，路径
- `kind`
  - `subtitles` 翻译，附加背景信息，默认值
  - `captions` 隐藏式字幕提供了音频的转录甚至是翻译
  - `descriptions` 视频简介
  - `chapters` 章节标题用于用户浏览媒体资源的时候
  - `metadata` 脚本使用的 track，对用户不可见
- `label`，标题，如中文字幕、英文字幕
- `srclang`，字幕的语言，如 zh、en

### 字幕格式

使用`WebVTT`，文件后缀是`.vtt`，详见：[官网](https://w3c.github.io/webvtt/)、
[mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/WebVTT_API)

### 字幕样式

伪元素`::cue`可以设置字幕样式，[mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::cue)

```css
video::cue {
  background-image: linear-gradient(to bottom, dimgray, lightgray);
  color: papayawhip;
}

video::cue(b) {
  color: peachpuff;
}
```

支持一些 html 标签进行样式控制，如`声音<v>、颜色<c>、加粗<b>、倾斜<i>、划线<u>、<ruby>、<lang>`等

设置`<v>`可以区别谁说的话

```
WEBVTT

00:00:01.010 --> 00:00:05.500
<v zhangsan>啊啊啊啊啊啊啊

00:00:05.739 --> 00:00:07.074
<v lisi>咋滴啦
```

```css
::cue(v[voice='zhansan']) {
  color: red;
}
::cue(v[voice='lisi']) {
  color: green;
}
```

还可以直接选中标签控制样式

```css
::cue(b) {
  color: red;
}
```

类名控制

```
00:00:01.010 --> 00:00:05.500
<c.red>啊啊啊啊啊啊啊
```

```css
video::cue(.red) {
  color: red;
}
```

`paypal`的开源项目：[accessible-html5-video-player](https://github.com/paypal/accessible-html5-video-player)，可以对原生的`video`进行 UI 定制，会把`WebVTT`文件中`html`片段直接完整输出到页面中，这样所有的 CSS 属性都可以使用了

## 媒体 API

- 媒体源扩展 API
  MSE (Media Source Extension) 扩展了浏览器的媒体播放功能，允许用 JS 动态构造媒体流 MediaSource 对象，然后喂给`<video>`和`<audio>`标签进行更精细化的播放控制。也可以用 JS 把一些不支持的视频流格式转封装为支持的格式，flv.js 就是基于此实现，使用 MSE 技术将 FLV 源用 JS 实时转封装成 HTML5 支持的视频格式
- 网络音频 API
  Web Audio API 用于处理和合成 Web 应用程序中的音频，可以声音合成、添加音频特效、音频可视化等，使用 Web Audio API 可以完成专业的 Web 音频处理软件（如节拍器、调音器等）
- 媒体捕获和流媒体 API
  Media Stream API 可以使用本地摄像头和麦克风来采集录制音视频，或者捕获电脑屏幕，或者读取本地视频做合成，常用于 Web 摄像头、拍照、录屏、视频通话等，MediaStream 是连接 WebRTC API 和底层物理流的中间层，WebRTC 将音视频经过语音或视频引擎进行处理后，再通过 MediaStream API 暴露给上层使用
- WebRTC
  WebRTC 是一套支持浏览器进行实时音视频对话的 API，它包括了音视频的采集、编解码、网络传输、显示等功能，使互联网上任意两位用户在**无需服务器**的情况下实现实时的音频、视频和任意数据的通信

## 编码标准

为了便于传输和存储，需要对原视频文件通过编码来压缩文件大小，再通过容器封装将压缩后的音视频、字幕组合到一个容器内，这就是**编码**和**容器封装**的过程。
在播放时就要**解封装**和**解码**，`<video>`标签只支持特定格式的媒体内容对其解封装和解码

### H.264/AVC

### H.265/HEVC

更好的编码标准，但目前硬件支持度很低，相对于`H.264`优点包括：提高压缩效率、提高鲁棒性和错误恢复能力、减少实时的时延、减少信道获取时间和随机接入时延、降低复杂度等

## 播放器架构

播放器由播放器内核和 UI 界面组成，用于读取、解析渲染流文件

![image](https://cdn.jsdelivr.net/gh/Ivanzgh/ossimg@main/blog/1661311721.jpg)

![image](https://cdn.jsdelivr.net/gh/Ivanzgh/ossimg@main/blog/1661313473.jpg)

- 分离器`demux`

媒体文件和网络流是将音视频压缩编码后和其他数据一起打包传输的，即编码器`mux`。解封装与上述过程正好相反，是把视频轨和音频轨分离出来。
支持的常见格式如`mp4`、`flv`、`m3u8`、`avi`等

- 解码器`decoder`

负责对压缩的音视频数据进行解码，拿到原始的`YUV`和`PCM`数据，常见的视频压缩格式如：`H.264`、`MPEG4`、`VP8/VP9`，
音频压缩格式如 `G.711`、`AAC`、`Speex`等

## 解码方式

- 硬解码

借助显卡硬件进行解码工作，优点是功耗低，解码速度快。
但目前 H.265 编码在浏览器中的硬件解码支持情况并不普及，而且硬件解码需要用户的显卡支持

- 软解码，通过CPU运行解码软件来进行解码
  - 一种是基于`Flash`的`H.265`解码方案
  - 主流方案是使用 [WebAssembly](https://webassembly.org/) 技术将金山云自研的高性能解码器编译为`wasm`库，`wasm`文件是以二进制形式存在的，其中包含平台无关的虚拟指令（类似汇编指令）
  - 在 WEB 端是绘制到 canvas 上

## 点播/直播编转码

- 点播（video on demand），简称`VOD`，提前录制好的视频，常见格式有`mp4`、`flv`、`m3u8`等
- 直播（live broadcast），时效性高，正在发生的

![image](https://cdn.jsdelivr.net/gh/Ivanzgh/ossimg@main/blog/1661832466.png)

发起直播的客户端，向上连着流媒体服务器，直播产生的视频流会被实时的推送到服务端，这个过程就是**推流**。
其他客户端从流媒体服务器实时拉取直播客户端的视频流，这个过程就是**拉流**

**流数据**是二进制数据，是一帧一帧的，每帧数据很小，很适合实时传输，如直播时的音视频数据

## 封装格式

### MP4

### FLV

很适合浏览器直播，但是 video 标签不能直接播放 flv 格式

### M3U8

## 传输协议

### HLS

http live streaming，苹果提出的基于 HTTP 的流媒体协议，H5 可以直接播放，对应的视频格式就是 m3u8

### HTTP-FLV

目前的主流方案，基于 HTTP 流式 IO 传输 FLV，还有 **WebSocket-FLV**协议

### RTP

### RTCP

### RTSP

是一种双向实时数据传输协议，允许客户端向服务器端发送请求，如回放、快进、倒退等操作

### RTMP

底层基于 TCP，在浏览器端依赖 Flash

## 开源架构

### FFMPEG

### WebRTC

## 播放器

### chrome 音视频工具

地址栏输入`chrome://media-internals/`，这里可以了解当前音视频的编码，`buffer`状态等信息。进入之后可以看到 5 个模块

- `Players` 视频日志
- `Audio` 音频日志
- `Video Capture` 当前摄像头的状况
- `Audio Focus` 当前音频播放的`Session`
- `CDMS` 注册内容解密模块

假设当前正在播放一个视频<https://www.bilibili.com/video/BV1hN4y1G7th>，选中当前视频，会出现`Player Properties`和`Log`两项表格，

- `kAudioTracks`和 `kVideoTracks` 分别是音视频编码信息
- `video_buffering_state`和`audio_buffering_state`来确定当前视频的`Buffer`状态

Log 包含了常规的多媒体日志信息和网络日志信息

### flv.js

基于 HTTP-FLV 流媒体协议，通过纯 JS 实现 FLV 转封装，使 flv 格式文件能在 Web 上进行播放。
但视频仅支持 H.264 编码，音频支持 AAC 和 MP3 编码

### hls.js

基于 Http Live Stream 协议开发，利用 MSE，用于实现 HLS 在 web 上播放

### ffmpeg.js

文件解码转码库

### Aliplayer

阿里支持 HTML5 和 Flash 两种播放模式
