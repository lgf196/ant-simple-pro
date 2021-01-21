import * as VueRouter from 'vue-router'

import routes from './routes'

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(process.env.BASE_URL),
  routes
})

export default router
