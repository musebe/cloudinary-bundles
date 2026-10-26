import type { Bundle, ComponentId } from './types';

export const components: readonly { id: ComponentId; label: string; description: string }[] = [
	{ id: 'camera', label: 'Compact camera', description: 'A camera with an integrated lens.' },
	{ id: 'memory-card', label: 'Memory card', description: 'One individually counted memory card.' },
	{ id: 'strap', label: 'Camera strap', description: 'A separate carrying strap.' },
	{ id: 'tripod', label: 'Tripod', description: 'A separate camera support.' },
	{ id: 'bag', label: 'Camera case', description: 'A protective carrying case.' }
];

export const bundles: readonly Bundle[] = [
	{
		id: 'camera-only',
		sku: 'DEMO-CAM-01',
		label: 'Camera Only',
		version: '1',
		description: 'The camera. Nothing hidden in the fine print.',
		contents: [{ componentId: 'camera', quantity: 1 }],
		optional: ['memory-card', 'strap', 'tripod', 'bag']
	},
	{
		id: 'starter-kit',
		sku: 'DEMO-START-01',
		label: 'Starter Kit',
		version: '1',
		description: 'The camera, a memory card, and a carrying strap.',
		contents: [
			{ componentId: 'camera', quantity: 1 },
			{ componentId: 'memory-card', quantity: 1 },
			{ componentId: 'strap', quantity: 1 }
		],
		optional: ['tripod', 'bag']
	},
	{
		id: 'creator-kit',
		sku: 'DEMO-CREATE-01',
		label: 'Creator Kit',
		version: '1',
		description: 'Five component types. Six individual items.',
		contents: [
			{ componentId: 'camera', quantity: 1 },
			{ componentId: 'memory-card', quantity: 2 },
			{ componentId: 'strap', quantity: 1 },
			{ componentId: 'tripod', quantity: 1 },
			{ componentId: 'bag', quantity: 1 }
		],
		optional: []
	}
];

export function findBundle(id: string) {
	return bundles.find((bundle) => bundle.id === id);
}

export function componentLabel(id: ComponentId) {
	return components.find((component) => component.id === id)!.label;
}
