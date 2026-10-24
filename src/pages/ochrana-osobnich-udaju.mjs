import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import { getLanguageCode } from "../build/i18n.mjs";

// The day this text takes effect; set it to the publish date when the text changes.
const EFFECTIVE_DATE = "2026-10-24";

const email = `<a href="mailto:lorikfavorit@gmail.com">lorikfavorit@gmail.com</a>`;
const phone = `<a href="tel:+420775240309">+420 775 240 309</a>`;
const googlePermissions = `<a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener">myaccount.google.com/permissions</a>`;
const googlePolicy = `<a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener">Google API Services User Data Policy</a>`;
const uoou = `<a href="https://uoou.gov.cz" target="_blank" rel="noopener">uoou.gov.cz</a>`;

export default () => {
  const effectiveDate = new Intl.DateTimeFormat(getLanguageCode(), {
    dateStyle: "long",
  }).format(new Date(EFFECTIVE_DATE));
  const pageHTML = `
    <section class="privacy-policy">
        <h1>${t`Zásady ochrany osobních údajů`}</h1>
        <p>${t`Tyto zásady platí od ${effectiveDate}`}</p>

        <h2>${t`Kdo je správce`}</h2>
        <p>${t`Larysa Mostovenko, IČO 22654321, se sídlem Dářská 665/20, 198 00 Praha 9 (provozovna Krejčovství Švadlenka, Jaromírova 726/15, Praha 2). Kontakt: ${email}, ${phone}.`}</p>

        <h2>${t`Jaké údaje zpracováváme a proč`}</h2>
        <p>${t`Při zadání zakázky si zapíšeme vaše jméno, telefonní číslo a údaje o zakázce. Telefon potřebujeme, abychom vás mohli kontaktovat a poslat vám SMS, že je zakázka hotová. Údaje používáme jen k vyřízení zakázky (plnění smlouvy), k vedení účetnictví (zákonná povinnost) a k vyřízení případné reklamace (oprávněný zájem). Neprodáváme je a nepoužíváme k reklamě.`}</p>

        <h2>${t`Kdo k nim má přístup`}</h2>
        <p>${t`Naši zaměstnanci a poskytovatelé IT služeb (server, SMS), kteří s nimi smějí pracovat jen pro nás. Někteří mohou údaje zpracovávat i mimo EU, vždy se zárukami podle GDPR.`}</p>

        <h2>${t`Jak dlouho je uchováváme`}</h2>
        <p>${t`Tři roky od vyřízení zakázky, účetní doklady po dobu stanovenou zákonem.`}</p>

        <h2>${t`Google Business Profile`}</h2>
        <p>${t`Propojení s profilem naší firmy na Googlu používáme jen k úpravě otevírací doby. Údaje od Googlu nepředáváme dalším stranám a nepoužíváme je k ničemu jinému, v souladu se zásadami ${googlePolicy} (Limited Use). Přístup lze odvolat na ${googlePermissions}.`}</p>

        <h2>${t`Tento web`}</h2>
        <p>${t`Na tomto webu nemáme formuláře ani uživatelské účty. Přes službu Google Tag Manager používáme Google Analytics, abychom věděli, kolik lidí web navštěvuje a které stránky čtou, a měření konverzí Google Ads, abychom věděli, zda lidé, kteří k nám přišli z reklamy na Googlu, klikli na náš telefon nebo na mapu. Na stránkách je také vložená mapa Google Maps.`}</p>
        <p>${t`Tyto služby ukládají do vašeho prohlížeče cookies a předávají společnosti Google údaje jako IP adresu, typ zařízení a prohlížeče a navštívené stránky. Poskytovatelem je Google Ireland Limited; údaje mohou být předány i do USA na základě rozhodnutí Evropské komise o odpovídající ochraně (EU-U.S. Data Privacy Framework). Cookies můžete kdykoli smazat nebo zablokovat v nastavení svého prohlížeče.`}</p>

        <h2>${t`Vaše práva`}</h2>
        <p>${t`Můžete požádat o přístup ke svým údajům, jejich opravu, výmaz, omezení zpracování nebo přenos a vznést námitku. Stačí nám napsat nebo zavolat. Stížnost můžete podat u Úřadu pro ochranu osobních údajů (${uoou}).`}</p>
    </section>
`;
  return baseHtml({
    content: pageHTML,
    showOrderTerms: false,
    meta: {
      canonical: "/ochrana-osobnich-udaju",
      title: t`Zásady ochrany osobních údajů | Krejčovství Švadlenka`,
      description: t`Jak Krejčovství Švadlenka zpracovává osobní údaje klientů a jak můžete uplatnit svá práva.`,
      keywords: t`ochrana osobních údajů, GDPR, krejčovství Švadlenka`,
      ogTitle: t`Zásady ochrany osobních údajů | Krejčovství Švadlenka`,
      ogDescription: t`Jak Krejčovství Švadlenka zpracovává osobní údaje klientů a jak můžete uplatnit svá práva.`,
    },
  });
};
