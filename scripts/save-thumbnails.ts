import { mkdir, writeFile } from 'node:fs/promises';
import { cloudName, media } from '../src/lib/media/registry.ts';

if (!process.argv.includes('--confirm-core-quota'))
	throw new Error('Pass --confirm-core-quota for five fixed thumbnail requests.');
await mkdir('static/demo/thumbnails', { recursive: true });
for (const [id, asset] of Object.entries(media)) {
	const url = `https://res.cloudinary.com/${cloudName}/image/upload/c_limit,w_160/f_webp/q_80/v${asset.version}/${asset.publicId}.jpg`;
	const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
	if (!response.ok || !response.headers.get('content-type')?.startsWith('image/'))
		throw new Error(`Thumbnail failed: ${id}`);
	await writeFile(`static/demo/thumbnails/${id}.webp`, Buffer.from(await response.arrayBuffer()));
	console.log(`Saved ${id} thumbnail`);
}
