<script lang="ts">
	import { onMount } from "svelte"
	import type { IMedia } from "@/interfaces"
	import { isArray } from "lodash"
	import { getMediaFromTopic } from "@/api/topic"
	import { page } from "$app/stores"
	import { _ } from "svelte-i18n"
	import ListOfMedia from "./ListOfMedia.svelte"
	import { topicDetail, fetchTopicDetail } from "./store"
	import { Icon } from "@components"

	const topicId = $page.params.id
	let medias: IMedia[] = []

	async function fetchMedias() {
		const { data } = await getMediaFromTopic({ topicId, limit: 18 })
		if (isArray(data)) {
			medias = data
		}
	}

	async function fetchDiscussions() {
		return []
	}

	onMount(() => {
		fetchMedias()
	})
</script>

<svelte:head>
	<title>{$topicDetail.name || ""} | Learn, Share, Fun</title>
	<meta name="description" content="{$topicDetail.name} | Learn, Share, Fun" />
</svelte:head>

{#await fetchTopicDetail(topicId)}
	<div class="w-full flex items-center justify-center py-24">
		<Icon class="animate-spin" width="40px" height="40px" name="loading" />
	</div>
{:then}
	<div class="py-6">
		<div class="container">
			<ListOfMedia {medias} />
			<div class="p-4 mt-8">
				<div class="mb-2">
					<h1 class="text-xl font-medium">{$_("discussions")}</h1>
					{#await fetchDiscussions() then items}
						{#if !items.length}
							<span class="text-sm">{$_("noDiscussionOnTopicNow")}</span>
						{:else}
							{JSON.stringify(items)}
						{/if}
					{:catch error}
						<h3>Error while loading the data</h3>
					{/await}
				</div>
			</div>
		</div>
	</div>
{:catch error}
	<h3>Error while loading the data</h3>
{/await}
