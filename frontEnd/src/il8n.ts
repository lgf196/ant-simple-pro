import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
const resources = {
    en: {
      translation:{
          title:'www'
      }
    }
  };
i18n
  .use(initReactI18next)
  .init({
    react: { 
        useSuspense: false //   
    },
    lng: 'en',
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    }
  });
export default i18n;