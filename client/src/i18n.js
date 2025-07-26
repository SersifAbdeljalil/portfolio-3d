import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importation des fichiers de traduction
import translationFR from './locales/fr/translation.json';
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';
import translationZH from './locales/zh/translation.json';

// Les ressources contenant les traductions
const resources = {
  fr: {
    translation: translationFR
  },
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  },
  zh: {
    translation: translationZH
  }
};

i18n
  // Détection de la langue du navigateur
  .use(LanguageDetector)
  // Passe l'instance i18n à react-i18next
  .use(initReactI18next)
  // Initialisation de i18next
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut si la traduction n'existe pas
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // Non nécessaire pour React
    },
    react: {
      useSuspense: true,
    },
    detection: {
      // Options pour le détecteur de langue
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
    }
  });

export default i18n;