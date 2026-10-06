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

	const field =
		'font-record border-rule focus:border-seal w-full border-0 border-b bg-transparent pt-1 pb-2 text-base transition-colors outline-none focus-visible:outline-none';
	const label = 'font-record text-ink-mid block text-sm';
</script>

<section id="enquire" class="bg-seal-tint mt-12 md:mt-16">
	<div class="grid gap-x-10 gap-y-4 py-14 md:grid-cols-[9rem_minmax(0,1fr)] md:py-20">
		<h2 class="font-record text-ink-mid pt-1 text-sm leading-6 tracking-wide">Enquire</h2>
		<div class="min-w-0">
			<p class="text-lede max-w-[46ch]">
				I keep this page short on purpose. If you want the longer version — the roles, the detail, a
				CV — ask and I'll send it.
			</p>

			<form class="mt-10 max-w-[34rem]" onsubmit={handleSubmit}>
				<div class="grid gap-7 sm:grid-cols-2">
					<div>
						<label class={label} for="name">Your name</label>
						<input class={field} id="name" name="name" type="text" required bind:value={name} />
					</div>
					<div>
						<label class={label} for="email">Email</label>
						<input class={field} id="email" name="email" type="email" required bind:value={email} />
					</div>
				</div>

				<div class="mt-7">
					<label class={label} for="message">What would you like to know?</label>
					<textarea
						class="{field} resize-y"
						id="message"
						name="message"
						rows="3"
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

				<button
					class="font-record bg-seal text-paper hover:bg-ink mt-9 cursor-pointer border-0 px-6 py-3 text-base transition-colors"
					type="submit">Send message</button
				>

				{#if status === 'unsent'}
					<p class="font-record text-ink-mid mt-5 max-w-[42ch] text-sm leading-6" role="status">
						This form isn't connected yet, so nothing was sent. Email me at
						<a
							class="text-ink decoration-rule hover:text-seal hover:decoration-seal underline underline-offset-4 transition-colors"
							href="mailto:{links.email}">{links.email}</a
						> and I'll reply.
					</p>
				{/if}
			</form>
		</div>
	</div>
</section>
