<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { education } from '$lib/data/education';
</script>

<Section id="education" label="Education">
	<ul class="flex max-w-[38rem] list-none flex-col gap-8 p-0">
		{#each education as degree (degree.qualification)}
			<li class="flex flex-col gap-y-2 sm:flex-row sm:items-start sm:justify-between sm:gap-x-6">
				<span class="text-entry">{degree.qualification}</span>
				<!-- The crest sits on the outer edge: left of the text on phones, right of it from sm up. -->
				<span class="flex items-start gap-3 sm:flex-row-reverse">
					<img
						class="h-12 w-auto shrink-0"
						src={degree.logo}
						alt=""
						width="39"
						height="48"
						loading="lazy"
					/>
					<span class="font-record flex flex-col gap-y-0.5 sm:text-right">
						<span class="text-ink-mid text-sm">{degree.institution}</span>
						<span class="text-ink-mid/70 text-xs">{degree.location}</span>
						<span
							class="text-xs {degree.status === 'In progress'
								? 'text-ink-mid font-semibold'
								: 'text-ink-mid/70'}"
							>{degree.status}{degree.status === 'In progress' ? '…' : ''}</span
						>
					</span>
				</span>
			</li>
		{/each}
	</ul>
</Section>
