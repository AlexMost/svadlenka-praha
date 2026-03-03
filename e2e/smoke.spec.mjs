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
  "sity-na-miru",
  "contacts",
];

const locales = ["cz", "uk", "en", "ru"];

for (const locale of locales) {
  for (const page of pages) {
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
}
