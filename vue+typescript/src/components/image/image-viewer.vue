<template>
  <div tabindex="-1" ref="com-image-viewer__wrapper" class="com-image-viewer__wrapper" :style="{ 'z-index': zIndex }">
    <div class="com-image-viewer__mask"></div>
    <!-- CLOSE -->
    <span class="com-image-viewer__btn com-image-viewer__close" @click="hide">
      <CloseCircleOutlined class="com-icon-circle-close" />
    </span>
    <!-- ARROW -->
    <template v-if="!isSingle">
      <span
        class="com-image-viewer__btn com-image-viewer__prev"
        :class="{ 'is-disabled': !infinite && isFirst }"
        @click="prev">
        <ComSvgIcon name="arrow-left"></ComSvgIcon>
      </span>
      <span
        class="com-image-viewer__btn com-image-viewer__next"
        :class="{ 'is-disabled': !infinite && isLast }"
        @click="next">
        <ComSvgIcon name="arrow-right"></ComSvgIcon>
      </span>
    </template>
    <!-- ACTIONS -->
    <div class="com-image-viewer__btn com-image-viewer__actions">
      <div class="com-image-viewer__actions__inner">
        <ComSvgIcon name="zoom-out" @click="handleActions('zoomOut')"></ComSvgIcon>
        <ComSvgIcon name="zoom-in" @click="handleActions('zoomIn')"></ComSvgIcon>
        <i class="com-image-viewer__actions__divider"></i>
        <ComSvgIcon :name="mode.icon" @click="toggleMode"></ComSvgIcon>
        <i class="com-image-viewer__actions__divider"></i>
        <ComSvgIcon name="refresh-left" @click="handleActions('anticlocelise')"></ComSvgIcon>
        <ComSvgIcon name="refresh-right" @click="handleActions('clocelise')"></ComSvgIcon>
      </div>
    </div>
    <!-- CANVAS -->
    <div class="com-image-viewer__canvas">
      <img
        v-for="(url, i) in currentUrlList"
        :ref="setImgRef"
        class="com-image-viewer__img"
        :key="i"
        :src="currentImg"
        :style="imgStyle"
        @load="handleImgLoad"
        @error="handleImgError"
        @mousedown="handleMouseDown">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { on, off } from '@/utils/dom'
import { rafThrottle } from '@/utils'
import { CloseCircleOutlined } from '@ant-design/icons-vue'
import ComSvgIcon from '@/components/svg-icon/index.vue'
import { ImageViewerPropsType } from './image-preview'

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'full-screen'
  },
  ORIGINAL: {
    name: 'original',
    icon: 'scale-original'
  }
}

const mousewheelEventName = 'wheel'

let prevOverflow = ''

export default defineComponent({
  name: 'ImageViewer',

  props: {
    urlList: {
      type: Array as PropType<ImageViewerPropsType['urlList']>,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    onSwitch: {
      type: Function,
      default: () => {} // eslint-disable-line
    },
    destroy: {
      type: Function,
      default: () => {} // eslint-disable-line
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  components: {
    CloseCircleOutlined,
    ComSvgIcon
  },
  data() {
    return {
      index: this.initialIndex,
      isShow: false,
      infinite: true,
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      },
      imgRefs: [] as HTMLImageElement[],
      _keyDownHandler: (() => {}) as (() => void) | null, // eslint-disable-line
      _mouseWheelHandler: (() => {}) as (() => void) | null, // eslint-disable-line
      _dragHandler: (() => {}) as (() => void) | null // eslint-disable-line
    }
  },
  computed: {
    currentUrlList(): string[] {
      return this.urlList.filter((_, i) => i === this.index)
    },
    isSingle(): boolean {
      return this.urlList.length <= 1
    },
    isFirst(): boolean {
      return this.index === 0
    },
    isLast(): boolean {
      return this.index === this.urlList.length - 1
    },
    currentImg(): string {
      return this.urlList[this.index]
    },
    imgStyle(): Record<string, string> {
      const { scale, deg, offsetX, offsetY, enableTransition } = this.transform
      const style: Record<string, string> = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? 'transform .3s' : '',
        'margin-left': `${offsetX}px`,
        'margin-top': `${offsetY}px`
      }
      if (this.mode === Mode.CONTAIN) {
        style.maxWidth = style.maxHeight = '100%'
      }
      return style
    }
  },
  watch: {
    index: {
      handler(val) {
        this.reset()
        this.onSwitch(val)
      }
    },
    currentImg() {
      this.$nextTick(() => {
        const $img = this.imgRefs[0]
        if (!$img.complete) {
          this.loading = true
        }
      })
    }
    // visible(val) {
    //   if (val) {
    //     // prevent body scroll
    //     prevOverflow = document.body.style.overflow
    //     document.body.style.overflow = 'hidden'
    //   } else {
    //     document.body.style.overflow = prevOverflow
    //   }
    // }
  },
  mounted() {
    this.deviceSupportInstall()
    // add tabindex then wrapper can be focusable via Javascript
    // focus wrapper so arrow key can't cause inner scroll behavior underneath
    const wrapper = this.$refs['com-image-viewer__wrapper']
    wrapper && (wrapper as { focus: () => void }).focus()
    // prevent body scroll
    prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  },
  beforeUpdate() {
    this.imgRefs = []
  },
  beforeUnmount() {
    document.body.style.overflow = prevOverflow
  },
  methods: {
    setImgRef(el: HTMLImageElement) {
      this.imgRefs.push(el)
    },
    hide() {
      this.deviceSupportUninstall()
      // this.onClose()
      this.destroy()
    },
    deviceSupportInstall() {
      this._keyDownHandler = rafThrottle((e: KeyboardEvent) => {
        const keyCode = e.keyCode
        const o: Record<string, () => void> = {
          27: () => this.hide(), // ESC
          32: () => this.toggleMode(), // SPACE
          37: () => this.prev(), // LEFT_ARROW
          38: () => this.handleActions('zoomIn'), // UP_ARROW
          39: () => this.next(), // RIGHT_ARROW
          40: () => this.handleActions('zoomOut') // DOWN_ARROW
        }
        const handler = o[keyCode]
        handler && handler()
      })
      this._mouseWheelHandler = rafThrottle((e: WheelEvent & { wheelDelta: number }) => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail
        if (delta > 0) {
          this.handleActions('zoomIn', {
            zoomRate: 0.015,
            enableTransition: false
          })
        } else {
          this.handleActions('zoomOut', {
            zoomRate: 0.015,
            enableTransition: false
          })
        }
      })
      on(document, 'keydown', this._keyDownHandler)
      on(document, mousewheelEventName, this._mouseWheelHandler)
    },
    deviceSupportUninstall() {
      if (this._keyDownHandler && this._mouseWheelHandler) {
        off(document, 'keydown', this._keyDownHandler)
        off(document, mousewheelEventName, this._mouseWheelHandler)
        this._keyDownHandler = null
        this._mouseWheelHandler = null
      }
    },
    handleImgLoad() {
      this.loading = false
    },
    handleImgError() {
      this.loading = false
      // e.target.alt = '加载失败'
    },
    handleMouseDown(e: MouseEvent) {
      if (this.loading || e.button !== 0) {
        return
      }

      const { offsetX, offsetY } = this.transform
      const startX = e.pageX
      const startY = e.pageY
      this._dragHandler = rafThrottle((ev: DragEvent) => {
        this.transform.offsetX = offsetX + ev.pageX - startX
        this.transform.offsetY = offsetY + ev.pageY - startY
      })
      on(document, 'mousemove', this._dragHandler)
      on(document, 'mouseup', () => {
        if (this._dragHandler) {
          off(document, 'mousemove', this._dragHandler)
        }
      })

      e.preventDefault()
    },
    reset() {
      this.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      }
    },
    toggleMode() {
      if (this.loading) {
        return
      }
      type ModeKeys = keyof typeof Mode
      const modeNames = Object.keys(Mode)
      const modeValues = Object.values(Mode)
      const index = modeValues.indexOf(this.mode)
      const nextIndex = (index + 1) % modeNames.length
      this.mode = Mode[modeNames[nextIndex] as ModeKeys]
      this.reset()
    },
    prev() {
      if (this.isFirst && !this.infinite) return
      const len = this.urlList.length
      this.index = (this.index - 1 + len) % len
    },
    next() {
      if (this.isLast && !this.infinite) return
      const len = this.urlList.length
      this.index = (this.index + 1) % len
    },
    handleActions(
      action: 'zoomOut' | 'zoomIn' | 'anticlocelise' | 'clocelise',
      options = {}
    ) {
      if (this.loading) return
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      }
      const { transform } = this
      switch (action) {
        case 'zoomOut':
          if (transform.scale > 0.2) {
            transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3))
          }
          break
        case 'zoomIn':
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
          break
        case 'clocelise':
          transform.deg += rotateDeg
          break
        case 'anticlocelise':
          transform.deg -= rotateDeg
          break
        default:
          console.error('Does not support the current action')
      }
      transform.enableTransition = enableTransition
    }
  }
})
</script>
