import { defineComponent, PropType, ref } from 'vue'
import { Data } from '../utils/data'
import { PartialI18n, EmojiData } from '../utils/types'

import { getData } from '../utils'
import NimbleEmoji from './emoji/nimble-emoji'
import SkinsEmoji from './skins-emoji'
import SkinsDot from './skins-dot'

/* eslint-disable  @typescript-eslint/camelcase */
export type PreviewCompType = {
  setEmoji: (data?: EmojiData) => void
}

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Data>,
      required: true
    },
    showSkinTones: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    emoji: {
      type: String,
      required: true
    },
    emojiProps: {
      type: Object,
      default: () => ({})
    },
    skinsProps: {
      type: Object,
      default: () => ({})
    },
    showPreview: {
      type: Boolean,
      default: true
    },
    i18n: {
      type: Object as PropType<PartialI18n>,
      default: () => ({})
    }
  },
  setup(props, { expose }) {
    const emoji = ref<EmojiData>()
    function setEmoji(data: EmojiData) {
      emoji.value = data
    }
    expose({
      setEmoji
    })
    return () => {
      const { emojiProps, skinsProps, showSkinTones, title, emoji: idleEmoji, i18n, showPreview } = props
      if (emoji.value && showPreview) {
        const emojiData = getData(emoji.value, null, null, props.data)
        const { emoticons = [] } = emojiData as any
        const knownEmoticons: string[] = []
        const listedEmoticons: string[] = []

        emoticons.forEach((emoticon: string) => {
          if (knownEmoticons.indexOf(emoticon.toLowerCase()) >= 0) {
            return
          }

          knownEmoticons.push(emoticon.toLowerCase())
          listedEmoticons.push(emoticon)
        })

        return (
          <div class="emoji-mart-preview">
            <div class="emoji-mart-preview-emoji" aria-hidden="true">
              <NimbleEmoji {...emojiProps} data={props.data} emoji={emoji.value} key={emoji.value.id}></NimbleEmoji>
            </div>

            <div class="emoji-mart-preview-data" aria-hidden="true">
              <div class="emoji-mart-preview-name">{emoji.value.name}</div>
              <div class="emoji-mart-preview-shortnames">
                {emojiData?.short_names.map((short_name: any) => (
                  <span key={short_name} class="emoji-mart-preview-shortname">
                    :{short_name}:
                  </span>
                ))}
              </div>
              <div class="emoji-mart-preview-emoticons">
                {listedEmoticons.map(emoticon => (
                  <span key={emoticon} class="emoji-mart-preview-emoticon">
                    {emoticon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      }
      return (
        <div class="emoji-mart-preview">
          <div class="emoji-mart-preview-emoji" aria-hidden="true">
            {idleEmoji && idleEmoji.length && (
              <NimbleEmoji {...emojiProps} data={props.data} emoji={idleEmoji}></NimbleEmoji>
            )}
          </div>

          <div class="emoji-mart-preview-data" aria-hidden="true">
            <span class="emoji-mart-title-label">{title}</span>
          </div>

          {showSkinTones && (
            <div class={`emoji-mart-preview-skins${skinsProps.skinEmoji ? ' custom' : ''}`}>
              {skinsProps.skinEmoji ? (
                <SkinsEmoji
                  skin={skinsProps.skin}
                  emojiProps={emojiProps}
                  data={props.data}
                  skinEmoji={skinsProps.skinEmoji}
                  i18n={i18n}
                  onChange={skinsProps.onChange}
                />
              ) : (
                <SkinsDot skin={skinsProps.skin} i18n={i18n} onChange={skinsProps.onChange} />
              )}
            </div>
          )}
        </div>
      )
    }
  }
})
