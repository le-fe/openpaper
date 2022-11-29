<script lang="ts">
	import { onMount } from "svelte"
	import { isArray } from "lodash"
	import { getTopicList } from "../api/topic"
	import type { ITopic } from "../interfaces/ITopic"
	import { Card } from "../components"
	import { Button } from "../components/"
	/**
	 * @type {ITopic[]}
	 */
	let topicList: ITopic[] = []
	onMount(() => fetchTopicList())

	async function fetchTopicList() {
		const res = await getTopicList()
		if (isArray(res)) {
			topicList = res
		}
	}
</script>

<section>
	<h2 class="mb-2 font-bold text-lg">Newest updated Topics</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		{#each topicList as topic}
			<Card class="mb-6 py-2">
				<div class="py-2 px-6">
					<h1 class="text-black text-2xl title-font font-bold mb-2">{topic.name}</h1>
				</div>
				<div class="grid" style="grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));">
					{#each topic.medias as media}
						<div class="aspect-[2/3]">
							<img class="w-full h-full object-cover" alt={media.name} src={media.featuredImage} />
						</div>
					{/each}
				</div>
				<div class="py-2 px-6 mt-2">
					<div class="mb-2">{topic.description}</div>
					<Button>Explore more</Button>
				</div>
			</Card>
		{/each}
	</div>
</section>
