import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'HelloWorld',
      component: () => import('@/view/HelloWorld/home')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/login/home')
    },
    {
      path: '/hel',
      name: 'hel',
      component: () => import('@/view/hel/index')
    },
    {
      path: '/wu',
      name: 'wu',
      component: () => import('@/view/wu/index')
    }
  ]
})
