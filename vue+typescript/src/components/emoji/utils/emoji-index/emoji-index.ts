import data from '../../data/all.json'
import { Data } from '../../utils/data'
import NimbleEmojiIndex from './nimble-emoji-index'

const emojiIndex = new NimbleEmojiIndex((data as any) as Data)
const { emojis, emoticons } = emojiIndex

function search(...rest: Parameters<typeof emojiIndex.search>) {
  return emojiIndex.search(...rest)
}

export default { search, emojis, emoticons }
