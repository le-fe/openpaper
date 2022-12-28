<script lang="ts">
	import { Button, Input } from "."
	import { _ } from "svelte-i18n"
	import { getTopicTags } from "@/api/type"
	import type { IType } from "@/interfaces"

	let tags: IType[] = []
	let isAddingNewTag: boolean = false

	fetchTags()

	async function fetchTags() {
		const { data } = await getTopicTags()
		if (Array.isArray(data)) {
			tags = data
		}
	}
</script>

<div class="py-2 px-4 dark:bg-gray-700">
	<div class="flex items-start">
		<div class="text-sm mr-2 all-center mt-1">{$_("select")}</div>
		<div class="flex flex-wrap">
			{#each tags as tag}
				<div class="mr-1 mb-1">
					<div class="cursor-pointer flex items-center bg-gray-600 px-3 py-1 rounded-md">
						<input class="cursor-pointer" type="checkbox" id={tag.name} name={tag.name} value="Bike" />
						<label class="cursor-pointer ml-1 uppercase text-sm" for={tag.name}>{tag.name}</label>
					</div>
				</div>
			{/each}
			<div class="mr-1 mb-1">
				{#if isAddingNewTag}
					<div class="flex items-center">
						<Input autofocus size="sm" placeholder="Input" />
						<Button size="sm" class="ml-1" type="primary">{$_("save")}</Button>
					</div>
				{:else}
					<Button size="sm" icon="add" on:click={() => (isAddingNewTag = true)}>{$_("newTag")}</Button>
				{/if}
			</div>
		</div>
	</div>
</div>
