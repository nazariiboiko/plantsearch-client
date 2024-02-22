import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en/translation.json';
import translationUA from './ua/translation.json';

const resources = {
    en: {
        translation: translationEN
    },
    ua: {
        translation: translationUA
    },
};


i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: localStorage.getItem('language') || 'ua', // language to use, more languages can be added by adding them to the resources object
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });
export default i18n;