class SingDog {
  show() {
    console.log('单例对象')
  }
  static getInstance() {
    if (!SingDog.instance) {
      SingDog.instance = new SingDog()
    }
    return SingDog.instance
  }
}

// SingDog.getInstance = (function() {
//   let instance = null
//   return function() {
//     if (!instance) {
//       instance = new SingDog()
//     }
//     return instance
//   }
// })()

// const s1 = SingDog.getInstance()
// const s2 = SingDog.getInstance()
// console.log(s1 === s2)
// console.log(s1)

class Storage {
  static getInstance() {
    if (!Storage.instance) {
      Storage.instance = new Storage()
    }
    return Storage.instance
  }
  getItem(key) {
    return localStorage.getItem(key)
  }
  setItem(key, value) {
    return localStorage.setItem(key, value)
  }
}
const s1 = Storage.getInstance()
const s2 = Storage.getInstance()
console.log(s1.getItem())

let obj1 = { name: 'zgh', age: 22 }
let obj2 = { address: 'beijing' }
let obj = {}
Object.assign(obj, obj1, obj2)
