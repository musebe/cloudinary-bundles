<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/dm-sans';
	import '@fontsource-variable/manrope';
	import favicon from '#lib/assets/box.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
