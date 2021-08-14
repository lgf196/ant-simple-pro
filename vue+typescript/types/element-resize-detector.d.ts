declare module 'element-resize-detector' {
  export interface Options {
    strategy: string
  }
  export interface Erd {
    listenTo<Element extends HTMLElement>(el: Element, callback: (el: Element) => void): void
    removeListener<Element extends HTMLElement>(el: Element, callback: (el: Element) => void): void
    removeAllListeners<Element extends HTMLElement>(el: Element): void
    uninstall<Element extends HTMLElement>(el: Element): void
  }
  export default function elementResizeDetectorMaker(opts?: Options): Erd
}
