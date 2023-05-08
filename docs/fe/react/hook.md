# Hook

`Hook`是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。

推荐安装 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

## Hook 规则

- 只在 React 函数最顶层使用 Hook
- 不要在循环，条件或嵌套函数中调用 Hook
- 只在 React 函数中调用 Hook
- 不要在普通的 js 函数中调用 Hook。可以在 React 的函数组件中调用 Hook，或者在自定义 Hook 中调用其他 Hook

## useState

`useState()`用于在函数组件中添加状态。接受一个初始值作为参数，返回一个由**当前状态**和**更新状态的函数**组成的数组，当调用这个函数去修改状态时，会触发组件重新渲染。
useState 针对每个组件实例都有自己的状态，不会共享状态。

```jsx
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  const decrement = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <div>
      <p>{count}</p>
      <button onClick={decrement}>decrement</button>
      <button onClick={() => setCount(count - 1)}>increment</button>
    </div>
  );
}
```

**1、为什么要使用 useState，直接声明变量不行吗？**

假设直接声明变量，点击按钮后能看到 count 打印出来的值是变了，但是页面却没有变化。因为没有触发组件重新渲染，详见 React 渲染原理

```js
export default function Home() {
  let count = 0;
  const increase = () => {
    count = count + 1;
    console.log(count);
  };
  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>click</button>
    </div>
  );
}
```

**2、为什么 `setCount(count + 1)`和 `setCount(prev => prev + 1)`都可以实现功能？**

在 React18+，useState 返回的更新状态的函数**setCount 是一个异步函数**，即使在连续多次调用时，也不能保证它们的值是最新的。因此，如果在调用 setCount 函数时，需要使用先前状态的值来计算新状态，那么使用回调函数的方式会更可靠。

在 `setCount(count + 1)` 的写法中，count 的值依次加一。但是，由于 setCount 是异步函数，实际上可能存在多次点击只触发一次更新的情况，此时计算新状态的值 `count + 1` 就会出现问题。

相比之下，`setCount(prev => prev + 1)` 的写法更可靠。在这种写法中，使用回调函数的方式来计算新状态的值，这个回调函数的参数 prev 是当前状态的值，可以保证它是最新的。因此，无论 setCount 函数是否被合并，都可以正确地计算新状态的值。

综上所述，虽然 `setCount(count + 1)` 在某些情况下可以正常工作，但是使用回调函数的方式 `setCount(prev => prev + 1)` 更可靠，建议在使用 useState 时采用这种写法。

**3、为什么说组件状态的更新是异步的？**

例子中，点击一次后，页面上显示 1，但是打印出来的还是 0。如果是同步的，执行`setCount((prev) => prev + 1)`会将 count 的值变为 1，那么之后的打印结果就应该是 1，因此组件状态的更新是异步的。

在 React18+之后，所有的 setState 都是异步批量执行的。<https://juejin.cn/post/7108362046369955847>

```jsx
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  const decrement = () => {
    setCount((prev) => prev + 1);
    console.log(count);
  };
  return (
    <div>
      <p>{count}</p>
      <button onClick={decrement}>decrement</button>
    </div>
  );
}
```

## useEffect

`useEffect`是执行副作用操作的。什么是副作用？

`useEffect(callback, dependencies)` ，第一个参数是要执行的函数，第二个参数是可选的依赖项数组。

关于依赖项参数的说明：

- 无参数，表示每次渲染的时候都执行，即任一 state 更新即执行
- 空数组，表示挂载执行，只执行一次
- 加`[]`并且里面有变量，表示变量更改了就执行，初始的时候就执行

如果`effect`返回一个回调函数，React 将会在执行清除操作时调用它，即组件销毁时执行

```jsx
import { useState, useEffect } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('num更新了即执行');
    return () => console.log('清除时调用');
  }, [count]);

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>click me</button>
    </>
  );
}
```

假设做一个数值自增功能

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [count]);

  return <h1>{count}</h1>;
}
```

当`count`每次改变时，定时器都重新设定和清除。更好的方案是使用[函数式更新](https://zh-hans.reactjs.org/docs/hooks-reference.html#functional-updates)，如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值。这样`effect`只会执行一次，但是仍能实现自增功能

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}
```

**1、如果在 useEffect 里使用了某些变量，但是没有在依赖项中指定，会发生什么？**

**2、在 useEffect 中使用的 setCount()是一个函数，本质上也是一个局部变量，为什么它不需要在依赖项中指定？**

## useReducer

`useReducer`是`useState`的替代品。接收一个形如`(state, action) => newState` 的 `reducer`，并返回当前的`state`和`dispatch`方法。
通过`action`的传递，更新复杂逻辑的状态

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'decrement':
      return { count: state.count + 1 };
    case 'increment':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="home">
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
      <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
    </div>
  );
}

export default Home;
```

## useContext

接收一个`context`对象（`React.createContext`的返回值）并返回该`context`的当前值。
当前的`context`值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value`决定。

当组件上层最近的`<MyContext.Provider>`更新时，该`Hook`会触发重渲染，并使用最新传递的值。

```jsx
import { useState, createContext, useContext } from 'react';

const ContentContext = createContext(null);

function Children() {
  // 如果父组件传入了多个值
  // const {num, setNum} = useContext(ContentContext)
  const getNum = useContext(ContentContext);
  return <h1>{getNum}</h1>;
}

function Home() {
  const [num, setNum] = useState(0);

  return (
    <div>
      <p>{num}</p>
      <button onClick={() => setNum(num + 1)}>click me</button>
      {/* 如果要传入多个值就传入一个对象，value={{ num, setNum }} */}
      <ContentContext.Provider value={num}>
        <Children />
      </ContentContext.Provider>
    </div>
  );
}

export default Home;
```

也可以使用 useReducer，在子组件中触发 dispatch

```jsx
// 父组件
import { createContext, useReducer } from 'react';
import Children from './Children';

export const ContentContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case 'decrement':
      return { count: state.count + 1 };
    case 'increment':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      <ContentContext.Provider value={{ state, dispatch }}>
        <Children />
      </ContentContext.Provider>
    </>
  );
}
```

子组件

```jsx
import { useContext } from 'react';
import { ContentContext } from './Home';

export default function Children() {
  const { state, dispatch } = useContext(ContentContext);
  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'decrement' })}>click</button>
    </>
  );
}
```

## useCallback

useCallback 的作用是**缓存函数**，避免重复生成新函数导致组件重新渲染

```js
useCallback(fn, deps);
```

这里 fn 是定义的回调函数，deps 是依赖项（变量数组），只有当某个依赖变量发生变化时，才会重新声明 fn 这个回调函数

```jsx
import { useState, useCallback } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const handleIncrement = useCallback(() => setCount((count) => count + 1), [count]);

  return <button onClick={handleIncrement}>increment</button>;
}
```

首先看一个现象，如下

```jsx
import { useState, useCallback } from 'react';

function Child() {
  console.log(123);
  return <h1>子组件</h1>;
}

export default function App() {
  const [num, setNum] = useState(0);

  return (
    <>
      <div>{num}</div>
      <button onClick={() => setNum(num + 1)}>add</button>
      <Child />
    </>
  );
}
```

当点击父组件的按钮改变 num 的值，会发现打印出 123，即子组件也跟着更新了，这样会影响性能。这时可以使用 memo 在某些情况下避免这种性能损耗，用 memo 方法把子组件包裹起来

```js
import { memo } from 'react';

const Child = memo(() => {
  console.log(123);
  return <h1>子组件</h1>;
});
```

接着上面的例子，如果想让子组件更新父组件的 num，第一种方式把 num 也传给子组件，这样有点繁琐。第二种方式是在父组件中定义改变的方法，子组件调用

```jsx
import { memo } from 'react';

const Child = memo((props) => {
  console.log(123);
  // return <button onClick={() => props.setNum(props.num + 1)}>add</button>
  return <button onClick={() => props.setNum()}>child</button>;
});

export default function App() {
  const [num, setNum] = useState(0);

  const doSomeThing = () => setNum(num + 1);

  return (
    <>
      <div>{num}</div>
      {/* <Child num={num} setNum={setNum} /> */}
      <Child setNum={doSomeThing} />
    </>
  );
}
```

上面的例子由子组件触发父组件的更新，但是又同时触发了子组件的更新，memo 不管用了。这时就要使用 useCallback

```jsx
import { useState, memo, useCallback } from 'react';

const Child = memo((props) => {
  console.log(123);
  return <button onClick={() => props.doSth()}>child</button>;
});

export default function App() {
  const [num, setNum] = useState(0);

  // 注意：useCallback(() => setNum(num + 1), [])
  // setNum(num + 1) 使用新值覆盖初始值，更新一次之后就不再更新了
  // setNum((num) => num + 1) 使用回调函数，不断使用新值覆盖旧值
  const doSomeThing = useCallback(() => setNum((num) => num + 1), []);

  return (
    <>
      <div>{num}</div>
      <Child doSth={doSomeThing} />
    </>
  );
}
```

## useMemo

useMemo 和 useCallback 很类似，需要继续返回一个回调函数。useCallback 缓存一个函数，useMemo 缓存计算的结果

把依赖项作为参数传入，仅会在某个依赖项改变时才重新计算，类似计算属性，避免在每次渲染时都进行高开销的计算

如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值

```jsx
import React, { useState, memo, useMemo } from 'react';

const Child = memo((props) => {
  console.log(123);
  return <button onClick={() => props.doSth()}>child</button>;
});

export default function App() {
  const [num, setNum] = useState(0);
  const [resData, setResData] = useState([]);

  const doSomeThing = useMemo(() => {
    return () => setNum((num) => num + 1);
  }, []);

  const memoRes = useMemo(() => {
    // 会监听resData的变化
    if (!resData) return;
    // 省略处理过程，返回处理后的结果
    return resData;
  }, [resData]);

  // const doSomeThing = useCallback(() => setNum((num) => num + 1), [])

  return (
    <>
      <div>{num}</div>
      <Child doSth={doSomeThing} />
    </>
  );
}
```

## useRef

获取 DOM 元素

```jsx
import { useState, useRef } from 'react';

export default function App() {
  const el = useRef(null);
  const [val, setVal] = useState();

  const clickBtn = () => {
    console.log(el);
    setVal(el.current.value);
  };
  return (
    <>
      <h3>input的值：{val}</h3>
      <input ref={el} type="text" />
      <button onClick={clickBtn}>click</button>
    </>
  );
}
```
