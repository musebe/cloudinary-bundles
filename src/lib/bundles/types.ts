export const componentIds = ['camera', 'memory-card', 'strap', 'tripod', 'bag'] as const;
export type ComponentId = (typeof componentIds)[number];
export type BundleId = 'camera-only' | 'starter-kit' | 'creator-kit';
export type BundleItem = Readonly<{ componentId: ComponentId; quantity: number }>;
export type Bundle = Readonly<{
	id: BundleId;
	sku: string;
	label: string;
	description: string;
	version: string;
	contents: readonly BundleItem[];
	optional: readonly ComponentId[];
}>;
export type Recipe = Readonly<{
	sku: string;
	bundleVersion: string;
	items: readonly BundleItem[];
}>;
export type ValidationIssue = { code: string; message: string; componentId?: string };
export type ValidationResult = { valid: boolean; issues: ValidationIssue[] };
