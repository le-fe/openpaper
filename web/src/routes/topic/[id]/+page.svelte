<script lang="ts">
	import dayjs from "dayjs"
	import relativeTime from "dayjs/plugin/relativeTime"
	import { Button, Card, Tag, Icon } from "@components"
	import TopicMediaItem from "@/components/TopicMediaItem.svelte"
	import type { ITopic, IMedia } from "@/interfaces"
	import { isArray } from "lodash"
	import { getTopicById, getMediaFromTopic } from "@/api/topic"
	import { page } from "$app/stores"
	import { _ } from "svelte-i18n"

	dayjs.extend(relativeTime)

	const topicId = $page.params.id
	let topic: ITopic = {}
	let medias: IMedia[] = []
	let loaded: Boolean = false

	async function fetchTopicDetail() {
		const res = await getTopicById(topicId)
		if (res) {
			if (res.types) {
				res.types = res.types.split(",")
			}
			topic = res
			loaded = true
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
	fetchTopicDetail()
	fetchMedias()
</script>

<svelte:head>
	<title>{topic.name || ""} | Learn, Share, Fun</title>
	<meta name="description" content="{topic.name} | Learn, Share, Fun" />
</svelte:head>

{#if topic && loaded}
	<div class="py-6">
		<div class="container">
			<!-- LIST OF MEDIAS -->
			<Card class="p-4" type="stroke">
				<div class="mb-2">
					<h1 class="text-3xl text-primary dark:text-primary-dark font-medium">{topic.name}</h1>
				</div>
				<div class="flex items-center">
					<div class="flex">
						{#each topic.types as type}
							<a class="inline-flex mr-1 mb-1 cursor-pointer"><Tag>#{type}</Tag></a>
						{/each}
					</div>
					<span class="ml-4 flex items-center">
						<Icon name="clock" />
						<span class="text-sm ml-1">Last updated at: {dayjs(topic.updatedAt).fromNow()}</span>
					</span>
				</div>
				<div class="my-2">
					{topic.description}
				</div>
				<div>
					<div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(150px, 1fr) );">
						{#each medias as media}
							<TopicMediaItem {media} />
						{/each}
					</div>
					<div class="mt-4 text-center">
						<Button>Load more items</Button>
					</div>
				</div>
			</Card>
			<!-- LIST OF DISCUSSIONS -->
			<div class="p-4 mt-8">
				<div class="mb-2">
					<h1 class="text-xl font-medium">{$_("discussions")}</h1>
				</div>
			</div>
		</div>
	</div>
{/if}
