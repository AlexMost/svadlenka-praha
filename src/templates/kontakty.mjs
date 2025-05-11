export function kontakty() {
  return `<section id="kontakty">
        <div class="section-title">Kontakty</div>
        <div class="contact-info">
            <div class="address">
                <address>
                    <ul class="address">
                        <li><img class="icon" src="img/icons/location.svg" alt="adresses"> <a
                                href="https://maps.app.goo.gl/tuCXWGpSLHZmgrTq8">Jaromírova 726/15, Praha 2</a></li>
                        <li><img class="icon" src="img/icons/telephone.svg" alt="telephone"><a href="tel:+420775240309">+420 775 240
                            309</a></li>
                        <li><img class="icon" src="img/icons/email.svg" alt="email"><a href="mailto:lorikfavorit@gmail.com">lorikfavorit@gmail.com</a>
                        </li>
                    </ul>
                </address>
                <div class="contact-schedule">
                    <img class="icon" src="img/icons/schedule.svg" alt="otevírací doba">
                    <ul>
                        <li>Po – Čt: 10:00 – 18:00</li>
                        <li>Pá: 10:00 – 16:00</li>
                    </ul>
                </div>
            </div>
            <div class="place-photo only-desktop">
                <img loading="lazy" decoding="async" src="img/svadlenka-place.webp" alt="fotografie krejčovství Švadlenka">
            </div>
            <div class="place-photo only-desktop">
                <img loading="lazy" decoding="async" src="img/svadlenka-place-2.webp" alt="fotografie krejčovství Švadlenka">
            </div>
        </div>
    </section>
`;
}
