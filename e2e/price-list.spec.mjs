import { test, expect } from "@playwright/test";
import { getServices } from "../src/auto/services.mjs";

// The price list on /sluzby comes from the CRM (npm run fetch-services). A
// broken or half-empty feed must fail here instead of being deployed.
const MIN_CATEGORIES = 5;
const MIN_ROWS = 30;

const services = getServices();
const categoryCount = services.length;
const rowCount = services.reduce((n, s) => n + s.options.length, 0);

const locales = [
  { locale: "cz", url: "/sluzby/" },
  { locale: "uk", url: "/uk/sluzby/" },
  { locale: "en", url: "/en/sluzby/" },
  { locale: "ru", url: "/ru/sluzby/" },
];

test("the generated price list is not half-empty", () => {
  expect(categoryCount).toBeGreaterThanOrEqual(MIN_CATEGORIES);
  expect(rowCount).toBeGreaterThanOrEqual(MIN_ROWS);
});

for (const { locale, url } of locales) {
  test(`${locale} — /sluzby shows the whole price list`, async ({ page }) => {
    await page.goto(url);

    await expect(page.locator("main section > h2")).toHaveCount(categoryCount);
    const rows = page.locator(".sluzby-list li");
    await expect(rows).toHaveCount(rowCount);

    const texts = await rows.evaluateAll((items) =>
      items.map((li) => ({
        title: li.querySelector(".title")?.textContent.trim() ?? "",
        price: li.querySelector(".price")?.textContent.trim() ?? "",
      })),
    );
    for (const { title, price } of texts) {
      expect(title).not.toBe("");
      expect(price).not.toBe("");
    }
  });
}

test("cz — /sluzby rows follow the CRM order", async ({ page }) => {
  await page.goto("/sluzby/");
  const firstService = services[0];
  const firstRow = page.locator(".sluzby-list").first().locator("li").first();
  await expect(page.locator("main section > h2").first()).toHaveText(
    firstService.title,
  );
  await expect(firstRow.locator(".price")).toHaveText(
    firstService.options[0][1],
  );
});
