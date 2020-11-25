import { createI18n } from 'vue-i18n'

import en from './en'
import zh from './zh'
import ja from './ja'

export default createI18n({
  locale: 'en',
  messages: {
    en,
    zh,
    ja
  }
})
