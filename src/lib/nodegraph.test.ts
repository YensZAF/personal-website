import { describe, expect, it } from 'vitest';
import { generateGraph } from './nodegraph';

describe('generateGraph', () => {
	it('is deterministic for a given seed', () => {
		const a = generateGraph(42, 800, 400, 20, 160);
		const b = generateGraph(42, 800, 400, 20, 160);
		expect(a).toEqual(b);
	});

	it('produces the requested number of nodes', () => {
		const graph = generateGraph(1, 800, 400, 15, 160);
		expect(graph.nodes).toHaveLength(15);
	});

	it('keeps every node within the given bounds', () => {
		const graph = generateGraph(7, 800, 400, 25, 160);
		for (const node of graph.nodes) {
			expect(node.x).toBeGreaterThanOrEqual(0);
			expect(node.x).toBeLessThanOrEqual(800);
			expect(node.y).toBeGreaterThanOrEqual(0);
			expect(node.y).toBeLessThanOrEqual(400);
		}
	});

	it('only connects nodes within maxEdgeDistance', () => {
		const graph = generateGraph(3, 800, 400, 20, 100);
		for (const edge of graph.edges) {
			const a = graph.nodes[edge.from];
			const b = graph.nodes[edge.to];
			const dist = Math.hypot(a.x - b.x, a.y - b.y);
			expect(dist).toBeLessThanOrEqual(100);
		}
	});

	it('produces different graphs for different seeds', () => {
		const a = generateGraph(1, 800, 400, 20, 160);
		const b = generateGraph(2, 800, 400, 20, 160);
		expect(a).not.toEqual(b);
	});
});
