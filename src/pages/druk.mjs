import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";
import { siteUrl } from "../templates/siteUrl.mjs";

const dzinyServices = () => [
  [t`Výměna jednoho druku (kompletní sada)`, t`od 120 Kč`],
  [t`Výměna více druků (např. u bundy)`, t`od 300 Kč`],
  [t`Výměna kovových patentek nebo cvočků`, t`od 150 Kč`],
  [t`Zpevnění místa, kde byl druk / přidání podložky`, t`od 100 Kč`],
  [t`Odstranění starého druku bez poškození látky`, t`v ceně služby`],
];

export default () => {
  const pageHTML = `
    <section>
        <h1>${t`Výměna druku`}</h1>
        <h2>${t`Rychlá výměna kovových patentek na bundách, kalhotách či doplňcích`}</h2>
    </section>
    
      <div class="sluzby-big-picture">
          <img src="/img/services/druk-big.webp" alt="druk" />
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
      canonical: "/druk",
      title: t`Výměna druku a patentek Praha 2 – bundy, kalhoty, tašky. Krejčovství Švadlenka.`,
      description: t`Rychlá výměna druku, cvočků a patentek v Praze 2. Na bundách, kalhotách, kabelkách. Krejčovství Švadlenka – Vyšehrad.`,
      keywords: t`výměna druku, výměna patentek, oprava cvočků, druk bunda, patentka kalhoty, krejčovství Praha 2, Švadlenka Vyšehrad`,
      ogTitle: t`Výměna druku a patentek Praha 2 – bundy, kalhoty, tašky. Krejčovství Švadlenka.`,
      ogDescription: t`Rychlá výměna druku, cvočků a patentek v Praze 2. Na bundách, kalhotách, kabelkách. Krejčovství Švadlenka – Vyšehrad.`,
      structuredData: getStructuredData({
        makesOffer: servicesToStructuredOffers([
          {
            title: t`Výměna druku`,
            options: dzinyServices(),
          },
        ]),
      }),
    },
  });
};
