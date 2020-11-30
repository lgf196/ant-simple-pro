import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './locales/zh/translation.json';
import en from './locales/en/translation.json';
import ja from './locales/ja/translation.json';
const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  },
  ja: {
    translation: ja
  },
};
i18n
  .use(initReactI18next)
  .init({
    react: {
      useSuspense: false // 防止在ts中报错
    },
    lng: 'en',
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    }
  });
export default i18n;
