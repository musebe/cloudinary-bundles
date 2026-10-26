import { json } from '@sveltejs/kit';
import { getStudioData } from '#lib/server/studio.ts';
export const GET = () => {
	const studio = getStudioData();
	const ready = studio.bundles.filter((bundle) => bundle.mediaStatus === 'saved-cloudinary').length;
	return json({
		status: ready === 3 && studio.benchmark.failed === 0 ? 'ok' : 'incomplete',
		savedOutputs: ready,
		contractCases: studio.benchmark.total,
		failedCases: studio.benchmark.failed,
		runtimeCloudinaryWrites: false
	});
};
