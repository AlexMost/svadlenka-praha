import fetch from "node-fetch";
import { parse } from "csv-parse/sync";
import fs from "fs/promises";
import path from "path";

function recordsToServices(records) {
  return records
    .map((r) => r.filter((item) => Boolean(item)))
    .reduce((acc, item) => {
      if (item.length === 1) {
        acc.push(item);
      } else {
        acc[acc.length - 1].push(item);
      }
      return acc;
    }, [])
    .map(([title, ...options]) => ({
      title,
      options,
    }));
}

function convertToMjs(data) {
  const replacer = (match, value) => {
    return /^\d[\d\s-]*$/.test(value) ? `"${value}"` : `t\`${value}\``;
  };

  const jsonString = JSON.stringify(data, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // прибрати лапки навколо ключів
    .replace(/"([^"]+)"/g, replacer); // обробити значення

  return `import { t } from "ttag";\n\nexport const getServices = () => ${jsonString};`;
}

const sheetURL =
  "https://docs.google.com/spreadsheets/d/1XEzx6YljRJ9p5gMkYyRPzwhVKydStVVgIVWIxKgXxHQ/gviz/tq?tqx=out:csv&sheet=sluzby";

export async function fetchServices() {
  const response = await fetch(sheetURL);
  const csvText = await response.text();

  const records = parse(csvText);
  const services = recordsToServices(records);
  const mjsServices = convertToMjs(services);
  const mjsServicesPath = path.join("./src/auto", "services.mjs");
  await fs.writeFile(mjsServicesPath, mjsServices, "utf8", {
    flag: "wx",
  });
}

await fetchServices();
