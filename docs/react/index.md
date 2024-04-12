# React

github：<https://github.com/facebook/react>

## 结合 TypeScript

### React.FC

不推荐写 React.FC

[参考](https://github.com/facebook/create-react-app/pull/8177)

```js
type Props = {
  name?: string,
  age?: number
};

// 不推荐
const App: React.FC<Props> = (props) => {};

// 推荐
const App = (props: Props) => {};
```

### 通过 vite 创建的 react 项目里，ReactDOM.createRoot(document.getElementById('root')!)，这里最后的 ! 的作用是什么

`!` 的作用：为了告诉 ts 编译器：`document.getElementById('root')` 不会是 `null`，请不要对此产生类型错误警告。

在 TypeScript 中，`!` 后缀运算符被称为**非空断言操作符**。当应用于表达式时，它告诉编译器：“我确信这个表达式的值在这个上下文中不会是 `null` 或 `undefined`”。

在 `ReactDOM.createRoot(document.getElementById('root')!)` 这行代码中，`document.getElementById('root')` 返回的是 `HTMLElement | null` 类型，因为 DOM API 可能找不到与给定 ID 匹配的元素，此时会返回 `null`。然而，在实际应用中，通常有一个 id 为 `root` 的 HTML 元素用于挂载 React 应用，所以“断言”这里不可能是 `null`。

加上 `!` 后，ts 编译器会忽略对这一表达式可能为 `null` 或 `undefined` 的检查，并假设它始终是一个非空的 `HTMLElement` 类型实例，这样就可以安全地调用 `.createRoot()` 方法。
