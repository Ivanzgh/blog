
## 随机生成16进制颜色
```js
const getRandomColor = () => {
    return `#` + [0, 0, 0].map(() => (~~(Math.random() * 0x100)).toString(16).replace(/^(\d)$/, `0$1`)).join(``)
}
getRandomColor()
``` 