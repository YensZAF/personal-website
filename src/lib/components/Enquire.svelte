<script lang="ts">
	import guilloche from '$lib/assets/patterns/guilloche.svg';

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

		<form class="relative mt-7" onsubmit={handleSubmit}>
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

			<button
				class="font-record bg-seal text-paper hover:bg-ink mt-8 cursor-pointer border-0 px-7 py-3 text-base transition-colors"
				type="submit">Send message</button
			>

			{#if status === 'unsent'}
				<p class="font-record text-ink-mid mt-5 max-w-[46ch] text-sm leading-6" role="status">
					This form isn't connected yet, so nothing was sent. It's being wired up — try again in a
					few days.
				</p>
			{/if}
		</form>
	</div>
</section>
