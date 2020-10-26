# clip-path

`clip-path`属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clip-path)

## circle

定义一个圆，语法：`circle( [ <shape-radius> ]? [ at <position> ]? )`

可选参数表示：

+ 半径，默认元素宽高中短的那个为直径，支持百分比
+ 圆心坐标，默认为元素中心点

例如半径占30%，圆心坐标在(40px, 50px)，零点在左上角

```css
clip-path: circle(30% at 40px 50px);
```

## inset

定义一个矩形，语法：`inset( <length-percentage>{1,4} [ round <border-radius> ]? )`

inset()可以传入5个参数，分别对应top,right,bottom,left的裁剪位置,round radius（可选，圆角）

示例

```css
clip-path: inset(100px 50px);

clip-path: inset(2em 3em 2em 1em round 2em);
```

## ellipse

定义一个椭圆，语法：`ellipse( [ <shape-radius>{2} ]? [ at <position> ]? )`

可以传入3个可选参数

+ X轴半径，默认是宽度的一半，支持百分比
+ Y轴半径，默认是高度的一半，支持百分比
+ 中心位置，默认是元素的中心点

示例

```css
clip-path: ellipse(40% 30% at 50% 50%);
```

## polygon

定义多边形，语法：`polygon( <fill-rule>? , [ <length-percentage> <length-percentage> ]# )`

参数说明：
`<fill-rule>`可选，表示填充规则用来确定该多边形的内部。可能的值有`nonzero`和`evenodd`,默认值是`nonzero`
后面的每对参数表示多边形的顶点坐标（X,Y），也就是连接点

示例：画个菱形

```css
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
```
