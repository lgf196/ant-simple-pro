import { RouteLocationNormalizedLoaded, Router } from 'vue-router'
import type { Message } from 'ant-design-vue/types/message'
import { Modal, ModalOptions, ModalConfirm } from 'ant-design-vue/types/modal'
import { number, VueI18n } from 'vue-i18n'
import { TinyMCE, EditorManager, RawEditorSettings, Editor } from 'tinymce'

declare global {
  interface RawEditorSettingsType extends RawEditorSettings {
    imageSelectorCallback: (file: File, success: (url: string) => void) => void
  }
  interface TinyMCEType extends TinyMCE {
    init(this: EditorManager, settings: RawEditorSettingsType): Promise<Editor[]>
  }
  interface Window {
    tinymce: TinyMCEType
  }
}

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
