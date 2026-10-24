// Shared by the CRM fetch scripts (fetch-services, fetch-opening-hours).
import { realpathSync } from "fs";
import { fileURLToPath } from "url";

export const DEFAULT_CRM_URL = "https://admin.svadlenka-praha.cz";

/** `CRM_URL` (env or .env) or production, plus `path`, without a double slash. */
export const crmEndpoint = (
  path,
  crmUrl = process.env.CRM_URL || DEFAULT_CRM_URL,
) => `${crmUrl.replace(/\/+$/, "")}${path}`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableStatus = (status) => status === 429 || status >= 500;

// GETs a CRM endpoint as JSON. Network errors, timeouts, 429 and 5xx are
// retried because the CRM may be mid-restart; other 4xx and invalid JSON fail
// at once. `label` prefixes the retry warnings.
export async function fetchCrmJson(
  url,
  { label, attempts = 3, delayMs = 3_000, timeoutMs = 15_000 } = {},
) {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (response.ok) return await response.json();
      throw Object.assign(
        new Error(`GET ${url} responded ${response.status}`),
        { retryable: isRetryableStatus(response.status) },
      );
    } catch (error) {
      const retryable =
        !(error instanceof SyntaxError) && error.retryable !== false;
      if (!retryable || attempt >= attempts) throw error;
      console.warn(
        `${label}: attempt ${attempt}/${attempts} failed: ${error.message}`,
      );
      await sleep(delayMs);
    }
  }
}

// realpath on both sides: Node resolves symlinks in import.meta.url but not in
// process.argv[1], so a symlinked path would otherwise skip the fetch silently.
export const isMainModule = (metaUrl) =>
  Boolean(process.argv[1]) &&
  realpathSync(process.argv[1]) === realpathSync(fileURLToPath(metaUrl));
