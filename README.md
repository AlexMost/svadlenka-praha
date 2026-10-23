# svadlenka-praha

svadlenka-praha.cz

## Dev

### Setup

```bash
npm i
npm run fetch-services           # price list from the CRM → src/auto/services.mjs (needed before any build)
```

`fetch-services` reads `https://admin.svadlenka-praha.cz/api/public/price-list`. Point it at a local CRM with `CRM_URL=http://localhost:3000` (env or `.env`, see `.env-example`).

### Run

```bash
npm run dev
```

## Tests

### Setup

```bash
npx playwright install chromium
```

### Run

```bash
npm test                         # build site + run tests headless
npm run test:headed              # run with visible browser (also builds first)
npm run test:unit                # unit tests of the CRM fetch
```

## Publish

Edit the price list in the CRM (Web → Ceník na webu) or push to `main`: `.github/workflows/publish.yml` fetches the price list, translates new strings, builds, tests and deploys. `gh workflow run publish.yml` starts it by hand.

Fallback from a laptop:

```bash
npm run deploy
```
