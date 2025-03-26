<script>
	// @ts-nocheck

	import SearchBar from './SearchBar.svelte';
	import SearchCard from './SearchCard.svelte';

	import { initializeApp } from 'firebase/app';
	import {
		getFirestore,
		doc,
		setDoc,
		getDoc,
		getDocs,
		query,
		collection,
		onSnapshot,
		limit
	} from 'firebase/firestore';

	const firebaseConfig = {
		apiKey: import.meta.env.GCLOUD_API_KEY,
		authDomain: 'umami-ai.firebaseapp.com',
		projectId: 'umami-ai',
		storageBucket: 'umami-ai.appspot.com',
		messagingSenderId: '948517132189',
		appId: import.meta.env.GCLOUD_APP_ID,
		measurementId: 'G-64KJ2GWS5F'
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);

	const firestore = getFirestore();

	async function queryForBots() {
		const botQuery = query(collection(firestore, 'bots'));

		const querySnapshot = await getDocs(botQuery);
		return querySnapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data()
			};
		});
	}
</script>

<div class="search__container">
	<SearchBar />
</div>

<!-- List bots -->
<div class="search-results">
	{#await queryForBots()}
		<p>Loading...</p>
	{:then values}
		{#each values as value}
			<SearchCard
				botId={value.id}
				name={value.name}
				description={value.description}
				authorUrl={value.authorUrl}
				author={value.author}
			/>
		{:else}
			Nothing to do here!
		{/each}
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>

<style>
	.search__container {
		display: flex;
		justify-content: center;
		margin-bottom: 80px;
		margin-top: 30px;
		margin-left: auto;
		margin-right: auto;
	}

	.search-results {
		width: 100%;
		max-width: 1200px;
		padding: 0 3%;
		display: flex;
		justify-content: center;
		column-gap: 2em;
		row-gap: 2em;
		flex-wrap: wrap;
		margin-left: auto;
		margin-right: auto;
	}
</style>
