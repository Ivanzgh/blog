# 渲染原理

```jsx
function App() {
  let count = 0;
  const handleAdd = () => {
    count++;
    console.log(count);
  };
  return (
    <>
      <div>count: {count}</div>
      <button onClick={handleAdd}>add</button>
    </>
  );
}
```

点击按钮， count 的值在控制台看到会变，但是在页面上不会变化。即点击事件可以触发，但是没有重新执行 return。组件其实是函数，函数在第一次执行时已经执行 return 了，想要重新渲染就需要重新执行 JSX，所以就需要重新执行函数。

使用 useState 能重新触发函数组件，符合预期。每次点击按钮时，都能看到打印出 123，说明函数重新执行了。

```jsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const handleAdd = () => {
    setCount(count + 1);
    console.log(count);
  };
  console.log(123);
  return (
    <>
      <div>count: {count}</div>
      <button onClick={handleAdd}>add</button>
    </>
  );
}

export default App;
```

Q：既然函数重新执行了，那为什么每次 count 的值都不是 0 呢？

A：state 状态具备组件的记忆，能记住上次的值
