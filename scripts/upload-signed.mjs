// Operator-only helper. Accept a short-lived MCP signing response on stdin.
// Never persist the signing payload or include this script in a web endpoint.
import { readFile } from 'node:fs/promises';

let input = '';
for await (const chunk of process.stdin) input += chunk;
const credentials = JSON.parse(input);
const uploaded = [];
for (const credential of credentials) {
	if (
		credential.upload_params.overwrite !== false &&
		credential.upload_params.overwrite !== 'false'
	)
		throw new Error(
			'Refusing a signature that allows overwrites. Request a new overwrite:false signature.'
		);
	if (credential.host !== 'api.cloudinary.com') throw new Error('Unexpected upload host');
	const id = credential.upload_params.public_id.split('/').at(-1);
	if (!credential.upload_params.public_id.startsWith('bundle-studio/v1/'))
		throw new Error('Asset is outside this project namespace');
	if (!['camera', 'memory-card', 'strap', 'tripod', 'bag', 'canvas'].includes(id))
		throw new Error('Unknown fixture');
	const path = id === 'canvas' ? 'static/demo/canvas.svg' : `assets/source/${id}.jpg`;
	const form = new FormData();
	for (const [key, value] of Object.entries(credential.upload_params))
		form.append(key, String(value));
	form.append('api_key', credential.api_key);
	form.append('signature', credential.signature);
	form.append(
		'file',
		new Blob([await readFile(path)]),
		id === 'canvas' ? 'canvas.svg' : `${id}.jpg`
	);
	const response = await fetch(
		`https://${credential.host}/v1_1/${credential.cloud_name}/image/upload`,
		{ method: 'POST', body: form, signal: AbortSignal.timeout(45000) }
	);
	const result = await response.json();
	if (!response.ok || result.error)
		throw new Error(`Upload failed for ${id}: ${result.error?.message ?? response.status}`);
	uploaded.push({
		id,
		assetId: result.asset_id,
		publicId: result.public_id,
		version: result.version,
		width: result.width,
		height: result.height,
		format: result.format,
		bytes: result.bytes,
		url: result.secure_url
	});
}
console.log(JSON.stringify(uploaded));
