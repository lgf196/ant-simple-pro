import store from './store'
import { EmojiData } from './types'

const DEFAULTS = [
  '+1',
  'grinning',
  'kissing_heart',
  'heart_eyes',
  'laughing',
  'stuck_out_tongue_winking_eye',
  'sweat_smile',
  'joy',
  'scream',
  'disappointed',
  'unamused',
  'weary',
  'sob',
  'sunglasses',
  'heart',
  'poop'
]

let frequently: Record<string, number> = {}
let initialized = false
let defaults: Record<string, any> = {}

function init() {
  initialized = true
  frequently = store.get('frequently')
}

function add(emoji: Pick<EmojiData, 'id'>) {
  if (!initialized) init()
  const { id } = emoji

  frequently || (frequently = defaults)
  if (id) {
    frequently[id] || (frequently[id] = 0)
    frequently[id] += 1

    store.set('last', id)
    store.set('frequently', frequently)
  }
}

function get(perLine: number) {
  if (!initialized) init()
  if (!frequently) {
    defaults = {}

    const result = []

    for (let i = 0; i < perLine; i++) {
      defaults[DEFAULTS[i]] = perLine - i
      result.push(DEFAULTS[i])
    }

    return result
  }

  const quantity = perLine * 4
  const frequentlyKeys = []

  for (const key in frequently) {
    if (frequently.hasOwnProperty(key)) {
      frequentlyKeys.push(key)
    }
  }

  const sorted = frequentlyKeys
    .sort((a, b) => frequently[a] - frequently[b])
    .reverse()
  const sliced = sorted.slice(0, quantity)

  const last = store.get('last')

  if (last && sliced.indexOf(last) == -1) {
    sliced.pop()
    sliced.push(last)
  }

  return sliced
}

export default { add, get }
