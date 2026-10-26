import { describe, expect, it } from 'vitest';
import { bundles } from './catalog';
import { createRecipe, validateRecipe } from './policy';
import { runBenchmark } from './benchmark';

describe('bundle contract', () => {
	for (const bundle of bundles) {
		it(`accepts the current ${bundle.id} recipe`, () => {
			expect(validateRecipe(bundle, createRecipe(bundle)).valid).toBe(true);
		});
	}
	it('executes exactly 30 labeled checks without failures', () => {
		const report = runBenchmark();
		expect(report.total).toBe(30);
		expect(report.failed).toBe(0);
	});
	it('rejects optional extras in Camera Only', () => {
		const recipe = createRecipe(bundles[0]);
		expect(
			validateRecipe(bundles[0], {
				...recipe,
				items: [...recipe.items, { componentId: 'tripod', quantity: 1 }]
			}).issues.map((issue) => issue.code)
		).toContain('extra_component');
	});
	it.each([null, {}, [], 'recipe', { sku: 'x' }])('rejects malformed input %j', (input) => {
		expect(validateRecipe(bundles[0], input).valid).toBe(false);
	});
	it.each([0, -1, 1.5, Infinity, NaN, '1'])('rejects invalid quantity %s', (quantity) => {
		expect(
			validateRecipe(bundles[0], {
				...createRecipe(bundles[0]),
				items: [{ componentId: 'camera', quantity }]
			}).valid
		).toBe(false);
	});
	it('requires both Creator Kit memory cards', () => {
		const recipe = createRecipe(bundles[2]);
		expect(
			validateRecipe(bundles[2], {
				...recipe,
				items: recipe.items.map((item) =>
					item.componentId === 'memory-card' ? { ...item, quantity: 1 } : item
				)
			}).valid
		).toBe(false);
	});
	it('keeps optional and included identifiers disjoint', () => {
		expect(
			bundles.every((bundle) =>
				bundle.optional.every((id) => !bundle.contents.some((item) => item.componentId === id))
			)
		).toBe(true);
	});
});
