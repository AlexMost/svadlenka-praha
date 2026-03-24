import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";
import { siteUrl } from "../templates/siteUrl.mjs";
import { importantNotice } from "../templates/importantNotice.mjs";
import { promiseQuote } from "../templates/promiseQuote.mjs";

const zavesyServices = () => [
  [t`Zkracování závěsů se zachováním továrního vzhledu`],
  [t` Přesné značení a rovná spodní linie`],
];

const zavesyServicesAdditional = () => [
  [t`Výměna nebo našití řasící pásky`],
  [t`Rozšíření závěsů (pokud je k dispozici látka)`],
  [t`Oprava roztržení a poškození`],
  [t`Úprava šířky`],
];

export default () => {
  const pageHTML = `
    <section>
        <h1>${t`Závěsy a záclony`}</h1>
        <h2>${t`Profesionálně provádíme úpravu záclon a závěsů na výšku a další práce spojené s přešitím a dokončením — pečlivě, ровně a v rozumných termínech`}</h2>
    </section>
    
      <div class="sluzby-big-picture">
          <img src="/img/services/zavesy-big.webp" alt="zavesy" />
      </div>
    
    <section>
        <h2>${t`Hlavní práce`}</h2>
        ${servicesHTML(zavesyServices())}
    </section>
    <section>
        <h2>${t`Další práce`}</h2>
        ${servicesHTML(zavesyServicesAdditional())}
    </section>
    <section>
        ${promiseQuote(t`Vaše závěsy budou vypadat, jako by byly od začátku ušity přesně pro váš interiér.`)}
    </section>
    <section>
        ${importantNotice(t`Důležité`, [
            t`Neprovádíme výjezdy k zákazníkovi za účelem zaměření`,
            t`Nezabýváme se výběrem garnýží ani výpočty souvisejícími s výškou stropů a montážními specifiky.`,
            t`Pro realizaci zakázky potřebujeme znát přesnou výslednou výšku závěsu, kterou chcete získat.`,
            t`Pro správné určení výšky je nutné, abyste si sami změřili vzdálenost od garnýže k požadované délce závěsu.`,
            t`Zakázky ve formátu „zkrátit o 10 cm” bez přesného uvedení výsledné výšky nepřijímáme, protože ve většině případů mají i drahé závěsy nerovnoměrnou délku`,
        ])}
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
            options: zavesyServices().concat(zavesyServicesAdditional()),
          },
        ]),
      }),
    },
  });
};
