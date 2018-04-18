// 接口配置
// 服务器接口根地址
// var config = require('../../config')
var isProduction = process.env.NODE_ENV === 'production'

if (isProduction) {
  console.log(
    '%c 如果你看到这条 log , 说明当前是生产环境',
    'font-size:14px;color:#f00;background:#000'
  )
  // export const SERVER_BASE_URL = 'http://report.wsloan.com:8888/labelManage/'
} else {
  console.log(
    '%c 如果你看到这条 log , 说明当前是开发环境',
    'font-size:14px;color:#f00;background:#000'
  )
}
// 服务器地址
// export const SERVER_BASE_URL = isProduction ? 'http://gank.io' : 'www.baidu.com'

function isTest(url) {
  return /192|36\.7|localhost/.test(url)
}
export const SERVER_BASE_URL = !isTest(location.href)
  ? 'http://report.wsloan.com:8888/labelManage/'
  // : 'http://192.168.22.102:6126/'
  // : 'http://192.168.22.93:6126/'
   : 'http://192.168.3.26:6126/'
// export const SERVER_BASE_URL = 'http://gank.io/api'
// global.SERVER_BASE_URL='http://localhost:9999/fwone-central'
export const ERR_OK = 0
// 'http://192.168.3.26:6126/'
// 'http://192.168.22.93:6126/'
