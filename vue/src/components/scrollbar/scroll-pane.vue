<template>
  <Scrollbar ref="scrollbarRef" class="scroll-container" @wheel.prevent="handleScroll">
    <slot></slot>
  </Scrollbar>
</template>

<script>
import { defineComponent, ref, unref } from 'vue'
import { Scrollbar } from '@/components/scrollbar'
const tagAndTagSpacing = 5 // tagAndTagSpacing
export default defineComponent({
  components: {
    Scrollbar
  },
  setup() {
    const scrollbarRef = ref(null)

    // 获取滚动容器
    function getScrollWrap() {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return null
      }
      return scrollbar
    }

    // 处理滚动
    function handleScroll(e) {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return
      }
      const delta = -e.wheelDelta || e.deltaY * 40
      const wrap = scrollbar.$el.querySelector('.scrollbar__wrap')
      wrap.scrollLeft = wrap.scrollLeft + delta
    }

    function moveToTarget(currentTag, tagList) {
      const scrollbar = unref(scrollbarRef)
      if (!scrollbar) {
        return
      }
      const $container = scrollbar.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = scrollbar.$el.querySelector('.scrollbar__wrap')
      let firstTag = null
      let lastTag = null
      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0]
        lastTag = tagList[tagList.length - 1]
      }
      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag)
        const prevTag = tagList[currentIndex - 1]
        const nextTag = tagList[currentIndex + 1]
        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing
        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing
        if ($scrollWrapper.scrollLeft < afterNextTagOffsetLeft - $containerWidth) {
          // 当前标签隐藏在右边
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          // 当前标签隐藏在左边
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
        }
      }
    }

    return {
      scrollbarRef,
      getScrollWrap,
      handleScroll,
      moveToTarget
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
