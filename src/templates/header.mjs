import { t } from 'ttag';

export function header() {
  return `
    <header>
    <nav>
        <a href="/">
            <img class="logo" src="/img/logo.svg" alt="Svadlenka logo">
        </a>
        <ul class="menu">
           <li><a href="/">${t`Úvod`}</a></li>
            <li><a href="/sluzby">${t`Služby a ceník`}</a></li>
            <li><a href="#kontakty">${t`Kontakty`}</a></li>
        </ul>
        <div class="hamburger-menu">
            <a class="telephone-btn" href="tel:+420775240309" onClick="conversionFn()"><img src="/img/icons/telephone.svg" alt="telephone"></a>
            <button class="hamburger-btn">
                <img class="icon" src="/img/burger.svg" alt="Ikona menu">
            </button>
        </div>
    </nav>
</header>
   `;
}
