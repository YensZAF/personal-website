<!-- src/lib/components/Header.svelte -->
<header class="site-header">
	<svg
		class="mark"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		aria-hidden="true"
		focusable="false"
	>
		<line x1="4" y1="16" x2="10" y2="5" stroke="var(--accent)" stroke-width="1.5" />
		<line x1="10" y1="5" x2="16" y2="16" stroke="var(--accent)" stroke-width="1.5" />
		<circle cx="4" cy="16" r="2" fill="var(--accent)" />
		<circle cx="10" cy="5" r="2" fill="var(--accent-2)" />
		<circle cx="16" cy="16" r="2" fill="var(--accent)" />
	</svg>
	<span class="wordmark">YZ</span>
</header>

<style>
	.site-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		max-width: 740px;
		margin: 0 auto;
		padding: 2rem 1.5rem 0;
	}

	.wordmark {
		font-weight: 600;
		letter-spacing: 0.04em;
	}
</style>
