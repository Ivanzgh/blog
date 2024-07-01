# React

- [官网](https://react.dev)
- [github](https://github.com/facebook/react)

- [React 19 beat 测试版](https://react.dev/blog/2024/04/25/react-19)
- [React 19 Beta 升级指南](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)

## 虚拟 DOM

虚拟 DOM（Virtual DOM），是实际 DOM 的轻量级副本，保存在内存中。当数据发生变化时，React 会比较前后的虚拟 DOM，然后更新实际 DOM。

## Diff 算法

## 最小化更新

找出差异后，react 会计算出需要更新的最小操作集，只更新实际 DOM 中变化的部分，而不是重绘整个页面。

## 批量更新

react 会批量处理多次状态更新，而不是每次状态变化就立即更新 DOM，避免频繁的更新渲染。

## 优先级调度

react 使用优先级调度机制，确保高优先级的更新优先执行。

比如「用户输入」比「网络请求后的渲染」优先级更高，会优先执行。

## Fiber 架构

## 结合 TS 使用

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

##
