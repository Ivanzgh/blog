# 基础

## 动态匹配

比如有一个列表页 `/list`，进入详情页都要使用同一个组件

```js
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: detail }
  ]
})
```

这样`/list/1`、`/list/2`都会匹配到同一个组件

### 404路由

含有通配符的路由一定要放在最后

```js
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'adminLayout',
            component: () => import('@/admin/layout')
        },
        {
            path: '/404',
            component: () => import('@/views/404')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
export default router
```

## 嵌套路由

```js
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/admin',
            name: 'adminLayout',
            component: () => import('@/admin/layout'),
            redirect: '/admin/ecs',
            children: [
                {
                    path: 'ecs',
                    name: 'ECS',
                    component: () => import('@/admin/ecs')
                },
                {
                    path: 'oss',
                    name: 'OSS',
                    component: () => import('@/admin/oss')
                }
            ]
        }
    ]
});
export default router
```

**以 `/` 开头的嵌套路径会被当作根路径**，所以children中的路径不用设置成 `path: '/admin/ecs'`，
直接设置成 `path: 'ecs'`即可，不要加`/`。但是路由重定向时要写完整 `redirect: '/admin/ecs'`

## 编程式导航

在 Vue 实例内部，可以通过 $router 访问路由实例。

### `router.push()`

 `this.$router.push(...)` 这种方式会向history栈中添加一个新的记录，当点击浏览器后退按钮时，会回到上一个url。
类似于`window.history.pushState()`
**声明式导航 `<router-link :to="...">`会创建a标签来定义导航链接**。它会在内部调用`router.push`方法

参数可以是字符串路径或者地址对象

```js
this.$router.push('/admin/ecs');
```

#### 路由传参

方式一、query

```js
// 传参
this.$router.push({ path: '/admin/ecs',query: { id: 1 }});

// 取值
this.$route.query.id
```

使用这种方式，参数会拼接在路由后面，出现在地址栏

方式二、params

```js
this.$router.push({ name: 'ECS', params: { id: 1 }});

// 取值
this.$route.params.id
```

使用这种方式，参数不会拼接在路由后面，地址栏上看不到参数

由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。
需要用name来指定页面，即通过路由配置的name属性访问

如果需要传递多个参数，如下所示：

```js
this.$router.push({
  name:'second',
  params: {
    id:'20180822',
    name: 'query'
  }
});

//params接收参数
this.id = this.$route.params.id ;
this.name = this.$route.params.name ;

//路由
{
    path: '/second/:id/:name',
    name: 'second',
    component: () => import('@/view/second')
}
```

如果路由后面没有 `/:id/:name`，刷新页面后会发现页面失败

### `router.replace()`

不会向history栈中添加记录，而是会替换当前的history记录，类似`window.history.replaceState()`

```js
this.$router.replace('/admin/ecs');
```

声明式 `<router-link :to="..." replace>`

### `router.go(n)`

在 history 记录中向前或者后退多少步，类似`window.history.go(n)`

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

router.back()
router.forward()
```

## 路由组件传参

比如从列表页进入详情页，需要携带id参数

路由配置

```js
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true }
  ]
})
```

如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性

详情页使用 `props: ['id']`接收参数

```js
export default {
    props: ['id'],
    data() {
        return {
            tableLoading: false
        }
    }
}
```

在组件中使用 `$route` 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。
不推荐使用`this.$route.params.id`获取参数。

推荐使用 `props` 将组件和路由解耦

## 路由模式

vue-router默认是hash模式，这种模式会在路径中带一个`#`号。如果不想要#号可以用history模式，配置如下：

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

history模式需要后端支持，比如在nginx中需要添加如下配置，否则刷新页面就会报404错误

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## 导航守卫

“导航”表示路由正在发生改变。守卫是异步解析执行，此时导航在所有守卫`resolve`完之前一直处于**等待中**。

### 全局前置守卫

使用 `router.beforeEach` 注册一个全局守卫

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

+ to 即将要进入的目标
+ from 当前导航正要离开的路由
+ next 函数，进行管道中的下一个钩子

比如要做路由拦截，用户没登录不让访问控制台

```js
import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'adminLayout',
            meta: {
                requireAuth: true
            },
            component: () => import('@/admin/layout'),
            redirect: '/admin/ecs',
            children: []
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {
        if (sessionStorage.getItem('access_token')) {
            NProgress.start()
            next();
        } else {
            next({ path: '/login' })
        }
    } else {
        NProgress.start()
        next();
    }
})
router.afterEach(() => {
    NProgress.done()
})
```

此处的nprogress是一个可以显示路由加载进度动画的插件，可忽略。

`to` 、`from`均表示[路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)，
路由对象有一个`matched`属性，是一个数组，包含当前路由的所有嵌套路径片段的路由记录。

some()是数组方法，表示一些，只要数组中的某一个元素符合指定的条件，就会返回true，否则返回false。

所以整体思路是先做一个路由全局前置守卫，若即将要进入的目标需要鉴权且`sessionStorage`中有登录时存的token，
则跳转到目标页，否则跳转到登录页。

### 全局后置钩子

不接受`next`函数，也不会改变导航本身。

在上个例子中可以用来关闭加载动画

```js
router.afterEach((to, from) => {
    NProgress.done()
})
```

### 路由独有的守卫

`beforeEnter`守卫，区别于全局守卫，这个只对单个路由有效

```js
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
             beforeEnter: (to, from, next) => {
                // ...
            }
        }
    ]
})
```

### 组件内的守卫

可以直接在组件内定义导航守卫

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不能获取组件实例 `this` ，因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

在`beforeRouteEnter`中不能获取实例，但可以通过传一个回调给`next`来访问组件实例

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

## 路由元信息

在定义路由的时候可以配置 `meta` 字段，里边的就是元信息

```js
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'adminLayout',
            meta: {
                requireAuth: true
            },
            component: () => import('@/admin/layout')
        }
    ]
});
```

一个路由匹配到的所有路由记录会暴露为`$route`对象 (还有在导航守卫中的路由对象) 的 `$route.matched` 数组。
因此，我们需要遍历 `$route.matched` 来检查路由记录中的 meta 字段。如上面路由拦截例子里的`to.matched.some(res => res.meta.requireAuth)`

## 路由懒加载

结合 `Vue` 的异步组件和 `Webpack` 的代码分割功能，轻松实现路由组件的懒加载。

```js
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'adminLayout',
            component: () => import('@/admin/layout')
        }
    ]
});
```

### 把组件按组分块

把某个路由下的所有组件都打包在同个异步块 (chunk) 中

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

## 滚动行为

切换路由时，控制页面的滚动位置。

```js
const router = new VueRouter({
    routes: [...],
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 }
    }
})
```

## 动态路由

方式大致有两种：

1、前端控制，即前端写好路由表，根据用户的角色权限动态展示不同的路由

2、后端控制，即后端传来当前用户权限的路由表，前端再渲染

一般采用更多的是第2种方式，第1种方式可参考[https://segmentfault.com/a/1190000009506097](https://segmentfault.com/a/1190000009506097)

```js
router.addRoutes(routes: Array<RouteConfig>)
```

动态添加更多的路由规则。参数必须是一个符合 `routes` 选项要求的数组。
