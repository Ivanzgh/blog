# Umi

## 查看@umijs/max 包含的值

```tsx
import * as max from '@umijs/max';
console.log(max);
```

## 路由

<https://umijs.org/docs/guides/routes>

### history

<https://umijs.org/docs/api/api#history>

```tsx
import { history } from '@umijs/max';

// 跳转到指定路由
history.push('/list');

// 带参数跳转到指定路由
history.push('/list?id=1', state);

history.push(
  {
    pathname: '/list',
    search: '?a=b&c=d',
    hash: 'anchor'
  },
  {
    some: 'state-data'
  }
);

// 接收参数
const location = useLocation();
console.log(location);

// 跳转当前路径，并刷新 state
history.push({}, state);

// 跳转到上一个路由
history.back();
history.go(-1);
```

### 路由组件参数

[文档地址](https://umijs.org/docs/guides/routes#%E8%B7%AF%E7%94%B1%E7%BB%84%E4%BB%B6%E5%8F%82%E6%95%B0)

#### query 信息

```tsx
// 当前 location /comp?a=b;
const [searchParams, setSearchParams] = useSearchParams();
searchParams.get('a'); // b
searchParams.toString(); // a=b

setSearchParams({ a: 'c', d: 'e' }); // location 变成 /comp?a=c&d=e
```

#### 路由动态参数

```tsx
// 路由配置 /comp/:id
// 当前 location /comp/paramId

const params  = useParams();
// params
{
  "id": "paramId"
}
```

#### location 信息

```tsx
const location  = useLocation();
// location
{
  "pathname": "/path/",
  "search": "",
  "hash": "",
  "state": null,
  "key": "default"
}
```

#### match 信息

```tsx
const match = useMatch('/comp/:id')
// match
{
  "params": {
    "id": "paramId"
  },
  "pathname": "/comp/paramId/",
  "pathnameBase": "/comp/paramId",
  "pattern": {
    "path": "/comp/:id",
    "caseSensitive": false,
    "end": true
  }
}
```
