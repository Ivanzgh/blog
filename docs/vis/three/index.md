# Three

## 材质

## 相机

### 正交相机

在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。

```sh
OrthographicCamera( left, right, top, bottom, near, far)
```

- left — 视锥体左侧面
- right — 右侧面
- top — 上侧面
- bottom — 下侧面
- near — 近截面，默认值 0.1
- far — 远截面，默认值 2000

![image](https://cdn.jsdelivr.net/gh/Ivanzgh/ossimg@main/blog/1661154309.png)

```js
const k = window.innerWidth / window.innerHeight
const s = 200
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000) // 左截面、右截面、上截面、下截面、近截面、远截面
camera.position.set(300, 400, 300)
camera.lookAt(scene.position)
```

### 透视相机

这一投影模式被用来模拟人眼所看到的景象

```sh
PerspectiveCamera( fov, aspect, near, far )
```

- fov — 视野角度，默认值 50
- aspect — 视锥体长宽比，默认值 1(正方形画布)
- near — 近截面，默认值 0.1
- far — 远截面，默认值 2000

只有离相机的距离大于 near 值，小于 far 值，且在相机的可视角度之内，才能被相机投影到。

![image](https://cdn.jsdelivr.net/gh/Ivanzgh/ossimg@main/blog/1661154261.png)
![image](https://cdn.jsdelivr.net/gh/Ivanzgh/ossimg@main/blog/1661154286.png)
![image](https://cdn.jsdelivr.net/gh/Ivanzgh/ossimg@main/blog/1661154296.png)

示例：

```js
const camera = new THREE.PerspectiveCamera(45, 2, 1, 1000) // 视角(单位是度)、视锥体长宽比(width/height)、近截面、远截面
camera.position.set(300, 400, 300)
camera.lookAt(scene.position)
```

如果将视野角度 fov 变小，则物体在页面上会变大。原因是视野角度变小后，视景窗口就变小了，而物体大小实际是不会变的，但相对视景窗口来说就变大了。

## 灯光

### 平行光

默认`position`位置在`(0, 1, 0)`，指向原点`(0, 0, 0)`。可设置`target`属性为场景中的其他任意有`position`属性的对象

一种方式是创建`Object3D`对象

```js
const targetObject = new THREE.Object3D()
const v1 = { x: 84768.72257683857, y: 31758.999152786924, z: 0 }
targetObject.position.copy(v1)
scene.add(targetObject)

const light = new THREE.DirectionalLight(0xffffff, 0.4)
light.target = targetObject
scene.add(light)
```

另一种方式是在场景中创建网格模型`mesh`。聚光灯设置`target`属性和平行光的方式一样

```js
const spotLight = new THREE.SpotLight(0x00ff00)

const cubeGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001)
const cubeMaterial = new THREE.MeshLambertMaterial({ color: 'yellow' })
const mesh = new THREE.Mesh(cubeGeometry, cubeMaterial)

const v1 = { x: 84768.72257683857, y: 31758.999152786924, z: 0 }
mesh.position.copy(v1)
spotLight.target = mesh

scene.add(spotLight)
scene.add(mesh)
```

### 聚光灯

```js
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(100, 1000, 100)
scene.add(spotLight)
```

辅助工具

```js
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
```

## 阴影

## 几何体

## 平移、旋转、缩放

## 着色器

## 工具

### stats.js

性能监控

<https://github.com/mrdoob/stats.js>

```js
// <script src="https://cdn.jsdelivr.net/npm/three@0.97.0/examples/js/libs/stats.min.js"></script>

const stats = new Stats()
stats.domElement.style.zIndex = 100
document.getElementById('map').appendChild(stats.domElement)

function animation() {
  stats.update()
  requestAnimationFrame(animation)
}
animation()
```

### dat.gui

控制器

<https://github.com/dataarts/dat.gui>

### tween.js

动画引擎

<https://github.com/tweenjs/tween.js>
