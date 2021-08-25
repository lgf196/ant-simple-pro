import 'virtual:svg-icons-register'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales'

if (import.meta.env.VITE_APP_MODE === 'dev') {
  import('ant-design-vue/dist/antd.less')
}

import './router/permission'
import './assets/styles/index.less'
import initPlugin from './plugins'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(i18n)
initPlugin(app)

app.mount('#app')
// console.log('import.meta.env', import.meta.env)
if (import.meta.env.VITE_APP_MODE !== 'dev') {
  const lastBuildTime = __LAST_BUILD_TIME__
  console.log(`latest delopy: %c${lastBuildTime}`, 'color: #67C23A')
}
