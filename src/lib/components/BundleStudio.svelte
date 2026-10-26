<script lang="ts">
	import {
		ArrowDownToLine,
		ArrowUpRight,
		Box,
		Check,
		ChevronRight,
		CircleAlert,
		FileJson,
		Layers,
		PackageCheck,
		RefreshCw,
		ShieldCheck
	} from '@lucide/svelte';
	import type { StudioData } from '#lib/bundles/view.ts';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	let { data }: { data: StudioData } = $props();
	let selectedId = $state('camera-only');
	let selected = $derived(data.bundles.find((bundle) => bundle.id === selectedId)!);
	let issues = $state<{ code: string; message: string }[]>([]);
	let checking = $state(false);
	let hydrated = $state(false);
	onMount(() => {
		hydrated = true;
	});
	let checked = $state(false);
	let failure = $state('');
	let imageFailed = $state(false);
	let requestNumber = 0;
	let canExport = $derived(
		!!selected.exportUrl && !issues.length && !checking && !failure && !imageFailed
	);

	function selectBundle(id: string) {
		requestNumber += 1;
		selectedId = id;
		issues = [];
		failure = '';
		checking = false;
		checked = false;
		imageFailed = false;
	}

	async function checkRecipe(scenario: 'valid' | 'extra-item') {
		const current = ++requestNumber;
		checking = true;
		failure = '';
		try {
			const response = await fetch(resolve('/api/validate'), {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ bundleId: selected.id, scenario })
			});
			if (!response.ok || !response.headers.get('content-type')?.includes('application/json'))
				throw new Error('The check could not finish. Please try again.');
			const result = await response.json();
			if (
				typeof result?.valid !== 'boolean' ||
				!Array.isArray(result.issues) ||
				!result.issues.every(
					(issue: { code?: unknown; message?: unknown }) =>
						typeof issue?.code === 'string' && typeof issue?.message === 'string'
				) ||
				result.valid !== (result.issues.length === 0)
			) {
				throw new Error('The check returned an unexpected result. Please try again.');
			}
			if (current !== requestNumber) return;
			issues = result.issues;
			checked = true;
		} catch (error) {
			if (current === requestNumber)
				failure = error instanceof Error ? error.message : 'The check could not finish.';
		} finally {
			if (current === requestNumber) checking = false;
		}
	}
</script>

<a class="skip-link" href="#studio">Skip to the demo</a>
<div class="page-shell">
	<header class="site-header">
		<a class="brand" href={resolve('/')} aria-label="Bundle Studio home"
			><span class="brand-mark"><Box size={23} strokeWidth={1.6} /></span><span
				>Bundle Studio<small>Cloudinary × SvelteKit</small></span
			></a
		>
		<nav aria-label="Main navigation">
			<a href="#proof" class="subtle-link">The proof</a><a href={resolve('/docs')} class="docs-link"
				>Project docs <ArrowUpRight size={15} /></a
			>
		</nav>
	</header>
	<main>
		<section class="intro" aria-labelledby="page-title">
			<p class="eyebrow"><span class="status-dot"></span> Product bundle image studio</p>
			<h1 id="page-title">Show what comes<br />in the <span>box.</span></h1>
			<div class="intro-bottom">
				<p>
					One product. Three packages. Images that show exactly<br class="desktop-break" /> what’s included,
					without the guesswork.
				</p>
				<span class="saved-note"><Layers size={16} /> Saved examples. No upload needed.</span>
			</div>
		</section>

		<section id="studio" class="studio-grid" aria-label="Interactive bundle demo">
			<div class="preview-column">
				<div class="preview-topline">
					<span><span class="status-dot"></span> Storefront image</span><span
						>1200 × 1000 · WebP</span
					>
				</div>
				<div class="preview-frame">
					{#if selected.previewUrl && !imageFailed}
						{#key selected.id}<img
								class="composite-image"
								src={selected.previewUrl}
								width="1200"
								height="1000"
								alt={`${selected.label}: ${selected.contents.map((item) => `${item.quantity} ${item.label}`).join(', ')}. Illustrative bundle.`}
								loading="eager"
								onerror={() => {
									imageFailed = true;
								}}
							/>{/key}
					{:else}
						<div class="image-empty">
							<CircleAlert size={28} />
							<h2>Preview unavailable</h2>
							<p>The saved image needs to be restored before export.</p>
						</div>
					{/if}
				</div>
				<div class="preview-caption">
					<span><ShieldCheck size={15} /> Cloudinary-rendered, saved in this project</span><a
						href={resolve('/docs#credits')}>Photo credits <ArrowUpRight size={13} /></a
					>
				</div>
				<div class="export-row">
					{#if canExport}<a
							class="button primary"
							href={resolve('/api/bundles/[bundleId]/export', { bundleId: selected.id })}
							><ArrowDownToLine size={17} /> Download bundle image</a
						>{:else}<button class="button primary" disabled
							><ArrowDownToLine size={17} /> Export unavailable</button
						>{/if}
					<a
						class="button secondary"
						href={resolve('/api/bundles/[bundleId]/manifest', { bundleId: selected.id })}
						><FileJson size={17} /> Manifest</a
					>
				</div>
				<p class="fine-print">
					Illustrative packages, not actual offers or compatibility recommendations.<br />The camera
					photo includes its fitted wrist loop; “Camera strap” means the separate neck strap.
				</p>
			</div>

			<div class="configuration">
				<div class="section-label">
					<span>01 / Choose a package</span><span>3 saved outputs</span>
				</div>
				<div class="bundle-options" role="group" aria-label="Choose a package">
					{#each data.bundles as bundle, index (bundle.id)}<button
							type="button"
							class:selected={selected.id === bundle.id}
							aria-pressed={selected.id === bundle.id}
							disabled={!hydrated}
							onclick={() => selectBundle(bundle.id)}
							><span class="option-number">0{index + 1}</span><span
								><strong>{bundle.label}</strong><small
									>{bundle.unitCount} {bundle.unitCount === 1 ? 'item' : 'items'} included</small
								></span
							><span class="selection-mark"
								>{#if selected.id === bundle.id}<Check size={14} />{/if}</span
							></button
						>{/each}
				</div>
				<div class="contents-heading">
					<h2>Inside this box</h2>
					<span class="pill"
						>{selected.unitCount} {selected.unitCount === 1 ? 'item' : 'items'}</span
					>
				</div>
				<p class="description">{selected.description}</p>
				<ul class="contents-list" aria-label="Included items">
					{#each selected.contents as item (item.componentId)}<li>
							<span class="item-thumbnail"
								><img src={item.imageUrl} alt="" width="52" height="45" loading="lazy" /></span
							><span>{item.label}</span><span class="item-quantity">× {item.quantity}</span>
						</li>{/each}
				</ul>
				<div class="optional-section">
					<h3>Sold separately</h3>
					{#if selected.optional.length}<p>
							{selected.optional.map((item) => item.label).join(' · ')}
						</p>{:else}<p>All five component types are included in this package.</p>{/if}
				</div>
				<div class="sku-row">
					<span>{selected.sku}</span><span>Manifest revision {selected.version}</span>
				</div>
			</div>
		</section>

		<section class="contract-panel" aria-labelledby="contract-title">
			<div class="contract-intro">
				<span class="icon-tile"><PackageCheck size={23} /></span>
				<div>
					<p class="eyebrow">02 / Check the composition</p>
					<h2 id="contract-title">A picture should keep its promise.</h2>
					<p>We check the SKU, revision, components, and quantities before export.</p>
				</div>
			</div>
			<div class="contract-actions">
				<button
					class="button secondary"
					onclick={() => checkRecipe('extra-item')}
					disabled={checking || !hydrated}
					>Try an incorrect recipe <ChevronRight size={16} /></button
				><button
					class="button text-button"
					onclick={() => checkRecipe('valid')}
					disabled={checking || !hydrated}><RefreshCw size={15} /> Reset to current recipe</button
				>
			</div>
			<div
				class:blocked={issues.length || failure}
				class="contract-status"
				role="status"
				aria-live="polite"
			>
				{#if checking}<span>Checking recipe…</span>{:else if failure}<CircleAlert size={18} /><span
						>{failure}</span
					>{:else if issues.length}<CircleAlert size={18} />
					<div>
						<strong>Incorrect recipe blocked</strong>{#each issues as issue, index (index)}<p>
								{issue.message} <code>{issue.code}</code>
							</p>{/each}
						<p>The preview remains the last valid image. No incorrect image was generated.</p>
					</div>{:else}<Check size={18} /><span
						>{checked
							? 'Current recipe verified. Export is available.'
							: 'Saved output matches the current package manifest.'}</span
					>{/if}
			</div>
		</section>

		<section id="proof" class="proof-section" aria-labelledby="proof-title">
			<div>
				<p class="eyebrow">03 / Reproducible proof</p>
				<h2 id="proof-title">Check the rules.<br />Not a model’s opinion.</h2>
				<p>
					These are logical contract checks, not image-recognition accuracy or sales research. A
					person still verifies the source photographs.
				</p>
				<a class="inline-link" href={resolve('/api/benchmark')}
					>Download all 30 results <ArrowUpRight size={15} /></a
				>
			</div>
			<div class="proof-card">
				<div class="proof-score">
					<strong>{data.benchmark.passed}<span>/{data.benchmark.total}</span></strong><span
						class="pill"
						>{data.benchmark.failed === 0
							? 'Checks passed'
							: `${data.benchmark.failed} failed`}</span
					>
				</div>
				<div class="table-scroll">
					<table>
						<caption class="sr-only">Recipe rules and required outcomes</caption><thead
							><tr><th scope="col">Recipe condition</th><th scope="col">Outcome</th></tr></thead
						><tbody
							><tr
								><td>Current SKU, revision, items, quantities</td><td
									><span class="outcome allowed">Allow</span></td
								></tr
							><tr
								><td>Missing or extra component</td><td><span class="outcome">Block</span></td></tr
							><tr
								><td>Wrong quantity or duplicate component</td><td
									><span class="outcome">Block</span></td
								></tr
							><tr
								><td>Wrong SKU, stale revision, invalid input</td><td
									><span class="outcome">Block</span></td
								></tr
							></tbody
						>
					</table>
				</div>
			</div>
		</section>
	</main>
	<footer class="site-footer">
		<span>Fewer assumptions. Clearer product images.</span><a href={resolve('/docs')}
			>How this project works <ArrowUpRight size={14} /></a
		>
	</footer>
</div>
