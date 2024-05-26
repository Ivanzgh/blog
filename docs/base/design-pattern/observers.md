# 观察者模式

观察者模式定义了一种一对多的依赖关系，让多个观察者对象同时监听某一个目标对象，当这个目标对象的状态发生变化时，会通知所有观察者对象，使它们能够自动更新。

## 核心角色

核心角色：发布者、订阅者

发布者：

- 增加订阅者
- 移除订阅者
- 通知订阅者

订阅者：被通知、去执行。在发布者类中调用方法，在订阅者类中定义方法。

示例：

```js
// 定义发布者类
class Publisher {
  constructor() {
    console.log('Publisher created');
    this.observers = [];
  }
  // 增加订阅者
  add(observer) {
    console.log('add');
    this.observers.push(observer);
  }
  // 移除订阅者
  remove(observer) {
    console.log('remove');
    this.observers.forEach((item, index) => {
      if (item === observer) {
        this.observers.splice(index, 1);
      }
    });
  }
  // 通知所有订阅者
  notify() {
    console.log('notify');
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}

// 定义订阅者类
class Observer {
  constructor() {
    console.log('Observer created');
  }
  update() {
    console.log('update');
  }
}
```

## 扩展具体的发布订阅者

扩展发布者类，使所有的订阅者来监听某个特定状态的变化。

场景：采购方发布一个标书，会通知所有供应商来投标报价。

```js
// 定义一个具体的发标发布类
class BidPublisher extends Publisher {
  constructor() {
    super();
    this.bidState = null;
    this.observers = [];
  }
  getState() {
    return this.bidState;
  }
  setState(state) {
    this.bidState = state;
    this.notify();
  }
}
// 定义发标的订阅者类
class BidObserver extends Observer {
  constructor() {
    super();
    this.bidState = {};
  }
  update(publisher) {
    this.bidState = publisher.getState();
    this.work();
  }
  // 工作函数
  work() {
    console.log(this.bidState);
  }
}

// 创建订阅者：供应商
const supplier1 = new BidObserver();
const supplier2 = new BidObserver();
const supplier3 = new BidObserver();

// 创建发布者：采购方
const owner = new BidPublisher();
// 标书信息
const tenderInfo = {};

// 添加订阅者
owner.add(supplier1);
owner.add(supplier2);
owner.add(supplier3);

// 发标
owner.setState(tenderInfo);
```

## 观察者模式和发布-订阅模式的区别

观察者模式中主体和观察者是互相感知的，发布-订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知。

![image](https://zghimg.oss-cn-beijing.aliyuncs.com/blog/1666418485.png)

- 在观察者模式中，观察者是知道 Subject 的，Subject 一直保持对观察者进行记录。然而，在发布订阅模式中，
  发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。
- 在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。
- 观察者模式大多数时候是同步的，比如当事件触发，Subject 就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）。
- 观察者模式需要在单个应用程序地址空间中实现，而发布-订阅更像交叉应用模式。
