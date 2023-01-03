<script lang="ts">
	import { onDestroy } from "svelte"
	import type { IDiscussion, IMessage } from "@/interfaces"
	import { page } from "$app/stores"
	import { DiscussionRepository } from "@/api"
	import { isArray } from "lodash"
	import ChatMessageEditor from "@/components/ChatMessageEditor.svelte"
	import MessageList from "@/components/MessageList.svelte"

	let discussion: IDiscussion = {}
	let messages: IMessage[] = []
	let discussionId: string

	$: discussionId = $page.params.discussion_id
	const subcriber = page.subscribe((newPage) => handleChangeDiscussion(newPage.params.discussion_id))

	function handleChangeDiscussion(discussionId: string) {
		if (!discussionId) return
		messages = []
		fetchDiscussion(discussionId)
	}

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

	onDestroy(subcriber)
</script>

<div class="flex flex-col flex-grow h-full overflow-hidden dark:bg-gray-900">
	<div class="flex items-center flex-shrink-0 h-16 bg-white dark:bg-gray-900 px-4">
		<div class="w-full overflow-hidden">
			<h1 class="text-sm font-bold">{discussion.title}</h1>
			<div class="text-xs truncate">{discussion.description}</div>
		</div>
	</div>
	<div class="flex flex-col flex-grow overflow-auto">
		<MessageList {messages} />
	</div>
	<div class="dark:bg-gray-900 px-4 py-2">
		<div class="flex items-center rounded-sm p-1">
			<div class="flex-1 overflow-hidden pr-2">
				<ChatMessageEditor discussionId={parseInt(discussionId)} />
			</div>
		</div>
	</div>
</div>
