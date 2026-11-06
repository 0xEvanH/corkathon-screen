import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',
  testMatch: '*.e2e.ts',
  outputDir: 'test-results',
  use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4174' },
  // runs against the production build so asset paths get tested the way coolify serves them
  webServer: {
    command: 'bun run build && bun run preview',
    url: 'http://localhost:4174',
    reuseExistingServer: false,
  },
})
