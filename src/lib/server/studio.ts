import { bundles, componentLabel } from '#lib/bundles/catalog.ts';
import { runBenchmark } from '#lib/bundles/benchmark.ts';
import { createRecipe, validateRecipe } from '#lib/bundles/policy.ts';
import type { StudioData } from '#lib/bundles/view.ts';
import savedOutputs from '#lib/media/saved-outputs.json';
import { createComposition } from '#lib/media/composition.ts';

export function getStudioData(): StudioData {
	return {
		bundles: bundles.map((bundle) => {
			const saved = savedOutputs.find((output) => output.bundleId === bundle.id);
			const current =
				saved &&
				saved.sku === bundle.sku &&
				saved.bundleVersion === bundle.version &&
				validateRecipe(bundle, saved.recipe).valid &&
				saved.transformation === createComposition(bundle).transformation;
			return {
				...bundle,
				contents: bundle.contents.map((item) => ({
					...item,
					label: componentLabel(item.componentId),
					imageUrl: `/demo/thumbnails/${item.componentId}.webp`
				})),
				optional: bundle.optional.map((id) => ({
					componentId: id,
					label: componentLabel(id),
					quantity: 1,
					imageUrl: `/demo/thumbnails/${id}.webp`
				})),
				unitCount: bundle.contents.reduce((total, item) => total + item.quantity, 0),
				previewUrl: current ? saved.localPath : null,
				exportUrl: current ? `/api/bundles/${bundle.id}/export` : null,
				manifestUrl: `/api/bundles/${bundle.id}/manifest`,
				mediaStatus: current ? 'saved-cloudinary' : 'awaiting-assets',
				verifiedAt: current ? saved.verifiedAt : null
			};
		}),
		benchmark: runBenchmark()
	};
}

export function validateDemoScenario(bundleId: string, scenario: 'valid' | 'extra-item') {
	const bundle = bundles.find((entry) => entry.id === bundleId);
	if (!bundle) return null;
	const recipe = createRecipe(bundle);
	const optional = bundle.optional[0];
	const brokenRecipe = optional
		? { ...recipe, items: [...recipe.items, { componentId: optional, quantity: 1 }] }
		: {
				...recipe,
				items: recipe.items.map((item) =>
					item.componentId === 'memory-card' ? { ...item, quantity: 1 } : item
				)
			};
	return validateRecipe(bundle, scenario === 'valid' ? recipe : brokenRecipe);
}
