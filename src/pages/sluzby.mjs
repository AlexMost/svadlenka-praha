import fs from 'fs';
import path from 'path';
import { baseHtml } from "../templates/baseHTML.mjs";


const serviceHTML = (service) => {
  return `
  <section>
    <h2>${service.title}</h2>
    <ul class="sluzby-list">
        ${service.options.map(option => (
            `<li>
                <div class="title dot-fill">${option[0]}</div>
                <div>${option[1]}</div>
            </li>`
        )).join('\n')}
    </ul>
</section>
  `
}

export default () => {
    const services = JSON.parse(fs.readFileSync(path.resolve('src/auto/services.json'), 'utf-8'));
  const pageHTML = `
<section>
    <h1>Služby a ceník</h1>
</section>
${services.map((service) => (serviceHTML(service))).join('\n')}
`;
  return baseHtml({ content: pageHTML, meta: { canonical: "/sluzby", title: 'Služby a ceník. Krejčovství Švadlenka' } });
};

