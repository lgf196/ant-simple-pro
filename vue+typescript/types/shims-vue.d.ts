/// <reference types="node" />

declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare module '*.css'
declare module '*.less'
declare module '*.scss'
// declare module '*.png' {
//   const src: string
//   export default src
// }
// declare module '*.svg' {
//   const src: string
//   export default src
// }

declare module '*.json'

declare module 'ant-design-vue/lib/locale-provider/zh_CN'
