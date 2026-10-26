import { error } from '@sveltejs/kit';
import { createHash } from 'node:crypto';
import { getStudioData } from '#lib/server/studio.ts';
import savedOutputs from '#lib/media/saved-outputs.json';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, fetch }) => {
	const bundle = getStudioData().bundles.find((entry) => entry.id === params.bundleId);
	const saved = savedOutputs.find((entry) => entry.bundleId === params.bundleId);
	if (!bundle || !saved) error(404, 'Bundle not found');
	if (!bundle.previewUrl) error(409, 'Recreate this output from the current manifest.');
	const response = await fetch(saved.localPath);
	if (!response.ok) error(503, 'Saved output is unavailable.');
	const bytes = await response.arrayBuffer();
	if (createHash('sha256').update(Buffer.from(bytes)).digest('hex') !== saved.sha256)
		error(409, 'Saved output verification failed.');
	return new Response(bytes, {
		headers: {
			'content-type': 'image/webp',
			'content-disposition': `attachment; filename="${bundle.id}.webp"`,
			'cache-control': 'no-store',
			'x-content-type-options': 'nosniff'
		}
	});
};
