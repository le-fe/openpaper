<script lang="ts">
	import dayjs from "dayjs"
	import { cloneDeep } from "lodash"
	import relativeTime from "dayjs/plugin/relativeTime"
	import { Card, Button, Icon, Input, Tag, ToastUtil, openModal } from "@components"
	import { fade } from "svelte/transition"
	import TopicMediaItem from "@/components/TopicMediaItem.svelte"
	import type { IMedia } from "@/interfaces"
	import { _ } from "svelte-i18n"
	import { topicDetail, topicRequestChange } from "./store"
	import { authUser } from "@/stores"
	import { createTopicRequestChange } from "@/api/topic-request-change"
	dayjs.extend(relativeTime)

	const titleClass = "text-3xl !text-primary !dark:text-primary-dark font-medium"
	const descriptionClass = ""

	export let medias: IMedia[]

	let isEdit: boolean = false
	let isLoadingRequestUpdate: boolean = false
	let isUpdatingTag: boolean = false
	let newTagValue: string = ""

	function toggleUpdateTopic() {
		const newValue = !isEdit
		topicRequestChange.update(() => {
			let data = cloneDeep($topicDetail)
			return {
				creatorId: 1,
				name: data.name,
				topicId: data.id,
				types: data.types,
				description: data.description,
				featuredImage: data.featuredImage,
			}
		})
		isEdit = newValue
	}

	function toggleAddTag() {
		isUpdatingTag = !isUpdatingTag
	}

	function handleNewTagConfirm() {
		if (newTagValue.length) {
			if ($topicDetail.types.indexOf(newTagValue) === -1) {
				topicDetail.update((item) => {
					item.types = [...item.types, newTagValue]
					return item
				})
				newTagValue = ""
			} else {
				// Todo: Highlight existed tag
			}
			isUpdatingTag = false
		} else {
			isUpdatingTag = false
		}
	}

	async function doUpdateTopic() {
		try {
			isLoadingRequestUpdate = true
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve()
				}, 1000)
			})
			let payload = $topicRequestChange
			payload.types = payload.types
				.map((t: string) => t.trim())
				.filter(Boolean)
				.join(",")
			const res = await createTopicRequestChange(payload)
			if (res) {
				isEdit = false
				ToastUtil.toastSuccess($_("requestHasSubmitted"))
			} else {
				ToastUtil.toastError(res?.toString() || $_("somethingWentWrong"))
			}
		} catch (error) {
			ToastUtil.toastError(error?.toString() || $_("somethingWentWrong"))
		} finally {
			isLoadingRequestUpdate = false
		}
	}

	function viewRequestUpdateTopic() {
		openModal(() => import("./TopicRequestUpdateModal.svelte"), {
			topicId: $topicDetail.id,
		})
	}
</script>

<Card class="py-4 px-6" type="stroke">
	<div class="mb-2 flex items-center justify-between">
		<div class="flex-1 overflow-hidden pr-12">
			{#if isEdit}
				<div class="w-full">
					<Input required placeholder="Input topic name" bind:value={$topicRequestChange.name} class={titleClass} />
				</div>
			{:else}
				<h1 class={titleClass}>{$topicDetail.name}</h1>
			{/if}
		</div>
		<div class="flex items-center">
			{#if isEdit}
				<Button type="primary" icon="submit" loading={isLoadingRequestUpdate} on:click={doUpdateTopic}>
					{$_("requestYourUpdate")}
				</Button>
				<Button class="ml-4" on:click={toggleUpdateTopic}>{$_("cancel")}</Button>
			{:else}
				<Button icon="edit" on:click={toggleUpdateTopic}>{$_("updateTopic")}</Button>
				{#if $authUser.permission === "ADMIN"}
					<Button class="ml-3" icon="view" on:click={viewRequestUpdateTopic}>{$_("viewRequestUpdateTopic")}</Button>
				{/if}
				<Button class="ml-3" icon="report" />
			{/if}
		</div>
	</div>
	<div class="flex items-center my-4">
		<div class="flex">
			{#each $topicDetail.types as type}
				<a class="inline-flex mr-2 mb-1 cursor-pointer"><Tag closable={isEdit}>#{type}</Tag></a>
			{/each}
			{#if isEdit}
				{#if isUpdatingTag}
					<form on:submit|preventDefault={handleNewTagConfirm}>
						<Input focused={true} size="sm" on:blur={handleNewTagConfirm} bind:value={newTagValue} escBlur={true} />
					</form>
				{:else}
					<Button class="capitalize" size="sm" icon="add" on:click={toggleAddTag}>{$_("newTag")}</Button>
				{/if}
			{/if}
		</div>
		{#if !isEdit}
			<span class="ml-4 flex items-center">
				<Icon class="dark:fill-white" name="clock" />
				<span class="text-sm ml-1">Last updated at: {dayjs($topicDetail.updatedAt).fromNow()}</span>
			</span>
		{/if}
	</div>
	<div class="my-2">
		{#if isEdit}
			<div class="w-full">
				<Input type="textarea" placeholder="Input description" bind:value={$topicDetail.description} class={descriptionClass} />
			</div>
		{:else}
			<p>
				{$topicDetail.description}
			</p>
		{/if}
	</div>
	<div>
		<div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(150px, 1fr) );">
			{#each medias as media}
				<TopicMediaItem {media} />
			{/each}
		</div>
		<div class="mt-4 text-center">
			<Button>{$_("loadMore")}</Button>
		</div>
	</div>
</Card>
