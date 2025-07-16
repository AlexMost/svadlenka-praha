import { getCurrentLocale } from "../build/i18n.mjs";

export function siteUrl(path, lang) {
  const locale = lang || getCurrentLocale();
  const url = locale === "cz" ? `${path}` : `/${locale}${path}`;
  return url.endsWith("/") ? url : `${url}/`;
}
