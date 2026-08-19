# Personal Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the single-page personal site (hero, about, projects, contact) on the existing SvelteKit static scaffold, per the approved design spec.

**Architecture:** Static SvelteKit site (`adapter-static`, `prerender = true`). One route (`/`), composed of small focused Svelte components under `src/lib/components/`, driven by plain-data files under `src/lib/data/`. Theming is pure CSS (`prefers-color-scheme`, no JS/toggle). The only non-trivial logic is a deterministic node-graph generator (pure TS function, unit tested with Vitest) that draws the hero's signature background.

**Tech Stack:** SvelteKit 2 / Svelte 5 (runes), TypeScript, `@sveltejs/adapter-static`, `@fontsource/ibm-plex-mono` (self-hosted font), Vitest (new dev dependency, for the node-graph generator only).

**Spec:** `docs/superpowers/specs/2026-08-19-personal-site-design.md`

## Global Constraints

- Dark/light via `prefers-color-scheme` only — no manual toggle, no stored override.
- No Experience/timeline section.
- No photo/avatar — hero is text-only.
- Projects section uses placeholder cards only (no real project content yet).
- Color tokens, exact hex values, and type scale come from the spec's "Color tokens" and "Type" sections — use them verbatim, don't invent new values.
- `prefers-reduced-motion: reduce` disables all node-graph animation and any hover transitions.
- Contact links: email `me@yensloff.com`, GitHub `https://github.com/YensZAF`, LinkedIn/X/Mastodon are placeholder `#` hrefs for now.

---

### Task 1: Design tokens and global styles

**Files:**

- Create: `src/lib/styles/tokens.css`
- Modify: `src/routes/+layout.svelte`
- Modify: `package.json` (add `@fontsource/ibm-plex-mono`)

**Interfaces:**

- Produces: CSS custom properties `--bg`, `--surface`, `--border`, `--text`, `--text-dim`, `--accent`, `--accent-2`, and `--font-mono`, available globally to every component via `:root`.

- [ ] **Step 1: Install the font package**

Run: `npm install @fontsource/ibm-plex-mono`

- [ ] **Step 2: Write the tokens stylesheet**

```css
/* src/lib/styles/tokens.css */
:root {
	--font-mono: 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;

	--bg: #f4f6f9;
	--surface: #ffffff;
	--border: #dde3ec;
	--text: #131b29;
	--text-dim: #57657a;
	--accent: #2f6fed;
	--accent-2: #0ea5c4;
}

@media (prefers-color-scheme: dark) {
	:root {
		--bg: #0a0e17;
		--surface: #10151f;
		--border: #1e2735;
		--text: #e2e8f0;
		--text-dim: #7c8aa0;
		--accent: #4d8dff;
		--accent-2: #38bdf8;
	}
}

* {
	box-sizing: border-box;
}

html,
body {
	margin: 0;
	padding: 0;
}

body {
	background: var(--bg);
	color: var(--text);
	font-family: var(--font-mono);
	font-size: 1rem;
	line-height: 1.6;
	-webkit-font-smoothing: antialiased;
}

a {
	color: var(--accent);
}

a:focus-visible,
button:focus-visible {
	outline: 2px solid var(--accent);
	outline-offset: 2px;
}
```

- [ ] **Step 3: Wire the stylesheet and font into the root layout**

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '@fontsource/ibm-plex-mono/400.css';
	import '@fontsource/ibm-plex-mono/500.css';
	import '@fontsource/ibm-plex-mono/600.css';
	import '../lib/styles/tokens.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
```

- [ ] **Step 4: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/lib/styles/tokens.css src/routes/+layout.svelte
git commit -m "feat: add design tokens and IBM Plex Mono"
```

---

### Task 2: Node-graph generator (pure function + tests)

**Files:**

- Create: `src/lib/nodegraph.ts`
- Test: `src/lib/nodegraph.test.ts`
- Modify: `package.json` (add `vitest`)
- Create: `vitest.config.ts`

**Interfaces:**

- Produces:

  ```ts
  export interface GraphNode {
  	x: number; // 0..width
  	y: number; // 0..height
  }
  export interface GraphEdge {
  	from: number; // index into nodes
  	to: number; // index into nodes
  }
  export interface Graph {
  	nodes: GraphNode[];
  	edges: GraphEdge[];
  }
  export function generateGraph(
  	seed: number,
  	width: number,
  	height: number,
  	count: number,
  	maxEdgeDistance: number
  ): Graph;
  ```

  Consumed by Task 4's `NodeGraph.svelte`.

- [ ] **Step 1: Install Vitest**

Run: `npm install -D vitest`

- [ ] **Step 2: Add the Vitest config**

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['src/**/*.test.ts']
	}
});
```

- [ ] **Step 3: Add the `test` script**

Modify `package.json` `scripts` block, add:

```json
"test": "vitest run"
```

- [ ] **Step 4: Write the failing tests**

```ts
// src/lib/nodegraph.test.ts
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
```

- [ ] **Step 5: Run tests to verify they fail**

Run: `npm run test`
Expected: FAIL — `Cannot find module './nodegraph'`

- [ ] **Step 6: Implement the generator**

```ts
// src/lib/nodegraph.ts
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
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npm run test`
Expected: PASS (5 tests)

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/nodegraph.ts src/lib/nodegraph.test.ts
git commit -m "feat: add deterministic node-graph generator"
```

---

### Task 3: NodeGraph component

**Files:**

- Create: `src/lib/components/NodeGraph.svelte`

**Interfaces:**

- Consumes: `generateGraph(seed, width, height, count, maxEdgeDistance): Graph` from Task 2 (`$lib/nodegraph`).
- Produces: a Svelte component `<NodeGraph />` with no required props, used by Task 6's `Hero.svelte` as an absolutely-positioned background layer.

- [ ] **Step 1: Write the component**

```svelte
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
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/NodeGraph.svelte
git commit -m "feat: add NodeGraph background component"
```

---

### Task 4: Contact links and project placeholder data

**Files:**

- Create: `src/lib/data/links.ts`
- Create: `src/lib/data/projects.ts`

**Interfaces:**

- Produces:

  ```ts
  export interface ContactLinks {
  	email: string;
  	github: string;
  	linkedin: string;
  	x: string;
  	mastodon: string;
  }
  export const links: ContactLinks;
  ```

  and

  ```ts
  export interface Project {
  	title: string;
  	description: string;
  }
  export const projects: Project[];
  ```

  Consumed by Task 6 (`Hero.svelte`), Task 8 (`Projects.svelte`), Task 9 (`Contact.svelte`).

- [ ] **Step 1: Write the links data**

```ts
// src/lib/data/links.ts
export interface ContactLinks {
	email: string;
	github: string;
	linkedin: string;
	x: string;
	mastodon: string;
}

export const links: ContactLinks = {
	email: 'me@yensloff.com',
	github: 'https://github.com/YensZAF',
	linkedin: '#',
	x: '#',
	mastodon: '#'
};
```

- [ ] **Step 2: Write the projects data**

```ts
// src/lib/data/projects.ts
export interface Project {
	title: string;
	description: string;
}

export const projects: Project[] = [
	{
		title: 'Project one',
		description: "Placeholder — swap in a real write-up when it's ready."
	},
	{
		title: 'Project two',
		description: "Placeholder — swap in a real write-up when it's ready."
	}
];
```

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/data/links.ts src/lib/data/projects.ts
git commit -m "feat: add contact links and placeholder project data"
```

---

### Task 5: Header component

**Files:**

- Create: `src/lib/components/Header.svelte`

**Interfaces:**

- Produces: `<Header />`, no props, used by Task 10's `+page.svelte`.

- [ ] **Step 1: Write the component**

```svelte
<!-- src/lib/components/Header.svelte -->
<header class="site-header">
	<svg class="mark" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
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
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/Header.svelte
git commit -m "feat: add site header with node-graph mark"
```

---

### Task 6: Hero component

**Files:**

- Create: `src/lib/components/Hero.svelte`

**Interfaces:**

- Consumes: `<NodeGraph />` (Task 3), `links` from `$lib/data/links` (Task 4).
- Produces: `<Hero />`, no props, used by Task 10's `+page.svelte`.

- [ ] **Step 1: Write the component**

```svelte
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
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/Hero.svelte
git commit -m "feat: add hero section"
```

---

### Task 7: About component

**Files:**

- Create: `src/lib/components/About.svelte`

**Interfaces:**

- Produces: `<About />`, no props, used by Task 10's `+page.svelte`.

- [ ] **Step 1: Write the component**

```svelte
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
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/About.svelte
git commit -m "feat: add about section"
```

---

### Task 8: Projects section

**Files:**

- Create: `src/lib/components/ProjectCard.svelte`
- Create: `src/lib/components/Projects.svelte`

**Interfaces:**

- Consumes: `Project` type and `projects` from `$lib/data/projects` (Task 4).
- `ProjectCard.svelte` props: `{ project: Project }`.
- Produces: `<Projects />`, no props, used by Task 10's `+page.svelte`.

- [ ] **Step 1: Write the card component**

```svelte
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
```

- [ ] **Step 2: Write the section component**

```svelte
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
```

- [ ] **Step 3: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/components/ProjectCard.svelte src/lib/components/Projects.svelte
git commit -m "feat: add projects section with placeholder cards"
```

---

### Task 9: Contact component

**Files:**

- Create: `src/lib/components/Contact.svelte`

**Interfaces:**

- Consumes: `links` from `$lib/data/links` (Task 4).
- Produces: `<Contact />`, no props, used by Task 10's `+page.svelte`.

- [ ] **Step 1: Write the component**

```svelte
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
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/Contact.svelte
git commit -m "feat: add contact section"
```

---

### Task 10: Assemble the page

**Files:**

- Modify: `src/routes/+page.svelte`

**Interfaces:**

- Consumes: `<Header />` (Task 5), `<Hero />` (Task 6), `<About />` (Task 7), `<Projects />` (Task 8), `<Contact />` (Task 9).

- [ ] **Step 1: Replace the scaffold page**

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Yens — Senior Cyber Analyst</title>
	<meta
		name="description"
		content="Yens, senior cyber analyst at Cyberlogic and MS Cybersecurity candidate at Michigan Tech, interested in AI's growing role in security."
	/>
</svelte:head>

<Header />
<main>
	<Hero />
	<About />
	<Projects />
	<Contact />
</main>
```

- [ ] **Step 2: Build and check the output**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 3: Preview locally**

Run: `npm run preview`
Then open the printed local URL and confirm: hero renders with node-graph background, all four sections appear in order, links are clickable, page matches the spec's ASCII layout.

- [ ] **Step 4: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat: assemble personal site page"
```

---

### Task 11: Accessibility and responsive pass

**Files:**

- Modify: `src/lib/styles/tokens.css`
- Modify: `src/lib/components/Hero.svelte`

**Interfaces:**

- None (styling-only pass over existing components from Tasks 1–10).

- [ ] **Step 1: Add a base heading scale and skip-obvious-a11y-gaps check**

Confirm each section component uses one `<h2>` and the page has exactly one `<h1>` (in `Hero.svelte`) — verify by running:

Run: `grep -rn "<h1\|<h2" src/lib/components src/routes`
Expected: exactly one `<h1>` (Hero.svelte) and four `<h2>` (About, Projects, Contact, plus none needed in Header — Header has no heading, confirm it uses no `<h1>`/`<h2>`).

- [ ] **Step 2: Verify mobile layout at 360px**

Run: `npm run dev`
Then, using the browser devtools responsive mode (or `mcp__claude-in-chrome__computer` with a resized viewport), load `http://localhost:5173` at 360×800 and confirm: hero CTA buttons wrap without overflow, projects grid stacks to one column, no horizontal scrollbar.

- [ ] **Step 3: Verify focus states**

In the same browser session, press Tab repeatedly from the top of the page and confirm every link/button shows a visible `--accent` outline (defined in `tokens.css` Task 1 Step 2).

- [ ] **Step 4: Verify reduced motion**

In devtools, emulate `prefers-reduced-motion: reduce` (Chrome DevTools → Rendering tab → Emulate CSS media feature) and confirm the pulsing nodes in the hero background stop animating.

- [ ] **Step 5: Commit**

Only if Steps 1–4 required code changes to pass. If everything already passed, skip the commit — this task is a verification pass, not guaranteed to produce a diff.

```bash
git add -A
git commit -m "fix: accessibility and responsive fixes"
```

---

### Task 12: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full check suite**

Run: `npm run check && npm run lint && npm run test && npm run build`
Expected: all four commands exit 0.

- [ ] **Step 2: Preview the production build**

Run: `npm run preview`
Open the printed URL, confirm the page matches the spec end to end: node-graph hero, about/projects/contact sections, correct copy (Cyberlogic, MTU Cybersecurity, no Experience section, no theme toggle), dark/light mode both look correct (toggle OS appearance to confirm both, since there's no in-app toggle).
