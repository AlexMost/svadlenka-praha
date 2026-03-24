/**
 * Renders a styled "Important to remember" notice block.
 * @param {string} title - Block heading
 * @param {string[]} items - Array of notice text items
 * @returns {string} HTML string
 */
export function importantNotice(title, items) {
  return `
    <div class="important-notice">
      <div class="important-notice-header">
        <svg class="important-notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>${title}</span>
      </div>
      <ul class="important-notice-list">
        ${items.map((item) => `<li>${item}</li>`).join("\n")}
      </ul>
    </div>
  `;
}
