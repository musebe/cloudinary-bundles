import { z } from 'zod';
import {
	componentIds,
	type Bundle,
	type Recipe,
	type ValidationIssue,
	type ValidationResult
} from './types';

const recipeSchema = z.strictObject({
	sku: z.string().min(1).max(80),
	bundleVersion: z.string().min(1).max(40),
	items: z
		.array(
			z.strictObject({
				componentId: z.enum(componentIds),
				quantity: z.number().int().min(1).max(10)
			})
		)
		.min(1)
		.max(10)
});

export function createRecipe(bundle: Bundle): Recipe {
	return {
		sku: bundle.sku,
		bundleVersion: bundle.version,
		items: bundle.contents.map((item) => ({ ...item }))
	};
}

export function validateRecipe(bundle: Bundle, input: unknown): ValidationResult {
	const parsed = recipeSchema.safeParse(input);
	if (!parsed.success)
		return {
			valid: false,
			issues: [
				{
					code: 'invalid_recipe',
					message:
						'Use known components, whole positive quantities, and only the documented fields.'
				}
			]
		};
	const recipe = parsed.data;
	const issues: ValidationIssue[] = [];
	if (recipe.sku !== bundle.sku)
		issues.push({ code: 'sku_mismatch', message: 'This recipe belongs to a different SKU.' });
	if (recipe.bundleVersion !== bundle.version)
		issues.push({
			code: 'stale_version',
			message: 'The package contents have changed. Recreate this image.'
		});
	const seen = new Set<string>();
	for (const item of recipe.items) {
		if (seen.has(item.componentId))
			issues.push({
				code: 'duplicate_component',
				componentId: item.componentId,
				message: `Duplicate component: ${item.componentId}.`
			});
		seen.add(item.componentId);
		const expected = bundle.contents.find((entry) => entry.componentId === item.componentId);
		if (!expected)
			issues.push({
				code: 'extra_component',
				componentId: item.componentId,
				message: `${item.componentId} is not included in this package.`
			});
		else if (expected.quantity !== item.quantity)
			issues.push({
				code: 'quantity_mismatch',
				componentId: item.componentId,
				message: `${item.componentId} requires quantity ${expected.quantity}, not ${item.quantity}.`
			});
	}
	for (const expected of bundle.contents) {
		if (!seen.has(expected.componentId))
			issues.push({
				code: 'missing_component',
				componentId: expected.componentId,
				message: `The included ${expected.componentId} is missing.`
			});
	}
	return { valid: issues.length === 0, issues };
}
