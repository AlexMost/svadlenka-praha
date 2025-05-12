import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

let revision = process.argv[2];
if (!revision) {
  revision = crypto.randomUUID();
}

function postProcessHTML(html) {
  return html.replaceAll("$REVISION", revision);
}

async function copyFiles() {
  console.log("Copying files...");
  const publicDir = path.resolve("./public");
  const staticDir = path.resolve("./static");

  await fs.rm(publicDir, { recursive: true, force: true });
  await fs.mkdir(publicDir, { recursive: true });
  await fs.cp(staticDir, publicDir, { recursive: true });
  await fs.copyFile("./CNAME", path.join(publicDir, "CNAME"));
  console.log("Files copied.");
}

async function buildPage(pageName) {
  let pagePath = `../pages/${pageName}.mjs`;
  const pageModule = await import(pagePath);
  const pageHTML = postProcessHTML(pageModule.default());
  if (pageName !== "index") {
    await fs.mkdir(path.join(path.resolve("./public"), pageName), {
      recursive: true,
    });
  }
  const pageResultPath =
    pageName === "index"
      ? path.join("./public", `${pageName}.html`)
      : path.join("./public", `${pageName}/index.html`);
  await fs.writeFile(pageResultPath, pageHTML, "utf8", { flag: "wx" });
  console.log(`Page ready ${pageResultPath}`);
}

async function buildPages() {
  console.log(`Building pages (${revision}) ...`);
  await buildPage("index");
  await buildPage("sluzby");
  console.log("Pages built.");
}

await copyFiles();
await buildPages();

