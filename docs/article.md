# Product Bundle Images With SvelteKit and Cloudinary: Show What’s Included

To generate product bundle images that match each stock-keeping unit (SKU), start with a versioned list of included items and quantities. An image recipe records the selected SKU, revision, component identifiers, and quantities. Validate that recipe against the package definition, then use Cloudinary image and text layers to compose reviewed product photographs. Keep optional accessories separate, and withhold the application's export when its saved recipe no longer matches the package.

In this tutorial, you will connect that workflow to a SvelteKit storefront preview. Selecting **Camera Only**, **Starter Kit**, or **Creator Kit** changes the pictured components and the accompanying contents list. Creator Kit includes two memory cards, so its image contains two card photographs, not one photograph with an ambiguous label.

[Try Bundle Studio](https://cloudinary-bundles.vercel.app/) · [Explore the source on GitHub](https://github.com/musebe/cloudinary-bundles)

The demo includes three real Cloudinary-rendered images and a reproducible 30-case validation report. Visitors can inspect the results without uploading an image, entering credentials, or running a paid inference service.

## Why the image has to follow the package

A product image can create the wrong expectation when it shows accessories that are not included with the selected package. A camera beside a tripod may look like a kit even when the tripod is sold separately. A specification table elsewhere on the page does not necessarily correct that first impression.

[Baymard's research on included and optional accessories](https://baymard.com/research-articles/included-accessories-image), published in February 2019, describes shoppers inferring package contents from gallery images and overlooking accessory information elsewhere. That historical usability finding motivates this implementation; it is not evidence that this demo reduces returns or increases conversion.

The engineering problem is keeping the image and the package definition together. Instead of manually maintaining an unrelated graphic for every kit, make the composition depend on the same item identifiers and quantities that describe the offer.

Cloudinary's [Svelte online-store transformation tutorial](https://cloudinary.com/blog/5-ways-transform-images-svelte-online-store) covers image effects and overlays. Here, the additional constraint is package correctness: the composition must agree with a declared SKU and revision before it becomes an exportable example.

## What the demo proves

Bundle Studio turns three fictional package definitions into three distinct images. These are educational examples, not real offers or compatibility recommendations.

| Package     | SKU              | Included items                                               | Individual items |
| ----------- | ---------------- | ------------------------------------------------------------ | ---------------: |
| Camera Only | `DEMO-CAM-01`    | Camera × 1                                                   |                1 |
| Starter Kit | `DEMO-START-01`  | Camera × 1, memory card × 1, strap × 1                       |                3 |
| Creator Kit | `DEMO-CREATE-01` | Camera × 1, memory card × 2, strap × 1, tripod × 1, case × 1 |                6 |

Open the demo and switch packages. Compare the image with **Inside this box**, then inspect **Sold separately** for optional accessories. Select **Try an incorrect recipe** to see a blocked result. For Camera Only and Starter Kit, the example adds an optional accessory; for Creator Kit, it changes two memory cards to one.

The incorrect recipe is never rendered. The valid preview remains visible while the interface disables export and explains the mismatch. **Reset to current recipe** restores the valid state.

![Cloudinary-rendered Creator Kit image showing a camera, two memory cards, a neck strap, a tripod photograph, and a camera case](https://res.cloudinary.com/musimbi/image/upload/v1793021843/bundle-studio/v1/article/creator-kit-2026-10-26.webp)

_Creator Kit: five component types, six individual items, rendered at 1200 × 1000. Composite: CC BY-SA 4.0. Photos by VSchagow, Ente75, Lordcolus, David Adam Kess, and Tiia Monto; [full attribution, source licenses, and changes](https://cloudinary-bundles.vercel.app/docs#credits)._

## Follow the contents from catalog to image

The catalog determines what belongs in a package. Cloudinary renders the supplied photographs; it does not infer package contents.

```text
Versioned SKU contents + reviewed component-photo registry
  → validate recipe identifiers and quantities
  → expand quantities into image layers
  → render image and text layers in Cloudinary
  → save WebP bytes, recipe, transformation, and checksum
  → load the matching image in SvelteKit
  → verify saved bytes before attachment download
```

There are two execution paths. An operator prepares the three compositions using Cloudinary. Public visitors browse the saved results through SvelteKit. This separation keeps the working example available without giving visitors an upload endpoint or an arbitrary transformation service.

## Prerequisites and local setup

Use Node.js 24 and pnpm 10 to run the finished project:

```bash
git clone https://github.com/musebe/cloudinary-bundles.git
cd cloudinary-bundles
pnpm install
pnpm dev --port 5178
```

Open the local address printed by the development server. The first saved image loads immediately. The repository includes the photographs' attribution, saved composites, thumbnails, and self-hosted fonts.

The verified build uses SvelteKit 3.1.0, Svelte 5.57.2, and Cloudinary's Node.js SDK 2.11.0. The lockfile records the resolved dependencies.

**No Cloudinary credentials are required to browse the included examples.** The public asset registry already identifies the images used to render them. To switch Cloudinary product environments, replace the registry's cloud name and asset references; an environment variable alone does not change them.

To use your own product photographs, you need a Cloudinary product environment with available core usage allowance. This workflow uses no beta feature, paid inference, or add-on. Storage, transformations, and Cloudinary delivery still consume normal quota; check your account's [billing and plan details](https://cloudinary.com/documentation/billing_and_plans).

## Prepare reviewed component photographs

The photo registry maps each known component to its Cloudinary public ID and records its asset ID, version, dimensions, author, and license. A public ID is the identifier used in the delivery recipe; it is not an API credential.

The demo's six assets are one canvas and five photographs under the `bundle-studio/v1/` namespace. During preparation, each asset was read back through the Cloudinary management integration to check the persisted identity and dimensions. The [Cloudinary workflow notes](https://github.com/musebe/cloudinary-bundles/blob/main/docs/cloudinary-workflow.md) record that preparation separately from public runtime behavior.

For your own catalog, upload authorized photographs and the included [canvas SVG](https://github.com/musebe/cloudinary-bundles/blob/main/static/demo/canvas.svg) into your product environment, then update [`registry.ts`](https://github.com/musebe/cloudinary-bundles/blob/main/src/lib/media/registry.ts) with the corresponding identifiers. Cloudinary's [Node.js SDK documentation](https://cloudinary.com/documentation/node_integration) explains upload configuration and server-side credentials. Keep an API secret out of browser code and source control. Public delivery-URL generation does not require that secret.

Human review must establish what each photograph depicts. The camera photograph includes its fitted wrist loop; the separate strap component means a neck strap. The tripod photograph includes studio surroundings, not additional package components. For a real storefront, prepare isolated, SKU-accurate photographs rather than relying on labels to explain distracting background objects.

## Define included items separately from optional accessories

The bundle manifest is the package definition. It contains a SKU, revision, included components, and a separate optional-accessory list.

Creator Kit's included-items section looks like this:

```typescript
contents: [
  { componentId: 'camera', quantity: 1 },
  { componentId: 'memory-card', quantity: 2 },
  { componentId: 'strap', quantity: 1 },
  { componentId: 'tripod', quantity: 1 },
  { componentId: 'bag', quantity: 1 }
],
optional: []
```

The complete [`catalog.ts`](https://github.com/musebe/cloudinary-bundles/blob/main/src/lib/bundles/catalog.ts) defines all three packages. Camera Only lists the four accessories as optional. Starter Kit includes the card and strap, leaving the tripod and case optional.

Only `contents` enters the composition recipe. Optional products can appear in a separate HTML section, but they cannot silently become part of the included-items image.

For a production catalog, source these declarations from your product system rather than maintaining a second, unrelated list inside the image service. Change the bundle revision when the package changes so previously saved compositions can be recognized as stale.

## Reject inconsistent recipes before composition

The validator checks structure first and package agreement second. A recipe must contain recognized component identifiers and bounded whole-number quantities; it must also match the selected SKU's declared contents.

The structural check uses a strict Zod schema:

```typescript
const recipeSchema = z.strictObject({
	sku: z.string().min(1).max(80),
	bundleVersion: z.string().min(1).max(40),
	items: z
		.array(
			z.strictObject({
				componentId: z.enum(componentIds),
				quantity: z.number().int().min(1).max(10)
			})
		)
		.min(1)
		.max(10)
});
```

Strict objects reject extra fields rather than accepting an unexpected transformation or remote URL. The remainder of [`validateRecipe`](https://github.com/musebe/cloudinary-bundles/blob/main/src/lib/bundles/policy.ts) checks the SKU, bundle revision, missing components, extra components, duplicate entries, and exact quantities.

There is a reason to reject duplicates instead of merging them: two entries for one component can hide an upstream data error. The recipe should express two cards as one component with `quantity: 2`.

The composition function calls the validator before constructing a Cloudinary URL. Browser input is even narrower: [`POST /api/validate`](https://github.com/musebe/cloudinary-bundles/blob/main/src/routes/api/validate/%2Bserver.ts) accepts only a known bundle ID and a predefined valid or incorrect scenario. It is a demonstration endpoint, not a general-purpose recipe editor.

## Compose the photographs with Cloudinary layers

Cloudinary places each included item onto a shared canvas. The composition expands quantities into individual units, making the two-card package visually different from a one-card package:

```typescript
const validation = validateRecipe(bundle, input);
if (!validation.valid) throw new Error('Invalid bundle composition');
const units = input.items.flatMap((item) =>
	Array.from({ length: item.quantity }, () => item.componentId)
);
```

Each unit becomes an image layer. The fixed layout gives a single camera a larger rectangle; multi-item packages use a three-column grid. The following excerpt applies one photograph and its label:

```typescript
return [
	`l_${media[id].publicId.replaceAll('/', ':')}`,
	`b_white,c_pad,h_${height},w_${width}`,
	`fl_layer_apply,g_north_west,x_${x},y_${y}`,
	...textLayer(componentLabel(id), single ? 28 : 22, x, y + height + 18)
];
```

The `l_` component opens an overlay. Forward slashes in its public ID become colons. `fl_layer_apply` closes the layer definition, while northwest gravity and offsets determine placement. These are Cloudinary's [image-layer](https://cloudinary.com/documentation/layers) and [layer-placement](https://cloudinary.com/documentation/image_layer_placement) conventions.

The `c_pad` resize mode fits the photograph into its rectangle while preserving its aspect ratio and adding padding. It does not remove background objects. See Cloudinary's [resize and crop modes](https://cloudinary.com/documentation/resizing_and_cropping) when choosing between preserving a full photograph and cropping it to fill a space.

Text layers add the package name, SKU, revision, total item count, and component names. The final chain uses `f_webp` and `q_85`, then the SDK constructs a delivery URL:

```typescript
const url = cloudinary.url(canvas.publicId, {
	cloud_name: cloudName,
	secure: true,
	version: canvas.version,
	transformation: [{ raw_transformation: transformation }]
});
```

The complete [`composition.ts`](https://github.com/musebe/cloudinary-bundles/blob/main/src/lib/media/composition.ts) contains the layout and text helper. Labels are controlled catalog values, not arbitrary visitor input. If you expand them to accept free-form product text, handle Cloudinary's [special-character encoding rules](https://cloudinary.com/documentation/image_text_layers#special_characters), including double-encoding where required. During this build, slash characters in raw text labels caused transformation-chain parsing errors; the fixed labels were corrected before the outputs were saved.

An explicit format and quality produce one defined export representation. Automatic format selection can suit browser delivery, but this example saves a specific WebP file and its checksum. It does not use `f_auto`.

## Save the rendered images with their evidence

The operator script requests the three fixed compositions and saves the returned files. To recreate them deliberately, run:

```bash
pnpm demo:save --confirm-core-quota
```

This command requests existing public Cloudinary assets and consumes normal quota. It replaces the generated local outputs and evidence record; it does not upload new source photographs. Skip it when you only want to browse the included demo.

[`save-demo.ts`](https://github.com/musebe/cloudinary-bundles/blob/main/scripts/save-demo.ts) checks the response, enforces a 4 MB saved-output bound, and records the recipe, transformation, URL, timestamp, byte length, and SHA-256 checksum. The three files live in `static/demo/outputs`; the evidence lives in [`saved-outputs.json`](https://github.com/musebe/cloudinary-bundles/blob/main/src/lib/media/saved-outputs.json).

This is a snapshot of real Cloudinary-rendered output, not a mock rendering. Saving the bytes avoids Cloudinary requests on every package selection. If the catalog or layout changes, regenerate the affected outputs and review the differences before publishing the changed project.

## Connect the saved outputs to SvelteKit

SvelteKit loads the catalog and matching output records on the server. The page's server loader is short:

```typescript
import { getStudioData } from '#lib/server/studio.ts';
export const load = () => getStudioData();
```

Inside [`getStudioData`](https://github.com/musebe/cloudinary-bundles/blob/main/src/lib/server/studio.ts), an output is current only if its SKU, bundle revision, validated recipe, and transformation match the current definitions. A stale record receives no preview or export URL.

The component tracks the selected package with Svelte 5 state:

```typescript
let { data }: { data: StudioData } = $props();
let selectedId = $state('camera-only');
let selected = $derived(data.bundles.find((bundle) => bundle.id === selectedId)!);
```

The first image is available in the server-rendered page. After hydration, selecting another package updates the local selection, image, contents, and optional-accessory list. SvelteKit's [routing documentation](https://svelte.dev/docs/kit/routing) explains the page/server separation; its [project structure](https://svelte.dev/docs/kit/project-structure) explains the `static/` files served unchanged.

[`BundleStudio.svelte`](https://github.com/musebe/cloudinary-bundles/blob/main/src/lib/components/BundleStudio.svelte) also handles image failures, unavailable validation, and out-of-order responses. If a visitor starts a check and then switches packages, an older response cannot overwrite the new selection's state.

The interface uses real buttons, `aria-pressed` for selection, contextual image alternatives, and an HTML contents list. Package information does not exist only as text baked into an image. These are useful accessibility measures, not a claim of complete accessibility compliance.

## Verify the saved bytes before downloading

The export endpoint checks the current package record, reads its saved image, and compares its SHA-256 digest with the evidence record before returning an attachment:

```typescript
const response = await fetch(saved.localPath);
if (!response.ok) error(503, 'Saved output is unavailable.');
const bytes = await response.arrayBuffer();
if (createHash('sha256').update(Buffer.from(bytes)).digest('hex') !== saved.sha256)
	error(409, 'Saved output verification failed.');
return new Response(bytes, {
	headers: {
		'content-type': 'image/webp',
		'content-disposition': `attachment; filename="${bundle.id}.webp"`,
		'cache-control': 'no-store',
		'x-content-type-options': 'nosniff'
	}
});
```

See the complete [SvelteKit export endpoint](https://github.com/musebe/cloudinary-bundles/blob/main/src/routes/api/bundles/%5BbundleId%5D/export/%2Bserver.ts) for the preceding catalog checks.

A checksum proves that the downloaded bytes agree with the saved record. It does not identify the objects in a photograph, prove the record's authenticity against a malicious operator, or protect a public image from access.

That last distinction matters when testing the incorrect example. Its export button is disabled, but a direct request to an export route still returns the known-valid saved package. The route does not receive or export the simulated invalid recipe. This is composition consistency, not authorization.

## Test the contract and inspect the results

The reproducible report tests whether known recipe changes produce the expected decisions. On October 26, 2026, `bundle-contract-v1` passed all 30 cases: four accepted recipes and 26 rejected mutations.

The cases are generated from three authored package definitions. They are not 30 photographs, independent customer observations, or a precision-and-recall evaluation.

| Test group                                                  |  Cases | Expected behavior                          | Passed |
| ----------------------------------------------------------- | -----: | ------------------------------------------ | -----: |
| Current package recipe                                      |      3 | Accept                                     |      3 |
| Optional accessory incorrectly included                     |      2 | Reject the extra component                 |      2 |
| Reordered included components                               |      1 | Accept unchanged membership and quantities |      1 |
| Missing camera                                              |      3 | Reject missing or empty contents           |      3 |
| Wrong quantity                                              |      3 | Reject quantity mismatch                   |      3 |
| Wrong SKU                                                   |      3 | Reject SKU mismatch                        |      3 |
| Stale revision                                              |      3 | Reject outdated bundle version             |      3 |
| Duplicate component                                         |      3 | Reject repeated component entries          |      3 |
| Unknown component, fractional quantity, or unexpected field |      9 | Reject invalid structure                   |      9 |
| **Total**                                                   | **30** | **4 accepted; 26 rejected**                | **30** |

For Camera Only, removing the camera leaves an empty list and produces `invalid_recipe`. The larger packages produce `missing_component`. The report checks these distinct expected results rather than assuming every invalid input fails for the same reason.

Read the [benchmark implementation](https://github.com/musebe/cloudinary-bundles/blob/main/src/lib/bundles/benchmark.ts) or [download the executable report's results](https://cloudinary-bundles.vercel.app/api/benchmark).

The saved-image evidence is separate:

| Output      | Dimensions  | Format | Saved bytes |
| ----------- | ----------- | ------ | ----------: |
| Camera Only | 1200 × 1000 | WebP   |      39,908 |
| Starter Kit | 1200 × 1000 | WebP   |      47,638 |
| Creator Kit | 1200 × 1000 | WebP   |      85,080 |

All three production export downloads matched their recorded checksums. The automated suite passed 23 unit tests and 11 production-preview browser tests, covering package switching, invalid examples, request races, errors, downloads, credits, and mobile overflow. Production browser checks also confirmed that browsing these saved examples made no Cloudinary request.

To reproduce the local checks:

```bash
pnpm check
pnpm lint
pnpm test:unit --run
pnpm exec playwright install chromium
pnpm test:e2e
```

The browser suite builds the application before running the production preview. For a public smoke check, inspect the [JSON health endpoint](https://cloudinary-bundles.vercel.app/api/health); it reports saved-output records and contract results, not a live Cloudinary credential check or an inspection of every file's bytes.

## Limitations and production choices

The pattern is useful when reviewed component photos and authoritative package data already exist. Its guarantees stop at the boundaries of those inputs.

- **Source identity needs review.** Schema validation cannot discover that a camera case was mislabeled as a tripod, remove unwanted background objects, or establish accessory compatibility and physical scale.
- **The layout is fixture-sized.** The grid supports these one-, three-, and six-unit compositions. The schema's broader quantity bounds do not guarantee a readable image for every valid catalog you might introduce. Add layout-capacity checks before supporting larger packages.
- **Source replacements affect future renders.** The registry records component versions, but the overlay chain uses their public IDs without those versions. The canvas is versioned. Saved project files preserve this result; use revision-specific component public IDs for a production workflow and do not overwrite reviewed source identities.
- **Saved files need a refresh process.** Connect catalog changes to regeneration and human review. An unchanged revision with incorrectly edited product data remains an upstream governance problem.
- **Public examples are not protected assets.** The demo has no login, private-media policy, commerce backend, inventory integration, or checkout. Add those boundaries where your application requires them.
- **Explainer images are not automatically feed images.** Google's [primary-image requirements](https://support.google.com/merchants/answer/6324350?hl=en) restrict added text and graphics. Its [additional-image guidance](https://support.google.com/merchants/answer/6324370?hl=en) distinguishes full-bundle and component views but does not exempt every annotation. Prepare a separate feed-appropriate representation and assess it against current requirements.
- **Licenses and quota still apply.** Retain the [photo attribution and changes notice](https://github.com/musebe/cloudinary-bundles/blob/main/docs/asset-sources.md) when reusing the composites. Core Cloudinary operations consume allowance even though this workflow needs no paid AI service.

## Conclusion

Treat a bundle image as a rendered view of declared package contents, not a separate graphic that can drift away from the offer. SvelteKit connects the selection to the image and readable contents; Cloudinary composes the photographs; validation checks the SKU, revision, membership, and quantities.

The reusable result is that chain of agreement. Reviewed source photos and accurate catalog data remain essential, while saved output records and verified downloads make the shipped example inspectable and reproducible.

## Frequently asked questions

### How can I generate product bundle images for different SKUs?

Define each SKU's included items and quantities, validate a composition recipe against that definition, and map the approved component identifiers to reviewed Cloudinary photographs. Apply one image layer per included unit, then add package labels and save the result with its recipe.

### How do I distinguish included accessories from optional extras?

Store included and optional items separately. Render only included items into the package composition, and display optional products in a clearly labeled HTML section. In this demo, adding an optional accessory to a package recipe fails validation.

### Does Cloudinary decide which products belong in a bundle?

No. The catalog defines membership and quantities. Cloudinary renders the supplied image and text layers. A person must verify the catalog and confirm that each source photograph depicts the intended component.

### Can I try the demo without Cloudinary credentials or image generation?

Yes. The three Cloudinary-rendered outputs are saved with the project and load without new Cloudinary requests. Credentials are needed only for separate operations such as uploading or managing your own source assets, not for viewing these public examples.

### What happens when the package contents change?

Update the catalog and its bundle revision, regenerate the composition, and review the saved result. The server withholds its normal preview and export URLs when the saved SKU, revision, recipe, or transformation no longer matches the current definitions.

### Does passing the 30-case report prove the image is correct?

No. It proves that the authored recipe cases produce their expected validation outcomes. It does not measure object recognition, verify source-photo identity, establish commercial compatibility, or demonstrate improved sales or fewer returns.
