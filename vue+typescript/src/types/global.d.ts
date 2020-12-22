import { Store } from 'vuex'
import { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import { Message } from 'ant-design-vue/types/message'
import { Modal } from 'ant-design-vue/types/modal'
import { VueI18n } from 'vue-i18n'
// declare global {
  
// }

module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $route: RouteLocationNormalizedLoaded
    $router: Router
    $store: Store<any>
    $formatDate: (date: dayjs.ConfigType) => string
    $formatDateTime: (date: dayjs.ConfigType) => string
    $message: Message
    $info: Modal.info
    $success: Modal.success
    $error: Modal.error
    $warning: Modal.warning
    $confirm: Modal.confirm
    $i18n: VueI18n
  }
}

export {}
