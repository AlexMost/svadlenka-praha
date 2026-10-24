import { test, expect } from "@playwright/test";

const locales = ["cz", "uk", "en", "ru"];
const home = (locale) => (locale === "cz" ? "/" : `/${locale}/`);

// Keep test runs out of Google Analytics/Ads and off the network: only the
// local server answers. Inline snippets (dataLayer pushes) still run.
test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
});

// gtag() pushes `arguments` objects; turn them into arrays to compare them.
const readDataLayer = (page) =>
  page.evaluate(() =>
    window.dataLayer.map((e) =>
      e && typeof e.length === "number" ? Array.from(e) : e,
    ),
  );

const isConsent = (entry, action) =>
  Array.isArray(entry) && entry[0] === "consent" && entry[1] === action;

const DENIED = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};
const GRANTED = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
};

for (const locale of locales) {
  test(`${locale} — the bar shows on first visit with two equal buttons`, async ({
    page,
  }) => {
    await page.goto(home(locale));
    const bar = page.locator(".cookie-bar");
    await expect(bar).toBeVisible();
    await expect(bar.locator(".cookie-bar-text a")).toHaveAttribute(
      "href",
      locale === "cz"
        ? "/ochrana-osobnich-udaju/"
        : `/${locale}/ochrana-osobnich-udaju/`,
    );

    const buttons = bar.locator(".cookie-bar-btn");
    await expect(buttons).toHaveCount(2);
    const [accept, reject] = [
      await buttons.nth(0).boundingBox(),
      await buttons.nth(1).boundingBox(),
    ];
    expect(accept.height).toBe(reject.height);
    const style = (i) =>
      buttons
        .nth(i)
        .evaluate((el) =>
          ["fontSize", "fontWeight", "color", "borderColor", "backgroundColor"]
            .map((p) => getComputedStyle(el)[p])
            .join(" "),
        );
    expect(await style(0)).toBe(await style(1));
  });
}

test("the consent default is denied before gtm.js", async ({ page }) => {
  await page.goto("/");
  const dataLayer = await readDataLayer(page);
  const defaultIdx = dataLayer.findIndex((e) => isConsent(e, "default"));
  const gtmIdx = dataLayer.findIndex((e) => e && e.event === "gtm.js");
  expect(defaultIdx).toBeGreaterThanOrEqual(0);
  expect(gtmIdx).toBeGreaterThan(defaultIdx);
  expect(dataLayer[defaultIdx][2]).toEqual({ ...DENIED, wait_for_update: 500 });
  expect(dataLayer.some((e) => isConsent(e, "update"))).toBe(false);
});

test("accept grants consent, loads the map and survives a reload", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("iframe.map")).toHaveCount(0);
  await expect(page.locator(".map-placeholder")).toBeVisible();

  await page.locator('[data-consent-choice="granted"]').click();
  await expect(page.locator(".cookie-bar")).toBeHidden();
  await expect(page.locator("iframe.map")).toHaveAttribute(
    "src",
    /^https:\/\/www\.google\.com\/maps\/embed/,
  );
  const afterClick = await readDataLayer(page);
  expect(afterClick.filter((e) => isConsent(e, "update")).at(-1)[2]).toEqual(
    GRANTED,
  );

  const stored = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("cookie-consent")),
  );
  expect(stored.value).toBe("granted");
  const days = (stored.expires - Date.now()) / 86400000;
  expect(days).toBeGreaterThan(180);
  expect(days).toBeLessThan(185);

  await page.reload();
  await expect(page.locator(".cookie-bar")).toBeHidden();
  await expect(page.locator("iframe.map")).toHaveCount(1);
  // The stored choice is replayed before GTM starts.
  const dataLayer = await readDataLayer(page);
  const updateIdx = dataLayer.findIndex((e) => isConsent(e, "update"));
  expect(dataLayer[updateIdx][2]).toEqual(GRANTED);
  expect(dataLayer.findIndex((e) => e && e.event === "gtm.js")).toBeGreaterThan(
    updateIdx,
  );
});

test("reject keeps consent denied and the map unloaded after a reload", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator('[data-consent-choice="denied"]').click();
  await expect(page.locator(".cookie-bar")).toBeHidden();
  const afterClick = await readDataLayer(page);
  expect(afterClick.filter((e) => isConsent(e, "update")).at(-1)[2]).toEqual(
    DENIED,
  );

  await page.reload();
  await expect(page.locator(".cookie-bar")).toBeHidden();
  await expect(page.locator("iframe.map")).toHaveCount(0);
  await expect(page.locator(".map-placeholder")).toBeVisible();
  const dataLayer = await readDataLayer(page);
  expect(dataLayer.some((e) => isConsent(e, "update"))).toBe(false);
});

test("an expired choice shows the bar again", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({ value: "granted", expires: Date.now() - 1000 }),
    ),
  );
  await page.goto("/");
  await expect(page.locator(".cookie-bar")).toBeVisible();
  await expect(page.locator("iframe.map")).toHaveCount(0);
});

test("the footer link reopens the bar", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-consent-choice="granted"]').click();
  await expect(page.locator(".cookie-bar")).toBeHidden();

  await page.locator("footer .cookie-settings").click();
  await expect(page.locator(".cookie-bar")).toBeVisible();
  await page.locator('[data-consent-choice="denied"]').click();
  await expect(page.locator(".cookie-bar")).toBeHidden();
  expect(
    await page.evaluate(
      () => JSON.parse(localStorage.getItem("cookie-consent")).value,
    ),
  ).toBe("denied");
});

test("the map placeholder loads the map on click without granting consent", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".map-placeholder-btn").click();
  await expect(page.locator("iframe.map")).toHaveCount(1);
  await expect(page.locator(".cookie-bar")).toBeVisible();
  const dataLayer = await readDataLayer(page);
  expect(dataLayer.some((e) => isConsent(e, "update"))).toBe(false);
});

// iPhone SE: the smallest common phone screen.
test.describe("mobile viewport", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  for (const locale of locales) {
    test(`${locale} — the bar is compact and covers neither the hero CTA nor the phone button`, async ({
      page,
    }) => {
      await page.goto(home(locale));
      const bar = await page.locator(".cookie-bar").boundingBox();
      const cta = await page.locator(".hero .cta-button").boundingBox();
      const phone = await page.locator(".telephone-btn").boundingBox();

      expect(bar.y + bar.height).toBeCloseTo(667, 0);
      expect(bar.height).toBeLessThanOrEqual(60);
      expect(bar.y).toBeGreaterThanOrEqual(cta.y + cta.height);
      expect(bar.y).toBeGreaterThanOrEqual(phone.y + phone.height);
    });
  }
});
