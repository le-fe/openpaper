<script>
	import HomeTrendingToday from "@/components/HomeTrendingToday.svelte"
	import NewestUpdatedTopics from "@/components/NewestUpdatedTopics.svelte"
	// import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>SquareMoon | Learn, Share, Fun</title>
	<meta name="description" content="SquareMoon | Learn, Share, Fun" />
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
