<template>
  <transition name="com-zoom-in-center" appear>
    <div
      v-if="show"
      ref="com-image-viewer__wrapper"
      tabindex="-1"
      class="com-image-viewer__wrapper"
      :style="{ 'z-index': zIndex }"
    >
      <div class="com-image-viewer__mask" @click.self="handleMaskClick"></div>
      <!-- CLOSE -->
      <span class="com-image-viewer__btn com-image-viewer__close" @click="hide">
        <CloseCircleOutlined class="com-icon-circle-close" />
      </span>
      <!-- ARROW -->
      <template v-if="!isSingle">
        <span
          class="com-image-viewer__btn com-image-viewer__prev"
          :class="{ 'is-disabled': !infinite && isFirst }"
          @click="prev"
        >
          <ComSvgIcon name="arrow-left"></ComSvgIcon>
        </span>
        <span
          class="com-image-viewer__btn com-image-viewer__next"
          :class="{ 'is-disabled': !infinite && isLast }"
          @click="next"
        >
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
          :key="i"
          class="com-image-viewer__img"
          :src="currentImg"
          :style="imgStyle"
          @load="handleImgLoad"
          @error="handleImgError"
          @mousedown="handleMouseDown"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from 'vue'
import { on, off } from '@/utils/dom'
import { rafThrottle } from '@/utils'
import { CloseCircleOutlined } from '@ant-design/icons-vue'
import ComSvgIcon from '@/components/svg-icon/index.vue'

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
  components: {
    CloseCircleOutlined,
    ComSvgIcon
  },

  emits: ['update:show'],

  props: {
    urlList: {
      type: Array,
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
    initialIndex: {
      type: Number,
      default: 0
    },
    show: {
      type: Boolean,
      default: false
    },
    maskClosable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      index: this.initialIndex,
      // visible: false,
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
      imgRefs: [],
      _keyDownHandler: (() => {}), // eslint-disable-line
      _mouseWheelHandler: (() => {}), // eslint-disable-line
      _dragHandler: (() => {}) // eslint-disable-line
    }
  },
  computed: {
    currentUrlList() {
      return this.urlList.filter((_, i) => i === this.index)
    },
    isSingle() {
      return this.urlList.length <= 1
    },
    isFirst() {
      return this.index === 0
    },
    isLast() {
      return this.index === this.urlList.length - 1
    },
    currentImg() {
      return this.urlList[this.index]
    },
    imgStyle() {
      const { scale, deg, offsetX, offsetY, enableTransition } = this.transform
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? 'transform .3s' : '',
        'margin-left': `${offsetX}px`,
        'margin-top': `${offsetY}px`
      }
      if (this.mode.name === Mode.CONTAIN.name) {
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
      setTimeout(() => {
        const $img = this.imgRefs[0]
        if (!$img.complete) {
          this.loading = true
        }
      }, 20)
    }
  },
  mounted() {
    this.deviceSupportInstall()
    // add tabindex then wrapper can be focusable via Javascript
    // focus wrapper so arrow key can't cause inner scroll behavior underneath
    const wrapper = this.$refs['com-image-viewer__wrapper']
    wrapper && wrapper.focus()
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
    setImgRef(el) {
      this.imgRefs.push(el)
    },
    hide() {
      this.deviceSupportUninstall()
      // this.visible = false
      this.$emit('update:show', false)
    },
    deviceSupportInstall() {
      this._keyDownHandler = rafThrottle(e => {
        const keyCode = e.keyCode
        const o = {
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
      this._mouseWheelHandler = rafThrottle(e => {
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
    handleMouseDown(e) {
      if (this.loading || e.button !== 0) {
        return
      }

      const { offsetX, offsetY } = this.transform
      const startX = e.pageX
      const startY = e.pageY
      this._dragHandler = rafThrottle(ev => {
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
    handleMaskClick() {
      if (this.maskClosable) {
        this.hide()
      }
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
      const modeNames = Object.keys(Mode)
      const modeValues = Object.values(Mode)
      const index = modeValues.findIndex(v => v.name === this.mode.name)
      const nextIndex = (index + 1) % modeNames.length
      this.mode = Mode[modeNames[nextIndex]]
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
    handleActions(action, options = {}) {
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
