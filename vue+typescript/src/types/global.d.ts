import { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import type { Message } from 'ant-design-vue/types/message'
import { Modal, ModalOptions, ModalConfirm } from 'ant-design-vue/types/modal'
import { VueI18n } from 'vue-i18n'
// declare global {
  
// }

module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $route: RouteLocationNormalizedLoaded
    $router: Router
    $formatDate: (date: dayjs.ConfigType) => string
    $formatDateTime: (date: dayjs.ConfigType) => string
    $message: Message
    $info(options: ModalOptions): ModalConfirm
    $success(options: ModalOptions): ModalConfirm
    $error(options: ModalOptions): ModalConfirm
    $warning(options: ModalOptions): ModalConfirm
    $confirm(options: ModalOptions): ModalConfirm
    destroyAll(): void
    $i18n: VueI18n
  }
}

export {}
