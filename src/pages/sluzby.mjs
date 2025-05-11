import { baseHtml } from "../templates/baseHTML.mjs";

export default () => {
  const pageHTML = `<section>Sluzby content</section>`;
  return baseHtml({ content: pageHTML, meta: { canonical: "/sluzby" } });
};

