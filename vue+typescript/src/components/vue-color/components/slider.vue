<template>
  <div role="application" aria-label="Slider color picker" class="vc-slider">
    <div class="vc-slider-hue-warp">
      <hue v-model:value="colors" @change="hueChange"></hue>
    </div>
    <div class="vc-slider-swatches" role="group">
      <div
        v-for="(swatch, index) in normalizedSwatches"
        :key="index"
        class="vc-slider-swatch"
        :data-index="index"
        :aria-label="'color:' + colors.hex"
        role="button"
        @click="handleSwClick(swatch)"
      >
        <div
          class="vc-slider-swatch-picker"
          :class="{
            'vc-slider-swatch-picker--active': isActive(swatch),
            'vc-slider-swatch-picker--white': swatch.l === 1
          }"
          :style="{ background: 'hsl(' + colors.hsl.h + ', ' + swatch.s * 100 + '%, ' + swatch.l * 100 + '%)' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Hue from './common/hue.vue'
import { ColorResult, ColorChangeValue, HueChangeData } from '../types'
import { getChangeColor } from '../helpers/utils'

const DEFAULT_SATURATION = 0.5

type SwatchItem = {
  s: number
  l: number
}

export default defineComponent({
  name: 'Slider',
  components: {
    Hue
  },
  // mixins: [colorMixin],
  emits: ['update:value'],
  props: {
    swatches: {
      type: Array as PropType<Array<SwatchItem | number>>,
      // also accepts: ['.80', '.65', '.50', '.35', '.20']
      default: () => [
        { s: DEFAULT_SATURATION, l: 0.8 },
        { s: DEFAULT_SATURATION, l: 0.65 },
        { s: DEFAULT_SATURATION, l: 0.5 },
        { s: DEFAULT_SATURATION, l: 0.35 },
        { s: DEFAULT_SATURATION, l: 0.2 }
      ]
    },
    value: {
      type: [Object, String],
      default: () => ({})
    }
  },
  data() {
    return {
      val: getChangeColor(this.value),
      oldHue: 0
    }
  },
  computed: {
    colors: {
      get(): ColorResult {
        return this.val
      },
      set(newVal: any) {
        this.val = newVal
        this.$emit('update:value', newVal)
      }
    },
    normalizedSwatches(): SwatchItem[] {
      const swatches = this.swatches
      return swatches.map(swatch => {
        // to be compatible with another data format ['.80', '.65', '.50', '.35', '.20']
        if (typeof swatch === 'number') {
          return {
            s: DEFAULT_SATURATION,
            l: swatch
          }
        }
        return swatch
      })
    }
  },
  methods: {
    colorChange(data: ColorChangeValue, oldHue?: number) {
      this.oldHue = this.colors.hsl.h
      this.colors = getChangeColor(data, oldHue || this.oldHue)
      this.$emit('update:value', this.colors.hex)
    },
    isActive(swatch: SwatchItem) {
      const hsl = this.colors.hsl
      if (hsl.l === 1 && swatch.l === 1) {
        return true
      }
      if (hsl.l === 0 && swatch.l === 0) {
        return true
      }
      return Math.abs(hsl.l - swatch.l) < 0.01 && Math.abs(hsl.s - swatch.s) < 0.01
    },
    hueChange(data: HueChangeData) {
      this.colorChange(data)
    },
    handleSwClick(swatch: SwatchItem) {
      this.colorChange({
        h: this.colors.hsl.h,
        s: swatch.s,
        l: swatch.l,
        source: 'hsl'
      })
    }
  }
})
</script>

<style>
.vc-slider {
  position: relative;
  width: 410px;
}

.vc-slider-hue-warp {
  height: 12px;
  position: relative;
}

.vc-slider-hue-warp .vc-hue-picker {
  width: 14px;
  height: 14px;
  border-radius: 6px;
  transform: translate(-7px, -2px);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
}

.vc-slider-swatches {
  display: flex;
  margin-top: 20px;
}

.vc-slider-swatch {
  margin-right: 1px;
  flex: 1;
  width: 20%;
}

.vc-slider-swatch:first-child {
  margin-right: 1px;
}

.vc-slider-swatch:first-child .vc-slider-swatch-picker {
  border-radius: 2px 0 0 2px;
}

.vc-slider-swatch:last-child {
  margin-right: 0;
}

.vc-slider-swatch:last-child .vc-slider-swatch-picker {
  border-radius: 0 2px 2px 0;
}

.vc-slider-swatch-picker {
  cursor: pointer;
  height: 12px;
}

.vc-slider-swatch:nth-child(n) .vc-slider-swatch-picker.vc-slider-swatch-picker--active {
  transform: scaleY(1.8);
  border-radius: 3.6px/2px;
}

.vc-slider-swatch-picker--white {
  box-shadow: inset 0 0 0 1px #ddd;
}

.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white {
  box-shadow: inset 0 0 0 0.6px #ddd;
}
</style>
