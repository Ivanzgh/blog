const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this.initValue();
    this.initBind();

    try {
      // executor是一个执行器，立即执行
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  initValue() {
    // 状态
    this.PromiseState = PENDING;
    // 成功或者失败的结果
    this.PromiseResult = null;
    // 存储成功回调函数
    this.onFulfilledCallbacks = [];
    // 存储失败回调函数
    this.onRejectedCallbacks = [];
  }
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  resolve(value) {
    // 状态不可逆，不能直接变换状态，必须先在pending状态
    if (this.PromiseState !== PENDING) return;
    this.PromiseState = FULFILLED;
    this.PromiseResult = value;

    while (this.onFulfilledCallbacks.length) {
      // Array.shift() 删除数组第一个元素并返回该元素，直到清空数组
      this.onFulfilledCallbacks.shift()(value);
    }
  }
  reject(reason) {
    if (this.PromiseState !== PENDING) return;
    this.PromiseState = REJECTED;
    this.PromiseResult = reason;

    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(reason);
    }
  }
  then(onFulfilled, onRejected) {
    // 格式校验，处理then的可选参数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        // 添加setTimeout，为了优先执行同步任务
        setTimeout(() => {
          try {
            const x = cb(this.PromiseResult);
            if (x && x === thenPromise) {
              // 避免循环调用
              throw new Error('不能返回自身');
            }
            if (x instanceof MyPromise) {
              // 返回promise
              x.then(resolve, reject);
            } else {
              // 返回普通值
              resolve(x);
            }
          } catch (error) {
            reject(error);
            throw new Error(error);
          }
        });
      };

      if (this.PromiseState === FULFILLED) {
        resolvePromise(onFulfilled);
      } else if (this.PromiseState === REJECTED) {
        resolvePromise(onRejected);
      } else if (this.PromiseState === PENDING) {
        // 不知道后面的状态变化，先把成功回调和失败回调存储起来
        this.onFulfilledCallbacks.push(onFulfilled.bind(this));
        this.onRejectedCallbacks.push(onRejected.bind(this));
      }
    });
    return thenPromise;
  }

  // resolve 静态方法
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => {
      resolve(value);
    });
  }

  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    const result = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      const addData = (index, value) => {
        result[index] = value;
        count++;
        if (count === promises.length) {
          resolve(result);
        }
      };
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData(index, res);
            },
            (err) => {
              reject(err);
            }
          );
        } else {
          addData(index, promise);
        }
      });
    });
  }
  static allSettled(promises) {
    const result = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        const addData = (status, index, value) => {
          result[index] = { status, value };
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        };
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData(FULFILLED, index, res);
            },
            (err) => {
              addData(REJECTED, index, err);
            }
          );
        } else {
          addData(FULFILLED, index, promise);
        }
      });
    });
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        } else {
          resolve(promise);
        }
      });
    });
  }
  static any(promises) {
    const errors = [];
    let count = 0;
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              resolve(res);
            },
            (err) => {
              errors[index] = err;
              count++;
              if (count === promises.length) {
                reject(new AggregateError(errors, 'All promises were rejected'));
              }
            }
          );
        } else {
          resolve(promise);
        }
      });
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => {
        callback();
        return value;
      },
      (reason) => {
        callback();
        throw reason;
      }
    );
  }
}
