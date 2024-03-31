# 组件

## 创建组件的方式

创建组件有函数组件和类组件两种方式，React18 之后，全面使用函数组件，类组件会退出历史舞台

```jsx
function Home(props) {
  return <div className="home">Welcome to React~</div>;
}

const Home = () => {
  return <div className="home">Welcome to React~</div>;
};
```

## 对组件的要求

1. 组件名称必须以**大写字母开头**，否则 React 会将以小写字母开头的组件视为原生 DOM 标签
2. 必须返回可以渲染的元素

- react 元素
- null
- 组件
- 可迭代的对象，包括数组、Set、Map 等

```jsx
function App1() {
  return null;
}

function App2() {
  return [1, 2, 3];
}

// 如果直接返回对象，会报错：Uncaught Error: Objects are not valid as a React child
function App3() {
  return { a: 1 };
}
```

那么是否可以说 React 组件不能返回对象？不能，可以返回一个迭代器

```jsx
const obj = { a: 1 };
obj[Symbol.iterator] = function* () {
  for (let prop in obj) {
    yield [prop, obj[prop]];
  }
};

function App() {
  return obj;
}
```

## 组件重新渲染的条件

- 自身状态发生变化
- 父组件重新渲染

## 数据

所有 React 组件都必须像纯函数一样保护它们的`props`不被更改

改变数据核心思想：先拷贝这个对象或数组，再改变这个拷贝后的值

更新对象：创建一个新的对象，通常使用展开运算符

```js
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg'
  }
});
```

如果要更新 person.artwork.city 的值

```js
setPerson(...person, artwork: { ...person.artwork, city: 'beijing'})
```

更新数组：

添加 `setList([...list, 666])`

删除，需要生成一个不包含该元素的新数组，通常使用 filter 方法

更新，map()

## Fragments

简单说就是避免向 DOM 中添加额外的节点

假如有一个子组件`<Columns />`

```jsx harmony
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```

有一个父组件使用了`<Columns />`

```jsx
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

结果如下，在 tr 和 td 之间多了一个 div 节点，这样就导致了 html 是无效的

```html
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

`Fragments`就解决了这个问题

```jsx
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

也可以使用一种短语法，像空标签一样

```jsx
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

## 严格模式

在脚手架生成的 main.js 中，会发现使用了严格模式 StrictMode。启用了严格模式后， React 会在**开发环境**下调用渲染函数**两次**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

作用：

1. 检查组件是否是纯函数
2. 及早发现 useEffect 中的错误
3. 警告过时的 API

## 受控组件和非受控组件

- 受控组件：通过`props`控制的组件
- 非受控组件：通过`state`控制的组件

React 表单内置了受控组件的行为：

1. value + onChange
2. checked + onChange

```jsx
import { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    // 如果不更新inputValue，在页面上input是不能输入的
    setInputValue(e.target.value);
  };
  const handleCheckedChange = (e) => {
    setChecked(e.target.checked);
  };
  return (
    <>
      <input type="text" value={inputValue} onChange={handleChange} />
      <input type="checkbox" checked={checked} onChange={handleCheckedChange} />
    </>
  );
}
```

input 的值是通过`inputValue`控制的，当输入框的值发生变化时，会触发`onChange`事件，然后通过`setInputValue`更新`inputValue`的值，这样就实现了受控组件

## 组件嵌套

如果想在某个组件里嵌套子组件，需要在该组件里通过`props.children`接收子组件的内容，否则不显示子组件的内容

App 组件：

```jsx
import Child from './Child';
import Foo from './Foo';

function App() {
  return (
    <>
      <Child>
        <Foo />
      </Child>
    </>
  );
}

export default App;
```

Foo 组件：

```jsx
function Foo() {
  return <div>Foo</div>;
}
export default Foo;
```

Child 组件：

```jsx
function Child({ children }) {
  return (
    <>
      <div>Child</div>
      {children}
    </>
  );
}

export default Child;
```

Q：为什么不直接在 Child 组件里使用 Foo 组件？

A：因为有时需要从上层组件（这里是 App 组件）获取数据，而不是从 Child 组件获取

## Lazy 与 Suspense 实现懒加载

- [Lazy](https://zh-hans.react.dev/reference/react/lazy) 能够让组件延迟加载，按需加载
- [Suspense](https://zh-hans.react.dev/reference/react/Suspense) 允许在子组件完成加载前展示备用方案

```jsx
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```

示例 1：在 App.jsx 中引入 Foo 组件，但是并未使用，但是控制台会打印出 Foo。这个时候就没有做到按需加载

::: code-group

```jsx [App.jsx]
import Foo from './Foo';

function App() {
  return (
    <>
      <div>App</div>
    </>
  );
}

export default App;
```

```jsx [Foo.jsx]
console.log('Foo');

function Foo() {
  return <div>Foo</div>;
}

export default Foo;
```

:::

再看一个项目中经常遇到的代码如下，希望在 show 变为 true 时，再加载 Foo 组件，实际上控制台依然打印出了 Foo

```jsx
import Foo from './Foo';
import { useState } from 'react';

function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>App</div>
      <button onClick={() => setShow(true)}>显示</button>
      {show && <Foo />}
    </>
  );
}

export default App;
```

使用 `<Suspense>` 可以在懒加载的组件加载时显示一个正在加载的提示，这个提示可以在控制台将网速设置较慢的时候可以看到

实现懒加载之后的代码如下：

```jsx
import { useState, lazy, Suspense } from 'react';

const Foo = lazy(() => import('./Foo.jsx'));

function App() {
  const [show, setShow] = useState(false);
  return (
    <>
      <div>App</div>
      <button onClick={() => setShow(true)}>显示</button>
      <Suspense fallback={<div>Loading...</div>}>{show && <Foo />}</Suspense>
    </>
  );
}

export default App;
```
