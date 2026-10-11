<!-- Envelope drawn as an outline with rounded ends, to match the strokes in the logo. The viewBox is
     cropped to the artwork so its right edge sits flush with the page's right margin. -->
<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<svg
	class={className}
	viewBox="2 4 20 16"
	fill="none"
	stroke="currentColor"
	stroke-width="1.4"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	<rect x="3" y="5" width="18" height="14" rx="2.5" />
	<path d="M4.5 8l7.5 5.5L19.5 8" />
</svg>
