<template>
  <div class="com-image" :class="className">
    <slot v-if="loading" name="placeholder">
      <div class="com-image__placeholder"></div>
    </slot>
    <slot v-else-if="error" name="error">
      <div class="com-image__error">加载失败</div>
    </slot>
    <img
      v-else
      class="com-image__inner"
      v-bind="$attrs"
      @click="clickHandler"
      :src="src"
      :style="imageStyle"
      :class="{ 'com-image__inner--center': alignCenter, 'com-image__preview': preview }">
    <template v-if="!preview">
      <!-- <image-viewer :zIndex="zIndex" :initialIndex="imageIndex" v-model:visible="showViewer" :onClose="closeViewer" :urlList="previewSrcList"/> -->
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import ImageViewer from './image-viewer'
import { on, off, getScrollContainer, isInContainer } from '@/utils/dom'
import { isString, isHtmlElement } from '@/utils/type'
import { throttle } from 'lodash'
import './index.less'

const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined

const ObjectFit = {
  NONE: 'none',
  CONTAIN: 'contain',
  COVER: 'cover',
  FILL: 'fill',
  SCALE_DOWN: 'scale-down'
}
type ObjectFitType = 'none' | 'contain' | 'cover' | 'fill' | 'scale-down'

export default defineComponent({
  name: 'ComImage',

  inheritAttrs: false,

  components: {
    // ImageViewer
  },

  props: {
    className: String,
    src: String,
    fit: String,
    lazy: Boolean,
    scrollContainer: {},
    previewSrcList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    }
  },

  data() {
    return {
      loading: true,
      error: false,
      show: !this.lazy,
      imageWidth: 0,
      imageHeight: 0,
      showViewer: false,
      _scrollContainer: null as HTMLElement | null,  // eslint-disable-line
      _lazyLoadHandler: (() => {}) as (() => void) | null  // eslint-disable-line
    }
  },

  computed: {
    imageStyle(): Record<string, unknown> {
      const { fit } = this
      if (fit) {
        return isSupportObjectFit()
          ? { 'object-fit': fit }
          : this.getImageStyle(fit)
      }
      return {}
    },
    alignCenter(): boolean {
      return !isSupportObjectFit() && this.fit !== ObjectFit.FILL
    },
    preview(): boolean {
      const { previewSrcList } = this
      return Array.isArray(previewSrcList) && previewSrcList.length > 0
    },
    imageIndex() {
      let previewIndex = 0
      const srcIndex = this.previewSrcList.indexOf(this.src)
      if (srcIndex >= 0) {
        previewIndex = srcIndex
      }
      return previewIndex
    }
  },

  watch: {
    src() {
      this.show && this.loadImage()
    },
    show(val) {
      val && this.loadImage()
    }
  },

  mounted() {
    if (this.lazy) {
      this.addLazyLoadListener()
    } else {
      this.loadImage()
    }
  },

  beforeUnmount() {
    this.lazy && this.removeLazyLoadListener()
  },

  methods: {
    loadImage() {
      // reset status
      this.loading = true
      this.error = false

      const img = new Image()
      img.onload = e => this.handleLoad(e, img)
      img.onerror = this.handleError.bind(this)

      // bind html attrs
      // so it can behave consistently
      Object.keys(this.$attrs)
        .forEach((key) => {
          const value = this.$attrs[key] as string
          img.setAttribute(key, value)
        })
      if (this.src) {
        img.src = this.src
      }
    },
    handleLoad(e: Event, img: HTMLImageElement) {
      this.imageWidth = img.width
      this.imageHeight = img.height
      this.loading = false
      this.error = false
    },
    handleError(e: Event | string) {
      this.loading = false
      this.error = true
      this.$emit('error', e)
    },
    handleLazyLoad() {
      if (!this._scrollContainer) {
        return
      }
      if (isInContainer(this.$el, this._scrollContainer)) {
        this.show = true
        this.removeLazyLoadListener()
      }
    },
    addLazyLoadListener() {
      const { scrollContainer } = this
      let _scrollContainer = null

      if (isHtmlElement(scrollContainer)) {
        _scrollContainer = scrollContainer
      } else if (isString(scrollContainer)) {
        _scrollContainer = document.querySelector(scrollContainer)
      } else {
        _scrollContainer = getScrollContainer(this.$el)
      }

      if (_scrollContainer) {
        this._scrollContainer = _scrollContainer as HTMLElement
        this._lazyLoadHandler = throttle(this.handleLazyLoad, 200)
        on(_scrollContainer as HTMLElement, 'scroll', this._lazyLoadHandler)
        this.handleLazyLoad()
      }
    },
    removeLazyLoadListener() {
      const { _scrollContainer, _lazyLoadHandler } = this

      if (!_scrollContainer || !_lazyLoadHandler) return

      off(_scrollContainer, 'scroll', _lazyLoadHandler)
      this._scrollContainer = null
      this._lazyLoadHandler = null
    },
    /**
       * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
       */
    getImageStyle(fit: string) {
      const { imageWidth, imageHeight } = this
      const {
        clientWidth: containerWidth,
        clientHeight: containerHeight
      } = this.$el

      if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {}

      const vertical = imageWidth / imageHeight < 1

      if (fit === ObjectFit.SCALE_DOWN) {
        const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight
        fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN
      }

      switch (fit) {
        case ObjectFit.NONE:
          return { width: 'auto', height: 'auto' }
        case ObjectFit.CONTAIN:
          return vertical ? { width: 'auto' } : { height: 'auto' }
        case ObjectFit.COVER:
          return vertical ? { height: 'auto' } : { width: 'auto' }
        default:
          return {}
      }
    },
    clickHandler() {
      // don't show viewer when preview is false
      if (!this.preview) {
        return
      }
      this.showViewer = true
    },
    closeViewer() {
      this.showViewer = false
    }
  }
})
</script>
