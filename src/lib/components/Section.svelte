<script lang="ts">
	import type { Snippet } from 'svelte';

	let { label, id, children }: { label: string; id: string; children: Snippet } = $props();
</script>

<section
	{id}
	class="border-rule grid gap-x-10 gap-y-4 border-t py-12 md:grid-cols-[9rem_minmax(0,1fr)] md:py-16"
>
	<h2 class="font-record text-ink-mid pt-1 text-sm leading-6 tracking-wide">{label}</h2>
	<div class="min-w-0">
		{@render children()}
	</div>
</section>
