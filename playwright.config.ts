import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
const baseURL = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3001";
const executablePath =
  process.env.BROWSER_EXECUTABLE_PATH ??
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
export default defineConfig({
  testDir: "./tests",
  timeout: 120000,
  workers: 1,
  fullyParallel: false,
  reporter: "list",
  use: {
    baseURL,
    contextOptions: { reducedMotion: "reduce" },
    viewport: { width: 1440, height: 900 },
    trace: "retain-on-failure",
    launchOptions: { executablePath, args: ["--no-sandbox"] },
  },
  webServer: {
    command: "npm start",
    url: baseURL,
    reuseExistingServer: true,
    timeout: 120000,
  },
});
