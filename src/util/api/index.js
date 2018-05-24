import router from '../../router'
import { Message, MessageBox } from 'element-ui'
// api接口地址
// var root = '/blade'
var root = process.env.NODE_ENV === 'development' ? '/blade' : ''

// 引用axios
var axios = require('axios')

// 判断元素类型
let toType = (obj) => {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤
let filterNull = (o) => {
  for (let key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

// axios封装
let apiAxios = (method, url, params, success, fail) => {
  if (params) {
    params = filterNull(params)
  }
  if (method === 'POST' && toType(params) !== 'formdata') {
    var qs = require('querystring')
    params = qs.stringify(params)
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': 0
    },
    dataType: 'json'
  }).then(
    res => {
      let response = res.data
      if (!response.code) { // 分页接口不存在code
        success(response)
      } else if (response.code === 401) { // 后端约定未登录code=401
        MessageBox.alert(response.message, '温馨提示', {
          confirmButtonText: '确定',
          callback: () => {
            router.replace({
              path: 'login',
              query: {redirect: router.currentRoute.fullPath}
            })
          }
        })
      } else if (response.success === true) {
        if (success) { success(response) }
      } else {
        if (fail) { fail(response) } else { Message.error(response.message) }
      }
    }
  ).catch(err => {
    let res = err.response
    if (res) { Message.error(`HTTP CODE:${res.status}`) } else {
      console.log(err)
    }
  })
}

// 可调用接口
export default {
  get: (url, params, success, fail) => {
    return apiAxios('GET', url, params, success, fail)
  },
  post: (url, params, success, fail) => {
    return apiAxios('POST', url, params, success, fail)
  },
  put: (url, params, success, fail) => {
    return apiAxios('PUT', url, params, success, fail)
  },
  delete: (url, params, success, fail) => {
    return apiAxios('DELETE', url, params, success, fail)
  },
  root
}
