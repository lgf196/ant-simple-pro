import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './index'
// import store from './store'
import { getToken } from '@/utils/local'

const whiteList = ['/login']
const loginPagePath = '/login'
const homePagePath = '/home'

router.beforeEach((to, _, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === loginPagePath) {
      // 重定向到首页
      next({ path: homePagePath })
      NProgress.done()
    } else {
      // permission control
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      // 在免登录白名单列表，直接放行
      next()
    } else {
      // 重定向到登录页
      next({ path: loginPagePath })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export {}
