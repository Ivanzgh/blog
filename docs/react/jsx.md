# JSX

## 注释

在 JSX 中写注释不能单独使用`//`，需要这么写 `{/* 注释 */}`

## htmlFor

`label`标签不能使用`for`，要用`htmlFor`

```jsx
<label htmlFor="zgh"></label>
```

## className

为了防止和 js 中的`class`类名冲突，需要将`class`写成`className`，小驼峰命名

```jsx
<input className="input" />
```

## 循环遍历

JSX 中默认对数组进行 join() 操作，如下代码会在页面上显示“abc”

```jsx
function List() {
  const arr = ['a', 'b', 'c'];
  return <div>{arr}</div>;
}
```

利用原生 js 写法，使用 map 遍历数组，因为 map 有返回值，不能使用 forEach。

在 map() 方法中的元素需要设置 key 属性，key 最好是唯一的字符串，没得选只能用元素索引 index，但是这样做会导致性能变差，还可能引起组件状态的问题

```jsx
function List() {
  const arr = ['a', 'b', 'c'];
  return (
    <>
      <ul>
        {arr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}
```

也可以把遍历的逻辑抽离出来

```js
const arr = ['a', 'b', 'c'];
function Li() {
  return arr.map((item, index) => <li key={index}>{item}</li>);
}

function List() {
  return (
    <>
      <ul>
        <Li />
      </ul>
    </>
  );
}
```

## 条件判断

1. 条件语句：if、switch
2. 三元运算符
3. 逻辑运算符：&&、||、!

注意：`{0 && <div>react</div>}`会渲染出 0

在 JSX 的大括号中不会渲染的值：布尔值、空字符、null、undefined、对象、函数

## 原理

Babel 编译，[@babel/plugin-transform-react-jsx](https://babeljs.io/docs/babel-plugin-transform-react-jsx)
