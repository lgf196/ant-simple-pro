import {lazy } from 'react'
import Layout from '@/components/layout'
import HocRouter from './menuRouter'
import FatherLayout from '@/components/layout/fatherLayout'
import { RouteConfig} from 'react-router-config'
import Error from '@/pages/error'
export const menuRouter:RouteConfig[]=[
    {
        component: Layout,
        routes:[
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
    }
]