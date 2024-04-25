# 代理模式

代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。

- 保护代理：过滤请求，用于控制不同权限的对象对目标对象的访问
- 虚拟代理：把一些开销很大的操作延迟到真正需要时才执行

示例：A 想向 C 发送消息。如果通过 B 在中间中转，就是代理模式

```js
const Message = function () {};

const A = {
  sendMessage(target) {
    const msg = new Message();
    target.receiveMessage(msg);
  }
};

const B = {
  receiveMessage(msg) {
    C.receiveMessage(msg);
  }
};

const C = {
  receiveMessage(msg) {
    console.log(msg);
  }
};

// A.sendMessage(C);

A.sendMessage(B);
```
