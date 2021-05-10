<p align="center">
  <img width="320" src="http://blog.lgf196.top/ant-simple-pro-document/logon.png">
</p>

<p align="center">
  <a href="https://github.com/vuejs/vue">
    <img src="https://img.shields.io/badge/vue-3.0.4-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-17.0.1-brightgreen.svg" alt="react">
  </a>
  <a href="https://github.com/angular/angular" rel="nofollow">
    <img src="https://img.shields.io/badge/angular-11.0.4-brightgreen.svg" alt="angular">
  </a>
  <a href="https://github.com/microsoft/TypeScript">
    <img src="https://img.shields.io/badge/typescript-4.1.2-brightgreen.svg" alt="license">
  </a>
  <a href="https://github.com/ant-design/ant-design">
    <img src="https://img.shields.io/badge/antd-4.9.3-brightgreen.svg" alt="donate">
  </a>
</p>


简体中文 | [English](./README.md) 

## 简介

[ant-simple-pro](https://github.com/lgf196/ant-simple-pro) 是一款支持[vue3.0](https://github.com/vuejs/vue)，[react](https://github.com/facebook/react)，[angular](https://github.com/angular/angular)，[typescript](https://github.com/microsoft/TypeScript)等多框架支持的中台前端解决方案，ui使用[antd](https://github.com/ant-design/ant-design)实现的，它使用了最新的前端技术栈，内置了 i18 国际化解决方案，动态路由，响应式设计，开箱即用，它可以帮助你快速搭建企业级中后台产品原型，不管你是vue开发者，还是react,或者angular，都能在这里找到你想要的版本。

- [在线预览](https://lgf196.top/react/login)

  #### 登录账号和密码:

  - 账号：lgf@163.com
  - 密码:123456

- [使用文档](http://blog.lgf196.top/ant-simple-pro-document/)

## 前序准备
你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)，异步请求数据用[axios](https://github.com/axios/axios)，所有的异步接口均采用node+typescript+mysql+[docker](https://www.docker.com/)实现的，本项目技术栈基于vue3.0,react,angular,typescrpt,antd等技术，所以最好先了解如下知识：

#### vue

- vue3.0的新语法，如setup,hooks等合成api
- vue-cil,vue-router,vuex等全家桶

#### react

- react基本语法，如hooks,class创建组件，函数式创建组件等
- react全家桶要熟悉，如react-router-dom，create-react-app,react-transition-group等
- react数据状态库，redux,redux-saga,reselect,react-redux等
- react在typescript下的FC模式等

#### angular

- angular的基本语法，如html模板，指令，组件等
- angular的全家桶，如angular-cil,Rx等
- typescript的基本语法

<p align="center">
  <img width="900" src="http://www.bbvdd.com/d/20210108215408tms.png">
</p>

## 开发

``` js
# 克隆项目
git clone https://github.com/lgf196/ant-simple-pro.git

# 进入项目目录
cd ant-simple-pro

# 选择你喜欢的版本

# 安装依赖
npm install

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000/)

## 发布

``` js
# 构建测试环境
npm run build:alpha

# 构建预发布环境
npm run build:preprod

# 构建生产环境
npm run build:prod
```

## 赞赏

如果您认为该项目对您有所帮助，则可以给作者一个赞，作者非常感激:blush::blush::rose:

- 技术交流群扫码进入，一起学习，一起成长，不懂问题大家一起讨论
<p align="left">
  <img width="100" src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d6d3f624f4143fe8833d2458aeaf002~tplv-k3u1fbpfcp-zoom-1.image">
</p>

## Browsers support

 Modern browsers does not support IE browser

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IEdge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Edge                                                         | last 2 versions                                              | last 2 versions                                              | last 2 versions                                              |

##  生态圈

1.  [anferEnd](https://github.com/lgf196/ant-simple-pro/tree/afterEnd)是 ant-simple-pro的后端项目，由typescript+node+mysql+docker实现。
2. [ant-desgin](https://ant.design/index-cn)是本项目的ui，ant组件丰富且漂亮，ant生态强大，是做中台方案的不二之选。
3. [vue-cil](https://cli.vuejs.org/) 是vue官方提供的一个 vue 项目脚手架，本项目也是基于它进行构建的。它帮你封装了大量的 webpack、babel 等其它配置，让你能花更少的精力在搭建环境上，从而能更专注于页面代码的编写。不过所有的脚手架都是针对大部分情况的，所以一些特殊的需求还是需要自己进行配置。建议先阅读一遍它的文档，对一些配置有一些基本的了解。
4. [create-react-app](https://create-react-app.dev/)是react官方提供的一个react项目的脚手架，本项目也是基于它进行构建的，里面有很多的配置，建议看一下文档。
5. [angular-cil](https://angular.cn/guide/setup-local)是angular官方提供的一个angular项目脚手架，本项目也是基于它进行构建的，里面有非常多的配置项，还需自已多阅读。
5. [h5-Dooring](https://github.com/MrXujiang/h5-Dooring) 让H5制作像搭积木一样简单, 轻松搭建H5页面, H5网站, PC端网站, 可视化设计

[MIT](https://github.com/lgf196/ant-simple-pro/blob/master/LICENSE)

Copyright (c) 2021-present LiGuoFeng
