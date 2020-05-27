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
    path: '/404-2',
    name: 'Error2',
    component: () => import('@/common/pages/Error2')
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
    path: '/gallery3D',
    name: 'gallery3D',
    component: () => import('@/view/gallery3D')
  },
  {
    path: '/waterMark',
    name: 'WaterMark',
    component: () => import('@/view/WaterMark')
  },
  {
    path: '/svgFont',
    name: 'SVGFont',
    component: () => import('@/view/SVGFont')
  },
  {
    path: '/7CSS',
    name: '7CSS',
    component: () => import('@/view/7CSS')
  },
  {
    path: '/VerifiedFont',
    name: 'VerifiedFont',
    component: () => import('@/view/VerifiedFont')
  },
  {
    path: '*',
    redirect: '/404-2'
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
