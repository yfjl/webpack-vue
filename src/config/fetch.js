// 导入模块
import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
import { SERVER_BASE_URL } from './config'
// import router from '@/router'
import iView, { Notice } from 'iview'
// import store from '@/store'
Vue.use(iView)

const isProduction = process.env.NODE_ENV === 'production'


export default function fetch(options) {
  const params = options.params
  return new Promise((resolve, reject) => {
    // 自定义实例
    const instance = axios.create({
      baseURL: SERVER_BASE_URL,
      timeout: 5000,
      headers: {
        // "Content-Type": "application/json;charset=utf-8"
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
      }
    })

    // http request 拦截器
    instance.interceptors.request.use(
      config => {
        iView.LoadingBar.start()
        // config.data = Qs.stringify(config.data);
        return config
      },
      err => {
        iView.LoadingBar.error()
        return Promise.reject(err)
      }
    )

    // http response 拦截器
    instance.interceptors.response.use(
      response => {
        iView.LoadingBar.finish()
        return response
      },
      error => {
        iView.LoadingBar.error()
        if (error) {
        }
        return Promise.reject(error) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options)
      .then(({ data }) => {
        if (data.code === 0 || data.code === 400) {
          resolve(data)
        }else if(data.code === 700){
          resolve(data)
        }  else {
          Notice.error({
            title: '出错了！',
            desc: '错误原因 ' + data.msg,
            duration: 0
          })
          return false
        }


      })
      .catch(error => {
        Notice.error({
          title: '出错了！',
          desc: '错误原因 ' + JSON.stringify(error),
          duration: 0
        })
        reject(error)
      })
  })
}
