<template>
  <div class="vc-checkerboard" :style="bgStyle" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const checkboardCache: Record<string, string> = {}
/**
 * get base 64 data by canvas
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */
function renderCheckboard(c1: string, c2: string, size: number) {
  // Dont Render On Server
  if (typeof document === 'undefined') {
    return null
  }
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size * 2
  const ctx = canvas.getContext('2d')
  // If no context can be found, return early.
  if (!ctx) {
    return null
  }
  ctx.fillStyle = c1
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = c2
  ctx.fillRect(0, 0, size, size)
  ctx.translate(size, size)
  ctx.fillRect(0, 0, size, size)
  return canvas.toDataURL()
}
/**
 * get checkboard base data and cache
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */
function getCheckboard(c1: string, c2: string, size: number) {
  const key = c1 + ',' + c2 + ',' + size
  if (checkboardCache[key]) {
    return checkboardCache[key]
  }
  const checkboard = renderCheckboard(c1, c2, size)
  if (checkboard === null) {
    return null
  }
  checkboardCache[key] = checkboard
  return checkboard
}

export default defineComponent({
  props: {
    size: {
      type: Number,
      default: 8
    },
    white: {
      type: String,
      default: '#fff'
    },
    grey: {
      type: String,
      default: '#e6e6e6'
    }
  },
  computed: {
    bgStyle() {
      const checkboard = getCheckboard(this.white, this.grey, this.size)
      if (checkboard === null) {
        return {}
      }
      return {
        'background-image': `url(${checkboard})`
      }
    }
  }
})
</script>

<style>
.vc-checkerboard {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-size: contain;
}
</style>
