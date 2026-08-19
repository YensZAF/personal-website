export interface GraphNode {
	x: number;
	y: number;
}

export interface GraphEdge {
	from: number;
	to: number;
}

export interface Graph {
	nodes: GraphNode[];
	edges: GraphEdge[];
}

// mulberry32: small deterministic PRNG so the same seed always
// produces the same layout (no re-randomizing on every page load).
function mulberry32(seed: number): () => number {
	let a = seed;
	return () => {
		a |= 0;
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

export function generateGraph(
	seed: number,
	width: number,
	height: number,
	count: number,
	maxEdgeDistance: number
): Graph {
	const random = mulberry32(seed);

	const nodes: GraphNode[] = Array.from({ length: count }, () => ({
		x: random() * width,
		y: random() * height
	}));

	const edges: GraphEdge[] = [];
	for (let i = 0; i < nodes.length; i++) {
		for (let j = i + 1; j < nodes.length; j++) {
			const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
			if (dist <= maxEdgeDistance) {
				edges.push({ from: i, to: j });
			}
		}
	}

	return { nodes, edges };
}
