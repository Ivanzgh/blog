# 工厂模式

## 简单工厂模式

先看一个例子：

```js
class Car {}

class Benz extends Car {}
class BMW extends Car {}
class Audi extends Car {}

const benz = new Benz();
const bmw = new BMW();
const audi = new Audi();
```

使用简单工厂模式改造后的例子：

```js
class Car {}

class Benz extends Car {}
class BMW extends Car {}
class Audi extends Car {}

class CarFactory {
  static createCar(type) {
    switch (type) {
      case 'benz':
        return new Benz();
      case 'bmw':
        return new BMW();
      case 'audi':
        return new Audi();
      default:
        throw new Error('type error');
    }
  }
}

const benz = CarFactory.createCar('benz');
const bmw = CarFactory.createCar('bmw');
const audi = CarFactory.createCar('audi');
```

可以看到，简单工厂模式是定义一个类来创建其他类的实例，根据参数的不同返回不同类的实例，通常这些类拥有相同的父类。

好处是：

1. 将创建逻辑都集中在工厂类中，便于集中管理，而不是分散暴露在代码里
2. 提高代码可读性和可维护性

使用函数形式的例子：

```js
function Car() {}

function Benz() {}
Benz.prototype = Object.create(Car.prototype);

function BMW() {}
BMW.prototype = Object.create(Car.prototype);

function Audi() {}
Audi.prototype = Object.create(Car.prototype);

// 工厂函数
function createCar(type) {
  switch (type) {
    case 'benz':
      return new Benz();
    case 'bmw':
      return new BMW();
    case 'audi':
      return new Audi();
    default:
      throw new Error('type error');
  }
}

const benz = createCar('benz');
const bmw = createCar('bmw');
const audi = createCar('audi');
```

## 工厂模式和构造器模式的区别

构造器解决的是**多个对象实例**的问题，工厂模式解决的是**多个类**的问题。

## 工厂方法模式

工厂方法模式是简单工厂的进一步优化，不再提供一个统一的工厂类来创建所有的对象，而是针对不同的对象提供不同的工厂。

工厂方法模式将创建对象的职责下放到子类，通过子类来决定创建哪种具体类型的对象。

```js
class Car {}

class Benz extends Car {}
class BMW extends Car {}
class Audi extends Car {}

// 定义一个创建对象的接口
class CarFactory {
  createCar() {
    throw new Error('不允许直接调用，这个方法应该被覆盖');
  }
}

class BenzFactory extends CarFactory {
  createCar() {
    return new Benz();
  }
}

class BMWFactory extends CarFactory {
  createCar() {
    return new BMW();
  }
}

class AudiFactory extends CarFactory {
  createCar() {
    return new Audi();
  }
}

const benzFactory = new BenzFactory();
const benz = benzFactory.createCar();

const bmwFactory = new BMWFactory();
const bmw = bmwFactory.createCar();

const audiFactory = new AudiFactory();
const audi = audiFactory.createCar();
```

工厂方法模式的步骤：

1. 定义产品父类：Car
2. 定义子类实现父类，并重写父类方法：Benz、Audi、BMW
3. 定义抽象接口，以及抽象方法：CarFactory
4. 定义工厂类，继承抽象接口，实现抽象方法：BenzFactory、BMWFactory、AudiFactory
5. new 工厂类，调用方法进行实例化

如果要新增一个产品，相比简单工厂模式的优势：

- 简单工厂模式，需要修改工厂类，违背了「开闭原则」
- 工厂方法模式，只需要增加产品类和工厂类，不需要修改抽象接口

## 抽象工厂模式

> 提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。

抽象工厂模式包含如下 4 种角色：

- 抽象工厂
- 具体工厂
- 抽象产品
- 具体产品

示例：汽车厂商能生产轮胎、发动机

1. 先定义一个汽车厂商的抽象工厂 AutomakerFactory，提供 2 个抽象方法 createWheel 和 createEngine

```js
class AutomakerFactory {
  createWheel() {
    throw new Error('不能调用抽象方法');
  }

  createEngine() {
    throw new Error('不能调用抽象方法');
  }
}
```

2. 定义一个具体工厂，实现抽象工厂的抽象方法，生产轮胎和发动机

```js
class BenzFactory extends AutomakerFactory {
  createWheel() {
    return new BenzWheel();
  }

  createEngine() {
    return new BenzEngine();
  }
}

class AudiFactory extends AutomakerFactory {
  createWheel() {
    return new AudiWheel();
  }

  createEngine() {
    return new AudiEngine();
  }
}
```

3. 定义抽象产品类 Wheel 和 具体产品类 BenzWheel、AudiWheel：

```js
class Wheel {
  turn() {
    throw new Error('不能调用抽象方法');
  }
}

class BenzWheel extends Wheel {
  turn() {
    console.log('Benz turn');
  }
}

class AudiWheel extends Wheel {
  turn() {
    console.log('Audi turn');
  }
}
```

4. 定义抽象产品类 Engine 和 具体产品类 BenzEngine、AudiEngine：

```js
class Engine {
  start() {
    throw new Error('不能调用抽象方法');
  }
}

class BenzEngine extends Engine {
  start() {
    console.log('Benz engine start');
  }
}

class AudiEngine extends Engine {
  start() {
    console.log('Audi engine start');
  }
}
```

5. 实例化过程

```js
let benz = new BenzFactory();
let benzWheel = benz.createWheel();
let benzEngine = benz.createEngine();

let audi = new AudiFactory();
let audiWheel = audi.createWheel();
let audiEngine = audi.createEngine();

benzWheel.turn(); // Benz turn
benzEngine.start(); // Benz engine start

audiWheel.turn(); // Audi turn
audiEngine.start(); // Audi engine start
```

如果后续添加新的产品，比如 BMW，只需执行以下三步：

1. 添加具体工厂类
2. 添加具体产品类
3. 实例化

```js
// 具体工厂
class BMWFactory extends AutomakerFactory {
  createWheel() {
    return new BMWWheel();
  }

  createEngine() {
    return new BMWEngine();
  }
}

// 具体产品
class BMWWheel extends Wheel {
  turn() {
    console.log('BMW turn');
  }
}

// 具体产品
class BMWEngine extends Engine {
  start() {
    console.log('BMW engine start');
  }
}

let bmw = new BMWFactory();
let bmwWheel = bmw.createWheel();
let bmwEngine = bmw.createEngine();
bmwWheel.turn();
bmwEngine.start();
```

可以看到，不需要修改已有的工厂类，只需要添加新的具体工厂类和具体产品类即可，符合「开闭原则」。

## 总结

**1. 简单工厂模式：**

- 提供统一工厂，将实例化的过程封装到内部，提供给用户统一的方法，只需要传递不同的参数就可以完成实例化过程
- 缺点：增加新的子类时需要修改工厂类，违背了「开闭原则」，工厂类可能会变得很臃肿
- 使用场景：适用于不会频繁新增子类

**2. 工厂方法模式：**

- 优点：解耦对象的创建和使用，遵循「开闭原则」
- 缺点：增加代码复杂性
- 使用场景：适用于会频繁新增子类的复杂场景

**3. 抽象工厂模式：**

- 抽象工厂模式提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类
- 包含 4 种角色：抽象工厂、具体工厂、抽象产品、具体产品
  - 抽象工厂用于声明生成抽象产品的方法
  - 具体工厂实现了抽象工厂声明的生成抽象产品的方法，生成一组具体产品
  - 抽象产品为每种产品声明接口，在抽象产品中定义了产品的抽象业务方法
  - 具体产品定义具体工厂生产的具体产品对象，实现抽象产品接口中定义的业务方法
- 优点：隔离具体类、易于扩展
- 与工厂方法模式的区别：工厂方法模式针对的是单个产品对象，而抽象工厂模式则关注一系列相关或互相依赖的产品对象
