import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken
} from '@/utils/auth'
import { _encode } from './encode-token'
import { tokenRefresh } from '../api/user'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 9000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // store.getters.token
    if (store.getters.accessToken) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getAccessToken()

      // let abc = _encode(getAccessToken())
      config.headers['Authorization'] = _encode(getAccessToken())
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    // if (response.status !== 200) {
    //   Message({
    //     message: response.msg || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })

    if (![200, 201, 202, 204].includes(response.status)) {
      Message({
        message: response.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   // to re-login
      //   MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
      //     confirmButtonText: 'Re-Login',
      //     cancelButtonText: 'Cancel',
      //     type: 'warning'
      //   }).then(() => {
      //     store.dispatch('user/resetToken').then(() => {
      //       location.reload()
      //     })
      //   })
      // }

      // return Promise.reject(new Error(res.message || 'Error'))
      return Promise.reject(new Error(response.msg || 'Error'))
    } else {
      const {
        data: { error_code },
        status
      } = response
      // if (response.data.error_code === 0 ) {
      //   Message({
      //     message: response.data.msg || '操作成功',
      //     type: 'success',
      //     duration: 5 * 1000
      //   })
      // }

      // 成功提示消息
      if (error_code === 0 && [200, 201].includes(status)) {
        Message({
          message: response.data.msg || '操作成功',
          type: 'success',
          duration: 5 * 1000
        })
      } else if (error_code === 0 && status === 202) {
        // 更新提示消息
        Message({
          message: response.data.msg || '数据已更新',
          type: 'warning',
          duration: 5 * 1000
        })
      }

      return res
    }
  },
  (error) => {
    console.log('err' + error) // for debug

    // accessToken过期后通过refreshToken拉取新的accessToken和refreshToken
    if (
      error.request.status === 401 &&
      JSON.parse(error.request.response).error_code === 50000
    ) {
      tokenRefresh(_encode(getRefreshToken()))
        .then((response) => {
          const {
            accessToken = undefined,
            refreshToken = undefined
          } = response.data
          setAccessToken(accessToken)
          setRefreshToken(refreshToken)
          location.reload()
        })
        .catch((error) => {
          // refreshToken过期，通过上面tokenRefresh抛出错误来识别，弹出重登陆框
          if (
            error.request.status === 401 &&
            JSON.parse(error.request.response).error_code === 55000
          ) {
            MessageBox.confirm('已登出, 请刷新页面或退出再登陆', '超时', {
              confirmButtonText: '登陆',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
            })
          }
        })
    } else {
      const message = JSON.parse(error.request.response).msg
      Message({
        message: message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
