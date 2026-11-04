import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";
import { siteUrl } from "../templates/siteUrl.mjs";

const satyServices = () => [
  [t`Zúžení nebo rozšíření šatů v pase, bocích či prsou`],
  [t`Zkrácení délky (celé délky nebo ramínek)`],
  [t`Úpravu rukávů nebo jejich zkrácení`],
  [t`Drobné opravy (např. zipy, knoflíky, rozparky)`],
];

export default () => {
  const pageHTML = `
    <section>
        <h1>${t`Úprava šatů na míru`}</h1>
        <h2>${t`Každé šaty mohou sedět perfektně — stačí je upravit přesně na vaši postavu.
Ať už se jedná o nové šaty, které potřebují zkrátit nebo zúžit, nebo o oblíbený model, který
chcete oživit – jsme tu pro vás.`}</h2>
    </section>
    
      <div class="sluzby-big-picture">
          <img src="/img/services/saty-big.webp" alt="saty" />
      </div>
    <section>
        ${servicesHTML(satyServices())}
    </section>
    <section>
      <div class="sluzby-wrapper">
          <a href="${siteUrl("/sluzby")}" class="cta-button">${t`Všechny služby a ceník`}</a>
      </div>
    </section>
    <section class="alt-text">
      <ul class="services-more">
        <li>${t`🧵 Každý model upravujeme individuálně — s důrazem na střih, styl a pohodlí při nošení.`}</li>
        <li>${t`📏 Samotné měření zabere jen minimum času díky moderním metodám, které používáme.`}</li>
        <li>${t`✂️ Precizní práce, osobní přístup a výsledky, které oceníte.`}</li>
      </ul>
    </section>
`;
  return baseHtml({
    content: pageHTML,
    meta: {
      canonical: "/saty",
      title: t`Úprava šatů na míru – zkrácení, zúžení, opravy zipů a rukávů | Švadlenka Praha`,
      description: t`Profesionální úpravy šatů v Praze – zúžení v pase, zkrácení délky nebo ramínek, opravy zipů a knoflíků. Švadlenka na Praze 2 vám šaty upraví na míru.`,
      keywords: t`úprava šatů, oprava šatů, zkrácení šatů, zúžení šatů, švadlena Praha, úprava ramínek, oprava zipů, úprava rukávů, šaty na míru, krejčovství Praha 2`,
      ogTitle: t`Úprava šatů na míru – zkrácení, zúžení, opravy zipů a rukávů | Švadlenka Praha`,
      ogDescription: t`Profesionální úpravy šatů v Praze – zúžení v pase, zkrácení délky nebo ramínek, opravy zipů a knoflíků. Švadlenka na Praze 2 vám šaty upraví na míru.`,
      structuredData: getStructuredData({
        makesOffer: servicesToStructuredOffers([
          {
            title: t`Úprava šatů na míru`,
            options: satyServices(),
          },
        ]),
      }),
    },
  });
};
