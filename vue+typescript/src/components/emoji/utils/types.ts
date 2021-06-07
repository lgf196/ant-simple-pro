export type EmojiSkin = 1 | 2 | 3 | 4 | 5 | 6

export type EmojiSheetSize = 16 | 20 | 32 | 64

export type EmojiSet = 'apple' | 'google' | 'twitter' | 'facebook'

export type ThemeType = 'auto' | 'light' | 'dark'

export interface BaseEmoji {
  id: string
  name: string
  colons: string
  /** Reverse mapping to keyof emoticons */
  emoticons: string[]
  unified: string
  skin: EmojiSkin | null
  native: string
  [propName: string]: any
}

export interface CustomEmoji {
  // id is overridden by short_names[0]
  id?: string
  // colons is overridden by :id:
  colons?: string
  name: string
  /** Must contain at least one name. The first name is used as the unique id. */
  short_names: string[]
  emoticons?: string[]
  keywords?: string[]
  imageUrl: string
  [propName: string]: any
}

export type EmojiData = BaseEmoji | CustomEmoji

export type EmojiEntry = EmojiData | { [key in EmojiSkin]: EmojiData }

export type CategoryName =
  | 'search'
  | 'recent'
  | 'people'
  | 'nature'
  | 'foods'
  | 'activity'
  | 'places'
  | 'objects'
  | 'symbols'
  | 'flags'
  | 'custom'

// tslint:disable-next-line interface-name
export interface I18n {
  search: string
  categories: Record<CategoryName, string>
  notfound: string
  skintext: string
}

export type PartialI18n = Partial<
  Pick<I18n, 'search' | 'notfound'> & {
    categories: Partial<I18n['categories']>
  }
>

export interface CustomIcons {
  categories: Record<CategoryName, () => JSX.Element>
}
