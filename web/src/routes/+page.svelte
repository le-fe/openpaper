<script>
	import Counter from "./Counter.svelte"
	import HomeTrendingToday from "./HomeTrendingToday.svelte"
	import NewestUpdatedTopics from "./NewestUpdatedTopics.svelte"
	// import welcome from '$lib/images/svelte-welcome.webp';
	// import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="px-8 py-4">
	<HomeTrendingToday />
	<div class="mt-8">
		<NewestUpdatedTopics />
	</div>
</div>
