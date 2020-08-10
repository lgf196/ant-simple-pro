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