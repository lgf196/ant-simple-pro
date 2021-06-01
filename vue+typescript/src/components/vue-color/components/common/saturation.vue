<template>
  <div
    class="vc-saturation"
    :style="{ background: bgColor }"
    ref="container"
    @mousedown="handleMouseDown"
    @touchmove="handleChange"
    @touchstart="handleChange"
  >
    <div class="vc-saturation--white"></div>
    <div class="vc-saturation--black"></div>
    <div class="vc-saturation-pointer" :style="{ top: pointerTop, left: pointerLeft }">
      <div class="vc-saturation-circle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { clamp } from '../../helpers/utils'
import { throttle } from 'lodash'
import { ColorResult, SaturationChangeData } from '../../types'

export default defineComponent({
  name: 'Saturation',
  emits: ['change'],
  props: {
    value: {
      type: Object as PropType<ColorResult>,
      default: () => ({})
    }
  },
  computed: {
    colors(): ColorResult {
      return this.value
    },
    bgColor(): string {
      return `hsl(${this.colors.hsv.h}, 100%, 50%)`
    },
    pointerTop(): string {
      return -(this.colors.hsv.v * 100) + 1 + 100 + '%'
    },
    pointerLeft(): string {
      return this.colors.hsv.s * 100 + '%'
    }
  },
  methods: {
    throttle: throttle(
      (fn, data) => {
        fn(data)
      },
      20,
      {
        leading: true,
        trailing: false
      }
    ),
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
      const left = clamp(pageX - xOffset, 0, containerWidth)
      const top = clamp(pageY - yOffset, 0, containerHeight)
      const saturation = left / containerWidth
      const bright = clamp(-(top / containerHeight) + 1, 0, 1)

      const saturationData: SaturationChangeData = {
        h: this.colors.hsv.h,
        s: saturation,
        v: bright,
        a: this.colors.hsv.a,
        source: 'hsva'
      }

      this.throttle(this.onChange, saturationData)
    },
    onChange(param: SaturationChangeData) {
      this.$emit('change', param)
    },
    handleMouseDown() {
      window.addEventListener('mousemove', this.handleChange)
      window.addEventListener('mouseup', this.handleChange)
      window.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseUp() {
      this.unbindEventListeners()
    },
    unbindEventListeners() {
      window.removeEventListener('mousemove', this.handleChange)
      window.removeEventListener('mouseup', this.handleChange)
      window.removeEventListener('mouseup', this.handleMouseUp)
    }
  }
})
</script>

<style>
.vc-saturation,
.vc-saturation--white,
.vc-saturation--black {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.vc-saturation--white {
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
}
.vc-saturation--black {
  background: linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}
.vc-saturation-pointer {
  cursor: pointer;
  position: absolute;
}
.vc-saturation-circle {
  cursor: head;
  width: 4px;
  height: 4px;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0, 0, 0, 0.3), 0 0 1px 2px rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  transform: translate(-2px, -2px);
}
</style>
