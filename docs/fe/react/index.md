# React

## JSX

### 注释

在 JSX 中写注释不能单独使用`//`，需要这么写 `{/* 注释 */}`

### className

为了防止和 js 中的`class`类名冲突，需要将`class`写成`className`

```jsx
<input className="input" />
```

### htmlFor

`label`标签不能使用`for`，要用`htmlFor`

```jsx
<label htmlFor="zgh"></label>
```

## 创建组件的方式

创建组件有函数组件和 class 组件两种方式，效果等同，但是推荐使用函数组件。

所有 React 组件都必须像纯函数一样保护它们的`props`不被更改。

### 函数式

```jsx
function Home(props) {
  return <div className="home">Welcome to React~</div>
}
```

### class

```jsx
class Home extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className="home">Welcome to React~</div>
  }
}
```

::: warning
组件名称必须以大写字母开头
:::

## 事件绑定

1、在调用的时候使用`bind`绑定`this`

```jsx harmony
class Order extends React.Component {
  handleSearch() {
    console.log(this.props)
  }

  render() {
    return (
      <Button htmlType="button" onClick={this.handleSearch.bind(this)}>
        重置
      </Button>
    )
  }
}
```

2、在构造器中使用`bind`绑定`this`

```jsx harmony
class Order extends React.Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
  }
  handleSearch() {
    console.log(this.props)
  }

  render() {
    return (
      <Button htmlType="button" onClick={this.handleSearch}>
        重置
      </Button>
    )
  }
}
```

3、在箭头函数中绑定 this

```jsx harmony
class Order extends React.Component {
  handleSearch() {
    console.log(this.props)
  }

  render() {
    return (
      <Button htmlType="button" onClick={() => this.handleSearch()}>
        重置
      </Button>
    )
  }
}
```

4、`public class fields` 语法

```jsx harmony
class Order extends React.Component {
  handleSearch = () => {
    console.log(this.props)
  }

  render() {
    return (
      <Button htmlType="button" onClick={this.handleSearch}>
        重置
      </Button>
    )
  }
}
```

推荐使用第 4 种方式绑定事件

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
    )
  }
}
```

有一个父组件使用了`<Columns />`

```jsx harmony
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    )
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

```jsx harmony
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    )
  }
}
```

也可以使用一种短语法，像空标签一样

```jsx harmony
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    )
  }
}
```

## Hook

`Hook`是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。

### Hook 规则

只在 React 函数最顶层使用 Hook

不要在循环，条件或嵌套函数中调用 Hook

只在 React 函数中调用 Hook

不要在普通的 js 函数中调用 Hook。可以在 React 的函数组件中调用 Hook，或者在自定义 Hook 中调用其他 Hook

### useState

`useState`就是一个 Hook，类似`class`组件的`this.setState`，`useState()`方法里面唯一的参数就是初始`state`，
返回值为当前`state`以及更新`state`的函数

使用`Hook`实现点击按钮数值增加

```jsx
import React, { useState } from 'react'

function Home() {
  const [num, setNum] = useState(0) // 定义一个num变量，初始值是0，setNum是更新num的函数
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
    this.state = {
      num: 0
    }
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

### useEffect

`useEffect` Hook 是执行副作用操作的，可以将其看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

`effect`在每次渲染的时候都会执行，React 会在执行当前`effect`之前对上一个`effect`进行清除

```jsx
import React, { useState, useEffect } from 'react'

function Home() {
  const [num, setNum] = useState(0)

  useEffect(() => {
    document.title = num
    console.log('666')
    return () => console.log('999')
  })

  return (
    <div className="home">
      <p>Welcome to React~{num}</p>
      <button onClick={() => setNum(num + 1)}>click me</button>
    </div>
  )
}

export default Home
```

React 会在组件卸载的时候执行清除操作。如果`effect`返回一个函数，React 将会在执行清除操作时调用它

如果为了性能优化，不需要在每次渲染的时候都执行`effect`，可以添加第二个参数，
示例中传入`[num]`，表示当`num`变量更改时才会执行`effect`

```jsx
function Home() {
  const [num, setNum] = useState(0)

  useEffect(() => {
    document.title = num
    console.log('666')
    return () => console.log('999')
  }, [num])
}
```

简言之，如果不加第二个参数，那么每次渲染的时候都执行`effect`；加`[]`只在第一次执行；
加`[]`并且里面有变量，表示这个变量更改了就执行

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

当`count`每次改变时，定时器都重新设定和清除。更好的方案是使用**函数式更新**
<https://zh-hans.reactjs.org/docs/hooks-reference.html#functional-updates>，
这样`effect`只会执行一次，但是仍能实现自增功能

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return <h1>{count}</h1>
}
```

### useContext

接收一个`context`对象（`React.createContext`的返回值）并返回该`context`的当前值。
当前的`context`值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value`决定。

当组件上层最近的`<MyContext.Provider>`更新时，该`Hook`会触发重渲染，并使用最新传递的值。

```jsx
import React, { useState, createContext, useContext } from 'react'

const numContext = createContext(null)

function Num() {
  const getNum = useContext(numContext)
  return <h1>{getNum}</h1>
}

function Home() {
  const [num, setNum] = useState(0)

  return (
    <div className="home">
      <p>Welcome to React~{num}</p>
      <button onClick={() => setNum(num + 1)}>click me</button>

      <numContext.Provider value={num}>
        <Num />
      </numContext.Provider>
    </div>
  )
}

export default Home
```

### useReducer

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

### useMemo

### useCallback

### useRef

获取 DOM 元素
