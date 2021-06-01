<template>
  <div role="application" aria-label="Material color picker" class="vc-material">
    <EditableInput
      class="vc-material-hex"
      label="hex"
      v-model:value="colors.hex"
      :style="{ borderColor: colors.hex }"
      @change="onChange"
    ></EditableInput>

    <div class="vc-material-split">
      <div class="vc-material-third">
        <EditableInput label="r" v-model:value="colors.rgba.r" @change="onChange"></EditableInput>
      </div>
      <div class="vc-material-third">
        <EditableInput label="g" v-model:value="colors.rgba.g" @change="onChange"></EditableInput>
      </div>
      <div class="vc-material-third">
        <EditableInput label="b" v-model:value="colors.rgba.b" @change="onChange"></EditableInput>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EditableInput from './common/editable-input.vue'
import { ColorResult, ColorChangeValue, HEXChangeData, RGBAChangeData } from '../types'
import { getChangeColor, isValidHex } from '../helpers/utils'

export default defineComponent({
  name: 'Material',
  emits: ['update:value'],
  components: {
    EditableInput
  },
  props: {
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
    }
  },
  methods: {
    colorChange(data: ColorChangeValue, oldHue?: number) {
      this.oldHue = this.colors.hsl.h
      this.colors = getChangeColor(data, oldHue || this.oldHue)
      this.$emit('update:value', this.colors.hex)
    },
    onChange(data: Record<string, string>) {
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
      } else if (data.r || data.g || data.b) {
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
.vc-material {
  box-sizing: content-box;
  width: 98px;
  height: 98px;
  padding: 16px;
  font-family: 'Roboto';
  position: relative;
  border-radius: 2px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.16);
  background-color: #fff;
}

.vc-material .vc-input__input {
  width: 100%;
  margin-top: 12px;
  font-size: 15px;
  color: #333;
  height: 30px;
}

.vc-material .vc-input__label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 11px;
  color: #999;
  text-transform: capitalize;
}

.vc-material-hex {
  border-bottom-width: 2px;
  border-bottom-style: solid;
}
.vc-material-split {
  display: flex;
  margin-right: -10px;
  padding-top: 11px;
}
.vc-material-third {
  flex: 1;
  padding-right: 10px;
}
</style>
