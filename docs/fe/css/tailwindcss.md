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

设置渐变色，需要去掉空格，必须的空格使用下划线代替

```html
<!-- border-image: linear-gradient(88deg, #5491cf, transparent) 10 10; -->

<div class="[border-image:linear-gradient(88deg,#5491cf,transparent)_10_10]"></div>
```

## 响应式设计

https://tailwindcss.com/docs/responsive-design

默认使用移动优先断点设计

tailwindcss.config.cjs

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  }
};
```

如果使用`max-width`，配置如下：

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      '2xl': { max: '1600px' },
      xl: { max: '1536px' },
      lg: { max: '1440px' },
      md: { max: '1366px' },
      sm: { max: '1280px' },
      xs: { max: '1200px' }
    }
  }
};
```
