import { defineComponent, onMounted, PropType, ref } from 'vue'
import { Data } from '../utils/data'
import { CategoryName, CustomEmoji, PartialI18n } from '../utils/types'

import { search as icons } from '../svgs'
import NimbleEmojiIndex from '../utils/emoji-index/nimble-emoji-index'
import { throttleIdleTask } from '../utils/index'

let id = 0

export type SearchCompType = {
  clear(): void
}

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Data>,
      required: true
    },
    onSearch: {
      type: Function,
      default: () => {} // eslint-disable-line
    },
    maxResults: {
      type: Number,
      default: 75
    },
    emojisToShowFilter: {
      type: Function
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    include: {
      type: Array as PropType<CategoryName[]>
    },
    exclude: {
      type: Array as PropType<CategoryName[]>
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
    const icon = ref(icons.search)
    const isSearching = ref(false)
    const idRef = ref(++id)
    const inputRef = ref<HTMLInputElement>()

    expose({
      clear // eslint-disable-line
    })

    onMounted(() => {
      // in some cases (e.g. preact) the input may already be pre-populated
      // this.input is undefined in Jest tests
      if (inputRef.value && inputRef.value.value) {
        search(inputRef.value.value) // eslint-disable-line
      }
    })

    function search(value: string) {
      if (value === '') {
        icon.value = icons.search
        isSearching.value = false
      } else {
        icon.value = icons.delete
        isSearching.value = true
      }
      props.onSearch(
        new NimbleEmojiIndex(props.data).search(value, {
          emojisToShowFilter: props.emojisToShowFilter,
          maxResults: props.maxResults,
          include: props.include,
          exclude: props.exclude,
          custom: props.custom
        })
      )
    }

    function clear() {
      if (!inputRef.value) {
        return
      }
      if (inputRef.value.value === '') {
        return
      }
      inputRef.value.value = ''
      inputRef.value.focus()
      search('')
    }

    function handleChange() {
      if (inputRef.value) {
        search(inputRef.value.value)
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.keyCode === 13) {
        clear()
      }
    }

    return () => {
      const { i18n, autoFocus } = props
      const inputId = `emoji-mart-search-${idRef.value}`
      return (
        <section class="emoji-mart-search" aria-label={i18n.search}>
          <input
            id={inputId}
            ref={inputRef}
            type="search"
            onChange={throttleIdleTask(handleChange)}
            placeholder={i18n.search}
            autofocus={autoFocus}
          />
          {/*
           * Use a <label> in addition to the placeholder for accessibility, but place it off-screen
           * http://www.maxability.co.in/2016/01/placeholder-attribute-and-why-it-is-not-accessible/
           */}
          <label class="emoji-mart-sr-only" for={inputId}>
            {i18n.search}
          </label>
          <button
            class="emoji-mart-search-icon"
            onClick={clear}
            onKeyup={handleKeyUp}
            aria-label={(i18n as any).clear}
            disabled={!isSearching.value}
          >
            {icon.value()}
          </button>
        </section>
      )
    }
  }
})
