# AST

## 简介

> 代码的本质就是字符串

抽象语法树（Abstract Syntax Tree，AST）

编译过程：解析、转换、生成

- parse：将源码字符串转换成抽象语法树（AST）
- transform：遍历 AST，调用插件生成新的 AST
- generate：将转换后的 AST 生成目标代码，并生成 sourcemap

::: tip

1. 词法分析（Lexical Analysis）：将源代码转换成单词流，称为词法单元（tokens），每个词法单元包含一个标识符和一个属性值，比如变量名、数字、操作符等。
2. 语法分析（Parsing）：将词法单元流转换成抽象语法树（Abstract Syntax Tree，简称 AST），也就是标记所构成的数据结构，表示源代码的结构和规则。
3. 语义分析（Semantic Analysis）：在 AST 上执行类型检查、作用域检查等操作，以确保代码的正确性和安全性。
4. 代码生成（Code Generation）：基于 AST 生成目标代码，包括优化代码结构、生成代码文本、进行代码压缩等。

:::

## 参考资料

- [the-super-tiny-compiler](https://github.com/jamiebuilds/the-super-tiny-compiler)，微型编译器，必看的典型项目
- [acorn](https://github.com/acornjs/acorn)，一个小型的 js 解析器
- [AST explorer](https://astexplorer.net)，在线生成 AST
- [esprima parse](https://esprima.org/demo/parse.html#)，在线生成 AST，包含 Tree、Syntax、Tokens
- [ESTree 规范](https://github.com/estree/estree)，语法分析的参考规范

## AST 的公共属性

- `type`：节点的类型
- `start、end、loc`：
  - `start`：该节点在源码中的开始下标
  - `end`：结束下标
  - `loc`：是一个对象，有 line 和 column 属性分别记录开始和结束的行列号
- `leadingComments、innerComments、trailingComments`： 表示开始的注释、中间的注释、结尾的注释
- `extra`：记录一些额外的信息，用于处理一些特殊情况

## 词法分析

将代码（字符串）分割为 token 流，即**语法单元**组成的数组

### 语法单元

语法单元包括哪些？

- 数字
- 空格
- 运算符：`+ - * / < >`等
- 括号：`() [] {}`
- 标识符：连续字符（可包含字母、`_`、`$`），常量（true、false 等）、关键字（if、return、funciton 等）
- 注释：行注释、块注释
- 其他：分号、冒号、点

### 解析示例

```js
// 需要解析的代码
const add = (a, b) => a + b


// 转换后的期望结果
[
  { type: "identifier", value: "const" },
  { type: "whitespace", value: " " },
]

```

`'const add = (a, b) => a + b'.length`的结果是 27，包括空格

下面是简易实现：

```js
function tokenizer(code) {
  const tokens = [];
  let current = 0;

  while (current < code.length) {
    const char = code[current];

    // 处理括号
    if (char === '(' || char === ')') {
      tokens.push({ type: 'parens', value: char });
      current++;
      continue;
    }

    // 处理标识符，一般以 字母、$、_ 开头
    if (/[a-zA-Z\$\_]/.test(char)) {
      let value = '';
      value += char;
      current++;

      // 如果是连续字符，那么将其拼接在一起，随后指针后移
      while (/[a-zA-Z0-9\$\_]/.test(code[current]) && current < code.length) {
        value += code[current];
        current++;
      }

      tokens.push({ type: 'identifier', value });
      continue;
    }

    // 处理空白字符
    if (/\s/.test(char)) {
      let value = '';
      value += char;
      current++;

      while (/\s]/.test(code[current]) && current < code.length) {
        value += code[current];
        current++;
      }

      tokens.push({ type: 'whitespace', value });
      continue;
    }

    // 处理逗号分隔符
    if (/,/.test(char)) {
      tokens.push({ type: ',', value: ',' });
      current++;
      continue;
    }

    // 处理运算符
    if (/=|\+|>/.test(char)) {
      let value = '';
      value += char;
      current++;

      while (/=|\+|>/.test(code[current])) {
        value += code[current];
        current++;
      }

      // 当 = 后面有 > 时为箭头函数而非运算符
      if (value === '=>') {
        tokens.push({ type: 'ArrowFunctionExpression', value });
        continue;
      }

      tokens.push({ type: 'operator', value });
      continue;
    }

    // 如果碰到词法分析器以外的字符，则报错
    throw new TypeError('Ivalid character: ' + char);
  }

  return tokens;
}

const code = 'const add = (a, b) => a + b';

const res = tokenizer(code);

console.log(res);
```

结果如下：

```js
[
  { type: 'identifier', value: 'const' },
  { type: 'whitespace', value: ' ' },
  { type: 'identifier', value: 'add' },
  { type: 'whitespace', value: ' ' },
  { type: 'operator', value: '=' },
  { type: 'whitespace', value: ' ' },
  { type: 'parens', value: '(' },
  { type: 'identifier', value: 'a' },
  { type: ',', value: ',' },
  { type: 'whitespace', value: ' ' },
  { type: 'identifier', value: 'b' },
  { type: 'parens', value: ')' },
  { type: 'whitespace', value: ' ' },
  { type: 'ArrowFunctionExpression', value: '=>' },
  { type: 'whitespace', value: ' ' },
  { type: 'identifier', value: 'a' },
  { type: 'whitespace', value: ' ' },
  { type: 'operator', value: '+' },
  { type: 'whitespace', value: ' ' },
  { type: 'identifier', value: 'b' }
];
```

## 语法分析

语法分析是在分词结果的基础上分析语法单元之间的关系，即**分析 token 流并生成 AST**

语法分析比较复杂，要分析各种语法的可能性，需要根据词法分析得到的 token 流（即结果数组）来分析代码之间的逻辑关系，最后形成有结构的抽象语法树

语法分析一般都遵循[ESTree 规范](https://github.com/estree/estree)，几个重要的概念：

- 语句（Statements），如 if 语句、for 循环语句、异常处理语句等等
- 表达式（Expressions），如函数表达式
- 声明（Declarations），如变量声明、函数声明

下面开始分析 tokens，并生成 AST。这里只是简易实现，忽略了一些判断条件，重点在思路

```js
const parser = (tokens) => {
  // 声明一个全时指针
  let current = -1;

  // 声明一个暂存栈，用于存放临时指针
  const tem = [];

  // 指针指向的当前token
  let token = tokens[current];

  // 指针后移
  const next = () => {
    do {
      ++current;
      token = tokens[current] ? tokens[current] : { type: 'eof', value: '' };
    } while (token.type === 'whitespace');
  };

  // 暂存当前指针
  const setTem = () => {
    tem.push(current);
  };

  // 指针回退
  const backTem = () => {
    current = tem.pop();
    token = tokens[current];
  };

  const parseDeclarations = () => {
    setTem();
    next();

    // 如果字符为 const 即是一个声明
    if (token.type === 'identifier' && token.value === 'const') {
      const declarations = {
        type: 'VariableDeclaration',
        kind: token.value
      };

      next();

      // const 后面是变量，如果不是则报错
      if (token.type !== 'identifier') {
        throw new Error('Expected Variable after const');
      }

      // 获取变量名称
      declarations.identifierName = token.value;

      next();

      // 如果变量名称后面是 = ，那么后面应该是表达式或者常量之类的，这里简易实现，直接解析函数表达式
      if (token.type === 'operator' && token.value === '=') {
        declarations.init = parseFunctionExpression();
      }

      return declarations;
    }
  };

  const parseFunctionExpression = () => {
    next();

    let init;
    // 如果等号 = 后面跟着括号或者字符，那基本判断是一个表达式
    if ((token.type === 'parens' && token.value === '(') || token.type === 'identifier') {
      setTem();
      next();
      while (token.type === 'identifier' || token.type === ',') {
        next();
      }

      // 如果括号后跟着箭头，那么判断是箭头函数表达式
      if (token.type === 'parens' && token.value === ')') {
        next();
        if (token.type === 'ArrowFunctionExpression') {
          init = {
            type: 'ArrowFunctionExpression',
            params: [],
            body: {}
          };

          backTem();

          // 解析箭头函数的参数
          init.params = parseParams();

          // 解析箭头函数的函数主体
          init.body = parseExpression();
        } else {
          backTem();
        }
      }
    }

    return init;
  };

  const parseParams = () => {
    const params = [];
    if (token.type === 'parens' && token.value === '(') {
      next();
      while (token.type !== 'parens' && token.value !== ')') {
        if (token.type === 'identifier') {
          params.push({
            type: token.type,
            identifierName: token.value
          });
        }
        next();
      }
    }

    return params;
  };

  const parseExpression = () => {
    next();
    let body;
    while (token.type === 'ArrowFunctionExpression') {
      next();
    }

    // 如果以 ( 开头或者变量开头，说明不是 BlockStatement，以二元表达式来解析
    if (token.type === 'identifier') {
      body = {
        type: 'BinaryExpression',
        left: {
          type: 'identifier',
          identifierName: token.value
        },
        operator: '',
        right: {
          type: '',
          identifierName: ''
        }
      };
      next();

      if (token.type === 'operator') {
        body.operator = token.value;
      }

      next();

      if (token.type === 'identifier') {
        body.right = {
          type: 'identifier',
          identifierName: token.value
        };
      }
    }

    return body;
  };

  const ast = {
    type: 'Program',
    body: []
  };

  while (current < tokens.length) {
    const statement = parseDeclarations();
    if (!statement) {
      break;
    }
    ast.body.push(statement);
  }
  return ast;
};

const res = parser(tokens);
console.log(res);
```

结果如下：

```json
{
  "type": "Program",
  "body": [
    {
      "type": "VariableDeclaration",
      "identifierName": "add",
      "kind": "const",
      "init": {
        "type": "ArrowFunctionExpression",
        "params": [
          {
            "type": "identifier",
            "identifierName": "a"
          },
          {
            "type": "identifier",
            "identifierName": "b"
          }
        ],
        "body": {
          "type": "BinaryExpression",
          "left": {
            "type": "identifier",
            "identifierName": "a"
          },
          "operator": "+",
          "right": {
            "type": "identifier",
            "identifierName": "b"
          }
        }
      }
    }
  ]
}
```

## 遍历器 traverser

遍历访问 AST 上的节点，生成新的语法树

```js
const traverser = (ast, visitor) => {
  // 遍历数组
  const traverseArray = (array, parent) => {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  };

  // 遍历 AST 节点
  const traverseNode = (node, parent) => {
    const method = visitor[node.type];

    if (method) {
      method(node, parent);
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node);
        break;

      case 'VariableDeclaration':
        traverseArray(node.init.params, node.init);
        break;

      case 'identifier':
        break;

      default:
        throw new TypeError(node.type);
    }
  };
  traverseNode(ast, null);
};
```

Visitors (访问器)，创建一个“访问器”对象，这个对象可以处理不同类型的节点函数。通过访问器访问不同的节点，在遇到不同的节点的时候，调用访问器的不同函数

## 转换器 transformer

在这一步需要用到转换器，将前面生成的 AST 转化为新的 AST

```js
const transformer = (ast) => {
  // 新 AST
  const newAst = {
    type: 'Program',
    body: []
  };

  // 在老 AST 上加一个指针指向新 AST
  ast._context = newAst.body;

  traverser(ast, {
    // 对于变量声明的处理方法
    VariableDeclaration: (node, parent) => {
      let functionDeclaration = {
        params: []
      };
      if (node.init.type === 'ArrowFunctionExpression') {
        functionDeclaration.type = 'FunctionDeclaration';
        functionDeclaration.identifierName = node.identifierName;
      }

      if (node.init.body.type === 'BinaryExpression') {
        functionDeclaration.body = {
          type: 'BlockStatement',
          body: [
            {
              type: 'ReturnStatement',
              argument: node.init.body
            }
          ]
        };
      }

      parent._context.push(functionDeclaration);
    },

    // 对于字符的处理方法
    identifier: (node, parent) => {
      if (parent.type === 'ArrowFunctionExpression') {
        ast._context[0].params.push({
          type: 'identifier',
          identifierName: node.identifierName
        });
      }
    }
  });

  return newAst;
};
```

## 生成器 generator

```js
const generator = (node) => {
  switch (node.type) {
    // 如果是 Program 结点，会遍历其 body 属性中的每一个结点，并且递归调用 generator，再把结果打印到新的一行中
    case 'Program':
      return node.body.map(generator).join('\n');

    // 分别遍历调用其参数数组以及调用其 body 的属性
    case 'FunctionDeclaration':
      return (
        'function' + ' ' + node.identifierName + '(' + node.params.map(generator) + ')' + ' ' + generator(node.body)
      );

    // 返回 node 的 identifierName
    case 'identifier':
      return node.identifierName;

    // 遍历调用其body数组
    case 'BlockStatement':
      return '{' + node.body.map(generator) + '}';

    // 调用其 argument 的属性
    case 'ReturnStatement':
      return 'return' + ' ' + generator(node.argument);

    // 调用其左右节点并拼接
    case 'BinaryExpression':
      return generator(node.left) + ' ' + node.operator + ' ' + generator(node.right);

    // 没有符合的则报错
    default:
      throw new TypeError(node.type);
  }
};
```

至此实现了 compiler 这个微型编译器

```js
const compiler = (input) => {
  const tokens = tokenizer(input);
  const ast = parser(tokens);
  const newAst = transformer(ast);
  const output = generator(newAst);

  return output;
};

const str = 'const add = (a, b) => a + b';

const result = compiler(str);

console.log(result); // function add(a,b) {return a + b}
```
