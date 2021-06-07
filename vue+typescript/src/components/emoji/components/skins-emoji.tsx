import { defineComponent, PropType, ref } from 'vue'
import { Data } from '../utils/data'
import { EmojiSkin, PartialI18n } from '../utils/types'

import NimbleEmoji from './emoji/nimble-emoji'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Data>,
      required: true
    },
    onChange: {
      type: Function,
      default: () => {} // eslint-disable-line
    },
    skin: {
      type: Number,
      required: true
    },
    emojiProps: {
      type: Object,
      required: true
    },
    skinTone: {
      type: Number
    },
    skinEmoji: {
      type: String,
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

    return () => {
      const { skin, emojiProps, data, skinEmoji, i18n } = props
      const skinToneNodes = []
      for (let skinTone = 1; skinTone <= 6; skinTone++) {
        const selected = skinTone === skin
        skinToneNodes.push(
          <span key={`skin-tone-${skinTone}`} class={`emoji-mart-skin-swatch custom${selected ? ' selected' : ''}`}>
            <span onClick={handleClick} data-skin={skinTone} class={`emoji-mart-skin-tone-${skinTone}`}>
              <NimbleEmoji
                data={data}
                emoji={skinEmoji}
                skin={skinTone as EmojiSkin}
                backgroundImageFn={emojiProps.backgroundImageFn}
                native={emojiProps.native}
                set={emojiProps.set}
                sheetSize={emojiProps.sheetSize}
                size={23}
              ></NimbleEmoji>
            </span>
          </span>
        )
      }
      return (
        <div class={`emoji-mart-skin-swatches custom${opened.value ? ' opened' : ''}`}>
          <div class={`emoji-mart-skin-text${opened.value ? ' opened' : ''}`}>{(i18n as any).skintext}</div>
          {skinToneNodes}
        </div>
      )
    }
  }
})
