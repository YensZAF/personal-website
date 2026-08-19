<!-- src/lib/components/Contact.svelte -->
<script lang="ts">
	import { links } from '$lib/data/links';
</script>

<section class="contact">
	<h2>Contact</h2>
	<p>
		Best way to reach me is <a href="mailto:{links.email}">{links.email}</a>.
	</p>
	<div class="links">
		<a href={links.linkedin}>LinkedIn</a>
		<a href={links.github}>GitHub</a>
		<a href={links.x}>X</a>
		<a href={links.mastodon}>Mastodon</a>
	</div>
</section>

<style>
	.contact {
		max-width: 740px;
		margin: 0 auto;
		padding: 3rem 1.5rem 4rem;
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
		margin: 0 0 1rem;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
</style>
