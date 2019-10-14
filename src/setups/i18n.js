import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//transaltions
import en from './translations/en';
import rs from './translations/rs';
let {DEFAULT_LANGUAGE} = require( '../setups/conf');

const resources = {
  en: en,
  rs:rs
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
   lng: DEFAULT_LANGUAGE,
   fallbackLng: DEFAULT_LANGUAGE,

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;