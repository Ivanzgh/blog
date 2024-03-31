# React 插件

## classnames

用于有条件地将类名连接在一起，可以更简洁的绑定多个 className

- <https://github.com/JedWatson/classnames>

```sh
npm install classnames
```

用法：

```js
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

classNames({ [`btn-${key}`]: true }); // key = 1， => 'btn-1'
```

示例：

```jsx
import { useState } from 'react';
import classNames from 'classnames';

function App() {
  const [count, setCount] = useState(0);

  const btnClass = classNames({
    btn: count > 1
  });

  const key = 1;
  const bc = classNames({ [`btn-${key}`]: true });

  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <>
      <h1 className={btnClass}>{count}</h1>
      <button onClick={handleClick}>click</button>
    </>
  );
}

export default App;
```

使用 CSS Modules 的示例：

```jsx
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.less';

const cx = classNames.bind(styles);

function App() {
  const [count, setCount] = useState(0);

  const btnClass = cx({
    btn: count > 1
  });

  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <>
      <h1 className={btnClass}>{count}</h1>
      <button onClick={handleClick}>click</button>
    </>
  );
}

export default App;
```

## 错误边界

> 错误边界（Error Boundary）是一个 React 组件，该组件可以捕获其子组件的错误，并渲染出备用 UI。

默认情况下，如果 React 渲染期间发生错误，整个组件树都会被卸载。例如有一个父组件，有若干个子组件，当其中一个子组件报错时，整个组件树都不会被渲染。理想情况是，其他组件正常渲染，而报错的组件被隐藏或者替换成备用 UI。

- <https://github.com/bvaughn/react-error-boundary>

```sh
pnpm add react-error-boundary
```

示例，因为子组件 Foo 报错，导致父组件的内容也无法渲染，页面空白。使用`react-error-boundary`后，控制台依然会报错，但是页面正常渲染，错误组件会渲染出备用 UI。

::: code-group

```jsx [Error.jsx]
import { useState } from 'react';

function Foo() {
  // 这里会报错
  bar();
  return <div>foo</div>;
}

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <>
      <div>{count}</div>
      <button onClick={handleClick}>click</button>
      <Foo />
    </>
  );
}

export default App;
```

```jsx [ErrorBoundary.jsx]
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function Foo() {
  bar();
  return <div>foo</div>;
}

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <>
      <div>{count}</div>
      <button onClick={handleClick}>click</button>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Foo />
      </ErrorBoundary>
    </>
  );
}

export default App;
```

:::

## 动画库

## 图表

## 地图

### 百度地图

- [React-BMap：2D 地图](https://github.com/huiyan-fe/react-bmap)
- [React-BMapGL：3D 地图](https://lbsyun.baidu.com/solutions/reactBmapDoc)
