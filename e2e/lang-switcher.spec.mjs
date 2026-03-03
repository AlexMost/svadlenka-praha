import { test, expect } from "@playwright/test";

const MOBILE_VIEWPORT = { width: 375, height: 812 };

test("clicking language button opens the language overlay", async ({ page }) => {
  await page.goto("/");

  const langSidebar = page.locator(".sidebar-lang");
  await expect(langSidebar).not.toHaveClass(/open/);

  await page.locator("header .lang-btn").first().click();
  await expect(langSidebar).toHaveClass(/open/);
});

test("clicking outside the panel closes it", async ({ page }) => {
  await page.goto("/");

  await page.locator("header .lang-btn").first().click();
  await expect(page.locator(".sidebar-lang")).toHaveClass(/open/);
  await expect(page.locator(".sidebar-overlay")).toHaveClass(/active/);

  await page.locator(".sidebar-overlay").click({ force: true });
  await expect(page.locator(".sidebar-lang")).not.toHaveClass(/open/);
  await expect(page.locator(".sidebar-overlay")).not.toHaveClass(/active/);
});

const targets = [
  { lang: "en", expectedUrl: "/en/" },
  { lang: "uk", expectedUrl: "/uk/" },
  { lang: "ru", expectedUrl: "/ru/" },
];

for (const { lang, expectedUrl } of targets) {
  test(`switching to ${lang} navigates to ${expectedUrl}`, async ({ page }) => {
    await page.goto("/");

    await page.locator("header .lang-btn").first().click();
    await expect(page.locator(".sidebar-lang")).toHaveClass(/open/);

    await page.locator(`.sidebar-lang ul a`).filter({ hasText: lang }).click();
    await page.waitForURL(`**${expectedUrl}`);

    expect(page.url()).toContain(expectedUrl);
    const title = await page.title();
    expect(title).toBeTruthy();
  });
}

test("switching to cz from en navigates back to /", async ({ page }) => {
  await page.goto("/en/");

  await page.locator("header .lang-btn").first().click();
  await page.locator(".sidebar-lang ul a").filter({ hasText: "cz" }).click();
  await page.waitForURL("**/");

  expect(new URL(page.url()).pathname).toBe("/");
});

// Mobile viewport tests
test("mobile — language button opens the overlay", async ({ page }) => {
  await page.setViewportSize(MOBILE_VIEWPORT);
  await page.goto("/");

  const langSidebar = page.locator(".sidebar-lang");
  await expect(langSidebar).not.toHaveClass(/open/);

  await page.locator(".hamburger-menu .lang-btn").click();
  await expect(langSidebar).toHaveClass(/open/);
});

test("mobile — clicking outside closes the overlay", async ({ page }) => {
  await page.setViewportSize(MOBILE_VIEWPORT);
  await page.goto("/");

  await page.locator(".hamburger-menu .lang-btn").click();
  await expect(page.locator(".sidebar-lang")).toHaveClass(/open/);

  await page.locator(".sidebar-overlay").click({ force: true });
  await expect(page.locator(".sidebar-lang")).not.toHaveClass(/open/);
});

test("mobile — switching language navigates correctly", async ({ page }) => {
  await page.setViewportSize(MOBILE_VIEWPORT);
  await page.goto("/");

  await page.locator(".hamburger-menu .lang-btn").click();
  await expect(page.locator(".sidebar-lang")).toHaveClass(/open/);

  await page.locator(".sidebar-lang ul a").filter({ hasText: "en" }).click();
  await page.waitForURL("**/en/");

  expect(page.url()).toContain("/en/");
});
