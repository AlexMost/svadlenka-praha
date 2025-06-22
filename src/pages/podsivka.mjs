import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";

const savesyServices = [
  [t`Celková výměna podšívky u kabátu nebo bundy`, t`od 900 Kč`],
  [t`Částečná výměna podšívky (např. rukávy, záda)`, t`od 600 Kč`],
  [t`Výměna podšívky u kabelky nebo batohu`, t`od 450 Kč`],
  [t`Oprava natržené podšívky (zašití, doplnění)`, t`od 300 Kč`],
  [t`Začištění okrajů nebo zpevnění vnitřní části`, t`od 400 Kč`],
];

export default () => {
  const pageHTML = `
    <section>
        <h1>${t`Výměna podšívky`}</h1>
        <h2>${t`Vyměňujeme opotřebované nebo poškozené podšívky v kabátech a bundách`}</h2>
    </section>
    
      <div class="sluzby-big-picture">
          <img src="/img/services/podsivky-big.webp" alt="podsivky" />
      </div>
    
    <section>
        ${servicesHTML(savesyServices)}
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
      canonical: "/podsivka",
      title: t`Výměna podšívky Praha – kabáty, bundy, kabelky | Krejčovství Švadlenka`,
      description: t`Výměna a oprava podšívky u kabátů, bund a kabelek v Praze. Rychlá a pečlivá práce bez objednání. Krejčovství Švadlenka – Vyšehrad.`,
      keywords: t`výměna podšívky, oprava podšívky, podšívka kabát, podšívka kabelka, švadlena Praha, švadlena Praha 2, krejčovství Vyšehrad`,
      ogTitle: t`Výměna podšívky Praha – kabáty, bundy, kabelky | Krejčovství Švadlenka`,
      ogDescription: t`Výměna a oprava podšívky u kabátů, bund a kabelek v Praze. Rychlá a pečlivá práce bez objednání. Krejčovství Švadlenka – Vyšehrad.`,
      structuredData: getStructuredData({
        makesOffer: servicesToStructuredOffers([
          {
            title: "Výměna podšívky",
            options: savesyServices,
          },
        ]),
      }),
    },
  });
};
