<script lang="ts">
	import { page } from "$app/stores"
	import { _ } from "svelte-i18n"
	import { topicDetail, fetchTopicDetail } from "@/stores/topic-detail"
	import { Icon } from "@components"
	import TopicItemList from "@/components/TopicItemList.svelte"
	import DiscussionArea from "@/components/DiscussionArea.svelte"

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
	<div class="py-2 px-2 flex">
		<div class="w-1/3 overflow-hidden">
			<TopicItemList topicDetail={$topicDetail} />
		</div>
		<div class="ml-2 w-2/3 overflow-hidden">
			<DiscussionArea topic={$topicDetail}>
				<slot />
			</DiscussionArea>
		</div>
	</div>
{:catch error}
	<div class="min-h-[50vh] all-center">
		<div class="text-center">
			{$_("thisTopicIsNotExisted")}
		</div>
	</div>
{/await}
