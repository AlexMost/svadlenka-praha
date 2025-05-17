import { baseHtml } from "../templates/baseHTML.mjs";
import { getStructuredData, makeOffer } from "../templates/structuredData.mjs";

const services = [
  {
    title: "Úprava džín",
    description:
      "Zkracujeme, zužujeme nebo opravujeme prošoupané a potrhané džíny",
    image: "/img/services/dziny.webp",
  },
  {
    title: "Látkové oděvy",
    description:
      "Nabízíme úpravy velikostí, vyštíhlení oblečení nebo přišití zipu",
    image: "/img/services/latkove.webp",
  },
  {
    title: "Oprava batohu a kabelek",
    description: "Zpevnění popruhů, výměna zipů nebo oprava trhlin v materiálu",
    image: "/img/services/batohy.webp",
  },
  {
    title: "Závěsy a záclony",
    description:
      "Úpravy záclon a závěsů na míru — zkracování, začištění okrajů a úprava tunýlků pro zavěšení",
    image: "/img/services/zavesy.webp",
  },
  {
    title: "Výměna podšívky",
    description:
      "Vyměňujeme opotřebované nebo poškozené podšívky v kabátech a bundách",
    image: "/img/services/podsivky.webp",
  },
  {
    title: "Výměna druku",
    description:
      "Rychlá výměna kovových patentek na bundách, kalhotách či doplňcích",
    image: "/img/services/druku.webp",
  },
];

function serviceHTML({ title, description, image }) {
  return `
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
  </div>`;
}

export default () => {
  const pageHTML = `
    <section class="hero">
        <h1 class="hero-h1">Krejčovství Švadlenka</h1>
        <h2>Kvalitní opravna oděvů pod Nuselským mostem</h2>
        <h3>Rádi vás přivítáme na adrese Jaromírova 726/15</h3>
        <table class="schedule">
          <tr>
            <td>Po - Čt:</td>
            <td>10:00 - 18:00</td>
          </tr>
          <tr>
            <td>Pátek:</td>
            <td>10:00 - 16:00</td>
          </tr>
        </table>
        <a href="#kontakty" class="cta-button">Najít nás</a>
      </section>
      <section id="sluzby">
        <div class="section-title">Naše služby</div>
        <div class="services">
          ${services.map((service) => serviceHTML(service)).join("")}
        </div>
      </section>
      <div class="sluzby-wrapper">
        <a href="/sluzby" class="cta-button">Všechny služby a ceník</a>
      </div>
    `;
  return baseHtml({
    content: pageHTML,
    meta: {
      canonical: "/",
      title: "Krejčovství Švadlenka – Oprava a úprava oděvů Praha 2",
      description:
        "Švadlenka je krejčovství na Praze 2, které nabízí kvalitní opravy a úpravy oblečení – džíny, kabáty, podšívky, batohy i záclony. Najdete nás na Jaromírově 726/15.",
      keywords:
        "krejčovství, oprava oblečení, úprava oděvů, výměna zipu, podšívka, záclony, Praha 2, Nusle",
      ogTitle: "Krejčovství Švadlenka – Praha 2",
      ogDescription:
        "Opravy a úpravy oblečení, záclon, batohů – najdete nás na Jaromírově 726/15.",
      structuredData: getStructuredData({
        makesOffer: services.map((service) => makeOffer(service)),
      }),
    },
  });
};
