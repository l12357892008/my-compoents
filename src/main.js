// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/utils/utils.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js'
import {post,get} from '@/utils/http'   // axois封装
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/css.js'
import bilibili from '@/utils/bilibili.js'

console.log('main.js加载');

Vue.config.productionTip = false  // 设置成false取消vue启动时生成生产提示

if(process.env.NODE_ENV != 'development'){  // 生产环境
  Vue.config.silent = true // 取消 Vue 所有的日志与警告，生成环境下使用
}

Vue.use(ElementUI)
Vue.prototype.$post=post;  // use way: this.$post(url,data).then(res => {})
Vue.prototype.$get=get;

// router.beforeEach((to, from, next) => {  // 根据路由来动态配置标签标题
//     console.log(to);
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
//     next()
// })
window.document.title = 'WDNMD'  // 动态修改标签标题
// console.log(window.document.getElementById('QW').href);
// window.document.getElementById('QW').href = './tryitimg.gif';  // 动态修改图标，文件最好放static里
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
