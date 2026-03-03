import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
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
