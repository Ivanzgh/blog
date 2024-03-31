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
