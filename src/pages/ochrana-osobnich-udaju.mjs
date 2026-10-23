import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";

const email = `<a href="mailto:lorikfavorit@gmail.com">lorikfavorit@gmail.com</a>`;
const phone = `<a href="tel:+420775240309">+420 775 240 309</a>`;
const crm = `<a href="https://admin.svadlenka-praha.cz">admin.svadlenka-praha.cz</a>`;
const googlePermissions = `<a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener">myaccount.google.com/permissions</a>`;
const googlePolicy = `<a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener">Google API Services User Data Policy</a>`;
const uoou = `<a href="https://uoou.gov.cz" target="_blank" rel="noopener">uoou.gov.cz</a>`;

export default () => {
  const pageHTML = `
    <section class="privacy-policy">
        <h1>${t`Zásady ochrany osobních údajů`}</h1>
        <p>${t`Platné od 23. 10. 2026.`}</p>

        <h2>${t`Kdo je správce`}</h2>
        <p>${t`Správcem osobních údajů je Larysa Mostovenko, IČO 22654321, provozující Krejčovství Švadlenka, Jaromírova 726/15, 128 00 Praha 2.`}</p>
        <p>${t`Kontakt: e-mail ${email}, telefon ${phone}, nebo osobně v provozovně.`}</p>

        <h2>${t`Údaje klientů`}</h2>
        <p>${t`Když u nás zadáte zakázku, zapíšeme do našeho interního systému (CRM) vaše jméno, telefonní číslo a údaje o zakázce: oděv, požadované práce, cenu, zálohu, termín a případné poznámky.`}</p>
        <p>${t`Údaje používáme jen k vyřízení zakázky: abychom věděli, co máme udělat, a mohli vás kontaktovat. Právním základem je plnění smlouvy a u dokladů naše zákonné povinnosti.`}</p>
        <p>${t`Když je zakázka hotová, pošleme vám SMS. SMS odesíláme přes službu BulkGate, které předáváme jen vaše telefonní číslo a text zprávy.`}</p>
        <p>${t`Vaše údaje neprodáváme a nepoužíváme k reklamě.`}</p>

        <h2>${t`Kdo s údaji pracuje`}</h2>
        <ul>
            <li>${t`Naši zaměstnanci, kteří zakázky přijímají a zpracovávají.`}</li>
            <li>${t`DigitalOcean – server, na kterém běží náš systém.`}</li>
            <li>${t`BulkGate – odesílání SMS.`}</li>
            <li>${t`OpenAI a Telegram – interní asistent, který našim zaměstnancům odpovídá na dotazy k zakázkám. OpenAI údaje nepoužívá k trénování modelů.`}</li>
        </ul>
        <p>${t`Někteří z těchto dodavatelů mohou údaje zpracovávat i mimo Evropskou unii.`}</p>

        <h2>${t`Jak dlouho údaje uchováváme`}</h2>
        <p>${t`Údaje o zakázce uchováváme 3 roky od jejího vyřízení, kvůli případným reklamacím. Účetní doklady uchováváme po dobu, kterou stanoví zákon. Zálohy systému se mažou po 14 dnech.`}</p>

        <h2>${t`Přihlášení zaměstnanců přes Google`}</h2>
        <p>${t`Naši zaměstnanci se do interního systému ${crm} přihlašují účtem Google. Od Google přitom dostáváme jen e-mail, jméno a profilovou fotografii, a používáme je jen k přihlášení a k zobrazení, kdo co v systému udělal.`}</p>

        <h2>${t`Údaje od Google (Google Business Profile)`}</h2>
        <p>${t`Náš interní systém ${crm} se může připojit k profilu firmy Krejčovství Švadlenka na Google s oprávněním business.manage. Toto oprávnění používáme jen k jednomu účelu: k úpravě otevírací doby našeho vlastního profilu firmy na Google (včetně svátků a mimořádných změn).`}</p>
        <ul>
            <li>${t`Přístupové tokeny od Google ukládáme jen na serveru našeho systému.`}</li>
            <li>${t`Tokeny ani žádné údaje získané od Google nepředáváme třetím stranám a nepoužíváme je k ničemu jinému, ani k reklamě.`}</li>
            <li>${t`Používání údajů získaných z Google API se řídí zásadami ${googlePolicy}, včetně požadavků Limited Use.`}</li>
        </ul>
        <p>${t`Přístup lze kdykoli odvolat v nastavení účtu Google na adrese ${googlePermissions}, nebo nám napište a připojení zrušíme. Po odvolání přístupu uložené tokeny smažeme.`}</p>

        <h2>${t`Tento web`}</h2>
        <p>${t`Na tomto webu nemáme žádné formuláře a osobní údaje přes něj nesbíráme. Používáme Google Tag Manager k měření návštěvnosti a kliknutí na telefon nebo mapu a vkládáme mapu Google Maps. Tyto služby Google mohou ve vašem prohlížeči ukládat cookies.`}</p>

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
