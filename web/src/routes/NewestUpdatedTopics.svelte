<script lang="ts">
	import { onMount } from "svelte"
	import { isArray } from "lodash"
	import { getTopicList } from "../api/topic"
	import type { ITopic } from "../interfaces/ITopic"
	import TopicItem from "../components/TopicItem.svelte"
	/**
	 * @type {ITopic[]}
	 */
	let topicList: ITopic[] = []
	let gridElement: HTMLElement

	onMount(async () => {
		await fetchTopicList()
	})

	async function fetchTopicList() {
		const { data } = await getTopicList()
		if (isArray(data)) {
			topicList = data
		}
	}
</script>

<section>
	<h2 class="mb-2 font-bold text-lg">Newest updated Topics</h2>
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4" bind:this={gridElement}>
		{#each topicList as topic}
			<TopicItem data={topic} />
		{/each}
	</div>
</section>
