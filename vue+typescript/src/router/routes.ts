// import { defineAsyncComponent } from 'vue'
import { RouteRecordRaw } from 'vue-router'

import BasicLayout from '@/layouts/basic/index.vue'
import BlankLayout from '@/layouts/blank/index.vue'
import NotFound from '@/views/exception/notfound.vue'
// import LoadingComponent from '@/components/loading/index.vue'

// function loadable(path: string) {
//   return defineAsyncComponent({
//     loader: () => import(path),
//     loadingComponent: LoadingComponent,
//     timeout: 15000,
//     suspensible: false
//   })
// }

export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      affix: true
    }
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/user/userinfo.vue'),
    meta: {
      title: '用户信息'
    }
  },
  {
    path: '/globalization',
    name: 'globalization',
    component: () => import('@/views/globalization/index.vue'),
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
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理'
        }
      }
    ]
  },
  {
    path: '/userManage',
    name: 'userManage',
    component: () => import('@/views/user/index.vue'),
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
        component: () => import('@/views/component/chart/index.vue'),
        meta: {
          title: '图表组件'
        }
      },
      {
        path: '/component/everUse',
        component: () => import('@/views/component/common/index.vue'),
        meta: {
          title: '常用组件'
        }
      },
      {
        path: '/component/form',
        component: () => import('@/views/component/form/index.vue'),
        meta: {
          title: '表单组件'
        }
      },
      {
        path: '/component/table',
        component: () => import('@/views/user/index.vue'),
        meta: {
          title: '表格组件'
        }
      }
    ]
  },
  {
    path: '/icon',
    name: 'icon',
    component: () => import('@/views/icon/index.vue')
  },
  {
    path: '/advice',
    name: 'advice',
    component: () => import('@/views/advice/index.vue'),
    meta: {
      title: '广告栏'
    }
  },
  {
    path: '/excel',
    name: 'excel',
    component: BlankLayout,
    children: [
      {
        path: '/excel/select-export-excel',
        name: 'selectExportExcel',
        component: () => import('@/views/excel/select-export-excel/index.vue'),
        meta: {
          title: '导出选择项'
        }
      },
      {
        path: '/excel/export-excel',
        name: 'exportExcel',
        component: () => import('@/views/excel/export-excel/index.vue'),
        meta: {
          title: '导出excel'
        }
      }
    ]
  },
  {
    path: '/zip',
    name: 'zip',
    component: () => import('@/views/zip/index.vue'),
    meta: {
      title: 'zip'
    }
  }
]

export const routes = [...basicRoutes]

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
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
        component: () => import('@/views/redirect/index.vue')
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
  {
    path: '/:pathMatch(.*)*',
    component: NotFound
  }
]
