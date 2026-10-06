<script lang="ts">
	import { links } from '$lib/data/links';

	const elsewhere = [
		{ label: 'LinkedIn', href: links.linkedin },
		{ label: 'GitHub', href: links.github },
		{ label: 'Credly', href: links.credly }
	];
</script>

<footer
	class="border-rule font-record text-ink-mid flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t py-10 text-sm"
>
	<a class="hover:text-seal no-underline transition-colors" href="mailto:{links.email}"
		>{links.email}</a
	>
	<ul class="m-0 flex list-none flex-wrap gap-x-7 p-0">
		{#each elsewhere as place (place.label)}
			<li>
				<a
					class="hover:text-seal no-underline transition-colors"
					href={place.href}
					rel="external noreferrer"
					target="_blank">{place.label}</a
				>
			</li>
		{/each}
	</ul>
</footer>
