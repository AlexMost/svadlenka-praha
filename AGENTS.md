# AGENTS.md

This file provides guidance to OpenAI Codex and similar AI agents when working with code in this repository.

## Project Overview

Static site generator for a Czech tailor shop (Krejčovství Švadlenka Praha). Builds a multi-language HTML website deployed to GitHub Pages at svadlenka-praha.cz.

## Commands

```bash
npm i                        # Install dependencies
npm run fetch-services       # Fetch services/pricing from Google Sheets → src/auto/services.mjs
npm run dev                  # Watch + rebuild + local server (http-server on /public)
npm run build                # One-off build (dev, uses random revision ID)
npm run build-prod           # Production build (uses git commit hash for cache busting)
npm run prettier             # Format all files with Prettier
npm run update-translations  # Sync .po files from source strings (uk, ru, en)
npm run deploy               # Build prod + deploy to GitHub Pages via gh-pages
```

> **Note**: README says `npm run publish` but the correct script is `npm run deploy`.

There are no tests or a lint command beyond Prettier.

## Architecture

### Build pipeline

```
src/pages/*.mjs  →  src/build/build.mjs  →  public/   →  GitHub Pages
src/auto/services.mjs  ↗               ↗
static/  ──────────────────────────────
i18n/{uk,en,ru}/*.po  (ttag)  ─────────
```

`build.mjs` builds all pages for 4 locales sequentially: `cz` (default), `uk`, `en`, `ru`. Czech outputs to `public/`, others to `public/{locale}/`.

### Pages (`src/pages/*.mjs`)

Each page is an ES module with a default export `() => string` (returns full HTML). Pages call `baseHtml()` from `src/templates/baseHTML.mjs` for the shared layout (header, footer, GA, structured data, etc.).

Active pages: `index`, `sluzby`, `dziny`, `latkove`, `zavesy`, `podsivka`, `kalhoty`, `saty`, `sity-na-miru`, `contacts`. To add a page: create `src/pages/<name>.mjs` and add a `buildPage("<name>", locale)` call in `build.mjs` for each locale block.

### Internationalization

- Czech is the source language (strings written directly in code using tagged template literals via `ttag`)
- Translations live in `i18n/{uk,en,ru}/*.po`
- `npm run update-translations` extracts new strings from source into .po files; translators fill them in manually
- `src/build/i18n.mjs` loads locales and exposes `setLocale()` / `getCurrentLocale()`

### Services/pricing data

`src/auto/services.mjs` is auto-generated from Google Sheets via `npm run fetch-services` (uses `src/build/services.mjs`). This file is gitignored — run fetch-services after cloning before building.

### URL routing

`src/templates/siteUrl.mjs` exports `siteUrl(path, lang)` which prefixes non-Czech paths with `/{locale}`. Use this helper whenever generating internal links inside templates.

### Cache busting

The build replaces `$REVISION` placeholder in HTML with a git commit hash (prod) or random UUID (dev). Static assets reference `style.css?v=$REVISION` etc.

## Verifying Changes

When making visual or markup changes, always verify the result in the browser:

1. Start the dev server: `npm run dev` (serves on `http://127.0.0.1:8080/`)
2. Use MCP (Chrome DevTools) tools to inspect the page — take snapshots, screenshots, check console errors
3. Confirm the site renders correctly before considering the task done
