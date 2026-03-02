import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { SITE, LOCALES, DEFAULT_LOCALE } from "../config.mjs";
import { lang2Code } from "./i18n.mjs";

function hreflangCode(locale) {
  return lang2Code[locale] || locale;
}

function localeUrl(pageName, locale) {
  const slug = pageName === "index" ? "/" : `/${pageName}/`;
  return locale === DEFAULT_LOCALE ? slug : `/${locale}${slug}`;
}

export async function generateSitemap(pageNames) {
  const today = new Date().toISOString().split("T")[0];

  const urls = pageNames.map((pageName) => {
    const links = [
      ...LOCALES.map((loc) => ({
        lang: hreflangCode(loc),
        url: localeUrl(pageName, loc),
      })),
      { lang: "x-default", url: localeUrl(pageName, DEFAULT_LOCALE) },
    ];

    return {
      url: localeUrl(pageName, DEFAULT_LOCALE),
      lastmod: today,
      changefreq: "weekly",
      priority: 0.8,
      links,
    };
  });

  const stream = new SitemapStream({ hostname: SITE });
  const buf = await streamToPromise(Readable.from(urls).pipe(stream));
  return buf.toString();
}
