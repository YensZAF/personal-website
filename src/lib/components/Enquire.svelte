<script lang="ts">
	import guilloche from '$lib/assets/patterns/guilloche.svg';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	/** Hidden from people, irresistible to bots. A filled value means we drop the submission. */
	let company = $state('');
	let status: 'idle' | 'sending' | 'sent' | 'failed' = $state('idle');
	/** Kept after the fields clear, so the confirmation can say where the reply will go. */
	let sentTo = $state('');

	/**
	 * Static Forms emails each submission to Yens. The key is designed to sit in the page (their own
	 * snippet puts it in a hidden input), so it isn't a secret; the email address it delivers to
	 * stays on their side and never reaches the browser.
	 */
	const FORM_ENDPOINT = 'https://api.staticforms.dev/submit';
	const FORM_KEY = 'sf_f960ia77kf78klekih1jmn8m';

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (status === 'sending') return;
		// Bots get the same confirmation as people, so there's nothing to learn from a rejection.
		if (company) {
			status = 'sent';
			return;
		}

		status = 'sending';
		try {
			// The form's own fields (including the hidden key and subject) are the single source of
			// what gets sent, so this and the no-script fallback submit exactly the same thing.
			const fields = new FormData(event.currentTarget as HTMLFormElement);
			fields.delete('company');
			const response = await fetch(FORM_ENDPOINT, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new URLSearchParams(fields as unknown as Record<string, string>)
			});
			const result: { success?: boolean } = await response.json().catch(() => ({}));
			if (!response.ok || !result.success) throw new Error(`Static Forms: ${response.status}`);

			sentTo = email;
			name = email = message = '';
			status = 'sent';
		} catch {
			status = 'failed';
		}
	}

	/**
	 * Paper inlaid in the card, so a field reads as somewhere to write. Focus brightens the paper
	 * and inks the bottom rule in seal green instead of drawing the page's offset focus ring,
	 * which doubled up with the rule as two parallel edges.
	 */
	const field =
		'font-record bg-paper border-seal/25 focus:bg-paper-lift focus:border-seal mt-1.5 w-full border-0 border-b-2 px-3 py-2.5 text-base transition-colors outline-none focus-visible:outline-none';
	/** The label follows its field into focus, so it's clear which question is being answered. */
	const label =
		'font-record text-ink-mid group-focus-within:text-seal block text-sm transition-colors';
</script>

<section
	id="enquire"
	class="bg-seal-tint relative isolate mt-6 mb-12 overflow-hidden px-6 py-12 md:mt-10 md:mb-16 md:px-12 md:py-14"
>
	<!-- A guilloché rosette, the engraving on certificates and banknotes. Centred on the card's
	     right edge so only its left half shows, fading out before it reaches the label. -->
	<img
		class="pointer-events-none absolute top-1/2 right-0 -z-10 w-[44rem] max-w-none translate-x-1/2 -translate-y-1/2 opacity-[0.2] select-none md:w-[56rem]"
		style="mask-image: linear-gradient(to left, #000 35%, transparent 100%); -webkit-mask-image: linear-gradient(to left, #000 35%, transparent 100%);"
		src={guilloche}
		alt=""
		aria-hidden="true"
		loading="lazy"
		decoding="async"
	/>

	<div>
		<h2 class="font-record text-ink-mid text-sm leading-6 tracking-wide">Enquire</h2>

		<!-- action/method are the fallback: before the script loads (or with it off) the browser
		     posts straight to Static Forms, so a message still arrives and nothing lands in the URL. -->
		<form class="relative mt-7" action={FORM_ENDPOINT} method="POST" onsubmit={handleSubmit}>
			<input type="hidden" name="apiKey" value={FORM_KEY} />
			<input type="hidden" name="subject" value="Yens Loff submission" />
			<div class="grid gap-6 sm:grid-cols-2">
				<div class="group">
					<label class={label} for="name">Your name</label>
					<input class={field} id="name" name="name" type="text" required bind:value={name} />
				</div>
				<div class="group">
					<label class={label} for="email">Email</label>
					<input class={field} id="email" name="email" type="email" required bind:value={email} />
				</div>
			</div>

			<div class="group mt-6">
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

			<button
				class="font-record bg-seal text-paper hover:bg-ink mt-8 cursor-pointer border-0 px-7 py-3 text-base transition-colors disabled:cursor-wait disabled:opacity-70"
				type="submit"
				disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button
			>

			<!-- Always rendered, so screen readers announce the result when the text changes. -->
			<p class="font-record mt-5 min-h-6 max-w-[46ch] text-sm leading-6" role="status">
				{#if status === 'sent'}
					<span class="text-seal font-semibold">Message sent.</span>
					<span class="text-ink-mid"
						>{sentTo ? `I'll reply to ${sentTo}.` : "I'll be in touch."}</span
					>
				{:else if status === 'failed'}
					<span class="text-ink"
						>Your message didn't send. Check your connection and try again.</span
					>
				{/if}
			</p>
		</form>
	</div>
</section>
