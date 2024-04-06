# CSS 样式方案

## className

为了防止和 js 中的`class`类名冲突，需要将`class`写成`className`，小驼峰命名

```jsx
<input className="input" />
```

### 行内样式

两个大括号包裹，css 属性采用小驼峰命名

```js
<div style={{ background: '#f00' }}></div>


// 因为在 react 中变量是一个大括号包裹，将样式提出来就是变量了
const bg = { background: '#f00' }
<div style={bg}></div>
```

## 全局样式

声明一个 css 文件，导入组件中 `import "./App.css";`，然后绑定 className 即可。使用 less 或 sass 都可以

```jsx
import './App.css';

function App() {
  return <div className="box"></div>;
}

export default App;
```

## 局部样式

文件名后缀为`.module.css`

```jsx
import styles from './App.module.css';

function App() {
  return <div className={styles.box}></div>;
}

export default App;
```

## CSS-in-JS

### styled-components

<https://styled-components.com>

```sh
pnpm add styled-components
```

- 类似于组件
- 可以通信传参
- 样式可以嵌套、继承，类似于 scss

```jsx
import { useState } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  color: #f00;
`;

const FooStyle = styled.div`
  display: ${(props) => (props.show ? 'block' : 'none')};
  width: 100px;
  height: 100px;
  background: #0f0;
  p {
    color: #fff;
  }
`;

function App() {
  const [show, setShow] = useState(true);
  const handleClick = () => {
    setShow(!show);
  };
  return (
    <>
      <Title>Hello World</Title>
      <FooStyle show={show}>
        <p>react</p>
      </FooStyle>
      <button onClick={handleClick}>{show ? '隐藏' : '显示'}</button>
    </>
  );
}

export default App;
```

### emotion

<https://emotion.sh/docs/introduction>

```sh
pnpm add @emotion/react
```

## Tailwind CSS

CSS 原子化思想

<https://tailwindcss.com>

详见[tailwindcss](/fe/css/tailwindcss)
