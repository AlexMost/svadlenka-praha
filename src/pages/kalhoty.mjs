import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";
import { siteUrl } from "../templates/siteUrl.mjs";

const kalhotyServices = () => [
  [t`Přišití knoflíku nebo háčku na zapínání`, t`od 50 Kč`],
  [t`Zkrácení s možností zachování původního spodního lemu`, t`od 400 Kč`],
  [t`Výměna kapesní látky (vnitřní kapsy)`, t`od 300 Kč`],
  [t`Úprava velikosti, včetně zúžení nebo rozšíření pasu`, t`od 300 Kč`],
];

export default () => {
  const pageHTML = `
    <section>
        <h1>${t`Oprava klasických kalhot`}</h1>
        <h2>${t`Klasické kalhoty jsou základem business stylu a často i oblíbeným kouskem šatníku.
Profesionálně je upravíme na míru tak, aby vám perfektně seděly.`}</h2>
    </section>
    
      <div class="sluzby-big-picture">
          <img src="/img/services/kalhoty-big.webp" alt="kalhoty" />
      </div>
    <section>
        ${servicesHTML(kalhotyServices())}
    </section>
    <section class="alt-text">${t`🧵Při práci používáme kvalitní materiály, zachováváme barevnost a styl vašich kalhot`}</section>
    <section>
      <div class="sluzby-wrapper">
          <a href="${siteUrl("/sluzby")}" class="cta-button">${t`Všechny služby a ceník`}</a>
      </div>
    </section>
`;
  return baseHtml({
    content: pageHTML,
    meta: {
      canonical: "/kalhoty",
      title: t`Oprava klasických kalhot – zkracování, výměna kapes a úprava pasu | Švadlenka Praha`,
      description: t`Profesionální oprava klasických kalhot v centru Prahy – zkrácení nohavic, výměna kapesní látky, přišití knoflíku a úprava pasu. Navštivte Krejčovství Švadlenka.`,
      keywords: t`oprava kalhot Praha, zkrácení kalhot, výměna kapes, úprava pasu kalhot, krejčovství Praha 2, klasické kalhoty, přišití knoflíku, švadlena Nusle`,
      ogTitle: t`Oprava klasických kalhot – zkracování, výměna kapes a úprava pasu | Švadlenka Praha`,
      ogDescription: t`Profesionální oprava klasických kalhot v centru Prahy – zkrácení nohavic, výměna kapesní látky, přišití knoflíku a úprava pasu. Navštivte Krejčovství Švadlenka.`,
      structuredData: getStructuredData({
        makesOffer: servicesToStructuredOffers([
          {
            title: t`Oprava klasických kalhot`,
            options: kalhotyServices(),
          },
        ]),
      }),
    },
  });
};
