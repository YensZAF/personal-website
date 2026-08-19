<!-- src/lib/components/NodeGraph.svelte -->
<script lang="ts">
	import { generateGraph } from '$lib/nodegraph';

	const width = 760;
	const height = 320;
	const graph = generateGraph(1337, width, height, 18, 150);
</script>

<svg
	class="node-graph"
	viewBox="0 0 {width} {height}"
	preserveAspectRatio="xMidYMid slice"
	aria-hidden="true"
	focusable="false"
>
	{#each graph.edges as edge, i (i)}
		<line
			x1={graph.nodes[edge.from].x}
			y1={graph.nodes[edge.from].y}
			x2={graph.nodes[edge.to].x}
			y2={graph.nodes[edge.to].y}
			class="edge"
		/>
	{/each}
	{#each graph.nodes as node, i (i)}
		<circle
			cx={node.x}
			cy={node.y}
			r="2.5"
			class="node"
			class:pulse={i % 5 === 0}
			style="animation-delay: {(i % 5) * 0.6}s"
		/>
	{/each}
</svg>

<style>
	.node-graph {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		opacity: 0.2;
	}

	.edge {
		stroke: var(--border);
		stroke-width: 1;
	}

	.node {
		fill: var(--accent);
	}

	.node.pulse {
		animation: node-pulse 9s ease-in-out infinite;
	}

	@keyframes node-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.35;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.node.pulse {
			animation: none;
		}
	}
</style>
