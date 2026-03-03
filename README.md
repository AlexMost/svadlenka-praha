# svadlenka-praha

svadlenka-praha.cz

## Dev

### Setup
> npm i
> npm fetch-services


### Run
> npm run dev

## Tests

### Setup
```bash
npx playwright install chromium
```

### Run
```bash
npm test                         # build site + run tests headless
npm run test:headed              # run with visible browser (also builds first)
```

## Publish

> npm run deploy
