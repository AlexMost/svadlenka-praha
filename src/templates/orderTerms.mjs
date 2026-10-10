import { t } from "ttag";

const item = ({ icon, label, value, caption }) => `
      <div class="order-terms-item">
        <div class="order-terms-label"><span class="order-terms-icon order-terms-icon--${icon}" aria-hidden="true"></span><span>${label}</span></div>
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
