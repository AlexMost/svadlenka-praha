/**
 * Renders a styled blockquote for a promise/tagline statement.
 * @param {string} text - The quote text
 * @returns {string} HTML string
 */
export function promiseQuote(text) {
  return `
    <blockquote class="promise-quote">
        <p><span class="emoji">✨</span> ${text}</p>
    </blockquote>
  `;
}
