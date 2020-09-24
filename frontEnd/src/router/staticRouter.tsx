import React,{lazy } from 'react'
import Layout from '@/components/layout'
import HocRouter from './menuRouter'
import FatherLayout from '@/components/layout/fatherLayout'
import { RouteConfig} from 'react-router-config'
import { Redirect } from 'react-router-dom'
import Error from '@/pages/error'
import Login from '@/pages/login'
/** 
 * @description 没有权限和不依赖layout组价的路由
*/
export const noMenuRouter=[  
    {
        path: '/',
        exact: true,
        render: () => <Redirect to={{ pathname: '/home'}}/>
    },
    {
        path: '/login',
        exact: true,
        component:Login,
    },
]
export const menuRouter:RouteConfig[]=[
    {
        exact: true,
        path: '/home',
        component:HocRouter(lazy(()=> import('@/pages/home'))),
        title: '系统信息',
    },
    {
        path: '/system',
        title: '系统',
        component: FatherLayout,
        routes: [
            {
                exact: true,
                path: '/system/menu',
                component:HocRouter(lazy(()=> import('@/pages/stystem/menu'))),
                title: '菜单管理',
            },
        ]
    },
    {
        exact: true,
        path: '/userManage',
        title: '用户管理',
        component: HocRouter(lazy(()=> import('@/pages/user'))),
    },
    {
        exact: true,
        path: '/userInfo',
        title: '用户信息',
        component: HocRouter(lazy(()=> import('@/pages/user/userInfo'))),
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
                component: HocRouter(lazy(()=> import('@/pages/package/chart'))),
            },
            {
                exact: true,
                path: '/component/everUse',
                component:HocRouter(lazy(()=> import('@/pages/package/everUse'))),
                title: '按钮',
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
        render: () => <Redirect to={{ pathname: '/404'}}/>
    },
]

export default [
    ...noMenuRouter,
    {
        component:Layout,
        routes: menuRouter
    },
    {
        path: '*',
        render: () => <Redirect to={{ pathname: '/404'}}/>
    },
]