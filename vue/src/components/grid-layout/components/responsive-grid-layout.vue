<template>
  <div ref="item" class="vue-grid-layout" :style="mergedStyle">
    <slot></slot>
    <grid-item
      class="vue-grid-placeholder"
      v-show="isDragging"
      :x="placeholder.x"
      :y="placeholder.y"
      :w="placeholder.w"
      :h="placeholder.h"
      :i="placeholder.i"
    ></grid-item>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import mitt from 'mitt'
import elementResizeDetectorMaker from 'element-resize-detector'
import { bottom, compact, getLayoutItem, moveElement, validateLayout } from '../helpers/utils'
import GridItem from './GridItem.vue'
import { addWindowEventListener, removeWindowEventListener } from '../helpers/DOM'
export default defineComponent({
  name: 'GridLayout',
  provide() {
    return {
      eventBus: this.eventBus
    }
  },
  components: {
    GridItem
  },
  props: {
    // If true, the container height swells and contracts to fit contents
    autoSize: {
      type: Boolean,
      default: true
    },
    colNum: {
      type: Number,
      default: 12
    },
    rowHeight: {
      type: Number,
      default: 150
    },
    maxRows: {
      type: Number,
      default: Infinity
    },
    margin: {
      type: Array,
      default() {
        return [10, 10]
      }
    },
    isDraggable: {
      type: Boolean,
      default: true
    },
    isResizable: {
      type: Boolean,
      default: true
    },
    isMirrored: {
      type: Boolean,
      default: false
    },
    useCssTransforms: {
      type: Boolean,
      default: true
    },
    verticalCompact: {
      type: Boolean,
      default: true
    },
    layout: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      eventBus: mitt(),
      width: null,
      mergedStyle: {},
      lastLayoutLength: 0,
      isDragging: false,
      placeholder: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        i: -1
      }
    }
  },
  created() {
    // Accessible refernces of functions for removing in beforeUnmount
    this.resizeEventHandler = (eventType, i, x, y, h, w) => {
      this.resizeEvent(eventType, i, x, y, h, w)
    }
    this.dragEventHandler = (eventType, i, x, y, h, w) => {
      this.dragEvent(eventType, i, x, y, h, w)
    }
    this.eventBus.on('resizeEvent', this.resizeEventHandler)
    this.eventBus.on('dragEvent', this.dragEventHandler)
  },
  beforeUnmount() {
    // Remove listeners
    this.eventBus.off('resizeEvent', this.resizeEventHandler)
    this.eventBus.off('dragEvent', this.dragEventHandler)
    removeWindowEventListener('resize', this.onWindowResize)
  },
  mounted() {
    this.$nextTick(() => {
      validateLayout(this.layout)
      this.$nextTick(() => {
        if (this.width === null) {
          this.onWindowResize()
          // this.width = this.$el.offsetWidth;
          addWindowEventListener('resize', this.onWindowResize)
        }
        compact(this.layout, this.verticalCompact)
        this.updateHeight()
        this.$nextTick(() => {
          const erd = elementResizeDetectorMaker({
            strategy: 'scroll' // <- For ultra performance.
          })
          erd.listenTo(this.$refs.item, () => {
            this.onWindowResize()
          })
        })
      })
      addWindowEventListener('load', this.onWindowLoad.bind(this))
    })
  },
  watch: {
    width() {
      this.$nextTick(() => {
        // this.$broadcast("updateWidth", this.width);
        this.eventBus.emit('updateWidth', this.width)
        this.updateHeight()
      })
    },
    layout() {
      this.layoutUpdate()
    },
    colNum(val) {
      this.eventBus.emit('setColNum', val)
    },
    rowHeight() {
      this.eventBus.emit('setRowHeight', this.rowHeight)
    },
    isDraggable() {
      this.eventBus.emit('setDraggable', this.isDraggable)
    },
    isResizable() {
      this.eventBus.emit('setResizable', this.isResizable)
    }
  },
  methods: {
    onWindowLoad() {
      if (this.width === null) {
        this.onWindowResize()
        // this.width = this.$el.offsetWidth;
        addWindowEventListener('resize', this.onWindowResize)
      }
      compact(this.layout, this.verticalCompact)
      this.updateHeight()
      this.$nextTick(() => {
        const erd = elementResizeDetectorMaker({
          strategy: 'scroll' // <- For ultra performance.
        })
        erd.listenTo(this.$refs.item, () => {
          this.onWindowResize()
        })
      })
    },
    layoutUpdate() {
      if (this.layout !== undefined) {
        if (this.layout.length !== this.lastLayoutLength) {
          // console.log("### LAYOUT UPDATE!");
          this.lastLayoutLength = this.layout.length
        }
        compact(this.layout, this.verticalCompact)
        this.eventBus.emit('updateWidth', this.width)
        this.updateHeight()
      }
    },
    updateHeight() {
      this.mergedStyle = {
        height: this.containerHeight()
      }
    },
    onWindowResize() {
      if (this.$refs !== null && this.$refs.item !== null && this.$refs.item !== undefined) {
        this.width = this.$refs.item.offsetWidth
      }
    },
    containerHeight() {
      if (!this.autoSize) return
      return bottom(this.layout) * (this.rowHeight + this.margin[1]) + this.margin[1] + 'px'
    },
    dragEvent(eventName, id, x, y, h, w) {
      if (eventName === 'dragmove' || eventName === 'dragstart') {
        this.placeholder.i = id
        this.placeholder.x = x
        this.placeholder.y = y
        this.placeholder.w = w
        this.placeholder.h = h
        this.$nextTick(() => {
          this.isDragging = true
        })
        // this.$broadcast("updateWidth", this.width);
        this.eventBus.emit('updateWidth', this.width)
      } else {
        this.$nextTick(() => {
          this.isDragging = false
        })
      }
      // console.log(eventName + " id=" + id + ", x=" + x + ", y=" + y);
      let l = getLayoutItem(this.layout, id)
      // GetLayoutItem sometimes returns null object
      if (l === undefined || l === null) {
        l = { x: 0, y: 0 }
      }
      l.x = x
      l.y = y
      // Move the element to the dragged location.
      // this.layout = moveElement(this.layout, l, x, y, true)
      this.$emit('layout-updated', moveElement(this.layout, l, x, y, true))
      compact(this.layout, this.verticalCompact)
      // needed because vue can't detect changes on array element properties
      this.eventBus.emit('compact')
      this.updateHeight()
      if (eventName === 'dragend') this.$emit('layout-updated', this.layout)
    },
    resizeEvent(eventName, id, x, y, h, w) {
      if (eventName === 'resizestart' || eventName === 'resizemove') {
        this.placeholder.i = id
        this.placeholder.x = x
        this.placeholder.y = y
        this.placeholder.w = w
        this.placeholder.h = h
        this.$nextTick(() => {
          this.isDragging = true
        })
        // this.$broadcast("updateWidth", this.width);
        this.eventBus.emit('updateWidth', this.width)
      } else {
        this.$nextTick(() => {
          this.isDragging = false
        })
      }
      let l = getLayoutItem(this.layout, id)
      // GetLayoutItem sometimes return null object
      if (l === undefined || l === null) {
        l = { h: 0, w: 0 }
      }
      l.h = h
      l.w = w
      compact(this.layout, this.verticalCompact)
      this.eventBus.emit('compact')
      this.updateHeight()
      if (eventName === 'resizeend') this.$emit('layout-updated', this.layout)
    }
  }
})
</script>
<style>
.vue-grid-layout {
  position: relative;
  transition: height 200ms ease;
}
</style>
