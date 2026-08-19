<!-- src/lib/components/ProjectCard.svelte -->
<script lang="ts">
	import type { Project } from '$lib/data/projects';

	let { project }: { project: Project } = $props();
</script>

<article class="card">
	<div class="card-head">
		<h3>{project.title}</h3>
		<span class="tag">placeholder</span>
	</div>
	<p>{project.description}</p>
</article>

<style>
	.card {
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--surface);
		padding: 1.25rem;
	}

	.card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	h3 {
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
	}

	.tag {
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--text-dim);
		border: 1px solid var(--border);
		border-radius: 999px;
		padding: 0.15rem 0.5rem;
	}

	p {
		margin: 0;
		color: var(--text-dim);
		font-size: 0.9rem;
	}
</style>
