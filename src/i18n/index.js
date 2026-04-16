import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import es from './es.json';
import useAppStore from '../store';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: useAppStore.getState().language || 'es',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

useAppStore.subscribe((state) => {
  if (state.language !== i18n.language) {
    i18n.changeLanguage(state.language);
  }
});

export default i18n;
