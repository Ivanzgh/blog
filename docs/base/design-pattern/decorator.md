# 装饰器模式

在不改变原对象的基础上，通过对其进行包装拓展，使原有对象可以满足用户的更复杂需求。

示例：

```js
// 装饰器函数
function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}

// 将装饰器安装到Person类上
@classDecorator
class Person {}

console.log(Person.hasDecorator);
```

当前浏览器和 Node 都不支持装饰器语法，需要安装 Babel 转码。

1. 全局安装 Babel 命令行工具

```bash
npm install babel-cli -g
```

2. 安装装饰器相关的 Babel 插件：

```bash
pnpm add babel-preset-env babel-plugin-transform-decorators-legacy -D
```

3. 编写配置文件`.babelrc`

```json
{
  "presets": ["env"],
  "plugins": ["transform-decorators-legacy"]
}
```

4. 文件转码，如果示例代码是 index.js，转码结果输出到 test.js，则：

```bash
babel index.js --out-file test.js
```

5. 运行 test.js

```bash
node test.js
```

可以看到结果是 true，说明装饰器生效了。

## 装饰器参数

### 类装饰器的参数

给一个类添加装饰器时，装饰器函数接收的 target 参数就是类本身。

```js
function classDecorator(target) {
  target.hasDecorator = true;
  return target;
}

@classDecorator
class Person {}
```

### 函数装饰器的参数

示例：依照前面的步骤编译执行后，结果输出了两段打印信息

```js
function fnDecorator(target, name, descriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function () {
    console.log('fn的装饰器逻辑');
    return originalMethod.apply(this, arguments);
  };
  return descriptor;
}

class Button {
  @fnDecorator
  onClick() {
    console.log('fn的原有逻辑');
  }
}

const btn = new Button();
btn.onClick();
```

- target 参数是`Button.prototype`，即类的原型对象
- name 参数是修饰的目标属性名
- descriptor 参数是属性描述对象，`Object.defineProperty(obj, prop, descriptor)`

如果在装饰器函数里打印 3 个参数，结果如下：

```
{}
onClick
{
  value: [Function: onClick],
  writable: true,
  enumerable: false,
  configurable: true
}
```

注意：

- 装饰器函数执行时，Button 的实例还不存在
- 实例在运行时产生，装饰器函数在编译阶段就执行了
