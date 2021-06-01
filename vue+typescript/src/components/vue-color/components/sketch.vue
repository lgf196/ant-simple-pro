<template>
  <div
    role="application"
    aria-label="Sketch color picker"
    :class="['vc-sketch', disableAlpha ? 'vc-sketch__disable-alpha' : '']"
  >
    <div class="vc-sketch-saturation-wrap">
      <Saturation v-model:value="colors" @change="childChange"></Saturation>
    </div>
    <div class="vc-sketch-controls">
      <div class="vc-sketch-sliders">
        <div class="vc-sketch-hue-wrap">
          <Hue v-model:value="colors" @change="childChange"></Hue>
        </div>
        <div class="vc-sketch-alpha-wrap" v-if="!disableAlpha">
          <Alpha v-model:value="colors" @change="childChange"></Alpha>
        </div>
      </div>
      <div class="vc-sketch-color-wrap">
        <div
          :aria-label="`Current color is ${activeColor}`"
          class="vc-sketch-active-color"
          :style="{ background: activeColor }"
        ></div>
        <checkboard></checkboard>
      </div>
    </div>
    <div class="vc-sketch-field" v-if="!disableFields">
      <!-- rgba -->
      <div class="vc-sketch-field--double">
        <EditableInput label="hex" :value="hex" @change="inputChange"></EditableInput>
      </div>
      <div class="vc-sketch-field--single">
        <EditableInput label="r" :value="colors.rgba.r" @change="inputChange"></EditableInput>
      </div>
      <div class="vc-sketch-field--single">
        <EditableInput label="g" :value="colors.rgba.g" @change="inputChange"></EditableInput>
      </div>
      <div class="vc-sketch-field--single">
        <EditableInput label="b" :value="colors.rgba.b" @change="inputChange"></EditableInput>
      </div>
      <div class="vc-sketch-field--single" v-if="!disableAlpha">
        <EditableInput label="a" :value="colors.a" :arrow-offset="0.01" :max="1" @change="inputChange"></EditableInput>
      </div>
    </div>
    <div class="vc-sketch-presets" role="group" aria-label="A color preset, pick one to set as current color">
      <template v-for="(c, index) in presetColors">
        <div
          v-if="!isTransparent(c)"
          class="vc-sketch-presets-color"
          :aria-label="'Color:' + c"
          :key="c"
          :style="{ background: c }"
          @click="handlePreset(c)"
        >
        </div>
        <div v-else :key="index" :aria-label="'Color:' + c" class="vc-sketch-presets-color" @click="handlePreset(c)">
          <checkboard />
        </div>
      </template>
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
  ColorChangeValue,
  SaturationChangeData,
  HueChangeData,
  AlphaChangeData,
  HEXChangeData,
  RGBAChangeData
} from '../types'
import { getChangeColor, isValidHex, isTransparent } from '../helpers/utils'

const presetColors = [
  '#D0021B',
  '#F5A623',
  '#F8E71C',
  '#8B572A',
  '#7ED321',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#4A90E2',
  '#50E3C2',
  '#B8E986',
  '#000000',
  '#4A4A4A',
  '#9B9B9B',
  '#FFFFFF',
  'rgba(0,0,0,0)'
]

export default defineComponent({
  name: 'Sketch',
  emits: ['update:value'],
  components: {
    Saturation,
    Hue,
    Alpha,
    EditableInput,
    Checkboard
  },
  props: {
    presetColors: {
      type: Array,
      default: () => presetColors
    },
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
      val: getChangeColor(this.value),
      oldHue: 0
    }
  },
  watch: {
    value(newVal) {
      this.val = getChangeColor(newVal)
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
    hex(): string {
      let hex = ''
      if (this.colors.a < 1) {
        hex = this.colors.hex8
      } else {
        hex = this.colors.hex
      }
      return hex.replace('#', '')
    },
    activeColor(): string {
      const rgba = this.colors.rgba
      return 'rgba(' + [rgba.r, rgba.g, rgba.b, rgba.a].join(',') + ')'
    }
  },
  methods: {
    isTransparent,
    colorChange(data: ColorChangeValue, oldHue?: number) {
      this.oldHue = this.colors.hsl.h
      this.colors = getChangeColor(data, oldHue || this.oldHue)
      this.$emit('update:value', this.colors.hex)
    },
    handlePreset(c: string) {
      this.colorChange({
        hex: c,
        source: 'hex'
      })
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
      }
    }
  }
})
</script>

<style>
.vc-sketch {
  position: relative;
  width: 200px;
  padding: 10px 10px 0;
  box-sizing: initial;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.15);
}

.vc-sketch-saturation-wrap {
  width: 100%;
  padding-bottom: 75%;
  position: relative;
  overflow: hidden;
}

.vc-sketch-controls {
  display: flex;
}

.vc-sketch-sliders {
  padding: 4px 0;
  flex: 1;
}

.vc-sketch-sliders .vc-hue,
.vc-sketch-sliders .vc-alpha-gradient {
  border-radius: 2px;
}

.vc-sketch-hue-wrap {
  position: relative;
  height: 10px;
}

.vc-sketch-alpha-wrap {
  position: relative;
  height: 10px;
  margin-top: 4px;
  overflow: hidden;
}

.vc-sketch-color-wrap {
  width: 24px;
  height: 24px;
  position: relative;
  margin-top: 4px;
  margin-left: 4px;
  border-radius: 3px;
}

.vc-sketch-active-color {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15), inset 0 0 4px rgba(0, 0, 0, 0.25);
  z-index: 2;
}

.vc-sketch-color-wrap .vc-checkerboard {
  background-size: auto;
}

.vc-sketch-field {
  display: flex;
  padding-top: 4px;
}

.vc-sketch-field .vc-input__input {
  width: 90%;
  padding: 4px 0 3px 10%;
  border: none;
  box-shadow: inset 0 0 0 1px #ccc;
  font-size: 10px;
}

.vc-sketch-field .vc-input__label {
  display: block;
  text-align: center;
  font-size: 11px;
  color: #222;
  padding-top: 3px;
  padding-bottom: 4px;
  text-transform: capitalize;
}

.vc-sketch-field--single {
  flex: 1;
  padding-left: 6px;
}

.vc-sketch-field--double {
  flex: 2;
}

.vc-sketch-presets {
  margin-right: -10px;
  margin-left: -10px;
  padding-left: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;
}

.vc-sketch-presets-color {
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin: 0 10px 10px 0;
  vertical-align: top;
  cursor: pointer;
  width: 16px;
  height: 16px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
}

.vc-sketch-presets-color .vc-checkerboard {
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.vc-sketch__disable-alpha .vc-sketch-color-wrap {
  height: 10px;
}
</style>
