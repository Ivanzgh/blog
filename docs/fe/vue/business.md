# 业务

## 复用组件

进入详情页，使用`props`将组件和路由解耦：加上 `props: true`

```js
{
    path: '/admin/ecs/:id',
    name: 'ecs_detail',
    meta: {activeMenu: '/admin/ecs'},
    component: () => import('@/admin/ecs/detailPage'),
    props: true
}
```

组件中使用：

```js
export default {
  props: ['id'],
  methods: {
    getId() {
      if (this.id) {
        this.ecs_id = this.id
      }
    }
  }
}
```

还有一种方式可获取路由参数 `this.$route.params.id`

### 如果不同路由使用同一个组件需要重新加载这个组件

组件复用时，虽然路由变化了，但是组件并没有被销毁，此时生命周期函数不会被调用，所以视图是不会更新的。

```js
{
    path: '/admin/es',
    meta: {appId: 'app-WnVLDZGgQ0Mr'},
    component: () => import('@/components/AppDeploy')
},
{
    path: '/admin/oss',
    meta: {appId: 'app-RErkpzXGl4mZ'},
    component: () => import('@/components/AppDeploy')
}
```

方法一、监听`$route`的变化来初始化数据

```js
watch: {
    $route(to) {
        if (to.meta.appId) {
            this.app_id = to.meta.appId
            this.getAppInfo()
        }
    }
}
```

方法二、给`router-view`添加一个唯一的`key`，可直接设置为路由的完整路径

```html
<router-view :key="$route.fullPath"></router-view>
```

只要 url 变化了，就一定会重新创建这个组件。
