export type ImageViewerState = {
  index: number
  visible: boolean
  infinite: boolean
  loading: boolean
  mode: {
    name: string
    icon: string
  }
  transform: Record<string, any>
  imgRefs: HTMLImageElement[]
  _keyDownHandler: (() => void) | null // eslint-disable-line
  _mouseWheelHandler: (() => void) | null // eslint-disable-line
  _dragHandler: (() => void) | null // eslint-disable-line
}
