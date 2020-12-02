import BasicLayout from '@/layouts/basic'
import BlankLayout from '@/layouts/blank'
import NotFound from '@/views/exception/notfound'

export const basicRoutes = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    meta: {
      title: '首页',
      affix: true
    }
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/user/userinfo'),
    meta: {
      title: '用户信息'
    }
  },
  {
    path: '/globalization',
    name: 'globalization',
    component: () => import('@/views/globalization'),
    meta: {
      title: '国际化'
    }
  },
  {
    path: '/system',
    name: 'system',
    component: BlankLayout,
    children: [
      {
        path: '/system/menu',
        component: () => import('@/views/system/menu'),
        meta: {
          title: '菜单管理'
        }
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: () => import('@/views/user'),
    meta: {
      title: '用户管理'
    }
  },
  {
    path: '/component',
    name: 'component',
    component: BlankLayout,
    children: [
      {
        path: '/component/chart',
        component: () => import('@/views/component/chart'),
        meta: {
          title: '图表组件'
        }
      },
      {
        path: '/component/everUse',
        component: () => import('@/views/component/common'),
        meta: {
          title: '常用组件'
        }
      },
      {
        path: '/component/form',
        component: () => import('@/views/component/form'),
        meta: {
          title: '表单组件'
        }
      },
      {
        path: '/component/table',
        component: () => import('@/views/component/table'),
        meta: {
          title: '表格组件'
        }
      }
    ]
  }
]

export const blankRoutes = [
  // ...
]

export const routes = [].concat(
  basicRoutes,
  blankRoutes
)

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/redirect',
    component: BasicLayout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect')
      }
    ]
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: BasicLayout,
    children: basicRoutes
  },
  ...blankRoutes,
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]
