<template>
  <div role="application" aria-label="Swatches color picker" class="vc-swatches" :data-pick="pick">
    <div class="vc-swatches-box" role="listbox">
      <div class="vc-swatches-color-group" v-for="(group, index) in palette" :key="index">
        <div
          v-for="item in group"
          :key="item"
          :class="['vc-swatches-color-it', { 'vc-swatches-color--white': item === '#FFFFFF' }]"
          :style="{ background: item }"
          role="option"
          :aria-label="'Color:' + item"
          :aria-selected="equal(item)"
          :data-color="item"
          @click="handlerClick(item)"
        >
          <div class="vc-swatches-pick" v-show="equal(item)">
            <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import material from 'material-colors'
import { ColorResult, ColorChangeValue } from '../types'
import { getChangeColor } from '../helpers/utils'

const colorList = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
  'brown',
  'blueGrey',
  'black'
]
const colorLevels = ['900', '700', '500', '300', '100']
const defaultColors = (() => {
  const colors: string[][] = []
  colorList.forEach(type => {
    let typeColors: string[] = []
    if (type.toLowerCase() === 'black' || type.toLowerCase() === 'white') {
      typeColors = typeColors.concat(['#000000', '#FFFFFF'])
    } else {
      colorLevels.forEach(level => {
        const color = material[type][level]
        typeColors.push(color.toUpperCase())
      })
    }
    colors.push(typeColors)
  })
  return colors
})()

export default defineComponent({
  name: 'Swatches',
  emits: ['update:value'],
  props: {
    palette: {
      type: Array,
      default: () => defaultColors
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
    pick(): string {
      return this.colors.hex
    }
  },
  methods: {
    colorChange(data: ColorChangeValue, oldHue?: number) {
      this.oldHue = this.colors.hsl.h
      this.colors = getChangeColor(data, oldHue || this.oldHue)
      this.$emit('update:value', this.colors.hex)
    },
    equal(color: string) {
      return color.toLowerCase() === this.colors.hex.toLowerCase()
    },
    handlerClick(c: string) {
      this.colorChange({
        hex: c,
        source: 'hex'
      })
    }
  }
})
</script>

<style>
.vc-swatches {
  width: 320px;
  height: 240px;
  overflow-y: scroll;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.16);
}
.vc-swatches-box {
  padding: 16px 0 6px 16px;
  overflow: hidden;
}
.vc-swatches-color-group {
  padding-bottom: 10px;
  width: 40px;
  float: left;
  margin-right: 10px;
}
.vc-swatches-color-it {
  box-sizing: border-box;
  width: 40px;
  height: 24px;
  cursor: pointer;
  background: #880e4f;
  margin-bottom: 1px;
  overflow: hidden;
  -ms-border-radius: 2px 2px 0 0;
  -moz-border-radius: 2px 2px 0 0;
  -o-border-radius: 2px 2px 0 0;
  -webkit-border-radius: 2px 2px 0 0;
  border-radius: 2px 2px 0 0;
}
.vc-swatches-color--white {
  border: 1px solid #ddd;
}
.vc-swatches-pick {
  fill: rgb(255, 255, 255);
  margin-left: 8px;
  display: block;
}
.vc-swatches-color--white .vc-swatches-pick {
  fill: rgb(51, 51, 51);
}
</style>
