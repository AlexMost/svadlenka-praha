import { makeOffer } from "./structuredData.mjs";

function capitalizeFirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function servicesToStructuredOffers(services) {
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

export function servicesHTML(services) {
  return `
      <ul class="sluzby-list">
        ${services
          .map(
            (option) =>
              `<li>
                <div class="title">${capitalizeFirst(option[0])}</div>
                <div class="price">${option[1]}</div>
            </li>`,
          )
          .join("\n")}
    </ul>
  `;
}
