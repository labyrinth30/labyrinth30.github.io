import { defineConfig } from '@playwright/test';
const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:4173/';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: process.env.E2E_REPORT ?? 'test-results/results.json' }]],
  use: { baseURL, browserName: 'chromium', viewport: { width: 1440, height: 1000 }, screenshot: 'on', trace: 'retain-on-failure' },
  webServer: process.env.BASE_URL ? undefined : { command: 'node scripts/serve-dist.mjs', url: baseURL, reuseExistingServer: false },
});
