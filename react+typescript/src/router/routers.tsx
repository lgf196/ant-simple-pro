import React, { lazy } from 'react'
import HocRouter from './routeInterceptor'
import FatherLayout from '@/layouts/basic/fatherLayout'
import BasicLayout from '@/layouts/basic'
import { RouteConfig } from 'react-router-config'
import { Redirect } from 'react-router-dom'
import Error from '@/pages/error'
import Login from '@/pages/login'
/**
 * @description 没有权限和不依赖BasicLayout组价的路由
*/
export const noBasicLayoutRouter: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to={{ pathname: '/home' }} />
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  }
]
/**
 * @descriptio 含BasicLayout布局路由，静态
 */
export const staticRouter: RouteConfig[] = [
  {
    exact: true,
    path: '/home',
    component: HocRouter(lazy(() => import('@/pages/home'))),
    title: '首页',
  },
  {
    exact: true,
    path: '/userInfo',
    title: '用户信息',
    component: HocRouter(lazy(() => import('@/pages/user/userInfo'))),
  },
  {
    exact: true,
    path: '/globalization',
    title: '国际化',
    component: HocRouter(lazy(() => import('@/pages/globalization'))),
  },
];
/**
 * @description 权限路由
 */
export const menuRouter: RouteConfig[] = [
  {
    path: '/system',
    title: '系统',
    component: FatherLayout,
    routes: [
      {
        exact: true,
        path: '/system/menu',
        component: HocRouter(lazy(() => import('@/pages/stystem/menu'))),
        title: '菜单管理',
      },
    ]
  },
  {
    exact: true,
    path: '/userManage',
    title: '用户管理',
    component: HocRouter(lazy(() => import('@/pages/user'))),
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
  ...noBasicLayoutRouter,
  {
    component: BasicLayout,
    routes: [...staticRouter, ...menuRouter]
  },
  {
    path: '*',
    render: () => <Redirect to={{ pathname: '/404' }} />
  },
]
