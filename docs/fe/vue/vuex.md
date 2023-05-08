# vuex

## 核心

### state

负责状态管理，类似于 vue 中的 data，用于初始化数据

### mutation

用于修改 state 中的数据，通过 commit 触发

### action

可以处理异步，通过 dispatch 触发，不能直接修改 state ，首先在组件中通过 dispatch 触发 action，然后在 action 函数内部 commit 触发 mutation，通过 mutation 修改 state 状态值

### getter

Vuex 中的计算属性，相当于 vue 中的 computed。依赖于 state 状态值，状态值一旦改变，getter 会重新计算

### module

模块化管理

## 单独使用

```js
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USERINFO(state, payload) {
      state.userInfo = payload;
    }
  },
  actions: {},
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => sessionStorage.getItem(key),
        setItem: (key, value) => sessionStorage.setItem(key, value),
        removeItem: (key) => sessionStorage.removeItem(key)
      }
    })
  ]
});

export default store;
```

`vuex-persistedstate`插件是持久化 vuex 里的数据，防止页面刷新后数据丢失

```js
// 存储数据
this.$store.commit('SET_USERINFO', userinfo);

// 使用数据
this.$store.state.userInfo;
```

## 分模块使用

index.js

```js
import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);
const store = new Vuex.Store({ modules });

export default store;
```

`modules`文件夹下有`index.js`、`account.js`、`setting.js`等模块，

index.js

```js
import account from './account';
import setting from './setting';

export default { account, setting };
```

account.js

```js
export default {
  namespaced: true, // 命名空间
  state: {
    user: undefined
  },
  getters: {
    user: (state) => {
      if (!state.user) {
        try {
          const user = localStorage.getItem(process.env.VUE_APP_USER_KEY);
          state.user = JSON.parse(user);
        } catch (e) {
          console.error(e);
        }
      }
      return state.user;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(user));
    }
  }
};
```

在组件中使用，

```vue
<script>
import { mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations('account', ['setUser']), // account表示模块命名空间，后面数组表示mutations里的方法

    init() {
      this.setUser({ name: 'zgh', age: 23 });

      // 或者使用如下的方式
      this.$store.commit('account/setUser', { name: 'zgh', age: 23 });
    }
  }
};
</script>
```

## 监听变化

先在`computed`中拿到值，然后在`watch`中监听即可

```vue
computed: { refreshData() { return this.$store.state.ship.shipFocus } }, watch: { refreshData(v) { if (v) {
this.getData() } } }
```
