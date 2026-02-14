import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./translations/fr.json";

// Only default language in initial bundle; other(s) loaded on demand for LCP
i18n.use(initReactI18next).init({
  resources: { fr: { translation: fr } },
  lng: "fr",
  fallbackLng: "fr",
});

/** Load a language bundle on first use (reduces initial JS for LCP). */
export async function loadLanguage(lng) {
  if (lng === "fr" || i18n.hasResourceBundle(lng, "translation")) return;
  if (lng === "en") {
    const { default: en } = await import("./translations/en.json");
    i18n.addResourceBundle("en", "translation", en);
  }
}

export default i18n;
