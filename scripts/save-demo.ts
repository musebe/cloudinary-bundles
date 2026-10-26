import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { bundles } from '../src/lib/bundles/catalog.ts';
import { createComposition } from '../src/lib/media/composition.ts';

if (!process.argv.includes('--confirm-core-quota'))
	throw new Error(
		'Pass --confirm-core-quota to request exactly three fixed Cloudinary compositions.'
	);
await mkdir('static/demo/outputs', { recursive: true });
const outputs = [];
for (const bundle of bundles) {
	const composition = createComposition(bundle);
	const response = await fetch(composition.url, { signal: AbortSignal.timeout(45000) });
	if (!response.ok || !response.headers.get('content-type')?.startsWith('image/'))
		throw new Error(
			`Cloudinary composition failed for ${bundle.id}: ${response.headers.get('x-cld-error') ?? response.status}`
		);
	const bytes = Buffer.from(await response.arrayBuffer());
	if (bytes.length > 4000000) throw new Error('Output exceeded the 4 MB bound');
	await writeFile(`static/demo/outputs/${bundle.id}.webp`, bytes);
	outputs.push({
		bundleId: bundle.id,
		sku: bundle.sku,
		bundleVersion: bundle.version,
		localPath: `/demo/outputs/${bundle.id}.webp`,
		cloudinaryUrl: composition.url,
		transformation: composition.transformation,
		recipe: composition.recipe,
		width: composition.width,
		height: composition.height,
		bytes: bytes.length,
		sha256: createHash('sha256').update(bytes).digest('hex'),
		verifiedAt: new Date().toISOString()
	});
}
await mkdir('src/lib/media', { recursive: true });
await writeFile('src/lib/media/saved-outputs.json', JSON.stringify(outputs, null, 2) + '\n');
console.log(
	JSON.stringify(outputs.map(({ bundleId, bytes, sha256 }) => ({ bundleId, bytes, sha256 })))
);
