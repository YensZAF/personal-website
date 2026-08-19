<!-- src/lib/components/Projects.svelte -->
<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { projects } from '$lib/data/projects';
</script>

<section class="projects">
	<h2>Projects</h2>
	<div class="grid">
		{#each projects as project (project.title)}
			<ProjectCard {project} />
		{/each}
	</div>
</section>

<style>
	.projects {
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

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	@media (max-width: 640px) {
		.grid {
			grid-template-columns: 1fr;
		}
	}
</style>
