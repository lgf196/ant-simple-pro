import { defineComponent, computed, unref, inject, reactive, ref, onBeforeUnmount } from 'vue'

import { on, off } from '@/utils/dom'
import { renderThumbStyle, BAR_MAP } from './util'

export default defineComponent({
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '0'
    },
    move: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const thumbRef = ref(null)
    const elRef = ref(null)
    const parentElRef = inject('scroll-bar-wrap')
    const commonState = reactive({})
    const barRef = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal']
    })

    function mouseMoveDocumentHandler(e) {
      if (commonState.cursorDown === false) {
        return
      }
      const bar = unref(barRef)
      const prevPage = commonState[bar.axis]
      const el = unref(elRef)
      const parentEl = unref(parentElRef)
      const thumbEl = unref(thumbRef)
      if (!prevPage || !el || !thumbEl || !parentEl) {
        return
      }
      const rect = el.getBoundingClientRect()
      const offset = (rect[bar.direction] - e[bar.client]) * -1
      const thumbClickPosition = thumbEl[bar.offset] - prevPage
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / el[bar.offset]

      parentEl[bar.scroll] = (thumbPositionPercentage * parentEl[bar.scrollSize]) / 100
    }

    function mouseUpDocumentHandler() {
      const bar = unref(barRef)
      commonState.cursorDown = false
      commonState[bar.axis] = 0
      off(document, 'mousemove', mouseMoveDocumentHandler)
      document.onselectstart = null
    }

    function startDrag(e) {
      e.stopImmediatePropagation()
      commonState.cursorDown = true

      on(document, 'mousemove', mouseMoveDocumentHandler)
      on(document, 'mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }

    function clickTrackHandler(e) {
      if (!e.target) {
        return
      }
      const bar = unref(barRef)
      const t = e.target
      const offset = Math.abs(t.getBoundingClientRect()[bar.direction] - e[bar.client])
      const thumbEl = unref(thumbRef)
      const parentEl = unref(parentElRef)
      const el = unref(elRef)
      if (!thumbEl || !el || !parentEl) return
      const thumbHalf = thumbEl[bar.offset] / 2
      const thumbPositionPercentage = ((offset - thumbHalf) * 100) / el[bar.offset]
      parentEl[bar.scroll] = (thumbPositionPercentage * parentEl[bar.scrollSize]) / 100
    }

    function clickThumbHandler(e) {
      const { ctrlKey, button } = e
      const currentTarget = e.currentTarget
      // prevent click event of right button
      if (ctrlKey || button === 2 || !currentTarget) {
        return
      }
      startDrag(e)
      const bar = unref(barRef)
      commonState[bar.axis] =
        currentTarget[bar.offset] - (e[bar.client] - currentTarget.getBoundingClientRect()[bar.direction])
    }

    onBeforeUnmount(() => {
      off(document, 'mouseup', mouseUpDocumentHandler)
    })

    return () => {
      const bar = unref(barRef)
      const { size, move } = props
      return (
        <div class={['scrollbar__bar', 'is-' + bar.key]} onMousedown={clickTrackHandler} ref={elRef}>
          <div
            ref={thumbRef}
            class="scrollbar__thumb"
            onMousedown={clickThumbHandler}
            style={renderThumbStyle(size, move, bar)}
          />
        </div>
      )
    }
  }
})
