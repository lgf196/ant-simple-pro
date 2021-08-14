import type { VNode } from 'vue'

declare module '*.tsx' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare global {
  namespace JSX {
    // runtime-dom.d.ts already defined
    // type Element = VNode
    // type ElementClass = ComponentRenderProxy
    interface ElementAttributesProperty {
      $props: {}
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface IntrinsicAttributes {
      [elem: string]: any
    }
  }
}
