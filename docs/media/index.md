# 流媒体

## video 标签

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

## audio 标签

```html
<audio controls>
  <source src="/assets/viper.mp3" type="audio/mp3" />
  <source src="/assets/viper.ogg" type="audio/ogg" />
  <p>你的浏览器不支持audio标签</p>
</audio>
```

## 字幕

使用`<track>`可以给`<video>`和`<audio>`添加字幕。

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

## 编码标准

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

- 软解码
  - 一种是基于`Flash`的`H.265`解码方案
  - 主流方案是使用 [WebAssembly](https://webassembly.org/) 技术将金山云自研的高性能解码器编译为`wasm`库，`wasm`文件是以二进制形式存在的，其中包含平台无关的虚拟指令（类似汇编指令）。

## 传输协议

### HLS

### HTTP-FLV

### RTP

### RTCP

### RTSP

### RTMP

## 封装格式

### MP4

### FLV

### M3U8

## 点播/直播编转码

- 点播（video on demand），简称`VOD`，提前录制好的视频，常见格式有`mp4`、`flv`、`m3u8`等
- 直播（live broadcast），时效性高，正在发生的

## 开源架构

### FFMPEG

### WebRTC

## 工具

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
