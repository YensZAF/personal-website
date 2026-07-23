<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
</svelte:head>

<article>
	<h1>{data.metadata.title}</h1>
	<time datetime={data.metadata.date}>{data.metadata.date}</time>
	<data.Content />
</article>
