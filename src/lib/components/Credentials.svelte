<script lang="ts">
	import Section from '$lib/components/Section.svelte';
	import { certifications, pastCertifications } from '$lib/data/certifications';
	import { links } from '$lib/data/links';
</script>

<Section id="credentials" label="Credentials">
	<ul class="max-w-[38rem] list-none p-0">
		{#each certifications as cert (cert.name)}
			<li
				class="border-rule flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0 border-b py-3 first:pt-0"
			>
				<span class="text-entry">{cert.name}</span>
				<span class="font-record text-ink-mid text-sm">{cert.issuer}</span>
			</li>
		{/each}
	</ul>

	<p class="font-record text-ink-mid mt-6 max-w-[38rem] text-sm leading-6">
		Previously held, now lapsed: {pastCertifications.join('; ')}.
	</p>

	<p class="font-record mt-4 text-sm">
		<a
			class="decoration-rule hover:text-seal hover:decoration-seal text-ink underline underline-offset-4 transition-colors"
			href={links.credly}
			rel="external noreferrer"
			target="_blank">Verify every badge on Credly</a
		>
	</p>
</Section>
