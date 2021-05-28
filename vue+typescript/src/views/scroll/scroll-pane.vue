<template>
  <Scrollbar ref="scrollbarRef" wrapClass="scrollbar__wrap" viewClass="scrollbar__view" class="scroll-container">
    <slot></slot>
  </Scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref, unref, nextTick } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import { Scrollbar } from '@/components/scrollbar'
import { scrollTo as elScrollTo } from '@/utils/dom'
export type ScrollActionType = {
  scrollBottom: () => void
  getScrollWrap: () => HTMLElement | null
  scrollTo: (top: number) => void
}
export default defineComponent({
  components: {
    Scrollbar
  },
  setup() {
    const scrollbarRef = ref<ComponentPublicInstance | null>(null)

    // 滚动到某个位置
    function scrollTo(to: number, duration = 500) {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return
      }
      nextTick(() => {
        const wrap = scrollbar.$el.querySelector('.scrollbar__wrap') as HTMLElement
        if (!wrap) {
          return
        }
        elScrollTo({
          el: wrap,
          to,
          duration
        })
      })
    }

    // 获取滚动容器
    function getScrollWrap() {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return null
      }
      return scrollbar
    }

    // 滚动到底部
    function scrollBottom() {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return
      }
      nextTick(() => {
        const wrap = scrollbar.$el.querySelector('.scrollbar__wrap') as HTMLElement
        if (!wrap) {
          return
        }
        const scrollHeight = wrap.scrollHeight
        elScrollTo({
          el: wrap,
          to: scrollHeight
        })
      })
    }

    return {
      scrollbarRef,
      scrollTo,
      getScrollWrap,
      scrollBottom
    }
  }
})
</script>

<style lang="less" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  // ::v-deep {
  //   .scrollbar__bar {
  //     bottom: 0px;
  //   }
  //   .scrollbar__wrap {
  //     height: 49px;
  //   }
  // }
}
</style>
