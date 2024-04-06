# Tailwindcss

## 安装依赖

```sh
# 安装 tailwindcss
npm i -D tailwindcss postcss autoprefixer

# 安装之后执行命令生成 tailwindcss.config.cjs 和 postcss.config.cjs
npx tailwindcss init -p

# 安装 prettier，然后创建 prettier.config.cjs 使用 plugin
# https://github.com/tailwindlabs/prettier-plugin-tailwindcss
npm i -D prettier prettier-plugin-tailwindcss
```

更好的 TailwindCss 排序：<https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted>

## 插件推荐

`Tailwind CSS IntelliSense`，Tailwindcss 提示

`Tailwind Documentation`，在编辑器内快速搜索，快捷键：cmd + ctrl + t

## 常用样式

### 宽度

- `w-full`：100%
- `w-1/2`：50%
- `w-[50px]`：自定义宽度为 50px

### 设置权重

在类名前面加上 `!`

```html
<div class="bg-[#03B4F9] hover:!bg-[#02b6f7cc]"></div>
```

### 设置渐变色

需要去掉空格，必须的空格使用下划线代替

```html
<!-- border-image: linear-gradient(88deg, #5491cf, transparent) 10 10; -->

<div class="[border-image:linear-gradient(88deg,#5491cf,transparent)_10_10]"></div>
```

## tailwind.config.cjs 配置

### 自定义常用的值

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

假设设置背景色，使用方式：`bg-sky-1`

### 设置伪元素

设置 content，声明一个属性代表图片路径

```js
{
  content: {
    evolvetext: "url('./assets/EvolveText.png')";
  }
}
```

使用：`md:before:content-evolvetext`

```html
<div className="relative">
  <div className="before:absolute before:-top-20 before:-left-20 before:z-[-1] md:before:content-evolvetext">
    <img alt="home-page-text" src="{HomePageText}" />
  </div>
</div>
```

## 响应式设计

https://tailwindcss.com/docs/responsive-design

默认使用**移动优先**断点设计

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
