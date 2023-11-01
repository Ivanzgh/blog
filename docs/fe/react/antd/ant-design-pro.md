# Ant Design Pro

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

刷新 initialState

```tsx
const { refresh } = useModel('@@initialState');

refresh();
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

## 权限控制

Umi 权限控制：[https://umijs.org/docs/max/access](https://umijs.org/docs/max/access)

### 菜单权限

### 按钮权限

#### Access 组件

```tsx
import { Access, useAccess } from '@umijs/max';

const TableList = () => {
  const access = useAccess();

  return (
    <Access accessible={access.hasPerms('system:user:add')} fallback={<div>Can not read</div>}>
      <a
        onClick={() => {
          console.log(123);
        }}
      >
        click
      </a>
    </Access>
  );
};

export default TableList;
```

#### hidden 属性

```tsx
<a
  hidden={!access.hasPerms('system:user:edit')}
  onClick={() => {
    console.log(123);
  }}
>
  click
</a>
```

这种方式不推荐，虽然也能在无权限时起到隐藏按钮的作用，但是会在 DOM 中存在

### 核心实现

`src/access.ts`

```tsx
/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

import { checkRole, matchPermission } from './utils/permission';

export default function access(initialState: { currentUser?: System.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  const hasPerms = (perm: string) => {
    return matchPermission(initialState?.currentUser?.permissions, perm);
  };
  const roleFiler = (route: { authority: string[] }) => {
    return checkRole(initialState?.currentUser?.roles, route.authority);
  };
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    hasPerms,
    roleFiler
  };
}
```

`src/utils/permission.ts`

```tsx
// /**
//  * 字符权限校验
//  * @param {Array} value 校验值
//  * @returns {Boolean}
//  */
export function matchPerms(permissions: string[], value: string[]) {
  if (value && value instanceof Array && value.length > 0) {
    const permissionDatas = value;
    const all_permission = '*:*:*';
    const hasPermission = permissions.some((permission) => {
      return all_permission === permission || permissionDatas.includes(permission);
    });
    if (!hasPermission) {
      return false;
    }
    return true;
  }
  console.error(`need roles! Like checkPermi="['system:user:add','system:user:edit']"`);
  return false;
}

export function matchPerm(permissions: string[], value: string) {
  if (value && value.length > 0) {
    const permissionDatas = value;
    const all_permission = '*:*:*';
    const hasPermission = permissions.some((permission) => {
      return all_permission === permission || permissionDatas === permission;
    });
    if (!hasPermission) {
      return false;
    }
    return true;
  }
  console.error(`need roles! Like checkPermi="['system:user:add','system:user:edit']"`);
  return false;
}

export function matchPermission(permissions: string[] | undefined, value: any): boolean {
  if (permissions === undefined) return false;
  const type = typeof value;
  if (type === 'string') {
    return matchPerm(permissions, value);
  }
  return matchPerms(permissions, value);
}

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
interface roleProps {
  roleCode: string;
  roleId: number;
  roleName: string;
  permissions?: any;
}
export function checkRole(roles: roleProps[] | undefined, value: string[]) {
  if (roles && value && value.length > 0) {
    for (let i = 0; i < roles?.length; i++) {
      for (let j = 0; j < value?.length; j++) {
        if (value[j] === roles[i].roleCode) {
          return true;
        }
      }
    }
  }
  console.error(`need roles! Like checkRole="['admin','editor']"`);
  return false;
}
```

## 自定义 logo

`config/defaultSettings.ts`

```tsx
import { ProLayoutProps } from '@ant-design/pro-components';

const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '标题',
  pwa: true,
  // logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  token: {}
};

export default Settings;
```

如果要使用在线 logo，直接在这里给 logo 赋值就行

如果要使用本地图片，需要将`config/defaultSettings.ts`的 logo 字段注释掉，并在`src/app.tsx`配置`RunTimeLayoutConfig`

```tsx
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => ({
  logo: 'logo.png'
});
```
