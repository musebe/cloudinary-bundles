import { json } from '@sveltejs/kit';
import { runBenchmark } from '#lib/bundles/benchmark.ts';
export const GET = () =>
	json(runBenchmark(), {
		headers: { 'content-disposition': 'attachment; filename="bundle-contract-v1.json"' }
	});
