<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import Work from '$lib/components/Work.svelte';
	import Credentials from '$lib/components/Credentials.svelte';
	import Education from '$lib/components/Education.svelte';
	import Enquire from '$lib/components/Enquire.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Yens Loff — Senior cyber analyst</title>
	<meta
		name="description"
		content="Yens Loff, senior cyber analyst at Cyberlogic. Five years in security operations and detection, working on AI's role in security decisions. Credentials, education, and a way to get in touch."
	/>
</svelte:head>

<div class="mx-auto w-full max-w-5xl px-6 md:px-10">
	<Hero />
	<main>
		<Work />
		<Education />
		<Credentials />
		<Enquire />
	</main>
	<Footer />
</div>
