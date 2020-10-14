# Less

官网：[http://lesscss.org/](http://lesscss.org/)

中文网：[https://less.bootcss.com/](https://less.bootcss.com/)

## 变量声明
`@test_width:300px;`

格式： 
@ + 变量名 + : 值 ;

使用:
```less
.box1 {
    width : @test_width;
}
```

## 混合(mixin)
可以混合嵌套使用别的样式
```less
.box2 {
    .box1;
    height : 100px;
}
```
还可以传递参数

```less
.box3(@test_ml) {
    margin-left : @test_ml;
}
//传参
.box2 {
    .box3(10px);
}
```
仍然能添加`!important`
```less
.box2 {
    .box3(10px)!important;
}
```
传参可以设置默认值
```less
.box3(@test_ml: 20px) {
    margin-left : @test_ml;
}

.box2 {
    .box3();  //需要修改默认值可传参 .box3(30px)
}
```

## 匹配模式
例如画小三角
```less
/*箭头朝上*/
.triangle(top, @w: 10px, @c: #f00) {
    border-width: @w;
    border-style: dashed dashed solid dashed; 
    border-color: transparent transparent @c  transparent;
  }
  /*箭头朝下*/
  .triangle(bottom, @w: 10px, @c: #f00) {
    border-width: @w;
    border-style: solid dashed dashed dashed; 
    border-color: @c transparent transparent  transparent;
  }
  /*箭头朝左*/
  .triangle(left, @w: 10px, @c: #f00) {
    border-width: @w;
    border-style: dashed solid dashed dashed; 
    border-color: transparent @c transparent  transparent;
  }
  /*箭头朝右*/
  .triangle(right, @w: 10px, @c: #f00) {
    border-width: @w;
    border-style: dashed dashed dashed solid; 
    border-color: transparent transparent  transparent @c;
  }
```
注意：不管匹配到哪一个，都会有固定的`@_`，相当于公共部分，后面的默认参数还要带上
```less
 .triangle(@_, @w: 10px, @c: #f00) {
    width: 0;
    height: 0;
    overflow: hidden;  
  }
```
使用：
```less
.triangle(top, 20px, #f0f)
```

再来一个定位的例子：
```less
.pos(r) {
    position: relative;
}
.pos(a) {
    position: absolute;
}
.pos(f) {
    position: fixed;
}
// 需要定位的盒子
.pos-box {
    .pos(r)    
}
```

## 运算
可进行+ - * / 运算，数值可以不带单位

```less
@test_1:300px;

.box4 {
    width: @test_1 + 10;
    height: (@test_1 - 250) * 2;
}
```

## 嵌套规则

```html
 <ul>
    <li><a href="#"><span>1</soan></a></li>
    <li><a href="#"><span>2</soan></a></li>
    <li><a href="#"><span>3</soan></a></li>
</ul>
```
使用less嵌套的写法
```less
/*
常规写法就是：
ul {}
ul li {}
ul li span {}
*/

ul {
    list-style: none;
    li {
        height: 100px;
    }
    a {
        text-decoration: none;
        
        // & 表示上一层选择器
        &:hover {
            color: #0f0;
        }
        
        span {
              font-size: 16px;
        }
    }
}
```

## @arguments
包含了所有传递进来的参数
```less
.border_1(@w: 1px, @s: solid, @c: #f00) {
    // 不用写成 border: @w @s @c;
    border: @arguments;
}
```

## 避免编译
加上 ~ 波浪号
```less
.test_2 {
    width: ~'calc(300px - 100px)';
}
```

## vscode 配置less
首先安装`Easy LESS`插件，然后在项目下找`.vscode`文件夹，若没有自己新建一个，或者在该插件的配置项中选择`Workspace`，
点击`Edit in settings.json`自动生成。

在settings.json里添加如下代码：
```
"less.compile": {
    "out": "${workspaceRoot}\\css\\"
}
```
`${workspaceRoot}`表示根目录，上述配置表示将less编译后的css放入根目录下的css文件夹中，
保存less文件后会自动生成同名的css文件，之后只需编辑less文件即可。

在html中引入的仍然是css文件,不用引入less

先在less文件开头写 `@charset 'utf-8';` 之后正常编辑