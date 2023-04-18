# 响应式布局

## 媒体查询

### window.matchMedia()

判定是否匹配媒体查询

```js
const mediaQueryString = '(max-width: 600px)'
let media = window.matchMedia(mediaQueryString)

const listener = () => console.log(media.matches)
window.addEventListener('resize', listener)
window.removeEventListener('resize', listener)
```

## 移动端适配
