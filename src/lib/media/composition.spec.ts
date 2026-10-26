import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { bundles } from '../bundles/catalog';
import { createRecipe, validateRecipe } from '../bundles/policy';
import { createComposition } from './composition';
import savedOutputs from './saved-outputs.json';

describe('saved compositions', () => {
	it('renders only validated recipe identifiers', () => {
		expect(() =>
			createComposition(bundles[0], { ...createRecipe(bundles[0]), sku: 'OTHER' })
		).toThrow('Invalid bundle composition');
	});
	for (const bundle of bundles) {
		it(`matches the current ${bundle.id} manifest and saved bytes`, () => {
			const saved = savedOutputs.find((output) => output.bundleId === bundle.id)!;
			const bytes = readFileSync(`static${saved.localPath}`);
			expect(validateRecipe(bundle, saved.recipe).valid).toBe(true);
			expect(saved.transformation).toBe(createComposition(bundle).transformation);
			expect(createHash('sha256').update(bytes).digest('hex')).toBe(saved.sha256);
			expect(bytes.length).toBe(saved.bytes);
		});
	}
	it('repeats the card layer for the two-card package', () => {
		expect(
			createComposition(bundles[2]).transformation.match(
				/l_bundle-studio:v1:components:memory-card/g
			)
		).toHaveLength(2);
	});
});
