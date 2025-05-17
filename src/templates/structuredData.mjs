export function makeOffer({ title, description, category }) {
  return {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      serviceType: title,
      category,
      description,
    },
  };
}

export function getStructuredData({ makesOffer }) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Švadlenka",
    image: "https://svadlenka-praha.cz/img/logo.jpg",
    description:
      "Krejčovství na Praze 2. Opravujeme a upravujeme oblečení, džíny, batohy, záclony, podšívky a další.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jaromírova 726/15",
      addressLocality: "Praha 2",
      addressRegion: "Praha",
      postalCode: "128 00",
      addressCountry: "CZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.0651271,
      longitude: 14.4238941,
    },
    url: "https://svadlenka-praha.cz",
    telephone: "+420 775 240 309",
    openingHours: ["Mo-Th 10:00-18:00", "Fr 10:00-16:00"],
    priceRange: "Kč",
    sameAs: [
      "https://maps.app.goo.gl/D2bBfxsa8yQEQPgd8",
      "https://www.instagram.com/svadlenka_praha",
      "https://g.co/kgs/sWZWeax",
    ],
    makesOffer,
  };
}
