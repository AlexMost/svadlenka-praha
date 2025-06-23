import { t } from "ttag";
import { getServices } from "../auto/services.mjs";
import { baseHtml } from "../templates/baseHTML.mjs";
import { getStructuredData } from "../templates/structuredData.mjs";
import {
  servicesHTML,
  servicesToStructuredOffers,
} from "../templates/services.mjs";
import { siteUrl } from "../templates/siteUrl.mjs";

const serviceHTML = (service) => {
  return `
  <section>
    <h2>${service.title}</h2>
    ${servicesHTML(service.options)}
</section>
  `;
};

export default () => {
  const pageHTML = `
<section>
    <h1>${t`Služby a ceník`}</h1>
</section>
${getServices()
  .map((service) => serviceHTML(service))
  .join("\n")}
`;
  return baseHtml({
    content: pageHTML,
    meta: {
      canonical: siteUrl("/sluzby"),
      title: t`Služby a ceník. Krejčovství Švadlenka`,
      description: t`Kompletní nabídka služeb krejčovství Švadlenka – úpravy kabátů, kalhot, šatů, košil i koženého oblečení. Prohlédněte si aktuální ceník.`,
      keywords: t`krejčovství, ceník úprav oděvů, oprava oblečení Praha, výměna zipu, zkrácení kalhot, švadlena Nusle, Švadlenka služby`,
      ogTitle: t`Služby a ceník – Švadlenka Praha 2, Nusle`,
      ogDescription: t`Zobrazte si kompletní nabídku služeb a ceny úprav oděvů v krejčovství Švadlenka.`,
      structuredData: getStructuredData({
        makesOffer: servicesToStructuredOffers(getServices()),
      }),
    },
  });
};
