import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: '*.e2e.ts',
  outputDir: 'test-results',
  use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4173' },
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
})
