<script>
	import Counter from "./Counter.svelte"
	import HomeTrendingToday from "./HomeTrendingToday.svelte"
	import NewestUpdatedTopics from "./NewestUpdatedTopics.svelte"
	// import welcome from '$lib/images/svelte-welcome.webp';
	// import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>OpenPaper | Learn, Share, Fun</title>
	<meta name="description" content="OpenPaper | Learn, Share, Fun" />
</svelte:head>

<div class="">
	<section class="dark:bg-gray-500 pt-4">
		<a href="#">
			<img class="m-auto" src="https://ptcdn.info/doodle/2022/63745ecccaac0a2ace157a94_fmvtoe45br.png" />
		</a>
	</section>
	<div class="container py-6">
		<HomeTrendingToday />
		<div class="mt-8">
			<NewestUpdatedTopics />
		</div>
	</div>
</div>
