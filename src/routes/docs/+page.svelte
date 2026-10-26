<script lang="ts">
	import { media } from '#lib/media/registry.ts';
	import { ArrowLeft } from '@lucide/svelte';
	import { resolve } from '$app/paths';
</script>

<svelte:head
	><title>How Bundle Studio works</title><meta
		name="description"
		content="How Bundle Studio connects SKU contents to Cloudinary image compositions, validates recipes, and provides attributed reusable demo images."
	/></svelte:head
>

<main class="docs-page">
	<a class="back-link" href={resolve('/')}><ArrowLeft size={16} /> Back to the demo</a>
	<p class="eyebrow">Project documentation</p>
	<h1>Product images with<br />a clear contents list.</h1>
	<p>
		Bundle Studio is a SvelteKit demonstration of SKU-specific product images. Choose a package to
		see the included components and quantities. Optional accessories stay separate.
	</p>
	<h2>What creates the image?</h2>
	<p>
		A versioned catalog defines each package. Cloudinary stores the component photographs and
		combines them using image and text overlays. A two-card package shows two copies of the
		memory-card photograph, not an invented extra item.
	</p>
	<p>
		The three rendered WebP outputs are saved with this project, together with their Cloudinary
		URLs, recipes, and SHA-256 checksums. Visitors do not trigger uploads, AI inference, or fresh
		transformations. Downloads check the current catalog and the saved file checksum.
	</p>
	<h2>What does the check prove?</h2>
	<p>
		The validator compares the recipe’s SKU, revision, component identifiers, and quantities with
		the selected package. It rejects missing or extra items, duplicate components, wrong quantities,
		outdated revisions, and unexpected fields.
	</p>
	<p>
		<a href={resolve('/api/benchmark')}>Download the 30-case contract report</a>. These are logical
		checks on declared data, not a visual-recognition benchmark. They cannot detect a mislabeled
		photograph. A person must verify each source image.
	</p>
	<p>
		Try an incorrect recipe in the demo to see a blocked state. The displayed image remains the last
		valid saved image; the demo never generates the incorrect recipe.
	</p>
	<h2>Scope and costs</h2>
	<p>
		This is a fictional catalog, not an actual product offer. Photos illustrate separate components
		and are not evidence of accessory compatibility or relative physical size. The camera has an
		attached wrist loop; the separately listed strap is a neck strap. Marks in the photos identify
		the photographed products and do not imply endorsement.
	</p>
	<p>
		The workflow needs no paid AI or background-removal service. Initial uploads and Cloudinary
		processing consume normal quota. Saved project copies keep public visits from triggering new
		Cloudinary operations.
	</p>
	<p>
		Annotated images are storefront explainers, not certified shopping-feed main images. Review a
		feed’s image requirements separately.
	</p>
	<h2 id="credits">Photo credits and reuse</h2>
	<p>
		Sources are from Wikimedia Commons. Changes: resized and arranged with labels in Cloudinary; the
		original product details are not generated. Generated composite images are available under <a
			href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a
		>. Retain these source credits and indicate further changes when reusing them.
	</p>
	<ul class="credit-list">
		{#each Object.entries(media) as [id, asset] (id)}<li>
				<strong
					>{id === 'bag'
						? 'Camera case'
						: id === 'memory-card'
							? 'Memory card'
							: id.charAt(0).toUpperCase() + id.slice(1)}</strong
				>
				by {asset.author}<small
					><a href={asset.source} rel="external">Original source and attribution</a> ·
					<a href={asset.licenseUrl} rel="external">{asset.license}</a></small
				>
			</li>{/each}
	</ul>
	<h2>Implementation references</h2>
	<ul>
		<li>
			<a href="https://cloudinary.com/documentation/layers">Cloudinary image and text layers</a>
		</li>
		<li>
			<a href="https://cloudinary.com/documentation/node_integration">Cloudinary Node.js SDK</a>
		</li>
		<li><a href="https://svelte.dev/docs/kit/introduction">SvelteKit documentation</a></li>
		<li>
			<a href="https://baymard.com/research-articles/included-accessories-image"
				>Baymard research on included and optional accessories</a
			>
		</li>
		<li>
			<a href="https://support.google.com/merchants/answer/6324350?hl=en"
				>Google product image requirements</a
			>
		</li>
	</ul>
</main>
