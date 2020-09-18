import React,{lazy } from 'react'
import Layout from '@/components/layout'
import HocRouter from './menuRouter'
import FatherLayout from '@/components/layout/fatherLayout'
import { RouteConfig} from 'react-router-config'
import { Redirect } from 'react-router-dom'
import Error from '@/pages/error'
import Login from '@/pages/login'

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
        path: '/chart',
        title: '图表',
        component: HocRouter(lazy(()=> import('@/pages/chart'))),
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
                path: '/component/mapTable',
                component:FatherLayout,
                title: '图表管理',
                routes: [
                    {
                        exact: true,
                        path:'/component/mapTable/rice',
                        component:HocRouter(lazy(()=> import('@/pages/stystem/find'))),
                        title: '园表组件', 
                    }
                ]
            },
            {
                exact: true,
                path: '/component/button',
                component:HocRouter(lazy(()=> import('@/pages/stystem/menu'))),
                title: '按钮管理',
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
        title: '404',
        component: Error,
    }
]

export default [
    ...noMenuRouter,
    {
        component:Layout,
        routes: menuRouter
    },
    {
        path: '*',
        component: Error,
    }
]