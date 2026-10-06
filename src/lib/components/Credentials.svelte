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

	<div class="mt-8 flex flex-wrap items-center gap-5 md:gap-6" aria-hidden="true">
		{#each certifications as cert (cert.name)}
			<img
				class="h-20 w-20 md:h-26 md:w-26"
				src={cert.logo}
				alt=""
				width="88"
				height="88"
				loading="lazy"
			/>
		{/each}
	</div>

	<p class="font-record text-ink-mid mt-8 max-w-[38rem] text-sm leading-6">Previously held:</p>
	<ul class="mt-1 max-w-[38rem] list-none p-0">
		{#each pastCertifications as cert (cert.name)}
			<li class="font-record text-ink-mid flex flex-wrap justify-between gap-x-6 text-sm leading-7">
				<span>{cert.name}</span>
				<span>{cert.status}</span>
			</li>
		{/each}
	</ul>

	<p class="font-record mt-5 text-sm">
		<a
			class="decoration-rule hover:text-seal hover:decoration-seal text-ink underline underline-offset-4 transition-colors"
			href={links.credly}
			rel="external noreferrer"
			target="_blank">Verify every badge on Credly</a
		>
	</p>
</Section>
