// 所需依赖:npm install axios,elementui -S
/**
 * @description http请求封装
*/

import axios from 'axios';
import {
  Message
} from 'element-ui';
import router from '../router'

axios.defaults.timeout = 10000;  // 默认超时时间
axios.defaults.baseURL = '';  // 默认域名
// axios.defaults.withCredentials = true; // 跨域请求如果要携带cookie就要加这一句
// 设置默认请求数据格式，在request拦截器里设置也可以，axios默认为application/json
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequset = data => qs.stringify(data)  // 用于统一作数据转换,qs基本不需要了,用axios的params自己就可以处理

//http request 拦截器，用于动态统一设置头部之类的
// axios.interceptors.request.use(
//   config => {
//     // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
//     // config.data = JSON.stringify(config.data);
//     let token = "token:" + localStorage.getItem('token')
//     // config.headers = {
//     //   'Content-Type': 'application/x-www-form-urlencoded'
//     // }
//     // if(token){ // 看后台需要从哪里取token就给他在哪里带上
//     //   config.params = {'token':token}
//     // }
//     // if(token){ 
//     //   config.headers.Authorization = token
//     // }
//     return config;
//   },
//   error => {
//     return Promise.reject(err);
//   }
// );


//http response 拦截器
axios.interceptors.response.use(
  response => {
    // if (response.data.code == 10002) {
    //   Message({
    //     showClose: true,
    //     message: '登录过期',
    //     type: 'error',
    //     duration: 1000
    //   })
    //   localStorage.clear()
    //   router.push({
    //     path: "/login",
    //     querry: {
    //       redirect: router.currentRoute.fullPath
    //     } //从哪个页面跳转
    //   })
    // }
    return response;
  },
  error => {
    if(error.message.includes('timeout')){
      Message({
        message: '连接超时,请检查您的网络状况后刷新页面',
        type: 'error'
      })
    }
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
    }).then(response => {
      resolve(response.data);
    }).catch(err => {
      reject(err)
    })
  })
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  let token = localStorage.getItem('token')
  return new Promise((resolve, reject) => {
    axios.post(url, {...data, token}).then(response => {
      resolve(response.data);
    }, err => {
      reject(err)
    })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

