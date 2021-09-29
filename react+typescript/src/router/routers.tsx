import React, { lazy } from 'react';
import HocRouter from './routeInterceptor';
import FatherLayout from '@/layouts/basic/fatherLayout';
import BasicLayout from '@/layouts/basic';
import { RouteConfig } from 'react-router-config';
import { Redirect } from 'react-router-dom';
import Error from '@/pages/error';
import Login from '@/pages/login';
import { lazyComponent } from '@/utils/function';
import { environment } from '@/utils/varbile';
import MapCompent from '@/pages/visualization/map';

const menuSet: RouteConfig[] =
  environment() === 'dev'
    ? [
        {
          path: '/system',
          title: '系统',
          component: FatherLayout,
          routes: [
            {
              exact: true,
              path: '/system/menu',
              component: HocRouter(lazy(() => import(`@/pages/stystem/menu`))),
              title: '菜单管理',
            },
          ],
        },
      ]
    : [];

/**
 * @description 没有权限和不依赖BasicLayout组价的路由
 */
export const noLayoutRouter: RouteConfig[] = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to={{ pathname: '/home' }} />,
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
];
/**
 * @descriptio 含BasicLayout布局路由，静态
 */
export const staticRouter: RouteConfig[] = [
  {
    exact: true,
    path: '/home',
    component: HocRouter(lazy(() => import(`@/pages/home`))),
    title: '首页',
  },
  {
    exact: true,
    path: '/userInfo',
    title: '用户信息',
    component: HocRouter(lazy(() => import(`@/pages/user/userInfo`))),
  },
  {
    exact: true,
    path: '/globalization',
    title: '国际化',
    component: HocRouter(lazy(() => import(`@/pages/globalization`))),
  },
];
/**
 * @description 权限路由
 */
export const menuRouter: RouteConfig[] = [
  ...menuSet,
  {
    exact: true,
    path: '/userManage',
    title: '用户管理',
    component: HocRouter(lazy(() => import(`@/pages/user`))),
  },
  {
    path: '/component',
    title: '组件',
    component: FatherLayout,
    routes: [
      {
        exact: true,
        path: '/component/everUse',
        component: HocRouter(lazy(() => import(`@/pages/package/everUse`))),
        title: '常用组件',
      },
      {
        exact: true,
        path: '/component/colorPickers',
        component: HocRouter(lazy(() => import(`@/pages/package/colorPickers`))),
        title: '色板',
      },
      {
        exact: true,
        path: '/component/downFile',
        component: HocRouter(lazy(() => import(`@/pages/package/downFile`))),
        title: '下载文件',
      },
      {
        exact: true,
        path: '/component/editUploadImage',
        component: HocRouter(lazy(() => import(`@/pages/package/editUploadImage`))),
        title: '图片剪辑',
      },
      {
        exact: true,
        path: '/component/rightClickCompent',
        component: HocRouter(lazy(() => import(`@/pages/package/rightClickCompent`))),
        title: '右键组件',
      },
      {
        exact: true,
        path: '/component/hotkeys',
        component: HocRouter(lazy(() => import(`@/pages/package/hotkeys`))),
        title: '按键监听',
      },
      {
        exact: true,
        path: '/component/video',
        component: HocRouter(lazy(() => import(`@/pages/package/videoComponent`))),
        title: '视频',
      },
    ],
  },
  {
    path: '/charts',
    title: '图表',
    component: FatherLayout,
    routes: [
      {
        exact: true,
        path: '/charts/ordinary',
        component: HocRouter(lazy(() => import(`@/pages/charts/ordinary`))),
        title: '普通图表',
      },
      {
        exact: true,
        path: '/charts/customize',
        component: HocRouter(lazy(() => import(`@/pages/charts/customize`))),
        title: '自定义',
      },
    ],
  },
  {
    path: '/form',
    title: '表单页',
    component: FatherLayout,
    routes: [
      {
        exact: true,
        path: '/form/tableForm',
        component: HocRouter(lazy(() => import(`@/pages/form/tableForm`))),
        title: '表格表单',
      },
      {
        exact: true,
        path: '/form/basic',
        component: HocRouter(lazy(() => import(`@/pages/form/basic`))),
        title: '基础表单',
      },
      {
        exact: true,
        path: '/form/findTemplate',
        component: HocRouter(lazy(() => import(`@/pages/form/findTemplate`))),
        title: '查询模板',
      },
      {
        exact: true,
        path: '/form/advancedForm',
        component: HocRouter(lazy(() => import(`@/pages/form/advancedForm`))),
        title: '高级表单',
      },
    ],
  },
  {
    path: '/editor',
    title: '编辑器',
    component: FatherLayout,
    routes: [
      {
        exact: true,
        path: '/editor/codemirror',
        component: HocRouter(lazy(() => import(`@/pages/editor/codemirror`))),
        title: '代码编辑器',
      },
      {
        exact: true,
        path: '/editor/jsonEditor',
        component: HocRouter(lazy(() => import(`@/pages/editor/jsonEditor`))),
        title: 'json编辑器',
      },
      {
        exact: true,
        path: '/editor/richTextEditor',
        component: HocRouter(lazy(() => import(`@/pages/editor/richTextEditor`))),
        title: '富文本编辑器',
      },
      {
        exact: true,
        path: '/editor/graphicsEditor',
        component: HocRouter(lazy(() => import(`@/pages/editor/graphicsEditor`))),
        title: '图形编辑器',
      },
      {
        exact: true,
        path: '/editor/markdown',
        component: HocRouter(lazy(() => import(`@/pages/editor/markdown`))),
        title: 'markdown编辑器',
      },
    ],
  },
  {
    exact: true,
    path: '/table',
    title: '表格',
    component: HocRouter(lazy(() => import(`@/pages/table`))),
  },
  {
    exact: true,
    path: '/emoticons',
    title: '表情库',
    component: HocRouter(lazy(() => import(`@/pages/emoticons`))),
  },
  {
    exact: true,
    path: '/copy',
    title: '复制',
    component: HocRouter(lazy(() => import(`@/pages/copy`))),
  },
  {
    exact: true,
    path: '/qrcode',
    title: '二维码',
    component: HocRouter(lazy(() => import(`@/pages/qrCode`))),
  },
  {
    exact: true,
    path: '/drag',
    title: '拖拽',
    component: HocRouter(lazy(() => import(`@/pages/drag`))),
  },
  {
    exact: true,
    path: '/zip',
    title: 'zip下载',
    component: HocRouter(lazy(() => import(`@/pages/zip`))),
  },
  {
    exact: true,
    path: '/advice',
    title: '广告栏',
    component: HocRouter(lazy(() => import(`@/pages/advice`))),
  },
  {
    path: '/excel',
    title: 'excel',
    component: FatherLayout,
    routes: [
      {
        exact: true,
        path: '/excel/export-excel',
        component: HocRouter(lazy(() => import(`@/pages/excel/exportExcel`))),
        title: '导出Excel',
      },
      {
        exact: true,
        path: '/excel/select-export-excel',
        component: HocRouter(lazy(() => import(`@/pages/excel/selectExportExcel`))),
        title: '导出选择项',
      },
    ],
  },
  {
    path: '/404',
    title: '404',
    component: Error,
  },
  {
    path: '*',
    render: () => <Redirect to={{ pathname: '/404' }} />,
  },
];
export default [
  ...noLayoutRouter,
  {
    component: BasicLayout,
    routes: [...staticRouter, ...menuRouter],
  },
  {
    path: '*',
    render: () => <Redirect to={{ pathname: '/404' }} />,
  },
];
