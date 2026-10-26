# Product bundle images: build brief

## One verifiable outcome

Selecting a bundle changes the pictured items and quantities to match its versioned SKU manifest. Invalid composition recipes cannot be exported.

Article: **Product Bundle Images With SvelteKit and Cloudinary: Show What’s Included**.

## Scope

- SvelteKit, Svelte 5, TypeScript, Cloudinary Node.js SDK, Zod, Vitest, and Playwright.
- Three fictional educational packages: Camera Only, Starter Kit, and Creator Kit. These are not real offers or claims of accessory compatibility.
- Merchant-authored package contents are the source of truth. Cloudinary stores the component photographs and renders image and text layers. No AI infers what is included.
- A compact responsive storefront preview, an HTML contents list, optional accessories clearly separated, and an export action.
- A visible contract check, a deliberately broken example, and a downloadable 30-case logical validation report.
- Saved example outputs ship with the project so visitors can try it without uploading or generating anything.

## Data and trust boundaries

The bundle catalog defines the SKU, version, item identifiers, quantities, and optional items. A separate asset registry maps item identifiers to reviewed photographs and their licenses. The composition recipe must match the catalog before the server generates an export URL.

Browser input selects an existing bundle or a predefined invalid example. It cannot supply public IDs, remote URLs, overlay text, credentials, or arbitrary transformations. Any Cloudinary management work stays in server-only scripts. A public demo needs no write credentials to display saved examples.

Core image transformations, storage, and delivery consume normal Cloudinary quota. No paid inference, generative effects, background removal, moderation add-on, or subscription beyond the existing product environment is planned. Check quota before any live operation; never overwrite existing assets.

## Checkpoints

| Stage              | Deliverable                                                                      | Validation                                                           |
| ------------------ | -------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| 1. Foundation      | New isolated project, environment template, build notes                          | Install, type-check, scaffold build, Git commit                      |
| 2. Bundle contract | Catalog, strict recipe validation, 30 labeled cases                              | Unit tests, fail-closed mutations, Git commit                        |
| 3. Media           | Licensed component photos, project-scoped Cloudinary assets, three compositions  | Asset readback, delivered dimensions, provenance records, Git commit |
| 4. Demo            | Bundle selector, contents, optional extras, export, broken fixture, compact docs | Desktop/mobile browser tests, keyboard checks, Git commit            |
| 5. Handoff         | Clear README, build log, reproducible benchmark report                           | Lint, type-check, production build, tests, Git commit                |

Deployment and the full article are later tasks, after the demo is reviewed.

## Proof and limitations

The 30 cases test declared SKU/component/quantity parity, missing and extra items, duplicates, schema failures, and stale revisions. They do not measure object recognition or prove that a mislabeled source photo depicts the right object. Human review of source photos is essential. Do not claim reduced returns, increased conversion, or shopping-feed approval.

Annotated images are storefront explainers. Shopping-feed use requires separate assessment of the platform’s current image requirements.

## Documentation while building

- `docs/build-log.md`: completed stages, commands, decisions, failures, and verified results.
- `docs/article-handoff.md`: compact editorial/search brief, separate from the eventual tutorial.
- `docs/asset-sources.md`: source URLs, authors, licenses, local preparation, and attribution.
- `docs/cloudinary-workflow.md`: asset namespace, configuration, bounded seeding, composition, and readback.

## Primary references

- [Cloudinary image and text layers](https://cloudinary.com/documentation/layers)
- [Cloudinary Node.js SDK](https://cloudinary.com/documentation/node_integration)
- [Cloudinary billing and plans](https://cloudinary.com/documentation/billing_and_plans)
- [SvelteKit project creation](https://svelte.dev/docs/kit/creating-a-project)
- [SvelteKit environment variables](https://svelte.dev/docs/kit/environment-variables)
- [Baymard: included and optional accessories](https://baymard.com/research-articles/included-accessories-image)
- [Google product image requirements](https://support.google.com/merchants/answer/6324350?hl=en)
