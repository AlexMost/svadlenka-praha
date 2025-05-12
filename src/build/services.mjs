import fetch from "node-fetch";
import { parse } from "csv-parse/sync";
import fs from "fs/promises";
import path from "path";

const sheetURL =
  "https://docs.google.com/spreadsheets/d/1XEzx6YljRJ9p5gMkYyRPzwhVKydStVVgIVWIxKgXxHQ/gviz/tq?tqx=out:csv&sheet=services";

export async function fetchServices() {
  const response = await fetch(sheetURL);
  const csvText = await response.text();

  const records = parse(csvText);

  const servicesObj = {};

  records.forEach(([category, service, price]) => {
    if (!servicesObj[category]) {
      servicesObj[category] = [];
    }
    servicesObj[category].push([service, price]);
  });

  const servicesArray = Object.entries(servicesObj).map(([title, options]) => ({
    title,
    options,
  }));

  const servicesPath = path.join("./src/auto", "services.json");
  await fs.writeFile(servicesPath, JSON.stringify(servicesArray), "utf8", {
    flag: "wx",
  });
}

await fetchServices();
