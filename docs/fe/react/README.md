# react

## 创建组件的方式

### 函数式

### class

## 事件绑定
1、在调用的时候使用`bind`绑定`this`
```jsx harmony
class Order extends React.Component {
    handleSearch() {
        console.log(this.props);
    };

    render() {
        return (
            <Button htmlType="button" onClick={this.handleSearch.bind(this)}>重置</Button>
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
        console.log(this.props);
    };

    render() {
        return (
            <Button htmlType="button" onClick={this.handleSearch}>重置</Button>
        )
    }
}
```
3、在箭头函数中绑定this
```jsx harmony
class Order extends React.Component {
    handleSearch() {
        console.log(this.props);
    };

    render() {
        return (
            <Button htmlType="button" onClick={() => this.handleSearch()}>重置</Button>
        )
    }
}
```
4、`public class fields` 语法
```jsx harmony
class Order extends React.Component {
    handleSearch = () => {
        console.log(this.props);
    };

    render() {
        return (
            <Button htmlType="button" onClick={this.handleSearch}>重置</Button>
        )
    }
}
```
推荐使用第4种方式绑定事件

## Fragments
简单说就是避免向DOM中添加额外的节点

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
```jsx harmony
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
结果如下，在tr和td之间多了一个div节点，这样就导致了html是无效的
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
    );
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
    );
  }
}
```
