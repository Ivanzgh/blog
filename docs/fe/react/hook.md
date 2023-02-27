# Hook

`Hook`是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。

## Hook 规则

- 只在 React 函数最顶层使用 Hook
- 不要在循环，条件或嵌套函数中调用 Hook
- 只在 React 函数中调用 Hook
- 不要在普通的 js 函数中调用 Hook。可以在 React 的函数组件中调用 Hook，或者在自定义 Hook 中调用其他 Hook

## useState

`useState`就是一个 Hook，类似`class`组件的`this.setState`，`useState()`方法里面唯一的参数就是初始`state`，返回值为当前`state`以及更新`state`的函数

使用`Hook`实现点击按钮数值增加

```jsx
import React, { useState } from 'react'

function Home() {
  // 定义一个num变量，初始值是0，setNum是更新num的函数
  const [num, setNum] = useState(0)
  return (
    <div className="home">
      <p>Welcome to React~{num}</p>
      <button onClick={() => setNum(num + 1)}>click me</button>
    </div>
  )
}

export default Home
```

使用`class`组件能实现同样的功能，但是`Hook`不能在`class`组件中使用

```jsx
import React, { Component } from 'react'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = { num: 0 }
  }

  render() {
    return (
      <div className="home">
        <p>Welcome to React~{num}</p>
        <button onClick={() => this.setState({ num: this.state.num + 1 })}>click me</button>
      </div>
    )
  }
}
```

## useEffect

`useEffect` 是执行副作用操作的，可以将其看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

```jsx
import React, { useState, useEffect } from 'react'

function Home() {
  const [num, setNum] = useState(0)

  // effect在每次渲染的时候都会执行，React 会在执行当前`effect`之前对上一个`effect`进行清除
  useEffect(() => {
    console.log('任一 state 更新即执行')
  })

  return (
    <>
      <p>{num}</p>
      <button onClick={() => setNum(num + 1)}>click me</button>
    </>
  )
}

export default Home
```

如果为了性能优化，不需要在每次渲染的时候都执行`effect`，可以添加第二个参数。示例中传入`[num]`，表示当`num`变量更改时才会执行`effect`

```jsx
function Home() {
  const [num, setNum] = useState(0)

  useEffect(() => {
    console.log('num更新了即执行')
    return () => console.log('999')
  }, [num])
}
```

关于第二个参数简言之，

- 无参数，表示每次渲染的时候都执行，即任一 state 更新即执行
- 空数组，表示挂载执行，只执行一次
- 加`[]`并且里面有变量，表示这个变量更改了就执行，初始的时候就执行

如果`effect`返回一个回调函数，React 将会在执行清除操作时调用它，即组件卸载时执行

假设做一个数值自增功能

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [count])

  return <h1>{count}</h1>
}
```

当`count`每次改变时，定时器都重新设定和清除。更好的方案是使用[函数式更新](https://zh-hans.reactjs.org/docs/hooks-reference.html#functional-updates)，如果新的 state 需要通过使用先前的 state 计算得出，那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值。这样`effect`只会执行一次，但是仍能实现自增功能

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return <h1>{count}</h1>
}
```

## useContext

接收一个`context`对象（`React.createContext`的返回值）并返回该`context`的当前值。
当前的`context`值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value`决定。

当组件上层最近的`<MyContext.Provider>`更新时，该`Hook`会触发重渲染，并使用最新传递的值。

```jsx
import React, { useState, createContext, useContext } from 'react'

const numContext = createContext(null)

function Num() {
  // 如果父组件传入了多个值
  // const {num, setNum} = useContext(numContext)
  const getNum = useContext(numContext)
  return <h1>{getNum}</h1>
}

function Home() {
  const [num, setNum] = useState(0)

  return (
    <div className="home">
      <p>Welcome to React~{num}</p>
      <button onClick={() => setNum(num + 1)}>click me</button>
      // 如果要传入多个值就传入一个对象，value={{ num, setNum }}
      <numContext.Provider value={num}>
        <Num />
      </numContext.Provider>
    </div>
  )
}

export default Home
```

## useReducer

`useReducer`是`useState`的替代品。接收一个形如`(state, action) => newState` 的 `reducer`，并返回当前的`state`和`dispatch`方法。
通过`action`的传递，更新复杂逻辑的状态

```jsx
import React, { useReducer } from 'react'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'decrement':
      return { count: state.count + 1 }
    case 'increment':
      return { count: state.count - 1 }
    default:
      return state
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="home">
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: 'decrement' })}>decrement</button>
      <button onClick={() => dispatch({ type: 'increment' })}>increment</button>
    </div>
  )
}

export default Home
```

## useCallback

首先看一个现象，如下，当点击父组件的按钮改变 num 的值，会发现打印出 123，即子组件也跟着更新了，这样会影响性能

```jsx
import React, { useState, useCallback } from 'react'

function Child() {
  console.log(123)
  return <h1>子组件</h1>
}

export default function App() {
  const [num, setNum] = useState(0)

  return (
    <>
      <div>{num}</div>
      <button onClick={() => setNum(num + 1)}>add</button>
      <Child />
    </>
  )
}
```

这时可以使用 memo 在某些情况下避免这种性能损耗，用 memo 方法把子组件包裹起来即可

```js
import React, { useState, memo } from 'react'

const Child = memo(() => {
  console.log(123)
  return <h1>子组件</h1>
})
```

接着上面的例子，如果想让子组件更新父组件的 num，第一种方式把 num 也传给子组件，很明显很繁琐。第二种方式是在父组件中定义改变的方法，子组件调用即可

```jsx
import React, { useState, memo } from 'react'

const Child = memo((props) => {
  console.log(123)
  // 第一种方式
  // return <button onClick={() => props.setNum(props.num + 1)}>add</button>
  // 第二种方式
  return <button onClick={() => props.setNum()}>child</button>
})

export default function App4() {
  const [num, setNum] = useState(0)

  const doSomeThing = () => setNum(num + 1)

  return (
    <>
      <div>{num}</div>
      // 第一种方式
      {/* <Child num={num} setNum={setNum} /> */}
      // 第二种方式
      <Child setNum={doSomeThing} />
    </>
  )
}
```

上面的例子由子组件触发父组件的更新，但是又同时触发了子组件的更新，memo 不管用了。这时就要使用 useCallback

```jsx
import React, { useState, memo, useCallback } from 'react'

const Child = memo((props) => {
  console.log(123)
  return <button onClick={() => props.doSth()}>child</button>
})

export default function App4() {
  const [num, setNum] = useState(0)

  // 注意：useCallback(() => setNum(num + 1), [])
  // setNum(num + 1) 使用新值覆盖初始值，更新一次之后就不再更新了
  // setNum((num) => num + 1) 使用回调函数，不断使用新值覆盖旧值
  const doSomeThing = useCallback(() => setNum((num) => num + 1), [])

  return (
    <>
      <div>{num}</div>
      <Child doSth={doSomeThing} />
    </>
  )
}
```

## useMemo

useMemo 和 useCallback 很类似，需要继续返回一个回调函数

```jsx
import React, { useState, memo, useMemo } from 'react'

const Child = memo((props) => {
  console.log(123)
  return <button onClick={() => props.doSth()}>child</button>
})

export default function App() {
  const [num, setNum] = useState(0)

  const doSomeThing = useMemo(() => {
    return () => setNum((num) => num + 1)
  }, [])

  // const doSomeThing = useCallback(() => setNum((num) => num + 1), [])

  return (
    <>
      <div>{num}</div>
      <Child doSth={doSomeThing} />
    </>
  )
}
```

## useRef

获取 DOM 元素

```jsx
import React, { useState, useRef } from 'react'

export default function App5() {
  const el = useRef(null)
  const [val, setVal] = useState()

  const clickBtn = () => {
    console.log(el)
    setVal(el.current.value)
  }
  return (
    <>
      <h3>input的值：{val}</h3>
      <input ref={el} type="text" />
      <button onClick={clickBtn}>click</button>
    </>
  )
}
```
