import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";

const latkoveServices = [
  [t`Zkrácení sukně nebo šatů`, t`od 400 Kč`],
  [t`Zúžení šatů nebo halenky v pase / bocích`, t`od 450 Kč`],
  [t`Zkrácení rukávů u halenky nebo šatů`, t`od 350 Kč`],
  [t`Úprava délky ramínek / průramků`, t`od 300 Kč`],
  [t`Oprava děr, výměna zipu, začištění okrajů`, t`od 400 Kč`],
];

export default () => {
  const pageHTML = `
    <section>
        <h1>${t`Látkové oděvy`}</h1>
        <h2>${t`Nabízíme úpravy velikostí, vyštíhlení oblečení nebo přišití zipu`}</h2>
    </section>
    
      <div class="sluzby-big-picture">
          <img src="/img/services/latkove-big.webp" alt="dziny" />
      </div>
    
    <section>
        ${servicesHTML(latkoveServices)}
    </section>
    <section>
      <div class="sluzby-wrapper">
          <a href="/sluzby" class="cta-button">${t`Všechny služby a ceník`}</a>
      </div>
    </section>
`;
  return baseHtml({
    content: pageHTML,
    meta: {
      canonical: "/latkove",
      title: t`Úprava látkových oděvů Praha – šaty, halenky, sukně | Praha 2 | Krejčovství Švadlenka`,
      description: t`Zkrácení, zúžení a opravy látkových oděvů v Praze – šaty, halenky, sukně. Krejčovství Švadlenka, Vyšehrad.`,
      keywords: t`úprava šatů Praha, oprava halenky, zkrácení sukně, šaty úprava, látkové oděvy, krejčovství Praha, krejčovství Praha 2, Švadlenka`,
      ogTitle: t`Úprava látkových oděvů Praha – šaty, halenky, sukně | Praha 2 | Krejčovství Švadlenka`,
      ogDescription: t`Zkrácení, zúžení a opravy látkových oděvů v Praze – šaty, halenky, sukně. Krejčovství Švadlenka, Vyšehrad.`,
      structuredData: getStructuredData({
        makesOffer: servicesToStructuredOffers([
          {
            title: "Látkové oděvy",
            options: latkoveServices,
          },
        ]),
      }),
    },
  });
};
