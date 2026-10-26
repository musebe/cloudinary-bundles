import { defineConfig } from '@playwright/test';

export default defineConfig({
	use: { baseURL: 'http://127.0.0.1:4178', browserName: 'chromium' },
	webServer: {
		command: 'pnpm build && pnpm preview --host 127.0.0.1 --port 4178 --strictPort',
		port: 4178,
		reuseExistingServer: !process.env.CI,
		timeout: 120000
	},
	workers: 2,
	testMatch: '**/*.e2e.{ts,js}'
});
