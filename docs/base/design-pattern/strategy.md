# 策略模式

策略模式（Strategy Pattern），定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换

一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。

示例：假如我投资股票，看看涨了几个点

```js
class A {
    sum(num) {
        return num * 0.9
    }
}
class B {
    sum(num) {
        return num * 0.6
    }
}
class C {
    sum(num) {
        return num * 0.3
    }
}

class S {
    constructor() {
        this.base = null
        this.model = null
    }
    setBase(x) {
        this.base = x
    }
    setModel(m) {
        this.model = m
    }
    getSum() {
        return this.model.sum(this.base)    // 将请求委托给某一个策略类
    }
}

const obj6 = new S()
obj6.setBase(10000)

obj6.setModel(new A());      // 设置策略对象
obj6.getSum();  // 赚了9000

obj6.setModel(new B());
obj6.getSum()   // 赚了6000
```

A、B、C都是策略类，S是环境类Context
