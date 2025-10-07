import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";
import { siteUrl } from "../templates/siteUrl.mjs";

const satyServices = () => [
  [t`Originalita – jen váš vlastní design`, ""],
  [t`Dokonalé padnutí – přesně na vaši postavu`, ""],
  [t`Výběr látek a detailů – podle vašeho vkusu`, ""],
  [t`Záruka kvality a profesionální přístup`, ""],
];

export default () => {
  const pageHTML = `
    <section>
        <h1>${t`Šití sukní a šatů na zakázku`}</h1>
        <h2>${t`Nabízíme tvorbu originálních modelů – od klasiky až po moderní střihy.
Každý kousek bude ušitý přímo pro vás – bez kompromisů mezi pohodlím a stylem.`}</h2>
    </section>
    
      <div class="sluzby-big-picture">
          <img src="/img/services/sity-na-miru-big.webp" alt="saty" />
      </div>
    <section>
        ${servicesHTML(satyServices())}
    </section>
    <section class="alt-text">
      <ul class="services-more">
        <li>${t`🧵 Základní ceny najdete v záložce Ceník. Uvedené ceny platí pouze za práci, bez materiálu..`}</li>
        <li>${t`📏 Každý model upravujeme individuálně — s důrazem na střih, styl a pohodlí při nošení.`}</li>
        <li>${t`✂️ Precizní práce, osobní přístup a výsledky, které oceníte.`}</li>
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
      canonical: "/sity-na-miru",
      title: t`Šití sukní a šatů na zakázku | Originální modely na míru – Švadlenka Praha`,
      description: t`Nechte si ušít šaty nebo sukni přesně podle svých představ. Nabízíme originální střihy, dokonalé padnutí a výběr kvalitních látek. Každý kousek je ručně šitý na míru – bez kompromisů mezi pohodlím a stylem.`,
      keywords: t`šití šatů na zakázku, šití sukní na míru, originální šaty Praha, šaty na míru Praha, sukně na zakázku, švadlena Praha, úprava šatů, krejčovství, ruční šití, módní návrh šatů, elegantní šaty, večerní šaty Praha`,
      ogTitle: t`Šití sukní a šatů na zakázku | Originální modely na míru – Švadlenka Praha`,
      ogDescription: t`Nechte si ušít šaty nebo sukni přesně podle svých představ. Nabízíme originální střihy, dokonalé padnutí a výběr kvalitních látek. Každý kousek je ručně šitý na míru – bez kompromisů mezi pohodlím a stylem.`,
      structuredData: getStructuredData({
        makesOffer: servicesToStructuredOffers([
          {
            title: t`Šití sukní a šatů na zakázku`,
            options: satyServices(),
          },
        ]),
      }),
    },
  });
};
