# Tailwindcss

宽度：

- `w-full`：100%
- `w-[50px]`：自定义宽度为 50px

如果是常用的值，可以在`tailwind.config.js`中自定义：

```js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    preflight: false // 解决和其他库的基础样式冲突问题
  },
  theme: {
    extend: {
      colors: {
        'sky-1': '#03b4f5'
      }
    }
  }
};
```

设置权重：在类名前面加上 `!`

```html
<div class="bg-[#03B4F9] hover:!bg-[#02b6f7cc]"></div>
```
