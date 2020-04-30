// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js'
import {post,get} from '@/utils/http'   // axois封装
import ElementUI from 'element-ui'
import BaiduMap from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/element-theme.scss'  // elementui主题色修改
import '@/assets/css/css.js'
import bilibili from '@/utils/bilibili.js'

console.log('main.js加载');

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'kj5X1TWZYyxA6d8LsTDT0MwiqNqsmlqw'
})
Vue.prototype.$post=post;  // use way: this.$post(url,data).then(res => {})
Vue.prototype.$get=get;

// router.beforeEach((to, from, next) => {
//     console.log(to);
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
//     next()
// })
window.document.title = 'WDNMD'
// console.log(window.document.getElementById('QW').href);
// window.document.getElementById('QW').href = './tryitimg.gif';
// console.log(window.document.getElementById('QW').href);
bilibili()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
    console.log('new Vue加载');
  },
})
