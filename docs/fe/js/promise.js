// new Promise((resolve, reject) => {
//   resolve();
//   rejuect();
// });

// executor 就是一个函数：(resolve, reject) => {}

// 1. 设置初始状态和结果
// 2. 绑定this
// 3. 实现 resolve 和 reject 方法
// 4. 捕获错误

class MyPromise {
  constructor(executor) {
    this.initValue();
    this.initBind();

    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  initValue() {
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
  }
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  resolve(value) {
    // 状态不可逆，不能直接变换状态，必须先在pending状态
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'fulfilled';
    this.PromiseResult = value;

    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(value);
    }
  }
  reject(reason) {
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'rejected';
    this.PromiseResult = reason;

    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(reason);
    }
  }
  then(onFulfilled, onRejected) {
    // 格式校验
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    if (this.PromiseState === 'fulfilled') {
      onFulfilled(this.PromiseResult);
    } else if (this.PromiseState === 'rejected') {
      onRejected(this.PromiseResult);
    } else if (this.PromiseState === 'pending') {
      this.onFulfilledCallbacks.push(onFulfilled.bind(this));
      this.onRejectedCallbacks.push(onRejected.bind(this));
    }
  }
}

const test1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
}).then(
  (res) => console.log(res),
  (err) => console.log(err)
);

console.log(test1);
