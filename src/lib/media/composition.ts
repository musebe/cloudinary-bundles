import { v2 as cloudinary } from 'cloudinary';
import { componentLabel } from '../bundles/catalog';
import { createRecipe, validateRecipe } from '../bundles/policy';
import type { Bundle, Recipe } from '../bundles/types';
import { canvas, cloudName, media } from './registry';

const textLayer = (text: string, size: number, x: number, y: number) => [
	`co_rgb:222222,l_text:Arial_${size}:${encodeURIComponent(text)}`,
	`fl_layer_apply,g_north_west,x_${x},y_${y}`
];

/** Only catalog-validated identifiers and labels can reach the delivery recipe. */
export function createComposition(bundle: Bundle, input: Recipe = createRecipe(bundle)) {
	const validation = validateRecipe(bundle, input);
	if (!validation.valid) throw new Error('Invalid bundle composition');
	const units = input.items.flatMap((item) =>
		Array.from({ length: item.quantity }, () => item.componentId)
	);
	const layers = units.flatMap((id, index) => {
		const single = units.length === 1;
		const x = single ? 150 : 50 + (index % 3) * 380;
		const y = single ? 180 : 180 + Math.floor(index / 3) * 340;
		const width = single ? 900 : 340;
		const height = single ? 570 : 250;
		return [
			`l_${media[id].publicId.replaceAll('/', ':')}`,
			`b_white,c_pad,h_${height},w_${width}`,
			`fl_layer_apply,g_north_west,x_${x},y_${y}`,
			...textLayer(componentLabel(id), single ? 28 : 22, x, y + height + 18)
		];
	});
	const transformation = [
		'c_fit,h_1000,w_1200',
		...textLayer(`${bundle.label} | What's included`, 38, 50, 45),
		...textLayer(`${bundle.sku} - revision ${bundle.version} - ${units.length} items`, 22, 50, 105),
		...layers,
		...textLayer('Illustrative bundle. Not a real offer or a compatibility claim.', 19, 50, 905),
		...textLayer('Photo credits in project docs | Composite: CC BY-SA 4.0', 19, 50, 940),
		'f_webp',
		'q_85'
	].join('/');
	const url = cloudinary.url(canvas.publicId, {
		cloud_name: cloudName,
		secure: true,
		version: canvas.version,
		transformation: [{ raw_transformation: transformation }]
	});
	return { url, transformation, recipe: input, width: 1200, height: 1000 };
}
