import { t } from "ttag";
import { siteUrl } from "./siteUrl.mjs";

// The visitor's choice lives in localStorage under this key as
// {value: "granted" | "denied", expires: <ms timestamp>}; static/script.js writes it.
const STORAGE_KEY = "cookie-consent";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.1299956582297!2d14.423894077578739!3d50.065127071521246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b95417e9293ed%3A0x1e25b699802f5a22!2zS3JlasSNb3ZzdHbDrSDFoHZhZGxlbmth!5e0!3m2!1sen!2scz!4v1746189430361!5m2!1sen!2scz";

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

// Google Maps sets its own cookies, so the iframe is only created after consent
// (or a click on the placeholder); static/script.js swaps the placeholder out.
export function mapEmbed() {
  return `
    <div class="map map-placeholder" data-map-src="${MAP_SRC}">
        <img class="icon" src="/img/icons/location.svg" alt="">
        <p class="map-placeholder-address">Jaromírova 726/15, 128&nbsp;00 Praha&nbsp;2</p>
        <button type="button" class="cta-button map-placeholder-btn">${t`Zobrazit mapu`}</button>
        <p class="map-placeholder-note">${t`Mapa se načte ze služby Google Maps.`}</p>
    </div>`;
}

export function cookieSettingsLink() {
  return `<button type="button" class="footer-link cookie-settings">${t`Nastavení cookies`}</button>`;
}
