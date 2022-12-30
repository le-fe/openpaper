<script lang="ts">
	import { Button, Card, Icon } from "@components"
	import { _ } from "svelte-i18n"
	import type { ITopic, IPagination, IDiscussion } from "@/interfaces"
	import { DiscussionRepository } from "@/api"
	import ChannelChatRoom from "./ChannelChatRoom.svelte"

	export let topic: ITopic
	let pagination: IPagination = {
		limit: 18,
		currentPage: 1,
		total: null,
		nextPage: null,
	}
	let discussions: IDiscussion[] = []

	async function fetchDiscussions() {
		const { data } = await DiscussionRepository.list({ topicId: topic.id })
		const { rows, currentPage, total, nextPage } = data
		discussions = rows
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
		<Card class="flex items-start h-[80vh]">
			<aside class="w-1/5">
				<div class="flex items-center h-8 px-3 space-between">
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
						<a class="flex items-center h-8 text-sm pl-8 pr-3" href="#">
							<Icon class="dark:fill-white" name="channel" />
							<span class="ml-2 leading-none font-bold">{discussion.title}</span>
						</a>
					{/each}
				</div>
			</aside>
			<main class="w-4/5 h-full overflow-hidden">
				<ChannelChatRoom />
			</main>
		</Card>
	{/await}
</div>
