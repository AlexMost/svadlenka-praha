import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { loadLocales, setLocale } from "./i18n.mjs";

let revision = process.argv[2];
if (!revision) {
  revision = crypto.randomUUID();
}

const getBasePath = (locale) =>
  locale === "cz" ? "./public" : `./public/${locale}`;

function postProcessHTML(html) {
  return html.replaceAll("$REVISION", revision);
}

async function copyFiles(locale) {
  console.log("Copying files...");
  const publicDir = path.resolve(getBasePath(locale));
  const staticDir = path.resolve("./static");

  await fs.rm(publicDir, { recursive: true, force: true });
  await fs.mkdir(publicDir, { recursive: true });
  await fs.cp(staticDir, publicDir, { recursive: true });
  await fs.copyFile("./CNAME", path.join(publicDir, "CNAME"));
  console.log("Files copied.");
}

async function buildPage(pageName, locale) {
  let pagePath = `../pages/${pageName}.mjs`;
  const pageModule = await import(pagePath);
  const pageHTML = postProcessHTML(pageModule.default());
  if (pageName !== "index") {
    await fs.mkdir(path.join(path.resolve(getBasePath(locale)), pageName), {
      recursive: true,
    });
  }

  const pageResultPath =
    pageName === "index"
      ? path.join(getBasePath(locale), `${pageName}.html`)
      : path.join(getBasePath(locale), `${pageName}/index.html`);
  await fs.writeFile(pageResultPath, pageHTML, "utf8", { flag: "wx" });
  console.log(`Page ready ${pageResultPath}`);
}

async function buildPages(locale) {
  setLocale(locale);
  await copyFiles(locale);
  console.log(`Building pages (${revision}) ...`);
  await buildPage("index", locale);
  await buildPage("sluzby", locale);
  await buildPage("dziny", locale);
  await buildPage("latkove", locale);
  await buildPage("batohy", locale);
  await buildPage("zavesy", locale);
  await buildPage("podsivka", locale);
  await buildPage("druk", locale);
  console.log("Pages built", locale);
}

loadLocales();

await buildPages("cz");
await buildPages("uk");
await buildPages("en");
await buildPages("ru");
