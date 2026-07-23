<script lang="ts">
	import { posts } from '$lib/posts';
</script>

<h1>Blog</h1>

<ul>
	{#each posts as post (post.slug)}
		<li>
			<a href="/blog/{post.slug}">{post.title}</a>
			<time datetime={post.date}>{post.date}</time>
			{#if post.excerpt}
				<p>{post.excerpt}</p>
			{/if}
		</li>
	{/each}
</ul>
