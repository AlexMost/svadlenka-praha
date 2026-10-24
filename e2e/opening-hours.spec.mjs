import { test, expect } from "@playwright/test";
import { openingHours } from "../src/auto/openingHours.mjs";
import {
  pragueToday,
  regularScheduleCaption,
  scheduleNotices,
  schemaOpeningHours,
  visibleExceptions,
  weeklyLines,
} from "../src/templates/openingHours.mjs";

// The hours come from the CRM (npm run fetch-opening-hours). These tests check
// that every block showing them renders the generated data; the formatting
// itself is pinned by src/templates/openingHours.test.mjs.
const lineCount = weeklyLines(openingHours.weekly).length;
const noticeCount = visibleExceptions(openingHours, pragueToday()).length;

const locales = [
  { locale: "cz", prefix: "" },
  { locale: "uk", prefix: "/uk" },
  { locale: "en", prefix: "/en" },
  { locale: "ru", prefix: "/ru" },
];

test("the published week has at least one open day", () => {
  expect(lineCount).toBeGreaterThan(0);
});

for (const { locale, prefix } of locales) {
  test(`${locale} — hero and Kontakty show the hours and every exception`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/`);
    for (const scope of [page.locator(".hero"), page.locator("#kontakty")]) {
      await expect(scope.locator(".schedule-notice")).toHaveCount(noticeCount);
      await expect(scope.locator(".schedule-regular-caption")).toHaveCount(
        noticeCount > 0 ? 1 : 0,
      );
      await expect(scope.locator(".schedule--regular")).toHaveCount(
        noticeCount > 0 ? 1 : 0,
      );
    }
    await expect(page.locator(".hero .schedule tr")).toHaveCount(lineCount);
    await expect(page.locator(".contact-schedule-body li")).toHaveCount(
      lineCount,
    );
  });
}

test("cz — the JSON-LD carries the weekly hours from the CRM", async ({
  page,
}) => {
  await page.goto("/");
  const data = JSON.parse(
    await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent(),
  );
  expect(data.openingHours).toEqual(schemaOpeningHours(openingHours.weekly));
  expect(
    data.specialOpeningHoursSpecification?.length ?? 0,
  ).toBeGreaterThanOrEqual(noticeCount);
});

// The client-side safety net, with synthetic notices swapped into the real
// home page: the clock is set past some of them, as if the nightly rebuild
// had not run yet.
const changed = (from, to) => ({
  from,
  to,
  closed: false,
  opens: "10:00",
  closes: "15:00",
  reason: null,
});

// Swaps the synthetic notices into both schedule blocks, in front of their
// regular hours, which get the dimming class.
async function homeWithNotices(page, exceptions) {
  const hours = { weekly: openingHours.weekly, exceptions };
  const block =
    scheduleNotices(hours, "2099-12-01") +
    regularScheduleCaption(hours, "2099-12-01");
  await page.route("/", async (route) => {
    const response = await route.fetch();
    const html = (await response.text())
      .replace(
        /<table class="?schedule[^>]*>/,
        () => `${block}<table class="schedule schedule--regular">`,
      )
      .replace(
        /(class="?contact-schedule-body"? data-schedule>[\s\S]*?)<ul[^>]*>/,
        (_, head) => `${head}${block}<ul class="schedule--regular">`,
      );
    await route.fulfill({ response, body: html });
  });
  await page.clock.install({ time: new Date("2100-01-02T10:00:00") });
  await page.goto("/");
}

for (const scope of [".hero", "#kontakty"]) {
  test(`${scope} — a passed notice hides, with its caption, dimming and spacing`, async ({
    page,
  }) => {
    await homeWithNotices(page, [changed("2099-12-20", "2099-12-31")]);
    const block = page.locator(scope);
    await expect(
      block.locator('[data-valid-through="2099-12-31"]'),
    ).toBeHidden();
    await expect(block.locator(".schedule-notice:visible")).toHaveCount(0);
    // An emptied wrapper has no box, so Playwright already calls it hidden,
    // yet its margin still pushes the regular hours down: check display.
    const wrapperDisplays = await block
      .locator(".schedule-notices")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).display));
    expect(wrapperDisplays.length).toBeGreaterThan(0);
    expect(wrapperDisplays.every((d) => d === "none")).toBe(true);
    await expect(
      block.locator(".schedule-regular-caption:visible"),
    ).toHaveCount(0);
    await expect(block.locator(".schedule--regular")).toHaveCount(0);
  });

  test(`${scope} — the caption and dimming stay while another notice is valid`, async ({
    page,
  }) => {
    await homeWithNotices(page, [
      changed("2099-12-20", "2099-12-31"),
      changed("2100-01-05", "2100-12-31"),
    ]);
    const block = page.locator(scope);
    await expect(
      block.locator('[data-valid-through="2099-12-31"]'),
    ).toBeHidden();
    await expect(
      block.locator('[data-valid-through="2100-12-31"]'),
    ).toBeVisible();
    // .last(): the real page may carry its own notices and caption above.
    await expect(block.locator(".schedule-notices").last()).toBeVisible();
    await expect(
      block.locator(".schedule-regular-caption").last(),
    ).toBeVisible();
    await expect(block.locator(".schedule--regular")).toHaveCount(1);
  });
}
