import * as VueRouter from 'vue-router'

import routes from './routes'

const router = VueRouter.createRouter({
  // mode: process.env.VUE_APP_HASH ? 'hash' : 'history',
  // base: process.env.VUE_APP_HASH ? '/' : process.env.BASE_URL,
  // history: process.env.VUE_APP_HASH ? VueRouter.createWebHashHistory() : VueRouter.createWebHistory,
  history: VueRouter.createWebHistory(),
  routes
})

export default router
