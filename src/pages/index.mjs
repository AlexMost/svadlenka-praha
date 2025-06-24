import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";
import { getStructuredData, makeOffer } from "../templates/structuredData.mjs";
import { siteUrl } from "../templates/siteUrl.mjs";

const getServices = () => [
  {
    title: t`Úprava džín`,
    description: t`Zkracujeme, zužujeme nebo opravujeme prošoupané a potrhané džíny`,
    image: "/img/services/dziny.webp",
    url: siteUrl("/dziny"),
  },
  {
    title: t`Látkové oděvy`,
    description: t`Nabízíme úpravy velikostí, vyštíhlení oblečení nebo přišití zipu`,
    image: "/img/services/latkove.webp",
    url: siteUrl("/latkove"),
  },
  {
    title: t`Oprava batohu a kabelek`,
    description: t`Zpevnění popruhů, výměna zipů nebo oprava trhlin v materiálu`,
    image: "/img/services/batohy.webp",
    url: siteUrl("/batohy"),
  },
  {
    title: t`Závěsy a záclony`,
    description: t`Úpravy záclon a závěsů na míru — zkracování, začištění okrajů a úprava tunýlků pro zavěšení`,
    image: "/img/services/zavesy.webp",
    url: siteUrl("/zavesy"),
  },
  {
    title: t`Výměna podšívky`,
    description: t`Vyměňujeme opotřebované nebo poškozené podšívky v kabátech a bundách`,
    image: "/img/services/podsivky.webp",
    url: siteUrl("/podsivka"),
  },
  {
    title: t`Výměna druku`,
    description: t`Rychlá výměna kovových patentek na bundách, kalhotách či doplňcích`,
    image: "/img/services/druku.webp",
    url: siteUrl("/druk"),
  },
];

function serviceHTML({ title, description, image, url }) {
  return `
<a href="${url || siteUrl("/sluzby")}">
  <div class="service">
    <img
      decoding="async"
      src="${image}"
      loading="lazy"
      alt="${title}"
    >
    <div class="service-title">${title}</div>
    <div class="service-subtitle">
      ${description}
    </div>
  </div>
</a>`;
}

export default () => {
  const pageHTML = `
    <section class="hero">
        <h1 class="hero-h1">${t`Krejčovství Švadlenka`}</h1>
        <h2>${t`Kvalitní opravna oděvů pod Nuselským mostem`}</h2>
        <h3>${t`Rádi vás přivítáme na adrese Jaromírova 726/15`}</h3>
        <table class="schedule">
          <tr>
            <td>${t`Po - Čt:`}</td>
            <td>10:00 - 18:00</td>
          </tr>
          <tr>
            <td>${t`Pátek:`}</td>
            <td>10:00 - 16:00</td>
          </tr>
        </table>
        <a href="#kontakty" class="cta-button">${t`Najít nás`}</a>
      </section>
      <section id="sluzby">
        <div class="section-title">${t`Naše služby`}</div>
        <div class="services">
          ${getServices()
            .map((service) => serviceHTML(service))
            .join("")}
        </div>
      </section>
      <div class="sluzby-wrapper">
        <a href="${siteUrl("/sluzby")}" class="cta-button">${t`Všechny služby a ceník`}</a>
      </div>
    `;
  return baseHtml({
    content: pageHTML,
    meta: {
      canonical: siteUrl('/'),
      title: t`Krejčovství Švadlenka – Oprava a úprava oděvů Praha 2`,
      description: t`Švadlenka je krejčovství na Praze 2, které nabízí kvalitní opravy a úpravy oblečení – džíny, kabáty, podšívky, batohy i záclony. Najdete nás na Jaromírově 726/15.`,
      keywords: t`krejčovství, oprava oblečení, úprava oděvů, výměna zipu, podšívka, záclony, Praha 2, Nusle`,
      ogTitle: t`Krejčovství Švadlenka – Praha 2`,
      ogDescription: t`Opravy a úpravy oblečení, záclon, batohů – najdete nás na Jaromírově 726/15.`,
      structuredData: getStructuredData({
        makesOffer: getServices().map((service) => makeOffer(service)),
      }),
    },
  });
};
