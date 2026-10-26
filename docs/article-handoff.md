# Article brief

**Title:** Product Bundle Images With SvelteKit and Cloudinary: Show What’s Included

**Deadline:** October 11, 2026, retained from the Google brief. Replacement build began October 26; a new publication date has not been agreed.

**Category:** E-commerce / Product imagery

**Opportunity score:** 9.5/10, retained from the brief. Addresses a specific shopper question with usability evidence, not a measured search-volume claim.

**Buildability score:** 8/10, retained from the brief. Core compositions avoid paid inference; accurate source imagery and SKU data require human review.

**Article objective:** Generate SKU-specific product bundle images showing included items, quantities, and optional accessories.

**Technical stack:** SvelteKit 3, Svelte 5, TypeScript, Cloudinary Node.js SDK, image/text layers, Zod, Vitest, and Playwright. Recheck resolved versions at drafting.

**Primary SEO focus:** Product bundle images; included accessories product images; SvelteKit Cloudinary; SKU-specific product imagery.

**Question the article should answer:** How can I generate product bundle images that show exactly what’s included with each SKU?

**Proof / GEO asset:** Versioned bundle schema, SKU-to-components table, three Cloudinary-rendered examples, and an executable 30-case composition-contract report. Not visual recognition or conversion research.

## Article outline

1. Direct answer and included-accessory confusion
2. Saved demo and architecture
3. Local setup and reviewed photo sources
4. Versioned contents and strict validation
5. Cloudinary image/text composition
6. SvelteKit package switching and verified export
7. Thirty-case results, failure states, and limitations
8. Conclusion
9. Frequently asked questions

## Research and notes

[Baymard’s 2019 study](https://baymard.com/research-articles/included-accessories-image) documents included/optional-accessory confusion; historical task findings are not current return rates. [Cloudinary layers](https://cloudinary.com/documentation/layers) enable compositions. [Billing documentation](https://cloudinary.com/documentation/billing_and_plans) explains quota: no paid inference is needed, but core usage counts. [Google image requirements](https://support.google.com/merchants/answer/6324350?hl=en) require separate assessment for feed use. Targeted archive research found no exact bundle-manifest implementation; generic overlays are already covered.

## Code and implementation notes

[Live demo](https://cloudinary-bundles.vercel.app/) · [Project docs](https://cloudinary-bundles.vercel.app/docs) · [GitHub repository](https://github.com/musebe/cloudinary-bundles) · [30-case report](https://cloudinary-bundles.vercel.app/api/benchmark)

Local project: `cloudinary-bundles`. Main modules: catalog, policy, benchmark, registry, composition, and SvelteKit export route. See `build-log.md` for verified tests. Human review establishes photo identity; logical checks cannot correct mislabeled images. Saved outputs avoid new Cloudinary requests for visitors. Educational examples are public, not access-controlled.

## Keyword and metadata table

| Primary keyword       | Secondary keywords                         | Long-tail keywords                                      | Meta title                                          | Meta description                                                                                                                                         |
| --------------------- | ------------------------------------------ | ------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| product bundle images | included accessories; SvelteKit Cloudinary | generate SKU-specific images; show included accessories | Product Bundle Images With SvelteKit and Cloudinary | Create SKU-specific product bundle images with SvelteKit and Cloudinary. Show included accessories and quantities, and validate each composition recipe. |

## Extended search and editorial brief

**Reader and problem:** Storefront developers whose galleries leave shoppers guessing about package contents. **Search intent/query family:** Implementation, included accessories, SKU images, wrong quantities, stale revisions. **Content gap:** A testable contents-to-image contract, not another gallery or generative-product tutorial.

**Demo proof/original evidence:** Three saved outputs, Cloudinary readback, file hashes, executable contract checks. **Working title:** Above. **Slug:** `product-bundle-images-sveltekit-cloudinary`. **Meta description:** In table. **Cloudinary entities:** Uploads, asset IDs, image/text layers, delivery, Node.js SDK. **Plan/beta/region/add-on constraints:** Existing core Free allowance; no paid add-on, beta, inference, or regional entitlement assumed.

**Primary sources/internal links:** Above; verify canonical overlay/SvelteKit Blog links when drafting. **Direct-answer questions:** How do images follow SKU changes? What blocks incorrect recipes? Can checks identify a wrongly photographed item? Are explainers feed-compliant?

**Media/accessibility:** Three package states, manifest-to-image diagram, allowed/blocked example; HTML contents, alt text, keyboard controls, source credits. **Structured-data plan:** TechArticle where supported, matching the eventual visible tutorial. No rich-result or AI-citation promises. **Publication gate:** Public repository and demo are verified. Article drafting and the editorial evidence audit remain outstanding; the article is not publish-ready.

## Editorial and design messages

**Reviewer:** Hi Melinda, the replacement topic is “Product Bundle Images With SvelteKit and Cloudinary: Show What’s Included.” The demo and evidence are being prepared; the article is not yet ready for review.

**Design:** Show the same camera in Camera Only, Starter Kit, and Creator Kit packages. Show included accessories and quantities, with clear “Included” and “Sold separately” labels. Connect the selected package to its Cloudinary-rendered image. Prepare readable 16:9, 4:3, and 1:1 cover options.
