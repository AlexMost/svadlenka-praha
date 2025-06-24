import { getCurrentLocale } from '../build/i18n.mjs';

export function siteUrl(path) {
  const locale = getCurrentLocale();
  const url = locale === 'cz' ? `${path}` : `/${locale}${path}`;
  return url;
}
