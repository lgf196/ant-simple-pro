import { defineComponent, ref, PropType } from 'vue'
import { PartialI18n } from '../utils/types'

export default defineComponent({
  props: {
    onChange: {
      type: Function,
      default: () => {} // eslint-disable-line
    },
    skin: {
      type: Number,
      required: true
    },
    i18n: {
      type: Object as PropType<PartialI18n>,
      default: () => ({})
    }
  },
  setup(props) {
    const opened = ref(false)

    function handleClick(e: MouseEvent) {
      const skin = parseInt((e.currentTarget as HTMLElement).getAttribute('data-skin') || '', 10)
      if (!opened.value) {
        opened.value = true
      } else {
        opened.value = false
        if (skin !== props.skin) {
          props.onChange && props.onChange(skin)
        }
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      // if either enter or space is pressed, then execute
      if (event.keyCode === 13 || event.keyCode === 32) {
        event.preventDefault()
        handleClick((event as any) as MouseEvent)
      }
    }
    return () => {
      const { skin, i18n } = props
      const skinToneNodes = []

      for (let skinTone = 1; skinTone <= 6; skinTone++) {
        const selected = skinTone === skin
        const visible = opened.value || selected
        skinToneNodes.push(
          <span
            key={`skin-tone-${skinTone}`}
            class={`emoji-mart-skin-swatch${selected ? ' selected' : ''}`}
            aria-label={(i18n as any).skintones[skinTone]}
            aria-hidden={!visible}
            {...(opened.value ? { role: 'menuitem' } : {})}
          >
            <span
              onClick={handleClick}
              onKeydown={handleKeyDown}
              role="button"
              {...(selected
                ? {
                    'aria-haspopup': true,
                    'aria-expanded': !!opened.value
                  }
                : {})}
              {...(opened.value ? { 'aria-pressed': !!selected } : {})}
              tabindex={Number(visible ? '0' : '')}
              aria-label={(i18n as any).skintones[skinTone]}
              title={(i18n as any).skintones[skinTone]}
              data-skin={skinTone}
              class={`emoji-mart-skin emoji-mart-skin-tone-${skinTone}`}
            />
          </span>
        )
      }
      return (
        <section class={`emoji-mart-skin-swatches${opened.value ? ' opened' : ''}`} aria-label={(i18n as any).skintext}>
          <div {...(opened.value ? { role: 'menubar' } : {})}>{skinToneNodes}</div>
        </section>
      )
    }
  }
})
