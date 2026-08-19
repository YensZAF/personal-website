<!-- src/lib/components/Hero.svelte -->
<script lang="ts">
	import NodeGraph from '$lib/components/NodeGraph.svelte';
	import { links } from '$lib/data/links';
</script>

<section class="hero">
	<NodeGraph />
	<div class="content">
		<h1>Hey, I'm Yens.</h1>
		<p class="subtitle">Senior Cyber Analyst @ Cyberlogic</p>
		<p class="subtitle">MS Cybersecurity Candidate @ MTU</p>
		<div class="links">
			<a class="button" href="mailto:{links.email}">Email</a>
			<a class="button" href={links.linkedin}>LinkedIn</a>
			<a class="button" href={links.github}>GitHub</a>
			<a class="button" href={links.x}>X</a>
			<a class="button" href={links.mastodon}>Mastodon</a>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		max-width: 740px;
		margin: 0 auto;
		padding: 4rem 1.5rem 3rem;
		overflow: hidden;
		border-top: 1px solid var(--border);
	}

	.content {
		position: relative;
	}

	h1 {
		font-size: 2.25rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		margin: 0 0 0.75rem;
	}

	.subtitle {
		margin: 0 0 0.25rem;
		color: var(--text-dim);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: 1.5rem;
	}

	.button {
		display: inline-block;
		padding: 0.5rem 0.9rem;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--surface);
		color: var(--text);
		text-decoration: none;
		font-size: 0.9rem;
		transition: border-color 0.15s ease;
	}

	.button:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	@media (prefers-reduced-motion: reduce) {
		.button {
			transition: none;
		}
	}
</style>
