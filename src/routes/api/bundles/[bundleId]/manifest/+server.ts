import { error, json } from '@sveltejs/kit';
import { findBundle } from '#lib/bundles/catalog.ts';
import { createRecipe } from '#lib/bundles/policy.ts';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = ({ params }) => {
	const bundle = findBundle(params.bundleId);
	if (!bundle) error(404, 'Bundle not found');
	return json(createRecipe(bundle), {
		headers: { 'content-disposition': `attachment; filename="${bundle.id}-manifest.json"` }
	});
};
