<script lang="ts">
	import { page } from "$app/stores"
	import { _ } from "svelte-i18n"
	import { topicDetail, fetchTopicDetail } from "./store"
	import { Icon } from "@components"
	import ListOfMedia from "@/components/TopicItemList.svelte"

	const topicId = parseInt($page.params.id)
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
			<ListOfMedia {topicId} />
			<div class="p-4 mt-8">
				<div class="mb-2">
					<h1 class="text-xl font-medium">{$_("discussions")}</h1>
					Discussions
				</div>
			</div>
		</div>
	</div>
{:catch error}
	<div class="min-h-[50vh] all-center">
		<div class="text-center">
			{$_("thisTopicIsNotExisted")}
		</div>
	</div>
{/await}
