import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";
import { siteUrl } from "../templates/siteUrl.mjs";

const batohyServices = () => [
  [t`Zkrácení závěsů nebo záclon na míru`, t`od 350 Kč`],
  [t`Začištění okrajů a lemování`, t`od 300 Kč`],
  [t`Přešití tunýlku, přidání řasící pásky`, t`od 350 Kč`],
  [t`Úprava délky nebo šířky závěsů`, t`od 400 Kč`],
];

export default () => {
  const pageHTML = `
    <section>
        <h1>${t`Závěsy a záclony`}</h1>
        <h2>${t`Úpravy záclon a závěsů na míru — zkracování, začištění okrajů a úprava tunýlků pro zavěšení`}</h2>
    </section>
    
      <div class="sluzby-big-picture">
          <img src="/img/services/zavesy-big.webp" alt="zavesy" />
      </div>
    
    <section>
        ${servicesHTML(batohyServices())}
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
      canonical: "/zavesy",
      title: t`Úprava závěsů a záclon Praha – zkracování | Krejčovství Švadlenka.`,
      description: t`Zkrácení, začištění a úpravy závěsů a záclon v Praze. Rychle, pečlivě a bez objednání. Krejčovství Švadlenka.`,
      keywords: t`zkrácení závěsů, úprava záclon, šití závěsů, záclony na míru, krejčovství Praha 2, Švadlenka Vyšehrad`,
      ogTitle: t`Úprava závěsů a záclon Praha – zkracování | Krejčovství Švadlenka.`,
      ogDescription: t`Zkrácení, začištění a úpravy závěsů a záclon v Praze. Rychle, pečlivě a bez objednání. Krejčovství Švadlenka.`,
      structuredData: getStructuredData({
        makesOffer: servicesToStructuredOffers([
          {
            title: t`Závěsy a záclony`,
            options: batohyServices(),
          },
        ]),
      }),
    },
  });
};
