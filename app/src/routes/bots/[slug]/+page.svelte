<script>
	// @ts-nocheck

	import NavBar from '$lib/NavBar.svelte';
	import Footer from '$lib/Footer.svelte';
	import BotInfo from '$lib/BotInfo.svelte';
	import ChatBox from '$lib/ChatBox.svelte';
	export let data;

	import { initializeApp } from 'firebase/app';
	import { getFirestore, doc, getDoc, query, collection, limit } from 'firebase/firestore';

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

	async function getBotById() {
		const docRef = doc(firestore, 'bots', data.slug);
		const docSnap = await getDoc(docRef);
		return docSnap.data();
	}
</script>

<NavBar />

<!-- Display bot -->
{#await getBotById()}
	<p style="text-align: center;">Loading...</p>
{:then value}
	<div class="bot-container">
		<BotInfo
			name={value.name}
			description={value.description}
			examplePrompts={value.examplePrompts}
		/>
		<ChatBox botPrompt={value.prompt} />
	</div>
{:catch error}
	<p>Something went wrong: {error.message}</p>
{/await}

<Footer />

<style>
	.bot-container {
		width: 100%;
		min-height: 80vh;
		max-width: 1200px;
		padding: 0 3%;
		margin-left: auto;
		margin-right: auto;
		display: grid;
		grid-template-columns: 1.4fr 2fr;
		justify-content: stretch;
		align-items: start;
		gap: 5%;
	}

	@media screen and (max-width: 950px) {
		.bot-container {
			grid-template-columns: 1fr;
			gap: 2em;
		}
	}
</style>
