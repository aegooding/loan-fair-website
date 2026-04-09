import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  // Run tests one at a time (avoids parallel form submissions hitting the backend)
  workers: 1,
  // Retry once on failure (useful for flaky network on live site)
  retries: 1,
  use: {
    // Keep browser visible so you can watch the test run
    headless: false,
    // Slow down actions by 100ms so you can follow along
    launchOptions: {
      slowMo: 100,
    },
    // Take a screenshot on failure
    screenshot: 'only-on-failure',
    // Record a video on failure
    video: 'retain-on-failure',
  },
})
