/* eslint-disable @typescript-eslint/camelcase */
const mapping = {
  name: 'a',
  unified: 'b',
  non_qualified: 'c',
  has_img_apple: 'd',
  has_img_google: 'e',
  has_img_twitter: 'f',
  has_img_facebook: 'h',
  keywords: 'j',
  sheet: 'k',
  emoticons: 'l',
  text: 'm',
  short_names: 'n',
  added_in: 'o'
}

const buildSearch = emoji => {
  const search = []

  const addToSearch = (strings, split) => {
    if (!strings) {
      return
    }

    ;(Array.isArray(strings) ? strings : [strings]).forEach(string => {
      ;(split ? string.split(/[-|_|\s]+/) : [string]).forEach(s => {
        s = s.toLowerCase()

        if (search.indexOf(s) === -1) {
          search.push(s)
        }
      })
    })
  }

  addToSearch(emoji.short_names, true)
  addToSearch(emoji.name, true)
  addToSearch(emoji.keywords, false)
  addToSearch(emoji.emoticons, false)

  return search.join(',')
}

function deepFreeze(object) {
  // Retrieve the property names defined on object
  const propNames = Object.getOwnPropertyNames(object)

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = object[name]
    object[name] = value && typeof value === 'object' ? deepFreeze(value) : value
  }
  return Object.freeze(object)
}

const uncompress = data => {
  if (!data.compressed) {
    return data
  }
  data.compressed = false

  for (const id in data.emojis) {
    const emoji = data.emojis[id]

    for (const key in mapping) {
      emoji[key] = emoji[mapping[key]]
      delete emoji[mapping[key]]
    }

    if (!emoji.short_names) emoji.short_names = []
    emoji.short_names.unshift(id)

    emoji.sheet_x = emoji.sheet[0]
    emoji.sheet_y = emoji.sheet[1]
    delete emoji.sheet

    if (!emoji.text) emoji.text = ''

    if (!emoji.added_in) emoji.added_in = 6
    emoji.added_in = emoji.added_in.toFixed(1)

    emoji.search = buildSearch(emoji)
  }
  data = deepFreeze(data)
  return data
}

export { buildSearch, uncompress }
