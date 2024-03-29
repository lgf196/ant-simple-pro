<template>
  <div
    role="application"
    aria-label="Chrome color picker"
    :class="['vc-chrome', disableAlpha ? 'vc-chrome__disable-alpha' : '']"
  >
    <div class="vc-chrome-saturation-wrap">
      <saturation v-model:value="colors" @change="childChange"></saturation>
    </div>
    <div class="vc-chrome-body">
      <div class="vc-chrome-controls">
        <div class="vc-chrome-color-wrap">
          <div
            :aria-label="`current color is ${colors.hex}`"
            class="vc-chrome-active-color"
            :style="{ background: activeColor }"
          ></div>
          <checkboard v-if="!disableAlpha"></checkboard>
        </div>

        <div class="vc-chrome-sliders">
          <div class="vc-chrome-hue-wrap">
            <hue v-model:value="colors" @change="childChange"></hue>
          </div>
          <div v-if="!disableAlpha" class="vc-chrome-alpha-wrap">
            <alpha v-model:value="colors" @change="childChange"></alpha>
          </div>
        </div>
      </div>

      <div v-if="!disableFields" class="vc-chrome-fields-wrap">
        <div v-show="fieldsIndex === 0" class="vc-chrome-fields">
          <!-- hex -->
          <div class="vc-chrome-field">
            <ed-in v-if="!hasAlpha" label="hex" :value="colors.hex" @change="inputChange"></ed-in>
            <ed-in v-if="hasAlpha" label="hex" :value="colors.hex8" @change="inputChange"></ed-in>
          </div>
        </div>
        <div v-show="fieldsIndex === 1" class="vc-chrome-fields">
          <!-- rgba -->
          <div class="vc-chrome-field">
            <ed-in label="r" :value="colors.rgba.r" @change="inputChange"></ed-in>
          </div>
          <div class="vc-chrome-field">
            <ed-in label="g" :value="colors.rgba.g" @change="inputChange"></ed-in>
          </div>
          <div class="vc-chrome-field">
            <ed-in label="b" :value="colors.rgba.b" @change="inputChange"></ed-in>
          </div>
          <div v-if="!disableAlpha" class="vc-chrome-field">
            <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
          </div>
        </div>
        <div v-show="fieldsIndex === 2" class="vc-chrome-fields">
          <!-- hsla -->
          <div class="vc-chrome-field">
            <ed-in label="h" :value="hsl.h" @change="inputChange"></ed-in>
          </div>
          <div class="vc-chrome-field">
            <ed-in label="s" :value="hsl.s" @change="inputChange"></ed-in>
          </div>
          <div class="vc-chrome-field">
            <ed-in label="l" :value="hsl.l" @change="inputChange"></ed-in>
          </div>
          <div v-if="!disableAlpha" class="vc-chrome-field">
            <ed-in label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></ed-in>
          </div>
        </div>
        <!-- btn -->
        <div
          class="vc-chrome-toggle-btn"
          role="button"
          aria-label="Change another color definition"
          @click="toggleViews"
        >
          <div class="vc-chrome-toggle-icon">
            <svg
              style="width: 24px; height: 24px"
              viewBox="0 0 24 24"
              @mouseover="showHighlight"
              @mouseenter="showHighlight"
              @mouseout="hideHighlight"
            >
              <path
                fill="#333"
                d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
              />
            </svg>
          </div>
          <div v-show="highlight" class="vc-chrome-toggle-icon-highlight"></div>
        </div>
        <!-- btn -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditableInput from './common/editable-input.vue'
import Saturation from './common/saturation.vue'
import Hue from './common/hue.vue'
import Alpha from './common/alpha.vue'
import Checkboard from './common/checkboard.vue'
import {
  ColorResult,
  SaturationChangeData,
  HueChangeData,
  AlphaChangeData,
  HEXChangeData,
  RGBAChangeData,
  HSLChangeData,
  ColorChangeValue
} from '../types'
import { getChangeColor, isValidHex } from '../helpers/utils'

export default defineComponent({
  name: 'Chrome',
  components: {
    Saturation,
    Hue,
    Alpha,
    'ed-in': EditableInput,
    Checkboard
  },
  emits: ['update:value'],
  props: {
    disableAlpha: {
      type: Boolean,
      default: false
    },
    disableFields: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Object, String],
      default: () => ({})
    }
  },
  data() {
    return {
      fieldsIndex: 0,
      highlight: false,
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
    hsl(): Record<string, string> {
      const { h, s, l } = this.colors.hsl
      return {
        h: Number(h).toFixed(),
        s: `${(s * 100).toFixed()}%`,
        l: `${(l * 100).toFixed()}%`
      }
    },
    activeColor(): string {
      const rgba = this.colors.rgba
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
    },
    hasAlpha(): boolean {
      return this.colors.a < 1
    }
  },
  watch: {
    value(newVal) {
      this.val = getChangeColor(newVal)
    }
  },
  methods: {
    colorChange(data: ColorChangeValue, oldHue?: number) {
      this.oldHue = this.colors.hsl.h
      this.colors = getChangeColor(data, oldHue || this.oldHue)
      this.$emit('update:value', this.colors.hex)
    },
    simpleCheckForValidColor(data: any) {
      const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'l', 'v']
      let checked = 0
      let passed = 0

      for (let i = 0; i < keysToCheck.length; i++) {
        const letter = keysToCheck[i]
        if (data[letter]) {
          checked++
          if (!isNaN(data[letter])) {
            passed++
          }
        }
      }

      if (checked === passed) {
        return data
      }
    },
    childChange(data: SaturationChangeData | HueChangeData | AlphaChangeData) {
      this.colorChange(data)
    },
    inputChange(data: Record<string, string>) {
      if (!data) {
        return
      }
      if (data.hex) {
        if (isValidHex(data.hex)) {
          const hexData: HEXChangeData = {
            hex: data.hex,
            source: 'hex'
          }
          this.colorChange(hexData)
        }
      } else if (data.r || data.g || data.b || data.a) {
        const rgbaData: RGBAChangeData = {
          r: Number(data.r) || this.colors.rgba.r,
          g: Number(data.g) || this.colors.rgba.g,
          b: Number(data.b) || this.colors.rgba.b,
          a: Number(data.a) || this.colors.rgba.a || 1,
          source: 'rgba'
        }
        this.colorChange(rgbaData)
      } else if (data.h || data.s || data.l) {
        const s = data.s ? Number(data.s.replace('%', '')) / 100 : this.colors.hsl.s
        const l = data.l ? Number(data.l.replace('%', '')) / 100 : this.colors.hsl.l
        const hslData: HSLChangeData = {
          h: Number(data.h) || this.colors.hsl.h,
          s,
          l,
          source: 'hsl'
        }
        this.colorChange(hslData)
      }
    },
    toggleViews() {
      if (this.fieldsIndex >= 2) {
        this.fieldsIndex = 0
        return
      }
      this.fieldsIndex++
    },
    showHighlight() {
      this.highlight = true
    },
    hideHighlight() {
      this.highlight = false
    }
  }
})
</script>

<style>
.vc-chrome {
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.3);
  box-sizing: initial;
  width: 225px;
  font-family: Menlo;
  background-color: #fff;
}

.vc-chrome-controls {
  display: flex;
}

.vc-chrome-color-wrap {
  position: relative;
  width: 36px;
}

.vc-chrome-active-color {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  z-index: 1;
}

.vc-chrome-color-wrap .vc-checkerboard {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-size: auto;
}

.vc-chrome-sliders {
  flex: 1;
}

.vc-chrome-fields-wrap {
  display: flex;
  padding-top: 16px;
}

.vc-chrome-fields {
  display: flex;
  margin-left: -6px;
  flex: 1;
}

.vc-chrome-field {
  padding-left: 6px;
  width: 100%;
}

.vc-chrome-toggle-btn {
  width: 32px;
  text-align: right;
  position: relative;
}

.vc-chrome-toggle-icon {
  margin-right: -4px;
  margin-top: 12px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.vc-chrome-toggle-icon-highlight {
  position: absolute;
  width: 24px;
  height: 28px;
  background: #eee;
  border-radius: 4px;
  top: 10px;
  left: 12px;
}

.vc-chrome-hue-wrap {
  position: relative;
  height: 10px;
  margin-bottom: 8px;
}

.vc-chrome-alpha-wrap {
  position: relative;
  height: 10px;
}

.vc-chrome-hue-wrap .vc-hue {
  border-radius: 2px;
}

.vc-chrome-alpha-wrap .vc-alpha-gradient {
  border-radius: 2px;
}

.vc-chrome-hue-wrap .vc-hue-picker,
.vc-chrome-alpha-wrap .vc-alpha-picker {
  width: 12px;
  height: 12px;
  border-radius: 6px;
  transform: translate(-6px, -2px);
  background-color: rgb(248, 248, 248);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);
}

.vc-chrome-body {
  padding: 16px 16px 12px;
  background-color: #fff;
}

.vc-chrome-saturation-wrap {
  width: 100%;
  padding-bottom: 55%;
  position: relative;
  border-radius: 2px 2px 0 0;
  overflow: hidden;
}

.vc-chrome-saturation-wrap .vc-saturation-circle {
  width: 12px;
  height: 12px;
}

.vc-chrome-fields .vc-input__input {
  font-size: 11px;
  color: #333;
  width: 100%;
  border-radius: 2px;
  border: none;
  box-shadow: inset 0 0 0 1px #dadada;
  height: 21px;
  text-align: center;
}

.vc-chrome-fields .vc-input__label {
  text-transform: uppercase;
  font-size: 11px;
  line-height: 11px;
  color: #969696;
  text-align: center;
  display: block;
  margin-top: 12px;
}

.vc-chrome__disable-alpha .vc-chrome-active-color {
  width: 18px;
  height: 18px;
}

.vc-chrome__disable-alpha .vc-chrome-color-wrap {
  width: 30px;
}

.vc-chrome__disable-alpha .vc-chrome-hue-wrap {
  margin-top: 4px;
  margin-bottom: 4px;
}
</style>
