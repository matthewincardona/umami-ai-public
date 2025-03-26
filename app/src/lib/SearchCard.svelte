<script>
	export let botId;
	export let name;
	export let description;
	export let authorUrl;
	export let author;
</script>

<div class="search-card">
	<div class="search-card__title-section">
		<h3 class="search-card__title">{name}</h3>
		<p class="search-card__descr">{description}</p>
	</div>
	<div class="search-card__cta-section">
		<a class="search-card__btn" href="/bots/{botId}">Open -></a>
		<p class="search-card__attribution">Made by <a href={authorUrl} target="_blank">{author}</a></p>
	</div>
</div>

<style>
	.search-card {
		border: solid 1px black;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		row-gap: 26px;
		width: 340px;
		height: 360px;
		padding: 40px 20px 20px 20px;
		border-radius: 5px;
	}

	.search-card__title-section {
		color: #373737;
		display: flex;
		flex-direction: column;
		justify-content: center;
		row-gap: 14px;
	}

	.search-card__cta-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		row-gap: 2em;
	}

	.search-card__title {
		font-size: 1.4rem;
		text-align: center;
		font-weight: 600;
	}

	.search-card__descr {
		margin-top: 10px;
		font-size: 0.8rem;
		font-weight: 400;
		height: 100px;
		overflow-y: hidden;
	}

	.search-card__btn {
		background-color: #505050;
		color: white;
		text-decoration: none;
		padding: 7px 14px;
		border-radius: 3px;
	}

	.search-card__attribution {
		font-size: 0.8rem;
		color: #6c6c6c;
	}
</style>
