# 事件机制

## 事件绑定

### 函数组件绑定事件

```jsx
function App() {
  const handleClick = () => {
    console.log('hello world');
  };
  return <div onClick={handleClick}>click</div>;
}

export default App;
```

### 事件传参

1. 使用箭头函数，推荐
2. 高阶函数

```js
function Bar() {
  const handleClick = (num) => {
    console.log(num);
  };
  return <div onClick={() => handleClick(123)}>click</div>;
}

function Foo() {
  const handleClick = (num) => {
    return () => {
      console.log(num);
    };
  };
  return <div onClick={handleClick(123)}>click</div>;
}
```

### 类组件绑定事件

1、在调用的时候使用`bind`绑定`this`

```jsx
class Order extends React.Component {
  handleSearch() {
    console.log(this.props);
  }

  render() {
    return (
      <Button htmlType="button" onClick={this.handleSearch.bind(this)}>
        重置
      </Button>
    );
  }
}
```

2、在构造器中使用`bind`绑定`this`

```jsx
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch() {
    console.log(this.props);
  }

  render() {
    return (
      <Button htmlType="button" onClick={this.handleSearch}>
        重置
      </Button>
    );
  }
}
```

3、在箭头函数中绑定 this

```jsx
class Order extends React.Component {
  handleSearch() {
    console.log(this.props);
  }

  render() {
    return (
      <Button htmlType="button" onClick={() => this.handleSearch()}>
        重置
      </Button>
    );
  }
}
```

4、`public class fields` 语法

```jsx
class Order extends React.Component {
  handleSearch = () => {
    console.log(this.props);
  };

  render() {
    return (
      <Button htmlType="button" onClick={this.handleSearch}>
        重置
      </Button>
    );
  }
}
```

推荐使用第 4 种方式绑定事件
