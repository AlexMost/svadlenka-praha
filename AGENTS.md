# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/` holds page entry modules (each exports HTML for a route like `index` or `contacts`).
- `src/templates/` contains shared HTML builders (header, structured data, etc.).
- `src/build/` includes the build pipeline (`build.mjs`, i18n helpers, services fetcher).
- `src/auto/` stores generated data modules; `services.mjs` is produced by `npm run fetch-services`.
- `static/` contains static assets (CSS, JS, images) copied to `public/` during build.
- `i18n/` contains gettext `.po` files for `cz`, `uk`, `en`, `ru` locales.
- `public/` is a build output directory and should not be edited by hand.

## Build, Test, and Development Commands
- `npm run dev` runs a watcher plus static server for local development.
- `npm run build` generates `public/` with the current revision placeholder.
- `npm run build-prod` builds with `NODE_ENV=production` and a git revision.
- `npm run serve` serves `public/` via `http-server` for quick previews.
- `npm run fetch-services` refreshes `src/auto/services.mjs` from the data source.
- `npm run prettier` formats the repo with Prettier.

## Coding Style & Naming Conventions
- Use 2-space indentation, double quotes, and semicolons to match existing `.mjs` files.
- Keep modules in ES modules (`.mjs`) and use `camelCase` for functions/variables.
- Run `npm run prettier` before committing formatting-heavy changes.

## Testing Guidelines
- No automated test suite is present. Do a manual smoke check:
  - `npm run build` and then `npm run serve` to verify pages render.
- Keep page module names aligned with routes (e.g., `src/pages/contacts.mjs`).

## Commit & Pull Request Guidelines
- Recent commits are short and descriptive; follow the same style (imperative or concise lowercase).
- PRs should include a clear summary, list of pages touched, and screenshots for UI changes.
- If you change translations, update `.po` files via `npm run update-translations`.

## Configuration & i18n Notes
- Translation updates use `ttag` (`npm run update-translations-*`).
- `CNAME` and `sitemap.xml` are copied into `public/` during the build.
