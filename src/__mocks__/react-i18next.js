/** Minimal stub so `src/i18n.js` can run `i18n.use(initReactI18next).init(...)` under Jest. */
const initReactI18next = {
  type: "3rdParty",
  init() {},
};

function I18nextProvider({ children }) {
  return children;
}

module.exports = {
  initReactI18next,
  I18nextProvider,
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: "fr",
      changeLanguage: () => Promise.resolve(),
      resolvedLanguage: "fr",
    },
  }),
};
