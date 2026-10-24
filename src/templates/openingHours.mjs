import { t } from "ttag";

/**
 * Opening hours as the CRM publishes them (`GET /api/public/opening-hours`,
 * fetched into src/auto/openingHours.mjs by `npm run fetch-opening-hours`):
 *
 *   { weekly: [{ weekday: 1..7, closed, opens, closes }],      // 1 = Monday
 *     exceptions: [{ from, to, closed, opens, closes, reason }] } // YYYY-MM-DD, inclusive
 *
 * Every function takes that data and the Prague `today` explicitly, so the
 * module never imports the generated file and the unit tests need none.
 * Ported from the CRM package `@svadlenka/opening-hours`; dates are hand-built
 * strings («15. 9.»), never `Intl` display formats.
 */

const DASH = " – ";
const DAY_MS = 86_400_000;
const SCHEMA_DAY_CODES = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const SCHEMA_DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// A function, so each locale's build gets its own translations.
const weekdayShort = () => [t`Po`, t`Út`, t`St`, t`Čt`, t`Pá`, t`So`, t`Ne`];

/** Today's calendar day in Prague as YYYY-MM-DD. */
export function pragueToday(now = new Date()) {
  // en-CA formats as YYYY-MM-DD; only the digits are used, never the display.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

const utcDay = (day) => {
  const [year, month, date] = day.split("-").map(Number);
  return Date.UTC(year, month - 1, date);
};

const fromUtc = (ms) => new Date(ms).toISOString().slice(0, 10);

/** 0 = Monday … 6 = Sunday. UTC arithmetic, so DST never shifts a day. */
const weekdayIndex = (day) => (new Date(utcDay(day)).getUTCDay() + 6) % 7;

/** `15. 9.` — no zero padding, a space after each dot. */
const dayMonth = (day) => {
  const [, month, date] = day.split("-");
  return `${Number(date)}. ${Number(month)}.`;
};

const eachDay = (from, to) => {
  const days = [];
  for (let ms = utcDay(from); ms <= utcDay(to); ms += DAY_MS) {
    days.push(fromUtc(ms));
  }
  return days;
};

const isOpen = (weekly, day) =>
  weekly.find((d) => d.weekday === weekdayIndex(day) + 1)?.closed === false;

/**
 * The days an exception actually changes: all of a closed range, but for
 * changed hours only the days the weekly schedule opens.
 */
export function affectedDays(exception, weekly) {
  const days = eachDay(exception.from, exception.to);
  return exception.closed ? days : days.filter((day) => isOpen(weekly, day));
}

/**
 * The exceptions the site shows on `today`: not yet passed, changing at least
 * one day, ordered by start.
 */
export function visibleExceptions({ weekly, exceptions }, today) {
  return exceptions
    .filter((e) => e.to >= today && affectedDays(e, weekly).length > 0)
    .sort((a, b) => a.from.localeCompare(b.from));
}

/** Weekday indexes (0 = Monday) as `Po – Čt`, `Po, St`: runs of 2+ joined. */
function weekdaySpans(indexes) {
  const names = weekdayShort();
  const sorted = [...new Set(indexes)].sort((a, b) => a - b);
  const runs = [];
  for (const i of sorted) {
    const last = runs[runs.length - 1];
    if (last && last[last.length - 1] === i - 1) last.push(i);
    else runs.push([i]);
  }
  return runs
    .map((run) =>
      run.length === 1
        ? names[run[0]]
        : `${names[run[0]]}${DASH}${names[run[run.length - 1]]}`,
    )
    .join(", ");
}

const sameHours = (a, b) =>
  a.closed === b.closed && a.opens === b.opens && a.closes === b.closes;

/** Runs of adjacent weekdays with equal hours, closed runs left out. */
function openGroups(weekly) {
  const groups = [];
  for (const day of [...weekly].sort((a, b) => a.weekday - b.weekday)) {
    const last = groups[groups.length - 1];
    if (last && sameHours(last[0], day)) last.push(day);
    else groups.push([day]);
  }
  return groups.filter((g) => !g[0].closed);
}

/** The open weekly schedule as `{ days: "Po – Čt", hours: "10:00 – 18:00" }`. */
export function weeklyLines(weekly) {
  return openGroups(weekly).map((g) => ({
    days: weekdaySpans(g.map((d) => d.weekday - 1)),
    hours: `${g[0].opens}${DASH}${g[0].closes}`,
  }));
}

/** `St 28. 10.` for one day, `Dočasně do 15. 9.` once running, else `9. 9. – 15. 9.`. */
export function exceptionLabel(exception, today) {
  const { from, to } = exception;
  if (from === to)
    return `${weekdayShort()[weekdayIndex(from)]} ${dayMonth(from)}`;
  const until = dayMonth(to);
  if (from <= today) return t`Dočasně do ${until}`;
  return `${dayMonth(from)}${DASH}${until}`;
}

/** `Zavřeno`, `10:00 – 14:00` (one day) or `Po – Pá: 10:00 – 15:00` (range). */
export function exceptionHoursLine(exception, weekly) {
  if (exception.closed) return t`Zavřeno`;
  const hours = `${exception.opens}${DASH}${exception.closes}`;
  if (exception.from === exception.to) return hours;
  const spans = weekdaySpans(affectedDays(exception, weekly).map(weekdayIndex));
  return `${spans}: ${hours}`;
}

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function notice(exception, weekly, today) {
  // The reason is Czech free text, shown as is on every locale.
  const reason = exception.reason?.trim() ?? "";
  return `
    <div class="schedule-notice" data-valid-through="${exception.to}">
      <div class="schedule-notice-label">
        <svg class="schedule-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>${exceptionLabel(exception, today)}</span>
      </div>
      <div class="schedule-notice-hours">${exceptionHoursLine(exception, weekly)}</div>
      ${reason === "" ? "" : `<div class="schedule-notice-reason">${escapeHtml(reason)}</div>`}
    </div>`;
}

/**
 * One gold notice per visible exception, stacked by date, or "" when none.
 * `data-valid-through` lets static/script.js hide a notice that outlives its
 * last day before the nightly rebuild drops it.
 * @returns {string} HTML
 */
export function scheduleNotices(hours, today) {
  const exceptions = visibleExceptions(hours, today);
  if (exceptions.length === 0) return "";
  return `<div class="schedule-notices">${exceptions
    .map((e) => notice(e, hours.weekly, today))
    .join("")}
    </div>`;
}

const hasNotices = (hours, today) => visibleExceptions(hours, today).length > 0;

/** Caption above the regular hours while any notice shows. @returns {string} HTML */
export function regularScheduleCaption(hours, today) {
  if (!hasNotices(hours, today)) return "";
  return `<div class="schedule-regular-caption">${t`Běžná otevírací doba`}</div>`;
}

/** Class that dims the regular hours while any notice shows. */
export function regularScheduleClass(hours, today) {
  return hasNotices(hours, today) ? "schedule--regular" : "";
}

/** schema.org `openingHours` strings, e.g. `Mo-Th 10:00-18:00`. Never translated. */
export function schemaOpeningHours(weekly) {
  return openGroups(weekly).map((g) => {
    const first = SCHEMA_DAY_CODES[g[0].weekday - 1];
    const last = SCHEMA_DAY_CODES[g[g.length - 1].weekday - 1];
    const days = g.length === 1 ? first : `${first}-${last}`;
    return `${days} ${g[0].opens}-${g[0].closes}`;
  });
}

/**
 * schema.org `specialOpeningHoursSpecification`: one entry per visible
 * exception per affected weekday, Monday first; closed = 00:00–00:00.
 * Undefined when there is nothing to say, so JSON.stringify drops the key.
 */
export function specialOpeningHoursSpecification(hours, today) {
  const entries = visibleExceptions(hours, today).flatMap((e) =>
    [...new Set(affectedDays(e, hours.weekly).map(weekdayIndex))]
      .sort((a, b) => a - b)
      .map((i) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: SCHEMA_DAY_NAMES[i],
        opens: e.closed ? "00:00" : e.opens,
        closes: e.closed ? "00:00" : e.closes,
        validFrom: e.from,
        validThrough: e.to,
      })),
  );
  return entries.length > 0 ? entries : undefined;
}
