import axios from 'axios';
import {
  Message
} from 'element-ui';
import router from '../router'

axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'http://www.51jl.store/api';
axios.defaults.baseURL = 'http://www.4399.com/api';

//http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
//     // config.data = JSON.stringify(config.data);
//     let token = "token:" + localStorage.getItem('token')
//     // config.headers = {
//     //   'Content-Type': 'application/x-www-form-urlencoded'
//     // }
//     console.log(config)
//     // if(token){
//     //   config.params = {'token':token}
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
    if (response.data.code == 10002) {
      Message({
        showClose: true,
        message: '登录过期',
        type: 'error',
        duration: 1000
      })
      localStorage.clear()
      router.push({
        path: "/login",
        querry: {
          redirect: router.currentRoute.fullPath
        } //从哪个页面跳转
      })
    }
    return response;
  },
  error => {
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
      params: params
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

// export function patch(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.patch(url, data)
//       .then(response => {
//         resolve(response.data);
//       }, err => {
//         reject(err)
//       })
//   })
// }

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function put(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.put(url, data)
//       .then(response => {
//         resolve(response.data);
//       }, err => {
//         reject(err)
//       })
//   })
// }
