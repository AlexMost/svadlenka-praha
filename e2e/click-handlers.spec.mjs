import { test, expect } from "@playwright/test";

// Clicks on the phone, map and review links are measured by GTM click
// triggers; the links themselves must not call page functions that throw.
test.beforeEach(async ({ page }) => {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
});

for (const viewport of [
  { width: 1280, height: 800 },
  { width: 375, height: 812 },
]) {
  test(`clicking contact and review links throws no errors (${viewport.width}px)`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");

    const links = page.locator(
      'a[href^="tel:"], a[href*="maps.app.goo.gl"], a[href*="g.page"]',
    );
    expect(await links.count()).toBeGreaterThan(0);
    // Dispatch the clicks without following the links.
    await page.evaluate(() => {
      document.addEventListener("click", (e) => e.preventDefault());
      document
        .querySelectorAll(
          'a[href^="tel:"], a[href*="maps.app.goo.gl"], a[href*="g.page"]',
        )
        .forEach((a) => a.click());
    });

    expect(errors).toEqual([]);
  });
}
