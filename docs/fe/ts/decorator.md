# 装饰器

> 装饰器的本质是一个**函数**，通过装饰器可以定义跟**对象**相关的元数据。

- 装饰器使用范围：类、属性、方法、参数、访问器
- 写法：`@expression`，expression 是函数名

注意：装饰器是一项实验性功能，可能会在未来版本中引入重大更改。

- [第 2 阶段装饰器文档](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [Typescript 5.0 中的装饰器](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)
- [第 3 阶段装饰器提案](https://github.com/microsoft/TypeScript/pull/50820)

## 装饰器的语法

普通装饰器不带参数，装饰器工厂可以带参数。

### 普通装饰器

```ts
function MyDecorator(target: any) {}

@MyDecorator
class MyClass {}
```

### 装饰器工厂

```ts
function MyDecorator(value: string) {
  return funtion (target: any) {}
}

@MyDecorator({ name: 'ts'})
class MyClass {}
```

### 装饰器组合

- 一行：`@f @g class MyClass {}`
- 多行：

```ts
@f
@g
class MyClass {}
```

## 类装饰器

类装饰器声明：

```ts
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;
```

应用于类声明前，可以修改类的定义。接收一个参数：被装饰的类

示例：

```ts
function logClass(target: Function) {
  target.prototype.say = function (): void {
    console.log('hello world');
  };
}

@logClass
class MyClass {}

const instance = new MyClass();
(instance as any).say(); // hello world
```

## 属性装饰器

属性装饰器声明：

```ts
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;
```

应用于类的属性前，可以用来修改属性定义。接收两个参数：

- target：被装饰的类
- propertyKey：被装饰类的属性名

## 方法装饰器

方法装饰器声明：

```ts
declare type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypePropertyDescript<T>
) => TypedPropertyDescriptor<T> | void;
```

应用于类的方法前，可以修改方法的行为。接收两个参数：

- target: 原始方法
- context: 上下文

```ts
function loggedMethod(originalMethod: any, _context: any) {
  function replacementMethod(this: any, ...args: any[]) {
    console.log('LOG: Entering method.');
    const result = originalMethod.call(this, ...args);
    console.log('LOG: Exiting method.');
    return result;
  }

  return replacementMethod;
}

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @loggedMethod
  greet() {
    console.log(this.name);
  }
}

const p = new Person('Tom');
p.greet();
```

## 参数装饰器

应用于类的方法参数前，可以执行与参数相关的操作。
