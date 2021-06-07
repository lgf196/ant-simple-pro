import emojiIndex from './utils/emoji-index/emoji-index'
import NimbleEmojiIndex from './utils/emoji-index/nimble-emoji-index'
import store from './utils/store'
import frequently from './utils/frequently'
import { getEmojiDataFromNative } from './utils'

import Picker from './components/picker/picker'
import NimblePicker from './components/picker/nimble-picker'
import Emoji from './components/emoji/emoji'
import NimbleEmoji from './components/emoji/nimble-emoji'
import Category from './components/category'

export {
  emojiIndex,
  NimbleEmojiIndex,
  store,
  frequently,
  getEmojiDataFromNative,
  Picker,
  NimblePicker,
  Emoji,
  NimbleEmoji,
  Category
}
