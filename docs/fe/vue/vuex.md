# vuex

## 单独使用

```js
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userInfo: {}
  },
  mutations: {
    SET_USERINFO(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {},
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => sessionStorage.getItem(key),
        setItem: (key, value) => sessionStorage.setItem(key, value),
        removeItem: key => sessionStorage.removeItem(key)
      }
    })
  ]
})

export default store
```

`vuex-persistedstate`插件是持久化 vuex 里的数据，防止页面刷新后数据丢失

```js
// 存储数据
this.$store.commit('SET_USERINFO', userinfo)

// 使用数据
this.$store.state.userInfo
```

## 分模块使用

index.js

```js
import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

Vue.use(Vuex)
const store = new Vuex.Store({ modules })

export default store
```

`modules`文件夹下有`index.js`、`account.js`、`setting.js`等模块，

index.js

```js
import account from './account'
import setting from './setting'

export default { account, setting }
```

account.js

```js
export default {
  namespaced: true, // 命名空间
  state: {
    user: undefined
  },
  getters: {
    user: state => {
      if (!state.user) {
        try {
          const user = localStorage.getItem(process.env.VUE_APP_USER_KEY)
          state.user = JSON.parse(user)
        } catch (e) {
          console.error(e)
        }
      }
      return state.user
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(user))
    }
  }
}
```

在组件中使用，

```vue
<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations('account', ['setUser'])  // account表示模块命名空间，后面数组表示mutations里的方法

    init() {
      this.setUser({ name: 'zgh', age: 23 })

      // 或者使用如下的方式
      this.$store.commit('account/setUser', { name: 'zgh', age: 23 })
    }
  }
}
</script>
```

## 监听变化

先在`computed`中拿到值，然后在`watch`中监听即可

```vue
 computed: {
    refreshData() {
      return this.$store.state.ship.shipFocus
    }
  },
  watch: {
    refreshData(v) {
      if (v) {
        this.getData()
      }
    }
  }
```
