# Hook

`Hook`可以帮助在组件中使用不同的 React 功能。可以使用内置的 Hook 或自定义 Hook

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

如果状态是对象或数组，应该替换状态而不是更改现有对象

```jsx
const initialState = [
  { id: 0, title: 'a', done: true },
  { id: 1, title: 'b', done: false },
  { id: 2, title: 'c', done: false }
];

const [list, setList] = useState(initialState);

// 向数组中添加元素
setList([...list, { id: 3, title: 'd', done: false }]);

// 删除数组中的某个元素
setList(list.filter((item) => item.id !== id));

// 更新数组中的某个元素
setList(
  list.map((item) => {
    if (item.id === newItem.id) {
      return newItem;
    } else {
      return item;
    }
  })
);

const [state, setState] = useState({ id: 0, count: 0 });

// 更改对象状态的值，不能直接使用 state.count = 1
setState({ ...state, count: 1 });
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

使用惰性初始值，避免初始值重复计算。传递计算**函数本身**，而不是函数的计算结果

```jsx
import { useState } from 'react';

const initialState = () => {
  console.log(123);
  return 1 + 2 + 3; // 假设计算很昂贵
};

function App() {
  const [count, setCount] = useState(initialState);
  // const [count, setCount] = useState(initialState());

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>click</button>
    </>
  );
}

export default App;
```

## 惰性初始化的值

下面示例中，假如有一个初始值是经过复杂计算得来的，如果直接将计算结果传给 useState，那么在每次点击按钮时，都会重新计算一次初始值。可以在 useState 里传一个函数，这个函数会返回初始值，这样就避免了重复计算

```jsx
import { useState } from 'react';

function computed(n) {
  console.log(123);
  return n + 1;
}

function App() {
  // const [count, setCount] = useState(computed(0));
  const [count, setCount] = useState(() => computed(0));
  const handleAdd = () => {
    setCount(count + 1);
  };
  return (
    <>
      <div>count: {count}</div>
      <button onClick={handleAdd}>add</button>
    </>
  );
}
```

## immer

[immer](https://github.com/immerjs/use-immer)和 useState 很相似，返回一个状态和一个更新函数。如果感觉更新数组和对象很烦琐、嵌套层级很深，可以使用 immer 编写简洁的代码。

```sh
pnpm add immer use-immer
```

### 管理对象或数组类型的状态

示例：有一个输入框，在输入内容时，更新 b.c 的值

::: code-group

```jsx [使用useState]
import { useState } from 'react';

function App() {
  const [info, setInfo] = useState({
    a: 'react',
    b: {
      c: 'hello',
      d: 'world'
    }
  });

  function handleChange(e) {
    const value = e.target.value;
    setInfo((data) => ({
      ...data,
      b: {
        ...data.b,
        c: value
      }
    }));
  }

  return (
    <>
      <h1>Hello {info.a}</h1>
      <h1>
        {info.b.c} {info.b.d}
      </h1>
      <input onChange={handleChange} value={info.b.c} />
    </>
  );
}

export default App;
```

```jsx [使用immer]
import { useImmer } from 'use-immer';

function App() {
  const [info, setInfo] = useImmer({
    a: 'react',
    b: {
      c: 'hello',
      d: 'world'
    }
  });

  function handleChange(e) {
    const value = e.target.value;
    setInfo((draft) => {
      draft.b.c = value;
    });
  }

  return (
    <>
      <h1>Hello {info.a}</h1>
      <h1>
        {info.b.c} {info.b.d}
      </h1>
      <input onChange={handleChange} value={info.b.c} />
    </>
  );
}

export default App;
```

:::

### 管理基础类型的状态

```jsx
import React from 'react';
import { useImmer } from 'use-immer';

function BirthDayCelebrator() {
  const [age, setAge] = useImmer(20);

  function birthDay(event) {
    setAge(age + 1);
    alert(`Happy birthday #${age} Anon! hope you good`);
  }

  return (
    <div>
      <button onClick={birthDay}>It is my birthday</button>
    </div>
  );
}
```

### useImmerReducer

基于 useReducer 的 hook

```jsx
import React from 'react';
import { useImmerReducer } from 'use-immer';

const initialState = { count: 0 };

function reducer(draft, action) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return void draft.count++;
    case 'decrement':
      return void draft.count--;
  }
}

function Counter() {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
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
  // state dispatch 可以自定义名称
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

## useRef

useRef 能帮助引用一个不需要渲染的值

- useRef 返回一个只有一个 current 属性的对象
- 可以修改 `ref.current` 属性，修改它不会重新渲染组件
- ref 的使用场景：
  1. 存储一些不影响组件视图输出的信息
  2. 获取 DOM 元素

### 存储信息，保持记忆功能

```jsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  let num = 0;

  const handleClick = () => {
    setCount(count + 1);
    num++;
    console.log(num);
  };
  return (
    <>
      <div>count: {count}</div>
      <div>num: {num}</div>
      <button onClick={handleClick}>click</button>
    </>
  );
}
```

示例中，多次点击按钮，打印出来 num 的值始终是 1。因为在每次执行`setCount(count + 1)`时，组件重新渲染，num 会重置为 0。使用 useRef 存储 num 的值，这样在多次点击按钮后，打印出来 num 的值就是累加的结果。

如果注释掉下面的`setCount(count + 1)`，会发现打印出来的 num 的值在累加，但是页面上没有更新，这就说明了修改`ref.current` 属性，不会导致组件重新渲染。

```jsx
import { useState, useRef } from 'react';

function App() {
  const [count, setCount] = useState(0);
  let num = useRef(0);

  const handleClick = () => {
    setCount(count + 1);
    num.current++;
    console.log(num.current);
  };
  return (
    <>
      <div>count: {count}</div>
      <div>num: {num.current}</div>
      <button onClick={handleClick}>click</button>
    </>
  );
}
```

### 获取 DOM 元素

1. 声明一个 初始值 为 null 的 ref 对象
2. 将 ref 对象作为 ref 属性传递给想要操作的 DOM 节点的 JSX

```jsx
import { useState, useRef } from 'react';

function App() {
  const el = useRef(null);
  const [val, setVal] = useState();

  const clickBtn = () => {
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

### 写入或读取 ref 的时机

> 不要在渲染期间写入或者读取 ref.current

```jsx
import { useState, useRef } from 'react';

function App() {
  let num = useRef(0);

  // 不要在渲染期间写入ref
  num.current++;

  // 不要在渲染期间读取ref
  return <div>num: {num.current}</div>;
}
```

> 可以在事件处理程序或者 Effect 中读取和写入 ref

```jsx
import { useEffect, useRef } from 'react';

function App() {
  let num = useRef(0);

  useEffect(() => {
    num.current = 123;
  });

  const handleClick = () => {
    console.log(num.current);
  };
}
```

### 传递 ref 到自定义组件

如果想传递 ref 到自定义组件，需要在自定义组件内部使用 `React.forwardRef`

```jsx
import { useRef, forwardRef } from 'react';

const Foo = forwardRef((props, ref) => {
  return <input type="text" ref={ref} />;
});

function App() {
  let num = useRef(0);
  const handleClick = () => {
    num.current.focus();
    num.current.style.background = 'red';
  };

  return (
    <>
      <Foo ref={num} />
      <button onClick={handleClick}>click</button>
    </>
  );
}
```

如果有 eslint 报错：Component definition is missing display name，可以将箭头函数改为具名函数

```jsx
const Foo = forwardRef(function Foo(props, ref) {
  return <input type="text" ref={ref} />;
});
```

## useImperativeHandle

useImperativeHandle 可以自定义 ref 暴露出来的方法，避免完全暴露对 dom 的操作方法

下面的示例，只暴露了 focus 和 setBackground 方法，所以如果在父组件里想通过`myRef.current.style.background = 'red'`设置背景色就会报错，可以自定义方法 setBackground

```jsx
import { useRef, forwardRef, useImperativeHandle } from 'react';

const Foo = forwardRef(function Foo(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current.focus();
      },
      setBackground(color) {
        inputRef.current.focus();
        inputRef.current.style.background = color;
      }
    };
  });

  return <input type="text" ref={inputRef} />;
});

function App() {
  let myRef = useRef(null);
  const handleClick = () => {
    myRef.current.focus();
    // myRef.current.style.background = 'red';
    myRef.current.setBackground('red');
  };
  return (
    <>
      <Foo ref={myRef} />
      <button onClick={handleClick}>click</button>
    </>
  );
}

export default App;
```

## flushSync

示例，每次点击按钮时，页面数字会增加，但是 useRef 打印的结果还是上一次的值

```jsx
import { useState, useRef } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const handleClick = () => {
    setCount(count + 1);
    console.log(ref.current.innerHTML);
  };
  return (
    <>
      <div ref={ref}>{count}</div>
      <button onClick={handleClick}>click</button>
    </>
  );
}

export default App;
```

如果想 ref 获取到 DOM 更新后的值，可以使用`flushSync`，它出自`react-dom`。类似于 vue 中的`$nextTick`

```jsx
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

function App() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const handleClick = () => {
    flushSync(() => {
      setCount(count + 1);
    });
    console.log(ref.current.innerHTML);
  };
  return (
    <>
      <div ref={ref}>{count}</div>
      <button onClick={handleClick}>click</button>
    </>
  );
}

export default App;
```

## useContext

context 向组件深层传递数据

- 一般通过 props 将数据从父组件传递到子组件。如果组件层级很深，或者应用中的许多组件需要相同的数据，层层传递 props 会变的很麻烦
- context 允许父组件向下层组件传递数据，而无需通过 props 显示传递

接收一个`context`对象（`React.createContext`的返回值）并返回该`context`的当前值。
当前的`context`值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value`决定。

当组件上层最近的`<MyContext.Provider>`更新时，该`Hook`会触发重渲染，并使用最新传递的值。

```jsx
import { useState, createContext, useContext } from 'react';

// null是设置的默认值
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

::: code-group

```jsx [Home.jsx]
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

```jsx [Children.jsx]
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

:::

### 使用 useContext 和 useReducer 实现兄弟组件的通信

App.jsx 是父组件，ListHead.jsx 和 ListContent.jsx 是兄弟组件

::: code-group

```jsx [App.jsx]
import ListProvider from './ListProvider';
import ListHead from './ListHead';
import ListContent from './LIstContent';

function App() {
  return (
    <>
      <ListProvider>
        <ListHead />
        <ListContent />
      </ListProvider>
    </>
  );
}

export default App;
```

```jsx [ListProvider.jsx]
import { createContext, useReducer } from 'react';

export const ListContext = createContext();
export const ListDispatchContext = createContext();

function listReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.value];
    case 'edit':
      return state.map((item) => {
        if (item.id === action.id) {
          return { ...item, text: 'new-' + item.text };
        } else {
          return item;
        }
      });
    case 'remove':
      return state.filter((item) => item.id !== action.id);
    default:
      return state;
  }
}

function ListProvider({ children }) {
  const [list, listDispatch] = useReducer(listReducer, [
    { id: 1, text: 'a' },
    { id: 2, text: 'b' },
    { id: 3, text: 'c' }
  ]);

  return (
    <ListContext.Provider value={list}>
      <ListDispatchContext.Provider value={listDispatch}>{children}</ListDispatchContext.Provider>
    </ListContext.Provider>
  );
}

export default ListProvider;
```

```jsx [ListHead.jsx]
import { useContext } from 'react';
import { ListDispatchContext } from './ListProvider';

function ListHead() {
  const listDispatch = useContext(ListDispatchContext);
  return (
    <>
      <input type="text" />
      <button onClick={() => listDispatch({ type: 'add', value: { id: 4, text: 'd' } })}>add</button>
    </>
  );
}

export default ListHead;
```

```jsx [ListContent.jsx]
import { useContext } from 'react';
import { ListContext, ListDispatchContext } from './ListProvider';

function ListContent() {
  const list = useContext(ListContext);
  const listDispatch = useContext(ListDispatchContext);
  return (
    <ul>
      {list.map((item) => {
        return (
          <li key={item.id}>
            {item.text}
            <button onClick={() => listDispatch({ type: 'edit', id: item.id })}>Edit</button>
            <button onClick={() => listDispatch({ type: 'remove', id: item.id })}>Remove</button>
          </li>
        );
      })}
    </ul>
  );
}

export default ListContent;
```

:::

## memo

memo 是一个高阶组件，用于缓存组件的渲染结果，避免不必要的重新渲染。

```jsx
import { useState, memo } from 'react';

// function Child() {
//   console.log(123);
//   return <div>Child</div>;
// }

const Child = memo(function Child() {
  console.log(123);
  return <div>child</div>;
});

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };
  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>click</button>
      <Child />
    </>
  );
}

export default App;
```

未使用 memo 包裹前，每次点击按钮，都会重新渲染 Child 组件，即使 Child 组件没有变化。这样会造成性能问题。

如果设置`<Child count={count} />`，这样还是会重新渲染的，因为 count 变了，导致 Child 组件变了

::: warning
不要随意把所有组件都用 memo 包裹，只对真的需要缓存的组件才用
:::

## useMemo

useMemo 在每次重新渲染的时候能够缓存计算的结果

```js
const cachedValue = useMemo(fn, dependencies);
```

- fn 是要缓存计算值的函数，它应该是一个没有任何参数的纯函数，并且可以返回任意类型
- dependencies 是依赖项（变量数组），只有当某个依赖项发生变化时，才会重新调用 fn 并返回最新结果，否则返回上一次计算的值
- 在初次渲染时，useMemo 返回不带参数调用 fn 的结果
- 如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值

React 使用 [`Object.is()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较每个依赖和它之前的值

::: tip
**useCallback 缓存函数本身，useMemo 缓存函数调用的结果**
:::

```jsx
import { useState, memo, useMemo } from 'react';

const Child = memo((props) => {
  console.log(123);
  return <button onClick={() => props.doSomeThing()}>child</button>;
});

export default function App() {
  const [count, setCount] = useState(0);

  const doSomeThing = useMemo(() => {
    return () => setCount((count) => count + 1);
  }, []);

  return (
    <>
      <div>{count}</div>
      <Child doSomeThing={doSomeThing} />
    </>
  );
}
```

## useCallback

useCallback 的作用是**缓存函数**，避免重复生成新函数导致组件重新渲染

- [how-to-use-memo-use-callback](https://www.developerway.com/posts/how-to-use-memo-use-callback)

```js
const cachedFn = useCallback(fn, dependencies);
```

这里 fn 是想要缓存的函数，dependencies 是依赖项（变量数组），只有当某个依赖项发生变化时，才会重新声明 fn 这个回调函数。

React 使用 [`Object.is()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较每个依赖和它之前的值

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

const Child = memo(function Child() {
  console.log(123);
  return <h1>子组件</h1>;
});
```

接着上面的例子，如果想让子组件更新父组件的 num，第一种方式把 num 也传给子组件，这样有点繁琐。第二种方式是在父组件中定义改变的方法，子组件调用方法，让父组件去更新状态

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

## memo、useMemo、useCallback

示例中，未使用 useMemo 之前，点击按钮，子组件会重新渲染，即使使用了 memo 包裹子组件

```jsx
import { useState, memo, useMemo } from 'react';

const Child = memo(function Child() {
  console.log(123);
  return <div>Child</div>;
});

function App() {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('hello');

  // const list = [msg.toLowerCase, msg.toUpperCase()];

  const list = useMemo(() => {
    return [msg.toLowerCase(), msg.toUpperCase()];
  }, [msg]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>click</button>
      <Child list={list} />
    </>
  );
}

export default App;
```

未使用 useCallback 包裹函数 fn 之前，点击按钮，子组件会重新渲染

```jsx
import { useState, memo, useCallback } from 'react';

const Child = memo(function Child() {
  console.log(123);
  return <div>Child</div>;
});

function App() {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('hello');

  // const fn = () => {
  //   console.log(msg);
  // };

  const fn = useCallback(() => {
    console.log(msg);
  }, [msg]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>click</button>
      <Child fn={fn} />
    </>
  );
}

export default App;
```

使用 useMemo 实现 useCallback 的效果

```jsx
import { useState, memo, useCallback, useMemo } from 'react';

const Child = memo(function Child() {
  console.log(123);
  return <div>Child</div>;
});

function App() {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('hello');

  // const fn = () => {
  //   console.log(msg);
  // };

  // const fn = useCallback(() => {
  //   console.log(msg);
  // }, [msg]);

  const fn = useMemo(
    () => () => {
      console.log(msg);
    },
    [msg]
  );

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleClick}>click</button>
      <Child fn={fn} />
    </>
  );
}

export default App;
```

```jsx
useCallback(function Foo() {}, []);

// 功能相当于:
useMemo(() => function Foo() {}, []);
```

## startTransition 函数与并发模式

- react18 之前，渲染是一个单一的、不间断的、同步的过程，一旦渲染开始，就不能被中断
- react18 引入并发模式，允许将标记更新作为一个 transition，这会告诉 react 它们可以被中断执行。这样就可以把紧急的任务先更新，不紧急的任务后更新

示例：

1. App 是父组件，List 是子组件
2. 有一个输入框，根据输入的内容，让匹配到的内容变成红色
3. 在没有任何处理的情况下，在输入框中输入的内容不会立即更新，而是等匹配到的内容变成红色之后才会更新
4. 因为 setSearchValue 和 setQuery 都是紧急任务
5. 如果内容变色高亮相对不是很紧急，可以使用 startTransition 将其变为非紧急任务

```jsx
import { useState, startTransition } from 'react';

function List({ query }) {
  const items = [];
  const word = 'react';
  if (query !== '' && word.includes(query)) {
    const arr = word.split(query);
    for (let i = 0; i < 20000; i++) {
      items.push(
        <li key={i}>
          {arr[0]}
          <span style={{ color: 'red' }}>{query}</span>
          {arr[1]}
        </li>
      );
    }
  } else {
    for (let i = 0; i < 20000; i++) {
      items.push(<li key={i}>{word}</li>);
    }
  }
  return <ul>{items}</ul>;
}

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    // 1. 紧急任务
    setSearchValue(e.target.value);

    // 2. 紧急任务
    setQuery(e.target.value);

    // 3. 非紧急任务
    // startTransition(() => {
    //   setQuery(e.target.value);
    // });
  };

  return (
    <>
      <input type="text" value={searchValue} onChange={handleChange} />
      <List query={query} />
    </>
  );
}

export default App;
```

## useTransition

useTransition 是一个能在不阻塞 UI 的情况下更新状态的 hook，返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的 startTransition 函数

沿用前面 startTransition 的示例，就是多了一个等待状态

```jsx
import { useState, useTransition } from 'react';

function List({ query }) {
  const items = [];
  const word = 'react';
  if (query !== '' && word.includes(query)) {
    const arr = word.split(query);
    for (let i = 0; i < 20000; i++) {
      items.push(
        <li key={i}>
          {arr[0]}
          <span style={{ color: 'red' }}>{query}</span>
          {arr[1]}
        </li>
      );
    }
  } else {
    for (let i = 0; i < 20000; i++) {
      items.push(<li key={i}>{word}</li>);
    }
  }
  return <ul>{items}</ul>;
}

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [query, setQuery] = useState('');

  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    // 紧急任务
    setSearchValue(e.target.value);

    // 非紧急任务
    startTransition(() => {
      setQuery(e.target.value);
    });
  };

  return (
    <>
      <input type="text" value={searchValue} onChange={handleChange} />
      {isPending && <div>loading...</div>}
      <List query={query} />
    </>
  );
}

export default App;
```

## useDeferredValue

useDeferredValue 可以延迟更新 UI 到某些部分。接收一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后

沿用前面 startTransition 的示例：

```jsx
import { useState, useDeferredValue } from 'react';

function List({ query }) {
  const items = [];
  const word = 'react';
  if (query !== '' && word.includes(query)) {
    const arr = word.split(query);
    for (let i = 0; i < 20000; i++) {
      items.push(
        <li key={i}>
          {arr[0]}
          <span style={{ color: 'red' }}>{query}</span>
          {arr[1]}
        </li>
      );
    }
  } else {
    for (let i = 0; i < 20000; i++) {
      items.push(<li key={i}>{word}</li>);
    }
  }
  return <ul>{items}</ul>;
}

function App() {
  const [searchValue, setSearchValue] = useState('');

  // 得到和searchValue一样的值，不过是一个延迟的副本
  const query = useDeferredValue(searchValue);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <input type="text" value={searchValue} onChange={handleChange} />
      <List query={query} />
    </>
  );
}

export default App;
```

## useId

useId 可以生成传递给无障碍属性的唯一 id

> 不要使用 useId 来生成列表中的 key

一个组件可能会在页面上渲染多次，但是 id 必须是唯一的

示例：调用了两次 Foo 组件，但是生成的 Dom 元素的 id 是相同的。可以查看控制台的 Dom 元素

```jsx
function Foo() {
  return (
    <>
      <label>
        密码:
        <input type="password" aria-describedby="password-hint" />
      </label>
      <p id="password-hint">密码应该包含至少 18 个字符</p>
    </>
  );
}

function App() {
  return (
    <>
      <Foo />
      <Foo />
    </>
  );
}

export default App;
```

使用 useId 改进后的代码：

```jsx
import { useId } from 'react';

function Foo() {
  const passwordId = useId();
  return (
    <>
      <label>
        密码:
        <input type="password" aria-describedby={passwordId} />
      </label>
      <p id={passwordId}>密码应该包含至少 18 个字符</p>
    </>
  );
}
```

如果想要给 id 添加前缀：

```jsx
import { useId } from 'react';

function Foo() {
  const passwordId = useId();
  return (
    <>
      <label>
        密码:
        <input type="password" aria-describedby={'react' + passwordId} />
      </label>
      <p id={'react' + passwordId}>密码应该包含至少 18 个字符</p>
    </>
  );
}
```

如果想要添加全局的前缀，可以在 main.jsx 中添加 identifierPrefix 属性

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root'), { identifierPrefix: 'react' }).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
