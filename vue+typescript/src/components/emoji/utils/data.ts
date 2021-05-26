export interface Data {
  compressed: boolean
  categories: Category[]
  emojis: { [key: string]: Emoji }
  aliases: { [key: string]: string }
}

export interface Category {
  id: string
  name: string
  emojis: string[]
}

export interface Emoji {
  name?: string
  a?: string
  unified?: string
  b?: string
  non_qualified?: string
  c?: string
  has_img_apple?: boolean
  d?: boolean
  has_img_google?: boolean
  e?: boolean
  has_img_twitter?: boolean
  f?: boolean
  has_img_emojione?: boolean
  g?: boolean
  has_img_facebook?: boolean
  h?: boolean
  has_img_messenger?: boolean
  i?: boolean
  keywords?: string[]
  j?: string[]
  sheet?: number[]
  k?: number[]
  emoticons?: string[]
  l?: string[]
  text?: string
  m?: string
  short_names?: string[]
  n?: string[]
  added_in?: number
  o?: number
  sheet_x?: number
  sheet_y?: number
  skin_variations?: { [key: string]: SkinVariation }
  obsoleted_by?: string
  obsoletes?: string
  search?: string
}

export interface SkinVariation {
  unified: string
  non_qualified: null | string
  image: string
  sheet_x: number
  sheet_y: number
  added_in: string
  has_img_apple: boolean
  has_img_google: boolean
  has_img_twitter: boolean
  has_img_emojione: boolean
  has_img_facebook: boolean
  has_img_messenger: boolean
  obsoleted_by?: string
  obsoletes?: string
}

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

const buildSearch = (emoji: Emoji) => {
  const search: string[] = []

  const addToSearch = (strings: string | string[], split: boolean) => {
    if (!strings) {
      return
    }

    ;(Array.isArray(strings) ? strings : [strings]).forEach(string => {
      ;(split ? string.split(/[-|_|\s]+/) : [string]).forEach(s => {
        s = s.toLowerCase()

        if (search.indexOf(s) == -1) {
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

const compress = (emoji: Emoji) => {
  emoji.short_names = emoji.short_names.filter(short_name => {
    return short_name !== emoji.short_name
  })
  delete emoji.short_name

  emoji.sheet = [emoji.sheet_x, emoji.sheet_y]
  delete emoji.sheet_x
  delete emoji.sheet_y

  emoji.added_in = parseInt(emoji.added_in)
  if (emoji.added_in === 6) {
    delete emoji.added_in
  }

  for (const key in mapping) {
    emoji[mapping[key]] = emoji[key]
    delete emoji[key]
  }

  for (const key in emoji) {
    const value = emoji[key]

    if (Array.isArray(value) && !value.length) {
      delete emoji[key]
    } else if (typeof value === 'string' && !value.length) {
      delete emoji[key]
    } else if (value === null) {
      delete emoji[key]
    }
  }
}

const uncompress = (data: Data) => {
  data.compressed = false

  for (const id in data.emojis) {
    const emoji = data.emojis[id]

    for (const key in mapping) {
      // @ts-ignore
      emoji[key] = emoji[mapping[key]]
      // @ts-ignore
      delete emoji[mapping[key]]
    }

    if (!emoji.short_names) emoji.short_names = []
    emoji.short_names.unshift(id)

    emoji.sheet_x = emoji.sheet && emoji.sheet[0]
    emoji.sheet_y = emoji.sheet && emoji.sheet[1]
    delete emoji.sheet

    if (!emoji.text) emoji.text = ''

    if (!emoji.added_in) emoji.added_in = 6
    emoji.added_in = Number(emoji.added_in.toFixed(1))

    emoji.search = buildSearch(emoji)
  }
}

export { buildSearch, uncompress }
