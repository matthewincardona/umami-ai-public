<script>
	import { onMount } from 'svelte';

	export let name;
	export let description;
	export let examplePrompts;

	onMount(() => {
		const el = document.getElementById('copyUrlBtn');
		// @ts-ignore
		el.value = 'dsadas';
		el?.addEventListener(
			'click',
			function () {
				navigator.clipboard.writeText(window.location.href).then(
					function () {
						el.textContent = 'Link Copied!';
						setTimeout(() => {
							el.textContent = 'Share Link';
						}, 4000);
					},
					function () {
						console.log('Copy error');
					}
				);
			},
			false
		);
	});
</script>

<div class="bot-info">
	<h1 class="bot-info__title">
		{name}
	</h1>
	<p class="bot-info__descr">
		{description}
	</p>

	<p class="bot-info__example-prompts-header">Example prompts:</p>
	<ul class="bot-info__example-prompts-list">
		{#each examplePrompts as examplePrompt}
			<li>
				{examplePrompt}
			</li>
		{/each}
	</ul>
	<button class="bot-info__shareLink" id="copyUrlBtn">Share Link</button>
</div>

<style>
	.bot-info__shareLink {
		background-color: #505050;
		border: none;
		color: white;
		text-decoration: none;
		padding: 7px 14px;
		border-radius: 3px;
		cursor: pointer;
	}

	.bot-info__shareLink:hover {
		background-color: #5050509a;
	}

	.bot-info {
		display: flex;
		justify-content: center;
		align-items: start;
		flex-direction: column;
		row-gap: 25px;
		padding: 30px 25px;
		border: solid 1px black;
		width: 100%;
		max-width: 600px;
		min-height: 220px;
		font-size: 0.8rem;
		border-radius: 5px;
	}

	.bot-info__title {
		font-size: 1.8rem;
		text-align: left;
		font-weight: 600;
		margin-bottom: -10px;
	}

	.bot-info__example-prompts-header {
		margin-top: 10px;
		color: #5b5555;
		font-weight: 600;
	}

	.bot-info__example-prompts-list {
		margin-top: -20px;
		list-style-type: none;
		padding-left: 0;
	}
</style>
