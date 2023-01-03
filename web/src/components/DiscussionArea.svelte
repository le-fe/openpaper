<script lang="ts">
	import { Card, Icon } from "@components"
	import { goto } from "$app/navigation"
	import { page } from "$app/stores"
	import { _ } from "svelte-i18n"
	import type { ITopic, IPagination, IDiscussion } from "@/interfaces"
	import { DiscussionRepository } from "@/api"

	export let topic: ITopic
	let pagination: IPagination = {
		limit: 18,
		currentPage: 1,
		total: null,
		nextPage: null,
	}
	let discussions: IDiscussion[] = []
	let topicId = $page.params.id
	let activeDiscussionId: string
	$: activeDiscussionId = $page.params.discussion_id

	function setActiveDiscussion(discussion: IDiscussion) {
		goto(`${topicId}/${discussion.id}`, { replaceState: true })
	}

	async function fetchDiscussions() {
		const { data } = await DiscussionRepository.list({ topicId: topic.id })
		const { rows, currentPage, total, nextPage } = data
		discussions = rows
		if (!$page.params.discussion_id && rows?.[0]) {
			setActiveDiscussion(rows?.[0])
		}
		pagination.total = total
		pagination.currentPage = currentPage
		pagination.nextPage = nextPage
	}
</script>

<div>
	{#await fetchDiscussions()}
		<div class="w-full flex items-center justify-center py-24">
			<Icon class="animate-spin" width="40px" height="40px" name="loading" />
		</div>
	{:then}
		<Card class="flex items-start h-[80vh] overflow-hidden">
			<aside class="w-[240px]">
				<div class="pt-2 px-4">
					<span class="text-xs">You can create discussion by topic</span>
				</div>
				<div class="flex items-center py-4 px-4 space-between">
					<button id="channels_toggle" class="flex items-center flex-grow focus:outline-none">
						<Icon class="dark:fill-white" name="caretDown" />
						<span class="ml-2 leading-none font-medium text-sm capitalize">{$_("discussion")}</span>
					</button>
					<button class="flex items-center focus:outline-none">
						<Icon class="dark:fill-white" name="add" />
					</button>
				</div>
				<div id="channels_list">
					{#each discussions as discussion}
						<a
							class="flex items-center h-8 text-sm pl-8 pr-3 transition-colors {activeDiscussionId == discussion.id
								? 'dark:bg-gray-900'
								: ''}"
							href={`/topic/${topicId}/${discussion.id}`}
						>
							<Icon class="dark:fill-white" name="channel" />
							<span class="ml-2 leading-none font-bold">{discussion.title}</span>
						</a>
					{/each}
				</div>
			</aside>
			<main class="flex-1 h-full overflow-hidden">
				<slot />
			</main>
		</Card>
	{/await}
</div>
