import { json } from '@sveltejs/kit';
import { z } from 'zod';
import { validateDemoScenario } from '#lib/server/studio.ts';
import type { RequestHandler } from './$types';

const inputSchema = z.strictObject({
	bundleId: z.enum(['camera-only', 'starter-kit', 'creator-kit']),
	scenario: z.enum(['valid', 'extra-item'])
});

async function readBoundedBody(request: Request) {
	const reader = request.body?.getReader();
	if (!reader) return '';
	const decoder = new TextDecoder('utf-8', { fatal: true });
	let size = 0;
	let text = '';
	while (true) {
		const { done, value } = await reader.read();
		if (done) return text + decoder.decode();
		size += value.byteLength;
		if (size > 2048) {
			// Canceling a Node-backed request stream can reset the socket before a 413 is sent.
			reader.releaseLock();
			return null;
		}
		text += decoder.decode(value, { stream: true });
	}
}

export const POST: RequestHandler = async ({ request }) => {
	if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json')
		return json({ error: 'Send JSON.' }, { status: 415 });
	if (Number(request.headers.get('content-length')) > 2048)
		return json({ error: 'Request too large.' }, { status: 413 });
	try {
		const text = await readBoundedBody(request);
		if (text === null) return json({ error: 'Request too large.' }, { status: 413 });
		const parsed = inputSchema.safeParse(JSON.parse(text));
		if (!parsed.success)
			return json({ error: 'Select a known bundle and example.' }, { status: 400 });
		return json(validateDemoScenario(parsed.data.bundleId, parsed.data.scenario), {
			headers: { 'cache-control': 'no-store' }
		});
	} catch {
		return json({ error: 'The request must contain valid JSON.' }, { status: 400 });
	}
};
