import { baseHtml } from "../templates/baseHTML.mjs";

export default () => {
    return baseHtml(`
    <section class="hero">
        <h1>Krejčovství Švadlenka</h1>
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
          <div class="service">
            <img
              decoding="async"
              src="img/services/dziny.webp"
              loading="lazy"
              alt="Úprava džín"
            >
            <div class="service-title">Úprava džín</div>
            <div class="service-subtitle">
              Zkracujeme, zužujeme nebo opravujeme prošoupané a potrhané džíny
            </div>
          </div>
          <div class="service">
            <img
              decoding="async"
              src="img/services/latkove.webp"
              loading="lazy"
              alt="Látkové oděvy"
            >
            <div class="service-title">Látkové oděvy</div>
            <div class="service-subtitle">
              Nabízíme úpravy velikostí, vyštíhlení oblečení nebo přišití zipu
            </div>
          </div>
          <div class="service">
            <img
              decoding="async"
              src="img/services/batohy.webp"
              loading="lazy"
              alt="Oprava batohu a kabelek"
            >
            <div class="service-title">Oprava batohu a kabelek</div>
            <div class="service-subtitle">
              Zpevnění popruhů, výměna zipů nebo oprava trhlin v materiálu
            </div>
          </div>
          <div class="service">
            <img
              decoding="async"
              src="img/services/zavesy.webp"
              loading="lazy"
              alt="Závěsy a záclony"
            >
            <div class="service-title">Závěsy a záclony</div>
            <div class="service-subtitle">
              Úpravy záclon a závěsů na míru — zkracování, začištění okrajů a
              úprava tunýlků pro zavěšení
            </div>
          </div>
          <div class="service">
            <img
              decoding="async"
              src="img/services/podsivky.webp"
              loading="lazy"
              alt="Výměna podšívky"
            >
            <div class="service-title">Výměna podšívky</div>
            <div class="service-subtitle">
              Vyměňujeme opotřebované nebo poškozené podšívky v kabátech a
              bundách
            </div>
          </div>
          <div class="service">
            <img
              decoding="async"
              src="img/services/druku.webp"
              loading="lazy"
              alt="Výměna druku"
            >
            <div class="service-title">Výměna druku</div>
            <div class="service-subtitle">
              Rychlá výměna kovových patentek na bundách, kalhotách či doplňcích
            </div>
          </div>
        </div>
      </section>
    `)
}