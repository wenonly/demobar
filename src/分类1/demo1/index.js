// import './static/main.css'

let a ={
  x: 1,
  y: {
    z: a
  }
}

a.y.z = a
let b = cloneDeepUpdate(a)
// let b = cloneDeep(a)
a.x = 2
console.log(a, b)

// 手写一个深拷贝
function cloneDeep(arg) {
  // 如果不是引用类型或者是null就直接返回
  if (typeof arg !== 'object' || arg === null) {
    return arg
  }

  const obj = arg instanceof Array ? [] : {}

  for (let key in arg) {
    // 对象上存在不是原型存在字段
    if (arg.hasOwnProperty(key)) {
      obj[key] = cloneDeep(arg[key])
    }
  }

  return obj
}

// 手写一个深拷贝, 解决循环引入的问题
function cloneDeepUpdate(arg, map = new WeakMap()) {
  // 如果map中有就直接返回
  if (map.get(arg)) return arg

  // 如果不是引用类型或者是null就直接返回
  if ((typeof arg !== 'object' && typeof arg !== 'function') || arg === null) {
    return arg
  }

  // 对拷贝过的对象进行存储
  map.set(arg, true)
  const obj = arg instanceof Array ? [] : {}

  for (let key in arg) {
    // 对象上存在不是原型存在字段
    if (arg.hasOwnProperty(key)) {
      obj[key] = cloneDeepUpdate(arg[key], map)
    }
  }

  return obj
}
