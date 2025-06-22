import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";

const batohyServices = [
  [t`Výměna zipu u batohu / kabelky`, t`od 400 Kč`],
  [t`Oprava podšívky (částečná nebo celková)`, t`od 450 Kč`],
  [t`Zpevnění nebo výměna uch`, t`od 400 Kč`],
  [t`Zpevnění dna, začištění trhlin`, t`od 300 Kč`],
  [t`Oprava zapínání nebo suchých zipů`, t`od 400 Kč`],
];

export default () => {
  const pageHTML = `
    <section>
        <h1>${t`Oprava batohů a kabelek`}</h1>
        <h2>${t`Zpevnění popruhů, výměna zipů nebo oprava trhlin v materiálu`}</h2>
    </section>
    
      <div class="sluzby-big-picture">
          <img src="/img/services/batoh-big.webp" alt="batohy" />
      </div>
    
    <section>
        ${servicesHTML(batohyServices)}
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
      canonical: "/batohy",
      title: t`Oprava batohů a kabelek Praha – zipy, podšívky, ucha | Krejčovství Švadlenka.`,
      description: t`Profesionální opravy batohů a kabelek v Praze. Výměna zipů, ucha, podšívky a víc. Krejčovství Švadlenka – Vyšehrad.`,
      keywords: t`oprava batohů, oprava kabelek, výměna zipu, podšívka kabelka, šití batohu, Švadlenka Praha, krejčovství kabelky Praha 2`,
      ogTitle: t`Oprava batohů a kabelek Praha – zipy, podšívky, ucha | Krejčovství Švadlenka.`,
      ogDescription: t`Profesionální opravy batohů a kabelek v Praze. Výměna zipů, ucha, podšívky a víc. Krejčovství Švadlenka – Vyšehrad.`,
      structuredData: getStructuredData({
        makesOffer: servicesToStructuredOffers([
          {
            title: "Oprava batohů a kabelek",
            options: batohyServices,
          },
        ]),
      }),
    },
  });
};
