import { defineComponent, PropType, ref } from 'vue'
import { PartialI18n } from '../utils/types'

export type AnchorsCompType = {
  selected: string
  setSelected(val: string): void
}

export default defineComponent({
  props: {
    categories: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    onAnchorClick: {
      type: Function,
      default: () => {} // eslint-disable-line
    },
    icons: {
      type: Object,
      default: () => ({})
    },
    i18n: {
      type: Object as PropType<PartialI18n>,
      default: () => ({})
    },
    color: {
      type: String,
      default: '#ae65c5'
    }
  },
  setup(props, { expose }) {
    const defaultCategory = props.categories.filter(category => category.first)[0]
    const selected = ref<string>(defaultCategory.name)

    expose({
      selected,
      setSelected(val: string) {
        selected.value = val
      }
    })

    function handleClick(e: MouseEvent) {
      const index = (e.currentTarget as HTMLElement).getAttribute('data-index')
      const { categories, onAnchorClick } = props
      if (typeof index === 'string') {
        onAnchorClick(categories[Number(index)], index)
      }
    }

    return () => {
      const { categories, icons } = props
      return (
        <nav class="emoji-mart-anchors" aria-label={(props as any).i18n.categorieslabel}>
          {categories.map((category, i) => {
            const { id, name, anchor } = category
            const isSelected = name === selected.value

            if (anchor === false) {
              return null
            }

            const iconId = id.startsWith('custom-') ? 'custom' : id

            return (
              <button
                key={id}
                aria-label={(props as any).i18n.categories[iconId]}
                title={(props as any).i18n.categories[iconId]}
                data-index={i}
                type={'button'}
                onClick={handleClick}
                class={`emoji-mart-anchor ${isSelected ? 'emoji-mart-anchor-selected' : ''}`}
                style={{ color: isSelected ? props.color : '' }}
              >
                <div class="emoji-mart-anchor-icon">{icons.categories[iconId]()}</div>
                <span class="emoji-mart-anchor-bar" style={{ backgroundColor: props.color }} />
              </button>
            )
          })}
        </nav>
      )
    }
  }
})
