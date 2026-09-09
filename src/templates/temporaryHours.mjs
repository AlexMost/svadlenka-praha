import { t } from "ttag";

/**
 * Temporary opening hours (e.g. vacation). Rendered only while active.
 * After `validThrough` a rebuild drops the notice automatically.
 */
export const TEMPORARY_HOURS = {
  validFrom: "2026-09-09",
  validThrough: "2026-09-15",
  opens: "10:00",
  closes: "15:00",
};

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/**
 * @param {Date} [now]
 * @returns {boolean} true while today <= validThrough (inclusive)
 */
export function isTemporaryHoursActive(now = new Date()) {
  const end = new Date(`${TEMPORARY_HOURS.validThrough}T23:59:59`);
  return now <= end;
}

/**
 * Small note with the temporary hours, or "" when not active.
 * @returns {string} HTML
 */
export function temporaryScheduleNotice() {
  if (!isTemporaryHoursActive()) return "";
  return `
    <div class="schedule-notice" data-valid-through="${TEMPORARY_HOURS.validThrough}">
      <div class="schedule-notice-label">
        <svg class="schedule-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>${t`Dočasně do 15. 9.`}</span>
      </div>
      <div class="schedule-notice-hours">${t`Po – Pá: 10:00 – 15:00`}</div>
    </div>
  `;
}

/**
 * Caption shown above the regular hours while the temporary notice is active.
 * @returns {string} HTML
 */
export function regularScheduleCaption() {
  if (!isTemporaryHoursActive()) return "";
  return `<div class="schedule-regular-caption">${t`Běžná otevírací doba`}</div>`;
}

/** Extra class for the regular schedule while the notice is active. */
export function regularScheduleClass() {
  return isTemporaryHoursActive() ? " schedule--regular" : "";
}

/**
 * schema.org specialOpeningHoursSpecification entries, or undefined when inactive.
 */
export function specialOpeningHoursSpecification() {
  if (!isTemporaryHoursActive()) return undefined;
  return WEEKDAYS.map((day) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: day,
    opens: TEMPORARY_HOURS.opens,
    closes: TEMPORARY_HOURS.closes,
    validFrom: TEMPORARY_HOURS.validFrom,
    validThrough: TEMPORARY_HOURS.validThrough,
  }));
}
