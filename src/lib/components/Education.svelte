<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { education } from '$lib/data/education';
</script>

<Section id="education" label="Education">
	<ul class="max-w-[38rem] list-none p-0">
		{#each education as degree (degree.qualification)}
			<li
				class="border-rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-3 first:pt-0"
			>
				<span class="text-entry">{degree.qualification}</span>
				<span class="font-record text-ink-mid text-sm"
					>{degree.institution}, {degree.status.toLowerCase()}</span
				>
			</li>
		{/each}
	</ul>
</Section>
