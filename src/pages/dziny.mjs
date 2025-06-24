import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";
import { siteUrl } from "../templates/siteUrl.mjs";

const dzinyServices = () => [
  [t`Zkrácení délky`, t`od 350 Kč`],
  [t`Zúžení džín v pase nebo nohavicích`, t`od 400 Kč`],
  [t`Zkrácení nohavic s originálním lemem`, t`od 500 Kč`],
  [t`Oprava roztržených švů, děr nebo kapsy`, t`od 300 Kč`],
  [t`Výměna zipu`, t`od 400 Kč`],
  [t`Záplaty na kolenou, úprava sedu`, t`od 350 Kč`],
];

export default () => {
  const pageHTML = `
    <section>
        <h1>${t`Úprava džín`}</h1>
        <h2>${t`Zkracujeme, zužujeme nebo opravujeme prošoupané a potrhané džíny`}</h2>
    </section>
    
      <div class="sluzby-big-picture">
          <img src="/img/services/dziny-big.webp" alt="dziny" />
      </div>
    
    <section>
        ${servicesHTML(dzinyServices())}
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
      canonical: siteUrl("/dziny"),
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
