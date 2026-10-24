import { test, expect } from "@playwright/test";

const pages = [
  "index",
  "sluzby",
  "dziny",
  "latkove",
  "zavesy",
  "podsivka",
  "kalhoty",
  "saty",
  // "sity-na-miru",
  "contacts",
  "ochrana-osobnich-udaju",
];

const locales = ["cz", "uk", "en", "ru"];

function makeTests(page, locale) {
  const urlPath =
    locale === "cz"
      ? page === "index"
        ? "/"
        : `/${page}/`
      : page === "index"
        ? `/${locale}/`
        : `/${locale}/${page}/`;

  test(`${locale} — ${page} (${urlPath})`, async ({ page: p }) => {
    const errors = [];
    p.on("pageerror", (err) => errors.push(err.message));

    const response = await p.goto(urlPath);
    expect(response.status()).toBe(200);

    const title = await p.title();
    expect(title).toBeTruthy();

    await expect(p.locator("header")).toBeVisible();
    await expect(p.locator("main")).toBeVisible();
    await expect(p.locator("footer")).toBeVisible();

    const mainText = await p.locator("main").textContent();
    expect(mainText.trim().length).toBeGreaterThan(0);

    expect(errors).toEqual([]);
  });
}

// Pages checked in every locale; the rest — Czech only
const allLocalePages = ["index", "ochrana-osobnich-udaju"];

for (const page of pages) {
  for (const locale of allLocalePages.includes(page) ? locales : ["cz"]) {
    makeTests(page, locale);
  }
}

// The footer links to the privacy policy in the page's own locale
for (const locale of locales) {
  const prefix = locale === "cz" ? "" : `/${locale}`;

  test(`${locale} — footer links to the privacy policy`, async ({
    page: p,
  }) => {
    await p.goto(`${prefix}/`);
    await p.locator("footer a.footer-link").click();
    await p.waitForURL(`**${prefix}/ochrana-osobnich-udaju/`);

    await expect(p.locator("main h1")).toBeVisible();
    await expect(p.locator("main")).toContainText("business.manage");
  });
}
