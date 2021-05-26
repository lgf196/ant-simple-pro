import { getData, getSanitizedData, intersect } from '..'
import { uncompress, Data, Emoji } from '../data'
import store from '../store'
import {
  EmojiSkin,
  BaseEmoji,
  CustomEmoji,
  EmojiData,
  EmojiEntry,
  EmojiSet
} from '../types'

export default class NimbleEmojiIndex {
  data: Data
  set: EmojiSet
  originalPool: Record<string, Emoji>
  index: Record<string, any>
  emojis: Record<string, EmojiData>
  emoticons: Record<string, string>
  customEmojisList: CustomEmoji[]

  constructor(data: Data, set: EmojiSet) {
    if (data.compressed) {
      uncompress(data)
    }

    this.data = data || {}
    this.set = set || null
    this.originalPool = {}
    this.index = {}
    this.emojis = {}
    this.emoticons = {}
    this.customEmojisList = []

    this.buildIndex()
  }

  buildIndex() {
    for (const emoji in this.data.emojis) {
      const emojiData = this.data.emojis[emoji]
      const { short_names, emoticons, skin_variations } = emojiData
      const id = short_names && short_names[0]

      if (emoticons) {
        emoticons.forEach(emoticon => {
          if (this.emoticons[emoticon]) {
            return
          }
          if (id) {
            this.emoticons[emoticon] = id
          }
        })
      }

      // If skin variations include them
      if (skin_variations) {
        if (id) {
          this.emojis[id] = {}
          for (let skinTone = 1; skinTone <= 6; skinTone++) {
            this.emojis[id][skinTone] = getSanitizedData(
              { id, skin: skinTone },
              skinTone,
              this.set,
              this.data
            )
          }
        }
      } else {
        if (id) {
          this.emojis[id] = getSanitizedData(id, null, this.set, this.data)
        }
      }

      if (id) {
        this.originalPool[id] = emojiData
      }
    }
  }

  clearCustomEmojis(pool) {
    this.customEmojisList.forEach(emoji => {
      const emojiId = emoji.id || emoji.short_names[0]

      delete pool[emojiId]
      delete this.emojis[emojiId]
    })
  }

  addCustomToPool(custom, pool) {
    if (this.customEmojisList.length) this.clearCustomEmojis(pool)

    custom.forEach(emoji => {
      const emojiId = emoji.id || emoji.short_names[0]

      if (emojiId && !pool[emojiId]) {
        pool[emojiId] = getData(emoji, null, null, this.data)
        this.emojis[emojiId] = getSanitizedData(emoji, null, null, this.data)
      }
    })

    this.customEmojisList = custom
    this.index = {}
  }

  search(
    value,
    { emojisToShowFilter, maxResults, include, exclude, custom = [] } = {}
  ) {
    if (this.customEmojisList != custom)
      this.addCustomToPool(custom, this.originalPool)

    const skinTone = store.get('skin') || 1

    maxResults || (maxResults = 75)
    include || (include = [])
    exclude || (exclude = [])

    let results = null
    let pool = this.originalPool

    if (value.length) {
      if (value == '-' || value == '-1') {
        return [this.emojis['-1'][skinTone]]
      }

      let values = value.toLowerCase().split(/[\s|,|\-|_]+/)
      let allResults = []

      if (values.length > 2) {
        values = [values[0], values[1]]
      }

      if (include.length || exclude.length) {
        pool = {}

        this.data.categories.forEach(category => {
          const isIncluded =
            include && include.length ? include.indexOf(category.id) > -1 : true
          const isExcluded =
            exclude && exclude.length
              ? exclude.indexOf(category.id) > -1
              : false
          if (!isIncluded || isExcluded) {
            return
          }

          category.emojis.forEach(
            emojiId => (pool[emojiId] = this.data.emojis[emojiId])
          )
        })

        if (custom.length) {
          const customIsIncluded =
            include && include.length ? include.indexOf('custom') > -1 : true
          const customIsExcluded =
            exclude && exclude.length ? exclude.indexOf('custom') > -1 : false
          if (customIsIncluded && !customIsExcluded) {
            this.addCustomToPool(custom, pool)
          }
        }
      }

      allResults = values
        .map(value => {
          let aPool = pool
          let aIndex = this.index
          let length = 0

          for (let charIndex = 0; charIndex < value.length; charIndex++) {
            const char = value[charIndex]
            length++

            aIndex[char] || (aIndex[char] = {})
            aIndex = aIndex[char]

            if (!aIndex.results) {
              const scores = {}

              aIndex.results = []
              aIndex.pool = {}

              for (const id in aPool) {
                const emoji = aPool[id]
                const { search } = emoji
                const sub = value.substr(0, length)
                const subIndex = search.indexOf(sub)

                if (subIndex != -1) {
                  let score = subIndex + 1
                  if (sub == id) score = 0

                  if (this.emojis[id] && this.emojis[id][skinTone]) {
                    aIndex.results.push(this.emojis[id][skinTone])
                  } else {
                    aIndex.results.push(this.emojis[id])
                  }
                  aIndex.pool[id] = emoji

                  scores[id] = score
                }
              }

              aIndex.results.sort((a, b) => {
                const aScore = scores[a.id]
                const bScore = scores[b.id]

                if (aScore == bScore) {
                  return a.id.localeCompare(b.id)
                }
                return aScore - bScore
              })
            }

            aPool = aIndex.pool
          }

          return aIndex.results
        })
        .filter(a => a)

      if (allResults.length > 1) {
        results = intersect.apply(null, allResults)
      } else if (allResults.length) {
        results = allResults[0]
      } else {
        results = []
      }
    }

    if (results) {
      if (emojisToShowFilter) {
        results = results.filter(result => emojisToShowFilter(pool[result.id]))
      }

      if (results && results.length > maxResults) {
        results = results.slice(0, maxResults)
      }
    }

    return results
  }
}
