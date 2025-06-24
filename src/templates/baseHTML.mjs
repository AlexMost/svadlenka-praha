import { t } from "ttag";
import { header } from "./header.mjs";
import { kontakty } from "./kontakty.mjs";
import { getStructuredData } from "./structuredData.mjs";
import { reviewHTML } from "./review.mjs";
import { siteUrl } from "./siteUrl.mjs";
import { getLanguageCode, lang2Code } from "../build/i18n.mjs";

const defaultMeta = {
  canonical: "/",
  title: t`Krejčovství Švadlenka – Oprava a úprava oděvů Praha 2`,
  description: t`Švadlenka je krejčovství na Praze 2, které nabízí kvalitní opravy a úpravy oblečení – džíny, kabáty, podšívky, batohy i záclony. Najdete nás na Jaromírově 726/15.`,
  keywords: t`krejčovství, oprava oblečení, úprava oděvů, výměna zipu, podšívka, záclony, Praha 2, Nusle`,
  ogTitle: t`Krejčovství Švadlenka – Praha 2`,
  ogDescription: t`Opravy a úpravy oblečení, záclon, batohů – najdete nás na Jaromírově 726/15.`,
  structuredData: getStructuredData({}),
};

function getAlternateUrls(url) {
  const langs = Object.values(lang2Code);
  return langs
    .map(
      (lang) =>
        `<link rel="alternate" hreflang="${lang}" href="https://svadlenka-praha.cz${lang === "cs" ? url : siteUrl(url, lang)}" />`,
    )
    .join("\n");
}

export function baseHtml({ content = "", meta = defaultMeta }) {
  return `
    <!DOCTYPE html>
<html lang="${getLanguageCode()}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name='theme-color' content='#262626'>
    <meta name='msapplication-navbutton-color' content='#262626'>
    <meta name='apple-mobile-web-app-status-bar-style' content='#262626'>
    <link rel="icon" href="/img/favicon-min.ico" type="image/x-icon">
    <link rel="stylesheet" href="/style.css?r=$REVISION">
    <title>${meta.title}</title>
    <meta name="description" content="${meta.description}">
    <meta name="keywords" content="${meta.keywords}">
    <link rel="canonical" href="https://svadlenka-praha.cz${siteUrl(meta.canonical)}">
    <meta property="og:title" content="${meta.ogTitle}">
    <meta property="og:description" content="${meta.ogDescription}">
    <meta property="og:image" content="https://svadlenka-praha.cz/img/logo.jpg">
    <meta property="og:url" content="https://svadlenka-praha.cz${siteUrl(meta.canonical)}}">
    <meta property="og:type" content="website">
    ${getAlternateUrls(meta.canonical)}
    <link rel="alternate" hreflang="x-default" href="https://svadlenka-praha.cz${siteUrl(meta.canonical, 'cz')}" />
    ${
      meta.structuredData
        ? `<script type="application/ld+json">
        ${JSON.stringify(meta.structuredData, null, 2)}
    </script>`
        : ""
    }
</head>
<body>
${header()}
<main class="main">
    ${content}
    ${kontakty()}
    ${reviewHTML()}
    <div class="only-mobile bottom-place-img">
        <img loading="lazy" decoding="async" src="/img/svadlenka-place-3.webp" alt="fotografie krejčovství Švadlenka">
    </div>
    <iframe class="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.1299956582297!2d14.423894077578739!3d50.065127071521246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b95417e9293ed%3A0x1e25b699802f5a22!2zS3JlasSNb3ZzdHbDrSDFoHZhZGxlbmth!5e0!3m2!1sen!2scz!4v1746189430361!5m2!1sen!2scz"
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    <footer>
        <p>© 2025 Krejčovství Švadlenka</p>
        <p>Larysa Mostovenko</p>
        <p>IČO: 22654321</p>
    </footer>
</main>
<div class="sidebar-overlay"></div>
<div class="sidebar">
    <ul>
        <li><a href="${siteUrl("/")}">${t`Úvod`}</a></li>
        <li><a href="${siteUrl("/sluzby")}">${t`Služby a ceník`}</a></li>
        <li><a href="#kontakty">${t`Kontakty`}</a></li>
    </ul>
    <div class="review-sidebar">
        ${reviewHTML()}
    </div>
</div>
<script defer src="/script.js?r=$REVISION"></script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-2670E96B8B"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-2670E96B8B');
    gtag('config', 'AW-17007608978');
    
    window.conversionFn = function() {
        gtag('event', 'conversion', {'send_to': 'AW-17007608978/HM-aCL6T0McaEJKJ7q0_'});
    };
    
    window.addReviewAnalytics = function() {
      gtag('event', 'add_review_click', { send_to: 'G-2670E96B8B' });
    };
</script>
</body>
</html>
    `;
}
