# Bundle Studio

SKU-specific product bundle images with SvelteKit and Cloudinary. Switch packages to see which components and quantities are included, with optional accessories listed separately.

The project includes three real Cloudinary-rendered examples. They load immediately without API credentials, new uploads, or image generation.

[Live demo](https://cloudinary-bundles.vercel.app/) · [Project docs](https://cloudinary-bundles.vercel.app/docs) · [GitHub](https://github.com/musebe/cloudinary-bundles)

## Run locally

Use Node.js 24 and pnpm 10. The same Node version is pinned for Vercel.

```bash
pnpm install
pnpm dev --port 5178
```

Open [localhost:5178](http://localhost:5178). Project documentation is at `/docs`; the JSON health check is at `/api/health`.

## Try the demo

1. Switch between **Camera Only**, **Starter Kit**, and **Creator Kit**.
2. Compare the image with **Inside this box**. Creator Kit includes two memory cards.
3. Select **Try an incorrect recipe**. The interface reports the mismatch and disables export. The preview stays on the last valid image.
4. Select **Reset to current recipe**, then download the image or package manifest.
5. Download the 30-case report from **Reproducible proof**.

These are fictional educational packages, not actual offers or compatibility recommendations.

## How it works

```text
Versioned SKU contents + reviewed component photographs
  → strict recipe validation
  → Cloudinary image and text composition
  → saved WebP + source recipe + SHA-256 checksum
  → SvelteKit preview and verified download
```

Cloudinary rendered the images using core transformations. Originals remain in the `bundle-studio/v1/` namespace. Delivered project copies live in `static/demo/outputs`, so ordinary visits make no Cloudinary requests. Fonts and thumbnails are served locally too.

The server checks an export against the current SKU, revision, recipe, transformation, and saved bytes. This is a composition contract, not private-media protection: educational examples are intentionally public.

## Important files

| File                                                  | Purpose                                                     |
| ----------------------------------------------------- | ----------------------------------------------------------- |
| `src/lib/bundles/catalog.ts`                          | Package contents, quantities, optional items, and revisions |
| `src/lib/bundles/policy.ts`                           | Strict fail-closed recipe validation                        |
| `src/lib/bundles/benchmark.ts`                        | Thirty reproducible logical test cases                      |
| `src/lib/media/registry.ts`                           | Public Cloudinary references and photo attribution          |
| `src/lib/media/composition.ts`                        | Fixed image and text overlay recipes                        |
| `src/lib/media/saved-outputs.json`                    | Recipes, transformation URLs, timestamps, and checksums     |
| `src/lib/components/BundleStudio.svelte`              | Preview and validation states                               |
| `src/routes/api/bundles/[bundleId]/export/+server.ts` | Verified saved-image download                               |
| `assets/source`                                       | Licensed originals, not served as website static files      |

## Checks

```bash
pnpm check
pnpm lint
pnpm test:unit --run
pnpm exec playwright install chromium
pnpm test:e2e
pnpm build
```

Browser tests build and run the production preview. They cover first-load images, all packages, invalid examples, request races, API failures, mobile overflow, credits, JSON endpoints, and downloads.

The 30-case report tests declared package data, not image-recognition accuracy. A human must verify source photographs. No claims about reduced returns or increased conversion are made.

## Cloudinary and environment variables

No environment variables are required for included examples. `.env.example` lists optional server-only credentials for future operator provisioning. Never expose secrets through public variables or commit `.env.local`.

The saved examples use the public asset registry in `src/lib/media/registry.ts`. Copying credentials from another Cloudinary product environment does not move or change those examples. Do not assume credentials for one cloud can manage another cloud’s assets.

Recreate three fixed compositions from the public registry:

```bash
pnpm demo:save --confirm-core-quota
```

This overwrites generated local demo outputs and their evidence record. It downloads three fixed Cloudinary transformations and consumes normal quota. It does not upload or overwrite Cloudinary source assets. Review changes and rerun tests afterward.

Use `pnpm demo:thumbnails --confirm-core-quota` only to recreate the five small thumbnails. Public visitors cannot submit arbitrary transformations, uploads, or generation requests. No paid inference or background-removal service is required; core usage still counts toward quota.

## Image licensing and limitations

Photo attribution and license links appear in [Photo sources](docs/asset-sources.md) and `/docs#credits`. Composite images are offered under CC BY-SA 4.0; originals retain their listed licenses. Keep credits and indicate changes when reusing them.

The camera photo includes a fitted wrist loop; the separate strap is a neck strap. Only the foreground tripod is the named component, not surrounding studio equipment. Images do not establish physical scale or compatibility. Annotated explainers are not automatically eligible shopping-feed main images.

## Build documentation

- [Build brief](docs/build-brief.md)
- [Build log](docs/build-log.md)
- [Cloudinary workflow](docs/cloudinary-workflow.md)
- [Photo sources and licenses](docs/asset-sources.md)
- [Article handoff](docs/article-handoff.md)
