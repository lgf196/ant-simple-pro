import { defineComponent, onMounted, PropType, ref, getCurrentInstance } from 'vue'
import { Data } from '../utils/data'

import frequently from '../utils/frequently'
import { getData } from '../utils'
import NimbleEmoji from './emoji/nimble-emoji'
import NotFound from './not-found'
import { CustomEmoji, PartialI18n } from '../utils/types'

export type CategoryCompType = {
  updateDisplay(val: string): void
  handleScroll(val: number): boolean
  maxMargin: number
  memoizeSize(): void
  forceUpdate(): void
  name: string
  top: number
}

export default defineComponent({
  name: 'Category',
  props: {
    id: {
      type: String,
      default: ''
    },
    emojis: {
      type: Array,
      default: () => []
    },
    hasStickyPosition: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      required: true
    },
    native: {
      type: Boolean,
      required: true
    },
    perLine: {
      type: Number,
      required: true
    },
    emojiProps: {
      type: Object,
      required: true
    },
    recent: {
      type: Array as PropType<string[]>,
      required: true
    },
    notFound: {
      type: Function
    },
    notFoundEmoji: {
      type: String,
      required: true
    },
    data: {
      type: Object as PropType<Data>,
      required: true
    },
    custom: {
      type: Array as PropType<CustomEmoji[]>,
      default: () => []
    },
    i18n: {
      type: Object as PropType<PartialI18n>,
      default: () => ({})
    }
  },
  setup(props, { expose }) {
    const { ctx }: any = getCurrentInstance()
    const margin = ref(0)
    const minMargin = ref(0)
    const maxMargin = ref(0)
    const top = ref(0)
    const container = ref<HTMLElement>()
    const label = ref<HTMLElement>()

    expose({
      maxMargin,
      updateDisplay, // eslint-disable-line
      handleScroll, // eslint-disable-line
      memoizeSize, // eslint-disable-line
      forceUpdate() {
        ctx.$forceUpdate()
      },
      name: props.name,
      top
    })

    onMounted(() => {
      memoizeSize() // eslint-disable-line
    })

    function memoizeSize() {
      if (!container.value || !label.value) {
        top.value = 0
        maxMargin.value = 0
        return
      }
      const parent = container.value.parentElement
      if (!parent) {
        return
      }
      const { top: t, height } = container.value.getBoundingClientRect()
      const { top: parentTop } = parent.getBoundingClientRect()
      const { height: labelHeight } = label.value.getBoundingClientRect()

      top.value = t - parentTop + parent.scrollTop
      if (height === 0) {
        maxMargin.value = 0
      } else {
        maxMargin.value = height - labelHeight
      }
    }

    function handleScroll(scrollTop: number) {
      let currentMargin = scrollTop - top.value
      currentMargin = currentMargin < minMargin.value ? minMargin.value : currentMargin
      currentMargin = currentMargin > maxMargin.value ? maxMargin.value : currentMargin
      if (currentMargin === margin.value) {
        return false
      }
      if (!props.hasStickyPosition && label.value) {
        label.value.style.top = `${currentMargin}px`
      }
      margin.value = currentMargin
      return true
    }

    function getEmojis() {
      let { name, emojis, recent, perLine } = props
      if (name === 'Recent') {
        const { custom } = props
        const frequentlyUsed = recent || frequently.get(perLine)

        if (frequentlyUsed.length) {
          emojis = frequentlyUsed
            .map(id => {
              const emoji = custom.filter(e => e.id === id)[0]
              if (emoji) {
                return emoji
              }

              return id
            })
            .filter(id => !!getData(id, null, null, props.data))
        }

        if (emojis.length === 0 && frequentlyUsed.length > 0) {
          return null
        }
      }

      if (emojis) {
        emojis = emojis.slice(0)
      }

      return emojis
    }

    function updateDisplay(display: string) {
      const emojis = getEmojis()
      if (!emojis || !container.value) {
        return
      }
      container.value.style.display = display
    }

    return () => {
      const { name, hasStickyPosition, emojiProps, notFound, notFoundEmoji } = props
      const emojis = getEmojis()
      let labelStyles = {}
      let labelSpanStyles = {}
      let containerStyles = {}

      if (!emojis) {
        containerStyles = {
          display: 'none'
        }
      }

      if (!hasStickyPosition) {
        labelStyles = {
          height: 28
        }

        labelSpanStyles = {
          position: 'absolute'
        }
      }
      // console.log('emojis', emojis)
      const label = (props as any).i18n.categories[props.id] || name
      return (
        <section ref={container} class="emoji-mart-category" aria-label={label} style={containerStyles}>
          <div style={labelStyles} data-name={name} class="emoji-mart-category-label">
            <span
              style={labelSpanStyles}
              ref={label}
              aria-hidden={true /* already labeled by the section aria-label */}
            >
              {label}
            </span>
          </div>

          <ul class="emoji-mart-category-list">
            {emojis &&
              emojis.map((emoji: any) => (
                <li key={(emoji.short_names && emoji.short_names.join('_')) || emoji}>
                  <NimbleEmoji {...emojiProps} emoji={emoji} data={props.data}></NimbleEmoji>
                </li>
              ))}
          </ul>

          {emojis && !emojis.length && (
            <NotFound
              i18n={props.i18n}
              notFound={notFound}
              notFoundEmoji={notFoundEmoji}
              data={props.data}
              emojiProps={emojiProps}
            />
          )}
        </section>
      )
    }
  }
})
