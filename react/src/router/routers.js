import React, { lazy } from 'react'
import HocRouter from './routeInterceptor'
import FatherLayout from '@/layouts/basic/fatherLayout'
import BasicLayout from '@/layouts/basic'
import { Redirect } from 'react-router-dom'
import Error from '@/pages/error'
import Login from '@/pages/login'
import MapCompent from '@/pages/visualization/map'
import { lazyComponent } from '@/utils/function'

/**
 * @description 没有权限和不依赖BasicLayout组价的路由
*/
export const noLayoutRouter = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to={{ pathname: '/home' }} />
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/map',
    exact: true,
    component: MapCompent,
  },
]
/**
 * @descriptio 含BasicLayout布局路由，静态
 */
export const staticRouter = [
  {
    exact: true,
    path: '/home',
    component: HocRouter(lazyComponent('home')),
    title: '首页',
  },
  {
    exact: true,
    path: '/userInfo',
    title: '用户信息',
    component: HocRouter(lazyComponent('user/userInfo')),
  },
  {
    exact: true,
    path: '/globalization',
    title: '国际化',
    component: HocRouter(lazyComponent('globalization')),
  },
];
/**
 * @description 权限路由
 */
export const menuRouter = [
  {
    path: '/system',
    title: '系统',
    component: FatherLayout,
    routes: [
      {
        exact: true,
        path: '/system/menu',
        component: HocRouter(lazyComponent('stystem/menu')),
        title: '菜单管理',
      },
    ]
  },
  {
    exact: true,
    path: '/userManage',
    title: '用户管理',
    component: HocRouter(lazyComponent('user')),
  },
  {
    path: '/component',
    title: '组件',
    component: FatherLayout,
    routes: [
      {
        exact: true,
        path: '/component/chart',
        title: '图表',
        component: HocRouter(lazy(() => import('@/pages/package/chart'))),
      },
      {
        exact: true,
        path: '/component/everUse',
        component: HocRouter(lazy(() => import('@/pages/package/everUse'))),
        title: '常用组件',
      },
      {
        exact: true,
        path: '/component/form',
        component: HocRouter(lazy(() => import('@/pages/package/form'))),
        title: '表单组件',
      },
      {
        exact: true,
        path: '/component/table',
        component: HocRouter(lazy(() => import('@/pages/package/table'))),
        title: 'table组件',
      },
    ]
  },
  {
    path: '/charts',
    title: '图表',
    component: FatherLayout,
    routes: [
      {
        exact: true,
        path: '/charts/ordinary',
        component: HocRouter(lazyComponent('charts/ordinary')),
        title: '普通图表',
      },
      {
        exact: true,
        path: '/charts/customize',
        component: HocRouter(lazyComponent('charts/customize')),
        title: '自定义',
      },
    ]
  },
  {
    path: '/form',
    title: '表单页',
    component: FatherLayout,
    routes: [
      {
        exact: true,
        path: '/form/tableForm',
        component: HocRouter(lazyComponent('form/tableForm')),
        title: '表格表单',
      },
      {
        exact: true,
        path: '/form/basic',
        component: HocRouter(lazyComponent('form/basic')),
        title: '基础表单',
      },
      {
        exact: true,
        path: '/form/findTemplate',
        component: HocRouter(lazyComponent('form/findTemplate')),
        title: '查询模板',
      },
      {
        exact: true,
        path: '/form/advancedForm',
        component: HocRouter(lazyComponent('form/advancedForm')),
        title: '高级表单',
      },
    ]
  },
  {
    path: '/editor',
    title: '编辑器',
    component: FatherLayout,
    routes: [
      {
        exact: true,
        path: '/editor/codemirror',
        component: HocRouter(lazyComponent('editor/codemirror')),
        title: '代码编辑器',
      },
      {
        exact: true,
        path: '/editor/jsonEditor',
        component: HocRouter(lazyComponent('editor/jsonEditor')),
        title: 'json编辑器',
      },
      {
        exact: true,
        path: '/editor/richTextEditor',
        component: HocRouter(lazyComponent('editor/richTextEditor')),
        title: '富文本编辑器',
      },
      {
        exact: true,
        path: '/editor/graphicsEditor',
        component: HocRouter(lazyComponent('editor/graphicsEditor')),
        title: '图形编辑器',
      },
      {
        exact: true,
        path: '/editor/markdown',
        component: HocRouter(lazyComponent('editor/markdown')),
        title: 'markdown编辑器',
      }
    ]
  },
  {
    exact: true,
    path: '/table',
    title: '表格',
    component: HocRouter(lazyComponent('table')),
  },
  {
    exact: true,
    path: '/emoticons',
    title: '表情库',
    component: HocRouter(lazyComponent('emoticons')),
  },
  {
    exact: true,
    path: '/copy',
    title: '复制',
    component: HocRouter(lazyComponent('copy')),
  },
  {
    exact: true,
    path: '/qrcode',
    title: '二维码',
    component: HocRouter(lazyComponent('qrCode')),
  },
  {
    path: '/404',
    title: '404',
    component: Error,
  },
  {
    path: '*',
    render: () => <Redirect to={{ pathname: '/404' }} />
  },
]
export default [
  ...noLayoutRouter,
  {
    component: BasicLayout,
    routes: [...staticRouter, ...menuRouter]
  },
  {
    path: '*',
    render: () => <Redirect to={{ pathname: '/404' }} />
  }
]
