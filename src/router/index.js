import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/404',
    name: 'Error',
    component: () => import('@/common/pages/Error')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/common/pages/Login')
  },
  {
    path: '/index',
    name: 'HelloWorld',
    component: () => import('@/view/HelloWorld/home')
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/view/demo/home')
  },
  {
    path: '/icon',
    name: 'Icon',
    component: () => import('@/view/Icon')
  },
  {
    path: '/digitalRain',
    name: 'DigitalRain',
    component: () => import('@/view/DigitalRain')
  },
  {
    path: '*',
    redirect: '/404'
  }
]
console.log('静态路由加载');
const router = new Router({
  routes
})
// router.addRoutes([
//   {
//     path: '/wu',
//     name: 'wu',
//     component: () => import('@/view/wu/index')
//   }
// ])
export default router
