import { t } from "ttag";
import { header } from "./header.mjs";
import { kontakty } from "./kontakty.mjs";
import { orderTermsSection } from "./orderTerms.mjs";
import { getStructuredData } from "./structuredData.mjs";
import { reviewHTML } from "./review.mjs";
import { siteUrl } from "./siteUrl.mjs";
import {
  consentDefaultsScript,
  cookieBar,
  cookieSettingsLink,
  mapEmbed,
} from "./consent.mjs";
import { getLanguageCode, lang2Code } from "../build/i18n.mjs";
import { SITE } from "../config.mjs";

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
  const langs = Object.keys(lang2Code);
  return langs
    .map(
      (lang) =>
        `<link rel="alternate" hreflang="${lang}" href="${SITE}${siteUrl(url, lang)}" />`,
    )
    .join("\n");
}

export function baseHtml({
  content = "",
  meta = defaultMeta,
  showOrderTerms = true,
}) {
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
    <link rel="canonical" href="${SITE}${siteUrl(meta.canonical)}">
    <meta property="og:title" content="${meta.ogTitle}">
    <meta property="og:description" content="${meta.ogDescription}">
    <meta property="og:image" content="${SITE}/img/logo.jpg">
    <meta property="og:url" content="${SITE}${siteUrl(meta.canonical)}">
    <meta property="og:type" content="website">
    <meta name="google-site-verification" content="jAqkn5ExTdL4UHW_UvAk-nwNhGqMQzg24iUvjRG4AA4" />
    ${getAlternateUrls(meta.canonical)}
    <link rel="alternate" hreflang="x-default" href="${SITE}${siteUrl(meta.canonical, "cz")}" />
    ${
      meta.structuredData
        ? `<script type="application/ld+json">
        ${JSON.stringify(meta.structuredData, null, 2)}
    </script>`
        : ""
    }
    ${consentDefaultsScript()}
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TB65CL2K');</script>
    <!-- End Google Tag Manager -->
</head>
<body>
${header(meta.canonical)}
<main class="main">
    ${content}
    ${showOrderTerms ? orderTermsSection() : ""}
    ${kontakty()}
    ${reviewHTML()}
    <div class="only-mobile bottom-place-img">
        <img loading="lazy" decoding="async" src="/img/svadlenka-place-3.webp" alt="fotografie krejčovství Švadlenka">
    </div>
    ${mapEmbed()}
    <footer>
        <p>© 2025 Krejčovství Švadlenka</p>
        <p>Larysa Mostovenko</p>
        <p>IČO: 22654321</p>
        <p><a class="footer-link" href="${siteUrl("/ochrana-osobnich-udaju")}">${t`Ochrana osobních údajů`}</a></p>
        <p>${cookieSettingsLink()}</p>
    </footer>
</main>
${cookieBar()}
<script defer src="/script.js?r=$REVISION"></script>
</body>
</html>
    `;
}
