# Ant Design Pro v5

## 初始化时依赖包报错

配置 tsconfig.json

```json
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": false
  }
}
```

## 添加路由

在`config/routes.ts`下配置，比如添加 home 路由，先在`src/pages`下新建 Home.tsx 路由组件

```js
export default [
  {
    path: '/home',
    name: 'home',
    icon: 'home',
    component: './Home'
  }
];
```

## model

<https://pro.ant.design/zh-CN/docs/simple-model>

新建`src/models`目录

使用：

1. 如果只是简单地获取值，比如有一个`src/models/user.ts`，默认导出 user，则使用方式：`<div>{useModel('user')}</div>`
2. 如果想使用暴露出的一部分方法去更改状态值，可以添加第二个参数，是一个函数

建立一个 counter.ts 文件

```ts
import { useState, useCallback } from 'react';

export default () => {
  const [counter, setCounter] = useState(0);
  const increment = useCallback(() => setCounter((c) => c + 1), []);
  const decrement = useCallback(() => setCounter((c) => c - 1), []);
  return { counter, increment, decrement };
};
```

```tsx
import { useModel } from '@umijs/max';

export default const App = () => {
  const { add, minus } = useModel('counter', (ret) => ({
    add: ret.increment,
    minus: ret.decrement
  }));

  return (
    <div>
      <button type="button" onClick={add}>
        add by 1
      </button>
      <button type="button" onClick={minus}>
        minus by 1
      </button>
    </div>
  );
}
```

3. 在 app.tsx 中，有一个 getInitialState 方法，可以初始化全局状态

<https://pro.ant.design/zh-CN/docs/initial-state>

```tsx
import { useModel } from '@umijs/max';

const { initialState } = useModel('@@initialState');

return <h1>{initialState?.title}</h1>;
```

## 国际化

<https://umijs.org/docs/max/i18n>

### 菜单

在 locales 的 zh-CN （中文）的 menu.ts，以及 en-US（英文）的 menu.ts 中增加上面新添加的 Home 页面国际化 key 与值

### 页面

使用 umi 自带的 FormattedMessage 组件，id 就是国际化的 key。还有一种方式是使用 useIntl 钩子函数，可以在方法中使用，更加灵活

```tsx
import { FormattedMessage, useIntl } from '@umijs/max';

function Home() {
  return (
    <div className="home">
      <FormattedMessage id="pages.home.title" />
    </div>
  );
}

export default Home;

const UpdateForm = (props) => {
  const intl = useIntl();
  return <h1>{intl.formatMessage({ id: 'pages.home.title' })}</h1>;
};
```

## 开发规范

1. 所有路由组件（会配置在路由配置中的组件）以大驼峰命名打平到 pages 下面第一级。不建议在路由组件内部再嵌套路由组件

## 踩坑记录

### 安装 @ant-design/charts 报错

如果按照官方文档安装主包，会因为 antd 的版本问题报错，相关 [Issue](https://github.com/ant-design/ant-design-charts/issues/1689)。安装对应的子包即可。常用子包如下：

- 统计图表：`@ant-design/plots`
- 地图：`@ant-design/maps`
- 流程图：`@ant-design/flowchart`
- 关系图：`@ant-design/graphs`

```sh
# 不推荐的安装方式
npm install @ant-design/charts --save

# 推荐的安装方式
npm install @ant-design/plots -S
```
