<script lang="ts">
	import type { IDiscussion, IMessage } from "@/interfaces"
	import { page } from "$app/stores"
	import { DiscussionRepository } from "@/api"
	import { isArray } from "lodash"
	import ChatMessageEditor from "@/components/ChatMessageEditor.svelte"

	let discussion: IDiscussion = {}
	let messages: IMessage[] = []
	let discussionId: string

	$: discussionId = $page.params.discussion_id
	page.subscribe((newPage) => {
		fetchDiscussion(newPage.params.discussion_id)
	})

	async function fetchMessages() {
		const { data } = await DiscussionRepository.listMessage(discussionId, {})
		if (isArray(data)) {
			messages = data
		}
	}

	async function fetchDiscussion(discussionId: string) {
		const res = await DiscussionRepository.get(discussionId)
		if (res.ok) {
			discussion = res.data
			fetchMessages()
		}
	}
</script>

<div class="flex flex-col flex-grow h-full overflow-hidden dark:bg-gray-900">
	<div class="flex items-center flex-shrink-0 h-16 bg-white dark:bg-gray-900 px-4">
		<div class="w-full overflow-hidden">
			<h1 class="text-sm font-bold">{discussion.title}</h1>
			<div class="text-xs truncate">{discussion.description}</div>
		</div>
	</div>
	<div class="flex flex-col flex-grow overflow-auto">
		{#each messages as message}
			<div class="flex px-4 py-3">
				<div class="h-10 w-10 rounded flex-shrink-0 bg-gray-300" />
				<div class="ml-2">
					<div class="-mt-1">
						<span class="text-sm font-semibold">Boromir</span>
						<span class="ml-1 text-xs text-gray-500">01:26</span>
					</div>
					<p class="text-sm">{message.content}</p>
				</div>
			</div>
		{/each}
	</div>
	<div class="dark:bg-gray-900 px-4 py-2">
		<div class="flex items-center rounded-sm p-1">
			<div class="flex-1 overflow-hidden pr-2">
				<ChatMessageEditor />
			</div>
		</div>
	</div>
</div>
