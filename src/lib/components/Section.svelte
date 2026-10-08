<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		label,
		note,
		id,
		children
	}: { label: string; note?: string; id: string; children: Snippet } = $props();
</script>

<section
	{id}
	class="border-rule grid gap-x-10 gap-y-4 border-t py-12 md:grid-cols-[9rem_minmax(0,1fr)] md:py-16"
>
	<div class="font-record pt-1 text-sm leading-6">
		<h2 class="text-ink-mid tracking-wide">{label}</h2>
		{#if note}<p class="text-ink-mid/70">{note}</p>{/if}
	</div>
	<div class="min-w-0">
		{@render children()}
	</div>
</section>
