<script lang="ts">
	import GitHubIcon from '$lib/components/icons/GitHubIcon.svelte';
	import LinkedInIcon from '$lib/components/icons/LinkedInIcon.svelte';
	import { links } from '$lib/data/links';

	const lines = [
		'I work where AI starts',
		'making security decisions —',
		'and where it gets them wrong.'
	];

	const profiles = [
		{ label: 'GitHub', href: links.github, icon: GitHubIcon },
		{ label: 'LinkedIn', href: links.linkedin, icon: LinkedInIcon }
	];
</script>

<header>
	<div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-8 pb-12 md:pt-10">
		<span class="font-record text-base font-semibold tracking-[0.02em]">Yens Loff</span>
		<a
			class="font-record text-ink-mid hover:text-seal text-sm no-underline transition-colors"
			href="#enquire">Enquire</a
		>
	</div>

	<!-- Same grid as the record sections below, so the page reads as one document from the top. -->
	<div class="grid gap-x-10 gap-y-8 pb-12 md:grid-cols-[9rem_minmax(0,1fr)] md:pb-16">
		<h1
			class="max-w-[30ch] text-pretty text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.15] font-normal tracking-[-0.01em] md:col-start-2 md:row-start-1"
		>
			<!-- One flowing sentence on phones; the deliberate three-line break from sm up. -->
			{#each lines as line, i (line)}
				<span
					class="set-line sm:block sm:whitespace-nowrap"
					style="animation-delay: {0.08 + i * 0.12}s">{`${line} `}</span
				>
			{/each}
		</h1>

		<div
			class="font-record text-ink-mid set-line text-sm leading-6 md:col-start-1 md:row-start-1 md:pt-1.5"
			style="animation-delay: 0.44s"
		>
			<p>Senior cyber analyst, Cyberlogic</p>
			<p class="mt-2">Five years in security operations</p>

			<ul class="mt-5 flex list-none gap-4 p-0">
				{#each profiles as profile (profile.label)}
					<li>
						<a
							class="text-ink-mid hover:text-seal block transition-colors"
							href={profile.href}
							rel="external noreferrer"
							target="_blank"
							aria-label={profile.label}
						>
							<profile.icon class="h-5 w-5" />
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</header>
