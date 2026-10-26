import { bundles } from './catalog';
import { createRecipe, validateRecipe } from './policy';

const scenarios = [
	{ name: 'Current recipe', code: null, mutate: (r: ReturnType<typeof createRecipe>) => r },
	{
		name: 'Reordered components',
		code: null,
		mutate: (r: ReturnType<typeof createRecipe>) => ({ ...r, items: [...r.items].reverse() })
	},
	{
		name: 'Missing camera',
		code: 'missing_component',
		mutate: (r: ReturnType<typeof createRecipe>) => ({
			...r,
			items: r.items.filter((item) => item.componentId !== 'camera')
		})
	},
	{
		name: 'Wrong quantity',
		code: 'quantity_mismatch',
		mutate: (r: ReturnType<typeof createRecipe>) => ({
			...r,
			items: r.items.map((item, i) => (i === 0 ? { ...item, quantity: 2 } : item))
		})
	},
	{
		name: 'Wrong SKU',
		code: 'sku_mismatch',
		mutate: (r: ReturnType<typeof createRecipe>) => ({ ...r, sku: 'OTHER-SKU' })
	},
	{
		name: 'Stale revision',
		code: 'stale_version',
		mutate: (r: ReturnType<typeof createRecipe>) => ({ ...r, bundleVersion: '0' })
	},
	{
		name: 'Duplicate component',
		code: 'duplicate_component',
		mutate: (r: ReturnType<typeof createRecipe>) => ({ ...r, items: [...r.items, r.items[0]] })
	},
	{
		name: 'Unknown component',
		code: 'invalid_recipe',
		mutate: (r: ReturnType<typeof createRecipe>) => ({
			...r,
			items: [...r.items, { componentId: 'invented-lens', quantity: 1 }]
		})
	},
	{
		name: 'Fractional quantity',
		code: 'invalid_recipe',
		mutate: (r: ReturnType<typeof createRecipe>) => ({
			...r,
			items: [{ componentId: 'camera', quantity: 1.5 }]
		})
	},
	{
		name: 'Unexpected field',
		code: 'invalid_recipe',
		mutate: (r: ReturnType<typeof createRecipe>) => ({ ...r, transformation: 'arbitrary' })
	}
] as const;

export function runBenchmark() {
	const results = bundles.flatMap((bundle) =>
		scenarios.map((scenario, index) => {
			const baseRecipe = createRecipe(bundle);
			const optional = bundle.optional[0];
			const isExtraItem = index === 1 && optional !== undefined;
			const recipe = isExtraItem
				? { ...baseRecipe, items: [...baseRecipe.items, { componentId: optional, quantity: 1 }] }
				: scenario.mutate(baseRecipe);
			const result = validateRecipe(bundle, recipe);
			// The one-item case hits the nonempty schema boundary before membership validation.
			const expectedCode = isExtraItem
				? 'extra_component'
				: index === 2 && bundle.contents.length === 1
					? 'invalid_recipe'
					: scenario.code;
			const expectedValid = expectedCode === null;
			const passed =
				result.valid === expectedValid &&
				(expectedCode === null || result.issues.some((issue) => issue.code === expectedCode));
			return {
				id: `${bundle.id}-${index + 1}`,
				bundleId: bundle.id,
				scenario: isExtraItem ? 'Optional accessory incorrectly included' : scenario.name,
				expectedValid,
				expectedCode,
				actualValid: result.valid,
				actualCodes: result.issues.map((issue) => issue.code),
				passed
			};
		})
	);
	return {
		dataset: 'bundle-contract-v1',
		method: 'Logical composition-contract checks; not image recognition or conversion research.',
		total: results.length,
		passed: results.filter((result) => result.passed).length,
		failed: results.filter((result) => !result.passed).length,
		results
	};
}
