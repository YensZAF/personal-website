<script lang="ts">
	import { links } from '$lib/data/links';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	/** Hidden from people, irresistible to bots. A filled value means we drop the submission. */
	let company = $state('');
	let status: 'idle' | 'unsent' = $state('idle');

	// TODO: point this at a real endpoint (Worker or form service) and replace the
	// `unsent` branch with proper pending / sent / failed states.
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (company) return;
		status = 'unsent';
	}

	/** Paper inlaid in the card, so a field reads as somewhere to write. */
	const field =
		'font-record bg-paper border-seal/25 focus:border-seal mt-1.5 w-full border-0 border-b-2 px-3 py-2.5 text-base transition-colors';
	const label = 'font-record text-ink-mid block text-sm';
</script>

<section
	id="enquire"
	class="bg-seal-tint mt-6 mb-12 px-6 py-12 md:mt-10 md:mb-16 md:px-12 md:py-14"
>
	<div>
		<h2 class="font-record text-ink-mid text-sm leading-6 tracking-wide">Enquire</h2>

		<p class="text-lede mt-4 max-w-[42ch]">
			I keep this page short on purpose. If you want the longer version — the roles, the detail, a
			CV — ask and I'll send it.
		</p>

		<form class="relative mt-9" onsubmit={handleSubmit}>
			<div class="grid gap-6 sm:grid-cols-2">
				<div>
					<label class={label} for="name">Your name</label>
					<input class={field} id="name" name="name" type="text" required bind:value={name} />
				</div>
				<div>
					<label class={label} for="email">Email</label>
					<input class={field} id="email" name="email" type="email" required bind:value={email} />
				</div>
			</div>

			<div class="mt-6">
				<label class={label} for="message">What would you like to know?</label>
				<textarea
					class="{field} resize-none"
					id="message"
					name="message"
					rows="4"
					required
					bind:value={message}></textarea>
			</div>

			<div class="absolute left-[-9999px]" aria-hidden="true">
				<label for="company">Company</label>
				<input
					id="company"
					name="company"
					type="text"
					tabindex="-1"
					autocomplete="off"
					bind:value={company}
				/>
			</div>

			<div class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
				<button
					class="font-record bg-seal text-paper hover:bg-ink cursor-pointer border-0 px-7 py-3 text-base transition-colors"
					type="submit">Send message</button
				>
				<p class="font-record text-ink-mid text-sm">
					Or write to
					<a
						class="text-ink decoration-seal/40 hover:decoration-seal underline underline-offset-4 transition-colors"
						href="mailto:{links.email}">{links.email}</a
					>
				</p>
			</div>

			{#if status === 'unsent'}
				<p class="font-record text-ink-mid mt-5 max-w-[46ch] text-sm leading-6" role="status">
					This form isn't connected yet, so nothing was sent. Email me instead and I'll reply.
				</p>
			{/if}
		</form>
	</div>
</section>
