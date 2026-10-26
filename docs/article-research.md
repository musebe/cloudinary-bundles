# Article research and evidence

Verified October 26, 2026. This document supports the tutorial; it is not part of the published article.

## Brief alignment

The [Google article brief](https://docs.google.com/document/d/1DyMj3qbL9TpEFjtbApiPkoFB_GyYutZWHWKNFnQEU7M/edit) was read through the connected Google Docs tools. Its title is **Product Bundle Images With SvelteKit and Cloudinary: Show What’s Included**. Its objective is SKU-specific images showing included items, quantities, and optional accessories. The implementation follows that deterministic composition scope, not the superseded Jev proposal.

The Google brief's native date chip records October 11, 2026. The plain-text reader omits that chip's value; full native-document readback confirmed it. The local handoff retains that date as historical context, not a new publication commitment.

## Primary sources and claim boundaries

| Source                                                                                                                                                                            | Supported use                                                                                                      | Boundary                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| [Baymard: included and optional accessories](https://baymard.com/research-articles/included-accessories-image)                                                                    | Historical usability observations explain why product images need to distinguish included and optional accessories | Published February 19, 2019. Do not treat its percentages as current return or conversion rates                    |
| [Cloudinary image layers](https://cloudinary.com/documentation/layers)                                                                                                            | Image/text overlays, layer-application boundaries, and colon-separated overlay public IDs                          | Cloudinary renders supplied media; it does not determine package contents                                          |
| [Cloudinary layer placement](https://cloudinary.com/documentation/image_layer_placement)                                                                                          | Gravity and pixel offsets position layers on a base canvas                                                         | Fixed layout is limited to this fixture set                                                                        |
| [Cloudinary text layers](https://cloudinary.com/documentation/image_text_layers)                                                                                                  | Controlled text labels and special-character encoding                                                              | Raw transformation labels need additional encoding for characters such as slashes; the demo uses a fixed label set |
| [Cloudinary resizing and cropping](https://cloudinary.com/documentation/resizing_and_cropping)                                                                                    | Padding preserves the photographed scene while fitting a fixed rectangle                                           | Padding does not remove background objects                                                                         |
| [Cloudinary Node.js SDK](https://cloudinary.com/documentation/node_integration)                                                                                                   | The v2 import and public URL generation without an API secret                                                      | Upload/Admin API credentials remain server-only                                                                    |
| [Cloudinary billing](https://cloudinary.com/documentation/billing_and_plans)                                                                                                      | Core storage, transformations, and delivery consume quota                                                          | No paid inference or add-on is needed; not a promise of unlimited free operation                                   |
| [SvelteKit routing](https://svelte.dev/docs/kit/routing) and [project structure](https://svelte.dev/docs/kit/project-structure)                                                   | Server loading, server endpoints, and static saved files                                                           | The public demo does not regenerate media on selection                                                             |
| [Google primary-image requirements](https://support.google.com/merchants/answer/6324350?hl=en) and [additional images](https://support.google.com/merchants/answer/6324370?hl=en) | Distinguish annotated storefront explainers from shopping-feed assets                                              | Additional images are not a blanket exception to image rules; no feed approval is claimed                          |

## Search intent and overlap

Reader: a storefront developer who needs package images to track declared SKU contents. Primary intent: generate product bundle images showing included accessories and quantities. Related queries cover SvelteKit Cloudinary, stale bundle images, incorrect quantities, and optional accessories.

[5 Ways to Transform Images in Svelte for Enhancing Your Online Store](https://cloudinary.com/blog/5-ways-transform-images-svelte-online-store) already covers overlays and other Svelte image transformations. This tutorial adds a versioned contents-to-image contract, quantity expansion, saved evidence, and tested export checks. Targeted archive searches found no identical implementation; this is not an exhaustive novelty claim. No unrelated AI paper is added to a non-AI workflow.

## First-party evidence

- Code checkpoint: `1f2cc67`, before article changes. Resolved versions: SvelteKit 3.1.0, Svelte 5.57.2, Cloudinary SDK 2.11.0, Zod 4.6.7, Vitest 4.1.12, Playwright 1.64.1; Node.js 24.
- Three real Cloudinary-rendered WebP outputs at 1200 × 1000. Byte counts: Camera Only 39,908; Starter Kit 47,638; Creator Kit 85,080. Recipes, URLs, timestamps, and SHA-256 values are in `src/lib/media/saved-outputs.json`.
- `bundle-contract-v1`: 30 expected outcomes, 30 passed, 0 failed; four accepted recipes and 26 rejected mutations. This measures deterministic rules, not visual recognition.
- Automated suite: 23 unit tests and 11 production-preview browser tests passed. Production checks verified the homepage, docs, health, validation, all three manifests and exports, image dimensions, browser interactions, mobile overflow, and credits.
- [Live demo](https://cloudinary-bundles.vercel.app/), [report](https://cloudinary-bundles.vercel.app/api/benchmark), and [repository](https://github.com/musebe/cloudinary-bundles).

## Technical caveats for the draft

The export route hashes saved bytes, not pixels or provenance authenticity. Public images are not access-controlled. The invalid-example endpoint constructs known scenarios server-side; it is not an arbitrary recipe editor. An invalid example keeps the valid image visible and disables export in the interface; direct exports still serve the known-valid saved recipe.

The canvas URL uses a version, but component overlays reference public IDs without their recorded versions. Saved files preserve the shipped result; regenerating after overwriting a component public ID can change pixels. Production adaptation should use reviewed, revision-specific public IDs.

Source photos require human review and attribution. The camera has a fitted wrist loop; the separate strap is a neck strap. The tripod photograph includes studio surroundings. The fictional kits establish neither accessory compatibility nor physical scale.

## Editorial audit

The technical review found no blocking implementation mismatch. The editorial review confirmed brief alignment, answer-first structure, descriptive headings, no deployment section, and FAQs after the conclusion. Refinements defined the recipe at first use, linked the actual canvas, and described saved outputs as avoiding Cloudinary requests rather than implying uncached rendering on every selection.

| Area                            |      Score | Basis                                                                                                                          |
| ------------------------------- | ---------: | ------------------------------------------------------------------------------------------------------------------------------ |
| Reader value and originality    |      18/20 | Specific included-accessory problem; adds a tested contents-to-image contract beyond adjacent overlay tutorials                |
| Technical accuracy and evidence |      24/25 | Code-level review, three delivered composites, reproducible cases, and production export checks; human review limits disclosed |
| Search intent and structure     |      14/15 | Matching title and introduction, local implementation, source links, proof tables, conclusion, FAQs                            |
| Direct answers                  |       9/10 | Six practical questions plus a defined recipe and direct opening                                                               |
| Sources and entity clarity      |      14/15 | Primary product/framework guidance, dated original usability research, and attributable source media                           |
| Technical SEO and accessibility |       8/10 | Metadata, captioned media, HTML-ready tables, and schema guidance; final publisher rendering/canonical/schema still to verify  |
| Editorial clarity               |        5/5 | Short code excerpts, no numbered step headings or deployment content, limitations preserved                                    |
| **Total**                       | **92/100** | **Ready for editorial review, not a claim of final publication approval**                                                      |

Recommend Article or BlogPosting structured data for the visible tutorial, following [Google's Article guidance](https://developers.google.com/search/docs/appearance/structured-data/article). Do not promise FAQ rich results: [Google's documentation updates](https://developers.google.com/search/updates#june_2026) record their removal in 2026. Validate actual publisher markup, byline, canonical URL, image crops, and page rendering before publication. The repository Markdown itself does not emit structured data.

## Article delivery

The main article is literal Markdown in the specified Google Doc, matching the earlier Product Studio and Media Pipeline documents. The appended Article Brief remains natively formatted, with its Heading 1 in the outline and a two-page rendered layout. Existing brief formatting is preserved when replacing the article portion.

The Creator Kit figure was uploaded as an unchanged WebP snapshot to Cloudinary under `bundle-studio/v1/article/creator-kit-2026-10-26`, after confirming the target was absent. Asset ID: `b7e2e84bd30ca6dedb3bf28dad25ed8f`. Readback confirmed 1200 × 1000 and 85,080 bytes. The Markdown embeds the returned HTTPS delivery URL and retains attribution. No source asset was overwritten and no new inference was run.
