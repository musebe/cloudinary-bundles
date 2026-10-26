# Build log

## 2026-10-26: foundation

- Created `/Users/eugenemusebe/Desktop/Articles/cloudinary-bundles` as a separate project. Existing articles and the paused Jev project are unchanged.
- Scaffolded with the current official Svelte CLI: minimal TypeScript template, Prettier, ESLint, unit tests, Playwright, and the Vercel adapter.
- Checked the connected Cloudinary product environment’s Free-plan allowance before planning bounded core operations. No paid AI operation is enabled.
- Recorded the scope, proof boundary, and checkpoint plan in `build-brief.md`.
- Foundation validation: `pnpm check` passed with zero errors or warnings, and `pnpm build` compiled the Vercel output successfully.
- Validation results will be recorded after each implementation stage; no unrun checks are marked as passing.

## 2026-10-26: bundle contract and media

- Added three fictional bundle manifests, a strict Zod recipe schema, and named failure codes for SKU/revision/component/quantity mismatches.
- Executed all 30 logical contract cases. No case failed. These do not measure visual-recognition accuracy.
- Verified five photo source pages and licenses; stored original downloads under `assets/source`, outside the served static files.
- Uploaded five photographs and one canvas through scoped MCP signatures into the new `bundle-studio/v1/` namespace. Verified absence before upload, then read all six assets back. No existing asset was replaced.
- Resolved slash characters in raw transformation labels being interpreted as chain separators. Generated and inspected three real Cloudinary WebP composites at 1200 × 1000.
- Saved outputs: Camera Only 39,908 bytes; Starter Kit 47,638 bytes; Creator Kit 85,080 bytes. File hashes and transformation evidence are in `src/lib/media/saved-outputs.json`.
- Added five small locally served Cloudinary thumbnails. Public visits do not download the full-size originals.

## 2026-10-26: interactive demo

- Added immediate first-load preview, package switching, included quantities, optional accessories, manifest download, and server-verified image download.
- Added an intentionally incorrect recipe, reset, failure feedback, strict bounded API input, stale-request protection, and disabled export on errors.
- Added project documentation and visible photo-license credits. Fonts are self-hosted, with no external runtime font request.
- Initial validation passed: 23 unit tests and 11 production-preview browser tests, including mobile overflow and all delivered-image dimensions. Final lint/build checks are recorded after the final edits.

## 2026-10-26: final local verification

- `pnpm lint`: passed, including formatting and the recommended Svelte navigation/key rules.
- `pnpm check`: zero errors and zero warnings.
- `pnpm test:unit --run`: 23 tests passed. The logical 30-case dataset also reports 30 expected outcomes and zero failures.
- `pnpm test:e2e`: all 11 tests passed against the production build and preview. This also compiled the Vercel adapter output successfully.
- Final browser checks cover oversized JSON with a clean HTTP 413, malformed input, non-JSON service failures, stale responses, saved-image natural dimensions, all packages, downloads, credits, and 390px mobile overflow.
- Fixed a request-stream cancellation causing a socket reset before the HTTP 413 response. The oversized-request test now passes.
- Fixed the font package entry points and switched to locally bundled fonts. Final screenshots were inspected on desktop and mobile.
- Local homepage returns HTTP 200; `/api/health` reports three saved outputs, 30 contract cases, and zero failed cases. `.env.local` is ignored by Git.
- Local demo runs at `http://localhost:5178`. No GitHub repository or Vercel deployment has been created for this project yet.
