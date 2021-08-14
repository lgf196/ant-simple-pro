import { RouteLocationNormalizedLoaded, Router } from 'vue-router'
// import { VueI18n } from 'vue-i18n'
import { TinyMCE, EditorManager, RawEditorSettings, Editor } from 'tinymce'
import dayjs from 'dayjs'

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
  interface AnyFunction<P = any, T = any> {
    (...args: P[]): T
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $route: RouteLocationNormalizedLoaded
    $router: Router
    $formatDate: (date: dayjs.ConfigType) => string
    $formatDateTime: (date: dayjs.ConfigType) => string
    $info(options: any): any
    $success(options: any): any
    $error(options: any): any
    $warning(options: any): any
    $confirm(options: any): any
    destroyAll(): void
    // $i18n: VueI18n
  }
}

export {}
