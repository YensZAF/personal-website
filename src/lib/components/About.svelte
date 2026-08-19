<!-- src/lib/components/About.svelte -->
<section class="about">
	<h2>About</h2>
	<p>
		I'm a senior cyber analyst at Cyberlogic, currently pursuing a Master's in Cybersecurity at
		Michigan Tech. Lately I've been drawn to how AI is reshaping the security field — from detection
		and triage to the new attack surface it creates — and I like digging into that intersection.
	</p>
</section>

<style>
	.about {
		max-width: 740px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
		border-top: 1px solid var(--border);
	}

	h2 {
		font-size: 0.8rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-dim);
		margin: 0 0 1rem;
	}

	p {
		margin: 0;
	}
</style>
