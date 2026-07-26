import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";

// Only default language in initial bundle; other(s) loaded on demand for LCP
i18n.use(initReactI18next).init({
  resources: { en: { translation: en } },
  lng: "en",
  fallbackLng: "en",
});

/** Load a language bundle on first use (reduces initial JS for LCP). */
export async function loadLanguage(lng) {
  if (lng === "en" || i18n.hasResourceBundle(lng, "translation")) return;
  if (lng === "fr") {
    const { default: fr } = await import("./translations/fr.json");
    i18n.addResourceBundle("fr", "translation", fr);
  }
}

/** Load bundle if needed, then switch active language. */
export async function switchLanguage(lng) {
  await loadLanguage(lng);
  return i18n.changeLanguage(lng);
}

export default i18n;
