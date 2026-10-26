<script lang="ts">
	import BundleStudio from '#lib/components/BundleStudio.svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Product Bundle Images | Bundle Studio</title>
	<meta
		name="description"
		content="Compare three product packages with saved Cloudinary bundle images. See included accessories, quantities, optional extras, and reproducible composition checks."
	/>
</svelte:head>

<BundleStudio {data} />
