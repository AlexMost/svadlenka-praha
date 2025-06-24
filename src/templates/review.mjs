import { t } from 'ttag';

const link = 'https://g.page/r/CSJaL4CZtiUeEBI/review';

export function reviewHTML() {
  return `
      <section class="review-bar">
      <a target="_blank" class="star-link" href="${link}" onclick="addReviewAnalytics()">
        <img class="star" src="/img/icons/star-full.svg" alt="rating star">
        <img class="star" src="/img/icons/star-full.svg" alt="rating star">
        <img class="star" src="/img/icons/star-full.svg" alt="rating star">
        <img class="star" src="/img/icons/star-full.svg" alt="rating star">
        <img class="star" src="/img/icons/star.svg" alt="rating star">
      </a>
      <a target="_blank" rel="noopener noreferrer" href="${link}" onclick="addReviewAnalytics()">
        <span class="review-text">${t`Budeme vděční za vaši recenzi`}</span>
      </a>
      <a class="cta-button review-btn" target="_blank" href="${link}" rel="noopener noreferrer" onclick="addReviewAnalytics()">
        <img class="review-btn-icon" src="/img/icons/google.svg" alt="google icon">
        ${t`Napsat recenzi`}
      </a>
    </section>
  `
}
