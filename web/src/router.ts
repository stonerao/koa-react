import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/registered',
      name: 'registered',
      meta: {
        name: "注册"
      },
      component: () => import('./views/registered.vue')
    }, {
      path: '/login',
      name: 'login',
      meta: {
        name: "登录"
      },
      component: () => import('./views/login.vue')
    }
  ]
})
