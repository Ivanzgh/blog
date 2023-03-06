# Ant Design Pro v5

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
]
```

## 国际化

### 菜单

在 locales 的 zh-CN （中文）的 menu.ts，以及 en-US（英文）的 menu.ts 中增加上面新添加的 Home 页面国际化 key 与值

### 页面

使用 umi 自带的 FormattedMessage 组件，id 就是国际化的 key。还有一种方式是使用 useIntl 钩子函数，可以在方法中使用，更加灵活

```tsx
import { FormattedMessage, useIntl } from '@umijs/max'

function Home() {
  return (
    <div className="home">
      <FormattedMessage id="pages.home.title" defaultMessage="首页标题" />
    </div>
  )
}

export default Home

const UpdateForm = (props) => {
  const intl = useIntl()
  return <h1>{intl.formatMessage({ id: 'pages.home.title', defaultMessage: '首页标题' })}</h1>
}
```
