import { expect, test } from '@playwright/test';

test('loads the first saved composition without a Cloudinary request', async ({ page }) => {
	const cloudRequests: string[] = [];
	page.on('request', (request) => {
		if (request.url().includes('cloudinary.com')) cloudRequests.push(request.url());
	});
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toContainText('Show what comes');
	await expect(page.getByRole('button', { name: /Camera Only/ })).toHaveAttribute(
		'aria-pressed',
		'true'
	);
	const image = page.locator('.composite-image');
	await expect(image).toBeVisible();
	await expect
		.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth))
		.toBe(1200);
	expect(cloudRequests).toEqual([]);
});

test('switches bundles and shows two memory cards in Creator Kit', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: /Starter Kit/ }).click();
	await expect(
		page.getByRole('list', { name: 'Included items' }).getByRole('listitem')
	).toHaveCount(3);
	await page.getByRole('button', { name: /Creator Kit/ }).click();
	const items = page.getByRole('list', { name: 'Included items' });
	await expect(items.getByRole('listitem')).toHaveCount(5);
	await expect(items.getByRole('listitem').filter({ hasText: 'Memory card' })).toContainText('× 2');
	await expect(page.locator('.composite-image')).toHaveAttribute(
		'src',
		'/demo/outputs/creator-kit.webp'
	);
});

test('blocks the incorrect example, resets, and clears on bundle changes', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('button', { name: /Try an incorrect recipe/ }).click();
	await expect(page.getByRole('status')).toContainText('Incorrect recipe blocked');
	await expect(page.getByRole('button', { name: 'Export unavailable' })).toBeDisabled();
	await page.getByRole('button', { name: /Reset to current recipe/ }).click();
	await expect(page.getByRole('link', { name: 'Download bundle image' })).toBeVisible();
	await page.getByRole('button', { name: /Try an incorrect recipe/ }).click();
	await expect(page.getByRole('status')).toContainText('Incorrect recipe blocked');
	await page.getByRole('button', { name: /Starter Kit/ }).click();
	await expect(page.getByRole('link', { name: 'Download bundle image' })).toBeVisible();
});

test('ignores a stale validation response after selecting a new package', async ({ page }) => {
	await page.route('**/api/validate', async (route) => {
		await new Promise((resolve) => setTimeout(resolve, 350));
		await route.fulfill({
			json: { valid: false, issues: [{ code: 'extra_component', message: 'Old request' }] }
		});
	});
	await page.goto('/');
	await page.getByRole('button', { name: /Try an incorrect recipe/ }).click();
	await page.getByRole('button', { name: /Creator Kit/ }).click();
	await page.waitForTimeout(450);
	await expect(page.getByRole('status')).not.toContainText('Old request');
	await expect(page.getByRole('link', { name: 'Download bundle image' })).toBeVisible();
});

test('handles a non-JSON validation failure without exposing a parsing error', async ({ page }) => {
	await page.route('**/api/validate', (route) =>
		route.fulfill({ status: 500, contentType: 'text/plain', body: 'Service unavailable' })
	);
	await page.goto('/');
	await page.getByRole('button', { name: /Try an incorrect recipe/ }).click();
	await expect(page.getByRole('status')).toContainText('The check could not finish');
	await expect(page.getByRole('button', { name: 'Export unavailable' })).toBeDisabled();
});

test('provides a compact mobile layout and working image', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');
	await expect
		.poll(() =>
			page
				.locator('.composite-image')
				.evaluate((element) => (element as HTMLImageElement).naturalHeight)
		)
		.toBe(1000);
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
		true
	);
	await page.getByRole('button', { name: /Creator Kit/ }).click();
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
		true
	);
	await page.screenshot({ path: '/tmp/bundle-studio-mobile.png', fullPage: true });
});

test('downloads the verified WebP', async ({ page }) => {
	await page.goto('/');
	const downloadPromise = page.waitForEvent('download');
	await page.getByRole('link', { name: 'Download bundle image' }).click();
	const download = await downloadPromise;
	expect(download.suggestedFilename()).toBe('camera-only.webp');
	expect(await download.failure()).toBeNull();
});

test('renders credits and real headings on the docs page', async ({ page }) => {
	await page.goto('/docs');
	await expect(page.getByRole('heading', { name: 'Photo credits and reuse' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Original source and attribution' })).toHaveCount(5);
});

test('serves health and the executable 30-case report', async ({ request }) => {
	const health = await request.get('/api/health');
	expect(await health.json()).toMatchObject({
		status: 'ok',
		savedOutputs: 3,
		failedCases: 0,
		runtimeCloudinaryWrites: false
	});
	const benchmark = await request.get('/api/benchmark');
	expect(await benchmark.json()).toMatchObject({ total: 30, passed: 30, failed: 0 });
});

test('rejects malformed and unrecognized API input', async ({ request }) => {
	expect(
		(
			await request.post('/api/validate', {
				data: 'x'.repeat(3000),
				headers: { 'content-type': 'application/json' }
			})
		).status()
	).toBe(413);
	expect(
		(
			await request.post('/api/validate', { data: { bundleId: 'missing', scenario: 'valid' } })
		).status()
	).toBe(400);
	expect(
		(
			await request.post('/api/validate', {
				data: { bundleId: 'camera-only', scenario: 'valid', publicId: 'arbitrary' }
			})
		).status()
	).toBe(400);
	expect(
		(
			await request.post('/api/validate', {
				data: '{bad',
				headers: { 'content-type': 'application/json' }
			})
		).status()
	).toBe(400);
	expect((await request.get('/api/bundles/missing/export')).status()).toBe(404);
	expect((await request.get('/api/bundles/missing/manifest')).status()).toBe(404);
});

test('renders all outputs without browser errors', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.goto('/');
	for (const label of ['Camera Only', 'Starter Kit', 'Creator Kit']) {
		await page.getByRole('button', { name: new RegExp(label) }).click();
		await expect
			.poll(() =>
				page
					.locator('.composite-image')
					.evaluate((element) => (element as HTMLImageElement).naturalWidth)
			)
			.toBe(1200);
	}
	expect(errors).toEqual([]);
	await page.screenshot({ path: '/tmp/bundle-studio-desktop.png', fullPage: true });
});
