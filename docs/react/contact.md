# 组件通信

## 父传子

父组件在子组件上传入属性，子组件通过 props 接收数据，也可以通过解构赋值的方式获取参数

```jsx
function Child(props) {
  return <h1>{props.num}</h1>;
}

export default function Father() {
  return <Child num={123} />;
}
```

当传递的数据只有属性名没有值，那么就是传递了一个布尔值 true

```jsx
function Child({ num, isShow }) {
  return (
    <>
      <h1>{num}</h1>
      {isShow + ''}
    </>
  );
}

export default function Father() {
  return <Child num={123} isShow />;
}
```

## 子传父

子组件调用父组件的方法，修改父组件的内容，永远都是父组件自己在修改自己，子组件只是通知父组件

```js
import { useState } from 'react';

function Child(props) {
  return (
    <>
      <h1>{props.num}</h1>
      <button onClick={() => props.changeNum(666)}>change</button>
    </>
  );
}

export default function App() {
  const [msg, setMsg] = useState('你好');

  // 这里的 arg 就是接收子组件传过来的值
  const numChange = (arg) => {
    console.log(arg);
    setMsg(arg);
  };

  return (
    <>
      <h1>{msg}</h1>
      <Child num={123} changeNum={numChange} />
    </>
  );
}
```

在父组件里也可以直接把 setMsg 方法传给子组件，避免多声明一个函数

```js
// 父组件
<Child num={123} setMsg={setMsg} />

// 子组件
<button onClick={() => props.setMsg(666)}>change</button>
```

## 批量传参

如果父组件要传递多个参数给子组件，可以写在一个对象里

父组件：

```jsx
import Child from './Child';

function App() {
  const info = {
    num: 123,
    isShow: true,
    onMsg(e) {
      console.log(e);
    }
  };

  return (
    <>
      <Child {...info} />
    </>
  );
}

export default App;
```

子组件：

```jsx
function Child({ num, isShow, onMsg }) {
  return (
    <>
      <h1>{num}</h1>
      {isShow + ''}
      <button onClick={() => onMsg(num)}>click</button>
    </>
  );
}

export default Child;
```

## 通信总结

简单理解，把父子组件看成两个函数，子组件接收的 props 就是一个函数参数，父组件可以把它的 state 作为 props 向下传递到它的子组件中，这样在子组件里就能接收父组件的数据。

子组件如何向父组件传值呢？父组件将一个函数传给子组件，子组件调用这个函数，将自己的数据当作参数传递给该函数，那么父组件就能接收子组件的数据了，其实就是闭包

```js
function f1() {
  const num = 0;
  const fn = (msg) => {
    console.log(msg);
  };
  const props = { num, fn };

  f2(props);
}

function f2(props) {
  const num = 1;
  props.fn(num + props.num);
}

f1();
```
