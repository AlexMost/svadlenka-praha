import { t } from "ttag";
import { siteUrl } from "./siteUrl.mjs";
import { getCurrentLocale } from "../build/i18n.mjs";
import { reviewHTML } from "./review.mjs";

export function header(currentUrl) {
  return `
    <header>
    <nav>
        <a href="${siteUrl("/")}">
            <img class="logo" src="/img/logo.svg" alt="Svadlenka logo">
        </a>
        <ul class="menu">
           <li><a href="${siteUrl("/")}">${t`Úvod`}</a></li>
            <li><a href="${siteUrl("/sluzby")}">${t`Služby a ceník`}</a></li>
            <li><a href="#kontakty">${t`Kontakty`}</a></li>
            <li>
               <div class="language-switcher">
                    <div class="language-switcher-inner">
                   <button class="lang-btn">
                        <img class="icon" src="/img/icons/lang.svg" alt="lang menu" />
                        ${getCurrentLocale()}
                    </button>
                    </div>
              </div>
            </li>
        </ul>
        <div class="hamburger-menu">
            <a class="telephone-btn" href="tel:+420775240309" onClick="conversionFn()"><img src="/img/icons/telephone.svg" alt="telephone"></a>
            <button class="lang-btn">
                <img class="icon" src="/img/icons/lang.svg" alt="lang menu" />
                ${getCurrentLocale()}
            </button>
            <button class="hamburger-btn">
                <img class="icon" src="/img/burger.svg" alt="Ikona menu">
            </button>
        </div>
    </nav>
</header>
<div class="sidebar-overlay"></div>
<div class="sidebar">
    <ul>
        <li><a href="${siteUrl("/")}">${t`Úvod`}</a></li>
        <li><a href="${siteUrl("/sluzby")}">${t`Služby a ceník`}</a></li>
        <li><a href="#kontakty">${t`Kontakty`}</a></li>
    </ul>
    <div class="review-sidebar">
        ${reviewHTML()}
    </div>
</div>
<div class="sidebar-lang">
    <ul>
        <li><a href="${siteUrl(currentUrl, 'en')}">en</a></li>
        <li><a href="${siteUrl(currentUrl, 'uk')}">uk</a></li>
        <li><a href="${siteUrl(currentUrl, 'ru')}">ru</a></li>
        <li><a href="${siteUrl(currentUrl, 'cz')}">cz</a></li>
    </ul>
    <div class="review-sidebar">
        ${reviewHTML()}
    </div>
</div>
   `;
}
