import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";
import { siteUrl } from "../templates/siteUrl.mjs";

const dzinyServices = () => [
  [t`Zkrácení délky`],
  [t`Zúžení džín v pase nebo nohavicích`],
  [t`Zkrácení nohavic s originálním lemem`],
  [t`Oprava roztržených švů, děr nebo kapsy`],
  [t`Výměna zipu`],
  [t`Záplaty na kolenou, úprava sedu`],
];

export default () => {
  const pageHTML = `
    <section>
        <h1>${t`Úprava džín`}</h1>
        <h2>${t`Džíny jsou oblíbenou součástí každodenního oblečení. Ať už se jedná o drobný rozparek, opotřebený šev, potřebu úpravy délky nebo velkosti — postaráme se o vaše kalhoty rychle a kvalitně.`}</h2>
    </section>
    
      <div class="sluzby-big-picture">
          <img src="/img/services/dziny-big.webp" alt="dziny" />
      </div>
    
    <section>
        ${servicesHTML(dzinyServices())}
    </section>
    <section class="alt-text">
        <ul class="services-more">
            <li>${t`🧵 Při práci používáme pevné nitě a kvalitní látky. Zachováváme styl, střih i charakter vašich džínů.`}</li>
            <li>${t`✂️ Spolehlivý servis, precizní zpracování a osobní přístup`}</li>
        </ul>
    </section>
    <section>
      <div class="sluzby-wrapper">
          <a href="${siteUrl("/sluzby")}" class="cta-button">${t`Všechny služby a ceník`}</a>
      </div>
    </section>
`;
  return baseHtml({
    content: pageHTML,
    meta: {
      canonical: "/dziny",
      title: t`Úprava džín Praha. Krejčovství Švadlenka.`,
      description: t`Profesionální úprava džín v Praze – zkrácení, zúžení, oprava zipů a švů. Přijďte bez objednání do Krejčovství Švadlenka na Vyšehradě.`,
      keywords: t`úprava džín Praha, zkrácení džín, oprava džín, zúžení kalhot, výměna zipu, oprava švů, krejčovství Praha 2, švadlena džín, Švadlenka Praha`,
      ogTitle: t`Úprava džín. Krejčovství Švadlenka`,
      ogDescription: t`Profesionální úprava džín v Praze – zkrácení, zúžení, oprava zipů a švů. Přijďte bez objednání do Krejčovství Švadlenka na Vyšehradě.`,
      structuredData: getStructuredData({
        makesOffer: servicesToStructuredOffers([
          {
            title: t`Úprava džín`,
            options: dzinyServices(),
          },
        ]),
      }),
    },
  });
};
