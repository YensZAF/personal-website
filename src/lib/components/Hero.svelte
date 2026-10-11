<script lang="ts">
	import GitHubIcon from '$lib/components/icons/GitHubIcon.svelte';
	import LinkedInIcon from '$lib/components/icons/LinkedInIcon.svelte';
	import MailIcon from '$lib/components/icons/MailIcon.svelte';
	// Inline rather than <img>: the blinking cursor's "reduce motion" rule only takes effect reliably
	// in the page itself. The title is dropped so hovering the mark doesn't show a stray tooltip.
	import logoSource from '$lib/assets/logo/coffee-terminal-logo-seal.svg?raw';
	import { links } from '$lib/data/links';

	const logo = logoSource.replace(/<title>.*?<\/title>/s, '');

	const lines = [
		'Most of the job is asking',
		'one more question than',
		'the attacker hoped I would.'
	];

	const profiles = [
		{ label: 'GitHub', href: links.github, icon: GitHubIcon },
		{ label: 'LinkedIn', href: links.linkedin, icon: LinkedInIcon }
	];
</script>

<header>
	<div class="flex flex-wrap items-start justify-between gap-x-6 gap-y-1 pt-8 pb-12 md:pt-10">
		<!-- The name is set as if typed at the logo's prompt: its baseline sits on the foot of the ">"
		     and, at 16px, its capitals are the same 11px height as the ">". Fixed at 44px tall so the
		     two stay locked together. Seal green to match the prompt strokes. -->
		<div class="flex items-start gap-2">
			<!-- Safe: the markup is a file from this repo, read at build time, never user input. -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<span class="block h-11 [&>svg]:h-11 [&>svg]:w-auto" aria-hidden="true">{@html logo}</span>
			<span
				class="font-record text-seal mt-[21px] text-base leading-none font-semibold tracking-[0.02em]"
				>Yens Loff</span
			>
		</div>
		<!-- Jumps to the form rather than opening a mail client, so no address is ever on the page. -->
		<a
			class="text-seal hover:text-ink mt-[19px] block transition-colors"
			href="#enquire"
			aria-label="Send me a message"
			title="Send me a message"
		>
			<MailIcon class="h-5 w-auto" />
		</a>
	</div>

	<!-- Same grid as the record sections below, so the page reads as one document from the top.
	     Statement and work paragraph share the wide column as one introduction; role, years and
	     profiles sit in the label column beside them. -->
	<div class="grid gap-x-10 gap-y-7 pb-12 md:grid-cols-[9rem_minmax(0,1fr)] md:pb-16">
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

		<p
			class="text-lede set-line max-w-[62ch] text-pretty md:col-start-2 md:row-start-2"
			style="animation-delay: 0.44s"
		>
			I've grown from the first line of a SOC to the analyst others escalate&nbsp;to. I utilise KQL
			across Microsoft Sentinel and Defender XDR, automate repeat work in Logic Apps and PowerShell,
			and spend part of each week helping junior analysts work through their trickier cases.
		</p>

		<div
			class="font-record text-ink-mid set-line text-sm leading-6 md:col-start-1 md:row-span-2 md:row-start-1 md:pt-1.5"
			style="animation-delay: 0.56s"
		>
			<p>Senior Cyber Security Analyst</p>
			<p class="mt-2">Five years in Security</p>

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
