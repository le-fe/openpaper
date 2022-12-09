<script lang="ts">
	import dayjs from "dayjs"
	import { Card, Button, Icon, Input, Tag, toast } from "@components"
	import TopicMediaItem from "@/components/TopicMediaItem.svelte"
	import type { ITopic, IMedia } from "@/interfaces"
	import { _ } from "svelte-i18n"

	const titleClass = "text-3xl !text-primary !dark:text-primary-dark font-medium"
	const descriptionClass = ""

	export let topic: ITopic
	export let medias: IMedia[]

	let isEdit: boolean = true
	let isLoadingRequestUpdate: boolean = false
	let isUpdatingTag: boolean = false
	let newTagValue: string = ""

	function toggleUpdateTopic() {
		isEdit = !isEdit
	}

	function toggleAddTag() {
		isUpdatingTag = !isUpdatingTag
	}

	function handleNewTagConfirm() {
		console.clear()
		console.log(newTagValue)
		if (newTagValue.length) {
			topic.types.push(newTagValue)
			console.clear()
			console.log(topic.types)
			isUpdatingTag = false
		}
	}

	async function doUpdateTopic() {
		isLoadingRequestUpdate = true
		await new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve()
			}, 1000)
		})
		isLoadingRequestUpdate = false
		isEdit = false
		toast.push($_("requestHasSubmitted"), {
			theme: {
				"--toastWidth": "400px",
				"--toastBackground": "rgba(72,187,120,0.9)",
			},
		})
	}
</script>

<Card class="py-4 px-6" type="stroke">
	<div class="mb-2 flex items-center justify-between">
		<div class="flex-1 overflow-hidden pr-12">
			{#if isEdit}
				<div class="w-full">
					<Input placeholder="Input topic name" bind:value={topic.name} class={titleClass} />
				</div>
			{:else}
				<h1 class={titleClass}>{topic.name}</h1>
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
				<Button class="ml-3" icon="report" />
			{/if}
		</div>
	</div>
	<div class="flex items-center my-4">
		{topic.types}
		<div class="flex">
			{#each topic.types as type}
				<a class="inline-flex mr-2 mb-1 cursor-pointer"><Tag closable={isEdit}>#{type}</Tag></a>
			{/each}
			{#if isEdit}
				{#if isUpdatingTag}
					<Input
						focused={true}
						size="sm"
						on:enter-pressed={handleNewTagConfirm}
						on:blur={handleNewTagConfirm}
						bind:value={newTagValue}
					/>
				{:else}
					<Button class="capitalize" size="sm" icon="add" on:click={toggleAddTag}>{$_("newTag")}</Button>
				{/if}
			{/if}
		</div>
		{#if !isEdit}
			<span class="ml-4 flex items-center">
				<Icon class="dark:fill-white" name="clock" />
				<span class="text-sm ml-1">Last updated at: {dayjs(topic.updatedAt).fromNow()}</span>
			</span>
		{/if}
	</div>
	<div class="my-2">
		{#if isEdit}
			<div class="w-full">
				<Input type="textarea" placeholder="Input description" value={topic.description} class={descriptionClass} />
			</div>
		{:else}
			<p>
				{topic.description}
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
