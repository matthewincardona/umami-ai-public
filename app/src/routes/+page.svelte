<script>
	import NavBar from "$lib/NavBar.svelte";
	import Footer from "$lib/Footer.svelte";
	import SearchResults from "$lib/SearchResults.svelte";
</script>

<NavBar/>

<p>Welcome to</p>
<h1>The GPT Playground</h1>

<SearchResults/>

<Footer />

<style>
	p {
		font-size: 1.4rem;
		text-align: center;
		font-weight: 300;
	}

	h1 {
		font-size: 2rem;
		text-align: center;
		font-weight: 600;
	}
</style>