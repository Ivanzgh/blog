# Three

## 材质

## 相机

### 正交相机
在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。
```
OrthographicCamera( left, right, top, bottom, near, far)
```
+ left — 视锥体左侧面
+ right — 右侧面
+ top — 上侧面
+ bottom — 下侧面
+ near — 近截面，默认值0.1
+ far — 远截面，默认值2000

![image](/blog/img/vis/three_camera4.png)

```js
const k = window.innerWidth / window.innerHeight;
const s = 200;
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);  // 左截面、右截面、上截面、下截面、近截面、远截面
camera.position.set(300,400,300)
camera.lookAt(scene.position)
```

### 透视相机
这一投影模式被用来模拟人眼所看到的景象   
```
PerspectiveCamera( fov, aspect, near, far )
```
+ fov — 视野角度，默认值50
+ aspect — 视锥体长宽比，默认值1(正方形画布)
+ near — 近截面，默认值0.1
+ far — 远截面，默认值2000

只有离相机的距离大于near值，小于far值，且在相机的可视角度之内，才能被相机投影到。

![image](/blog/img/vis/three_camera1.png)
![image](/blog/img/vis/three_camera2.png)
![image](/blog/img/vis/three_camera3.png)

示例：
```js
const camera  = new THREE.PerspectiveCamera(45,2,1,1000)  // 视角(单位是度)、视锥体长宽比(width/height)、近截面、远截面
camera.position.set(300,400,300)
camera.lookAt(scene.position)
```
如果将视野角度fov变小，则物体在页面上会变大。原因是视野角度变小后，视景窗口就变小了，而物体大小实际是不会变的，但相对视景窗口来说就变大了。


## 灯光

## 阴影

## 几何体

## 平移、旋转、缩放