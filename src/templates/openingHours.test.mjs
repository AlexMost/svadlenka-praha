import { test } from "node:test";
import assert from "node:assert/strict";
import {
  pragueToday,
  affectedDays,
  visibleExceptions,
  weeklyLines,
  exceptionLabel,
  exceptionHoursLine,
  scheduleNotices,
  regularScheduleCaption,
  regularScheduleClass,
  schemaOpeningHours,
  specialOpeningHoursSpecification,
} from "./openingHours.mjs";

const open = (weekday, opens, closes) => ({
  weekday,
  closed: false,
  opens,
  closes,
});
const closed = (weekday) => ({
  weekday,
  closed: true,
  opens: null,
  closes: null,
});

// The seeded CRM week: Po–Čt 10–18, Pá 10–16, So–Ne closed.
const weekly = [
  open(1, "10:00", "18:00"),
  open(2, "10:00", "18:00"),
  open(3, "10:00", "18:00"),
  open(4, "10:00", "18:00"),
  open(5, "10:00", "16:00"),
  closed(6),
  closed(7),
];

const changed = (
  from,
  to,
  opens = "10:00",
  closes = "15:00",
  reason = null,
) => ({
  from,
  to,
  closed: false,
  opens,
  closes,
  reason,
});
const closedRange = (from, to, reason = null) => ({
  from,
  to,
  closed: true,
  opens: null,
  closes: null,
  reason,
});

test("pragueToday is the Prague calendar day, not the UTC one", () => {
  // 23:30 UTC on 24 Oct is 01:30 on 25 Oct in Prague (CEST).
  assert.equal(pragueToday(new Date("2026-10-24T23:30:00Z")), "2026-10-25");
  // 22:30 UTC on 31 Dec is 23:30 on 31 Dec in Prague (CET).
  assert.equal(pragueToday(new Date("2026-12-31T22:30:00Z")), "2026-12-31");
});

test("weeklyLines groups adjacent equal weekdays and leaves closed days out", () => {
  assert.deepEqual(weeklyLines(weekly), [
    { days: "Po – Čt", hours: "10:00 – 18:00" },
    { days: "Pá", hours: "10:00 – 16:00" },
  ]);
});

test("weeklyLines does not group equal days across a different one", () => {
  const week = [
    open(1, "10:00", "18:00"),
    open(2, "09:00", "12:00"),
    open(3, "10:00", "18:00"),
    closed(4),
    closed(5),
    open(6, "10:00", "14:00"),
    open(7, "10:00", "14:00"),
  ];
  assert.deepEqual(weeklyLines(week), [
    { days: "Po", hours: "10:00 – 18:00" },
    { days: "Út", hours: "09:00 – 12:00" },
    { days: "St", hours: "10:00 – 18:00" },
    { days: "So – Ne", hours: "10:00 – 14:00" },
  ]);
});

test("affectedDays keeps every day of a closed range", () => {
  assert.deepEqual(
    affectedDays(closedRange("2026-10-30", "2026-11-02"), weekly),
    ["2026-10-30", "2026-10-31", "2026-11-01", "2026-11-02"],
  );
});

test("affectedDays keeps only weekly-open days of changed hours", () => {
  // Fri 30 Oct .. Mon 2 Nov: the weekend stays closed.
  assert.deepEqual(affectedDays(changed("2026-10-30", "2026-11-02"), weekly), [
    "2026-10-30",
    "2026-11-02",
  ]);
});

test("affectedDays crosses a year and the DST change", () => {
  const days = affectedDays(closedRange("2026-12-30", "2027-01-02"), weekly);
  assert.deepEqual(days, [
    "2026-12-30",
    "2026-12-31",
    "2027-01-01",
    "2027-01-02",
  ]);
  // 25 Oct 2026 is the CET switch: the walk must not skip or repeat a day.
  assert.deepEqual(
    affectedDays(closedRange("2026-10-24", "2026-10-26"), weekly),
    ["2026-10-24", "2026-10-25", "2026-10-26"],
  );
});

test("exceptionLabel: one day, upcoming range, running range", () => {
  const today = "2026-09-10";
  assert.equal(
    exceptionLabel(changed("2026-10-28", "2026-10-28"), today),
    "St 28. 10.",
  );
  assert.equal(
    exceptionLabel(changed("2026-09-14", "2026-09-18"), today),
    "14. 9. – 18. 9.",
  );
  assert.equal(
    exceptionLabel(changed("2026-09-09", "2026-09-15"), today),
    "Dočasně do 15. 9.",
  );
  assert.equal(
    exceptionLabel(changed("2026-09-10", "2026-09-15"), today),
    "Dočasně do 15. 9.",
  );
  assert.equal(
    exceptionLabel(closedRange("2026-12-21", "2027-01-03"), today),
    "21. 12. – 3. 1.",
  );
});

test("exceptionHoursLine: closed, one day, a range with its open weekdays", () => {
  assert.equal(
    exceptionHoursLine(closedRange("2026-12-21", "2027-01-03"), weekly),
    "Zavřeno",
  );
  assert.equal(
    exceptionHoursLine(changed("2026-10-28", "2026-10-28"), weekly),
    "10:00 – 15:00",
  );
  assert.equal(
    exceptionHoursLine(changed("2026-09-07", "2026-09-13"), weekly),
    "Po – Pá: 10:00 – 15:00",
  );
  // Mon 7 + Wed 9 only: two separate spans.
  const week = weekly.map((d) => (d.weekday === 2 ? closed(2) : d));
  assert.equal(
    exceptionHoursLine(changed("2026-09-07", "2026-09-09"), week),
    "Po, St: 10:00 – 15:00",
  );
});

test("visibleExceptions drops passed and no-op exceptions and sorts by from", () => {
  const today = "2026-10-24";
  const later = closedRange("2026-12-21", "2027-01-03");
  const soon = changed("2026-10-28", "2026-10-28");
  const passed = closedRange("2026-10-20", "2026-10-23");
  const endsToday = closedRange("2026-10-22", "2026-10-24");
  const weekendOnly = changed("2026-10-31", "2026-11-01");
  assert.deepEqual(
    visibleExceptions(
      { weekly, exceptions: [later, passed, soon, weekendOnly, endsToday] },
      today,
    ),
    [endsToday, soon, later],
  );
});

test("scheduleNotices renders one notice per exception with label, hours and reason", () => {
  const hours = {
    weekly,
    exceptions: [
      changed("2026-10-28", "2026-10-28", "10:00", "15:00", "Školení"),
      closedRange("2026-12-21", "2027-01-03"),
    ],
  };
  const html = scheduleNotices(hours, "2026-10-24");
  const notices = html.match(/class="schedule-notice"/g) ?? [];
  assert.equal(notices.length, 2);
  assert.match(
    html,
    /data-valid-through="2026-10-28"[\s\S]*St 28\. 10\.[\s\S]*10:00 – 15:00[\s\S]*Školení/,
  );
  assert.match(
    html,
    /data-valid-through="2027-01-03"[\s\S]*21\. 12\. – 3\. 1\.[\s\S]*Zavřeno/,
  );
  // A notice without a reason has no reason line.
  assert.equal((html.match(/schedule-notice-reason/g) ?? []).length, 1);
});

test("scheduleNotices escapes the free-text reason", () => {
  const hours = {
    weekly,
    exceptions: [
      changed("2026-10-28", "2026-10-28", "10:00", "15:00", `<b>"A & B"</b>`),
    ],
  };
  const html = scheduleNotices(hours, "2026-10-24");
  assert.ok(html.includes("&lt;b&gt;&quot;A &amp; B&quot;&lt;/b&gt;"));
  assert.ok(!html.includes("<b>"));
});

test("without a visible exception there is no notice, caption or dimming", () => {
  const hours = {
    weekly,
    exceptions: [closedRange("2026-10-20", "2026-10-23")],
  };
  assert.equal(scheduleNotices(hours, "2026-10-24"), "");
  assert.equal(regularScheduleCaption(hours, "2026-10-24"), "");
  assert.equal(regularScheduleClass(hours, "2026-10-24"), "");
});

test("a visible exception adds the caption and dims the regular hours", () => {
  const hours = { weekly, exceptions: [changed("2026-10-28", "2026-10-28")] };
  assert.match(
    regularScheduleCaption(hours, "2026-10-24"),
    /Běžná otevírací doba/,
  );
  assert.equal(regularScheduleClass(hours, "2026-10-24"), "schedule--regular");
});

test("schemaOpeningHours uses schema.org day codes for the open groups", () => {
  assert.deepEqual(schemaOpeningHours(weekly), [
    "Mo-Th 10:00-18:00",
    "Fr 10:00-16:00",
  ]);
});

test("specialOpeningHoursSpecification: one entry per exception per affected weekday", () => {
  const hours = {
    weekly,
    exceptions: [
      changed("2026-10-30", "2026-11-02", "10:00", "15:00"),
      closedRange("2026-10-28", "2026-10-28"),
    ],
  };
  assert.deepEqual(specialOpeningHoursSpecification(hours, "2026-10-24"), [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Wednesday",
      opens: "00:00",
      closes: "00:00",
      validFrom: "2026-10-28",
      validThrough: "2026-10-28",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Monday",
      opens: "10:00",
      closes: "15:00",
      validFrom: "2026-10-30",
      validThrough: "2026-11-02",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "10:00",
      closes: "15:00",
      validFrom: "2026-10-30",
      validThrough: "2026-11-02",
    },
  ]);
});

test("specialOpeningHoursSpecification is undefined without visible exceptions", () => {
  assert.equal(
    specialOpeningHoursSpecification({ weekly, exceptions: [] }, "2026-10-24"),
    undefined,
  );
});

// Ranges over a week revisit every weekday: each must appear once.
test("exceptionHoursLine names each weekday once over several weeks", () => {
  assert.equal(
    exceptionHoursLine(changed("2026-12-07", "2026-12-23"), weekly),
    "Po – Pá: 10:00 – 15:00",
  );
});

test("specialOpeningHoursSpecification has one entry per weekday over several weeks", () => {
  const hours = {
    weekly,
    exceptions: [closedRange("2026-12-21", "2027-01-03")],
  };
  const entries = specialOpeningHoursSpecification(hours, "2026-10-24");
  assert.deepEqual(
    entries.map((e) => e.dayOfWeek),
    [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  );
});
