---
outline: deep
---

# 单例模式

> 单例模式，**保证一个类仅有一个实例，并提供一个全局访问点**

需要构造函数**具备判断自己是否已经构造过一个实例**的能力。

应用场景：

- 当一个类的对象需要在全局系统中共享时
- 在需要控制实例的创建数量时

例如：

1. 创建全局事件总线 Event Bus
2. 管理唯一的弹窗组件

## 简易实现

方式一、使用闭包（推荐）

```js
const Singleton = (function () {
  let instance = null;
  function Singleton(name) {
    this.name = name;
  }
  return {
    getInstance: function (name) {
      if (!instance) {
        instance = new Singleton(name);
      }
      return instance;
    }
  };
})();

const s1 = Singleton.getInstance('zs');
const s2 = Singleton.getInstance('ls');
console.log(s1 === s2); // true
```

方式二、定义一个静态方法 getInstance

```js
function Singleton(name) {
  this.name = name;
  this.instance = null;
}
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

const s1 = Singleton.getInstance('zs');
const s2 = Singleton.getInstance('ls');
console.log(s1 === s2); // true
```

方式三、 使用 class 的静态方法

```js
class Singleton {
  show() {
    console.log('singleton');
  }
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();
console.log(s1 === s2); // true
```

## 透明的单例模式

前面的示例中，使用者需要知道 Singleton 是一个单例类，需要知道用 `Singleton.getInstance()` 来获取对象，而不是 `new Singleton()`。这就增加了这个类的「不透明性」

> 透明性是指单例对象是否可以像其他对象一样被访问。

示例：创建唯一的 div 节点

```js
const CreateDiv = (function () {
  let instance;
  // 定义构造函数
  const CreateDiv = function (html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    // 如果没有已存在的实例，就把当前实例赋值给 instance，并返回当前实例
    return (instance = this);
  };
  CreateDiv.prototype.init = function () {
    const div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  };
  return CreateDiv;
})();

const s1 = new CreateDiv('zs');
const s2 = new CreateDiv('ls');
console.log(s1 === s2); // true
```

虽然这里实现了单例对象可以像普通对象一样访问，但是 CreateDiv 构造函数做了两件事，第一是创建对象和执行初始化 init 方法，第二是保证只有一个对象。违反了「单一职责原则」

## 代理实现单例模式

```js
const CreateDiv = function (html) {
  this.html = html;
  this.init();
};
CreateDiv.prototype.init = function () {
  const div = document.createElement('div');
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

const ProxySingletonCreateDiv = (function () {
  let instance = null;
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html);
    }
    return instance;
  };
})();

const a = new ProxySingletonCreateDiv('zs');
const b = new ProxySingletonCreateDiv('ls');
console.log(a === b);
```

## 惰性单例

> 「惰性单例」指的是在需要的时候才创建对象实例。

比如点击按钮后出现一个弹窗，点击后才创建弹窗，而不是页面加载时就创建。

```js
const createDialog = (function () {
  let div;
  return function () {
    if (!div) {
      div = document.createElement('div');
      div.innerHTML = 'dialog';
      div.style.display = 'none';
      document.body.appendChild(div);
    }
    return div;
  };
})();

document.querySelector('.btn').addEventListener('click', function () {
  const dialog = createDialog();
  dialog.style.display = 'block';
});
```

示例实现了一个惰性单例，但是也违反了「单一职责原则」。如果以后要添加其他的功能，如添加唯一的 script 标签，只能复制代码修改。

所以把管理单例的逻辑抽离出来，定义一个变量来标志是否创建过单例，实现一个通用的惰性单例

```js
const getSingle = function (fn) {
  let result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

function createDialog() {
  const div = document.createElement('div');
  div.innerHTML = 'dialog';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
}

const createSingleDialog = getSingle(createDialog);

document.querySelector('.btn').addEventListener('click', function () {
  const dialog = createSingleDialog();
  dialog.style.display = 'block';
});
```

1. 创建对象的方法 fn 作为参数传入 getSingle 函数。
2. getSingle 返回一个新的函数，并且用一个变量 result 来保存 fn 的计算结果。result 变量因为在闭包中，它不会被销毁。
3. 把管理单例的职责、创建实例对象的职责分开放在两个方法里，组合在一起就能实现创建唯一实例对象的功能。

## 题目

1、实现单例对象 Storage，基于 localStorage 进行封装，实现 setItem(key,value) 和 getItem(key)

::: code-group

```js [静态方法版]
class Storage {
  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    return Storage.instance;
  }
  getItem(key) {
    return localStorage.getItem(key);
  }
  setItem(key, value) {
    localStorage.setItem(key, value);
  }
}
const obj1 = Storage.getInstance();
obj1.setItem('name', 'zhangsan');
const obj2 = Storage.getInstance();

console.log(obj1 === obj2); // true
```

```js [闭包版]
const Storage = (function () {
  let instance = null;
  function myStorage() {}
  myStorage.prototype.getItem = (key) => localStorage.getItem(key);
  myStorage.prototype.setItem = (key, value) => localStorage.setItem(key, value);
  return {
    getInstance() {
      if (!instance) {
        instance = new myStorage();
      }
      return instance;
    }
  };
})();
const obj1 = Storage.getInstance();
obj1.setItem('name', 'zhangsan');
const obj2 = Storage.getInstance();

console.log(obj1 === obj2); // true
```

:::

2、实现唯一的弹窗

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #modal {
        height: 200px;
        width: 200px;
        line-height: 200px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid black;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <button id="open">打开弹框</button>
    <button id="close">关闭弹框</button>
    <script>
      class Modal {
        static getInstance() {
          if (!Modal.instance) {
            Modal.instance = document.createElement('div');
            Modal.instance.id = 'modal';
            Modal.instance.innerHTML = '<div>我是弹框</div>';
            Modal.instance.style.display = 'none';
            document.body.appendChild(Modal.instance);
          }
          return Modal.instance;
        }
        static open() {
          Modal.getInstance().style.display = 'block';
        }
        static close() {
          Modal.getInstance().style.display = 'none';
        }
      }

      const openBtn = document.getElementById('open');
      const closeBtn = document.getElementById('close');
      openBtn.addEventListener('click', () => Modal.open());
      closeBtn.addEventListener('click', () => Modal.close());
    </script>
  </body>
</html>
```
