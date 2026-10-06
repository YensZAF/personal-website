<script lang="ts">
	const lines = [
		'I work where AI starts',
		'making security decisions —',
		'and where it gets them wrong.'
	];
</script>

<section class="pb-12 md:pb-16">
	<h1 class="text-statement max-w-[30ch] font-normal tracking-[-0.015em]">
		{#each lines as line, i (line)}
			<span class="set-line block sm:whitespace-nowrap" style="animation-delay: {0.08 + i * 0.12}s"
				>{line}</span
			>
		{/each}
	</h1>

	<p
		class="font-record text-ink-mid set-line mt-10 text-base leading-7 md:mt-14"
		style="animation-delay: 0.52s"
	>
		Senior cyber analyst at Cyberlogic.<br />
		Five years in security operations and detection.
	</p>
</section>
