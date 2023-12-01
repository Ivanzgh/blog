// // 订阅器模型
const Dep = {
  // 容器
  container: {},
  // 添加订阅
  listen(key, fn) {
    ;(this.container[key] || (this.container[key] = [])).push(fn)
  },
  // 发布
  trigger() {
    let key = Array.prototype.shift.call(arguments),
      fns = this.container[key]
    if (!fns || fns.length === 0) {
      return
    }
    for (let i = 0, len = fns.length; i < len; i++) {
      fns[i].apply(this, arguments)
    }
    // for (let i = 0, fn; (fn = fns[i++]); ) {
    //   fn.apply(this, arguments);
    // }
  }
}

// 数据劫持
const dataRes = ({ data, tag, dataKey, selector }) => {
  let value = '',
    el = document.querySelector(selector)

  Object.defineProperty(data, dataKey, {
    get: () => {
      return value
    },
    set: (val) => {
      value = val
      Dep.trigger(tag, val)
    }
  })

  Dep.listen(tag, (text) => {
    el.innerHTML = text
  })
}
