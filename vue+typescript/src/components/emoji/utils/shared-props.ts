import { PropType, CSSProperties } from 'vue'
import {
  EmojiSkin,
  EmojiSheetSize,
  EmojiSet,
  ThemeType,
  EmojiData,
  PartialI18n,
  CategoryName,
  CustomEmoji,
  CustomIcons
} from './types'

const setList = ['apple', 'google', 'twitter', 'facebook']

const skinList = [1, 2, 3, 4, 5, 6]

const sheetSizeList = [16, 20, 32, 64]

const themeList = ['auto', 'light', 'dark']

export const emojiPropTypes = {
  data: {
    type: Object as PropType<Record<string, any>>,
    required: true
  },
  onOver: {
    type: Function as PropType<(emoji: EmojiData, e: MouseEvent) => void>
  },
  onLeave: {
    type: Function as PropType<(emoji: EmojiData, e: MouseEvent) => void>
  },
  onClick: {
    type: Function as PropType<(emoji: EmojiData, e: MouseEvent) => void>
  },
  fallback: {
    type: Function as PropType<(emoji: EmojiData) => JSX.Element>
  },
  backgroundImageFn: {
    type: Function,
    default: (set: EmojiSet, sheetSize: EmojiSheetSize) =>
      `https://unpkg.com/emoji-datasource-${set}@${process.env.EMOJI_DATASOURCE_VERSION}/img/${set}/sheets-256/${sheetSize}.png`
  },
  native: {
    type: Boolean,
    default: false
  },
  forceSize: {
    type: Boolean,
    default: false
  },
  tooltip: {
    type: Boolean,
    default: false
  },
  useButton: {
    type: Boolean,
    default: true
  },
  skin: {
    type: Number as PropType<EmojiSkin>,
    validator: (value: number) => {
      return skinList.indexOf(value) >= 0
    },
    default: 1
  },
  sheetSize: {
    type: Number as PropType<EmojiSheetSize>,
    validator: (value: number) => {
      return sheetSizeList.indexOf(value) >= 0
    },
    default: 64
  },
  sheetColumns: {
    type: Number,
    default: 57
  },
  sheetRows: {
    type: Number,
    default: 57
  },
  set: {
    type: String as PropType<EmojiSet>,
    validator: (value: string) => {
      return setList.indexOf(value) >= 0
    },
    default: 'apple'
  },
  size: {
    type: Number,
    required: true
  },
  emoji: {
    type: [String, Object] as PropType<string | EmojiData>,
    required: true
  }
}

export const pickerPropTypes = {
  onClick: {
    type: Function as PropType<(emoji: EmojiData, e: MouseEvent) => void>,
    default: () => {} // eslint-disable-line
  },
  onSelect: {
    type: Function as PropType<(emoji: EmojiData) => void>,
    default: () => {} // eslint-disable-line
  },
  onSkinChange: {
    type: Function as PropType<(skin: EmojiSkin, e: MouseEvent) => void>,
    default: () => {} // eslint-disable-line
  },
  perLine: {
    type: Number,
    default: 9
  },
  emojiSize: {
    type: Number,
    default: 24
  },
  i18n: {
    type: Object as PartialI18n,
    default: () => ({})
  },
  style: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  title: {
    type: String,
    default: 'Emoji Mart™'
  },
  emoji: {
    type: String,
    default: 'department_store'
  },
  color: {
    type: String,
    default: '#ae65c5'
  },
  set: emojiPropTypes.set,
  skin: {
    type: [Number, null] as PropType<EmojiSkin | null>,
    validator: (value: number | null) => {
      if (typeof value === 'number') {
        return skinList.indexOf(value) >= 0
      }
      return value === null
    },
    default: null
  },
  defaultSkin: emojiPropTypes.skin,
  native: emojiPropTypes.native,
  backgroundImageFn: emojiPropTypes.backgroundImageFn,
  sheetSize: emojiPropTypes.sheetSize,
  emojisToShowFilter: {
    type: [Function, null] as PropType<Function | null>,
    default: null
  },
  showPreview: {
    type: Boolean,
    default: true
  },
  showSkinTones: {
    type: Boolean,
    default: true
  },
  emojiTooltip: emojiPropTypes.tooltip,
  useButton: emojiPropTypes.useButton,
  theme: {
    type: String as PropType<ThemeType>,
    validator: (value: string) => {
      return themeList.indexOf(value) >= 0
    },
    default: 'light'
  },
  include: {
    type: Array as PropType<CategoryName[]>
  },
  exclude: {
    type: Array as PropType<CategoryName[]>
  },
  recent: {
    type: Array as PropType<string[]>
  },
  autoFocus: {
    type: Boolean,
    default: false
  },
  enableFrequentEmojiSort: {
    type: Boolean,
    default: false
  },
  custom: {
    type: Array as PropType<CustomEmoji[]>,
    default: () => []
  },
  skinEmoji: {
    type: String,
    default: ''
  },
  notFound: {
    type: Function,
    default: () => {} // eslint-disable-line
  },
  notFoundEmoji: {
    type: String,
    default: 'sleuth_or_spy'
  },
  icons: {
    type: Object as PropType<CustomIcons>,
    default: () => ({})
  }
}
