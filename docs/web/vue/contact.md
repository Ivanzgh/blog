# 组件通信

## 父向子传值
先定义一个子组件，在组件中注册props
```vue
<template>
    <div>
        <div>{{message}}(子组件)</div>
    </div>
</template>
<script>
export default {
    props: {
        message: String  //定义传值的类型<br>    
    }
}
</script>
<style>
</style>
```

在父组件中，引入子组件，并传入子组件内需要的值
```vue
<template>
    <div>
        <div>父组件</div>
        <child :message="parentMsg"></child>  
    </div>
</template>
 
<script>
 
import child from './child'  //引入child组件
export default {
    data() {
            return {
                parentMsg: 'a message from parent'  //在data中定义需要传入的值
            }
        },
    components: {
        child
    }
}
</script>
<style>
</style>
```

## 子向父传值