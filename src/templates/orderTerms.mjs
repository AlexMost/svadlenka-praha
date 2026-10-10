import { t } from "ttag";

const ICONS = {
  calendar: `<svg class="order-terms-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/></svg>`,
  bolt: `<svg class="order-terms-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 4 14 12 14 11 22 20 10 12 10 13 2"/></svg>`,
  clock: `<svg class="order-terms-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>`,
};

const item = ({ icon, label, value, caption }) => `
      <div class="order-terms-item">
        <div class="order-terms-label">${ICONS[icon]}<span>${label}</span></div>
        <div class="order-terms-value">${value}</div>
        ${caption ? `<div class="order-terms-caption">${caption}</div>` : ""}
      </div>`;

/**
 * Compact block with turnaround times and express surcharges,
 * shown above the price list.
 * @returns {string} HTML
 */
export function orderTermsHTML() {
  return `
    <div class="order-terms">
      <div class="order-terms-grid">
        ${item({
          icon: "calendar",
          label: t`Standardní termín`,
          value: t`1–2 týdny`,
          caption: t`Konkrétní termín dokončení bude dohodnut při přijetí zakázky.`,
        })}
        ${item({
          icon: "bolt",
          label: t`Expres · do druhého dne`,
          value: t`příplatek 50 %`,
          caption: t`Zakázky přijaté do 12:00.`,
        })}
        ${item({
          icon: "clock",
          label: t`Expres · na počkání`,
          value: t`příplatek 100 %`,
          caption: t`Dle aktuální vytíženosti.`,
        })}
      </div>
      <p class="order-terms-note">${t`Expresní zhotovení dle aktuální vytíženosti. Příplatky se vztahují k ceně práce.`}</p>
    </div>
  `;
}

/**
 * Standalone section with the order terms, shown on every page
 * right above the contacts block.
 * @returns {string} HTML
 */
export function orderTermsSection() {
  return `
    <section id="terminy" class="order-terms-section">
      <div class="section-title">${t`Termíny zhotovení`}</div>
      ${orderTermsHTML()}
    </section>
  `;
}
