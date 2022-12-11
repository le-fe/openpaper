<script lang="ts">
	import { onMount } from "svelte"
	import type { IMedia } from "@/interfaces"
	import { isArray } from "lodash"
	import { getTopicById, getMediaFromTopic } from "@/api/topic"
	import { page } from "$app/stores"
	import { _ } from "svelte-i18n"
	import ListOfMedia from "./ListOfMedia.svelte"
	import { topicDetail } from "./store"
	import { Icon } from "@components"

	const topicId = $page.params.id
	let medias: IMedia[] = []

	async function fetchTopicDetail() {
		const res = await getTopicById(topicId)
		if (res) {
			if (res.types) {
				res.types = res.types.split(",")
			}
			$topicDetail = res
			return res
		} else {
			throw new Error(res)
		}
	}

	async function fetchMedias() {
		const res = await getMediaFromTopic({ topicId, limit: 18 })
		if (isArray(res)) {
			if (res.types) {
				res.types = res.types.split(",")
			}
			medias = res
		}
	}
	onMount(() => {
		fetchMedias()
	})
</script>

<svelte:head>
	<title>{$topicDetail.name || ""} | Learn, Share, Fun</title>
	<meta name="description" content="{$topicDetail.name} | Learn, Share, Fun" />
</svelte:head>

{#await fetchTopicDetail()}
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
				</div>
			</div>
		</div>
	</div>
{:catch error}
	<h3>Error while loading the data</h3>
{/await}
