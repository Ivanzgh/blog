# 数据结构

## 栈

栈是内存中一块用于存储局部变量和函数参数的线性结构，遵循**后进先出**（LIFO）的原则

栈中的变量在函数调用结束后就会被销毁

```js
class Stack {
  constructor() {
    this.items = [];
  }
  // 入栈
  push(element) {
    this.items.push(element);
  }
  // 出栈
  pop() {
    this.items.pop();
  }
  // 末位
  get peek() {
    return this.items[this.items.length - 1];
  }
  // 是否为空栈
  get isEmpty() {
    return !this.items.length;
  }
  // 长度
  get size() {
    return this.items.length;
  }
  // 清空
  clear() {
    this.items = [];
  }
}

const stack = new Stack();
console.log(stack.isEmpty);
stack.push('z');
stack.push('g');
console.log(stack);
console.log(stack.size);
```

## 队列

遵循**先进先出**（FIFO）原则

```js
class Queue {
  constructor(items) {
    this.items = items || [];
  }
  // 入队列
  enqueue(element) {
    this.items.push(element);
  }
  // 出队列
  dequeue() {
    this.items.shift();
  }
  // 首位
  front() {
    return this.items[0];
  }
  // 是否为空队列
  get isEmpty() {
    return !this.items.length;
  }
  // 长度
  get size() {
    return this.items.length;
  }
  // 清空
  clear() {
    this.items = [];
  }
}
const queue = new Queue();
console.log(queue.isEmpty);
queue.enqueue('z');
queue.enqueue('g');
queue.enqueue('h');
console.log(queue.size);
queue.enqueue(); // 插入undefined
queue.dequeue();
console.log(queue);
```

## 链表

链表由一系列节点组成

相较于数组的优势：

1. 链表可以动态的添加或删除节点，而不需要移动其他节点
2. 链表的大小可以根据需要增大或缩小，而不需要预先分配固定大小的空间

### 单向链表

每个节点包含一个数据元素和一个指向下一个节点的指针

```js
// 链表的节点
class Node {
  constructor(element) {
    // 存储节点数据
    this.element = element;
    // 用于指向下一个节点
    this.next = null;
  }
}

// 链表
class LinkedList {
  constructor() {
    // 指向链表的头节点
    this.head = null;
    // 链表中节点的数量
    this.length = 0;
  }

  // append()方法用于向链表末尾添加一个新的节点。
  // 如果链表为空，则将该节点设置为链表的头节点；
  // 否则遍历链表，直到找到最后一个节点，然后将该节点添加到其后面
  append(element) {
    const node = new Node(element);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  // insert()方法用于向链表的任意位置插入一个新的节点。
  // 如果插入位置不合法，则返回false。
  // 如果插入位置是0，则将该节点设置为链表的头节点；并将以前的头节点设置为该节点的下一个节点
  // 否则从链表头开始遍历链表，找到需要插入位置的前一个节点，然后将该节点插入到其后面。
  insert(position, element) {
    if (position < 0 || position > this.length) {
      return false;
    }
    const node = new Node(element);
    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let index = 0;
      let previous = null;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      node.next = current;
      previous.next = node;
    }
    this.length++;
    return true;
  }

  // remove()方法用于从链表中删除一个指定节点。
  // 如果找到该节点，则将其从链表中删除，并返回true；否则返回false。
  remove(element) {
    let current = this.head;
    let previous = null;
    while (current) {
      if (current.element === element) {
        if (!previous) {
          this.head = current.next;
        } else {
          previous.next = current.next;
        }
        this.length--;
        return true;
      }
      previous = current;
      current = current.next;
    }
    return false;
  }

  // removeAt()方法用于从链表中删除一个指定位置的节点。
  // 如果指定位置合法，则将该节点从链表中删除，并返回该节点的数据；否则，返回null。
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return null;
    }
    let current = this.head;
    if (position === 0) {
      this.head = current.next;
    } else {
      let index = 0;
      let previous = null;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      previous.next = current.next;
    }
    this.length--;
    return current.element;
  }

  // indexOf()方法用于查找链表中某个元素的位置。
  // 如果找到该元素，则返回其在链表中的位置（从0开始）；否则返回 -1
  indexOf(element) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.element === element) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  getHead() {
    return this.head;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }
}
```

调用 LinkedList 类的构造函数，创建链表实例：

```js
const linkedList = new LinkedList();

linkedList.append(10); // 向链表末尾添加一个节点，节点值为10
linkedList.append(20); // 向链表末尾添加一个节点，节点值为20
linkedList.insert(1, 15); // 在索引为1的位置插入一个节点，节点值为15
const removedValue = linkedList.removeAt(1); // 从链表中删除索引为1的节点，并返回该节点的值
console.log(removedValue); // 15
console.log(linkedList.indexOf(20)); // 1

linkedList.remove(10); // 从链表中删除值为10的节点
console.log(linkedList.size()); // 1
console.log(linkedList.isEmpty()); // false

console.log(linkedList);
```

### 双向链表

双向链表是一种常见的数据结构，与单向链表相比，多了一个指向前驱节点的指针。这样就可以在单向遍历链表时，也能够方便地反向遍历

```js
class Node {
  constructor(element) {
    // 存储节点数据
    this.element = element;
    // 指向后继节点
    this.next = null;
    // 指向前驱节点
    this.prev = null;
  }
}

// 双向链表
class DoublyLinkedList {
  constructor() {
    // 指向链表的头节点
    this.head = null;
    // 指向链表的尾节点
    this.tail = null;
    this.length = 0;
  }

  // append()方法用于向链表末尾添加一个新的节点。
  // 如果链表为空，则将该节点设置为链表的头尾节点；
  // 否则遍历链表，直到找到最后一个节点，然后将该节点添加到其后面
  append(element) {
    const node = new Node(element);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }

  // insert()方法用于向链表的任意位置插入一个新的节点。
  // 如果插入位置不合法，则返回false。
  // 如果插入位置是0，则将该节点设置为链表的头节点；如果插入位置是链表的长度，则将该节点设置为链表的尾节点；
  // 否则从链表头开始遍历链表，找到需要插入位置的前一个节点，然后将该节点插入到其后面
  insert(position, element) {
    if (position < 0 || position > this.length) {
      return false;
    }
    const node = new Node(element);
    if (this.length === 0) {
      this.head = node;
      this.tail = node;
    } else if (position === 0) {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    } else if (position === this.length) {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    } else {
      let current = this.head;
      let index = 0;
      while (index < position) {
        current = current.next;
        index++;
      }
      node.prev = current.prev;
      node.next = current;
      current.prev.next = node;
      current.prev = node;
    }
    this.length++;
    return true;
  }

  // remove()方法用于从链表中删除一个指定节点。
  // 如果找到该节点，则将其从链表中删除，并返回true；否则返回false
  remove(element) {
    let current = this.head;
    while (current) {
      if (current.element === element) {
        if (current === this.head && current === this.tail) {
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          this.head = current.next;
          this.head.prev = null;
        } else if (current === this.tail) {
          this.tail = current.prev;
          this.tail.next = null;
        } else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
        this.length--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  // removeAt()方法用于从链表中删除一个指定位置的节点。
  // 如果指定位置合法，则将该节点从链表中删除，并返回该节点的数据；否则返回null
  removeAt(position) {
    if (position < 0 || position >= this.length) {
      return null;
    }
    let current = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else if (position === 0) {
      this.head = current.next;
      this.head.prev = null;
    } else if (position === this.length - 1) {
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = null;
    } else {
      let index = 0;
      while (index < position) {
        current = current.next;
        index++;
      }
      current.prev.next = current.next;
      current.next.prev = current.prev;
    }
    this.length--;
    return current.element;
  }

  // indexOf()方法用于查找链表中某个元素的位置。
  // 如果找到该元素，则返回其在链表中的位置（从0开始）；否则返回-1
  indexOf(element) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.element === element) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }
}
```

创建链表实例：

```js
const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.append(10); // 向链表末尾添加一个节点，节点值为10
doublyLinkedList.append(20); // 向链表末尾添加一个节点，节点值为20
doublyLinkedList.insert(1, 15); // 在索引为1的位置插入一个节点，节点值为15
const removedValue = doublyLinkedList.removeAt(1); // 从链表中删除索引为1的节点，并返回该节点的值
console.log(removedValue); // 15
console.log(doublyLinkedList.indexOf(20)); // 1

doublyLinkedList.remove(10); // 从链表中删除值为10的节点
console.log(doublyLinkedList.size()); // 1
console.log(doublyLinkedList.isEmpty()); // false

console.log(doublyLinkedList);
```

### 双向链表与单向链表的区别

- 单向链表只有一个 next 指针，指向后继节点；而双向链表则有两个指针，分别指向前驱节点和后继节点
- 在双向链表中，可以方便地从任意一个节点开始向前或者向后遍历整个链表，而在单向链表中，则只能从头节点开始顺序查找
- 由于双向链表需要额外的 prev 指针，因此其占用的内存空间可能会比单向链表更大

## 堆

堆是一种常见的数据结构，它通常用来实现优先队列等高效的算法。堆可以看作是一棵完全二叉树，其中每个节点都满足父节点的值大于（或小于）子节点的值。由于堆内部的元素并不会严格按照层级顺序排列，因此通常使用数组来存储堆。

在 JavaScript 中，可以使用数组来表示堆。对于一个给定的节点 i，它的父节点为 `(i - 1) / 2`，左子节点为 `2 * i + 1`，右子节点为 `2 * i + 2`

### 创建堆

```js
// 最小堆
class MinHeap {
  constructor() {
    // 存储堆中的元素
    this.heap = [];
  }

  // 获取指定节点的左子节点的索引
  getLeftIndex(index) {
    return 2 * index + 1;
  }

  // 获取指定节点的右子节点的索引
  getRightIndex(index) {
    return 2 * index + 2;
  }

  // 获取指定节点的父节点的索引
  getParentIndex(index) {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }

  // 向堆中插入一个新元素
  insert(value) {
    if (value !== null) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  // 将指定节点上移，以保证堆的性质。
  // 如果父节点的值大于当前节点的值，则将两个节点交换位置，并继续向上比较
  siftUp(index) {
    let parent = this.getParentIndex(index);
    while (index > 0 && this.heap[parent] > this.heap[index]) {
      this.swap(parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }

  // 交换堆中两个元素的位置
  swap(i1, i2) {
    const temp = this.heap[i1];
    this.heap[i1] = this.heap[i2];
    this.heap[i2] = temp;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  // 查找堆中的最小元素。
  // 由于堆是一个最小堆，因此最小元素一定位于堆的根节点
  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  // 从堆中删除并返回最小元素。
  // 1. 首先检查堆是否为空，如果为空则返回undefined
  // 2. 如果堆中只有一个元素，则直接删除并返回该元素
  // 3. 否则将根节点的值替换为堆中最后一个元素的值，并使用siftDown()方法将其下移
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.siftDown(0);
    return removedValue;
  }

  // 将指定节点下移，以保证堆的性质。
  // 如果当前节点存在左子节点和右子节点，那么找到其中较小的子节点，并判断是否需要交换位置。如果需要交换，则继续向下比较
  siftDown(index) {
    let element = index;
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();
    if (left < size && this.heap[element] > this.heap[left]) {
      element = left;
    }
    if (right < size && this.heap[element] > this.heap[right]) {
      element = right;
    }
    if (index !== element) {
      this.swap(index, element);
      this.siftDown(element);
    }
  }
}
```

### 堆的应用

1. 堆常被用于实现优先队列等高效的算法，例如 Dijkstra 算法、Prim 算法和 Huffman 编码等
2. 最小堆可以用于实现堆排序算法

## 图

## 树

树由节点和边组成。每个节点包含一个值和指向其他节点的指针，而边则表示节点之间的关系。

树通常用于表示具有层级关系的数据，例如文件系统、HTML 文档等。

树中最顶层的节点称为**根节点**，每个节点可以拥有任意数量的子节点，而没有子节点的节点称为**叶子节点**。如果一个节点有多个父节点，则该树就不再是一棵树，而是一个图。

在树结构中，每个节点都可以有零个或多个子节点，而每个子节点又可以有自己的子节点。如果一个节点有且仅有一个父节点，则该节点称为树中的**普通节点**；反之，如果一个节点没有父节点，则该节点称为根节点。

树数据结构有很多种类型，其中一些常见的类型如下：

1. **二叉树**：每个节点最多拥有两个子节点的树，左子节点比父节点小，右子节点比父节点大
2. **AVL 树**：一种自平衡二叉搜索树，其任何节点的两个子树的高度差最多为 1
3. **红黑树**：一种自平衡二叉搜索树，能够保证在最坏情况下基本动态集合操作的时间复杂度为 O(log n)
4. **B 树**：一种自平衡多路搜索树，它允许每个节点拥有更多的子节点，从而可以在相同的高度下存储更多的关键字

树结构的优点：

- **搜索效率高**：由于树结构中的值具有层级关系，因此可以很快地进行搜索操作
- **插入和删除方便**：在树结构中，插入和删除节点非常方便，只需要改变指针的指向即可
- **空间利用率高**：相对于数组和链表等线性数据结构，树结构能够更好地利用内存空间

树结构的缺点：

- **难以保持平衡**：如果树结构不平衡，则可能导致搜索、插入和删除操作的时间复杂度退化成 O(n)，其中 n 为树中节点的数量
- **可能存在环路**：如果一个节点的祖先节点和后代节点之间存在连通路径，则会形成环路，这可能导致无限循环或死循环

## 二叉树

二叉树是一种特殊的树结构，它的**每个节点最多只有两个子节点**，分别称为**左子节点**和**右子节点**。如果一个节点没有子节点，则称其为**叶子节点**

```js
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // 用于创建新的节点，每个节点应包含一个值和指向左右子节点的指针
  Node(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }

  // 向树中插入一个新节点。如果树为空，则该节点为根节点
  insert(key) {
    const newNode = new this.Node(key);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  // 辅助 insert() 方法，用于查找正确的位置并将节点插入到树中
  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // 在树中搜索给定的键值。如果该值存在于树中，则返回 true，否则返回 false
  search(key) {
    return this.searchNode(this.root, key);
  }

  // 辅助 search() 方法，用于在树中查找给定的键值
  searchNode(node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return this.searchNode(node.left, key);
    } else if (key > node.key) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  // 从树中删除给定的键值
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  // 辅助 remove() 方法，删除树中给定键值的节点
  removeNode(node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      const aux = this.findMinNode(node.right);
      node.key = aux.key;
      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  }

  // 查找树中最小的节点。在二叉搜索树中，最小的节点位于树的最左侧
  findMinNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  // 获取根节点
  getRootNode() {
    return this.root;
  }

  // 按照顺序遍历树，并打印每个节点的键值。在二叉搜索树中，这将以从小到大的顺序遍历所有节点
  inorder(node) {
    if (node !== null) {
      this.inorder(node.left);
      console.log(node.key);
      this.inorder(node.right);
    }
  }

  // 按照先序遍历树，并打印每个节点的键值。在先序遍历中，将按照根节点、左子树和右子树的顺序遍历所有节点
  preorder(node) {
    if (node !== null) {
      console.log(node.key);
      this.preorder(node.left);
      this.preorder(node.right);
    }
  }

  // 按照后序遍历树，并打印每个节点的键值。在后序遍历中，将按照左子树、右子树和根节点的顺序遍历所有节点
  postorder(node) {
    if (node !== null) {
      this.postorder(node.left);
      this.postorder(node.right);
      console.log(node.key);
    }
  }
}
```
