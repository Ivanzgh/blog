# tsconfig.json

`tsconfig.json`文件是用来配置如何编译 ts 文件的，一般在项目的根目录下，使用下方命令可生成

```sh
tsc --init
```

## 选择编译文件

默认是编译所有 ts 文件

`include`表示包含哪些要编译的文件，`exclude`表示不包含哪些文件，二者都可使用通配符

`files`指定一个包含相对或绝对文件路径的列表

```json
{
  "include": ["bar.ts"],
  //   "include": ["src/**/*"],
  //   "exclude": ["bar.ts"],
  //   "files": ["foo.ts", "bar.ts"],
  "compilerOptions": {}
}
```

::: warning
文件名称只能用双引号，用单引号会报错
:::
