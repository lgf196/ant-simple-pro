<template>
  <div
    role="application"
    aria-label="PhotoShop color picker"
    :class="['vc-photoshop', disableFields ? 'vc-photoshop__disable-fields' : '']"
  >
    <div role="heading" class="vc-ps-head">{{ head }}</div>
    <div class="vc-ps-body">
      <div class="vc-ps-saturation-wrap">
        <saturation v-model:value="colors" @change="childChange"></saturation>
      </div>
      <div class="vc-ps-hue-wrap">
        <hue v-model:value="colors" @change="childChange" direction="vertical">
          <div class="vc-ps-hue-pointer">
            <i class="vc-ps-hue-pointer--left"></i><i class="vc-ps-hue-pointer--right"></i>
          </div>
        </hue>
      </div>
      <div :class="['vc-ps-controls', disableFields ? 'vc-ps-controls__disable-fields' : '']">
        <div class="vc-ps-previews">
          <div class="vc-ps-previews__label">{{ newLabel }}</div>
          <div class="vc-ps-previews__swatches">
            <div
              class="vc-ps-previews__pr-color"
              :aria-label="`New color is ${colors.hex}`"
              :style="{ background: colors.hex }"
            ></div>
            <div
              class="vc-ps-previews__pr-color"
              :aria-label="`Current color is ${currentColor}`"
              :style="{ background: currentColor }"
              @click="clickCurrentColor"
            ></div>
          </div>
          <div class="vc-ps-previews__label">{{ currentLabel }}</div>
        </div>
        <div class="vc-ps-actions" v-if="!disableFields">
          <div class="vc-ps-ac-btn" role="button" :aria-label="acceptLabel" @click="handleAccept">{{
            acceptLabel
          }}</div>
          <div class="vc-ps-ac-btn" role="button" :aria-label="cancelLabel" @click="handleCancel">{{
            cancelLabel
          }}</div>

          <div class="vc-ps-fields">
            <!-- hsla -->
            <ed-in label="h" desc="°" :value="hsv.h" @change="inputChange"></ed-in>
            <ed-in label="s" desc="%" :value="hsv.s" :max="100" @change="inputChange"></ed-in>
            <ed-in label="v" desc="%" :value="hsv.v" :max="100" @change="inputChange"></ed-in>
            <div class="vc-ps-fields__divider"></div>
            <!-- rgba -->
            <ed-in label="r" :value="colors.rgba.r" @change="inputChange"></ed-in>
            <ed-in label="g" :value="colors.rgba.g" @change="inputChange"></ed-in>
            <ed-in label="b" :value="colors.rgba.b" @change="inputChange"></ed-in>
            <div class="vc-ps-fields__divider"></div>
            <!-- hex -->
            <ed-in label="#" class="vc-ps-fields__hex" :value="hex" @change="inputChange"></ed-in>
          </div>

          <div v-if="hasResetButton" class="vc-ps-ac-btn" aria-label="reset" @click="handleReset">{{ resetLabel }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditableInput from './common/editable-input.vue'
import Saturation from './common/saturation.vue'
import Hue from './common/hue.vue'
import { getChangeColor, isValidHex } from '../helpers/utils'
import {
  ColorResult,
  ColorChangeValue,
  SaturationChangeData,
  HueChangeData,
  AlphaChangeData,
  HEXChangeData,
  RGBAChangeData,
  HSVChangeData
} from '../types'

export default defineComponent({
  name: 'Photoshop',
  emits: ['update:value', 'ok', 'cancel', 'reset'],
  components: {
    Saturation,
    Hue,
    'ed-in': EditableInput
  },
  props: {
    head: {
      type: String,
      default: 'Color Picker'
    },
    disableFields: {
      type: Boolean,
      default: false
    },
    hasResetButton: {
      type: Boolean,
      default: false
    },
    acceptLabel: {
      type: String,
      default: 'OK'
    },
    cancelLabel: {
      type: String,
      default: 'Cancel'
    },
    resetLabel: {
      type: String,
      default: 'Reset'
    },
    newLabel: {
      type: String,
      default: 'new'
    },
    currentLabel: {
      type: String,
      default: 'current'
    },
    value: {
      type: [Object, String],
      default: () => ({})
    }
  },
  data() {
    return {
      currentColor: '#FFF',
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
    hsv(): Record<string, string> {
      const hsv = this.colors.hsv
      return {
        h: hsv.h.toFixed(),
        s: (hsv.s * 100).toFixed(),
        v: (hsv.v * 100).toFixed()
      }
    },
    hex(): string {
      const hex = this.colors.hex
      return hex && hex.replace('#', '')
    }
  },
  created() {
    this.currentColor = this.colors.hex
  },
  methods: {
    colorChange(data: ColorChangeValue, oldHue?: number) {
      this.oldHue = this.colors.hsl.h
      this.colors = getChangeColor(data, oldHue || this.oldHue)
      this.$emit('update:value', this.colors.hex)
    },
    childChange(data: SaturationChangeData | HueChangeData | AlphaChangeData) {
      this.colorChange(data)
    },
    inputChange(data: Record<string, string>) {
      if (!data) {
        return
      }
      if (data['#']) {
        if (isValidHex(data['#'])) {
          const hexData: HEXChangeData = {
            hex: data['#'],
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
      } else if (data.h || data.s || data.v) {
        const hsvData: HSVChangeData = {
          h: Number(data.h) || this.colors.hsv.h,
          s: Number(data.s) / 100 || this.colors.hsv.s,
          v: Number(data.v) / 100 || this.colors.hsv.v,
          source: 'hsv'
        }
        this.colorChange(hsvData)
      }
    },
    clickCurrentColor() {
      this.colorChange({
        hex: this.currentColor,
        source: 'hex'
      })
    },
    handleAccept() {
      this.$emit('ok')
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleReset() {
      this.$emit('reset')
    }
  }
})
</script>

<style>
.vc-photoshop {
  background: #dcdcdc;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25), 0 8px 16px rgba(0, 0, 0, 0.15);
  box-sizing: initial;
  width: 513px;
  font-family: Roboto;
}
.vc-photoshop__disable-fields {
  width: 390px;
}
.vc-ps-head {
  background-image: linear-gradient(-180deg, #f0f0f0 0%, #d4d4d4 100%);
  border-bottom: 1px solid #b1b1b1;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 0 rgba(0, 0, 0, 0.02);
  height: 23px;
  line-height: 24px;
  border-radius: 4px 4px 0 0;
  font-size: 13px;
  color: #4d4d4d;
  text-align: center;
}
.vc-ps-body {
  padding: 15px;
  display: flex;
}

.vc-ps-saturation-wrap {
  width: 256px;
  height: 256px;
  position: relative;
  border: 2px solid #b3b3b3;
  border-bottom: 2px solid #f0f0f0;
  overflow: hidden;
}
.vc-ps-saturation-wrap .vc-saturation-circle {
  width: 12px;
  height: 12px;
}

.vc-ps-hue-wrap {
  position: relative;
  height: 256px;
  width: 19px;
  margin-left: 10px;
  border: 2px solid #b3b3b3;
  border-bottom: 2px solid #f0f0f0;
}
.vc-ps-hue-pointer {
  position: relative;
}
.vc-ps-hue-pointer--left,
.vc-ps-hue-pointer--right {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 8px;
  border-color: transparent transparent transparent #555;
}
.vc-ps-hue-pointer--left:after,
.vc-ps-hue-pointer--right:after {
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent #fff;
  position: absolute;
  top: 1px;
  left: 1px;
  transform: translate(-8px, -5px);
}
.vc-ps-hue-pointer--left {
  transform: translate(-13px, -4px);
}
.vc-ps-hue-pointer--right {
  transform: translate(20px, -4px) rotate(180deg);
}

.vc-ps-controls {
  width: 180px;
  margin-left: 10px;
  display: flex;
}
.vc-ps-controls__disable-fields {
  width: auto;
}

.vc-ps-actions {
  margin-left: 20px;
  flex: 1;
}
.vc-ps-ac-btn {
  cursor: pointer;
  background-image: linear-gradient(-180deg, #ffffff 0%, #e6e6e6 100%);
  border: 1px solid #878787;
  border-radius: 2px;
  height: 20px;
  box-shadow: 0 1px 0 0 #eaeaea;
  font-size: 14px;
  color: #000;
  line-height: 20px;
  text-align: center;
  margin-bottom: 10px;
}
.vc-ps-previews {
  width: 60px;
}
.vc-ps-previews__swatches {
  border: 1px solid #b3b3b3;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 2px;
  margin-top: 1px;
}
.vc-ps-previews__pr-color {
  height: 34px;
  box-shadow: inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000;
}
.vc-ps-previews__label {
  font-size: 14px;
  color: #000;
  text-align: center;
}

.vc-ps-fields {
  padding-top: 5px;
  padding-bottom: 9px;
  width: 80px;
  position: relative;
}
.vc-ps-fields .vc-input__input {
  margin-left: 40%;
  width: 40%;
  height: 18px;
  border: 1px solid #888888;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1), 0 1px 0 0 #ececec;
  margin-bottom: 5px;
  font-size: 13px;
  padding-left: 3px;
  margin-right: 10px;
}
.vc-ps-fields .vc-input__label,
.vc-ps-fields .vc-input__desc {
  top: 0;
  text-transform: uppercase;
  font-size: 13px;
  height: 18px;
  line-height: 22px;
  position: absolute;
}
.vc-ps-fields .vc-input__label {
  left: 0;
  width: 34px;
}
.vc-ps-fields .vc-input__desc {
  right: 0;
  width: 0;
}

.vc-ps-fields__divider {
  height: 5px;
}

.vc-ps-fields__hex .vc-input__input {
  margin-left: 20%;
  width: 80%;
  height: 18px;
  border: 1px solid #888888;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1), 0 1px 0 0 #ececec;
  margin-bottom: 6px;
  font-size: 13px;
  padding-left: 3px;
}
.vc-ps-fields__hex .vc-input__label {
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  text-transform: uppercase;
  font-size: 13px;
  height: 18px;
  line-height: 22px;
}
</style>
