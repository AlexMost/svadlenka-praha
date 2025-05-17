import fs from "fs";
import path from "path";
import { baseHtml } from "../templates/baseHTML.mjs";
import { getStructuredData, makeOffer } from "../templates/structuredData.mjs";

const serviceHTML = (service) => {
  return `
  <section>
    <h2>${service.title}</h2>
    <ul class="sluzby-list">
        ${service.options
          .map(
            (option) =>
              `<li>
                <div class="title">${option[0]}</div>
                <div class="price">${option[1]}</div>
            </li>`,
          )
          .join("\n")}
    </ul>
</section>
  `;
};

function servicesToStructuredOffers(services) {
  const result = [];
  services.forEach((service) => {
    service.options.forEach((option) => {
      result.push(
        makeOffer({
          title: option[0],
          category: service.title,
          description: `${option[0]} ${option[1]}`,
        }),
      );
    });
  });
  return result;
}

export default () => {
  const services = JSON.parse(
    fs.readFileSync(path.resolve("src/auto/services.json"), "utf-8"),
  );
  const pageHTML = `
<section>
    <h1>Služby a ceník</h1>
</section>
${services.map((service) => serviceHTML(service)).join("\n")}
`;
  return baseHtml({
    content: pageHTML,
    meta: {
      canonical: "/sluzby",
      title: "Služby a ceník. Krejčovství Švadlenka",
      description:
        "Kompletní nabídka služeb krejčovství Švadlenka – úpravy kabátů, kalhot, šatů, košil i koženého oblečení. Prohlédněte si aktuální ceník.",
      keywords:
        "krejčovství, ceník úprav oděvů, oprava oblečení Praha, výměna zipu, zkrácení kalhot, švadlena Nusle, Švadlenka služby",
      ogTitle: "Služby a ceník – Švadlenka Praha 2, Nusle",
      ogDescription:
        "Zobrazte si kompletní nabídku služeb a ceny úprav oděvů v krejčovství Švadlenka.",
      structuredData: getStructuredData({
        makesOffer: servicesToStructuredOffers(services),
      }),
    },
  });
};
