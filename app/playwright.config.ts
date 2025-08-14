import { defineConfig, devices } from '@playwright/test'

const iPhone16 = {
	...devices['iPhone 12'],
	viewport: { width: 430, height: 932 }, // iPhone 14/15 Pro Max size; close proxy for 16
	userAgent: devices['iPhone 12'].userAgent?.replace(/iPhone OS \d+_\d+(_\d+)?/, 'iPhone OS 18_0') ?? devices['iPhone 12'].userAgent,
	deviceScaleFactor: 3,
}

export default defineConfig({
	testDir: './tests/e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: 'list',
	use: {
		baseURL: 'http://localhost:5174',
		headless: true,
		trace: 'on-first-retry',
	},
	webServer: {
		command: 'npm run dev -- --host 0.0.0.0 --port 5174',
		url: 'http://localhost:5174',
		reuseExistingServer: true,
		timeout: 120_000,
	},
	projects: [
		{ name: 'webkit-iphone16', use: { ...iPhone16 } },
		{ name: 'chromium-mobile', use: { ...devices['Pixel 7'] } },
	],
})


