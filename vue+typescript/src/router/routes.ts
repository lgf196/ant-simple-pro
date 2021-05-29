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
      },
      {
        path: '/component/hotkeys',
        component: () => import('@/views/component/hotkeys/index.vue'),
        meta: {
          title: '按键监听'
        }
      },
      {
        path: '/component/rightClickCompent',
        component: () => import('@/views/component/context-menu/index.vue'),
        meta: {
          title: '右键组件'
        }
      },
      {
        path: '/component/editUploadImage',
        component: () => import('@/views/component/image-cropper/index.vue'),
        meta: {
          title: '图片裁切'
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
  },
  {
    path: '/drag',
    name: 'drag',
    component: () => import('@/views/drag/index.vue'),
    meta: {
      title: '拖拽'
    }
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: () => import('@/views/qrcode/index.vue'),
    meta: {
      title: '二维码'
    }
  },
  {
    path: '/copy',
    name: 'copy',
    component: () => import('@/views/copy/index.vue'),
    meta: {
      title: '复制'
    }
  },
  {
    path: '/editor',
    name: 'editor',
    component: BlankLayout,
    children: [
      {
        path: '/editor/markdown',
        name: 'markdown',
        component: () => import('@/views/editor/markdown.vue'),
        meta: {
          title: 'markdown编辑器'
        }
      },
      {
        path: '/editor/graphicsEditor',
        name: 'graphicsEditor',
        component: () => import('@/views/editor/graphics-editor.vue'),
        meta: {
          title: '图形编辑器'
        }
      },
      {
        path: '/editor/richTextEditor',
        name: 'richTextEditor',
        component: () => import('@/views/editor/richtext-editor.vue'),
        meta: {
          title: '富文本编辑器'
        }
      },
      {
        path: '/editor/jsonEditor',
        name: 'jsonEditor',
        component: () => import('@/views/editor/json-editor.vue'),
        meta: {
          title: 'json编辑器'
        }
      },
      {
        path: '/editor/codemirror',
        name: 'codemirror',
        component: () => import('@/views/editor/codemirror.vue'),
        meta: {
          title: '代码编辑器'
        }
      }
    ]
  },
  {
    path: '/form',
    name: 'form',
    component: BlankLayout,
    children: [
      {
        path: '/form/tableForm',
        name: 'tableForm',
        component: () => import('@/views/form/table-form.vue'),
        meta: {
          title: '表格表单'
        }
      },
      {
        path: '/form/advancedForm',
        name: 'advancedForm',
        component: () => import('@/views/form/advanced-form.vue'),
        meta: {
          title: '高级表单'
        }
      },
      {
        path: '/form/findTemplate',
        name: 'findTemplate',
        component: () => import('@/views/form/query-template.vue'),
        meta: {
          title: '查询模板'
        }
      },
      {
        path: '/form/basic',
        name: 'basic',
        component: () => import('@/views/form/basic.vue'),
        meta: {
          title: '基础模板'
        }
      }
    ]
  },
  {
    path: '/charts',
    name: 'charts',
    component: BlankLayout,
    children: [
      {
        path: '/charts/ordinary',
        name: 'ordinary',
        component: () => import('@/views/charts/ordinary.vue'),
        meta: {
          title: '普通图表'
        }
      },
      {
        path: '/charts/customize',
        name: 'customize',
        component: () => import('@/views/charts/customize.vue'),
        meta: {
          title: '自定义图表'
        }
      }
    ]
  },
  {
    path: '/table',
    component: () => import('@/views/user/index.vue'),
    meta: {
      title: '表格'
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
    path: '/map',
    name: 'map',
    component: () => import('@/views/visualization/map.vue')
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
