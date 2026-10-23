import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  projects: [
    {
      name: "chromium",
      // CI runs on the Google Chrome preinstalled on GitHub's ubuntu-latest
      // image, so the workflow skips `playwright install` (~20 s per run).
      // Locally the browser from `npx playwright install chromium` is used.
      use: {
        browserName: "chromium",
        ...(process.env.CI && { channel: "chrome" }),
      },
    },
  ],
  webServer: {
    command: "npx http-server public -c-1 -p 8080",
    url: "http://127.0.0.1:8080",
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: "http://127.0.0.1:8080",
  },
});
