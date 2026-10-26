# Article research and evidence

Verified October 26, 2026. This document supports the tutorial; it is not part of the published article.

## Brief alignment

The [Google article brief](https://docs.google.com/document/d/1DyMj3qbL9TpEFjtbApiPkoFB_GyYutZWHWKNFnQEU7M/edit) was read through the connected Google Docs tools. Its title is **Product Bundle Images With SvelteKit and Cloudinary: Show What’s Included**. Its objective is SKU-specific images showing included items, quantities, and optional accessories. The implementation follows that deterministic composition scope, not the superseded Jev proposal.

The Google brief currently has a blank deadline. The local handoff retains the previously recorded October 11 deadline as historical context, not a new publication commitment.

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
