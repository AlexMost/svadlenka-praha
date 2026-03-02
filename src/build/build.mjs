import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { loadLocales, setLocale } from "./i18n.mjs";
import { generateSitemap } from "./sitemap.mjs";
import { LOCALES, DEFAULT_LOCALE } from "../config.mjs";

let revision = process.argv[2];
if (!revision) {
  revision = crypto.randomUUID();
}

const getBasePath = (locale) =>
  locale === DEFAULT_LOCALE ? "./public" : `./public/${locale}`;

function postProcessHTML(html) {
  return html.replaceAll("$REVISION", revision);
}

async function discoverPages() {
  const pagesDir = path.resolve("./src/pages");
  const files = await fs.readdir(pagesDir);
  return files
    .filter((f) => f.endsWith(".mjs"))
    .map((f) => f.replace(/\.mjs$/, ""));
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

async function buildPages(locale, pageNames) {
  setLocale(locale);
  await copyFiles(locale);
  console.log(`Building pages (${revision}) ...`);
  for (const pageName of pageNames) {
    await buildPage(pageName, locale);
  }
  console.log("Pages built", locale);
}

loadLocales();

const pageNames = await discoverPages();
console.log(`Discovered pages: ${pageNames.join(", ")}`);

for (const locale of LOCALES) {
  await buildPages(locale, pageNames);
}

const sitemapXml = await generateSitemap(pageNames);
await fs.writeFile("./public/sitemap.xml", sitemapXml, "utf8");
console.log("Sitemap generated.");
