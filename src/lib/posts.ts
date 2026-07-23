import type { Component } from 'svelte';

export interface PostMetadata {
	title: string;
	date: string;
	slug: string;
	excerpt?: string;
}

interface PostModule {
	default: Component;
	metadata: PostMetadata;
}

const modules = import.meta.glob<PostModule>('./posts/*.md', { eager: true });

export const posts: PostMetadata[] = Object.values(modules)
	.map((mod) => mod.metadata)
	.sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string): PostModule | undefined {
	const entry = Object.values(modules).find((mod) => mod.metadata.slug === slug);
	return entry;
}
