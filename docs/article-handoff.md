# Article brief

**Title:** Product Bundle Images With SvelteKit and Cloudinary: Show What’s Included

**Deadline:** October 11, 2026, retained from the original brief; replacement build completed October 26. Revised publication date not agreed.

**Category:** E-commerce / Product imagery.

**Opportunity score:** 9.5/10, retained from the approved brief; a specific shopper problem with usability evidence, not a search-volume estimate.

**Buildability score:** 8/10; core compositions require no paid inference, but accurate photos and catalog data need review.

**Article objective:** Generate SKU-specific images showing included items, quantities, and optional accessories.

**Technical stack:** SvelteKit 3.1, Svelte 5, TypeScript, Cloudinary Node.js SDK 2.11, image/text layers, Zod, Vitest, and Playwright.

**Primary SEO focus:** Product bundle images; included accessories; SvelteKit Cloudinary; SKU-specific imagery.

**Question the article should answer:** How can I generate product bundle images that show exactly what’s included with each SKU?

**Proof / GEO asset:** Reusable bundle schema, SKU-to-components table, three real compositions, and 30 reproducible contract cases.

## Article outline

Problem; demo; architecture; local setup; reviewed photos; bundle data; validation; Cloudinary layers; saved evidence; SvelteKit preview; verified exports; tests; limitations; conclusion; FAQs last. No deployment section.

## Research and implementation

[Baymard's 2019 study](https://baymard.com/research-articles/included-accessories-image) motivates the accessory-clarity problem. [Cloudinary layers](https://cloudinary.com/documentation/layers) implement composition; [billing](https://cloudinary.com/documentation/billing_and_plans) explains quota. [Google image rules](https://support.google.com/merchants/answer/6324350?hl=en) require separate feed assessment. No paid add-on, beta, or inference service is used.

[Article](./article.md) · [Demo](https://cloudinary-bundles.vercel.app/) · [Docs](https://cloudinary-bundles.vercel.app/docs) · [GitHub](https://github.com/musebe/cloudinary-bundles) · [Report](https://cloudinary-bundles.vercel.app/api/benchmark)

Verified October 26: 30/30 expected outcomes, four accepted and 26 rejected; 23 unit tests and 11 browser tests passed. Three production downloads matched saved hashes. Main modules: catalog, policy, composition, saved-output registry, server loader, export route.

Logical checks do not identify objects or prove sales impact. Images are public. Component overlays use public IDs, not pinned source versions. Human review, photo credits, quota, and fixed-layout limits remain explicit.

## Keyword and metadata table

| Primary keyword       | Secondary keywords                         | Long-tail keywords                                  | Meta title                                          | Meta description                                                                                                                                         |
| --------------------- | ------------------------------------------ | --------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| product bundle images | included accessories; SvelteKit Cloudinary | generate SKU-specific images; show package contents | Product Bundle Images With SvelteKit and Cloudinary | Create SKU-specific product bundle images with SvelteKit and Cloudinary. Show included accessories and quantities, and validate each composition recipe. |

## Search, media, and publication

**Reader/intent:** Storefront developer implementing package-specific imagery. **Query family:** Included accessories, wrong quantities, stale recipes. **Gap:** Versioned contents-to-image validation, rather than another overlay tutorial. Adjacent [Svelte transformations article](https://cloudinary.com/blog/5-ways-transform-images-svelte-online-store) is linked; no exhaustive novelty claim.

**Slug:** `product-bundle-images-sveltekit-cloudinary`. **Entities:** Cloudinary uploads, image/text layers, delivery, SvelteKit server routes. **Direct answers:** SKU images, optional extras, source identity, saved demos, revisions, test limits.

**Media/accessibility:** Captioned real composite, HTML tables, readable contents, alt text, source credits; cover crops 16:9, 4:3, 1:1. **Schema:** Recommend Article or BlogPosting matching visible content; validate in the publishing CMS. No FAQ rich-result promise.

**Review score:** 92/100, detailed in research notes. Ready for editorial review, not final publication. Final cover, canonical URL, byline, schema, and CMS rendering remain editorial checks.

## Editorial and design messages

Hi [Melinda Pham](https://cloudinary.monday.com/users/42215299-melinda-pham), the “Product Bundle Images With SvelteKit and Cloudinary: Show What’s Included” article is ready for your review.

For design, show the same camera in three packages, with different included accessories. Highlight two memory cards in Creator Kit and keep “Included” separate from “Sold separately.” Connect the selected package to its Cloudinary-rendered image.

Primary reader intent: Generate product bundle images that match each SKU’s included items and quantities.
