# 策略模式

策略模式（Strategy Pattern），定义一系列的算法，把它们单独封装起来，并且使它们可以相互替换。

一个基于策略模式的程序至少由两部分组成：

1. 一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
2. 环境类 Context，Context 接受用户的请求，随后把请求委托给某一个策略类。

---

示例：根据一个基数和一个模式，计算出结果

## 1、简单实现

```js
function sum(count, type) {
  if (type === 'A') {
    return count * 0.9;
  }
  if (type === 'B') {
    return count * 0.6;
  }
  if (type === 'C') {
    return count * 0.3;
  }
}
sum(10000, 'A');
sum(10000, 'B');
```

这种方式非常简单，但是缺点是：

1. 函数中存在大量 if-else 语句，这些语句要覆盖所有的逻辑分支
2. 缺乏弹性、不易扩展，如果要增加一种模式 D，或者要将 A 的系数改为 0.8，都需要修改函数内部的代码，违背「开放封闭原则」

## 2、使用组合函数

将各种计算方法封装成单一的函数，各个函数可以被其他地方复用，但是依然没有解决前面的问题。

```js
function modelA(count) {
  return count * 0.9;
}
function modelB(count) {
  return count * 0.6;
}
function modelC(count) {
  return count * 0.3;
}

function sum(count, type) {
  if (type === 'A') {
    return modelA(count);
  }
  if (type === 'B') {
    return modelB(count);
  }
  if (type === 'C') {
    return modelC(count);
  }
}
sum(10000, 'A');
sum(10000, 'B');
```

## 3、使用策略模式

设计模式的核心思想就是将抽象与实现分离，将变化的部分与不变的部分隔开。

目的就是将**算法的使用**和**算法的实现**分离。

### 方式一、函数形式的策略对象

```js
function modelA(count) {
  return count * 0.9;
}
function modelB(count) {
  return count * 0.6;
}
function modelC(count) {
  return count * 0.3;
}

const modelList = {
  A: modelA,
  B: modelB,
  C: modelC
};

function sum(count, type) {
  return modelList[type](count);
}
sum(10000, 'A');
sum(10000, 'B');
```

### 方式二、模仿面向对象的实现

modelA、modelB、modelC 都是策略类，Sum 是环境类 Context

```js
function modelA() {}
modelA.prototype.calculate = function (count) {
  return count * 0.9;
};
function modelB() {}
modelB.prototype.calculate = function (count) {
  return count * 0.6;
};
function modelC() {}
modelC.prototype.calculate = function (count) {
  return count * 0.3;
};

function Sum() {
  this.count = null;
  this.model = null;
}
Sum.prototype.setCount = function (count) {
  this.count = count;
};
Sum.prototype.setModel = function (model) {
  this.model = model;
};
Sum.prototype.getResult = function () {
  return this.model.calculate(this.count);
};

const result = new Sum();
result.setCount(10000);
result.setModel(new modelA()); // 设置策略对象
const res = result.getResult();
console.log(res); // 9000
```

### 方式三、类形式的策略对象

```js
class ModelA {
  calculate(count) {
    return count * 0.9;
  }
}
class ModelB {
  calculate(count) {
    return count * 0.6;
  }
}
class ModelC {
  calculate(count) {
    return count * 0.3;
  }
}

class Sum {
  constructor() {
    this.count = null;
    this.model = null;
  }
  setCount(x) {
    this.count = x;
  }
  setModel(m) {
    this.model = m;
  }
  getResult() {
    return this.model.calculate(this.count); // 将请求委托给某一个策略类
  }
}

const obj = new Sum();
obj.setCount(10000);
obj.setModel(new ModelA()); // 设置策略对象
obj.getResult();
```

## 总结

1. 通过运用策略模式优化代码，消除了大量条件分支语句，使得代码结构更清晰且易于维护。
2. 计算相关的逻辑从环境类（Context）中分离出来，分配给各个独立的策略对象负责。
3. Context 自身不具备计算能力，而是将计算任务委派给关联的策略对象进行处理。
4. 各个策略对象分别封装了不同的计算算法，在接收到计算请求时，依据各自内部实现产生不同的计算结果，这是面向对象多态性的一个典型应用。
5. 多态性体现在策略对象之间可以互相替换，根据实际需求选择合适的策略对象注入到 Context 中。
6. 通过简单地更改 Context 中引用的策略对象，即可灵活切换并执行不同的计算算法，从而获得期望的计算结果。

---

> 在函数作为一等对象的语言中，策略模式是隐形的。strategy 就是值为函数的变量。
> 在 JavaScript 语言的策略模式中，策略类往往被函数所代替，这时策略模式就成为一种“隐形”的模式。

下面的代码就是策略模式的实现：

```js
const A = function (count) {
  return count * 9;
};
const B = function (count) {
  return count * 6;
};
const C = function (count) {
  return count * 3;
};
const calculateResult = function (fn, count) {
  return fn(count);
};
calculateResult(A, 10000);
```
