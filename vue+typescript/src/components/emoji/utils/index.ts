import { buildSearch, uncompress, Emoji, Data } from './data'
import stringFromCodePoint from '../polyfills/stringFromCodePoint'
import { EmojiData, EmojiSkin, EmojiSet } from './types'

const COLONS_REGEX = /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/
const SKINS = ['1F3FA', '1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF']

function unifiedToNative(unified: string) {
  const unicodes = unified.split('-')
  const codePoints = unicodes.map(u => Number(`0x${u}`))

  return stringFromCodePoint.apply(null, codePoints)
}

function sanitize(emoji: any) {
  const {
    name,
    short_names,
    skin_tone,
    skin_variations,
    emoticons,
    unified,
    custom,
    customCategory,
    imageUrl
  } = emoji
  const id = emoji.id || short_names[0]
  let colons = `:${id}:`

  if (custom) {
    return {
      id,
      name,
      short_names,
      colons,
      emoticons,
      custom,
      customCategory,
      imageUrl
    }
  }

  if (skin_tone) {
    colons += `:skin-tone-${skin_tone}:`
  }

  return {
    id,
    name,
    short_names,
    colons,
    emoticons,
    unified: (unified as string).toLowerCase(),
    skin: skin_tone || (skin_variations ? 1 : null),
    native: unifiedToNative(unified as string)
  }
}

function getSanitizedData() {
  return sanitize(
    getData(...(arguments as [Emoji | string, EmojiSkin, EmojiSet, Data]))
  )
}

function getData(
  emoji: Emoji | string,
  skin: EmojiSkin,
  set: EmojiSet,
  data: Data
) {
  let emojiData: Emoji = {}

  if (typeof emoji === 'string') {
    const matches = emoji.match(COLONS_REGEX)

    if (matches) {
      emoji = matches[1]

      if (matches[2]) {
        skin = parseInt(matches[2], 10) as EmojiSkin
      }
    }

    if (data.aliases.hasOwnProperty(emoji)) {
      emoji = data.aliases[emoji]
    }

    if (data.emojis.hasOwnProperty(emoji)) {
      emojiData = data.emojis[emoji]
    } else {
      return null
    }
  } else if (emoji.id) {
    if (data.aliases.hasOwnProperty(emoji.id)) {
      emoji.id = data.aliases[emoji.id]
    }

    if (data.emojis.hasOwnProperty(emoji.id)) {
      emojiData = data.emojis[emoji.id]
      skin || (skin = emoji.skin)
    }
  }

  if (!Object.keys(emojiData).length) {
    emojiData = emoji
    emojiData.custom = true

    if (!emojiData.search) {
      emojiData.search = buildSearch(emoji)
    }
  }

  emojiData.emoticons || (emojiData.emoticons = [])
  emojiData.variations || (emojiData.variations = [])

  if (emojiData.skin_variations && skin > 1) {
    emojiData = JSON.parse(JSON.stringify(emojiData))

    const skinKey = SKINS[skin - 1]
    const variationData = emojiData.skin_variations[skinKey]

    if (variationData) {
      if (!variationData.variations && emojiData.variations) {
        delete emojiData.variations
      }

      if (
        (set &&
          (variationData[`has_img_${set}`] == undefined ||
            variationData[`has_img_${set}`])) ||
        !set
      ) {
        emojiData.skin_tone = skin

        for (const k in variationData) {
          const v = variationData[k]
          emojiData[k] = v
        }
      }
    }
  }

  if (emojiData.variations && emojiData.variations.length) {
    emojiData = JSON.parse(JSON.stringify(emojiData))
    emojiData.unified = emojiData.variations.shift()
  }

  return emojiData
}

function getEmojiDataFromNative(nativeString, set, data) {
  if (data.compressed) {
    uncompress(data)
  }

  const skinTones = ['🏻', '🏼', '🏽', '🏾', '🏿']
  const skinCodes = ['1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF']

  let skin
  let skinCode
  const baseNativeString = nativeString

  skinTones.forEach((skinTone, skinToneIndex) => {
    if (nativeString.indexOf(skinTone) > 0) {
      skin = skinToneIndex + 2
      skinCode = skinCodes[skinToneIndex]
    }
  })

  let emojiData

  for (const id in data.emojis) {
    const emoji = data.emojis[id]

    let emojiUnified = emoji.unified

    if (emoji.variations && emoji.variations.length) {
      emojiUnified = emoji.variations.shift()
    }

    if (skin && emoji.skin_variations && emoji.skin_variations[skinCode]) {
      emojiUnified = emoji.skin_variations[skinCode].unified
    }

    if (unifiedToNative(emojiUnified) === baseNativeString) emojiData = emoji
  }

  if (!emojiData) {
    return null
  }

  emojiData.id = emojiData.short_names[0]

  return getSanitizedData(emojiData, skin, set, data)
}

function uniq(arr) {
  return arr.reduce((acc, item) => {
    if (acc.indexOf(item) === -1) {
      acc.push(item)
    }
    return acc
  }, [])
}

function intersect(a, b) {
  const uniqA = uniq(a)
  const uniqB = uniq(b)

  return uniqA.filter(item => uniqB.indexOf(item) >= 0)
}

function deepMerge(a, b) {
  const o = {}

  for (const key in a) {
    const originalValue = a[key]
    let value = originalValue

    if (b.hasOwnProperty(key)) {
      value = b[key]
    }

    if (typeof value === 'object') {
      value = deepMerge(originalValue, value)
    }

    o[key] = value
  }

  return o
}

// https://github.com/sonicdoe/measure-scrollbar
function measureScrollbar() {
  if (typeof document === 'undefined') return 0
  const div = document.createElement('div')

  div.style.width = '100px'
  div.style.height = '100px'
  div.style.overflow = 'scroll'
  div.style.position = 'absolute'
  div.style.top = '-9999px'

  document.body.appendChild(div)
  const scrollbarWidth = div.offsetWidth - div.clientWidth
  document.body.removeChild(div)

  return scrollbarWidth
}

// Use requestIdleCallback() if available, else fall back to setTimeout().
// Throttle so as not to run too frequently.
function throttleIdleTask(func) {
  const doIdleTask =
    typeof requestIdleCallback === 'function' ? requestIdleCallback : setTimeout

  let running = false

  return function throttled() {
    if (running) {
      return
    }
    running = true
    doIdleTask(() => {
      running = false
      func()
    })
  }
}

export {
  getData,
  getEmojiDataFromNative,
  getSanitizedData,
  uniq,
  intersect,
  deepMerge,
  unifiedToNative,
  measureScrollbar,
  throttleIdleTask
}
