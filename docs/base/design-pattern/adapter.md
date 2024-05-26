# 适配器模式

适配器模式通过**把一个类的接口变换成客户端所期待的另一种接口**，可以解决不兼容的问题。例如耳机的圆孔插头可以通过转接头在 Type-C 接口上使用。

假设在项目里有一个封装的全局方法，这个方法在项目里大量使用了，现在有一个功能一致的新方法，需要去替换以前的全局方法。这个新方法接收的参数、调用方式都和旧方法不一样，如果要全部替换项目里的旧方法，工作量巨大。这时就可以使用适配器模式去重写旧方法的实现。

示例：

```js
// 旧方法
function oldMethod(type, data, successCallback, errorCallback) {}

// 使用方式
oldMethod(
  'type',
  [1, 2, 3],
  function (data) {},
  function (err) {}
);

// 新方法
function NewMethod(a, b) {}
NewMethod.prototype.init = function () {};

// 使用方式
const instance = new NewMethod(1, 2);
instance.init();
```

可以看出，如果要用新方法去一个一个的全部替换很麻烦

- 旧方法接收 4 个参数，直接调用即可
- 新方法接收 2 个参数，需要生成实例去调用 init 方法

使用适配器：

```js
funciton adapter(type, data, successCallback, errorCallback){
  // 省略适配过程
  const instance = new NewMethod(1, 2);
  instance.init();
}

function oldMethod(type, data, successCallback, errorCallback) {
  adapter(type, data, successCallback, errorCallback)
}
```

- 直接重写旧方法的逻辑，从源头改写，项目里的使用方式不用变
- 定义适配器方法，接收的参数和旧方法的参数一样
- 在适配器方法中进行适配，使用新方法的方式完成替换
