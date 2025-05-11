import fs from 'fs/promises';
import path from 'path';

async function copyFiles() {
  console.log('Copying files...');
  const publicDir = path.resolve("./public");
  const staticDir = path.resolve("./static");

  await fs.rm(publicDir, { recursive: true, force: true });
  await fs.mkdir(publicDir, { recursive: true });
  await fs.cp(staticDir, publicDir, { recursive: true });
  await fs.copyFile('./CNAME', path.join(publicDir, 'CNAME'));
  console.log('Files copied.');
}

async function buildPages() {
  console.log('Building pages...');
  const indexPage = await import("../pages/index.mjs");
  const html = indexPage.default();
  await fs.writeFile(path.join('./public', 'index.html'), html, 'utf8', { flag: 'wx' });
  console.log('Saved index.html');
  console.log('Pages built.');
}

await copyFiles();
await buildPages();
