<template>
  <div :class="['vc-hue', directionClass]">
    <div
      class="vc-hue-container"
      role="slider"
      :aria-valuenow="colors.hsl.h"
      aria-valuemin="0"
      aria-valuemax="360"
      ref="container"
      @mousedown="handleMouseDown"
      @touchmove="handleChange"
      @touchstart="handleChange"
    >
      <div class="vc-hue-pointer" :style="{ top: pointerTop, left: pointerLeft }" role="presentation">
        <div class="vc-hue-picker"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ColorResult, HueChangeData } from '../../types'

export default defineComponent({
  name: 'Hue',
  emits: ['change'],
  props: {
    value: {
      type: Object as PropType<ColorResult>,
      default: () => ({})
    },
    direction: {
      type: String as PropType<'horizontal' | 'vertical'>,
      default: 'horizontal'
    }
  },
  data() {
    return {
      oldHue: 0,
      pullDirection: ''
    }
  },
  watch: {
    value(newVal: ColorResult) {
      const h = newVal.hsl.h
      if (h !== 0 && h - this.oldHue > 0) {
        this.pullDirection = 'right'
      }
      if (h !== 0 && h - this.oldHue < 0) {
        this.pullDirection = 'left'
      }
      this.oldHue = h
    }
  },
  computed: {
    colors(): ColorResult {
      return this.value
    },
    directionClass(): Record<string, boolean> {
      return {
        'vc-hue--horizontal': this.direction === 'horizontal',
        'vc-hue--vertical': this.direction === 'vertical'
      }
    },
    pointerTop(): number | string {
      if (this.direction === 'vertical') {
        if (this.colors.hsl.h === 0 && this.pullDirection === 'right') {
          return 0
        }
        return -((this.colors.hsl.h * 100) / 360) + 100 + '%'
      }
      return 0
    },
    pointerLeft(): number | string {
      if (this.direction === 'vertical') {
        return 0
      }
      if (this.colors.hsl.h === 0 && this.pullDirection === 'right') {
        return '100%'
      }
      return (this.colors.hsl.h * 100) / 360 + '%'
    }
  },
  methods: {
    handleChange(e: MouseEvent | TouchEvent, skip?: boolean) {
      !skip && e.preventDefault()

      const container = this.$refs.container as HTMLElement
      if (!container) {
        // for some edge cases, container may not exist. see #220
        return
      }
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight

      const xOffset = container.getBoundingClientRect().left + window.pageXOffset
      const yOffset = container.getBoundingClientRect().top + window.pageYOffset
      const pageX = (e as MouseEvent).pageX || ((e as TouchEvent).touches ? (e as TouchEvent).touches[0].pageX : 0)
      const pageY = (e as MouseEvent).pageY || ((e as TouchEvent).touches ? (e as TouchEvent).touches[0].pageY : 0)
      const left = pageX - xOffset
      const top = pageY - yOffset

      let h = 0
      let percent = 0

      if (this.direction === 'vertical') {
        if (top < 0) {
          h = 360
        } else if (top > containerHeight) {
          h = 0
        } else {
          percent = -((top * 100) / containerHeight) + 100
          h = (360 * percent) / 100
        }

        if (this.colors.hsl.h !== h) {
          const hueData: HueChangeData = {
            h,
            s: this.colors.hsl.s,
            l: this.colors.hsl.l,
            a: this.colors.hsl.a,
            source: 'hsl'
          }
          this.$emit('change', hueData)
        }
      } else {
        if (left < 0) {
          h = 0
        } else if (left > containerWidth) {
          h = 360
        } else {
          percent = (left * 100) / containerWidth
          h = (360 * percent) / 100
        }

        if (this.colors.hsl.h !== h) {
          const hueData: HueChangeData = {
            h,
            s: this.colors.hsl.s,
            l: this.colors.hsl.l,
            a: this.colors.hsl.a,
            source: 'hsl'
          }
          this.$emit('change', hueData)
        }
      }
    },
    handleMouseDown(e: MouseEvent | TouchEvent) {
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
.vc-hue {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  border-radius: 2px;
}
.vc-hue--horizontal {
  background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}
.vc-hue--vertical {
  background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);
}
.vc-hue-container {
  cursor: pointer;
  margin: 0 2px;
  position: relative;
  height: 100%;
}
.vc-hue-pointer {
  z-index: 2;
  position: absolute;
}
.vc-hue-picker {
  cursor: pointer;
  margin-top: 1px;
  width: 4px;
  border-radius: 1px;
  height: 8px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
  background: #fff;
  transform: translateX(-2px);
}
</style>
