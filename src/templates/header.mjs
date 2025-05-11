export function header() {
  return `
    <header>
    <nav>
        <a href="/">
            <img class="logo" src="img/logo.svg" alt="Svadlenka logo"/>
        </a>
        <ul class="menu">
            <li><a href="#sluzby">Služby</a></li>
            <li><a href="#kontakty">Kontakty</a></li>
        </ul>
        <div class="hamburger-menu">
            <a class="telephone-btn" href="tel:+420775240309"><img width="30px" src="img/icons/telephone.svg"/></a>
            <button class="hamburger-btn">
                <img src="img/burger.svg" alt="Ikona menu"/>
            </button>
        </div>
    </nav>
</header>
   `;
}
