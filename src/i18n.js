import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation files (optional)
import en from "./translations/en.json";
import fr from "./translations/fr.json";

i18n
  .use(initReactI18next) // Initializes i18next with react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      fr: {
        // Add other languages here
        translation: fr,
      },
    },
    lng: "en", // Set the default language
    fallbackLng: "en", // Fallback language if translations are missing
  });

export default i18n;
