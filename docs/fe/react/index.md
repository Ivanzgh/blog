# React

## JSX

### 注释

在 JSX 中写注释不能单独使用`//`，需要这么写 `{/* 注释 */}`

### htmlFor

`label`标签不能使用`for`，要用`htmlFor`

```jsx
<label htmlFor="zgh"></label>
```

### 循环遍历

利用原生 js 写法，使用 map 遍历数组，因为 map 有返回值，不能使用 forEach。

在 map() 方法中的元素需要设置 key 属性，key 最好是唯一的字符串，没得选只能用元素索引 index，但是这样做会导致性能变差，还可能引起组件状态的问题

```jsx
function List() {
  const arr = ['a', 'b', 'c']
  return (
    <>
      <ul>
        {arr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  )
}
```

也可以把遍历的逻辑抽离出来

```js
const arr = ['a', 'b', 'c']
function Li() {
  return arr.map((item, index) => <li key={index}>{item}</li>)
}

function List() {
  return (
    <>
      <ul>
        <Li />
      </ul>
    </>
  )
}
```

## css 样式

### className

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

### 外部样式

在组件同级声明 css 文件，然后导入进来 `import "./App.css";`，使用 less 或 sass 都可以

### css in js

## 组件

### 创建组件的方式

创建组件有函数组件和类组件两种方式，React18 之后，全面使用函数组件，类组件会退出历史舞台

```jsx
function Home(props) {
  return <div className="home">Welcome to React~</div>
}

const Home = () => {
  return <div className="home">Welcome to React~</div>
}
```

### 对组件的要求

1. 组件名称必须以**大写字母开头**，否则 React 会将以小写字母开头的组件视为原生 DOM 标签
2. 必须返回可以渲染的元素

- react 元素
- null
- 组件
- 可迭代的对象，包括数组、Set、Map 等

```jsx
function App1() {
  return null
}

function App2() {
  return [1, 2, 3]
}

// 如果直接返回对象，会报错：Uncaught Error: Objects are not valid as a React child
function App3() {
  return { a: 1 }
}
```

那么是否可以说 React 组件不能返回对象？不能，可以返回一个迭代器

```jsx
const obj = { a: 1 }
obj[Symbol.iterator] = function* () {
  for (let prop in obj) {
    yield [prop, obj[prop]]
  }
}

function App() {
  return obj
}
```

### 组件重新渲染的条件

- 自身状态发生变化
- 父组件重新渲染

### 数据

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
})
```

如果要更新 person.artwork.city 的值

```js
setPerson(...person, artwork: { ...person.artwork, city: 'beijing'})
```

更新数组：

添加 `setList([...list, 666])`

删除，需要生成一个不包含该元素的新数组，通常使用 filter 方法

更新，map()

## 事件绑定

1、在调用的时候使用`bind`绑定`this`

```jsx
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

```jsx
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

```jsx
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

```jsx
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

```jsx
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

```jsx
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

```jsx
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

## 组件通信

### 父传子

父组件在子组件上传入属性，子组件通过 props 接收数据

```js
function Child(props) {
  return <h1>{props.num}</h1>
}

export default function Father() {
  return <Child num={123} />
}
```

### 子传父

子组件调用父组件的方法，修改父组件的内容，永远都是父组件自己在修改自己，子组件只是通知父组件

```js
import { useState } from 'react'

function Child(props) {
  return (
    <>
      <h1>{props.num}</h1>
      <button onClick={() => props.changeNum(666)}>change</button>
    </>
  )
}

export default function App() {
  const [msg, setMsg] = useState('你好')

  // 这里的 arg 就是接收子组件传过来的值
  const numChange = (arg) => {
    console.log(arg)
    setMsg(arg)
  }

  return (
    <>
      <h1>{msg}</h1>
      <Child num={123} changeNum={numChange} />
    </>
  )
}
```

在父组件里也可以直接把 setMsg 方法传给子组件，避免多声明一个函数

```js
// 父组件
<Child num={123} setMsg={setMsg} />

// 子组件
<button onClick={() => props.setMsg(666)}>change</button>
```

### 通信总结

简单理解，把父子组件看成两个函数，子组件接收的 props 就是一个函数参数，父组件可以把它的 state 作为 props 向下传递到它的子组件中，这样在子组件里就能接收父组件的数据。子组件如何向父组件传值呢？父组件将一个函数传给子组件，子组件调用这个函数，将自己的数据当作参数传递给该函数，那么父组件就能接收子组件的数据了，其实就是闭包

```js
function f1() {
  const num = 0
  const fn = (msg) => {
    console.log(msg)
  }
  const props = { num, fn }

  f2(props)
}

function f2(props) {
  const num = 1
  props.fn(num + props.num)
}

f1()
```

## 渲染原理
