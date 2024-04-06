# Zustand

- 文档：<https://docs.pmnd.rs/zustand/getting-started/introduction>

```sh
pnpm add zustand
```

## 快速上手

在 src 目录下创建 stores 目录，并创建 3 个文件：

::: code-group

```ts [index.ts]
export { default as useAccountStore } from './account';
export { default as useGlobalStore } from './global';
```

```ts [account.ts]
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserProps = Record<'userName' | 'avatar', string>;

interface LoginState {
  userInfo: UserProps;
  setUserInfo: (info: UserProps) => void;
}

const useAccountStore = create<LoginState>()(
  persist(
    (set) => ({
      userInfo: {
        userName: '',
        avatar: ''
      },
      setUserInfo: (info) => set(() => ({ userInfo: info }))
    }),
    {
      name: 'account'
    }
  )
);

export default useAccountStore;
```

```ts [global.ts]
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface globalState {
  isShowAll: boolean;
  toggleShowAll: () => void;
}

const useGlobalStore = create<globalState>()(
  persist(
    (set) => ({
      isShowAll: true,
      toggleShowAll: () => set((state) => ({ isShowAll: !state.isShowAll }))
      // setIsFullScreen: (dictCode) => set((state) => ({ dictInfo: { ...state.dictInfo, dictCode } })),
      // removeAllHeaderTitle: () => set({ headerTitle: [] })
    }),
    {
      name: 'global'
    }
  )
);

export default useGlobalStore;
```

:::

使用示例，在 `login.tsx` 中调用 setUserInfo 设置用户信息，在 `Header.tsx` 中获取用户信息。

::: code-group

```tsx [login.tsx]
import { useAccountStore } from '@/stores';

const Login = () => {
  const setUserInfo = useAccountStore((state) => state.setUserInfo);

  const handleLogin = () => {
    const user = {
      userName: 'admin',
      avatar: 'xxx'
    };
    setUserInfo(user);
  };

  return <button onClick={handleLogin}>login</button>;
};

export default Login;
```

```ts [Header.tsx]
import { useAccountStore } from '@/stores';

const Header = () => {
  const userInfo = useAccountStore((state) => state.userInfo);

  return <div>{userInfo.userName}</div>;
};

export default Header;
```

:::

> `import { persist } from 'zustand/middleware'`用于持久化缓存
