import i18n from "i18next";
import { initReactI18next } from "react-i18next";

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: require("./locales/en/translations.json"),
    },
    ja: {
      translations: require("./locales/ja/translations.json"),
    },
  },
  lng: localStorage.locale ?? "en",
  fallbackLng: "en",
  ns: ["translations"],
  defaultNS: "translations",
  interpolation: {
    escapeValue: false,
  },
});

i18n.languages = ["en", "ja"];

export default i18n;
