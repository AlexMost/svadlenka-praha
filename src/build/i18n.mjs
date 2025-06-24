import { addLocale, useLocale } from "ttag";
import gettext from "gettext-parser";
import standardFs from "fs";

let currentLocale = "cz";

export function loadLocales() {
  addLocale(
    "uk",
    gettext.po.parse(
      standardFs.readFileSync("./i18n/uk/uk.po", "utf8").toString(),
    ),
  );
  addLocale(
    "en",
    gettext.po.parse(
      standardFs.readFileSync("./i18n/en/en.po", "utf8").toString(),
    ),
  );
}

export function setLocale(locale) {
  currentLocale = locale;
  useLocale(locale);
}

export function getCurrentLocale() {
  return currentLocale;
}

const lang2Code = {
  cz: 'cs',
  en: 'en',
  uk: 'uk',
  ru: 'ru',
}

export function getLanguageCode() {
  return lang2Code[currentLocale];
}