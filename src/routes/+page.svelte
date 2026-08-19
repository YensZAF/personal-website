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
