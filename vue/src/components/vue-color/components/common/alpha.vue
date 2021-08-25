<template>
  <div class="vc-alpha">
    <div class="vc-alpha-checkboard-wrap">
      <Checkboard />
    </div>
    <div class="vc-alpha-gradient" :style="{ background: gradientColor }" />
    <div
      ref="container"
      class="vc-alpha-container"
      @mousedown="handleMouseDown"
      @touchmove="handleChange"
      @touchstart="handleChange"
    >
      <div class="vc-alpha-pointer" :style="{ left: colors.a * 100 + '%' }">
        <div class="vc-alpha-picker" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Checkboard from './checkboard.vue'

export default defineComponent({
  components: {
    Checkboard
  },
  emits: ['change'],
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    colors() {
      return this.value
    },
    gradientColor() {
      const rgba = this.colors.rgba
      const rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
      return 'linear-gradient(to right, rgba(' + rgbStr + ', 0) 0%, rgba(' + rgbStr + ', 1) 100%)'
    }
  },
  methods: {
    handleChange(e, skip) {
      !skip && e.preventDefault()
      const container = this.$refs.container
      if (!container) {
        // for some edge cases, container may not exist. see #220
        return
      }
      const containerWidth = container.clientWidth

      const xOffset = container.getBoundingClientRect().left + window.pageXOffset
      const pageX = e.pageX || (e.touches ? e.touches[0].pageX : 0)
      const left = pageX - xOffset

      let a = 1
      if (left < 0) {
        a = 0
      } else if (left > containerWidth) {
        a = 1
      } else {
        a = Math.round((left * 100) / containerWidth) / 100
      }

      if (this.colors.a !== a) {
        const alphaData = {
          h: this.colors.hsl.h,
          s: this.colors.hsl.s,
          l: this.colors.hsl.l,
          a,
          source: 'rgba'
        }
        this.$emit('change', alphaData)
      }
    },
    handleMouseDown(e) {
      this.handleChange(e, true)
      window.addEventListener('mousemove', this.handleChange)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp() {
      this.unbindEventListeners()
    },
    unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange)
      window.removeEventListener('mouseup', this.handleMouseUp)
    }
  }
})
</script>

<style>
.vc-alpha {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.vc-alpha-checkboard-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}

.vc-alpha-gradient {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.vc-alpha-container {
  cursor: pointer;
  position: relative;
  z-index: 2;
  height: 100%;
  margin: 0 3px;
  -webkit-tap-highlight-color: transparent; /* for removing the highlight */
}

.vc-alpha-pointer {
  z-index: 2;
  position: absolute;
}

.vc-alpha-picker {
  cursor: pointer;
  width: 4px;
  border-radius: 1px;
  height: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  background: #fff;
  margin-top: 1px;
  transform: translateX(-2px);
}
</style>
