import { defineComponent, computed, unref, inject, Ref, reactive, ref, onBeforeUnmount, CSSProperties } from 'vue'

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
    const thumbRef = ref<HTMLDivElement | null>(null)
    const elRef = ref<HTMLDivElement | null>(null)
    const parentElRef = inject('scroll-bar-wrap') as Ref<HTMLDivElement | null>
    const commonState = reactive<Record<string, unknown>>({})
    const barRef = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal']
    })

    function mouseMoveDocumentHandler(e: MouseEvent) {
      if (commonState.cursorDown === false) {
        return
      }
      const bar = unref(barRef)
      const prevPage = commonState[bar.axis] as number
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

    function startDrag(e: Event) {
      e.stopImmediatePropagation()
      commonState.cursorDown = true

      on(document, 'mousemove', mouseMoveDocumentHandler)
      on(document, 'mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }

    function clickTrackHandler(e: MouseEvent) {
      if (!e.target) {
        return
      }
      const bar = unref(barRef)
      const t = e.target as Element
      const offset = Math.abs(t.getBoundingClientRect()[bar.direction] - e[bar.client])
      const thumbEl = unref(thumbRef)
      const parentEl = unref(parentElRef)
      const el = unref(elRef)
      if (!thumbEl || !el || !parentEl) return
      const thumbHalf = thumbEl[bar.offset] / 2
      const thumbPositionPercentage = ((offset - thumbHalf) * 100) / el[bar.offset]
      parentEl[bar.scroll] = (thumbPositionPercentage * parentEl[bar.scrollSize]) / 100
    }

    function clickThumbHandler(e: MouseEvent) {
      const { ctrlKey, button } = e
      const currentTarget = e.currentTarget as HTMLElement
      // prevent click event of right button
      if (ctrlKey || button === 2 || !currentTarget) {
        return
      }
      startDrag(e)
      const bar = unref(barRef)
      commonState[bar.axis] = currentTarget[bar.offset] - (e[bar.client] - currentTarget.getBoundingClientRect()[bar.direction])
    }

    onBeforeUnmount(() => {
      off(document, 'mouseup', mouseUpDocumentHandler)
    })

    return () => {
      const bar = unref(barRef)
      const { size, move } = props
      return (
        <div
          class={['scrollbar__bar', 'is-' + bar.key]}
          onMousedown={clickTrackHandler}
          ref={elRef}
        >
          <div
            ref={thumbRef}
            class="scrollbar__thumb"
            onMousedown={clickThumbHandler}
            style={renderThumbStyle(size, move, bar) as CSSProperties}
          />
        </div>
      )
    }
  }
})
