<script lang="ts">
	import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';

	// To store the search term searched by user.
	let search_term = '';
	// To store the api response data.
	let photos: {
		id: string;
		alt_description: string;
		urls: { regular: string };
	}[] = [];

	// Svelte Hook similar to react useEffect but difference being it only works once,
	// equivalent to useEffect with an empty dependency array, running only onLoad of a page.
	onMount(() => {
		console.log('I am onMount');
		fetchData();
	});
	// Svelte Hook triggered when the component is about to be destroyed and removed from the DOM.
	onDestroy(() => {
		console.log('I am onDestroy');
	});
	// Svelte Hook triggered before the component updates, but after data has changed.
	beforeUpdate(() => {
		console.log('I am beforeUpdate');
	});
	// Svelte Hook triggered after the component updates and the DOM has been updated.
	afterUpdate(() => {
		console.log('I am afterUpdate');
	});

	const fetchData = async () => {
		const res = await fetch(
			`https://api.unsplash.com/search/photos?page=1&query=${search_term || 'animals'}&client_id=MRtnX5pKefP14f_JktJ6jyOP9aJTFLfcqjXj_4ZeT6s`,
			{
				method: 'GET'
			}
		);
		const data = await res.json();
		photos = data.results;
		console.log('fetchData', photos);
	};
	const handleFetch = async () => {};
	console.log({ search_term, photos });
</script>

<div class="container">
	<div class="header">
		<h1>Photo Gallery</h1>
		<div class="input-container">
			<input type="text" class="input" />
			<button class="button" on:click={handleFetch}>Fetch Photos</button>
		</div>
	</div>

	<div class="photos">
		{#each photos as photo, i (photo.id)}
			<img src={photo.urls.regular} alt={photo.alt_description} class="image" />
		{/each}
	</div>
</div>

<style>
	.image {
		width: 400px;
		height: 250px;
		margin: 5px;
	}
	.photos {
		display: flex;
		flex-wrap: wrap;
	}
	.container {
		width: 1230px;
		margin: 0 auto;
	}
	.header {
		text-align: center;
		font-size: 20px;
	}
	.input {
		padding: 10px;
		width: 400px;
		border-radius: 10px;
		outline: none;
		border: 1px solid gray;
		font-size: 20px;
	}
	.button {
		padding: 10px;
		font-size: 20px;
		background-color: orangered;
		border-radius: 10px;
		border: none;
		color: blanchedalmond;
	}
	.input-container {
		margin-bottom: 40px;
	}
</style>
