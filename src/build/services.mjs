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

const sheetURL =
  "https://docs.google.com/spreadsheets/d/1XEzx6YljRJ9p5gMkYyRPzwhVKydStVVgIVWIxKgXxHQ/gviz/tq?tqx=out:csv&sheet=sluzby";

export async function fetchServices() {
  const response = await fetch(sheetURL);
  const csvText = await response.text();

  const records = parse(csvText);
  const services = recordsToServices(records);
  const servicesPath = path.join("./src/auto", "services.json");
  await fs.writeFile(servicesPath, JSON.stringify(services), "utf8", {
    flag: "wx",
  });
}

await fetchServices();
