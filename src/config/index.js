// 导入模块
import apiList from './api'
console.log(process.env.NODE_ENV)
const install = function (Vue) {
  // if (install.installed) return
  // install.installed = true

  // 定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    $api: {
      get () {
        return apiList
      }
    }
  })
}

export default {
  install
}
