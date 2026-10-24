# svadlenka-praha

svadlenka-praha.cz

## Dev

### Setup

```bash
npm i
npm run fetch-crm                # price list + opening hours from the CRM → src/auto/ (needed before any build)
```

`fetch-crm` runs `fetch-services` (`/api/public/price-list` → `src/auto/services.mjs`) and `fetch-opening-hours` (`/api/public/opening-hours` → `src/auto/openingHours.mjs`) against `https://admin.svadlenka-praha.cz`. Point it at a local CRM with `CRM_URL=http://localhost:3000` (env or `.env`, see `.env-example`).

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
npm run test:unit                # unit tests of the CRM fetch and the opening-hours formatting
```

## Publish

Press «Publikovat» in the CRM (Web section) or push to `main`: `.github/workflows/publish.yml` fetches the price list and the opening hours, translates new strings, builds, tests and deploys. `gh workflow run publish.yml` starts it by hand.

Fallback from a laptop:

```bash
npm run deploy
```
