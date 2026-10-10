import { test, expect } from "@playwright/test";

// The turnaround / express-surcharge block shown above the price list.
const cases = [
  {
    locale: "cz",
    url: "/sluzby/",
    value: "1–2 týdny",
    note: "Příplatky se vztahují k ceně práce.",
  },
  {
    locale: "uk",
    url: "/uk/sluzby/",
    value: "1–2 тижні",
    note: "Доплати стосуються вартості роботи.",
  },
  {
    locale: "en",
    url: "/en/sluzby/",
    value: "1–2 weeks",
    note: "Surcharges apply to the labor price.",
  },
  {
    locale: "ru",
    url: "/ru/sluzby/",
    value: "1–2 недели",
    note: "Доплаты относятся к стоимости работы.",
  },
];

for (const { locale, url, value, note } of cases) {
  test(`${locale} — order terms block is shown above the price list`, async ({
    page,
  }) => {
    await page.goto(url);

    const block = page.locator(".order-terms");
    await expect(block).toBeVisible();
    await expect(block).toHaveCount(1);

    // Three tiles: standard term, express next day, express while you wait
    const items = block.locator(".order-terms-item");
    await expect(items).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await expect(items.nth(i).locator(".order-terms-label")).not.toBeEmpty();
      await expect(items.nth(i).locator(".order-terms-value")).not.toBeEmpty();
    }

    await expect(items.nth(0).locator(".order-terms-value")).toHaveText(value);
    await expect(items.nth(1).locator(".order-terms-value")).toContainText(
      /50\s?%/,
    );
    await expect(items.nth(2).locator(".order-terms-value")).toContainText(
      /100\s?%/,
    );

    await expect(block.locator(".order-terms-note")).toContainText(note);

    // Block sits right under the page heading, before the first price list
    const order = await page.evaluate(() => {
      const h1 = document.querySelector("main h1");
      const block = document.querySelector(".order-terms");
      const list = document.querySelector(".sluzby-list");
      return {
        afterH1: !!(
          h1.compareDocumentPosition(block) & Node.DOCUMENT_POSITION_FOLLOWING
        ),
        beforeList: !!(
          block.compareDocumentPosition(list) & Node.DOCUMENT_POSITION_FOLLOWING
        ),
      };
    });
    expect(order).toEqual({ afterH1: true, beforeList: true });
  });
}

// Every other page shows the block as its own section right above the contacts
const otherPages = [
  "/",
  "/dziny/",
  "/latkove/",
  "/zavesy/",
  "/podsivka/",
  "/kalhoty/",
  "/saty/",
  "/contacts/",
  "/uk/",
  "/en/",
  "/ru/",
];

for (const url of otherPages) {
  test(`${url} — order terms section is shown above the contacts`, async ({
    page,
  }) => {
    await page.goto(url);

    const section = page.locator("section#terminy");
    await expect(section).toBeVisible();
    await expect(page.locator(".order-terms")).toHaveCount(1);
    await expect(section.locator(".section-title")).not.toBeEmpty();
    await expect(section.locator(".order-terms-item")).toHaveCount(3);

    const isRightAboveContacts = await page.evaluate(() => {
      const section = document.querySelector("section#terminy");
      return section.nextElementSibling?.id === "kontakty";
    });
    expect(isRightAboveContacts).toBe(true);
  });
}

test("the price list page shows the block only once, under the heading", async ({
  page,
}) => {
  await page.goto("/sluzby/");
  await expect(page.locator(".order-terms")).toHaveCount(1);
  await expect(page.locator("section#terminy")).toHaveCount(0);
});

test("mobile — order terms tiles stack vertically", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/sluzby/");
  const items = page.locator(".order-terms-item");
  const first = await items.nth(0).boundingBox();
  const second = await items.nth(1).boundingBox();
  expect(second.y).toBeGreaterThan(first.y + first.height - 1);
  expect(Math.round(first.x)).toBe(Math.round(second.x));
});
