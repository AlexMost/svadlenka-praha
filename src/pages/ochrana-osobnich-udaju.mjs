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
        <p>${t`Správcem osobních údajů je Larysa Mostovenko, IČO 22654321, se sídlem Dářská 665/20, 198 00 Praha 9. Pod názvem Krejčovství Švadlenka provozuje provozovnu na adrese Jaromírova 726/15, 128 00 Praha 2.`}</p>
        <p>${t`Kontakt: e-mail ${email}, telefon ${phone}, nebo osobně v provozovně.`}</p>

        <h2>${t`Údaje klientů`}</h2>
        <p>${t`Když u nás zadáte zakázku, zapíšeme si vaše jméno, telefonní číslo a údaje o zakázce: oděv, požadované práce, cenu, zálohu, termín a případné poznámky.`}</p>
        <p>${t`Údaje používáme jen k vyřízení zakázky: abychom věděli, co máme udělat, a mohli vás kontaktovat. Právním základem je plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR), u účetních a daňových dokladů plnění našich zákonných povinností (písm. c) a po vyřízení zakázky náš oprávněný zájem na vyřízení případné reklamace nebo sporu (písm. f).`}</p>
        <p>${t`Jméno a telefonní číslo potřebujeme k přijetí zakázky. Bez nich zakázku nemůžeme přijmout ani vám dát vědět, že je hotová.`}</p>
        <p>${t`Když je zakázka hotová, pošleme vám SMS.`}</p>
        <p>${t`Vaše údaje neprodáváme a nepoužíváme k reklamě.`}</p>

        <h2>${t`Kdo s údaji pracuje`}</h2>
        <ul>
            <li>${t`Naši zaměstnanci, kteří zakázky přijímají a zpracovávají.`}</li>
            <li>${t`Poskytovatelé IT služeb (provoz serveru, odesílání SMS, softwarové nástroje), jen v rozsahu nezbytném pro jejich službu a na základě smlouvy.`}</li>
        </ul>
        <p>${t`Někteří poskytovatelé mohou údaje zpracovávat i mimo Evropský hospodářský prostor, vždy jen se zárukami podle GDPR (například se standardními smluvními doložkami EU nebo na základě rozhodnutí Evropské komise o odpovídající ochraně).`}</p>

        <h2>${t`Jak dlouho údaje uchováváme`}</h2>
        <p>${t`Údaje o zakázce uchováváme 3 roky od jejího vyřízení, kvůli případným reklamacím. Účetní doklady uchováváme po dobu, kterou stanoví zákon.`}</p>

        <h2>${t`Údaje od Google (Google Business Profile)`}</h2>
        <p>${t`Propojení s profilem naší firmy na Googlu (Google Business Profile) používáme jen k úpravě naší otevírací doby; údaje získané od Googlu nepředáváme třetím stranám a nepoužíváme je k ničemu jinému, ani k reklamě.`}</p>
        <p>${t`Používání údajů získaných z Google API se řídí zásadami ${googlePolicy}, včetně požadavků Limited Use.`}</p>
        <p>${t`Přístup lze kdykoli odvolat v nastavení účtu Google na adrese ${googlePermissions}.`}</p>

        <h2>${t`Tento web`}</h2>
        <p>${t`Na tomto webu nemáme formuláře ani uživatelské účty. Přes službu Google Tag Manager používáme Google Analytics, abychom věděli, kolik lidí web navštěvuje a které stránky čtou, a měření konverzí Google Ads, abychom věděli, zda lidé, kteří k nám přišli z reklamy na Googlu, klikli na náš telefon nebo na mapu. Na stránkách je také vložená mapa Google Maps.`}</p>
        <p>${t`Tyto služby ukládají do vašeho prohlížeče cookies a předávají společnosti Google údaje jako IP adresu, typ zařízení a prohlížeče a navštívené stránky. Poskytovatelem je Google Ireland Limited; údaje mohou být předány i do USA na základě rozhodnutí Evropské komise o odpovídající ochraně (EU-U.S. Data Privacy Framework). Cookies můžete kdykoli smazat nebo zablokovat v nastavení svého prohlížeče.`}</p>

        <h2>${t`Vaše práva`}</h2>
        <p>${t`Máte právo požádat o přístup ke svým údajům, o jejich opravu nebo výmaz, o omezení zpracování a o přenesení údajů, a máte právo vznést námitku.`}</p>
        <p>${t`Stačí nám napsat na ${email}, zavolat na ${phone} nebo přijít osobně. Odpovíme do jednoho měsíce.`}</p>
        <p>${t`Pokud nejste spokojeni, můžete podat stížnost u Úřadu pro ochranu osobních údajů (${uoou}).`}</p>
    </section>
`;
  return baseHtml({
    content: pageHTML,
    showOrderTerms: false,
    meta: {
      canonical: "/ochrana-osobnich-udaju",
      title: t`Zásady ochrany osobních údajů | Krejčovství Švadlenka`,
      description: t`Jak Krejčovství Švadlenka zpracovává osobní údaje klientů a údaje od Google, a jak můžete uplatnit svá práva.`,
      keywords: t`ochrana osobních údajů, GDPR, krejčovství Švadlenka`,
      ogTitle: t`Zásady ochrany osobních údajů | Krejčovství Švadlenka`,
      ogDescription: t`Jak Krejčovství Švadlenka zpracovává osobní údaje klientů a údaje od Google, a jak můžete uplatnit svá práva.`,
    },
  });
};
