<script lang="ts">
	import type { ITopicItem } from "../interfaces/ITopicItem"
	import Image from "./core/Image/Image.svelte"
	import Icon from "./core/Icon/Icon.svelte"
	import Dropdown from "./core/Dropdown"
	import ToastUtil from "./core/Toast"
	import { openModal, closeAllModals, ConfirmModal } from "./core/Modal"
	import { createTopicRequestChange, REQUEST_TOPIC_TYPE } from "@/api/topic-request-change"
	import { createEventDispatcher } from "svelte"
	import { _ } from "svelte-i18n"

	const dispatch = createEventDispatcher()
	export let media: ITopicItem
	export let topicId: number

	const moreOptions = [
		{
			name: $_("youCanRequestChangeRemoveItem"),
			value: "instruction",
			type: "text",
		},
		{
			name: $_("createDiscussion"),
			value: "createDiscussion",
			icon: "add",
			onClick: handleCreateDiscussion,
		},
		{
			name: $_("requestRemove"),
			value: "requestRemove",
			onClick: handleRequestRemove,
		},
	]

	function handleRequestRemove() {
		openModal(ConfirmModal, {
			message: $_("confirmSendRequest"),
			onConfirm: async () => {
				const res = await createTopicRequestChange({
					requestType: REQUEST_TOPIC_TYPE.REMOVE,
					key: "topic-item",
					topicId,
					requestUserId: 1,
					content: JSON.stringify(media),
				})
				if (res.ok) {
					ToastUtil.toastSuccess($_("requestHasSubmitted"))
					dispatch("remove", media)
					closeAllModals()
					return res
				} else {
					ToastUtil.toastError(res.error || $_("somethingWentWrong"))
					return { ok: false }
				}
			},
		})
	}

	function handleCreateDiscussion() {
		openModal(() => import("./ModalDiscussionNew.svelte"), {
			topicId,
			title: media.name,
			description: media.description,
		})
	}
</script>

<div class="relative cursor-pointer rounded-xl p-2 dark:bg-gray-800 dark:hover:bg-gray-900 transition-colors">
	<div class="aspect-[1/1] rounded-lg overflow-hidden">
		<Image class="w-full h-full object-cover" alt={media.name} src={media.featuredImage} />
	</div>
	<div class="mt-2">
		<div class="flex items-center truncate">
			<div class="flex-1 truncate">
				<span class="text-base leading-none font-medium">{media.name}</span>
			</div>
			<div class="ml-2">
				<Dropdown options={moreOptions}>
					<button slot="trigger" class="w-5 h-5 dark:hover:bg-slate-800 rounded-full all-center">
						<Icon class="dark:fill-white" name="more" />
					</button>
				</Dropdown>
			</div>
		</div>
	</div>
</div>
