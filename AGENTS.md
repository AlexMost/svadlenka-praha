# AGENTS.md

This file provides guidance to OpenAI Codex and similar AI agents when working with code in this repository.

## Project Overview

Static site generator for a Czech tailor shop (Krejčovství Švadlenka Praha). Builds a multi-language HTML website deployed to GitHub Pages at svadlenka-praha.cz.

## Commands

```bash
npm i                        # Install dependencies
npm run fetch-crm            # Fetch the price list and the opening hours from the CRM → src/auto/ (run before any build)
npm run fetch-services       # Only the price list → src/auto/services.mjs
npm run fetch-opening-hours  # Only the opening hours → src/auto/openingHours.mjs
npm run dev                  # Watch + rebuild + local server (http-server on /public)
npm run build                # One-off build (dev, uses random revision ID)
npm run build-prod           # Production build (uses git commit hash for cache busting)
npm run prettier             # Format all files with Prettier
npm run update-translations  # Sync .po files from source strings (uk, ru, en)
npm run translate            # Auto-translate untranslated .po entries via OpenAI (requires OPENAI_API_KEY)
npm run deploy               # Laptop fallback: fetch + build prod + test + deploy to GitHub Pages via gh-pages
```

There is no lint command beyond Prettier. Smoke tests use Playwright (see **Testing** section below).

## Architecture

### Build pipeline

```
CRM GET /api/public/price-list     →  src/auto/services.mjs      (npm run fetch-services)
CRM GET /api/public/opening-hours  →  src/auto/openingHours.mjs  (npm run fetch-opening-hours)
src/pages/*.mjs  →  src/build/build.mjs  →  public/   →  GitHub Pages
src/auto/*.mjs  ↗                      ↗
static/  ──────────────────────────────
i18n/{uk,en,ru}/*.po  (ttag)  ─────────
```

`build.mjs` builds all pages for 4 locales sequentially: `cz` (default), `uk`, `en`, `ru`. Czech outputs to `public/`, others to `public/{locale}/`.

### Pages (`src/pages/*.mjs`)

Each page is an ES module with a default export `() => string` (returns full HTML). Pages call `baseHtml()` from `src/templates/baseHTML.mjs` for the shared layout (header, footer, GA, structured data, etc.).

Active pages: `index`, `sluzby`, `dziny`, `latkove`, `zavesy`, `podsivka`, `kalhoty`, `saty`, `contacts`. `build.mjs` discovers pages automatically from `src/pages/*.mjs`. To add a page: create `src/pages/<name>.mjs` and add its name to the `pages` arrays in `e2e/smoke.spec.mjs` and `e2e/sitemap.spec.mjs`. Every published page must have a smoke test.

Hidden pages: `sity-na-miru` (custom dress and skirt sewing) is kept in `src/pages/` but not published. To hide a page, add its name to `DISABLED_PAGES` in `src/build/build.mjs` (this also drops it from the sitemap), comment out its entry in both e2e `pages` arrays, and comment out links to it (e.g. the service card in `src/pages/index.mjs`). Do not re-add hidden pages to the e2e arrays — they are not built, so the tests would fail. To bring a page back, reverse these steps.

### Internationalization

- Czech is the source language (strings written directly in code using tagged template literals via `ttag`)
- Translations live in `i18n/{uk,en,ru}/*.po`
- `npm run update-translations` extracts new strings from source into .po files
- `npm run translate` auto-translates untranslated entries via OpenAI (requires `OPENAI_API_KEY`)
- `src/build/i18n.mjs` loads locales and exposes `setLocale()` / `getCurrentLocale()`

### Services/pricing data

The price list on `/sluzby` is edited in the CRM (Web section, «Ceník na webu»). `npm run fetch-services` (`src/build/services.mjs`) fetches `GET https://admin.svadlenka-praha.cz/api/public/price-list` — `{categories:[{title, rows:[{name, price, priceKind, priceLowCents, priceHighCents, priceNote}]}]}` — and writes `src/auto/services.mjs` in the `getServices()` shape `[{title, options:[[name, price]]}]`, every string wrapped in ttag `t`. Prices are translated per msgid: the rendered `price` string is the msgid, the raw price fields are ignored.

- `CRM_URL` (env or `.env`) points the fetch at another CRM, e.g. `CRM_URL=http://localhost:3000 npm run fetch-services`.
- The fetch makes up to 3 attempts (15 s timeout each), retrying only network errors, timeouts, 429 and 5xx; it validates the shape and exits 1 on a failed fetch, an invalid shape, zero categories or a category without rows. Nothing falls back to an older list.
- `src/auto/services.mjs` is a build artifact: git-ignored and untracked. A fresh clone has none, and `build.mjs` stops with «run `npm run fetch-crm` first».
- `src/build/fixtures/price-list.json` is a copy of the endpoint's response (the Google Sheet as imported into the CRM) for the unit tests.

### Opening hours

The weekly schedule and its exceptions (closed or changed hours, one day or a range, optional Czech reason) are edited in the CRM (Web section, «Otevírací doba»). `npm run fetch-opening-hours` (`src/build/openingHours.mjs`) fetches `GET …/api/public/opening-hours` — `{weekly:[{weekday 1..7, closed, opens, closes}], exceptions:[{from, to, closed, opens, closes, reason}]}`, exceptions already filtered to `to ≥ today` — validates it and writes `src/auto/openingHours.mjs` (`export const openingHours`). Same retries, `CRM_URL`, failure and git-ignore rules as the price list; `src/build/fixtures/opening-hours.json` serves the unit tests.

`src/templates/openingHours.mjs` turns the data into every block that shows hours, all taking the data and the Prague `today` as arguments:

- the hero table (`src/pages/index.mjs`) and the Kontakty list on every page (`src/templates/kontakty.mjs`): the open weekdays, adjacent equal days grouped («Po – Čt: 10:00 – 18:00»), weekday names through ttag;
- above them, one gold notice per upcoming exception (`scheduleNotices`): label «St 28. 10.» / «9. 9. – 15. 9.» / «Dočasně do 15. 9.» once running, hours «Zavřeno» or «Po – Pá: 10:00 – 15:00», the reason in Czech on every locale; while any notice shows, the regular hours get the «Běžná otevírací doba» caption and dim;
- JSON-LD (`src/templates/structuredData.mjs`): `openingHours` («Mo-Th 10:00-18:00», never translated) and `specialOpeningHoursSpecification`, one entry per exception per affected weekday, closed = `00:00`–`00:00`.

Each notice carries `data-valid-through`; `static/script.js` hides one past its last day and, once none is left in its `[data-schedule]` block (hero, Kontakty), hides the notices wrapper and drops the caption and dimming. The nightly CRM rebuild removes it for real.

### Publishing

`.github/workflows/publish.yml` publishes the site. It runs on every push to `main` and on `workflow_dispatch`, which the CRM sends on «Publikovat» and nightly at 00:05 Prague (the file name is a constant in the CRM — do not rename it). Steps: `npm ci` → `test:unit` → `fetch-crm` → `update-translations` → `translate` (`OPENAI_API_KEY` Actions secret; allowed to fail, untranslated strings show in Czech until the next run) → `build-prod` → all Playwright tests → `gh-pages -d public` with `GITHUB_TOKEN` → commits changed `i18n/**` back to `main` with `[skip ci]` (a `GITHUB_TOKEN` push never starts another run). `concurrency: publish` with `cancel-in-progress`, so a burst of publishes ends in one build that sees them all.

Start a run without building locally: `gh workflow run publish.yml`. Laptop fallback: `npm run deploy` (unit tests, `fetch-crm`, prod build, Playwright, then pushes `gh-pages`; translations stay manual: `npm run update-translations && npm run translate`).

### URL routing

`src/templates/siteUrl.mjs` exports `siteUrl(path, lang)` which prefixes non-Czech paths with `/{locale}`. Use this helper whenever generating internal links inside templates.

### Cookie consent

`src/templates/consent.mjs` holds the consent pieces `baseHtml()` renders. An inline script before the GTM snippet sets Google Consent Mode v2 defaults (all four signals `denied`, `wait_for_update: 500`) and replays a stored `granted` choice. The bottom bar and the «Nastavení cookies» footer button are driven by `static/script.js`. The choice is kept in `localStorage["cookie-consent"]` for 6 months. The consent covers GA and Ads only: the Google Maps iframe loads for everyone, by the owner's choice. `e2e/consent.spec.mjs` covers it and blocks all non-local requests.

### Cache busting

The build replaces `$REVISION` placeholder in HTML with a git commit hash (prod) or random UUID (dev). Static assets reference `style.css?v=$REVISION` etc.

## Testing

Smoke tests live in `e2e/smoke.spec.mjs` (Playwright + Chromium). They verify every page across all 4 locales renders correctly (HTTP 200, non-empty title, visible header/main/footer, no JS errors). `e2e/price-list.spec.mjs` checks that `/sluzby` in every locale shows exactly the categories and rows of the generated `src/auto/services.mjs`, with at least 5 categories and 30 rows, so a broken or half-empty CRM feed never deploys. `e2e/opening-hours.spec.mjs` checks that the hero, Kontakty and JSON-LD in every locale render the generated hours and notices, and drives the client-side notice expiry in both blocks with a fixed clock. Exception ranges are validated as real days of at most 366.

```bash
npm test                     # Run smoke tests headless (site must be built)
npm run test:headed          # Run with visible browser for debugging
npm run test:smoke           # Build site + run tests in one command
npm run test:unit            # node --test for src/**/*.test.mjs (the CRM fetches, module generators, opening-hours formatting)
```

Every published page must have a corresponding smoke test. When adding a new page, add its name to the `pages` arrays in `e2e/smoke.spec.mjs` and `e2e/sitemap.spec.mjs`. Pages listed in `DISABLED_PAGES` are not built and must stay commented out there. Run `npm run test:smoke` to verify.

## Verifying Changes

When making visual or markup changes, always verify the result in the browser:

1. Start the dev server: `npm run dev` (serves on `http://127.0.0.1:8080/`)
2. Use MCP (Chrome DevTools) tools to inspect the page — take snapshots, screenshots, check console errors
3. Confirm the site renders correctly before considering the task done
