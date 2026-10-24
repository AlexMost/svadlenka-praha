import { t } from "ttag";
import { siteUrl } from "./siteUrl.mjs";

// The visitor's choice lives in localStorage under this key as
// {value: "granted" | "denied", expires: <ms timestamp>}; static/script.js writes it.
const STORAGE_KEY = "cookie-consent";

// Google Consent Mode v2. Must run before the GTM snippet: every signal starts
// denied, and a stored "granted" choice is replayed before GTM reads the queue.
// Marks <html> with data-consent and, while no choice is stored, .cookie-bar-open.
export function consentDefaultsScript() {
  return `<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500
    });
    (function () {
      var choice;
      try {
        var stored = JSON.parse(localStorage.getItem("${STORAGE_KEY}"));
        if (stored && stored.expires > Date.now()) choice = stored.value;
      } catch (e) {}
      var root = document.documentElement;
      if (choice === "granted") {
        gtag("consent", "update", {
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
          analytics_storage: "granted"
        });
      }
      if (choice) root.dataset.consent = choice;
      else root.classList.add("cookie-bar-open");
    })();
    </script>`;
}

export function cookieBar() {
  const cookies = `<a href="${siteUrl("/ochrana-osobnich-udaju")}">cookies</a>`;
  return `
<div class="cookie-bar" role="region" aria-label="cookies">
    <div class="cookie-bar-inner">
        <p class="cookie-bar-text">${t`Používáme ${cookies} pro měření návštěvnosti a reklamy.`}</p>
        <div class="cookie-bar-buttons">
            <button type="button" class="cookie-bar-btn" data-consent-choice="granted">${t`Přijmout`}</button>
            <button type="button" class="cookie-bar-btn" data-consent-choice="denied">${t`Odmítnout`}</button>
        </div>
    </div>
</div>`;
}

export function cookieSettingsLink() {
  return `<button type="button" class="footer-link cookie-settings">${t`Nastavení cookies`}</button>`;
}
