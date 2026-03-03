import { test, expect } from "@playwright/test";
import { DOMParser } from "@xmldom/xmldom";

const pages = [
  "index",
  "sluzby",
  "dziny",
  "latkove",
  "zavesy",
  "podsivka",
  "kalhoty",
  "saty",
  "sity-na-miru",
  "contacts",
];

const SITE = "https://svadlenka-praha.cz";
const NS_SITEMAP = "http://www.sitemaps.org/schemas/sitemap/0.9";
const NS_XHTML = "http://www.w3.org/1999/xhtml";

function parseSitemap(xml) {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const urlEls = doc.getElementsByTagNameNS(NS_SITEMAP, "url");
  const urls = [];
  for (let i = 0; i < urlEls.length; i++) {
    const urlEl = urlEls[i];
    const loc = urlEl.getElementsByTagNameNS(NS_SITEMAP, "loc")[0]?.textContent;
    const linkEls = urlEl.getElementsByTagNameNS(NS_XHTML, "link");
    const links = [];
    for (let j = 0; j < linkEls.length; j++) {
      links.push({
        lang: linkEls[j].getAttribute("hreflang"),
        href: linkEls[j].getAttribute("href"),
      });
    }
    urls.push({ loc, links });
  }
  return urls;
}

function slug(page) {
  return page === "index" ? "/" : `/${page}/`;
}

let urls;

test.beforeAll(async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const body = await response.text();
  urls = parseSitemap(body);
});

test("sitemap.xml contains all pages", () => {
  const locs = urls.map((u) => u.loc);
  for (const page of pages) {
    expect(locs, `missing page: ${page}`).toContain(`${SITE}${slug(page)}`);
  }
});

for (const page of pages) {
  test(`sitemap.xml — ${page} has all locale alternate links`, () => {
    const entry = urls.find((u) => u.loc === `${SITE}${slug(page)}`);
    expect(entry, `page ${page} not found in sitemap`).toBeTruthy();

    const linksByLang = Object.fromEntries(entry.links.map((l) => [l.lang, l.href]));

    // Czech (default locale)
    expect(linksByLang["cs"]).toBe(`${SITE}${slug(page)}`);
    // Other locales
    for (const locale of ["uk", "en", "ru"]) {
      expect(linksByLang[locale]).toBe(`${SITE}/${locale}${slug(page)}`);
    }
    // x-default points to Czech URL
    expect(linksByLang["x-default"]).toBe(`${SITE}${slug(page)}`);
  });
}
