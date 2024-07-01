# 发布-订阅模式

在发布-订阅模式中，消息的发送方，叫做发布者（publishers），消息不会直接发送给特定的接收者，间接接收消息的叫做订阅者。

发布者和订阅者不知道对方的存在。需要一个第三方组件，叫做信息中介，它将订阅者和发布者串联起来，它过滤和分配所有输入的消息。

类似报社、邮局和个人的关系，报纸的订阅和分发是由邮局来完成的，报社只负责将报纸发送给邮局。报社就是发布者，个人是订阅者，邮局就是信息中介。

## 实现一个事件总线 Event Bus

在 vue 中，可以使用事件总线来实现组件间的通信。

1. 创建一个 eventBus.js 文件：

```js
// eventBus.js;
const eventBus = new Vue();
export default eventBus;
```

2. 在主文件 main.js 里引入事件总线，并挂载到全局：

```js
import eventBus from './eventBus';
Vue.prototype.$bus = eventBus;
```

3. 使用方式：

```js
// 订阅事件
this.$bus.$on('eventName', (data) => {});

// 发布事件
this.$bus.$emit('eventName', data);
```

下面实现一个 Event Bus

```js
class EventEmitter {
  constructor() {
    // handlers用于存储事件与回调之间的对应关系
    this.handlers = {};
  }

  // on方法用于安装事件监听器，它接受目标事件名和回调函数作为参数
  on(eventName, cb) {
    // 先检查一下目标事件名有没有对应的监听函数队列
    if (!this.handlers[eventName]) {
      // 如果没有，那么首先初始化一个监听函数队列
      this.handlers[eventName] = [];
    }

    // 把回调函数推入目标事件的监听函数队列里去
    this.handlers[eventName].push(cb);
  }

  // emit方法用于触发目标事件，它接受事件名和监听函数入参作为参数
  emit(eventName, ...args) {
    // 检查目标事件是否有监听函数队列
    if (this.handlers[eventName]) {
      // 这里需要对 this.handlers[eventName] 做一次浅拷贝，主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
      const handlers = this.handlers[eventName].slice();
      // 如果有，则逐个调用队列里的回调函数
      handlers.forEach((callback) => {
        callback(...args);
      });
    }
  }

  // 移除某个事件回调队列里的指定回调函数
  off(eventName, cb) {
    const callbacks = this.handlers[eventName];
    const index = callbacks.indexOf(cb);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  // 为事件注册单次监听器
  once(eventName, cb) {
    // 对回调函数进行包装，使其执行完毕自动被移除
    const wrapper = (...args) => {
      cb(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
```


参考代码：https://github.com/facebookarchive/emitter