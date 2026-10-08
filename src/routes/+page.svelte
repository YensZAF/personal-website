<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Credentials from '$lib/components/Credentials.svelte';
	import Education from '$lib/components/Education.svelte';
	import Enquire from '$lib/components/Enquire.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Yens Loff | Senior Cyber Security Analyst</title>
	<meta
		name="description"
		content="Yens Loff, senior cyber security analyst. Four years in security."
	/>
</svelte:head>

<div class="mx-auto w-full max-w-5xl px-6 md:px-10">
	<Hero />
	<main>
		<Education />
		<Credentials />
		<Enquire />
	</main>
	<Footer />
</div>
