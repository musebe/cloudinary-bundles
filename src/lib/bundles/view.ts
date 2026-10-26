export type StudioItem = {
	componentId: string;
	label: string;
	quantity: number;
	imageUrl: string;
};

export type StudioBundle = {
	id: string;
	sku: string;
	label: string;
	description: string;
	version: string;
	contents: StudioItem[];
	optional: StudioItem[];
	unitCount: number;
	previewUrl: string | null;
	exportUrl: string | null;
	manifestUrl: string;
	mediaStatus: 'saved-cloudinary' | 'awaiting-assets';
	verifiedAt: string | null;
};

export type StudioData = {
	bundles: StudioBundle[];
	benchmark: { total: number; passed: number; failed: number };
};
