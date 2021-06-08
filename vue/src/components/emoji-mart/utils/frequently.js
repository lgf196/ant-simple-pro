import store from './store'

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

let frequently = null
let initialized = false
let defaults = {}

function init() {
  initialized = true
  frequently = store.get('frequently')
}

function add(emoji) {
  if (!initialized) init()
  const { id } = emoji

  frequently || (frequently = defaults)
  frequently[id] || (frequently[id] = 0)
  frequently[id] += 1

  store.set('last', id)
  store.set('frequently', frequently)
}

function get(maxNumber) {
  if (!initialized) init()
  if (!frequently) {
    defaults = {}

    const result = []

    const defaultLength = Math.min(maxNumber, DEFAULTS.length)
    for (let i = 0; i < defaultLength; i++) {
      defaults[DEFAULTS[i]] = defaultLength - i
      result.push(DEFAULTS[i])
    }

    return result
  }

  const quantity = maxNumber
  const frequentlyKeys = []

  for (const key in frequently) {
    if (Object.prototype.hasOwnProperty.call(frequently, key)) {
      frequentlyKeys.push(key)
    }
  }

  const sorted = frequentlyKeys.sort((a, b) => frequently[a] - frequently[b]).reverse()
  const sliced = sorted.slice(0, quantity)

  const last = store.get('last')

  if (last && sliced.indexOf(last) === -1) {
    sliced.pop()
    sliced.push(last)
  }

  return sliced
}

export default { add, get }
