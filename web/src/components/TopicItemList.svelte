<script lang="ts">
	import dayjs from "dayjs"
	import relativeTime from "dayjs/plugin/relativeTime"
	import { Card, Button, Icon, Input, Tag, ToastUtil, openModal } from "@components"
	import TopicItemListSingle from "@/components/TopicItemListSingle.svelte"
	import type { IMedia, IPagination, ITopic } from "@/interfaces"
	import { _ } from "svelte-i18n"
	import { authUser } from "@/stores"
	import { createTopicRequestChange, REQUEST_TOPIC_TYPE } from "@/api/topic-request-change"
	import { getMediaFromTopic } from "@/api/topic"
	dayjs.extend(relativeTime)

	const titleClass = "text-3xl !text-primary !dark:text-primary-dark font-medium"
	const descriptionClass = ""

	export let topicDetail: ITopic
	let medias: IMedia[]
	let pagination: IPagination = {
		limit: 18,
		currentPage: 1,
		total: null,
		nextPage: null,
	}

	// Edit status properties
	let isEditName: boolean = false
	let isEditDesc: boolean = false
	//
	let loadingRequestName: boolean = false
	let loadingRequestDesc: boolean = false
	let loadingRequestTag: boolean = false
	// Edit value properties
	let requestNameValue: string = ""
	let requestDescValue: string = ""
	let requestNewTagValue: string = ""

	let isUpdatingTag: boolean = false

	async function fetchMedias() {
		const { data } = await getMediaFromTopic({ topicId: topicDetail.id, limit: pagination.limit, page: pagination.currentPage })
		const { rows, currentPage, total, nextPage } = data
		medias = rows
		pagination.total = total
		pagination.currentPage = currentPage
		pagination.nextPage = nextPage
	}

	const handleClickRequestName = () => {
		requestNameValue = topicDetail.name
		isEditName = true
	}

	const requestNameChange = async () => {
		loadingRequestName = true
		await requestChangeTopic({ key: "name", content: requestNameValue, requestType: REQUEST_TOPIC_TYPE.UPDATE })
		loadingRequestName = false
		isEditName = false
	}

	const requestAddTag = async () => {
		loadingRequestTag = true
		await requestChangeTopic({
			key: "types",
			content: requestNewTagValue,
			oldContent: topicDetail.types.join(","),
			requestType: REQUEST_TOPIC_TYPE.ADD,
		})
		loadingRequestTag = false
		handleNewTagCancel()
	}

	const handleRemoveTag = async (type: string) => {
		await requestChangeTopic({
			key: "types",
			content: type,
			oldContent: topicDetail.types.join(","),
			requestType: REQUEST_TOPIC_TYPE.REMOVE,
		})
	}

	const handleClickRequestDesc = () => {
		requestDescValue = topicDetail.description
		isEditDesc = true
	}

	const requestDescChange = async () => {
		loadingRequestDesc = true
		await requestChangeTopic({ key: "description", content: requestDescValue, requestType: "update" })
		loadingRequestDesc = false
		isEditDesc = false
	}

	function toggleAddTag() {
		isUpdatingTag = !isUpdatingTag
	}

	function handleNewTagCancel() {
		requestNewTagValue = ""
		isUpdatingTag = false
	}

	async function requestChangeTopic({
		key,
		oldContent,
		content,
		requestType,
	}: {
		key: string
		oldContent?: string
		content: string
		requestType: string
	}) {
		try {
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve()
				}, 1000)
			})
			let payload = {
				requestType,
				topicId: topicDetail.id,
				requestUserId: 1,
				key,
				content,
				oldContent: oldContent || topicDetail[key],
			}
			const res = await createTopicRequestChange(payload)
			if (res) {
				ToastUtil.toastSuccess($_("requestHasSubmitted"))
			} else {
				ToastUtil.toastError(res?.toString() || $_("somethingWentWrong"))
			}
		} catch (error) {
			ToastUtil.toastError(error?.toString() || $_("somethingWentWrong"))
		}
	}

	function viewRequestUpdateTopic() {
		openModal(() => import("./TopicRequestUpdateModal.svelte"), {
			topicId: topicDetail.id,
		})
	}

	function openRequestMedia() {
		openModal(() => import("./TopicItemRequestUpdateModal.svelte"), {
			topicId: topicDetail.id,
		})
	}

	function removeMedia(item: IMedia) {
		medias.splice(medias.indexOf(item), 1)
	}
</script>

<Card class="py-4 px-6" type="stroke">
	<div class="mb-2 flex items-center justify-between">
		<div class="flex-1 overflow-hidden pr-12">
			{#if isEditName}
				<div class="w-full flex items-center">
					<Input
						required
						disabled={loadingRequestName}
						placeholder="Input topic name"
						bind:value={requestNameValue}
						class={titleClass}
						on:enter-pressed={requestNameChange}
					/>
					<Button
						class="ml-4"
						icon="check"
						loading={loadingRequestName}
						disabled={requestNameValue === topicDetail.name}
						on:click={requestNameChange}
					/>
					<Button class="ml-2" icon="close" loading={loadingRequestName} on:click={() => (isEditName = false)} />
				</div>
			{:else}
				<div class="flex items-center">
					<h1 class={titleClass}>{topicDetail.name}</h1>
					<Button class="ml-4" size="sm" icon="edit" on:click={handleClickRequestName} />
				</div>
			{/if}
		</div>
		<div class="flex items-center">
			{#if $authUser.permission === "ADMIN"}
				<Button class="ml-3" icon="view" on:click={viewRequestUpdateTopic}>{$_("viewRequestUpdateTopic")}</Button>
			{/if}
			<Button class="ml-3" icon="report" />
		</div>
	</div>
	<div class="flex items-center my-4">
		<div class="flex">
			{#each topicDetail.types as type}
				<a class="inline-flex mr-2 cursor-pointer">
					<Tag closable={true} on:close-tag={() => handleRemoveTag(type)}>#{type}</Tag>
				</a>
			{/each}
			{#if isUpdatingTag}
				<form class="flex items-center" on:submit|preventDefault={requestAddTag}>
					<Input focused={true} size="sm" bind:value={requestNewTagValue} escBlur={true} />
					<div class="flex items-center ml-2">
						<Button
							class=""
							size="sm"
							icon="check"
							disabled={!requestNewTagValue.length || loadingRequestTag}
							loading={loadingRequestTag}
							on:click={requestAddTag}
						/>
						<Button class="ml-1" size="sm" icon="close" on:click={handleNewTagCancel} />
					</div>
				</form>
			{:else}
				<Button class="capitalize" size="sm" icon="add" on:click={toggleAddTag} />
			{/if}
		</div>
		<span class="ml-4 flex items-center">
			<Icon class="dark:fill-white" name="clock" />
			<span class="text-sm ml-1">Last updated at: {dayjs(topicDetail.updatedAt).fromNow()}</span>
		</span>
	</div>
	<div class="mt-2 mb-6">
		{#if isEditDesc}
			<div class="w-full flex items-center">
				<Input
					type="textarea"
					rows="3"
					placeholder="Input description"
					disabled={loadingRequestDesc}
					bind:value={requestDescValue}
					class={descriptionClass}
				/>
				<div class="flex flex-col ml-2">
					<Button class="" icon="check" loading={loadingRequestDesc} on:click={requestDescChange} />
					<Button class="mt-1" icon="close" loading={loadingRequestDesc} on:click={() => (isEditDesc = false)} />
				</div>
			</div>
		{:else}
			<div class="flex items-center">
				<p>
					{topicDetail.description}
				</p>
				<Button class="ml-4" size="sm" icon="edit" on:click={handleClickRequestDesc} />
			</div>
		{/if}
	</div>
	<div>
		{#await fetchMedias()}
			<div class="w-full flex items-center justify-center py-24">
				<Icon class="animate-spin" width="40px" height="40px" name="loading" />
			</div>
		{:then}
			<div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(150px, 1fr) );">
				{#each medias as media}
					<TopicItemListSingle topicId={topicDetail.id} {media} on:remove={() => removeMedia(media)} />
				{/each}
				<div
					class="flex flex-col items-center justify-center cursor-pointer p-4 border dark:border-gray-600 dark:hover:bg-slate-600 transition-colors rounded-xl"
					on:click={openRequestMedia}
				>
					<Icon class="dark:fill-white" name="add" />
					<span class="mt-2">Add new</span>
				</div>
			</div>
		{/await}
		<div class="mt-4 text-center">
			{#if pagination.nextPage > 0}
				<Button>{$_("loadMore")}</Button>
			{/if}
		</div>
	</div>
</Card>
