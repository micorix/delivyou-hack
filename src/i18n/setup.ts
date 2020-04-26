import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        whitelist: ['pl', 'en'],
        defaultNS: 'translation',
        debug: true,
        resources: {
            en: {
                translation: require('./locales/en'),
            },
            pl: {
                translation: require('./locales/pl'),
            }
        },
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });


export default i18n;
