import { t } from "ttag";
import { baseHtml } from "../templates/baseHTML.mjs";


export default () => {
  const pageHTML = ``;
  return baseHtml({
    content: pageHTML,
    meta: {
      canonical: "/contacts",
      title: t`Kontakty | Krejčovství Švadlenka Praha – Oprava a úprava oděvů`,
      description: t`Navštivte nás v Krejčovství Švadlenka na adrese Jaromírova 726/15, Praha 2 – Nusle. Zavolejte, napište nebo se zastavte osobně. Otevírací doba, telefon a e-mail na jednom místě.`,
      keywords: t`kontakt švadlenka, krejčovství praha, švadlena nusle, adresa švadlenka, telefon švadlenka, šití praha 2, oprava oděvů praha, úprava oblečení, kontaktní informace švadlenka`,
      ogTitle: t`Kontakty | Krejčovství Švadlenka Praha – Oprava a úprava oděvů`,
      ogDescription: t`Navštivte nás v Krejčovství Švadlenka na adrese Jaromírova 726/15, Praha 2 – Nusle. Zavolejte, napište nebo se zastavte osobně. Otevírací doba, telefon a e-mail na jednom místě..`,
    },
  });
};
