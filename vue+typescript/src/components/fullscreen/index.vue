<template>
  <a-tooltip :title="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
    <span @click="onToggle">
      <FullscreenExitOutlined v-if="isFullscreen" />
      <FullscreenOutlined v-else />
    </span>
  </a-tooltip>
</template>

<script>
import { defineComponent } from 'vue'
import screenfull from 'screenfull'
import { Modal } from 'ant-design-vue'
import {
  FullscreenOutlined,
  FullscreenExitOutlined
} from '@ant-design/icons-vue'
export default defineComponent({
  name: 'Fullscreen',
  components: {
    FullscreenOutlined,
    FullscreenExitOutlined
  },
  emits: ['change'],
  props: {
    el: {
      type: Function,
      default: () => {} // eslint-disable-line
    }
  },
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    if (screenfull.isEnabled) {
      screenfull.on('change', this.change)
    }
  },
  beforeUnmount() {
    if (screenfull.isEnabled) {
      screenfull.off('change', this.change)
    }
  },
  methods: {
    onToggle() {
      if (!screenfull.isEnabled) {
        return Modal.warning({
          title: '温馨提示',
          content: '您的浏览器不支持全屏功能'
        })
      }
      if (this.el()) {
        screenfull.toggle(this.el())
      } else {
        screenfull.toggle()
      }
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
      this.$emit('change', screenfull.isFullscreen)
    }
  }
})
</script>
