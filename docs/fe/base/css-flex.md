# flex

<https://www.cnblogs.com/nuannuan7362/p/5823381.html>

<https://the-echoplex.net/flexyboxes/>

首先声明 flex 布局

```css
display: flex;
```

flex 让最后一项居右可在最后一项元素使用样式：

```css
margin-left: auto;
```

## flex-direction

设置主轴方向，默认是水平方向

```css
flex-direction: row;
```

- row: 主轴为水平方向，从左到右

- row-reverse：主轴水平，从右到左

- column：主轴竖直，从上到下

- column-reverse：主轴竖直，从下到上

## flex-wrap

默认`nowrap`不换行，如果项目的子元素总宽度大于容器最大宽度，将会缩小以适应容器，
如果无法缩小则会导致溢出

如果项目太大无法全部显示在一行中，使用`wrap`则会换行显示

```css
flex-wrap: wrap;
```

## flex-flow

是`flex-direction`和`flex-flow`的简写

```css
flex-flow: row wrap;
```

## justify-content

使元素在主轴方向上对齐

- stretch 默认值，从起始线开始
- flex-start 从起始线开始
- flex-end 从终止线开始
- center 居中
- space-around 每个元素的左右空间相等
- space-between 元素之间间隔相等

## align-items

使元素在交叉轴方向对齐

- stretch 默认值，被拉伸填满容器
- flex-start 按容器顶部对齐
- flex-end 按容器底部对齐
- center 居中对齐

## flex 属性

假设在 1 个 500px 的容器中，我们有 3 个 100px 宽的元素，那么这 3 个元素需要占 300px 的宽，剩下 200px 的**可用空间**。

### flex-basis

定义元素的空间大小，默认值是`auto`，例子中的元素空间大小就是 100px

### flex-grow

元素会以`flex-basis`为基础，沿主轴方向增长尺寸，可以按比例分配可用空间

假如所有元素都设置`flex-basis: 1`，则可用空间被平分

示例中，假如第一个元素设置`flex-basis: 2`，其余两个设置为`flex-basis: 1`，则第一个元素分配到 100px，其余元素各分配到 50px

### flex-shrink

元素收缩，只有在 flex 元素总和超出主轴才会生效

### flex 简写

简写按这个顺序书写 - `flex-grow`，`flex-shrink`，`flex-basis`

预定义的简写形式：

- flex: initial 相当于`flex: 0 1 auto`，不拉伸，可收缩
- flex: auto 相当于`flex: 1 1 auto`，可拉伸，可收缩
- flex: none 相当于`flex: 0 0 auto`，不可伸缩
- flex: 正整数 `flex: 1`或者`flex: 2`等，相当于`flex: 1 1 0`，元素可以在`flex-basis: 0`的基础上伸缩

## gird

```css
.container {
  display: grid;
  /* grid-template-columns属性定义每一列的列宽，grid-template-rows属性定义每一行的行高。 */
  grid-template-columns: repeat(4, 60px);
  grid-template-rows: repeat(2, 60px);
  /* grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式， 
        grid-row-gap属性设置行与行的间隔（行间距），grid-column-gap属性设置列与列的间隔（列间距）
        我设置的是10 行与行之间 列与列之间 都是10 */
  grid-gap: 10px;
  /* item在这个单元格中的位置justify-items属性设置单元格内容的水平位置（左中右），align-items属性设置单元格内容的垂直位置（上中下） */
  align-items: center;
  justify-items: center;
  /* justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）。 */
  justify-content: center;
  align-content: center;

  width: 100%;
  height: 500px;
  background: #f3f3f3;
}
```
