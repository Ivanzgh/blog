# React-Router

v6 版本

## 配置

```ts
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Page1 from './pages/page1';
import PageNew1 from './pages/page1/new';
import Page2 from './pages/page2';
import Page3 from './pages/page3';

const router = createBrowserRouter([
  {
    path: '/page1',
    element: Page1,
    children: [{ path: '/page1/new', element: PageNew1 }]
  },
  { path: '/page2', element: Page2 },
  { path: '/page3', element: Page3 }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

## 重定向

使用 Navigate 组件

```ts
import { createBrowserRouter, Navigate } from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/page1', element: Page1 },
  { path: '/page2', element: Page2 },
  { path: '/page3', element: Page3 },
  { path: '/', element: <Navigate to="/page1" /> }
]);
```

## 自定义 404 页面

加一个通配符路由，放到最后

```ts
import NoMatch from '@/pages/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: Page1
  },
  {
    path: '*',
    element: <NoMatch />
  }
]);
```

## Outlet

## Link

Link 组件实现路由跳转

```ts
import { Link } from 'react-router-dom';

<Link to="/user">Link to User</Link>;
```

## useNavigate

路由跳转

```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

navigate('/home');
```

## useLocation

```tsx
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  useEffect(() => {
    const route = location.pathname.substring(1);
  }, [location]);
};
export default Header;
```

## useParams、useSearchParams

使用 useParams 获取路由参数，使用 useSearchParams 获取 query 参数

## 动态菜单、动态路由
