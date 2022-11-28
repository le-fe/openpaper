<script lang="ts">
	import { onMount } from "svelte"
	import { isArray } from "lodash"
	import { getTrendingTopicList } from "../api/topic"
	import type { ITopic } from "../interfaces/ITopic"
	/**
	 * @type {ITopic[]}
	 */
	let topicList: ITopic[] = []
	onMount(() => fetchTopicList())

	async function fetchTopicList() {
		const res = await getTrendingTopicList()
		if (isArray(res)) {
			topicList = res
		}
	}
</script>

<section>
	<h2 class="mb-2 font-bold text-lg">Trending Topics</h2>
	<div class="grid grid-cols-4 gap-4">
		{#each topicList as topic}
			<div
				class="w-full aspect-[5/3] bg-no-repeat bg-cover rounded-lg overflow-hidden card-with-overlay"
				style="background-image: url('{topic.featuredImage}')"
			>
				<div class="inner-content flex flex-col p-4 h-full justify-end text-lg">{topic.name}</div>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	.card-with-overlay {
		position: relative;
		color: #fff;
		.inner-content {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			z-index: 10;
		}
	}
	.card-with-overlay::before {
		z-index: 3;
		bottom: 0;
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		background-image: linear-gradient(
			0deg,
			#000,
			rgba(0, 0, 0, 0.8) 25%,
			rgba(0, 0, 0, 0.6) 50%,
			rgba(0, 0, 0, 0.4) 75%,
			rgba(0, 0, 0, 0.2)
		);
	}
</style>
